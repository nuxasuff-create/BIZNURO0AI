import React, { useState } from 'react';
import { CustomerDue, View } from '../types';
import { Search, Plus, AlertCircle, Clock, DollarSign, ArrowRight, Edit } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../utils/translations';
import { useCurrency } from '../context/CurrencyContext';

interface DueManagerProps {
  view: View.DUE_LIST | View.DUE_ANALYSIS;
}

const DueManager: React.FC<DueManagerProps> = ({ view }) => {
  const { language } = useTheme();
  const t = translations[language] as any;
  const { currencySymbol } = useCurrency();
  const { dues, addDue, updateDue } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDue, setEditingDue] = useState<CustomerDue | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newDue, setNewDue] = useState<Omit<CustomerDue, 'id'>>({
    customerId: '',
    name: '',
    mobile: '',
    amount: 0,
    daysPending: 0,
    risk: 'Low'
  });
  
  const totalDue = dues.reduce((acc, curr) => acc + curr.amount, 0);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-500 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-500';
    }
  };

  const filteredDues = dues.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.mobile.includes(searchTerm)
  );

  const handleUpdateDue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDue) return;

    updateDue(editingDue);
    setEditingDue(null);
  };

  const handleAddDue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setError(null);
    const success = await addDue(newDue);
    setIsAdding(false);
    
    if (success) {
      setIsAddModalOpen(false);
      setNewDue({ customerId: '', name: '', mobile: '', amount: 0, daysPending: 0, risk: 'Low' });
    } else {
      setError("বকেয়া সংরক্ষণ করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
  };

  if (view === View.DUE_LIST) {
    return (
      <div className="p-4 space-y-6 max-w-4xl mx-auto relative">
        {/* Edit Modal */}
        {editingDue && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4">{t.updateDueInfo || 'Update Due Info'}</h3>
              <form onSubmit={handleUpdateDue} className="space-y-4">
                <div>
                  <label className="block text-slate-400 mb-1 text-sm">{t.customerId || 'Customer ID'}</label>
                  <input 
                    type="text" 
                    value={editingDue.customerId}
                    onChange={e => setEditingDue({...editingDue, customerId: e.target.value})}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 text-sm">{t.customerNameCol || 'Customer Name'}</label>
                  <input 
                    type="text" 
                    value={editingDue.name}
                    disabled
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 text-sm">{t.dueAmount || 'Due Amount'} ({currencySymbol})</label>
                  <input 
                    type="number" 
                    value={editingDue.amount}
                    onChange={e => setEditingDue({...editingDue, amount: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 text-sm">{t.daysPending || 'Days Pending'}</label>
                  <input 
                    type="number" 
                    value={editingDue.daysPending}
                    onChange={e => setEditingDue({...editingDue, daysPending: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setEditingDue(null)}
                    className="flex-1 bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-700 transition"
                  >
                    বাতিল
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-bold"
                  >
                    সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4">{t.addNewDue || 'Add New Due'}</h3>
              <form onSubmit={handleAddDue} className="space-y-4">
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                <div>
                  <label className="block text-slate-400 mb-1 text-sm">{t.customerId || 'Customer ID'}</label>
                  <input 
                    type="text" 
                    required
                    value={newDue.customerId}
                    onChange={e => setNewDue({...newDue, customerId: e.target.value})}
                    placeholder={t.custPlaceholder || 'e.g., CUST-001'}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 text-sm">{t.customerNameCol || 'Customer Name'}</label>
                  <input 
                    type="text" 
                    required
                    value={newDue.name}
                    onChange={e => setNewDue({...newDue, name: e.target.value})}
                    placeholder={t.namePlaceholder || 'Enter name'}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 text-sm">{t.mobileNo || 'Mobile Number'}</label>
                  <input 
                    type="text" 
                    required
                    value={newDue.mobile}
                    onChange={e => setNewDue({...newDue, mobile: e.target.value})}
                    placeholder="017..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 text-sm">{t.dueAmount || 'Due Amount'} ({currencySymbol})</label>
                  <input 
                    type="number" 
                    required
                    value={newDue.amount || ''}
                    onChange={e => setNewDue({...newDue, amount: Number(e.target.value)})}
                    placeholder="0"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 text-sm">{t.daysPending || 'Days Pending'}</label>
                  <input 
                    type="number" 
                    required
                    value={newDue.daysPending || ''}
                    onChange={e => setNewDue({...newDue, daysPending: Number(e.target.value)})}
                    placeholder="0"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 text-sm">{t.riskLevel || 'Risk Level'}</label>
                  <select 
                    value={newDue.risk}
                    onChange={e => setNewDue({...newDue, risk: e.target.value as any})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                  >
                    <option value="Low">{t.lowRisk || 'Low Risk'}</option>
                    <option value="Medium">{t.mediumRisk || 'Medium Risk'}</option>
                    <option value="High">{t.highRisk || 'High Risk'}</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-700 transition"
                  >
                    বাতিল
                  </button>
                  <button 
                    type="submit"
                    disabled={isAdding}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAdding ? (t.adding || 'Adding...') : (t.addBtn || 'Add')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <header>
          <h2 className="text-3xl font-bold text-white mb-2">{t.dueBook || 'Due Ledger'}</h2>
          <p className="text-slate-400">{t.dueListDesc || 'View your customers dues and edit the list.'}</p>
        </header>

        {/* Summary Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-slate-400 font-medium mb-1">{t.summary || 'Summary'}</h3>
          <div className="text-3xl font-bold text-white">{t.totalDue || 'Total Due'}: {currencySymbol}{totalDue.toLocaleString()}</div>
        </div>

        {/* Action Bar */}
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl flex items-center justify-center gap-2 transition-all font-semibold"
        >
          <Plus size={20} /> {t.addNewDue || 'Add New Due'}
        </button>

        {/* Search & List */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <UsersIcon /> {t.customerBasedDue || 'Customer-based Due'}
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder={t.searchCustomer || 'Search by customer name or mobile number...'} 
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 placeholder-slate-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="divide-y divide-slate-800">
            {filteredDues.length > 0 ? filteredDues.map((due, idx) => (
              <div key={due.id} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition">
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 w-6">#{idx + 1}</span>
                  <div>
                    <h4 className="font-bold text-white">{due.name}</h4>
                    <p className="text-sm text-slate-500">{t.mobileNo || 'Mobile'} {due.mobile}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <button 
                    onClick={() => setEditingDue(due)}
                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition" 
                    title={t.edit || 'Edit'}
                  >
                    <Edit size={18} />
                  </button>
                  <div>
                    <p className="font-bold text-white">{currencySymbol}{due.amount.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">{due.daysPending} {t.daysRemaining || 'days remaining'}</p>
                  </div>
                  {/* Risk Badge for List View */}
                  <span className={`px-2 py-1 rounded text-xs border ${getRiskColor(due.risk)} hidden sm:block`}>
                    {due.risk === 'High' ? (t.highRisk || 'High Risk') : due.risk === 'Medium' ? (t.mediumRisk || 'Medium Risk') : (t.lowRisk || 'Low Risk')}
                  </span>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center text-slate-500">{t.noDueFound || 'No dues found.'}</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // View.DUE_ANALYSIS
  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">{t.dueAnalysis || 'Due Analysis'}</h2>
        <p className="text-slate-400">{t.dueAnalysisDesc || 'View due analysis and suggestions.'}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-400">{t.totalDue || 'Total Due'}</span>
            <DollarSign className="text-slate-600" />
          </div>
          <div className="text-3xl font-bold text-blue-400">{currencySymbol}{totalDue.toLocaleString()}</div>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-400">{t.overdue30 || 'Overdue (30+ days)'}</span>
            <Clock className="text-slate-600" />
          </div>
          <div className="text-3xl font-bold text-white">
            {dues.filter(d => d.daysPending > 30).length} {t.businesses || 'businesses'}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl md:col-span-2">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-400">{t.highRiskBusiness || 'High risk business'}</span>
            <AlertCircle className="text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-500">
            {dues.filter(d => d.risk === 'High').length}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white mb-1">{t.detailedDueList || 'Detailed Due List'}</h3>
          <p className="text-sm text-slate-400">{t.dueListRiskDesc || 'List of all customers by risk level.'}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-950 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">{t.customerNameCol || 'Customer Name'}</th>
                <th className="px-6 py-4">বকেয়ার পরিমাণ</th>
                <th className="px-6 py-4">{t.daysPending || 'Days Pending'}</th>
                <th className="px-6 py-4">{t.riskLevel || 'Risk Level'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {dues.map((due) => (
                <tr key={due.id} className="hover:bg-slate-800/50 transition">
                  <td className="px-6 py-4 font-medium text-white">
                    {due.name}
                    <div className="text-xs text-slate-500 sm:hidden">{currencySymbol}{due.amount}</div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">{currencySymbol}{due.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">{due.daysPending} {t.days || 'days'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-2 text-xs font-bold text-center leading-none ${
                       due.risk === 'High' ? 'border-red-500 text-red-500 bg-red-500/10' :
                       due.risk === 'Medium' ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' :
                       'border-green-500 text-green-500 bg-green-500/10'
                    }`}>
                      {due.risk === 'High' ? (t.highRisk || 'High Risk') : due.risk === 'Medium' ? (t.mediumRisk || 'Medium Risk') : (t.lowRisk || 'Low Risk')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Advice Section */}
      <div className="bg-slate-900 border border-blue-900/50 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
          <div className="p-1 bg-blue-500/20 rounded-lg"><ArrowRight size={16} /></div>
          অ্যাডমিনের জন্য পরামর্শ
        </h3>
        <p className="text-slate-300 mb-6 leading-relaxed">
          মোট বকেয়ার পরিমাণ বেশ উল্লেখযোগ্য। বিশেষ করে যে সমস্ত ব্যবসা ৩০ দিনের বেশি সময় ধরে বকেয়া রেখেছে, তাদের দিকে নজর দেওয়া প্রয়োজন।
        </p>
        <ul className="space-y-4">
          <li className="flex gap-3 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
            <span><strong className="text-white">{t.sendReminder || 'Send Reminder:'}</strong> যেসকল ব্যবসার বকেয়া 'মধ্যম' বা 'উচ্চ' ঝুঁকিতে আছে, তাদের ফোন কল বা WhatsApp এর মাধ্যমে ভদ্রভাবে একটি রিমাইন্ডার দিন।</span>
          </li>
          <li className="flex gap-3 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
            <span><strong className="text-white">{t.limitCredit || 'Limit New Credit:'}</strong> 'উচ্চ ঝুঁকি' চিহ্নিত ব্যবসাগুলোকে নতুন করে বাকিতে পণ্য দেওয়ার আগে পুরনো বকেয়ার আংশিক পরিশোধের জন্য অনুরোধ করুন।</span>
          </li>
          <li className="flex gap-3 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
            <span><strong className="text-white">{t.discuss || 'Discuss:'}</strong> বড় অংকের বকেয়ার ক্ষেত্রে গ্রাহকের সাথে সরাসরি কথা বলে পেমেন্টের একটি সম্ভাব্য তারিখ নির্ধারণ করার চেষ্টা করুন।</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
)

export default DueManager;
