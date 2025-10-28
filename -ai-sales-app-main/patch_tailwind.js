const fs = require('fs');
const src = 'tmp_remote_tailwind.config.js';
const out = 'tmp_patched_tailwind.config.js';
let s = fs.readFileSync(src, 'utf8');
s = s.replace(/content:\s*\[[^\]]*\],/, (m) => m + "\n  safelist: ['bg-sky-blue','bg-success-green','bg-sunshine-yellow','bg-vivid-red','bg-purple-600'],");
fs.writeFileSync(out, s);
console.log('WROTE', out);
