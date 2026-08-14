const fs = require('fs');

let setupCode = fs.readFileSync('components/SetupWizard.tsx', 'utf8');
const setupReplacements = [
  ["ধাপ {currentStep}", "{t.step || 'Step'} {currentStep}"],
  [">আপনার দোকানের নাম<", ">{t.storeNameTitle || 'Your Store Name'}<"],
  [">এটি আপনার ইনভয়েসে প্রদর্শিত হবে<", ">{t.storeNameDesc || 'This will be displayed on your invoice'}<"],
  ["placeholder=\"যেমন: আহমেদের মুদি দোকান\"", "placeholder={t.storeNamePlaceholder || 'e.g. Ahmed\\'s Grocery'}"],
  [">ব্যবসার ধরন<", ">{t.businessTypeTitle || 'Business Type'}<"],
  [">আপনার ব্যবসার ক্যাটেগরি নির্বাচন করুন<", ">{t.businessTypeDesc || 'Select your business category'}<"],
  [">যোগাযোগ তথ্য<", ">{t.contactInfoTitle || 'Contact Information'}<"],
  [">আপনার ব্যক্তিগত তথ্য প্রবেশ করুন<", ">{t.contactInfoDesc || 'Enter your personal information'}<"],
  [">মালিকের নাম<", ">{t.ownerName || 'Owner Name'}<"],
  ["placeholder=\"যেমন: মোহাম্মদ আহমেদ\"", "placeholder={t.ownerNamePlaceholder || 'e.g. Mohammad Ahmed'}"],
  [">ফোন নম্বর<", ">{t.phoneNo || 'Phone Number'}<"],
  ["placeholder=\"যেমন: 01912345678\"", "placeholder={t.phonePlaceholder || 'e.g. 01912345678'}"],
  [">দোকানের ঠিকানা<", ">{t.storeAddressTitle || 'Store Address'}<"],
  [">আপনার ব্যবসার অবস্থান<", ">{t.storeAddressDesc || 'Your business location'}<"],
  [">ঠিকানা<", ">{t.address || 'Address'}<"],
  ["placeholder=\"যেমন: ধানমন্ডি, রোড ৩২, বিল্ডিং ৫\"", "placeholder={t.addressPlaceholder || 'e.g. Dhanmondi, Road 32, Building 5'}"],
  [">জেলা<", ">{t.district || 'District'}<"],
  [">জেলা নির্বাচন করুন<", ">{t.selectDistrict || 'Select District'}<"],
  [">পছন্দের সেটিংস<", ">{t.prefSettings || 'Preference Settings'}<"],
  [">আপনার পছন্দ অনুযায়ী কাস্টমাইজ করুন<", ">{t.prefSettingsDesc || 'Customize according to your preference'}<"],
  [">মুদ্রা<", ">{t.currency || 'Currency'}<"],
  [">টাকা (BDT)<", ">{t.taka || 'Taka (BDT)'}<"],
  [">ডলার (USD)<", ">{t.dollar || 'Dollar (USD)'}<"],
  [">টাকা (INR)<", ">{t.rupee || 'Rupee (INR)'}<"],
  [">ভাষা<", ">{t.language || 'Language'}<"],
  [">বাংলা<", ">{t.bengali || 'Bengali'}<"],
  [">পূর্ববর্তী<", ">{t.previous || 'Previous'}<"],
  [">পরবর্তী<", ">{t.next || 'Next'}<"],
  [">সেটআপ সম্পূর্ণ করুন<", ">{t.completeSetup || 'Complete Setup'}<"],
  [">যেকোনো সময় সেটিংস থেকে এই তথ্য পরিবর্তন করতে পারবেন<", ">{t.changeAnytime || 'You can change this information anytime from settings'}<"]
];
setupCode = setupCode.replace(
  "import { useTheme } from '../context/ThemeContext';",
  "import { useTheme } from '../context/ThemeContext';\nimport { translations } from '../utils/translations';"
);
setupCode = setupCode.replace(
  "const { theme } = useTheme();",
  "const { theme, language } = useTheme();\n  const t = translations[language] as any;"
);
for (const [from, to] of setupReplacements) { setupCode = setupCode.split(from).join(to); }
fs.writeFileSync('components/SetupWizard.tsx', setupCode);

let toolsCode = fs.readFileSync('components/BusinessTools.tsx', 'utf8');
const toolsReplacements = [
  [">পণ্যের মূল্য নির্ধারণ<", ">{t.productPricing || 'Product Pricing'}<"],
  [">আপনার পণ্যের তথ্য দিয়ে লাভজনক ও আকর্ষণীয় বিক্রয়মূল্য জানুন।<", ">{t.pricingDescTool || 'Get profitable and attractive selling prices using your product info.'}<"],
  [">পণ্যের তথ্য দিন<", ">{t.giveProductInfo || 'Enter Product Info'}<"],
  [">পণ্যের নাম<", ">{t.productNameCol || 'Product Name'}<"],
  ["placeholder=\"যেমন: প্রিমিয়াম কোয়ালিটি টি-শার্ট\"", "placeholder={t.productExample || 'e.g. Premium T-Shirt'}"],
  [">ক্রয়মূল্য বা উৎপাদন খরচ (টাকা)<", ">{t.costPrice || 'Cost Price (Taka)'}<"],
  ["placeholder=\"যেমন: ২০০\"", "placeholder={t.costExample || 'e.g. 200'}"]
];
toolsCode = toolsCode.replace(
  "import { useTheme } from '../context/ThemeContext';",
  "import { useTheme } from '../context/ThemeContext';\nimport { translations } from '../utils/translations';"
);
toolsCode = toolsCode.replace(
  "const { theme } = useTheme();",
  "const { theme, language } = useTheme();\n  const t = translations[language] as any;"
);
for (const [from, to] of toolsReplacements) { toolsCode = toolsCode.split(from).join(to); }
fs.writeFileSync('components/BusinessTools.tsx', toolsCode);

