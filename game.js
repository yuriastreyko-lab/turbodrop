const $=s=>document.querySelector(s),R=Math.random,KEY='tdrop1';
const RC={D:'#8a8f98',C:'#3a9bdc',B:'#a05fe0',A:'#ffa31a',S:'#ff4d6d'},FL={JP:'🇯🇵',DE:'🇩🇪',US:'🇺🇸',IT:'🇮🇹',GB:'🇬🇧',RU:'🇷🇺'};
// ===== ДАННЫЕ. Машина: Название|редкость D/C/B/A/S|л.с.|цена в млн|страна JP/DE/US/IT/GB|цвет =====
const CARS=`Sakura Mini|D|75|0.3|JP|#e8c547|daily
Volkstar Hatch|D|90|0.4|DE|#9fb4c7|daily
Bristol Cub|D|70|0.35|GB|#6fbf73|daily
Detroit Pony|D|120|0.5|US|#d96b4a|daily,muscle
Kenji Sprint|C|220|1.5|JP|#e0e0e0|daily,drift
Bavar M-Line|C|280|2.4|DE|#3a6fd8|daily,sport
Roma Gioia|C|240|2|IT|#c8372d|daily,sport
Midland Rover|C|200|1.8|GB|#4d6b57|daily,suv
Liberty Coupe|C|260|2.2|US|#f0f0f0|daily,muscle
Hanzo RS|B|380|5|JP|#f2a33a|daily,drift
Adler Turbo|B|450|6.5|DE|#7b7f86|daily,sport
Fiora GT|B|420|7|IT|#e0462f|sport,rare
Stratus V8|B|480|5.5|US|#2f64c9|muscle
Ronin GT-X|A|570|15|JP|#b8bcc4|drift,legend
Quattro Nova|A|620|22|DE|#f5f5f5|sport,rare,legend
Vipera ACR|A|645|15|US|#e02424|muscle,sport
Cavallo Veloce|A|700|19|IT|#f2c200|sport,rare
Windsor Speed|A|600|17|GB|#1c6b45|sport,rare,legend
Kuro Phantom|S|900|60|JP|#141414|rare,legend
Spectre One|S|1000|75|DE|#8d5cf5|rare,legend
Toro Furia|S|1100|90|IT|#ff7a00|rare,legend
Excalibur 9|S|950|70|GB|#00bcd4|rare,legend
Ласточка 21|D|70|0.25|RU|#d8d2b8|ussr
Малыш 965|D|40|0.2|RU|#e87c3e|ussr
Зорька 408|D|75|0.3|RU|#7fa6c9|ussr
Волжанка 24|C|100|1.2|RU|#1d1d1d|ussr
Ветер 3102|C|105|1.6|RU|#b9c7a5|ussr
Горец 469|C|90|1.4|RU|#6b7f4a|ussr,suv
Стрела ГТ|B|180|4.5|RU|#c0392b|ussr
Чайка Парад|B|220|6|RU|#0f0f10|ussr,rare
Буран Спорт|A|320|14|RU|#e8e8e8|ussr
Shinobi 86|C|200|2|JP|#f5f5f5|drift
Akane S13|C|205|2.2|JP|#d1495b|drift
Mizu Z33|C|280|2.8|JP|#3d7ea6|drift
Kaze RX|B|280|5|JP|#8e44ad|drift
Drift King R34|B|320|7|JP|#2ecc71|drift
Raiden GT-R|A|600|18|JP|#9aa5b1|drift
Orochi Supra|A|520|16|JP|#ff9f1c|drift
Hayate Spec|S|900|65|JP|#00e5ff|drift,legend
Ghost RS|C|300|3|GB|#cfd8dc|sport
Stella Corsa|B|450|8|IT|#ffd23f|sport,rare
Aero V10|A|620|22|DE|#d9dde3|sport
Pegasus GT3|A|700|24|DE|#0ea5e9|sport
Falco SV|S|950|80|IT|#ef233c|sport,legend
Bulldog 454|C|350|2.8|US|#ff8c42|muscle
Thunder SS|B|500|6|US|#274c77|muscle
Stallion GT500|B|530|7|US|#c1121f|muscle
Hellfire 700|A|700|20|US|#111827|muscle
Apex Dragster|S|1000|85|US|#fbbf24|muscle,legend
Samurai 4x4|D|110|0.5|JP|#a3b18a|suv
Tundra X|C|250|2.2|US|#6c757d|suv
Alpen Rover|C|230|2.6|GB|#344e41|suv
Safari Heavy|B|400|6|DE|#dad7cd|suv
Dune Raptor|B|450|7.5|US|#e9c46a|suv,rare
Sahara Titan|A|600|18|DE|#588157|suv
Everest 6x6|A|650|21|GB|#e5e5e5|suv`.split('\n').map(s=>{const[n,r,hp,p,cc,col,tg]=s.split('|');return{n,r,hp:+hp,p:p*1e6,cc,col,tg:tg.split(',')}});
const CASES=[ // t = тема (тег машин), w = шансы по редкости (пересчитываются под то, что есть в кейсе)
{n:'Старт',e:'📦',c:2e5,t:'daily',w:{D:80,C:17,B:3},col:'#8a93a8',d:'Обычные городские машины'},
{n:'СССР',e:'⭐',c:5e5,t:'ussr',w:{D:50,C:35,B:12,A:3},col:'#ef4444',d:'Классика советского автопрома'},
{n:'Внедорожники',e:'🏔️',c:1.3e6,t:'suv',w:{D:20,C:45,B:30,A:5},col:'#84cc16',d:'Полный привод и бездорожье'},
{n:'Дрифт',e:'🌀',c:2.4e6,t:'drift',w:{C:40,B:40,A:18,S:2},col:'#a855f7',d:'Заднеприводные дрифт-кары'},
{n:'Маслкары',e:'💪',c:2.5e6,t:'muscle',w:{C:35,B:45,A:19,S:1},col:'#f97316',d:'Американская мощь и рёв V8'},
{n:'Спорткары',e:'🏁',c:4.3e6,t:'sport',w:{C:20,B:45,A:30,S:5},col:'#3b82f6',d:'Европейские скоростные купе'},
{n:'Редкие',e:'💎',c:7.5e6,t:'rare',w:{B:35,A:50,S:15},col:'#22d3ee',d:'Эксклюзив и коллекционные модели'},
{n:'Легенды',e:'👑',c:15e6,t:'legend',w:{A:50,S:50},col:'#fbbf24',d:'Только эпические и легендарные'}];
const poolFor=k=>CARS.map((_,i)=>i).filter(i=>CARS[i].tg.includes(k.t));
const caseW=k=>{const have=new Set(poolFor(k).map(i=>CARS[i].r)),w={};for(const r in k.w)if(have.has(r))w[r]=k.w[r];return w};
const roll=k=>{const r=pick(caseW(k)),p=poolFor(k).filter(i=>CARS[i].r===r);return p[Math.floor(R()*p.length)]};
const DIFF=[['Лёгкая',5e4,1e5],['Средняя',2e5,4.5e5],['Сложная',6e5,1.5e6]]; // название, ВЗНОС, приз за победу
const TASKS=[['race','Выиграй гонку',1,170e3],['case','Открой 2 кейса',2,100e3],['sell','Продай машину',1,68e3]];
const SLOTS=10,CAP_H=4,INC=.02,SELL=.26,FUEL_MAX=15,FUEL_SEC=120; // доход: 2% цены в час
// ===============================================================================================
const fmt=n=>{n=Math.round(n);return n>=1e6?(+(n/1e6).toFixed(n>=1e7?0:1)+'').replace('.',',')+' млн ₽':n.toLocaleString('ru-RU')+' ₽'};
const need=l=>85+25*l,pick=w=>{let r=R()*Object.values(w).reduce((a,b)=>a+b,0),k;for(k in w)if((r-=w[k])<0)return k;return k};
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch{}
S=S||{m:2e6,cars:[],own:[],acc:0,at:0,xp:0,lv:1,fuel:FUEL_MAX,ft:Date.now(),day:'',tk:{},id:1};
let tab='garage',cs=1,cn=1,df=0,busy=false;
const save=()=>{S.at=Date.now();try{localStorage.setItem(KEY,JSON.stringify(S))}catch{}try{cloudSave()}catch{}};
const toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2000)};
const buzz=()=>{try{Telegram.WebApp.HapticFeedback.impactOccurred('light')}catch{}};
const rb=r=>`<b class="rb" style="background:${RC[r]}">${r}</b>`;
let uid=0;
const BODY={hatch:['M5 36V31Q5 27 10 26L24 24 34 14Q37 11 42 11H72Q78 11 82 15L90 24 106 26Q116 27 117 32V36Z','M38 24 44 15H70Q74 15 77 18L83 24Z',8.5],sedan:['M4 36V30Q4 26 9 25L20 23 32 13Q35 11 40 11H80Q85 11 88 14L98 23 112 25Q117 26 117 31V36Z','M36 23 42 14H78L88 23Z',8.5],coupe:['M4 36V31Q4 27 10 26L32 22 48 12Q51 10 56 10H78Q84 10 88 14L100 23 112 25Q118 26 118 31V36Z','M52 21 58 13H78Q81 13 84 16L90 22Z',8.5],super:['M3 36V32Q3 29 8 28L36 23 60 12Q64 10 70 10H84Q90 10 94 14L104 24 114 27Q119 28 119 32V36Z','M62 22 68 13H84L96 22Z',8.5],muscle:['M4 36V30Q4 26 9 25L26 22 38 12Q41 10 46 10H66Q72 10 76 14L84 22 110 24Q117 25 118 31V36Z','M40 22 46 13H66L72 22Z',8.5],suv:['M5 37V28Q5 24 10 23L14 11Q15 8 20 8H80Q85 8 88 11L96 22 110 24Q117 25 117 31V37Z','M20 22 22 12H48V22ZM52 22V12H78L86 22Z',10]};
const bodyOf=c=>{const t=c.tg||[];return t.includes('suv')?'suv':t.includes('muscle')?'muscle':t.includes('ussr')?(c.hp<80?'hatch':'sedan'):(t.includes('drift')||t.includes('sport'))&&c.hp>=500?'super':t.includes('drift')?'coupe':c.hp>=300?'coupe':c.hp>=150?'sedan':'hatch'};
function car(c){const bt=bodyOf(c),[bp,wp,wr]=BODY[bt],k=c.col,u='g'+(uid++),wy=bt==='suv'?38:37,sp=bt==='super'||(bt==='coupe'&&(c.tg||[]).includes('drift')),wheel=x=>`<circle cx="${x}" cy="${wy}" r="${wr}" fill="#0b0b0d"/><circle cx="${x}" cy="${wy}" r="${wr*.62}" fill="#cfd3da"/><circle cx="${x}" cy="${wy}" r="${wr*.3}" fill="#4a4f59"/>`;
return `<svg viewBox="0 0 120 50"><defs><linearGradient id="${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="${k}" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></linearGradient></defs><ellipse cx="60" cy="46" rx="56" ry="3" fill="#0008"/><path d="${bp}" fill="${k}"/><path d="${bp}" fill="url(#${u})"/>${sp?`<path d="M3 24H18V26.5H3ZM7 26V30M14 26V30" fill="${k}" stroke="${k}" stroke-width="1.5"/>`:''}<path d="${wp}" fill="#0d1a28"/><path d="${wp}" fill="#fff" opacity=".1"/><path d="M60 24V35" stroke="#0005" stroke-width=".8"/><rect x="108" y="27" width="7" height="3" rx="1.5" fill="#fff6bf"/><rect x="4" y="28" width="4" height="3" rx="1.2" fill="#ff3b3b"/>${wheel(30)}${wheel(92)}</svg>`}
// Фото машин из photos.js (если есть): ищем по названию или по номеру
const ix=c=>c.i!==undefined?c.i:CARS.indexOf(c);
const CAR_URLS={}; // при желании: 'Название машины':'https://ссылка-на-картинку'
const photo=c=>CAR_URLS[c.n]||(typeof CAR_IMG!=='undefined'&&CAR_IMG[ix(c)])||null;
const art=c=>{const p=photo(c);return p?`<img class="ph" src="${p}" alt="${c.n}" loading="lazy" onerror="this.outerHTML=car(CARS[${ix(c)}])">`:car(c)};
const mini=(c,x='')=>`<div class="cc" style="border-color:${RC[c.r]}66">${rb(c.r)}${art(c)}<h3>${c.n}</h3><p>${FL[c.cc]} ${c.hp} л.с. · ${fmt(c.p)}</p>${x}</div>`;
function rate(){const cnt={};S.cars.forEach(o=>cnt[CARS[o.i].cc]=(cnt[CARS[o.i].cc]||0)+1);return S.cars.reduce((a,o)=>a+CARS[o.i].p*INC*(cnt[CARS[o.i].cc]>=3?1.1:1),0)}
function gainXp(n){S.xp+=n;while(S.xp>=need(S.lv)){S.xp-=need(S.lv);S.lv++;S.m+=1e5*S.lv;toast('Уровень '+S.lv+'! Бонус '+fmt(1e5*S.lv))}}
function task(k,n=1){const d=new Date().toDateString();if(S.day!==d){S.day=d;S.tk={}}const t=TASKS.find(x=>x[0]===k),was=S.tk[k]||0;S.tk[k]=Math.min(t[2],was+n);if(was<t[2]&&S.tk[k]>=t[2]){S.m+=t[3];gainXp(40);toast('Задание выполнено: +'+fmt(t[3]))}}
const V={
garage(){const r=rate(),cnt={};S.cars.forEach(o=>cnt[CARS[o.i].cc]=(cnt[CARS[o.i].cc]||0)+1);const b=Object.keys(cnt).filter(k=>cnt[k]>=3).map(k=>`<span class="chip2">${FL[k]} +10%</span>`).join('');
return `<div class="card"><div class="r"><span>Доход гаража</span><span>${fmt(r)} / ч</span></div><div class="big" id="acc"></div><div class="bar"><i id="accb"></i></div><button class="blue" data-a="claim">Забрать</button><p class="mute">Копится до ${CAP_H} ч, потом останавливается</p><p class="mute">${b}${b?'<br>':''}3+ машины одной страны: +10% к их доходу</p></div><div class="sec"><span>МАШИНЫ ${S.cars.length}/${SLOTS}</span></div>${S.cars.length?`<div class="grid">${S.cars.map(gcard).join('')}</div>`:'<p class="mute">Гараж пуст. Откройте первый кейс!</p>'}`},
cases(){const k=CASES[cs],tot=k.c*cn,sh=tot-S.m,w=caseW(k),sum=Object.values(w).reduce((a,b)=>a+b,0);return `<div class="cs">${CASES.map((c,i)=>`<button class="ct ${i===cs?'on':''}" data-a="cs" data-i="${i}" style="--cc:${c.col}"><span>${c.e}</span><b>${c.n}</b><small>${fmt(c.c)}</small></button>`).join('')}</div><div class="mys" style="--cc:${k.col}">${car({col:'#222'})}<span>?</span></div><h2 class="ctt">${k.n}</h2><p class="mute" style="margin:0 0 10px">${k.d} · ${poolFor(k).length} машин</p><div class="chances">${Object.entries(w).map(([r,v])=>rb(r)+' '+Math.round(v/sum*100)+'%').join(' ')}</div><div class="seg">${[1,3,5].map(n=>`<button class="${n===cn?'on':''}" data-a="cn" data-i="${n}">×${n}</button>`).join('')}</div><button class="blue" data-a="open" ${sh>0?'disabled':''}>Открыть ×${cn} · ${fmt(tot)}</button><p class="mute">${sh>0?'Не хватает '+fmt(sh):'Если гараж полон, лишние машины продаются автоматически'}</p>`},
raceV(){const f=DIFF[df];return `<button class="back" data-g="hub">‹ Игры</button><div class="card"><p class="mute" style="margin:0">Нажми СТАРТ, дождись зелёного и жми ГАЗ. Фальстарт = проигрыш. Взнос списывается на старте, приз получаешь за победу.</p></div><div class="dif">${DIFF.map((d,i)=>`<button class="${i===df?'on':''}" data-a="df" data-i="${i}"><span>${d[0]}<br><small>взнос ${fmt(d[1])}</small></span><span>приз ${fmt(d[2])}</span></button>`).join('')}</div><button class="blue" data-a="go" ${S.m<f[1]||!S.cars.length?'disabled':''}>🏁 Старт · взнос ${fmt(f[1])}</button>`},
menu(){const d=new Date().toDateString();if(S.day!==d){S.day=d;S.tk={}}return `<div class="ban"><div class="r"><b>Уровень ${S.lv}</b><span>${S.xp}/${need(S.lv)}</span></div><div class="bar"><i style="width:${S.xp/need(S.lv)*100}%;background:#fff"></i></div><small>На ${S.lv+1} уровне: +${fmt(1e5*(S.lv+1))}</small></div><p class="mute" id="dg" style="margin:10px 0 0"></p><div class="sec"><span>ЗАДАНИЯ НА СЕГОДНЯ</span></div>${TASKS.map(t=>{const v=S.tk[t[0]]||0;return `<div class="task ${v>=t[2]?'ok':''}"><div>${t[1]}<small>+${fmt(t[3])} · +40 опыта</small></div><span>${v>=t[2]?'Получено ✓':v+'/'+t[2]}</span></div>`}).join('')}<div class="sec"><span>КОЛЛЕКЦИЯ ${S.own.length}/${CARS.length}</span></div><div class="grid">${CARS.map((c,i)=>S.own.includes(i)?mini(c):`<div class="cc lock">${rb(c.r)}${car({col:'#fff'})}<h3>???</h3><p>Ещё не открыта</p></div>`).join('')}</div>`}};
// ===== Прокачка, выбор машины =====
const eff=o=>CARS[o.i].hp*(1+.1*(o.lv||0)),upCost=o=>Math.round(CARS[o.i].p*.04*((o.lv||0)+1)),car2=o=>({...CARS[o.i],i:o.i,hp:Math.round(eff(o))}),selCar=()=>S.cars.find(o=>o.id===S.sel)||S.cars[0];
const gcard=o=>{const lv=o.lv||0;return mini(car2(o),`<p>Уровень ${lv}/5</p><div class="two"><button class="sm" data-a="upg" data-i="${o.id}" ${lv>=5?'disabled':''}>${lv>=5?'MAX':'⬆ '+fmt(upCost(o))}</button><button class="sm" data-a="sell" data-i="${o.id}">Продать</button></div>`)};
// ===== Игры =====
let gm=null,wc=33,ws=1,wbusy=false;const WS=[1e5,5e5,1e6,5e6,2e7];
// ===== Промокоды: хранятся хэши SHA-256 от 'tdrop:' + КОД (сами коды в репозитории не видны) =====
const PROMO={
'ab7df95d73595a9a33bd8faa6cba1ac66a44059bc6c36aa714bcbcca04290534':25000000,
'79d68b24057d12921c6bce38ceaad59a6380f2ab0b8d9de302ba635ed39d19c9':50000000,
'd8bc456f74568e844264f15b0a20ba289518962c3c0c6f7545d9835647a6786e':100000000,
'ef0742f22e6e6bbede53a90b8861f446ad88fca697576c35c8610605b24adab1':10000000,
'0cac774e9f31528c59ded96c4d9c19fba06aaf7f3fc8216ca24a807a5f3d4dd7':5000000};
async function sha(t){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
async function applyPromo(){const el=$('#pc'),pm=$('#pm');if(!el)return;const say=(t,ok)=>{pm.textContent=t;pm.style.color=ok?'#34d399':'#f87171'};const c=el.value.trim().toUpperCase().replace(/\s+/g,'');if(!c)return say('Введите промокод');
if(!(window.crypto&&crypto.subtle))return say('Промокоды не поддерживаются в этом окне');const h=await sha('tdrop:'+c),r=PROMO[h];S.pu=S.pu||[];
if(!r)return say('Такого промокода нет');if(S.pu.includes(h))return say('Этот промокод уже активирован');S.pu.push(h);S.m+=r;save();upd();el.value='';say('Активирован: +'+fmt(r),true);toast('+'+fmt(r)+' по промокоду');buzz()}
const edgeOf=o=>o?Math.max(.04,.10-eff(o)/20000):.10;
const arcD=p=>{const th=Math.min(p,.995)*Math.PI,pt=a=>[100+80*Math.cos(a),100+80*Math.sin(a)],[x1,y1]=pt(Math.PI/2-th),[x2,y2]=pt(Math.PI/2+th);return `M${x1.toFixed(2)} ${y1.toFixed(2)}A80 80 0 ${th>Math.PI/2?1:0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`};
const pickerH=()=>{if(!S.cars.length)return '<div class="card"><p class="mute" style="margin:0">У вас нет машин. Откройте кейс, чтобы начать играть.</p></div>';const o=selCar(),lv=o.lv||0;
return `<div class="sec"><span>ВАША МАШИНА</span><span>${Math.round(eff(o))} л.с.</span></div><div class="cs">${S.cars.map(x=>{const d=car2(x);return `<button class="pk ${x.id===o.id?'on':''}" data-a="pick" data-i="${x.id}" style="--rc:${RC[d.r]}">${art(d)}<b>${d.n}</b><small>ур.${x.lv||0} · ${d.hp} л.с.</small></button>`}).join('')}</div><button class="up" data-a="upg" data-i="${o.id}" ${lv>=5?'disabled':''}>${lv>=5?'Максимальный уровень':`⬆ Прокачать до ур.${lv+1} · ${fmt(upCost(o))}`}<small>+10% мощности: быстрее в гонке, ниже комиссия в колесе</small></button>`};
const wheelH=()=>`<button class="back" data-g="hub">‹ Игры</button><div class="card wcard"><svg id="dial" viewBox="0 0 200 200"><defs><linearGradient id="wg" gradientUnits="userSpaceOnUse" x1="20" y1="0" x2="180" y2="0"><stop offset="0" stop-color="#facc15"/><stop offset=".5" stop-color="#ef4444"/><stop offset="1" stop-color="#facc15"/></linearGradient><radialGradient id="wb"><stop offset="0" stop-color="#1c2230"/><stop offset="1" stop-color="#0a0d14"/></radialGradient></defs><circle cx="100" cy="100" r="97" fill="url(#wb)" stroke="#ffffff1c" stroke-width="2"/><circle cx="100" cy="100" r="80" fill="none" stroke="#1d2433" stroke-width="14"/><path id="warc" d="${arcD(wc/100)}" fill="none" stroke="url(#wg)" stroke-width="14" stroke-linecap="round"/><g fill="#8a93a8" font-size="9" font-weight="700" text-anchor="middle"><text x="100" y="17">100%</text><text x="21" y="103">50%</text><text x="179" y="103">50%</text><text x="100" y="192">0%</text></g><g id="needle" style="transform-box:view-box;transform-origin:100px 100px"><path d="M100 177 93.5 160H106.5Z" fill="#fff"/></g><text id="wpc" x="100" y="100" text-anchor="middle" font-size="27" font-weight="800" fill="#a3e635"></text><text id="wlb" x="100" y="120" text-anchor="middle" font-size="10" font-weight="700" fill="#8a93a8"></text></svg>
<div class="r" style="margin-top:6px"><span>Шанс выигрыша</span><span id="wm"></span></div><input id="wc" type="range" min="5" max="90" value="${wc}"><div class="chips2">${WS.map((v,i)=>`<button class="${i===ws?'on':''}" data-a="wst" data-i="${i}">${fmt(v)}</button>`).join('')}</div><div class="r"><span>Выигрыш при победе</span><b id="wp" style="color:#fff"></b></div><div class="r" style="margin-top:4px"><span>Комиссия (меньше у мощных машин)</span><span id="we"></span></div><button class="blue" id="spin" data-a="wspin" style="margin-top:14px">🎯 Крутить · взнос ${fmt(WS[ws])}</button><p class="mute" id="wres"></p></div>`;
function wUpd(){const a=$('#warc');if(!a)return;const p=wc/100,m=(1-edgeOf(selCar()))/p;a.setAttribute('d',arcD(p));$('#wpc').textContent=wc+'%';$('#wlb').textContent=wc<30?'низкий шанс':wc<60?'средний шанс':'высокий шанс';$('#wm').textContent='×'+m.toFixed(2);$('#wp').textContent=fmt(WS[ws]*m);$('#we').textContent=Math.round(edgeOf(selCar())*1000)/10+'%'}
function spin(){if(wbusy)return;const o=selCar();if(!o)return toast('Сначала получите машину в кейсе');const st=WS[ws];if(S.m<st)return toast('Не хватает на взнос');
const p=wc/100,m=(1-edgeOf(o))/p,win=R()<p,th=p*180;S.m-=st;upd();wbusy=true;$('#spin').disabled=true;$('#wres').textContent='';let f=win?(R()*2-1)*th*.9:th*1.04+R()*(360-2*th*1.04);if(f<0)f+=360;
const nd=$('#needle');nd.style.transition='none';nd.style.transform='rotate(0deg)';void nd.getBoundingClientRect();nd.style.transition='transform 4.6s cubic-bezier(.1,.6,.1,1)';nd.style.transform=`rotate(${1800+f}deg)`;const tk=setInterval(buzz,160);
setTimeout(()=>{clearInterval(tk);wbusy=false;if(win)S.m+=st*m;gainXp(win?20:5);save();upd();const r=$('#wres'),b=$('#spin');if(r){r.textContent=win?'Победа! +'+fmt(st*m-st):'Не повезло: −'+fmt(st);r.style.color=win?'#34d399':'#f87171';r.style.fontSize='18px'}if(b)b.disabled=false;toast(win?'+'+fmt(st*m):'Не повезло')},4800)}
V.games=()=>{if(gm==='pit')return pickerH()+pitView();if(gm==='auction')return pickerH()+aucView();if(gm==='rally')return pickerH()+rallyView();if(gm==='race')return pickerH()+V.raceV();if(gm==='wheel')return pickerH()+wheelH();
return pickerH()+`<div class="sec"><span>ИГРЫ</span></div><div class="gl"><button class="gc" data-g="race"><span>🏁</span><b>Гонка</b><small>Старт против робота · взнос от ${fmt(DIFF[0][1])}</small></button><button class="gc" data-g="wheel"><span>🎯</span><b>Колесо</b><small>Сам выбираешь шанс и множитель</small></button><button class="gc" data-g="pit"><span>⛽</span><b>Пит-стоп</b><small>Останови ползунок в зелёной зоне</small></button><button class="gc" data-g="auction"><span>🔨</span><b>Аукцион</b><small>Угадай: дороже или дешевле</small></button><button class="gc" data-g="rally"><span>🚧</span><b>Ралли</b><small>Объезжай препятствия</small></button></div><div class="sec"><span>ПРОМОКОД</span></div><div class="card promo"><input id="pc" placeholder="Введите промокод" autocomplete="off" autocapitalize="characters" spellcheck="false"><button class="blue" data-a="promo">Активировать</button><p class="mute" id="pm" style="min-height:18px"></p></div>`};
// ===== Общее для новых игр =====
const stakeH=()=>`<div class="chips2">${WS.map((v,i)=>`<button class="${i===ws?'on':''}" data-a="wst" data-i="${i}">${fmt(v)}</button>`).join('')}</div>`;
const lvOf=()=>{const o=selCar();return o?o.lv||0:0};
// ===== Пит-стоп =====
const PIT_PAY=[0,.3,.8,1.6,3.2];let pit=null;
const pitX=()=>.5+.5*Math.sin((performance.now()-pit.t0)/1000*pit.sp-Math.PI/2);
function pitRound(){const o=selCar();pit.zw=.13+Math.min(.13,eff(o)/12000);pit.zc=pit.zw/2+.08+R()*(.84-pit.zw);pit.sp=2.4+pit.n*.55;pit.t0=performance.now();pit.on=true;
const z=$('#pz');if(z){z.style.left=(pit.zc-pit.zw/2)*100+'%';z.style.width=pit.zw*100+'%'}const pi=$('#pi');if(pi)pi.textContent='Колесо '+(pit.n+1)+' из 4';const b=$('#pbtn');if(b){b.disabled=false}
const lp=()=>{const m=$('#pm');if(!pit||!pit.on||!m)return;m.style.left=pitX()*100+'%';requestAnimationFrame(lp)};lp()}
function pitStart(){if(!selCar())return toast('Сначала получите машину в кейсе');const fee=WS[ws];if(S.m<fee)return toast('Не хватает на взнос');S.m-=fee;save();upd();pit={n:0,hits:0,fee,on:false,res:'',done:false};draw();pitRound()}
function pitTap(){if(!pit||!pit.on)return;pit.on=false;const hit=Math.abs(pitX()-pit.zc)<=pit.zw/2;pit.n++;if(hit)pit.hits++;buzz();$('#ph').textContent='Попаданий: '+pit.hits+' из '+pit.n;$('#pbtn').disabled=true;
const rs=$('#pres');rs.textContent=hit?'✅ Точно!':'❌ Мимо';rs.style.color=hit?'#34d399':'#f87171';
if(pit.n<4)setTimeout(()=>{if(pit&&!pit.done&&$('#pm')){rs.textContent='';pitRound()}},650);
else{const pay=pit.fee*PIT_PAY[pit.hits];S.m+=pay;gainXp(pit.hits>1?20:5);save();upd();pit.res=`Итог: ${pit.hits} из 4 · ${pay?'выплата '+fmt(pay):'без выплаты'}`;setTimeout(()=>{if(pit){pit.done=true;draw()}},700)}}
const pitView=()=>{const st=WS[ws],d=pit&&pit.done,run=pit&&!pit.done;return `<button class="back" data-g="hub">‹ Игры</button><div class="card" style="text-align:center"><b style="font-size:20px">⛽ Пит-стоп</b><p class="mute">Меняй 4 колеса: жми СТОП, когда ползунок в зелёной зоне. Чем мощнее машина, тем шире зона. Выплаты: 1 колесо ×0,3 · 2 ×0,8 · 3 ×1,6 · 4 ×3,2</p><div class="pit"><i id="pz"></i><i id="pm"></i></div><div class="r" style="margin-top:8px"><span id="pi">${run?'':'Колесо: —'}</span><span id="ph">${pit?'Попаданий: '+pit.hits+' из '+pit.n:''}</span></div>${run?'':stakeH()}<button class="blue" id="pbtn" data-a="${run?'ptap':'pstart'}" style="margin-top:12px" ${run?'disabled':''}>${run?'СТОП':(d?'Ещё раз':'Начать')+' · взнос '+fmt(st)}</button><p class="mute" id="pres" style="font-size:16px;color:#fff">${d?pit.res:''}</p></div>`};
// ===== Аукцион =====
let au=null;const auMult=()=>1.55+.05*lvOf();
const auNew=()=>{const i=Math.floor(R()*CARS.length),p=CARS[i].p,f=R()<.5?.55+R()*.25:1.25+R()*.55;au.i=i;au.price=p;au.shown=Math.max(1e4,Math.round(p*f/1e4)*1e4);au.res=null};
function aucStart(){if(!selCar())return toast('Сначала получите машину в кейсе');const fee=WS[ws];if(S.m<fee)return toast('Не хватает на взнос');S.m-=fee;save();upd();au={fee,pot:fee,round:1,done:false};auNew();draw()}
function aucCash(){if(!au||au.done)return;const w=au.pot;S.m+=w;au.done=true;au.res='cash';gainXp(15);save();upd();draw();toast('Забрано '+fmt(w))}
function aucAns(hi){if(!au||au.res!==null||au.done)return;buzz();if(hi===(au.price>au.shown)){au.pot*=auMult();au.res='win';if(au.round>=5)return aucCash()}else{au.res='lose';au.pot=0;au.done=true;gainXp(5)}draw()}
const aucNext=()=>{if(!au||au.res!=='win')return;au.round++;auNew();draw()};
function aucView(){const st=WS[ws];let h=`<button class="back" data-g="hub">‹ Игры</button><div class="card" style="text-align:center"><b style="font-size:20px">🔨 Аукцион</b>`;
if(!au)return h+`<p class="mute">Показывают машину и стартовую ставку. Угадай: настоящая цена выше или ниже? Каждый верный ответ умножает банк на ×${auMult().toFixed(2)} (+0,05 за каждый уровень машины). Забрать можно после любого верного ответа, ошибка сжигает банк. Максимум 5 раундов.</p>${stakeH()}<button class="blue" data-a="astart">Начать · взнос ${fmt(st)}</button></div>`;
const c=CARS[au.i];h+=`<div class="r" style="margin-top:10px"><span>Раунд ${au.round} из 5</span><b style="color:#fff">Банк ${fmt(au.pot)}</b></div><div class="cc" style="border-color:${RC[c.r]}66;margin:12px 0;text-align:left">${rb(c.r)}${art(c)}<h3>${c.n}</h3><p>${FL[c.cc]||''} ${c.hp} л.с.</p></div><p style="font-size:18px;margin:6px 0">Ставка: <b>${fmt(au.shown)}</b></p>`;
if(au.res===null)return h+`<div class="two" style="gap:10px;margin-top:10px"><button class="blue" data-a="ahi">▲ Дороже</button><button class="blue" data-a="alo" style="background:linear-gradient(135deg,#f97316,#c2410c);box-shadow:0 8px 26px #c2410c55">▼ Дешевле</button></div></div>`;
h+=`<p style="font-size:18px">Настоящая цена: <b>${fmt(au.price)}</b></p>`;
if(au.res==='win')return h+`<p style="color:#34d399;font-weight:800">Верно! Банк ×${auMult().toFixed(2)}</p><div class="two" style="gap:10px"><button class="blue" data-a="anext">Дальше</button><button class="blue" style="background:var(--card2);box-shadow:none" data-a="acash">Забрать ${fmt(au.pot)}</button></div></div>`;
return h+`<p style="color:${au.res==='cash'?'#34d399':'#f87171'};font-weight:800">${au.res==='cash'?'Забрали '+fmt(au.pot):'Неверно. Банк сгорел'}</p><button class="blue" data-a="areset">Играть снова</button></div>`}
// ===== Ралли =====
const RT=20;
const rallyView=()=>`<button class="back" data-g="hub">‹ Игры</button><div class="card" style="text-align:center"><b style="font-size:20px">🚧 Ралли</b><p class="mute">Уворачивайся от камней ${RT} секунд: тап слева или справа, либо кнопки ◀ ▶. Выплата растёт со временем: 6 с ×0 · 13 с ×1,1 · финиш ×3. Мощная машина чуть замедляет камни.</p>${stakeH()}<button class="blue" data-a="rstart">🚧 Старт · взнос ${fmt(WS[ws])}</button></div>`;
function rally(){const o=selCar();if(!o)return toast('Сначала получите машину в кейсе');const fee=WS[ws];if(S.m<fee)return toast('Не хватает на взнос');S.m-=fee;save();upd();const c=car2(o),el=$('#race');
el.className='on';el.innerHTML=`<div class="rt"><button id="rx" data-a="closerace" style="display:none" aria-label="Закрыть">‹</button><div id="cd" class="t">Ралли</div><div id="cds">Уворачивайся от камней ${RT} секунд</div></div><canvas id="cv" width="300" height="420"></canvas><div class="bot rb2"><button class="blue" id="lf">◀</button><button class="blue" id="rg">▶</button></div>`;
const cv=$('#cv'),g=cv.getContext('2d');let lane=1,px=150,t=0,last=performance.now(),spawn=.6,ob=[],over=false,raf;
const rr=(x,y,w,h,r)=>{g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()};
const mv=d=>{if(!over){lane=Math.max(0,Math.min(2,lane+d));buzz()}};
$('#lf').onpointerdown=e=>{e.preventDefault();mv(-1)};$('#rg').onpointerdown=e=>{e.preventDefault();mv(1)};
cv.onpointerdown=e=>{const r=cv.getBoundingClientRect();mv(e.clientX<r.left+r.width/2?-1:1)};
const kd=e=>{if(e.key==='ArrowLeft')mv(-1);if(e.key==='ArrowRight')mv(1)};document.addEventListener('keydown',kd);const k=1-Math.min(.2,c.hp/8000);
const finish=()=>{over=true;cancelAnimationFrame(raf);document.removeEventListener('keydown',kd);const mult=t>=RT?3:t>6?(t-6)/(RT-6)*2.2:0,pay=fee*mult;S.m+=pay;gainXp(pay>=fee?25:5);save();upd();
$('#cd').className=pay>=fee?'w':'l';$('#cd').textContent=t>=RT?'Финиш!':'Авария';$('#cds').textContent=`Проехал ${Math.min(t,RT).toFixed(1)} с · ×${mult.toFixed(2)} · ${pay?'выплата '+fmt(pay):'без выплаты'}`;$('#rx').style.display='block';document.querySelector('.rb2').innerHTML='<button class="blue" data-a="closerace">Закрыть</button>'};
const loop=n=>{const dt=Math.min(.05,(n-last)/1000);last=n;t+=dt;const v=(190+t*11)*k;px+=((lane*100+50)-px)*Math.min(1,dt*14);
spawn-=dt;if(spawn<=0){spawn=Math.max(.42,.9-t*.02);const a=Math.floor(R()*3);ob.push({x:a*100+50,y:-30});if(t>6&&R()<.35)ob.push({x:((a+1+Math.floor(R()*2))%3)*100+50,y:-30})}
ob.forEach(o=>o.y+=v*dt);ob=ob.filter(o=>o.y<460);
g.fillStyle='#161a24';g.fillRect(0,0,300,420);g.fillStyle='#ffffff25';const off=(t*v)%40;for(let y=-40;y<420;y+=40){g.fillRect(99,y+off,3,20);g.fillRect(199,y+off,3,20)}
ob.forEach(o=>{g.fillStyle='#6b7280';rr(o.x-27,o.y-20,54,40,12);g.fill();g.fillStyle='#9ca3af';g.fillRect(o.x-18,o.y-14,20,8)});
g.fillStyle=c.col;rr(px-20,330,40,74,10);g.fill();g.fillStyle='#0d1a28';g.fillRect(px-15,346,30,16);g.fillRect(px-15,380,30,10);g.fillStyle='#fff6bf';g.fillRect(px-17,332,8,5);g.fillRect(px+9,332,8,5);
g.fillStyle='#fff';g.font='700 14px sans-serif';g.fillText(Math.max(0,RT-t).toFixed(1)+' с',10,22);
if(ob.some(o=>Math.abs(o.x-px)<45&&o.y+20>332&&o.y-20<402)||t>=RT)return finish();raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop)}
// ===== Сохранение в облаке Telegram (между устройствами) =====
let lastCloud=0;
const cloudSave=()=>{try{const cs=Telegram.WebApp.CloudStorage;if(!cs||Date.now()-lastCloud<8000)return;lastCloud=Date.now();const j=JSON.stringify(S);if(j.length<4000)cs.setItem(KEY,j)}catch{}};
const cloudLoad=()=>{try{Telegram.WebApp.CloudStorage.getItem(KEY,(e,v)=>{try{if(e||!v)return;const c=JSON.parse(v);if(c&&c.at>(S.at||0)){S=c;try{localStorage.setItem(KEY,v)}catch{}draw()}}catch{}})}catch{}};
const VERSION='4.0',ERRS=[];window.addEventListener('error',e=>ERRS.push(e.message));
function diag(){const el=$('#dg');if(!el)return;const n=typeof CAR_IMG!=='undefined'?CAR_IMG.length:0;el.innerHTML=`Версия ${VERSION} · картинки машин: ${n>=56?'✅ все '+n:'❌ загружено '+n+' из 56 (проверь, что файл images.js лежит в корне репозитория)'}${ERRS.length?' · ошибки: '+ERRS.join('; '):''}`}
const TT={garage:'Гараж',cases:'Кейсы',games:'Игры',menu:'Меню'};
function upd(){$('#mo').textContent=fmt(S.m);$('#lv').textContent=S.lv;const a=$('#acc');if(a){const cap=rate()*CAP_H;a.textContent=fmt(S.acc);$('#accb').style.width=(cap?S.acc/cap*100:0)+'%'}const f=$('#fu');if(f)f.textContent=S.fuel+'/'+FUEL_MAX}
function draw(){$('#ttl').textContent=TT[tab];document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===tab));$('#main').innerHTML=V[tab]();upd();if(tab==='games'&&gm==='wheel')wUpd();if(tab==='menu')diag()}
const RN={D:'Обычная',C:'Необычная',B:'Редкая',A:'Эпическая',S:'Легендарная'},RK='DCBAS';
function openCase(){const k=CASES[cs],tot=k.c*cn;if(S.m<tot||busy)return;busy=true;S.m-=tot;const got=[];let kept=0,sold=0;
for(let j=0;j<cn;j++){const i=roll(k);got.push(i);if(!S.own.includes(i))S.own.push(i);if(S.cars.length<SLOTS){S.cars.push({id:S.id++,i});kept++}else{S.m+=CARS[i].p*SELL;sold++}}
got.sort((a,b)=>RK.indexOf(CARS[b].r)-RK.indexOf(CARS[a].r)||CARS[b].p-CARS[a].p);
gainXp(15*cn);task('case',cn);save();draw();const o=$('#ov'),pl=poolFor(k),W=34,best=got[0],info=`${kept?'В гараж: '+kept+'. ':''}${sold?'Гараж полон, продано: '+sold:''}`;
const strip=Array.from({length:42},(_,j)=>j===W?best:pl[Math.floor(R()*pl.length)]);
o.className='on';o.innerHTML=`<div class="ovc"><div class="reelw"><div class="reel" id="reel">${strip.map(i=>{const c=CARS[i];return `<div class="rcd" style="--rc:${RC[c.r]}">${art(c)}<small>${c.n}</small></div>`}).join('')}</div><i class="mk"></i></div><p class="mute" id="rl">Открываем «${k.n}»…</p></div>`;
const rl=$('#reel'),mid=o.clientWidth/2,x=-(W*160+75+(R()-.5)*90)+mid;rl.style.transform=`translateX(${mid}px)`;void rl.offsetWidth;rl.style.transition='transform 4s cubic-bezier(.08,.55,.1,1)';rl.style.transform=`translateX(${x}px)`;
const tk=setInterval(buzz,140);
setTimeout(()=>{clearInterval(tk);buzz();const c=CARS[best];
o.innerHTML=got.length===1?`<div class="ovc"><div class="stage" style="--rc:${RC[c.r]}"><div class="burst"></div><div class="pop">${art(c)}</div></div><div class="rbig">${rb(c.r)}<span style="color:${RC[c.r]}">${RN[c.r]}</span></div><h2 class="ctt">${c.n}</h2><p class="mute">${FL[c.cc]||''} ${c.hp} л.с. · ${fmt(c.p)}</p><p class="mute">${info}</p><button class="blue" style="max-width:360px;margin-top:14px" data-a="closeov">Забрать</button></div>`
:`<div class="ovc"><h2 class="ctt">Выпало ×${got.length}</h2><div class="cen">${got.map((i,j)=>mini(CARS[i]).replace('style="',`style="animation-delay:${j*.13}s;`)).join('')}</div><p class="mute">${info}</p><button class="blue" style="max-width:360px;margin-top:10px" data-a="closeov">Забрать</button></div>`;busy=false},4300)}
let rtm=[],rraf;
const gs=()=>(R()+R()+R()-1.5)*2,runT=hp=>Math.max(4.2,8-hp/380)+(R()-.5)*.12;
function race(){if(!S.cars.length)return toast('Сначала получите машину в кейсе');if(S.m<DIFF[df][1])return toast('Не хватает на взнос: '+fmt(DIFF[df][1]));
const so=selCar(),best={...CARS[so.i],i:so.i,hp:Math.round(eff(so))},tg=best.hp*[.8,.95,1.1][df],opp=CARS.slice().sort((a,b)=>Math.abs(a.hp-tg)-Math.abs(b.hp-tg))[Math.floor(R()*3)],rew=DIFF[df][2],mean=[.34,.26,.2][df],sd=[.07,.05,.04][df],rfs=R()<[.1,.06,.04][df],el=$('#race');
el.className='on';el.innerHTML=`<div class="rt"><button id="rx" data-a="closerace" aria-label="Закрыть">‹</button><div class="lights"><i></i><i></i><i></i><i></i></div><div id="cd" class="t">Готов?</div><div id="cds">СТАРТ → считай 4-3-2-1 → жди зелёного → жми ГАЗ</div></div><div class="track"><div class="lane"><span>🤖 Робот · ${opp.n}</span><div class="trk"><div class="rc" id="oc">${art(opp)}</div><b class="fin"></b></div><small id="ort"></small></div><div class="lane"><span>Вы · ${best.n}</span><div class="trk"><div class="rc" id="pc">${art(best)}</div><b class="fin"></b></div><small id="prt"></small></div></div><div class="bot"><div id="sw">0.000</div><div id="sub">секундомер</div><div id="rtx"></div><button id="tap" class="blue">СТАРТ</button></div>`;
let st='idle',goT=0,pr=null,rr=0,rrun=0,prun=0;const L=[...el.querySelectorAll('.lights i')],cd=$('#cd'),sw=$('#sw'),tap=$('#tap'),T=(f,ms)=>rtm.push(setTimeout(f,ms)),clr=()=>{rtm.forEach(clearTimeout);rtm=[];cancelAnimationFrame(rraf)};
const end=(win,msg,sub)=>{if(st==='end')return;st='end';clr();let g=0;if(win){g=rew*(pr!==null&&pr<.2?1.2:1);S.m+=g;task('race')}gainXp(win?30:5);save();upd();cd.className=win?'w':'l';cd.textContent=msg;$('#cds').textContent=sub;$('#rtx').textContent=win?'Награда: '+fmt(g)+(pr!==null&&pr<.2?' (бонус за реакцию +20%)':''):'';tap.textContent='ЗАКРЫТЬ';tap.className='blue';tap.dataset.a='closerace';tap.disabled=true;setTimeout(()=>tap.disabled=false,900)};
const loop=n=>{const t=(n-goT)/1000,xo=Math.min(1,Math.max(0,(t-rr)/rrun)),xp=pr===null?0:Math.min(1,Math.max(0,(t-pr)/prun));$('#oc').style.left=xo*84+'%';$('#pc').style.left=xp*84+'%';if(pr===null)sw.textContent=t.toFixed(3);else if(xp<1)sw.textContent=t.toFixed(3);
 if(pr!==null&&xo>=1&&xp>=1){const tp=pr+prun,to=rr+rrun;sw.textContent=tp.toFixed(3);return end(tp<to,tp<to?'Победа!':'Проигрыш',`Вы: реакция ${pr.toFixed(3)} + заезд ${prun.toFixed(2)} = ${tp.toFixed(2)} с · Робот: ${to.toFixed(2)} с`)}rraf=requestAnimationFrame(loop)};
const go=()=>{st='go';L.forEach(l=>l.className='g');cd.className='g';cd.textContent='ГАЗ!';goT=performance.now();rr=Math.max(.12,mean+sd*gs());rrun=runT(opp.hp);rraf=requestAnimationFrame(loop);T(()=>{if(pr===null)end(false,'Слишком поздно','Вы не успели нажать ГАЗ')},1600)};
const start=()=>{S.m-=DIFF[df][1];save();upd();st='cd';$('#rx').style.display='none';cd.className='';tap.textContent='ГАЗ!';tap.classList.add('red');$('#cds').textContent='Не жми раньше зелёного. Это фальстарт!';
[4,3,2,1].forEach((n,j)=>T(()=>{cd.textContent=n;L[j].className='r'},j*850+200));T(go,2750+700+R()*1000);
if(rfs)T(()=>end(true,'Фальстарт робота!','Соперник рванул раньше зелёного. Победа ваша'),1500+R()*1400)};
tap.onpointerdown=e=>{e.preventDefault();if(st==='idle')return start();
 if(st==='cd'){L.forEach(l=>l.className='r');return end(false,'ФАЛЬСТАРТ','Вы нажали до зелёного сигнала')}
 if(st==='go'&&pr===null){pr=(performance.now()-goT)/1000;prun=runT(best.hp);sw.textContent=pr.toFixed(3);$('#sub').textContent='время заезда, сек';$('#prt').textContent='реакция '+pr.toFixed(3);$('#ort').textContent='реакция '+rr.toFixed(3);buzz()}};
}
document.body.onclick=e=>{const b=e.target.closest('[data-a],[data-t],[data-g]');if(!b)return;if(b.dataset.g!==undefined){if(pit&&!pit.done)pit=null;gm=b.dataset.g==='hub'?null:b.dataset.g;return draw()}if(b.dataset.t){if(pit&&!pit.done)pit=null;tab=b.dataset.t;scrollTo(0,0);return draw()}
const a=b.dataset.a,i=+b.dataset.i;buzz();
if(a==='claim'){if(S.acc<1)return toast('Пока нечего забирать');S.m+=S.acc;toast('+'+fmt(S.acc));S.acc=0}
else if(a==='sell'){const o=S.cars.find(x=>x.id===i);if(o&&confirm('Продать '+CARS[o.i].n+'?')){S.m+=CARS[o.i].p*SELL;S.cars=S.cars.filter(x=>x!==o);task('sell')}}
else if(a==='pick')S.sel=i;else if(a==='upg'){const o=S.cars.find(x=>x.id===i);if(!o)return;if((o.lv||0)>=5)return toast('Максимальный уровень');const c=upCost(o);if(S.m<c)return toast('Не хватает '+fmt(c-S.m));S.m-=c;o.lv=(o.lv||0)+1;toast(CARS[o.i].n+': уровень '+o.lv)}else if(a==='wst'){if(pit&&!pit.done)return;ws=i}else if(a==='wspin')return spin();else if(a==='promo')return applyPromo();else if(a==='pstart')return pitStart();else if(a==='ptap')return pitTap();else if(a==='astart')return aucStart();else if(a==='ahi'||a==='alo')return aucAns(a==='ahi');else if(a==='anext')return aucNext();else if(a==='acash')return aucCash();else if(a==='areset'){au=null}else if(a==='rstart')return rally();else if(a==='cs')cs=i;else if(a==='cn')cn=i;else if(a==='df')df=i;else if(a==='open')return openCase();else if(a==='go')return race();
else if(a==='closeov')$('#ov').className='';else if(a==='closerace')$('#race').className='';
save();draw()};
document.body.oninput=e=>{if(e.target.id==='wc'){wc=+e.target.value;wUpd()}};
let lt=Date.now();setInterval(()=>{const n=Date.now(),dt=(n-lt)/1000;lt=n;const cap=rate()*CAP_H;S.acc=Math.min(cap,S.acc+rate()*dt/3600);
if(S.fuel<FUEL_MAX){const k=Math.floor((n-S.ft)/1000/FUEL_SEC);if(k>0){S.fuel=Math.min(FUEL_MAX,S.fuel+k);S.ft+=k*FUEL_SEC*1000}}else S.ft=n;upd()},1000);
setInterval(save,5000);S.acc=Math.min(rate()*CAP_H,S.acc+rate()*Math.min((Date.now()-S.at)/3600000,CAP_H));
try{const w=Telegram.WebApp;w.ready();w.expand();w.disableVerticalSwipes&&w.disableVerticalSwipes();w.setHeaderColor('#000000');w.setBackgroundColor('#000000')}catch(e){}
draw();
cloudLoad();
