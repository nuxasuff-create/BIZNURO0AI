import React, { useState } from 'react';
import { User as UserIcon, Shield, Info, Camera, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import GeneralInfo from './GeneralInfo';
import SecurityInfo from './SecurityInfo';
import PreferencesUsage from './PreferencesUsage';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { userProfile } = useData();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'preferences'>('general');

  return (
    <div className="p-4 lg:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 tracking-tight">
            <UserIcon className="text-indigo-400" /> My Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-3">
            {[
              { id: 'general', label: 'General Info', icon: Info },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'preferences', label: 'Preferences', icon: Zap },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 font-medium ${
                  activeTab === tab.id
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                    : 'bg-black/20 text-slate-400 border border-transparent hover:bg-black/40 hover:text-slate-200'
                }`}
              >
                <tab.icon size={20} /> {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-3 bg-black/30 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl">
            {activeTab === 'general' && <GeneralInfo user={user} userProfile={userProfile} />}
            {activeTab === 'security' && <SecurityInfo />}
            {activeTab === 'preferences' && <PreferencesUsage />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
