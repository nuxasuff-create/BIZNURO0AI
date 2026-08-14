const fs = require('fs');
let code = fs.readFileSync('components/SalesList.tsx', 'utf8');

const regex = /<div class="row bold"><span>সর্ব" \+ \(t\.total \|\| 'Total'\) \+ ":<\/span><span>\$\{currencySymbol\}\$\{sale\.amount\}<\/span><\/div>\s*\$\{settings\.showTerms \? '<div class="divider"><\/div><div style="font-size:10px;line-height:1\.4;">বিক্রীত " \+ \(t\.product \|\| 'Product'\) \+ " ফেরত নেওয়া হয় না। রসিদটি সংরক্ষণ করুন।<\/div>' : ''\}/;

const replacement = `<div class="row bold"><span>\${t.grandTotal || 'Grand Total'}:</span><span>\${currencySymbol}\${sale.amount}</span></div>
            \${settings.showTerms ? \`<div class="divider"></div><div style="font-size:10px;line-height:1.4;">\${t.returnPolicy || 'Sold goods are not returnable.'}</div>\` : ''}`;

code = code.replace(regex, replacement);
fs.writeFileSync('components/SalesList.tsx', code);
