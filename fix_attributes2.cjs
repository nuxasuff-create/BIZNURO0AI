const fs = require('fs');
let code = fs.readFileSync('components/DueManager.tsx', 'utf8');
code = code.replace(/placeholder=t\.searchCustomer/g, "placeholder={t.searchCustomer");
code = code.replace(/mobile number\.\.\.'/g, "mobile number...'}");
fs.writeFileSync('components/DueManager.tsx', code);
