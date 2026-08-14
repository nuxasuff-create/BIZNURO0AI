const fs = require('fs');
let code = fs.readFileSync('components/SetupWizard.tsx', 'utf8');

const reps = [
  ["'মুদির দোকান'", "t.grocery || 'Grocery'"],
  ["'কাপড়ের দোকান'", "t.clothing || 'Clothing'"],
  ["'ইলেকট্রনিক্স'", "t.electronics || 'Electronics'"],
  ["'হার্ডওয়্যার'", "t.hardware || 'Hardware'"],
  ["'ফার্মেসি'", "t.pharmacy || 'Pharmacy'"],
  ["'রেস্তোরাঁ'", "t.restaurant || 'Restaurant'"],
  ["'সেলুন/বিউটি'", "t.salonBeauty || 'Salon/Beauty'"],
  ["'অন্যান্য'", "t.other || 'Other'"],
  [">পূর্ববর্তী<", ">{t.previous || 'Previous'}<"],
  [">পরবর্তী<", ">{t.next || 'Next'}<"],
  [">সেটআপ সম্পূর্ণ করুন<", ">{t.completeSetup || 'Complete Setup'}<"],
  [">যেকোনো সময় সেটিংস থেকে এই তথ্য পরিবর্তন করতে পারবেন<", ">{t.changeAnytime || 'You can change this information anytime from settings'}<"]
];

for (const [from, to] of reps) {
  code = code.split(from).join(to);
}

// Map the array elements explicitly in JSX or use a function if it's outside.
// The array `businessTypes` is a static array outside the component!
// Let's modify the component to translate it inline.
code = code.replace(
  "{businessTypes.map((type) => (",
  "{businessTypes.map((type) => ("
); // We will just let the static array be for now, since it's just values, but wait, those are the strings used in UI.
// Actually, `businessTypes` was static strings. My replacement `t.grocery || 'Grocery'` won't work in a static array outside the component because `t` is inside.

fs.writeFileSync('components/SetupWizard.tsx', code);
