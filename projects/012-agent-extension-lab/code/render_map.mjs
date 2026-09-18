import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
  const page=await browser.newPage({viewport:{width:1800,height:2440},deviceScaleFactor:1});
  await page.goto('file:///'+path.join(root,'assets/understanding-map.svg').replaceAll('\\','/'));
  await page.evaluate(()=>document.fonts.ready);
  const overflow=await page.locator('text').evaluateAll(nodes=>nodes.filter(n=>{const b=n.getBBox();return b.x<0||b.x+b.width>1750||b.y+b.height>2440;}).map(n=>n.textContent));
  if(overflow.length)throw new Error(JSON.stringify(overflow));
  await page.screenshot({path:path.join(root,'assets/understanding-map.png')});
  console.log('PASS infographic text inside canvas; exported PNG 1800 x 2440');
}finally{await browser.close();}
