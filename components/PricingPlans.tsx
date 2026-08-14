import React from 'react';
import { Check } from 'lucide-react';
import SmartAd from './SmartAd';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../utils/translations';

const PricingPlans: React.FC = () => {
  const { currencySymbol } = useCurrency();
  const { language } = useTheme();
  const t = translations[language] as any;
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6 pb-10">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">{t.rightPlanForYou || 'Right plan for you'}</h2>
        <p className="text-slate-400">{t.pricingDesc || 'Take your business to the next level with BIZNURO AI. Choose the best plan.'}</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Plan */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <h3 className="text-2xl font-bold text-white mb-2">{t.basicPlan || 'Basic'}</h3>
          <p className="text-slate-500 mb-6">{t.basicPlanDesc || 'Best for those who are just starting out.'}</p>

          <div className="text-5xl font-bold text-white mb-2 flex items-baseline">
            ফ্রি <span className="text-xl text-slate-500 font-normal ml-2">{t.oneMonth || '1 Month'}</span>
          </div>

          <div className="space-y-4 my-8 flex-1">
            {[t.calcProfitLoss || 'Profit-Loss Calculator', t.aiChatLimited || 'AI Chat (Limited)', t.generalCalc || 'General Calculator', t.weeklyReport || 'Weekly Report'].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="text-blue-500" size={20} />
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>

          <button className="w-full py-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition font-bold">
            বর্তমান প্ল্যান
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-slate-900 border border-blue-600/30 rounded-3xl p-8 flex flex-col relative overflow-hidden shadow-2xl shadow-blue-900/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <h3 className="text-2xl font-bold text-blue-400 mb-2">{t.proPlan || 'Pro'}</h3>
          <p className="text-slate-500 mb-6">{t.proPlanDesc || 'All necessary tools for business growth.'}</p>

          <div className="text-5xl font-bold text-white mb-2 flex items-baseline">
            ৯৯৯ <span className="text-2xl font-bold ml-1 mr-2">{currencySymbol}</span> <span className="text-xl text-slate-500 font-normal">{t.perMonth || '/Month'}</span>
          </div>

          <div className="space-y-4 my-8 flex-1">
            <div className="flex items-center gap-3">
              <Check className="text-blue-500" size={20} />
              <span className="text-slate-300 font-medium">{t.everythingInBasic || 'Everything in Basic plan'}</span>
            </div>
            {[t.todoGuidance || 'To-do Guidance', t.productPricing || 'Product Pricing', t.salesGrowthIdea || 'Sales Growth Idea', t.perfAnalysis || 'Performance Analysis', t.lossPrevention || 'Loss Prevention'].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="text-blue-500" size={20} />
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>

          <a
            href="https://whatsapp.com/channel/0029VbCZLLe4NVioiCG72h11"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition font-bold shadow-lg"
          >
            প্রো প্ল্যান বেছে নিন
          </a>
        </div>

        {/* Enterprise */}
        <div className="md:col-span-2 bg-slate-950 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{t.enterprisePlan || 'Enterprise'}</h3>
            <p className="text-slate-400">{t.enterprisePlanDesc || 'Custom solutions for large businesses.'}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="text-blue-500" size={16} /> প্রো প্ল্যানের সবকিছু
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="text-blue-500" size={16} /> ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="text-blue-500" size={16} /> অগ্রাধিকার সাপোর্ট
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="text-blue-500" size={16} /> কাস্টম ইন্টিগ্রেশন
              </div>
            </div>
          </div>
          <a
            href="https://whatsapp.com/channel/0029VbCZLLe4NVioiCG72h11"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-8 py-4 rounded-xl border border-slate-600 text-white hover:bg-slate-900 transition font-bold whitespace-nowrap text-center"
          >
            যোগাযোগ করুন
          </a>
        </div>

        {/* Ad Space */}
        <div className="md:col-span-2">
          <SmartAd
            adSenseSlot="2182641593"
            adMobUnitId="ca-app-pub-6195759507222480/2182641593"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
