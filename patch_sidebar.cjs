const fs = require('fs');
let code = fs.readFileSync('components/Sidebar.tsx', 'utf8');

const replacements = [
  ["'সফল'", "t.successStatus || 'Success'"],
  ["'ভালো'", "t.goodStatus || 'Good'"],
  ["'সতর্ক'", "t.warningStatus || 'Warning'"],
  ["'বিপদ'", "t.dangerStatus || 'Danger'"],
  ["'ক্ষতি প্রতিরোধ'", "'Loss Prevention'"], // Will be handled by t.lossPrevention
  [">আজকের লক্ষ্য পূরণ<", ">{t.todayTargetCompletion || 'Today\\'s Target Completion'}<"]
];

for (const [from, to] of replacements) {
  code = code.split(from).join(to);
}

fs.writeFileSync('components/Sidebar.tsx', code);
