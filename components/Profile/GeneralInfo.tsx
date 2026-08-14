import React, { useState } from 'react';
import { Camera, Save, User as UserIcon } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { User as AuthUser } from 'firebase/auth';

interface Props {
  user: AuthUser | null;
  userProfile: any;
}

const GeneralInfo: React.FC<Props> = ({ user, userProfile }) => {
  const [name, setName] = useState(userProfile?.fullName || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        fullName: name,
        phone: phone
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6 p-4 rounded-xl bg-black/20 border border-slate-800/50">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center border-2 border-indigo-500/30 shadow-inner">
            <UserIcon size={32} className="text-indigo-500/70" />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white transition-all">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{userProfile?.fullName || 'User'}</h2>
          <p className="text-indigo-400/60 font-mono text-sm tracking-wide">{user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/40 border border-slate-800 rounded-xl p-3 text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</label>
          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-black/40 border border-slate-800 rounded-xl p-3 text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition"
          />
        </div>
      </div>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] disabled:opacity-50"
      >
        <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default GeneralInfo;
