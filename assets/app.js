
const PAGES=["assets/pages/1.webp", "assets/pages/2.webp", "assets/pages/3.webp", "assets/pages/4.webp", "assets/pages/5.webp", "assets/pages/6.webp", "assets/pages/7.svg"];
const $=id=>document.getElementById(id), book=$('book'), mq=matchMedia('(max-width:640px)');let step=0,page=0,busy=false,zoomPage=0,previousFocus=null;
const PAGE_COUNT=PAGES.length, SHEET_COUNT=Math.ceil(PAGE_COUNT/2), LAST_STEP=Math.floor(PAGE_COUNT/2);
function pageStep(p){return Math.ceil(p/2)}
for(let i=0;i<SHEET_COUNT;i++){const sheet=document.createElement('div');sheet.className='sheet';const front=i*2,back=front+1;
sheet.innerHTML=`<div class="face front"><img src="${PAGES[front]}" alt="Página ${front+1}" draggable="false"></div><div class="face back">${back<PAGE_COUNT?`<img src="${PAGES[back]}" alt="Página ${back+1}" draggable="false">`:''}</div>`;
sheet.children[0].onclick=()=>openZoom(front);
if(back<PAGE_COUNT)sheet.children[1].onclick=()=>openZoom(back);
book.append(sheet)}
const edge=document.createElement('div');edge.className='edge';book.append(edge);
function render(){
  const single=mq.matches;
  if(single)step=pageStep(page);else page=step===0?0:step*2-1;
  const closedEnd=PAGE_COUNT%2===0&&step===LAST_STEP;
  book.classList.toggle('open',step>0&&!closedEnd);
  book.classList.toggle('end',closedEnd);
  [...book.querySelectorAll('.sheet')].forEach((s,i)=>{const flipped=i<step;s.classList.toggle('flipped',flipped);s.style.zIndex=flipped?i+1:SHEET_COUNT*2-i;});
  edge.style.display=step>0&&!closedEnd?'block':'none';
  edge.style.zIndex=SHEET_COUNT*2;
  $('mobileImg').src=PAGES[page];$('mobileImg').alt=`Página ${page+1} de ${PAGE_COUNT}`;
  $('counter').textContent=single?`Página ${page+1} de ${PAGE_COUNT}`:step===0?`Portada · 1 / ${PAGE_COUNT}`:closedEnd?`Página ${PAGE_COUNT} de ${PAGE_COUNT}`:`Páginas ${step*2}–${step*2+1} / ${PAGE_COUNT}`;
  $('prev').disabled=single?page===0:step===0;
  $('next').disabled=single?page===PAGE_COUNT-1:step===LAST_STEP;
  $('start').disabled=$('prev').disabled;$('finish').disabled=$('next').disabled;
  $('progress').style.width=`${single?(page+1)/PAGE_COUNT*100:(step+1)/(LAST_STEP+1)*100}%`;
  document.querySelectorAll('.thumbs button').forEach((b,i)=>b.classList.toggle('active',single?i===page:step===0?i===0:i===step*2-1||i===step*2));
}
function turn(dir){if(busy)return;if(mq.matches){const target=Math.max(0,Math.min(PAGE_COUNT-1,page+dir));if(target===page)return;busy=true;$('mobile').classList.add('turning');setTimeout(()=>{page=target;render()},240);setTimeout(()=>{$('mobile').classList.remove('turning');busy=false},510)}else{const target=Math.max(0,Math.min(LAST_STEP,step+dir));if(target===step)return;busy=true;const moving=book.querySelectorAll('.sheet')[dir>0?step:step-1];step=target;render();moving.style.zIndex=SHEET_COUNT*2+2;setTimeout(()=>{busy=false;render()},980)}}
function go(p){if(busy)return;page=p;step=pageStep(p);render()}
$('prev').onclick=()=>turn(-1);$('next').onclick=()=>turn(1);$('start').onclick=()=>go(0);$('finish').onclick=()=>go(PAGE_COUNT-1);mq.addEventListener('change',render);
for(let i=0;i<PAGE_COUNT;i++){let b=document.createElement('button');b.innerHTML=`<img src="${PAGES[i]}" alt="Vista de la página ${i+1}"><span>${i===0?'Portada':`Página ${i+1}`}</span>`;b.onclick=()=>{go(i);toggleDrawer(false)};$('thumbs').append(b)}
function toggleDrawer(show){$('drawer').hidden=!show;$('contents').setAttribute('aria-expanded',show);if(show)$('closeDrawer').focus();else $('contents').focus()}
$('contents').onclick=()=>toggleDrawer($('drawer').hidden);$('closeDrawer').onclick=()=>toggleDrawer(false);

const zoomStage=document.createElement('div');
zoomStage.className='zoom-stage';
$('zoomImg').before(zoomStage);
zoomStage.append($('zoomImg'));
let zoomTurning=false,zoomTurnId=0,zoomAnimation=null,zoomSheet=null;
function resetZoomTurn(){
  zoomTurnId++;
  zoomAnimation?.cancel();
  zoomSheet?.remove();
  zoomAnimation=null;
  zoomSheet=null;
  zoomTurning=false;
  $('zoom').removeAttribute('aria-busy');
}
async function turnZoom(dir){
  if(zoomTurning||$('zoom').hidden)return;
  const target=Math.max(0,Math.min(PAGES.length-1,zoomPage+dir));
  if(target===zoomPage)return;
  zoomTurning=true;
  const turnId=++zoomTurnId;
  $('zoom').setAttribute('aria-busy','true');
  const nextImage=new Image();
  nextImage.src=PAGES[target];
  try{await nextImage.decode();}catch(e){
    if(turnId===zoomTurnId){resetZoomTurn();showZoom();}
    return;
  }
  if(turnId!==zoomTurnId||$('zoom').hidden)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!Element.prototype.animate){
    zoomPage=target;
    resetZoomTurn();
    showZoom();
    return;
  }
  $('zoomPrev').disabled=true;
  $('zoomNext').disabled=true;
  $('zoom').scrollTop=0;
  const layer=$('zoomImg').cloneNode();
  layer.removeAttribute('id');
  layer.alt='';
  layer.setAttribute('aria-hidden','true');
  layer.className='zoom-turn-sheet';
  layer.draggable=false;
  zoomSheet=layer;
  if(dir>0)$('zoomImg').src=PAGES[target];
  else layer.src=PAGES[target];
  zoomStage.append(layer);
  const flat={transform:'rotateY(0deg)',filter:'brightness(1)',boxShadow:'0 15px 60px #0008'};
  const folded={transform:'rotateY(-100deg)',filter:'brightness(.55)',boxShadow:'35px 20px 70px #0009'};
  zoomAnimation=layer.animate(dir>0?[flat,folded]:[folded,flat],{
    duration:850,easing:'cubic-bezier(.42,.02,.2,1)',fill:'both'
  });
  try{await zoomAnimation.finished;}catch(e){return;}
  if(turnId!==zoomTurnId)return;
  zoomPage=target;
  resetZoomTurn();
  showZoom();
}

function showZoom(){ $('zoomImg').src=PAGES[zoomPage];$('zoomImg').alt=`Página ${zoomPage+1} ampliada`;$('zoomCounter').textContent=`${zoomPage+1} / ${PAGE_COUNT}`;$('zoomPrev').disabled=zoomPage===0;$('zoomNext').disabled=zoomPage===PAGE_COUNT-1;$('zoom').scrollTop=0}
function openZoom(p=page){previousFocus=document.activeElement;zoomPage=p;$('zoom').hidden=false;document.body.style.overflow='hidden';showZoom();$('closeZoom').focus()}
function closeZoom(){resetZoomTurn();go(zoomPage);$('zoom').hidden=true;document.body.style.overflow='';previousFocus?.focus()}
$('enlarge').onclick=()=>openZoom();$('mobile').onclick=()=>openZoom();$('mobile').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openZoom()}};$('closeZoom').onclick=closeZoom;$('zoomPrev').onclick=()=>turnZoom(-1);$('zoomNext').onclick=()=>turnZoom(1);
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch(e){$('fullscreen').textContent='No disponible';}};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('zoom').hidden)closeZoom();else if(!$('drawer').hidden)toggleDrawer(false)}if(!$('zoom').hidden){if(e.key==='ArrowRight'||e.key==='ArrowLeft')e.preventDefault();if(e.key==='ArrowRight')$('zoomNext').click();if(e.key==='ArrowLeft')$('zoomPrev').click();if(e.key==='Tab'){const focusable=[...$('zoom').querySelectorAll('button:not(:disabled)')];const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}return}if(e.key==='ArrowRight'){e.preventDefault();turn(1)}if(e.key==='ArrowLeft'){e.preventDefault();turn(-1)}});
let startX=0,startY=0;$('mobile').addEventListener('touchstart',e=>{startX=e.touches[0].clientX;startY=e.touches[0].clientY},{passive:true});$('mobile').addEventListener('touchend',e=>{let dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){turn(dx<0?1:-1);e.preventDefault()}},{passive:false});render();

