const fs = require('fs');
let code = fs.readFileSync('components/Login.tsx', 'utf8');

code = code.replace(
  'setError("নেটিভ লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");',
  'setError(language === "en" ? "Native login failed. Please try again." : "নেটিভ লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");'
);

code = code.replace(
  'setError("লগইন বাতিল করা হয়েছে। আবার চেষ্টা করুন।");',
  'setError(language === "en" ? "Login cancelled. Please try again." : "লগইন বাতিল করা হয়েছে। আবার চেষ্টা করুন।");'
);

code = code.replace(
  'setError("গুগল সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");',
  'setError(language === "en" ? "Google sign-in failed. Please try again." : "গুগল সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");'
);

code = code.replace(
  '<span className="font-bold">কনফিগারেশন প্রয়োজন</span>',
  '<span className="font-bold">{language === "en" ? "Configuration Required" : "কনফিগারেশন প্রয়োজন"}</span>'
);

code = code.replace(
  'এই ডোমেইনটি ফায়ারবেসে অনুমোদিত নয়। অনুগ্রহ করে এটি যোগ করুন:',
  '{language === "en" ? "This domain is not authorized in Firebase. Please add it:" : "এই ডোমেইনটি ফায়ারবেসে অনুমোদিত নয়। অনুগ্রহ করে এটি যোগ করুন:"}'
);

fs.writeFileSync('components/Login.tsx', code);
