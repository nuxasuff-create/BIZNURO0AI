const fs = require('fs');
let code = fs.readFileSync('components/Home.tsx', 'utf8');

const replacements = [
  ["'সফল'", "t.successStatus || 'Success'"],
  ["'ভালো'", "t.goodStatus || 'Good'"],
  ["'সতর্ক'", "t.warningStatus || 'Warning'"],
  ["'বিপদ'", "t.dangerStatus || 'Danger'"],
  ["'আজকের বিক্রি'", "t.todaySales || 'Today\\'s Sales'"],
  ["'মোট বকেয়া'", "t.totalDue || 'Total Due'"],
  ["'আজকের লাভ'", "t.todayProfit || 'Today\\'s Profit'"],
  ["'বকেয়া খাতা'", "t.dueBook || 'Due Ledger'"],
  ["'ইনভয়েস তৈরি'", "t.createInvoice || 'Create Invoice'"],
  ["'AI পরামর্শ'", "t.aiAdvice || 'AI Advice'"],
  ["'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'", "t.sunday, t.monday, t.tuesday, t.wednesday, t.thursday, t.friday, t.saturday"],
  ["আজ ${today}, ব্যবসার জন্য একটি নতুন দিন। আপনার স্টকে যথেষ্ট পণ্য আছে তো? নিয়মিত হিসাব রাখলে ব্যবসার উন্নতি নিশ্চিত।", "${t.newDayTip}"],
  ["আজ ${today}, আপনার ব্যবসার জন্য সেরা দিন! গত সপ্তাহের রিপোর্ট অনুযায়ী এই দিনে বিক্রি সবচেয়ে বেশি হয়। ক্রেতাদের জন্য বিশেষ অফার রাখতে পারেন।", "${t.bestDayTip}"],
  ["আজ ${today}। গত সপ্তাহের রিপোর্ট অনুযায়ী ${bestDay} আপনার বিক্রির জন্য সবচেয়ে ভালো দিন ছিল। আজকের দিনের বিক্রি বাড়াতে নতুন কোনো অফার দিতে পারেন।", "${t.increaseSaleTip ? `Today is ${today}. ${bestDay} ${t.increaseSaleTip}` : `Today is ${today}. ${bestDay} was the best sales day.`}"],
  ["আজকের বিক্রয়", "{t.todaySalesLabel || 'Today\\'s Sales'}"],
  ["% সম্পন্ন", "% {t.completedLabel || 'Completed'}"],
  ["targetStatus === 'সফল' ? 'আজকের লক্ষ্য পূরণ হয়েছে!' : targetStatus === 'ভালো' ? 'লক্ষ্যে খুব কাছে' : targetStatus === 'সতর্ক' ? 'আপনি সঠিক পথে আছেন' : 'দ্রুত বিক্রি বাড়ান'", "targetStatus === (t.successStatus || 'Success') ? t.targetSuccessStatus : targetStatus === (t.goodStatus || 'Good') ? t.targetGoodStatus : targetStatus === (t.warningStatus || 'Warning') ? t.targetWarningStatus : t.targetDangerStatus"],
  [">অভিনন্দন!<", ">{t.congratulations || 'Congratulations!'}<"],
  [">আজকের লক্ষ্যমাত্রা পূরণ হয়েছে!<", ">{t.targetReached || 'Target Reached'}<"],
  ["চমৎকার কাজ! আপনি আজ <span", "{t.greatJobToday} <span"],
  ["</span> টাকা বিক্রয় করেছেন", "</span> {t.salesDone}"],
  ["এখনই আরও {t.setTarget} করুন এবং বিক্রয় বৃদ্ধির পরিকল্পনা করুন।", "{t.planMoreTarget}"],
  [">বন্ধ করুন<", ">{t.closeBtn || t.close}<"],
  [">লক্ষ্যমাত্রা নির্ধারণ<", ">{t.setTargetTitle || 'Set Target'}<"],
  [">দৈনিক লক্ষ্যমাত্রা (টাকা)<", ">{t.dailyTarget || 'Daily Target'}<"],
  [">সাপ্তাহিক লক্ষ্যমাত্রা (টাকা)<", ">{t.weeklyTarget || 'Weekly Target'}<"],
  [">মাসিক লক্ষ্যমাত্রা (টাকা)<", ">{t.monthlyTarget || 'Monthly Target'}<"],
  [">বাতিল<", ">{t.cancelBtn || 'Cancel'}<"],
  [">সেভ করুন<", ">{t.saveBtn || 'Save'}<"],
  [">লাভ যোগ করুন<", ">{t.addProfit || 'Add Profit'}<"],
  [">কত টাকা যোগ করবেন?<", ">{t.howMuchProfit || 'How much?'}<"],
  ["বর্তমান লাভ:", "{t.currentProfit || 'Current Profit:'}"],
  [">রিসেট<", ">{t.resetBtn || 'Reset'}<"],
  [">যোগ করুন<", ">{t.addBtn || 'Add'}<"],
  [">দ্রুত অ্যাকশন<", ">{t.fastActions || 'Quick Actions'}<"],
  [">সাম্প্রতিক লেনদেন<", ">{t.recentTransactions || 'Recent Transactions'}<"],
  ["সব দেখুন <ArrowRight", "{t.seeAll || 'See All'} <ArrowRight"],
  ["'অজানা লেনদেন'", "t.unknownTransaction || 'Unknown'"],
  [">কোনো সাম্প্রতিক লেনদেন নেই<", ">{t.noRecentTransactions || 'No recent transactions'}<"],
  [">আজকের টিপস<", ">{t.todayTips || 'Today\\'s Tips'}<"],
  [">বিস্তারিত আলোচনা করুন<", ">{t.discussDetail || 'Discuss in detail'}<"]
];

for (const [from, to] of replacements) {
  code = code.split(from).join(to);
}

fs.writeFileSync('components/Home.tsx', code);
