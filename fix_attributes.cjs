const fs = require('fs');

const files = ['components/DueManager.tsx', 'components/SalesList.tsx'];

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/title=t\.edit \|\| 'Edit'/g, "title={t.edit || 'Edit'}");
  code = code.replace(/title=t\.print \|\| 'Print'/g, "title={t.print || 'Print'}");
  code = code.replace(/title=t\.delete \|\| 'Delete'/g, "title={t.delete || 'Delete'}");
  fs.writeFileSync(file, code);
}
