const fs = require('fs');
let code = fs.readFileSync('components/Invoice.tsx', 'utf8');

const replacements = [
  [">ফিরে যান<", ">{t.goBack || 'Go Back'}<"],
  [">রসিদ<", ">{t.receipt || 'Receipt'}<"],
  [">তারিখ<", ">{t.date || 'Date'}<"],
  [">ইনভয়েস নম্বর<", ">{t.invoiceNo || 'Invoice No'}<"],
  [">গ্রাহকের তথ্য<", ">{t.customerInfo || 'Customer Info'}<"],
  ["placeholder=\"গ্রাহকের নাম\"", "placeholder={t.customerNamePlaceholder || 'Customer Name'}"],
  ["placeholder=\"ফোন নম্বর\"", "placeholder={t.phonePlaceholder || 'Phone Number'}"],
  [">বিবরণ<", ">{t.description || 'Description'}<"],
  [">পরিমাণ<", ">{t.quantity || 'Quantity'}<"],
  [">দর<", ">{t.rate || 'Rate'}<"],
  [">মোট<", ">{t.total || 'Total'}<"],
  ["'পণ্য'", "t.product || 'Product'"],
  [">শর্তাবলী<", ">{t.termsAndConditions || 'Terms & Conditions'}<"],
  [">বিক্রীত পণ্য ফেরত নেওয়া হয় না। যেকোনো প্রয়োজনে রসিদটি সংরক্ষণ করুন।<", ">{t.returnPolicyFull || 'Sold goods are not returnable. Please keep the receipt for any needs.'}<"],
  [">সাবটোটাল<", ">{t.subtotal || 'Subtotal'}<"],
  [">ডিসকাউন্ট<", ">{t.discount || 'Discount'}<"],
  [">সর্বমোট<", ">{t.grandTotal || 'Grand Total'}<"],
  [">ধন্যবাদ, আবার আসবেন<", ">{t.thankYouVisitAgain || 'Thank you, visit again'}<"],
  ["title=\"ডাউনলোড\"", "title={t.download || 'Download'}"],
  [">এডিট করুন<", ">{t.edit || 'Edit'}<"],
  [">প্রিন্ট করুন<", ">{t.printBtn || 'Print'}<"],
  [">ডাউনলোড করুন<", ">{t.downloadBtn || 'Download'}<"],
  [">ইনভয়েস জেনারেটর<", ">{t.invoiceGenerator || 'Invoice Generator'}<"],
  [">ডিজিটাল ইনভয়েস ও রসিদ<", ">{t.digitalInvoice || 'Digital Invoice & Receipt'}<"],
  [">গ্রাহকের জন্য পেশাদার ইনভয়েস তৈরি করুন, AI দিয়ে স্বয়ংক্রিয়ভাবে পণ্যের তালিকা পূরণ করুন এবং সহজে শেয়ার করুন।<", ">{t.invoiceDesc || 'Create professional invoices for customers, auto-fill product list using AI, and share easily.'}<"],
  [">গ্রাহকের নাম<", ">{t.customerNameCol || 'Customer Name'}<"],
  ["placeholder=\"যেমন: মিঃ করিম\"", "placeholder={t.exampleMrKarim || 'e.g. Mr. Karim'}"],
  [">গ্রাহকের ফোন নম্বর<", ">{t.customerPhone || 'Customer Phone'}<"],
  ["placeholder=\"যেমন: 017...\"", "placeholder={t.examplePhone || 'e.g. 017...'}"],
  [">পণ্যের তালিকা<", ">{t.productList || 'Product List'}<"],
  ["placeholder=\"AI কে বলুন: ৫ কেজি চাল, ২ লিটার তেল...\"", "placeholder={t.aiPromptPlaceholder || 'Tell AI: 5 kg rice, 2 liter oil...'}"],
  [">ম্যাজিক পূরণ<", ">{t.magicFill || 'Magic Fill'}<"],
  [">পণ্যের নাম<", ">{t.productNameCol || 'Product Name'}<"],
  [">মূল্য ({currencySymbol})<", ">{t.price || 'Price'} ({currencySymbol})<"],
  ["placeholder=\"পণ্যের নাম\"", "placeholder={t.productNameCol || 'Product Name'}"],
  ["placeholder=\"মূল্য\"", "placeholder={t.price || 'Price'}"],
  ["title=\"মুছে ফেলুন\"", "title={t.delete || 'Delete'}"],
  [">নতুন পণ্য যোগ করুন<", ">{t.addNewProduct || 'Add New Product'}<"],
  [">ডিসকাউন্ট (টাকা)<", ">{t.discountAmount || 'Discount Amount'}<"],
  [">ইনভয়েস তৈরি করুন<", ">{t.createInvoice || 'Create Invoice'}<"]
];

code = code.replace(
  "import { useCurrency } from '../context/CurrencyContext';",
  "import { useCurrency } from '../context/CurrencyContext';\nimport { useTheme } from '../context/ThemeContext';\nimport { translations } from '../utils/translations';"
);

code = code.replace(
  "const Invoice: React.FC = () => {",
  "const Invoice: React.FC = () => {\n  const { language } = useTheme();\n  const t = translations[language] as any;"
);

for (const [from, to] of replacements) {
  code = code.split(from).join(to);
}

fs.writeFileSync('components/Invoice.tsx', code);
