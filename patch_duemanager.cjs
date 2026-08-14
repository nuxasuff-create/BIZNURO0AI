const fs = require('fs');
let code = fs.readFileSync('components/DueManager.tsx', 'utf8');

const replacements = [
  ["'বকেয়া সংরক্ষণ করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।'", "t.dueSaveError || 'Could not save due. Please try again.'"],
  [">বকেয়া তথ্য হালনাগাদ<", ">{t.updateDueInfo || 'Update Due Info'}<"],
  [">কাস্টমার আইডি (Customer ID)<", ">{t.customerId || 'Customer ID'}<"],
  [">গ্রাহকের নাম<", ">{t.customerNameCol || 'Customer Name'}<"],
  [">বকেয়ার পরিমাণ (টাকা)<", ">{t.dueAmount || 'Due Amount'} ({currencySymbol})<"],
  [">কতদিন বাকি<", ">{t.daysPending || 'Days Pending'}<"],
  [">বাতিল<", ">{t.cancelBtn || 'Cancel'}<"],
  [">সংরক্ষণ করুন<", ">{t.saveBtn || 'Save'}<"],
  [">নতুন বকেয়া যোগ করুন<", ">{t.addNewDue || 'Add New Due'}<"],
  ["\"যেমন: CUST-001\"", "t.custPlaceholder || 'e.g., CUST-001'"],
  ["\"নাম লিখুন\"", "t.namePlaceholder || 'Enter name'"],
  [">মোবাইল নম্বর<", ">{t.mobileNo || 'Mobile Number'}<"],
  [">ঝুঁকির মাত্রা<", ">{t.riskLevel || 'Risk Level'}<"],
  [">নিম্ন<", ">{t.lowRisk || 'Low Risk'}<"],
  [">মধ্যম<", ">{t.mediumRisk || 'Medium Risk'}<"],
  [">উচ্চ ঝুঁকি<", ">{t.highRisk || 'High Risk'}<"],
  ["{isAdding ? 'যোগ করা হচ্ছে...' : 'যোগ করুন'}", "{isAdding ? (t.adding || 'Adding...') : (t.addBtn || 'Add')}"],
  [">বকেয়া তালিকা<", ">{t.dueBook || 'Due Ledger'}<"],
  [">আপনার গ্রাহকদের বকেয়া দেখুন এবং তালিকা সম্পাদন করুন।<", ">{t.dueListDesc || 'View your customers dues and edit the list.'}<"],
  [">সারাংশ<", ">{t.summary || 'Summary'}<"],
  ["মোট বকেয়া: {totalDue.toLocaleString()} টাকা", "{t.totalDue || 'Total Due'}: {currencySymbol}{totalDue.toLocaleString()}"],
  ["নতুন বকেয়া যোগ করুন", "{t.addNewDue || 'Add New Due'}"],
  ["গ্রাহক-ভিত্তিক বকেয়া", "{t.customerBasedDue || 'Customer-based Due'}"],
  ["\"গ্রাহকের নাম বা মোবাইল নম্বর দিয়ে খুঁজুন...\"", "t.searchCustomer || 'Search by customer name or mobile number...'"],
  ["মোবাইল {due.mobile}", "{t.mobileNo || 'Mobile'} {due.mobile}"],
  ["\"এডিট করুন\"", "t.edit || 'Edit'"],
  ["{due.amount.toLocaleString()} টাকা", "{currencySymbol}{due.amount.toLocaleString()}"],
  ["{due.daysPending} দিন বাকি", "{due.daysPending} {t.daysRemaining || 'days remaining'}"],
  ["{due.risk === 'High' ? 'উচ্চ ঝুঁকি' : due.risk === 'Medium' ? 'মধ্যম' : 'নিম্ন'}", "{due.risk === 'High' ? (t.highRisk || 'High Risk') : due.risk === 'Medium' ? (t.mediumRisk || 'Medium Risk') : (t.lowRisk || 'Low Risk')}"],
  [">কোনো বকেয়া পাওয়া যায়নি।<", ">{t.noDueFound || 'No dues found.'}<"],
  [">বকেয়া বিশ্লেষণ<", ">{t.dueAnalysis || 'Due Analysis'}<"],
  [">অ্যাডমিন প্যানেল থেকে বকেয়া সম্পর্কিত বিশ্লেষণ ও পরামর্শ দেখুন।<", ">{t.dueAnalysisDesc || 'View due analysis and suggestions.'}<"],
  [">মোট বকেয়া<", ">{t.totalDue || 'Total Due'}<"],
  ["{totalDue.toLocaleString()} টাকা", "{currencySymbol}{totalDue.toLocaleString()}"],
  [">সময়োত্তীর্ণ (৩০+ দিন)<", ">{t.overdue30 || 'Overdue (30+ days)'}<"],
  ["টি ব্যবসা", "{t.businesses || 'businesses'}"],
  [">উচ্চ ঝুঁকিপূর্ণ ব্যবসা<", ">{t.highRiskBusiness || 'High risk business'}<"],
  [">বিস্তারিত বকেয়া তালিকা<", ">{t.detailedDueList || 'Detailed Due List'}<"],
  [">ঝুঁকির মাত্রা অনুযায়ী সকল গ্রাহকের তালিকা।<", ">{t.dueListRiskDesc || 'List of all customers by risk level.'}<"],
  ["{due.amount} টাকা", "{currencySymbol}{due.amount}"],
  ["{due.daysPending} দিন", "{due.daysPending} {t.days || 'days'}"],
  [">অ্যাডমিনের জন্য পরামর্শ<", ">{t.adminAdvice || 'Advice for Admin'}<"],
  [">মোট বকেয়ার পরিমাণ বেশ উল্লেখযোগ্য। বিশেষ করে যে সমস্ত ব্যবসা ৩০ দিনের বেশি সময় ধরে বকেয়া রেখেছে, তাদের দিকে নজর দেওয়া প্রয়োজন।<", ">{t.dueAdviceDesc || 'Total due amount is significant. Especially businesses with dues over 30 days need attention.'}<"],
  [">রিমাইন্ডার পাঠান:<", ">{t.sendReminder || 'Send Reminder:'}<"],
  [">যেসকল ব্যবসার বকেয়া 'মধ্যম' বা 'উচ্চ' ঝুঁকিতে আছে, তাদের ফোন কল বা WhatsApp এর মাধ্যমে ভদ্রভাবে একটি রিমাইন্ডার দিন।<", ">{t.reminderAdvice || 'Gently remind businesses with medium or high risk dues via phone call or WhatsApp.'}<"],
  [">নতুন ক্রেডিট সীমাবদ্ধ করুন:<", ">{t.limitCredit || 'Limit New Credit:'}<"],
  [">'উচ্চ ঝুঁকি' চিহ্নিত ব্যবসাগুলোকে নতুন করে বাকিতে পণ্য দেওয়ার আগে পুরনো বকেয়ার আংশিক পরিশোধের জন্য অনুরোধ করুন।<", ">{t.limitCreditAdvice || 'Request partial payment of old dues from high risk businesses before giving them new products on credit.'}<"],
  [">আলোচনা করুন:<", ">{t.discuss || 'Discuss:'}<"],
  [">বড় অংকের বকেয়ার ক্ষেত্রে গ্রাহকের সাথে সরাসরি কথা বলে পেমেন্টের একটি সম্ভাব্য তারিখ নির্ধারণ করার চেষ্টা করুন।<", ">{t.discussAdvice || 'For large amounts of dues, try to set a possible payment date by talking directly to the customer.'}<"]
];

code = code.replace(
  "import { useData } from '../context/DataContext';",
  "import { useData } from '../context/DataContext';\nimport { useTheme } from '../context/ThemeContext';\nimport { translations } from '../utils/translations';\nimport { useCurrency } from '../context/CurrencyContext';"
);

code = code.replace(
  "const DueManager: React.FC<DueManagerProps> = ({ view }) => {",
  "const DueManager: React.FC<DueManagerProps> = ({ view }) => {\n  const { language } = useTheme();\n  const t = translations[language] as any;\n  const { currencySymbol } = useCurrency();"
);

for (const [from, to] of replacements) {
  code = code.split(from).join(to);
}

fs.writeFileSync('components/DueManager.tsx', code);
