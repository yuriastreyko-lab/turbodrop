const $=s=>document.querySelector(s),R=Math.random,KEY='tdrop1';
const RC={D:'#8a8f98',C:'#3a9bdc',B:'#a05fe0',A:'#ffa31a',S:'#ff4d6d'},FL={JP:'🇯🇵',DE:'🇩🇪',US:'🇺🇸',IT:'🇮🇹',GB:'🇬🇧'};
// ===== ДАННЫЕ. Машина: Название|редкость D/C/B/A/S|л.с.|цена в млн|страна JP/DE/US/IT/GB|цвет =====
const CARS=`Sakura Mini|D|75|0.3|JP|#e8c547
Volkstar Hatch|D|90|0.4|DE|#9fb4c7
Bristol Cub|D|70|0.35|GB|#6fbf73
Detroit Pony|D|120|0.5|US|#d96b4a
Kenji Sprint|C|220|1.5|JP|#e0e0e0
Bavar M-Line|C|280|2.4|DE|#3a6fd8
Roma Gioia|C|240|2|IT|#c8372d
Midland Rover|C|200|1.8|GB|#4d6b57
Liberty Coupe|C|260|2.2|US|#f0f0f0
Hanzo RS|B|380|5|JP|#f2a33a
Adler Turbo|B|450|6.5|DE|#7b7f86
Fiora GT|B|420|7|IT|#e0462f
Stratus V8|B|480|5.5|US|#2f64c9
Ronin GT-X|A|570|15|JP|#b8bcc4
Quattro Nova|A|620|22|DE|#f5f5f5
Vipera ACR|A|645|15|US|#e02424
Cavallo Veloce|A|700|19|IT|#f2c200
Windsor Speed|A|600|17|GB|#1c6b45
Kuro Phantom|S|900|60|JP|#141414
Spectre One|S|1000|75|DE|#8d5cf5
Toro Furia|S|1100|90|IT|#ff7a00
Excalibur 9|S|950|70|GB|#00bcd4`.split('\n').map(s=>{const[n,r,hp,p,cc,col]=s.split('|');return{n,r,hp:+hp,p:p*1e6,cc,col}});
const CASES=[{n:'Старт',c:4e5,w:{D:80,C:17,B:3},e:'📦'},{n:'Стандарт',c:2e6,w:{D:30,C:50,B:17,A:3},e:'🎁'},{n:'Элита',c:8e6,w:{C:20,B:50,A:25,S:5},e:'👑'}];
const DIFF=[['Лёгкая',9,150e3],['Средняя',7,400e3],['Сложная',6,1.2e6]]; // название, секунд у соперника, награда
const TASKS=[['race','Выиграй гонку',1,170e3],['case','Открой 2 кейса',2,100e3],['sell','Продай машину',1,68e3]];
const SLOTS=10,CAP_H=4,INC=.02,SELL=.7,FUEL_MAX=15,FUEL_SEC=120; // доход: 2% цены в час
// ===============================================================================================
const fmt=n=>{n=Math.round(n);return n>=1e6?(+(n/1e6).toFixed(n>=1e7?0:1)+'').replace('.',',')+' млн ₽':n.toLocaleString('ru-RU')+' ₽'};
const need=l=>85+25*l,pick=w=>{let r=R()*Object.values(w).reduce((a,b)=>a+b,0),k;for(k in w)if((r-=w[k])<0)return k;return k};
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch{}
S=S||{m:2e6,cars:[],own:[],acc:0,at:Date.now(),xp:0,lv:1,fuel:FUEL_MAX,ft:Date.now(),day:'',tk:{},id:1};
let tab='garage',cs=1,cn=1,df=0,busy=false;
const save=()=>{S.at=Date.now();try{localStorage.setItem(KEY,JSON.stringify(S))}catch{}};
const toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2000)};
const buzz=()=>{try{Telegram.WebApp.HapticFeedback.impactOccurred('light')}catch{}};
const rb=r=>`<b class="rb" style="background:${RC[r]}">${r}</b>`;
function car(c){const k=c.col;return `<svg viewBox="0 0 120 50"><path d="M4 36V30Q4 26 10 25L30 22 44 10Q47 8 52 8H82Q87 8 90 11L100 22 112 24Q118 25 118 30V36Z" fill="${k}"/><path d="M48 22 56 12H80L90 22Z" fill="#17222e"/><rect x="4" y="33" width="114" height="4" fill="#0003"/><circle cx="30" cy="37" r="9" fill="#111"/><circle cx="30" cy="37" r="4" fill="#aaa"/><circle cx="92" cy="37" r="9" fill="#111"/><circle cx="92" cy="37" r="4" fill="#aaa"/></svg>`}
const mini=(c,x='')=>`<div class="cc" style="border-color:${RC[c.r]}66">${rb(c.r)}${car(c)}<h3>${c.n}</h3><p>${FL[c.cc]} ${c.hp} л.с. · ${fmt(c.p)}</p>${x}</div>`;
function rate(){const cnt={};S.cars.forEach(o=>cnt[CARS[o.i].cc]=(cnt[CARS[o.i].cc]||0)+1);return S.cars.reduce((a,o)=>a+CARS[o.i].p*INC*(cnt[CARS[o.i].cc]>=3?1.1:1),0)}
function gainXp(n){S.xp+=n;while(S.xp>=need(S.lv)){S.xp-=need(S.lv);S.lv++;S.m+=1e5*S.lv;toast('Уровень '+S.lv+'! Бонус '+fmt(1e5*S.lv))}}
function task(k,n=1){const d=new Date().toDateString();if(S.day!==d){S.day=d;S.tk={}}const t=TASKS.find(x=>x[0]===k),was=S.tk[k]||0;S.tk[k]=Math.min(t[2],was+n);if(was<t[2]&&S.tk[k]>=t[2]){S.m+=t[3];gainXp(40);toast('Задание выполнено: +'+fmt(t[3]))}}
const V={
garage(){const r=rate(),cnt={};S.cars.forEach(o=>cnt[CARS[o.i].cc]=(cnt[CARS[o.i].cc]||0)+1);const b=Object.keys(cnt).filter(k=>cnt[k]>=3).map(k=>`<span class="chip2">${FL[k]} +10%</span>`).join('');
return `<div class="card"><div class="r"><span>Доход гаража</span><span>${fmt(r)} / ч</span></div><div class="big" id="acc"></div><div class="bar"><i id="accb"></i></div><button class="blue" data-a="claim">Забрать</button><p class="mute">Копится до ${CAP_H} ч, потом останавливается</p><p class="mute">${b}${b?'<br>':''}3+ машины одной страны: +10% к их доходу</p></div><div class="sec"><span>МАШИНЫ ${S.cars.length}/${SLOTS}</span></div>${S.cars.length?`<div class="grid">${S.cars.map(o=>mini(CARS[o.i],`<button class="sm" data-a="sell" data-i="${o.id}">Продать ${fmt(CARS[o.i].p*SELL)}</button>`)).join('')}</div>`:'<p class="mute">Гараж пуст. Откройте первый кейс!</p>'}`},
cases(){const k=CASES[cs],tot=k.c*cn,sh=tot-S.m;return `<div class="chips">${CASES.map((c,i)=>`<button class="chip ${i===cs?'on':''}" data-a="cs" data-i="${i}">${c.e} ${c.n}</button>`).join('')}</div><div class="mys">${car({col:'#222'})}<span>?</span></div><div class="chances">${Object.entries(k.w).map(([r,w])=>rb(r)+' '+w+'%').join(' ')}</div><div class="seg">${[1,3,5].map(n=>`<button class="${n===cn?'on':''}" data-a="cn" data-i="${n}">×${n}</button>`).join('')}</div><button class="blue" data-a="open" ${sh>0?'disabled':''}>Открыть ×${cn} · ${fmt(tot)}</button><p class="mute">${sh>0?'Не хватает '+fmt(sh):'Если гараж полон, лишние машины продаются автоматически'}</p>`},
race(){return `<div class="card"><div class="r"><span>⛽ Топливо</span><span id="fu"></span></div><p class="mute" style="margin:12px 0 0">Тапай по экрану как можно быстрее и приди к финишу раньше соперника. Чем мощнее твоя лучшая машина, тем сильнее каждый тап.</p></div><div class="dif">${DIFF.map((d,i)=>`<button class="${i===df?'on':''}" data-a="df" data-i="${i}"><span>${d[0]}</span><span>${fmt(d[2])}</span></button>`).join('')}</div><button class="blue" data-a="go">🏁 Старт гонки</button>`},
menu(){const d=new Date().toDateString();if(S.day!==d){S.day=d;S.tk={}}return `<div class="ban"><div class="r"><b>Уровень ${S.lv}</b><span>${S.xp}/${need(S.lv)}</span></div><div class="bar"><i style="width:${S.xp/need(S.lv)*100}%;background:#fff"></i></div><small>На ${S.lv+1} уровне: +${fmt(1e5*(S.lv+1))}</small></div><div class="sec"><span>ЗАДАНИЯ НА СЕГОДНЯ</span></div>${TASKS.map(t=>{const v=S.tk[t[0]]||0;return `<div class="task ${v>=t[2]?'ok':''}"><div>${t[1]}<small>+${fmt(t[3])} · +40 опыта</small></div><span>${v>=t[2]?'Получено ✓':v+'/'+t[2]}</span></div>`}).join('')}<div class="sec"><span>КОЛЛЕКЦИЯ ${S.own.length}/${CARS.length}</span></div><div class="grid">${CARS.map((c,i)=>S.own.includes(i)?mini(c):`<div class="cc lock">${rb(c.r)}${car({col:'#fff'})}<h3>???</h3><p>Ещё не открыта</p></div>`).join('')}</div>`}};
const TT={garage:'Гараж',cases:'Кейсы',race:'Гонки',menu:'Меню'};
function upd(){$('#mo').textContent=fmt(S.m);$('#lv').textContent=S.lv;const a=$('#acc');if(a){const cap=rate()*CAP_H;a.textContent=fmt(S.acc);$('#accb').style.width=(cap?S.acc/cap*100:0)+'%'}const f=$('#fu');if(f)f.textContent=S.fuel+'/'+FUEL_MAX}
function draw(){$('#ttl').textContent=TT[tab];document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===tab));$('#main').innerHTML=V[tab]();upd()}
function openCase(){const k=CASES[cs],tot=k.c*cn;if(S.m<tot||busy)return;busy=true;S.m-=tot;const got=[];let kept=0,sold=0;
for(let j=0;j<cn;j++){const r=pick(k.w),pool=CARS.map((_,i)=>i).filter(i=>CARS[i].r===r),i=pool[Math.floor(R()*pool.length)];got.push(i);if(!S.own.includes(i))S.own.push(i);if(S.cars.length<SLOTS){S.cars.push({id:S.id++,i});kept++}else{S.m+=CARS[i].p*SELL;sold++}}
gainXp(15*cn);task('case',cn);save();draw();const o=$('#ov');o.className='on';let n=0;
const t=setInterval(()=>{o.innerHTML=`<div class="rv"><div class="sp">${car(CARS[Math.floor(R()*CARS.length)])}</div><h2>Открываем…</h2></div>`;buzz();if(++n>12){clearInterval(t);o.innerHTML=`<div class="rv"><h2>Выпало</h2><div class="grid">${got.map(i=>mini(CARS[i])).join('')}</div><p class="mute">${kept?'В гараж: '+kept+'. ':''}${sold?'Гараж полон, продано: '+sold:''}</p><button class="blue" data-a="closeov">Круто!</button></div>`;busy=false}},90)}
function race(){if(!S.cars.length)return toast('Сначала получите машину в кейсе');if(S.fuel<1)return toast('Нет топлива. Подождите немного');
S.fuel--;if(S.fuel===FUEL_MAX-1)S.ft=Date.now();save();const best=S.cars.map(o=>CARS[o.i]).sort((a,b)=>b.hp-a.hp)[0],opp=CARS[Math.floor(R()*CARS.length)],pw=1.2+best.hp/400,[,T,rew]=DIFF[df],el=$('#race');
el.className='on';el.innerHTML=`<div class="lane"><span>Соперник · ${opp.n}</span><div class="trk"><div class="rc" id="oc">${car(opp)}</div></div></div><div class="lane"><span>Вы · ${best.n}</span><div class="trk"><div class="rc" id="pc">${car(best)}</div></div></div><div id="cd">3</div><div id="rtx"></div><button id="tap">ТАП!</button>`;
let st='cd',pl=0,t0=0,c=3;const tap=$('#tap'),end=win=>{st='end';cancelAnimationFrame(raf);const g=win?rew:0;if(win){S.m+=g;task('race')}gainXp(win?30:5);save();upd();$('#cd').textContent=win?'🏆 Победа!':'Проиграли';$('#rtx').innerHTML=`<p class="mute">${win?'Награда: '+fmt(g):'Соперник был быстрее. Попробуйте ещё!'}</p><button class="blue" data-a="closerace">Закрыть</button>`;tap.style.display='none'};let raf;
const loop=n=>{if(st!=='go')return;const p=Math.min(100,(n-t0)/1000*100/T);$('#oc').style.left=p*.84+'%';if(p>=100)return end(false);raf=requestAnimationFrame(loop)};
tap.onpointerdown=e=>{e.preventDefault();if(st!=='go')return;buzz();pl+=pw;$('#pc').style.left=Math.min(100,pl)*.84+'%';if(pl>=100)end(true)};
const iv=setInterval(()=>{c--;if(c>0)$('#cd').textContent=c;else{clearInterval(iv);$('#cd').textContent='ТАП!';st='go';t0=performance.now();raf=requestAnimationFrame(loop);setTimeout(()=>{if(st==='go')$('#cd').textContent=''},600)}},900)}
document.body.onclick=e=>{const b=e.target.closest('[data-a],[data-t]');if(!b)return;if(b.dataset.t){tab=b.dataset.t;scrollTo(0,0);return draw()}
const a=b.dataset.a,i=+b.dataset.i;buzz();
if(a==='claim'){if(S.acc<1)return toast('Пока нечего забирать');S.m+=S.acc;toast('+'+fmt(S.acc));S.acc=0}
else if(a==='sell'){const o=S.cars.find(x=>x.id===i);if(o&&confirm('Продать '+CARS[o.i].n+'?')){S.m+=CARS[o.i].p*SELL;S.cars=S.cars.filter(x=>x!==o);task('sell')}}
else if(a==='cs')cs=i;else if(a==='cn')cn=i;else if(a==='df')df=i;else if(a==='open')return openCase();else if(a==='go')return race();
else if(a==='closeov')$('#ov').className='';else if(a==='closerace')$('#race').className='';
save();draw()};
let lt=Date.now();setInterval(()=>{const n=Date.now(),dt=(n-lt)/1000;lt=n;const cap=rate()*CAP_H;S.acc=Math.min(cap,S.acc+rate()*dt/3600);
if(S.fuel<FUEL_MAX){const k=Math.floor((n-S.ft)/1000/FUEL_SEC);if(k>0){S.fuel=Math.min(FUEL_MAX,S.fuel+k);S.ft+=k*FUEL_SEC*1000}}else S.ft=n;upd()},1000);
setInterval(save,5000);S.acc=Math.min(rate()*CAP_H,S.acc+rate()*Math.min((Date.now()-S.at)/3600000,CAP_H));
try{const w=Telegram.WebApp;w.ready();w.expand();w.disableVerticalSwipes&&w.disableVerticalSwipes();w.setHeaderColor('#000000');w.setBackgroundColor('#000000')}catch(e){}
draw();
