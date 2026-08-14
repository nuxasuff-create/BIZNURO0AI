const fs = require('fs');
let code = fs.readFileSync('components/Login.tsx', 'utf8');

// 1. Add imports
code = code.replace(
  "import { useData } from '../context/DataContext';",
  "import { useData } from '../context/DataContext';\nimport { useTheme } from '../context/ThemeContext';\nimport { translations } from '../utils/translations';\nimport { Globe, ChevronDown } from 'lucide-react';"
);

// 2. Add hooks
code = code.replace(
  "const [verificationCode, setVerificationCode] = useState('');",
  "const [verificationCode, setVerificationCode] = useState('');\n  const { language, setLanguage } = useTheme();\n  const t = translations[language] as any;\n  const [showLangMenu, setShowLangMenu] = useState(false);"
);

// 3. Add language switcher to the top right
const langSwitcher = `
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={() => setShowLangMenu(!showLangMenu)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-full text-slate-200 hover:bg-slate-800 transition-all shadow-lg"
        >
          <Globe size={16} className="text-blue-400" />
          <span className="text-sm font-medium">{language === 'en' ? 'English 🇬🇧' : 'বাংলা 🇧🇩'}</span>
          <ChevronDown size={14} className={\`transition-transform \${showLangMenu ? 'rotate-180' : ''}\`} />
        </button>
        
        {showLangMenu && (
          <div className="absolute top-full right-0 mt-2 w-40 rounded-xl shadow-2xl border z-50 overflow-hidden bg-slate-800 border-slate-700 animate-fade-in-down">
            <button
              onClick={() => { setLanguage('bn'); setShowLangMenu(false); }}
              className={\`w-full text-left px-4 py-3 text-sm hover:bg-slate-700 transition-colors \${language === 'bn' ? 'font-bold text-blue-400 bg-slate-700/50' : 'text-slate-300'}\`}
            >
              বাংলা 🇧🇩
            </button>
            <button
              onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
              className={\`w-full text-left px-4 py-3 text-sm hover:bg-slate-700 transition-colors \${language === 'en' ? 'font-bold text-blue-400 bg-slate-700/50' : 'text-slate-300'}\`}
            >
              English 🇬🇧
            </button>
          </div>
        )}
      </div>
`;

code = code.replace(
  "{/* Background Effects */}",
  langSwitcher + "\n      {/* Background Effects */}"
);

// 4. Replace text
code = code.replace(
  "{isLogin ? 'স্বাগতম' : 'অ্যাকাউন্ট তৈরি করুন'}",
  "{isLogin ? t.loginTitle : t.signupTitle}"
);
code = code.replace(
  "{isLogin ? 'আপনার BIZNURO AI ড্যাশবোর্ডে প্রবেশ করতে সাইন ইন করুন' : 'BIZNURO AI দিয়ে শুরু করতে সাইন আপ করুন'}",
  "{isLogin ? t.loginDesc : t.signupDesc}"
);
code = code.replace(
  "<label className=\"text-sm font-medium text-slate-300 ml-1\">ইমেইল অ্যাড্রেস</label>",
  "<label className=\"text-sm font-medium text-slate-300 ml-1\">{t.emailLabel || 'Email'}</label>"
);
code = code.replace(
  "<label className=\"text-sm font-medium text-slate-300 ml-1\">পাসওয়ার্ড</label>",
  "<label className=\"text-sm font-medium text-slate-300 ml-1\">{t.passwordLabel || 'Password'}</label>"
);
code = code.replace(
  "{isLogin ? 'সাইন ইন' : 'সাইন আপ'}",
  "{isLogin ? (t.signInBtn || 'Sign In') : (t.signUpBtn || 'Sign Up')}"
);
code = code.replace(
  "গুগল দিয়ে চালিয়ে যান",
  "{t.googleSignIn || 'Continue with Google'}"
);
code = code.replace(
  "টেস্ট লগইন (Test Login)",
  "{t.testLoginBtn || 'Test Login'}"
);
code = code.replace(
  "অথবা এর মাধ্যমে চালিয়ে যান",
  "{t.orContinueWith || 'Or continue with'}"
);
code = code.replace(
  "আমাকে মনে রাখুন",
  "{t.rememberMe || 'Remember me'}"
);
code = code.replace(
  "পাসওয়ার্ড ভুলে গেছেন?",
  "{t.forgotPassword || 'Forgot password?'}"
);
code = code.replace(
  "{isLogin ? \"কোনো অ্যাকাউন্ট নেই? \" : \"ইতিমধ্যে একটি অ্যাকাউন্ট আছে? \"}",
  "{isLogin ? (t.noAccount || \"Don't have an account? \") : (t.alreadyHaveAccount || \"Already have an account? \")}"
);
code = code.replace(
  "{isLogin ? 'অ্যাকাউন্ট তৈরি করুন' : 'সাইন ইন'}",
  "{isLogin ? (t.createOne || 'Create one') : (t.signInInstead || 'Sign In')}"
);
code = code.replace(
  "ভেরিফিকেশন কোড",
  "{t.verificationCode || 'Verification Code'}"
);
code = code.replace(
  "আপনার মেইলে (<span className=\"text-white\">{email}</span>) পাঠানো ৬ সংখ্যার কোডটি দিন",
  "{t.verificationDesc || 'Enter the code sent to'} (<span className=\"text-white\">{email}</span>)"
);
code = code.replace(
  "যাচাই করুন",
  "{t.verifyBtn || 'Verify'}"
);


fs.writeFileSync('components/Login.tsx', code);
