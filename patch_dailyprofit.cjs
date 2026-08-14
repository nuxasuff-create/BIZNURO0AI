const fs = require('fs');
let code = fs.readFileSync('components/DailyProfit.tsx', 'utf8');

const replacements = [
  [">প্রতিদিনের লাভ<", ">{t.dailyProfit || 'Daily Profit'}<"],
  [">সারা বছরের প্রতিদিনের আয় এবং লাভের বিস্তারিত হিসাব<", ">{t.dailyProfitDesc || 'Detailed account of daily income and profit throughout the year'}<"],
  [">{year} সাল<", ">{year} {t.year || 'Year'}<"],
  [">মোট আয় ({selectedYear})<", ">{t.totalIncome || 'Total Income'} ({selectedYear})<"],
  [">মোট লাভ ({selectedYear})<", ">{t.totalProfit || 'Total Profit'} ({selectedYear})<"],
  [">সাম্প্রতিক ৩০ দিনের লাভ/ক্ষতি গ্রাফ<", ">{t.last30DaysGraph || 'Last 30 Days Profit/Loss Graph'}<"],
  ["name=\"লাভ (Profit)\"", "name={t.profit || 'Profit'}"],
  [">প্রতিদিনের বিস্তারিত হিসাব<", ">{t.dailyDetailAccount || 'Daily Detailed Account'}<"],
  [">তারিখ<", ">{t.date || 'Date'}<"],
  [">আয়<", ">{t.income || 'Income'}<"],
  [">লাভ<", ">{t.profit || 'Profit'}<"],
  [">এই বছরে কোনো লেনদেন পাওয়া যায়নি।<", ">{t.noTransactionsThisYear || 'No transactions found for this year.'}<"]
];

code = code.replace(
  "import { useCurrency } from '../context/CurrencyContext';",
  "import { useCurrency } from '../context/CurrencyContext';\nimport { translations } from '../utils/translations';"
);

// If translations not imported yet
if (!code.includes("import { translations }")) {
  code = code.replace(
    "import { useTheme } from '../context/ThemeContext';",
    "import { useTheme } from '../context/ThemeContext';\nimport { translations } from '../utils/translations';"
  );
}

code = code.replace(
  "const { theme } = useTheme();",
  "const { theme, language } = useTheme();\n  const t = translations[language] as any;"
);

for (const [from, to] of replacements) {
  code = code.split(from).join(to);
}

fs.writeFileSync('components/DailyProfit.tsx', code);
