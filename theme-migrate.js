const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /bg-black(?!\/)/g, to: 'bg-white' }, // bg-black but not bg-black/50
  { from: /bg-\[\#0A0A0A\]/g, to: 'bg-[var(--surface-1)]' },
  { from: /bg-\[\#121212\]/g, to: 'bg-[var(--surface-2)]' },
  { from: /bg-\[\#0B1120\]/g, to: 'bg-[var(--surface-0)]' },
  { from: /text-white/g, to: 'text-[var(--text-primary)]' },
  { from: /text-slate-300/g, to: 'text-[var(--text-secondary)]' },
  { from: /text-slate-400/g, to: 'text-[var(--text-tertiary)]' },
  { from: /text-slate-200/g, to: 'text-slate-700' },
  { from: /border-white\/10/g, to: 'border-[var(--border-default)]' },
  { from: /border-white\/5/g, to: 'border-[var(--border-subtle)]' },
  { from: /bg-white\/\[0\.04\]/g, to: 'bg-black/[0.02]' },
  { from: /bg-white\/\[0\.02\]/g, to: 'bg-black/[0.01]' },
  { from: /bg-black\/60/g, to: 'bg-[var(--surface-2)]' },
  { from: /bg-black\/40/g, to: 'bg-[var(--surface-3)]' },
  { from: /bg-blue-950\/40/g, to: 'bg-blue-50' },
  { from: /bg-blue-950\/20/g, to: 'bg-blue-50/50' },
  { from: /border-blue-800\/60/g, to: 'border-blue-200' },
  { from: /text-blue-200/g, to: 'text-blue-800' },
  { from: /text-blue-300/g, to: 'text-blue-700' },
  { from: /text-blue-400/g, to: 'text-blue-600' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { from, to } of replacements) {
        content = content.replace(from, to);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

// Ensure we don't mess up global layout background by mistake if it was already light
const targetDirs = [
  path.join(__dirname, 'src', 'app'),
  path.join(__dirname, 'src', 'components')
];

for (const dir of targetDirs) {
  if (fs.existsSync(dir)) {
    processDirectory(dir);
  }
}
console.log('Done!');
