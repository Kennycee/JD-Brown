var PHOTOS=["images/joy-1.jpg", "images/joy-2.jpg", "images/joy-3.jpg", "images/joy-4.jpg", "images/joy-5.jpg", "images/joy-6.jpg", "images/joy-7.jpg", "images/joy-8.jpg"];
var MSG=["Happy Birthday, My Lady. ❤️","November 13 is special to me because it is the day Joy, my JD Brown, came into this world.","This year has not been easy for you. I have seen you go through pain and struggles, especially with your health, but you came out stronger. I want you to know that I see your strength, and I admire the woman you are.","You are beautiful, wonderful, creative, and you have great taste in music and movies. You are a model, but truly, you are a model after my heart. ❤️","Thank you for coming into my life this year. Thank you for the conversations, the laughter, the memories, and for simply being you. I feel blessed to have you in my life, and I appreciate you more than you know.","As you begin this new year, I pray for your healing, peace, happiness, strength, and good health. May this new chapter be better and gentler than the last, filled with beautiful moments, answered prayers, and many reasons to smile.","Happy Birthday, Joy. Happy Birthday, JD Brown. Happy Birthday, My Lady. ❤️","Never forget how special you are to me. I am grateful for you, and I am happy that life brought you into my world."];
var $=function(i){return document.getElementById(i)},rnd=function(a,b){return a+Math.random()*(b-a)};
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches,HOVER=matchMedia('(hover:hover)').matches;
var done=false,timer;

/* ---- floating chocolates & flowers (outside the card, behind everything) ---- */
function floaters(list,n,o){
  if(RM)n=Math.min(n,6);
  for(var i=0;i<n;i++){
    var s=document.createElement('span');s.className='f';s.textContent=list[i%list.length];
    s.style.fontSize=rnd(o.a,o.b)+'px';s.style.left=rnd(0,94)+'vw';s.style.opacity=o.op;
    $('fl').appendChild(s);
    var d=rnd(o.d1,o.d2)*1000,sw=rnd(-70,70);
    s.animate([{transform:'translate(0,108vh) rotate(0)'},{transform:'translate('+sw+'px,50vh) rotate(180deg)'},{transform:'translate('+(-sw)+'px,-12vh) rotate(360deg)'}],{duration:d,iterations:Infinity,delay:-rnd(0,d)});
  }
}
floaters(['🍫','🍰','🍫','🧁','🎂','🌷','🍫','🌸','🍩','🌹'],20,{a:24,b:56,op:.6,d1:11,d2:20});

/* ---- countdown ---- */
function addMonths(d,m){var x=new Date(d),day=x.getDate();x.setDate(1);x.setMonth(x.getMonth()+m);x.setDate(Math.min(day,new Date(x.getFullYear(),x.getMonth()+1,0).getDate()));return x}
function target(now){var y=now.getFullYear();return now>=new Date(y,10,14)?new Date(y+1,10,13):new Date(y,10,13)}
function setv(id,v){var e=$(id);if(e.textContent!=v){e.textContent=v;if(!RM){e.classList.remove('tick');void e.offsetWidth;e.classList.add('tick')}}}
function tick(){
  var now=new Date(),t=target(now);
  if(now>=t){party();return}
  var mo=(t.getFullYear()-now.getFullYear())*12+t.getMonth()-now.getMonth();
  while(mo>0&&addMonths(now,mo)>t)mo--;
  var rem=t-addMonths(now,Math.max(0,mo)),days=Math.floor(rem/864e5);
  setv('mo',mo);setv('wk',Math.floor(days/7));setv('dy',days%7);setv('hr',String(Math.floor(rem%864e5/36e5)).padStart(2,'0'));
  $('mini').textContent='and '+Math.floor(rem%36e5/6e4)+' min '+Math.floor(rem%6e4/1e3)+' sec';
}

/* ---- fireworks / confetti canvas ---- */
var cv=$('cv'),cx=cv.getContext('2d'),P=[];
function sz(){cv.width=innerWidth;cv.height=innerHeight}sz();addEventListener('resize',sz);
function burst(x,y,n){var c=['#f0c9a0','#c46b3a','#ffd700','#ff6b81','#fff','#e6a99c'];for(var i=0;i<n;i++){var a=rnd(0,6.28),v=rnd(2,12);P.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-3,w:rnd(4,9),h:rnd(3,6),c:c[i%6],r:rnd(0,6),l:rnd(80,160)})}}
(function loop(){cx.clearRect(0,0,cv.width,cv.height);P=P.filter(function(p){return p.l>0});P.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.17;p.vx*=.99;p.r+=.2;p.l--;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.globalAlpha=Math.min(1,p.l/40);cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore()});requestAnimationFrame(loop)})();
function sparkle(x,y){var s=document.createElement('span');s.className='sk';s.textContent=Math.random()>.5?'✦':'✧';s.style.left=x+'px';s.style.top=y+'px';s.style.fontSize=rnd(10,24)+'px';$('sp').appendChild(s);setTimeout(function(){s.remove()},1200)}
setInterval(function(){sparkle(rnd(0,innerWidth),rnd(0,innerHeight))},done?300:700);
if(HOVER&&!RM){var lt=0;addEventListener('pointermove',function(e){var n=Date.now();if(n-lt>70){lt=n;sparkle(e.clientX+rnd(-8,8),e.clientY+rnd(-8,8))}})}
addEventListener('click',function(e){if(!RM)burst(e.clientX,e.clientY,26)});

/* ---- photos orbiting the message ---- */
var stage=$('stage'),phs=[];
PHOTOS.forEach(function(src,i){
  var b=document.createElement('button');b.className='ph';b.type='button';b.setAttribute('aria-label','View Joy\u2019s photo '+(i+1));
  b.dataset.src=src;b.innerHTML='<img alt="Joy" src="'+src+'">';stage.appendChild(b);
  var o={el:b,ang:i/PHOTOS.length*6.283,sp:rnd(.045,.07)*(i%2?-1:1),k:rnd(.9,1.04),ph:rnd(0,6)};
  b.addEventListener('click',function(){openPhoto(b)});
  phs.push(o);
});
var last=0;
function orbit(t){
  var W=stage.clientWidth,H=stage.clientHeight,dt=Math.min(.05,(t-last)/1e3||0);last=t;
  phs.forEach(function(o){
    var w=o.el.offsetWidth,h=o.el.offsetHeight;
    if(!RM)o.ang+=o.sp*dt*6;
    var x=W/2+Math.cos(o.ang)*(W/2-w/2+4)*o.k-w/2,y=H/2+Math.sin(o.ang)*(H/2-h/2+4)*o.k-h/2+Math.sin(t/900+o.ph)*7;
    o.el.style.transform='translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px) rotate('+(Math.sin(o.ang*2+o.ph)*9).toFixed(1)+'deg)';
  });
  requestAnimationFrame(orbit);
}
requestAnimationFrame(orbit);

/* ---- click/hover -> expand to fill page, return after 2 seconds ---- */
var busy=false,closing;
function openPhoto(el){
  if(busy)return;busy=true;
  var r=el.getBoundingClientRect(),ov=$('ov'),b=$('big');
  b.src=el.dataset.src;ov.hidden=false;ov.style.opacity=0;b.style.transition='none';
  b.style.cssText+=';left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px;object-fit:cover;transition:none';
  void b.offsetWidth;b.style.transition='';ov.style.opacity=1;
  b.style.left='3vw';b.style.top='3vh';b.style.width='94vw';b.style.height='90vh';b.style.objectFit='contain';
  if(!RM)burst(innerWidth/2,innerHeight/2,60);
  closing=setTimeout(function(){closePhoto(el)},1550);
}
function closePhoto(el){
  clearTimeout(closing);if(!busy||$('ov').hidden)return;
  var r=(el||{getBoundingClientRect:function(){return{left:innerWidth/2,top:innerHeight/2,width:0,height:0}}}).getBoundingClientRect(),b=$('big'),ov=$('ov');
  ov.style.opacity=0;b.style.left=r.left+'px';b.style.top=r.top+'px';b.style.width=r.width+'px';b.style.height=r.height+'px';b.style.objectFit='cover';
  setTimeout(function(){ov.hidden=true;busy=false},450);
}
$('ov').addEventListener('click',function(){closePhoto()});
addEventListener('keydown',function(e){if(e.key==='Escape')closePhoto()});

/* ---- the birthday! ---- */
function party(){
  if(done)return;done=true;clearInterval(timer);document.body.classList.add('bm');
  $('ht').innerHTML='Happy Birthday, <span>JD Brown</span>! <i class="th">♡</i>';
  document.title='Happy Birthday, JD Brown! 🎉';
  $('lab').textContent='It\u2019s your day, my Lady!';$('row').textContent='Happy Birthday!';$('row').style.cssText='font:italic 500 clamp(32px,7vw,54px) "Playfair Display",serif;color:#e8c28d';
  $('sub').textContent='November 13 · your day to shine';$('mini').textContent='';$('teaser').textContent='Today, every word is for you.';
  $('say').textContent='Happy Birthday, Joy! Your birthday letter is opening.';$('lock').classList.add('go');
  floaters(['🎉','🎂','🍫','🌸','🌹','❤️','🎈','🧁','🍰','🌷','🎁','🥳','💐','🎈'],36,{a:26,b:58,op:.95,d1:6,d2:13});
  var k=0,iv=setInterval(function(){burst(rnd(.1,.9)*innerWidth,rnd(.1,.5)*innerHeight,60);if(++k>14)clearInterval(iv)},350);
  setInterval(function(){burst(rnd(.1,.9)*innerWidth,rnd(.1,.5)*innerHeight,40)},5000);
  setTimeout(function(){$('letter').scrollIntoView({behavior:'smooth'})},1500);
  setTimeout(function(){$('lock').hidden=true;typeMsg()},900);
}
function typeMsg(){
  var c=$('lc'),pi=0,ci=0,p=null;
  (function nx(){
    if(pi>=MSG.length){if(p)p.classList.remove('typing');$('so').hidden=false;burst(innerWidth/2,innerHeight/3,140);return}
    if(!p){p=document.createElement('p');p.className='typing';c.appendChild(p)}
    var chars=Array.from(MSG[pi]);p.textContent=chars.slice(0,++ci).join('');
    if(ci>=chars.length){p.classList.remove('typing');p=null;pi++;ci=0;setTimeout(nx,380)}else setTimeout(nx,26);
  })();
}
new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('in')})},{threshold:.2}).observe(document.querySelector('.rv'));
tick();timer=setInterval(tick,1000);
if(location.hash==='#preview')party();
