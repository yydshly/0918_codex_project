import {fileURLToPath,pathToFileURL} from 'node:url';
import {readFile} from 'node:fs/promises';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const root=fileURLToPath(new URL('../',import.meta.url));
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
 const page=await browser.newPage({viewport:{width:3000,height:2280},deviceScaleFactor:1});
 await page.setContent('<!doctype html><html><head><style>html,body{margin:0;padding:0;}svg{display:block}</style></head><body>'+await readFile(root+'/assets/understanding-map.svg','utf8')+'</body></html>');
 await page.evaluate(()=>document.fonts.ready);
 const overflow=await page.locator('svg text').evaluateAll(texts=>texts.filter(t=>{const b=t.getBBox();return b.x<0||b.x+b.width>3000||b.y+b.height>2280}).map(t=>t.textContent));
 if(overflow.length)throw new Error(JSON.stringify(overflow));
 await page.locator('svg').screenshot({path:root+'/assets/understanding-map.png'});
 console.log('Rendered 3000 × 2280 PNG, text within canvas.');
}finally{await browser.close()}
