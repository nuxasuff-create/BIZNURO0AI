const fs = require('fs');
let code = fs.readFileSync('components/SalesList.tsx', 'utf8');

const replacements = [
  ["'ধন্যবাদ! আবার আসবেন'", "t.thankYou || 'Thank You! Come again'"],
  ["'bn-BD'", "language === 'bn' ? 'bn-BD' : 'en-US'"],
  ["তারিখ:", "${t.date || 'Date'}:"],
  ["সময়:", "${t.time || 'Time'}:"],
  ["রসিদ নং:", "${t.receiptNo || 'Receipt No'}:"],
  ["গ্রাহক:", "${t.customer || 'Customer'}:"],
  ["'অজানা'", "t.unknown || 'Unknown'"],
  ["ফোন:", "${t.phone || 'Phone'}:"],
  ["পণ্য", "${t.product || 'Product'}"],
  ["মোট", "${t.total || 'Total'}"],
  ["সাবটোটাল:", "${t.subtotal || 'Subtotal'}:"],
  ["ডিসকাউন্ট:", "${t.discount || 'Discount'}:"],
  ["সর্বমোট:", "${t.grandTotal || 'Grand Total'}:"],
  ["বিক্রীত পণ্য ফেরত নেওয়া হয় না। রসিদটি সংরক্ষণ করুন।", "${t.returnPolicy || 'Sold goods are not returnable.'}"],
  [">বিক্রির তালিকা<", ">{t.salesList || 'Sales List'}<"],
  [">আপনার সমস্ত বিক্রির হিসাব এখানে দেখুন<", ">{t.salesListDesc || 'View all your sales history here'}<"],
  ["নতুন বিক্রি যোগ করুন", "{t.addNewSale || 'Add New Sale'}"],
  ["নাম বা পণ্য দিয়ে খুঁজুন...", "{t.searchPlaceholder || 'Search by name or product...'}"],
  [">নাম<", ">{t.customerNameCol || 'Name'}<"],
  [">টাকা<", ">{t.amountCol || 'Amount'}<"],
  [">পণ্যের নাম<", ">{t.productNameCol || 'Product Name'}<"],
  [">অ্যাকশন<", ">{t.action || 'Action'}<"],
  ["\"এডিট করুন\"", "t.edit || 'Edit'"],
  ["\"প্রিন্ট করুন\"", "t.print || 'Print'"],
  ["\"মুছে ফেলুন\"", "t.delete || 'Delete'"],
  [">কোনো তথ্য পাওয়া যায়নি<", ">{t.noData || 'No Data Found'}<"],
  ["{editingId ? 'বিক্রি এডিট করুন' : 'বিক্রি যোগ করুন'}", "{editingId ? (t.editSale || 'Edit Sale') : (t.addSale || 'Add Sale')}"],
  [">ক্রেতার নাম<", ">{t.customerNameCol || 'Customer Name'}<"],
  ["নাম লিখুন (ঐচ্ছিক)", "{t.nameOptional || 'Enter name (Optional)'}"],
  [">দাম (টাকা)<", ">{t.price || 'Price'} ({currencySymbol})<"],
  ["কি বিক্রি করলেন?", "{t.whatDidYouSell || 'What did you sell?'}"],
  ["{editingId ? 'আপডেট করুন' : 'যুক্ত করুন'}", "{editingId ? (t.updateBtn || 'Update') : (t.addBtn || 'Add')}"],
  [">নিশ্চিত করুন<", ">{t.confirm || 'Confirm'}<"],
  [">আপনি কি নিশ্চিত যে আপনি এই বিক্রিটি মুছে ফেলতে চান? এই কাজটি বাতিল করা যাবে না।<", ">{t.confirmDeleteDesc || 'Are you sure you want to delete this sale? This cannot be undone.'}<"],
  [">বাতিল<", ">{t.cancelBtn || 'Cancel'}<"],
  [">মুছে ফেলুন<", ">{t.delete || 'Delete'}<"]
];

code = code.replace(
  "const { currencySymbol } = useCurrency();",
  "const { currencySymbol } = useCurrency();\n  const { language } = useTheme();\n  const t = translations[language] as any;"
);
code = code.replace(
  "import { translations } from '../utils/translations';",
  "import { translations } from '../utils/translations';\nimport { useTheme } from '../context/ThemeContext';"
);

// Fallback in case import isn't there
if (!code.includes("import { translations }")) {
  code = code.replace(
    "import { useData } from '../context/DataContext';",
    "import { useData } from '../context/DataContext';\nimport { translations } from '../utils/translations';\nimport { useTheme } from '../context/ThemeContext';"
  );
}


for (const [from, to] of replacements) {
  code = code.split(from).join(to);
}

fs.writeFileSync('components/SalesList.tsx', code);
