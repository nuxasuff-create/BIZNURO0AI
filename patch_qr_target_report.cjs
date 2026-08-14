const fs = require('fs');

// Patch QRScanner
let code = fs.readFileSync('components/QRScanner.tsx', 'utf8');
const qrReplacements = [
  ["'✅ পণ্য যোগ করা হয়েছে'", "t.productAdded || '✅ Product Added'"],
  ["'✅ কাস্টমার স্ক্যান হয়েছে'", "t.customerScanned || '✅ Customer Scanned'"],
  ["'এই ব্রাউজারে QR স্ক্যানার নেই, স্ট্যান্ডার্ড মোড চালু করুন।'", "t.noQRScanner || 'No QR scanner in this browser, please use standard mode.'"],
  ["'ক্যামেরা অ্যাক্সেস দেওয়া হয়নি'", "t.cameraAccessDenied || 'Camera access denied'"],
  [">QR স্ক্যানার ও পণ্য QR<", ">{t.qrScannerTitle || 'QR Scanner & Product QR'}<"],
  [">পণ্য QR তৈরি করুন, ডাউনলোড করুন এবং বিক্রয় স্ক্যান করুন।<", ">{t.qrScannerDesc || 'Generate product QR, download and scan sales.'}<"],
  [">QR স্ক্যান করুন<", ">{t.scanQRBtn || 'Scan QR'}<"],
  [">পণ্যের QR কোড<", ">{t.productQRCode || 'Product QR Code'}<"],
  [">পণ্যের জন্য একটি ইউনিক QR তৈরি করুন।<", ">{t.productQRCodeDesc || 'Create a unique QR for your product.'}<"],
  [">QR প্রিন্ট করুন<", ">{t.printQR || 'Print QR'}<"],
  [">কোন পণ্য পাওয়া যায়নি। প্রথমে বিক্রয় যোগ করুন।<", ">{t.noProductFound || 'No product found. Add sales first.'}<"],
  [">সিলেক্ট<", ">{t.select || 'Select'}<"],
  [">ডাউনলোড<", ">{t.download || 'Download'}<"],
  [">কাস্টমার QR কোড<", ">{t.customerQRCode || 'Customer QR Code'}<"],
  [">গ্রাহকদের দ্রুত শনাক্ত করতে একটি QR তৈরি করুন।<", ">{t.customerQRCodeDesc || 'Create a QR to quickly identify customers.'}<"],
  [">স্ক্যানার স্ট্যাটাস<", ">{t.scannerStatus || 'Scanner Status'}<"],
  [">সেলস কার্ট<", ">{t.salesCart || 'Sales Cart'}<"],
  [">কোন পণ্য যোগ করা হয়নি।<", ">{t.noProductAdded || 'No product added.'}<"],
  [">মোট<", ">{t.total || 'Total'}<"],
  [">বিক্রি সম্পন্ন করুন<", ">{t.completeSale || 'Complete Sale'}<"],
  [">QR ভিউফাইন্ডার<", ">{t.qrViewfinder || 'QR Viewfinder'}<"],
  [">ক্যামেরা খুলুন এবং পণ্যের QR কোড স্ক্যান করুন।<", ">{t.qrViewfinderDesc || 'Open camera and scan product QR code.'}<"],
  [">পথনির্দেশ<", ">{t.instructions || 'Instructions'}<"],
  [">ক্যামেরার অনুমতি দিন।<", ">{t.allowCamera || 'Allow camera access.'}<"],
  [">QR কোড স্ক্যান করুন।<", ">{t.scanQRCode || 'Scan QR code.'}<"],
  [">পণ্য স্বয়ংক্রিয়ভাবে কার্টে যোগ হবে।<", ">{t.productAutoCart || 'Product will be added to cart automatically.'}<"]
];
code = code.replace(
  "import { useCurrency } from '../context/CurrencyContext';",
  "import { useCurrency } from '../context/CurrencyContext';\nimport { useTheme } from '../context/ThemeContext';\nimport { translations } from '../utils/translations';"
);
if (!code.includes("const { language } = useTheme();")) {
  code = code.replace(
    "const { currencySymbol } = useCurrency();",
    "const { currencySymbol } = useCurrency();\n    const { language } = useTheme();\n    const t = translations[language] as any;"
  );
}
for (const [from, to] of qrReplacements) { code = code.split(from).join(to); }
fs.writeFileSync('components/QRScanner.tsx', code);


// Patch TargetHistory
let targetCode = fs.readFileSync('components/TargetHistory.tsx', 'utf8');
const targetReplacements = [
  [">লক্ষ্য ইতিহাস<", ">{t.targetHistory || 'Target History'}<"],
  [">গত ৩০ দিনের মধ্যে লক্ষ্য বনাম অর্জিত বিক্রয় দেখুন।<", ">{t.targetHistoryDesc || 'View target vs achieved sales over the last 30 days.'}<"],
  [">সফলতার হার<", ">{t.successRate || 'Success Rate'}<"],
  ["/ 30 দিন", "/ 30 {t.days || 'Days'}"],
  ["> লক্ষ্য বনাম অর্জন<", ">{t.targetVsAchieved || ' Target vs Achieved'}<"],
  [">প্রতিদিনের লক্ষ্য ও আসল বিক্রয়ে তুলনা করা হচ্ছে।<", ">{t.targetVsAchievedDesc || 'Comparing daily target and actual sales.'}<"],
  ["/> লক্ষ্য", "/> {t.target || 'Target'}"],
  ["/> অর্জিত", "/> {t.achieved || 'Achieved'}"],
  ["name=\"লক্ষ্য\"", "name={t.target || 'Target'}"],
  ["name=\"অর্জিত\"", "name={t.achieved || 'Achieved'}"]
];
targetCode = targetCode.replace(
  "import { useCurrency } from '../context/CurrencyContext';",
  "import { useCurrency } from '../context/CurrencyContext';\nimport { useTheme } from '../context/ThemeContext';\nimport { translations } from '../utils/translations';"
);
if (!targetCode.includes("const { language } = useTheme();")) {
  targetCode = targetCode.replace(
    "const { currencySymbol } = useCurrency();",
    "const { currencySymbol } = useCurrency();\n    const { language } = useTheme();\n    const t = translations[language] as any;"
  );
}
for (const [from, to] of targetReplacements) { targetCode = targetCode.split(from).join(to); }
fs.writeFileSync('components/TargetHistory.tsx', targetCode);


// Patch Reports
let reportCode = fs.readFileSync('components/Reports.tsx', 'utf8');
const reportReplacements = [
  [">সাপ্তাহিক রিপোর্ট<", ">{t.weeklyReport || 'Weekly Report'}<"],
  [">আপনার গত সাত দিনের ব্যবসার একটি সামগ্রিক চিত্র।<", ">{t.weeklyReportDesc || 'An overall picture of your business for the last seven days.'}<"],
  [">আজকের বিক্রি<", ">{t.todaySales || 'Today\\'s Sales'}<"],
  [">মোট বিক্রি<", ">{t.totalSales || 'Total Sales'}<"],
  ["{totalSales.toLocaleString()} টাকা", "{currencySymbol}{totalSales.toLocaleString()}"],
  [">নেট লাভ/ক্ষতি<", ">{t.netProfitLoss || 'Net Profit/Loss'}<"],
  ["{netProfit.toLocaleString()} টাকা", "{currencySymbol}{netProfit.toLocaleString()}"],
  [">সবচেয়ে বেশি বিক্রির দিন<", ">{t.bestSellingDay || 'Best Selling Day'}<"],
  ["? `${bestSellingDay.sales.toLocaleString()} টাকা` : '0 টাকা'", "? `${currencySymbol}${bestSellingDay.sales.toLocaleString()}` : `${currencySymbol}0`"],
  [">দৈনিক রিপোর্ট<", ">{t.dailyReport || 'Daily Report'}<"],
  [">গত সাত দিনের দৈনিক আয় এবং ব্যয়ের হিসাব।<", ">{t.dailyReportDesc || 'Daily income and expense account for the last seven days.'}<"],
  [">দিন<", ">{t.day || 'Day'}<"],
  [">বিক্রি (টাকা)<", ">{t.salesAmount || 'Sales Amount'}<"],
  [">লাভ (টাকা)<", ">{t.profitAmount || 'Profit Amount'}<"],
  [">⚡</span> AI বিশ্লেষণ<", ">⚡</span> {t.aiAnalysis || 'AI Analysis'}<"],
  [">নতুন বিক্রি যোগ করুন<", ">{t.addNewSale || 'Add New Sale'}<"],
  [">নাম (ঐচ্ছিক)<", ">{t.nameOptional || 'Name (Optional)'}<"],
  ["placeholder=\"কাস্টমারের নাম\"", "placeholder={t.customerNameCol || 'Customer Name'}"],
  [">টাকা<", ">{t.amountCol || 'Amount'}<"],
  [">মালের নাম<", ">{t.productNameCol || 'Product Name'}<"],
  ["placeholder=\"পণ্যের নাম\"", "placeholder={t.productNameCol || 'Product Name'}"],
  [">বিক্রি যোগ করুন<", ">{t.addSaleBtn || 'Add Sale'}<"]
];
reportCode = reportCode.replace(
  "import { useData } from '../context/DataContext';",
  "import { useData } from '../context/DataContext';\nimport { useTheme } from '../context/ThemeContext';\nimport { translations } from '../utils/translations';\nimport { useCurrency } from '../context/CurrencyContext';"
);
if (!reportCode.includes("const { language } = useTheme();")) {
  reportCode = reportCode.replace(
    "const Reports: React.FC<ReportsProps> = ({ setView }) => {",
    "const Reports: React.FC<ReportsProps> = ({ setView }) => {\n  const { language } = useTheme();\n  const t = translations[language] as any;\n  const { currencySymbol } = useCurrency();"
  );
}
for (const [from, to] of reportReplacements) { reportCode = reportCode.split(from).join(to); }
fs.writeFileSync('components/Reports.tsx', reportCode);

