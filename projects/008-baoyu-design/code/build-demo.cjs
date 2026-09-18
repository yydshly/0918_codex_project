// Rebuild app.js with the exact Babel vendored by the pinned upstream checkout.
const fs = require('node:fs');
const path = require('node:path');
const project = path.resolve(__dirname, '..');
const upstream = process.argv[2];
if (!upstream) throw new Error('Usage: node code/build-demo.cjs <baoyu-design-checkout>');
const Babel = require(path.resolve(upstream, 'skills/baoyu-design/agents/vendor/babel.min.js'));
const manifest = JSON.parse(fs.readFileSync(path.join(project, 'code/reader-kit/_ds_manifest.json'), 'utf8'));
const understanding = JSON.parse(fs.readFileSync(path.join(__dirname, 'understanding-data.json'), 'utf8'));
const source = ('const UNDERSTANDING = ' + JSON.stringify(understanding) + ';\n' +
  fs.readFileSync(path.join(__dirname, 'understanding.jsx'), 'utf8') + '\n' +
  fs.readFileSync(path.join(__dirname, 'app.jsx'), 'utf8')).replaceAll('__DS_NAMESPACE__', manifest.namespace);
const compiled = Babel.transform(source, {presets: ['react'], comments: true, sourceType: 'script'}).code;
fs.writeFileSync(path.join(project, 'demo/app.js'), '// Generated from code/app.jsx; run code/build-demo.cjs to update.\n' + compiled + '\n');
console.log('Compiled reader demo using upstream Babel and ' + manifest.namespace);
