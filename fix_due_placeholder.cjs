const fs = require('fs');
let code = fs.readFileSync('components/DueManager.tsx', 'utf8');

code = code.replace("placeholder=t.custPlaceholder || 'e.g., CUST-001'", "placeholder={t.custPlaceholder || 'e.g., CUST-001'}");
code = code.replace("placeholder=t.namePlaceholder || 'Enter name'", "placeholder={t.namePlaceholder || 'Enter name'}");

fs.writeFileSync('components/DueManager.tsx', code);
