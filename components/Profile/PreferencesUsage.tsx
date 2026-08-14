import React from 'react';
import { Settings, Zap, CreditCard } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const PreferencesUsage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-slate-800/50">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Settings className="text-indigo-400" /> Preferences & AI Usage
        </h3>
      </div>

      {/* Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl bg-black/20 border border-slate-800/50 flex items-center justify-between">
          <span className="text-slate-400 font-medium">Dark Mode</span>
          <button
            onClick={toggleTheme}
            className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-700'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* AI Usage */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <Zap className="text-indigo-400" size={18} /> AI Usage
          </h4>
          <span className="text-sm text-slate-400 font-mono">850 / 1000 queries</span>
        </div>
        <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 rounded-full" style={{ width: '85%' }}></div>
        </div>
      </div>

      {/* Subscription */}
      <div className="p-6 rounded-2xl bg-indigo-900/20 border border-indigo-500/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
            <CreditCard size={24} />
          </div>
          <div>
            <h4 className="font-bold text-white">Pro Plan</h4>
            <p className="text-xs text-indigo-300/70">Renewing on Sept 1, 2026</p>
          </div>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-lg">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
};

export default PreferencesUsage;
