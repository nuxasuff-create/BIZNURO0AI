const fs = require('fs');

// Patch Calculator
let calcCode = fs.readFileSync('components/Calculator.tsx', 'utf8');
const calcReplacements = [
  [">সাধারণ ক্যালকুলেটর<", ">{t.generalCalculator || 'General Calculator'}<"],
  [">আপনার হিসাব নিকাশ করার জন্য<", ">{t.calculatorDesc || 'For your calculations'}<"]
];
calcCode = calcCode.replace(
  "const Calculator: React.FC = () => {",
  "import { useTheme } from '../context/ThemeContext';\nimport { translations } from '../utils/translations';\n\nconst Calculator: React.FC = () => {\n  const { language } = useTheme();\n  const t = translations[language] as any;"
);
for (const [from, to] of calcReplacements) { calcCode = calcCode.split(from).join(to); }
fs.writeFileSync('components/Calculator.tsx', calcCode);


// Patch Notepad
let notepadCode = fs.readFileSync('components/Notepad.tsx', 'utf8');
const notepadReplacements = [
  [">নোটপ্যাড<", ">{t.notepad || 'Notepad'}<"],
  [">আপনার গুরুত্বপূর্ণ হিসাব ও তথ্য লিখে রাখুন<", ">{t.notepadDesc || 'Write down your important info and calculations'}<"],
  [">নোট মুছে ফেলবেন?<", ">{t.deleteNote || 'Delete note?'}<"],
  [">এই নোটটি চিরতরে মুছে যাবে।<", ">{t.deleteNoteDesc || 'This note will be deleted permanently.'}<"],
  [">বাতিল<", ">{t.cancelBtn || 'Cancel'}<"],
  [">মুছে ফেলুন<", ">{t.deleteBtn || 'Delete'}<"],
  ["placeholder=\"টাইটেল...\"", "placeholder={t.titlePlaceholder || 'Title...'}"],
  ["placeholder=\"এখানে আপনার নোট লিখুন...\"", "placeholder={t.writeNotePlaceholder || 'Write your note here...'}"],
  [">নতুন নোট<", ">{t.newNote || 'New Note'}<"],
  [">কোনো নোট নেই<", ">{t.noNotes || 'No notes'}<"],
  [">নোট যোগ করতে + বাটনে ক্লিক করুন<", ">{t.clickPlusToAddNote || 'Click + to add a note'}<"]
];
notepadCode = notepadCode.replace(
  "const Notepad: React.FC = () => {",
  "import { useTheme } from '../context/ThemeContext';\nimport { translations } from '../utils/translations';\n\nconst Notepad: React.FC = () => {\n  const { language } = useTheme();\n  const t = translations[language] as any;"
);
for (const [from, to] of notepadReplacements) { notepadCode = notepadCode.split(from).join(to); }
fs.writeFileSync('components/Notepad.tsx', notepadCode);


// Patch PrinterSettings
let printCode = fs.readFileSync('components/PrinterSettings.tsx', 'utf8');
const printReplacements = [
  ["'ধন্যবাদ! আবার আসবেন'", "t.thankYou || 'Thank You! Come again'"],
  [">প্রিন্টার সেটিংস<", ">{t.printerSettings || 'Printer Settings'}<"],
  [">আপনার থার্মাল প্রিন্টার কনফিগার করুন<", ">{t.printerSettingsDesc || 'Configure your thermal printer'}<"],
  [">সংরক্ষিত!<", ">{t.saved || 'Saved!'}<"],
  [">সেটিংস সেভ করুন<", ">{t.saveSettings || 'Save Settings'}<"],
  [">প্রিন্টার সংযোগ<", ">{t.printerConnection || 'Printer Connection'}<"],
  [">কানেকশন টাইপ<", ">{t.connectionType || 'Connection Type'}<"],
  [">নেটওয়ার্ক প্রিন্টার আইপি<", ">{t.networkPrinterIP || 'Network Printer IP'}<"],
  ["placeholder=\"যেমন: 192.168.1.100\"", "placeholder={t.exampleIP || 'e.g. 192.168.1.100'}"],
  [">রসিদ ডিজাইন<", ">{t.receiptDesign || 'Receipt Design'}<"],
  [">কাগজের সাইজ<", ">{t.paperSize || 'Paper Size'}<"],
  [">ফন্টের সাইজ<", ">{t.fontSize || 'Font Size'}<"],
  [">ছোট<", ">{t.small || 'Small'}<"],
  [">মাঝারি<", ">{t.medium || 'Medium'}<"],
  [">বড়<", ">{t.large || 'Large'}<"],
  [">ধন্যবাদ বার্তা<", ">{t.thankYouMessage || 'Thank You Message'}<"],
  ["placeholder=\"যেমন: ধন্যবাদ! আবার আসবেন\"", "placeholder={t.thankYouPlaceholder || 'e.g. Thank You! Come again'}"],
  [">প্রিন্ট অপশন<", ">{t.printOptions || 'Print Options'}<"],
  [">স্বয়ংক্রিয় প্রিন্ট (বিক্রির সাথে সাথে)<", ">{t.autoPrint || 'Auto Print'}<"],
  [">রসিদে লোগো দেখান<", ">{t.showLogo || 'Show Logo'}<"],
  [">রসিদে QR কোড দেখান<", ">{t.showQR || 'Show QR'}<"],
  [">শর্তাবলী দেখান<", ">{t.showTerms || 'Show Terms'}<"],
  [">কপি সংখ্যা<", ">{t.copies || 'Copies'}<"],
  [">রসিদের প্রিভিউ<", ">{t.receiptPreview || 'Receipt Preview'}<"],
  ["তারিখ:", "${t.date || 'Date'}:"],
  ["সময়:", "${t.time || 'Time'}:"],
  ["রসিদ নং:", "${t.receiptNo || 'Receipt No'}:"],
  ["পণ্য", "${t.product || 'Product'}"],
  ["মোট", "${t.total || 'Total'}"],
  ["মোবাইল", "${t.mobile || 'Mobile'}"],
  ["চিপস", "${t.chips || 'Chips'}"],
  ["সাবটোটাল:", "${t.subtotal || 'Subtotal'}:"],
  ["ডিসকাউন্ট:", "${t.discount || 'Discount'}:"],
  ["সর্বমোট:", "${t.grandTotal || 'Grand Total'}:"]
];
printCode = printCode.replace(
  "import { useTheme } from '../context/ThemeContext';",
  "import { useTheme } from '../context/ThemeContext';\nimport { translations } from '../utils/translations';"
);
printCode = printCode.replace(
  "const { theme } = useTheme();",
  "const { theme, language } = useTheme();\n    const t = translations[language] as any;"
);
for (const [from, to] of printReplacements) { printCode = printCode.split(from).join(to); }
fs.writeFileSync('components/PrinterSettings.tsx', printCode);

// Patch PricingPlans
let pricingCode = fs.readFileSync('components/PricingPlans.tsx', 'utf8');
const pricingReplacements = [
  [">আপনার জন্য সঠিক প্ল্যান<", ">{t.rightPlanForYou || 'Right plan for you'}<"],
  [">BIZNURO AI এর মাধ্যমে আপনার ব্যবসাকে পরবর্তী স্তরে নিয়ে যান। সেরা প্ল্যানটি বেছে নিন।<", ">{t.pricingDesc || 'Take your business to the next level with BIZNURO AI. Choose the best plan.'}<"],
  [">বেসিক<", ">{t.basicPlan || 'Basic'}<"],
  [">যারা সবে শুরু করছেন তাদের জন্য সেরা।<", ">{t.basicPlanDesc || 'Best for those who are just starting out.'}<"],
  [">ফ্রি<", ">{t.free || 'Free'}<"],
  [">১মাস<", ">{t.oneMonth || '1 Month'}<"],
  [">বর্তমান প্ল্যান<", ">{t.currentPlan || 'Current Plan'}<"],
  [">প্রো<", ">{t.proPlan || 'Pro'}<"],
  [">ব্যবসা বৃদ্ধির জন্য প্রয়োজনীয় সকল টুলস।<", ">{t.proPlanDesc || 'All necessary tools for business growth.'}<"],
  [">/মাস<", ">{t.perMonth || '/Month'}<"],
  [">বেসিক প্ল্যানের সবকিছু<", ">{t.everythingInBasic || 'Everything in Basic plan'}<"],
  [">প্রো প্ল্যান বেছে নিন<", ">{t.chooseProPlan || 'Choose Pro Plan'}<"],
  [">এন্টারপ্রাইজ<", ">{t.enterprisePlan || 'Enterprise'}<"],
  [">বড় ব্যবসার জন্য কাস্টম সমাধান।<", ">{t.enterprisePlanDesc || 'Custom solutions for large businesses.'}<"],
  [">প্রো প্ল্যানের সবকিছু<", ">{t.everythingInPro || 'Everything in Pro plan'}<"],
  [">ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার<", ">{t.dedicatedAccountManager || 'Dedicated Account Manager'}<"],
  [">অগ্রাধিকার সাপোর্ট<", ">{t.prioritySupport || 'Priority Support'}<"],
  [">কাস্টম ইন্টিগ্রেশন<", ">{t.customIntegration || 'Custom Integration'}<"],
  [">যোগাযোগ করুন<", ">{t.contactUs || 'Contact Us'}<"],
  ["'লাভ-ক্ষতি ক্যালকুলেটর'", "t.calcProfitLoss || 'Profit-Loss Calculator'"],
  ["'AI চ্যাট (সীমিত)'", "t.aiChatLimited || 'AI Chat (Limited)'"],
  ["'সাধারণ ক্যালকুলেটর'", "t.generalCalc || 'General Calculator'"],
  ["'সাপ্তাহিক রিপোর্ট'", "t.weeklyReport || 'Weekly Report'"],
  ["'করণীয় নির্দেশনা'", "t.todoGuidance || 'To-do Guidance'"],
  ["'পণ্যের মূল্য নির্ধারণ'", "t.productPricing || 'Product Pricing'"],
  ["'বিক্রি বাড়ানোর আইডিয়া'", "t.salesGrowthIdea || 'Sales Growth Idea'"],
  ["'পারফরম্যান্স বিশ্লেষণ'", "t.perfAnalysis || 'Performance Analysis'"],
  ["'ক্ষতি প্রতিরোধ'", "t.lossPrevention || 'Loss Prevention'"]
];
pricingCode = pricingCode.replace(
  "import { useCurrency } from '../context/CurrencyContext';",
  "import { useCurrency } from '../context/CurrencyContext';\nimport { useTheme } from '../context/ThemeContext';\nimport { translations } from '../utils/translations';"
);
pricingCode = pricingCode.replace(
  "const { currencySymbol } = useCurrency();",
  "const { currencySymbol } = useCurrency();\n  const { language } = useTheme();\n  const t = translations[language] as any;"
);
for (const [from, to] of pricingReplacements) { pricingCode = pricingCode.split(from).join(to); }
fs.writeFileSync('components/PricingPlans.tsx', pricingCode);

