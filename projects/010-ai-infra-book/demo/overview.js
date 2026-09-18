const img=document.getElementById('map');
const viewer=document.getElementById('viewer');
const level=document.getElementById('zoom-level');
let scale=1, fitted=true;
function draw(){
 img.style.width=`${Math.round(img.naturalWidth*scale)}px`;
 level.textContent=`${Math.round(scale*100)}%`;
 document.getElementById('zoom-out').disabled=scale<=0.08;
 document.getElementById('zoom-in').disabled=scale>=2;
}
function fit(){if(!img.naturalWidth)return;fitted=true;const css=getComputedStyle(viewer);scale=Math.min(1,(viewer.clientWidth-parseFloat(css.paddingLeft)-parseFloat(css.paddingRight))/img.naturalWidth,(viewer.clientHeight-parseFloat(css.paddingTop)-parseFloat(css.paddingBottom))/img.naturalHeight);draw();viewer.scrollTo(0,0)}
function zoom(factor){if(!img.naturalWidth)return;fitted=false;const old=scale;scale=Math.max(0.08,Math.min(2,scale*factor));const x=(viewer.scrollLeft+viewer.clientWidth/2)/old;const y=(viewer.scrollTop+viewer.clientHeight/2)/old;draw();viewer.scrollTo(Math.max(0,x*scale-viewer.clientWidth/2),Math.max(0,y*scale-viewer.clientHeight/2))}
document.getElementById('zoom-in').addEventListener('click',()=>zoom(1.3));
document.getElementById('zoom-out').addEventListener('click',()=>zoom(1/1.3));
document.getElementById('fit').addEventListener('click',fit);
document.getElementById('actual').addEventListener('click',()=>{if(!img.naturalWidth)return;fitted=false;scale=1;draw();viewer.scrollTo(0,0)});
img.addEventListener('load',fit);if(img.complete)fit();
window.addEventListener('resize',()=>{if(fitted)fit()});
