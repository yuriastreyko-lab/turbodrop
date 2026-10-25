const $=s=>document.querySelector(s),R=Math.random,KEY='tdrop5reset';
const RC={D:'#8a8f98',C:'#3a9bdc',B:'#a05fe0',A:'#ffa31a',S:'#ff4d6d'},FL={JP:'🇯🇵',DE:'🇩🇪',US:'🇺🇸',IT:'🇮🇹',GB:'🇬🇧',RU:'🇷🇺',FR:'🇫🇷',SE:'🇸🇪'};
// ===== ДАННЫЕ. Машина: Название|редкость D/C/B/A/S|л.с.|цена в млн|страна JP/DE/US/IT/GB|цвет =====
const CARS=`ВАЗ 2101|D|75|0.12|RU|#c9a66b|bomj
ВАЗ 2105|D|75|0.15|RU|#e5e7eb|bomj
ВАЗ 2106|D|80|0.18|RU|#b45309|bomj
ВАЗ 2107|D|77|0.20|RU|#f8fafc|bomj
ВАЗ 2109|D|90|0.22|RU|#d6b25e|bomj
ВАЗ 2110|D|110|0.30|RU|#e5e7eb|bomj
ВАЗ 2114|D|98|0.28|RU|#1f2937|bomj
ГАЗ 24 Волга|B|100|0.65|RU|#d1d5db|bomj
Москвич 412|C|75|0.35|RU|#dc2626|bomj
ЗАЗ 968|D|40|0.10|RU|#9ca3af|bomj
Lada Priora|D|106|0.28|RU|#4b5563|chek
Lada Kalina|D|89|0.24|RU|#e5e7eb|chek
Lada Granta|D|98|0.26|RU|#a8a29e|chek
Lada Samara|D|100|0.30|RU|#d6b25e|chek
Renault Logan|D|102|0.32|RU|#991b1b|chek
Daewoo Nexia|C|109|0.38|RU|#e5e7eb|chek
Chevrolet Lanos|C|86|0.30|US|#7f1d1d|chek
Hyundai Accent|C|102|0.42|RU|#e5e7eb|chek
Kia Rio|C|107|0.55|RU|#dc2626|chek
Volkswagen Polo|B|110|0.75|DE|#d6d3d1|chek
ГАЗ М20 Победа|D|52|0.55|RU|#d6d3d1|ussr
ГАЗ 21 Волга|C|75|0.95|RU|#0f766e|ussr
ГАЗ 13 Чайка|B|195|3.2|RU|#111827|ussr
ЗИЛ 111|B|200|3.8|RU|#9ca3af|ussr
Москвич 2140|D|75|0.45|RU|#fef3c7|ussr
ВАЗ 2121 Нива|C|80|0.75|RU|#4d7c0f|ussr,suv
УАЗ 469|C|75|0.70|RU|#4d7c0f|ussr,suv
ЗАЗ 966|D|30|0.38|RU|#7dd3fc|ussr
РАФ 2203|C|95|1.1|RU|#d6b25e|ussr
ИЖ 2125|D|75|0.42|RU|#4d7c0f|ussr
Volkswagen Golf GTI|C|110|1.0|DE|#111827|german
Volkswagen Passat B5|C|125|1.2|DE|#d1d5db|german
BMW E30|B|192|3.2|DE|#dc2626|german,sport
BMW E46|B|343|6.5|DE|#2563eb|german,sport
BMW E39|B|400|7.8|DE|#6b7280|german,sport
Mercedes-Benz W124|B|136|2.4|DE|#dc2626|german
Mercedes-Benz W210|B|193|2.8|DE|#14532d|german
Mercedes-Benz W140|A|394|6.8|DE|#111827|german
Audi 80|C|115|0.85|DE|#d1d5db|german
Porsche 911 930|A|300|12|DE|#14532d|german,sport
Toyota AE86|C|130|2.4|JP|#f8fafc|japan,sport
Toyota Supra A80|B|320|12|JP|#111827|japan,sport
Nissan Skyline GT-R R34|A|280|18|JP|#2563eb|japan,sport
Nissan Silvia S15|B|250|6.5|JP|#f8fafc|japan,sport
Mazda RX-7 FD|B|280|8.5|JP|#164e63|japan,sport
Honda Civic Type R EK9|C|185|4.2|JP|#d1d5db|japan,sport
Subaru Impreza WRX STI GDB|B|280|5.5|JP|#2563eb|japan,sport
Mitsubishi Lancer Evolution IX|B|280|6.0|JP|#dc2626|japan,sport
Lexus LS 400|C|250|2.0|JP|#14532d|japan
Nissan 350Z|C|313|3.8|JP|#e5e7eb|japan,sport
Ford Mustang 1967|B|271|7.5|US|#14532d|usa,muscle
Chevrolet Camaro 1969|B|375|8.5|US|#eab308|usa,muscle
Dodge Charger 1970|B|425|9.5|US|#111827|usa,muscle
Chevrolet Corvette C3|B|300|6.5|US|#a5f3fc|usa,muscle,sport
Chevrolet Bel Air 1957|C|283|5.5|US|#b91c1c|usa
Ford F-150 Raptor|B|450|10|US|#475569|usa,suv
Dodge Viper|A|645|22|US|#dc2626|usa,sport
Tesla Model S|C|670|12|US|#f8fafc|usa
Hummer H2|C|325|4|US|#e5e7eb|usa,suv
Cadillac Eldorado 1959|C|345|6.5|US|#fbcfe8|usa
Land Rover Defender|B|300|12|GB|#c2410c|offroad,suv
Range Rover Classic|B|200|8|GB|#14532d|offroad,suv
Toyota Land Cruiser 80|B|215|7.5|JP|#d1d5db|offroad,suv
Jeep Wrangler|B|285|9|US|#f8fafc|offroad,suv
Mercedes-Benz G-Class|A|585|35|DE|#4b5563|offroad,suv
Suzuki Jimny|C|102|3|JP|#a3e635|offroad,suv
Nissan Patrol Y60|B|190|6|JP|#d1d5db|offroad,suv
Mitsubishi Pajero|B|250|5.5|JP|#cbd5e1|offroad,suv
УАЗ Patriot|C|150|3.5|RU|#111827|offroad,suv
Lada Niva Travel|C|106|2.8|RU|#3f6212|offroad,suv
Ferrari F40|A|478|45|IT|#dc2626|sport
Lamborghini Countach|A|455|38|IT|#f8fafc|sport
Porsche 911 GT3 RS|A|525|32|DE|#f8fafc|sport
McLaren F1|S|627|90|GB|#d1d5db|sport
Nissan GT-R R35|B|570|18|JP|#f8fafc|sport
Audi R8|A|620|24|DE|#2563eb|sport
BMW M4|B|510|12|DE|#d1d5db|sport
Chevrolet Corvette C8|A|495|16|US|#dc2626|sport
Ford GT|A|660|42|US|#dc2626|sport
Aston Martin Vantage|B|510|15|GB|#a3e635|sport
Rolls-Royce Phantom|S|571|110|GB|#e5e7eb|lux
Bentley Continental GT|A|650|45|GB|#475569|lux
Mercedes-Maybach S-Class|A|510|38|DE|#f8fafc|lux
Aurus Senat|S|598|140|RU|#111827|lux
Maserati Quattroporte|A|580|28|IT|#111827|lux
Jaguar XJ|A|550|18|GB|#111827|lux
Lexus LS 500|B|421|14|JP|#6b7280|lux
BMW 760Li|B|610|22|DE|#4b5563|lux
Audi A8 L|B|460|16|DE|#4b5563|lux
Bentley Flying Spur|A|635|42|GB|#111827|lux
Bugatti Veyron|A|1001|90|FR|#e5e7eb|legend
Bugatti Chiron|S|1500|180|FR|#0ea5e9|legend
Ferrari LaFerrari|S|963|220|IT|#dc2626|legend
Ferrari Enzo|A|660|100|IT|#dc2626|legend
Lamborghini Aventador SVJ|S|770|130|IT|#f8fafc|legend
McLaren P1|S|916|150|GB|#eab308|legend
Porsche 918 Spyder|S|887|140|DE|#eab308|legend
Koenigsegg Agera RS|S|1160|190|SE|#111827|legend
Pagani Huayra|S|789|160|IT|#d1d5db|legend
Mercedes-AMG ONE|S|1063|250|DE|#d1d5db|legend`.split('\n').map(s=>{const[n,r,hp,p,cc,col,tg]=s.split('|');return{n,r,hp:+hp,p:p*1e6,cc,col,tg:tg.split(',')}});
const CASES=[
{n:'Бомж',e:'🗑️',c:1e5,t:'bomj',w:{D:85,C:13,B:2},col:'#8a93a8',d:'Первый автопарк без лишних понтов'},
{n:'Чекушка',e:'🍾',c:2.5e5,t:'chek',w:{D:45,C:45,B:10},col:'#a3e635',d:'Народные седаны и хэтчбеки'},
{n:'СССР',e:'⭐',c:5e5,t:'ussr',w:{D:30,C:50,B:20},col:'#ef4444',d:'Раритетная классика Советского Союза'},
{n:'Немцы',e:'🛠️',c:1e6,t:'german',w:{C:25,B:55,A:20},col:'#94a3b8',d:'Немецкая школа: от Golf до Porsche'},
{n:'Японцы',e:'🗾',c:2e6,t:'japan',w:{C:25,B:55,A:20},col:'#f472b6',d:'JDM, дрифт и легендарные купе'},
{n:'Американцы',e:'🦅',c:3.5e6,t:'usa',w:{C:25,B:50,A:25},col:'#f97316',d:'Маслкары, масштаб и американский характер'},
{n:'Внедорожники',e:'🏔️',c:5e6,t:'offroad',w:{C:25,B:55,A:20},col:'#84cc16',d:'Полный привод и тяжёлая техника'},
{n:'Спорт',e:'🏁',c:8e6,t:'sport',w:{B:25,A:60,S:15},col:'#3b82f6',d:'Скоростные купе и гоночные иконы'},
{n:'Люкс',e:'💎',c:12e6,t:'lux',w:{B:25,A:55,S:20},col:'#22d3ee',d:'Представительские седаны и люксовые купе'},
{n:'Легендарный',e:'👑',c:20e6,t:'legend',w:{A:20,S:80},col:'#fbbf24',d:'Гиперкары, которые меняли историю'}];

const poolFor=k=>CARS.map((_,i)=>i).filter(i=>CARS[i].tg.includes(k.t));
const caseW=k=>{const have=new Set(poolFor(k).map(i=>CARS[i].r)),w={};for(const r in k.w)if(have.has(r))w[r]=k.w[r];return w};
const roll=k=>{const r=pick(caseW(k)),p=poolFor(k).filter(i=>CARS[i].r===r);return p[Math.floor(R()*p.length)]};
const DIFF=[['Лёгкая',2],['Средняя',2.25],['Сложная',2.5]]; // название, во сколько раз приз больше взноса (взнос выбираешь сам)
const TASKS=[['race','Выиграй гонку',1,170e3],['case','Открой 2 кейса',2,100e3],['sell','Продай машину',1,68e3]];
const SLOTS=10,MAXSLOTS=40,CAP_H=4,INC=.035,SELL=.18,FUEL_MAX=15,FUEL_SEC=120; // SLOTS = мест в начале, MAXSLOTS = максимум; доход INC = доля цены машины в час
// ===============================================================================================
const fmt=n=>{n=Math.round(n);return n>=1e6?(+(n/1e6).toFixed(n>=1e7?0:1)+'').replace('.',',')+' млн ₽':n.toLocaleString('ru-RU')+' ₽'};
const byPrice=(a,b)=>CARS[b.i].p-CARS[a.i].p||partCount(b)-partCount(a)||a.id-b.id,sorted=()=>S.cars.slice().sort(byPrice),slots=()=>S.slots||SLOTS,slotCost=()=>Math.round(3e6*Math.pow(1.4,slots()-SLOTS)/1e5)*1e5; // 1-е место 3 млн, каждое следующее в 1,4 раза дороже
const need=l=>85+25*l,pick=w=>{let r=R()*Object.values(w).reduce((a,b)=>a+b,0),k;for(k in w)if((r-=w[k])<0)return k;return k};
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch{}
S=S||{m:1.5e6,cars:[],own:[],parts:Array(8).fill(0),acc:0,at:0,xp:0,lv:1,fuel:FUEL_MAX,ft:Date.now(),day:'',tk:{},id:1};
S.parts=Array.isArray(S.parts)?S.parts:Array(8).fill(0);try{localStorage.removeItem('tdrop1')}catch{}
let tab='garage',cs=0,cn=1,df=0,busy=false;
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
const cntry=()=>{const c={};S.cars.forEach(o=>c[CARS[o.i].cc]=(c[CARS[o.i].cc]||0)+1);return c};
const carInc=(o,c)=>CARS[o.i].p*INC*(1+.04*partCount(o)+(partCount(o)===8?.18:0))*(c[CARS[o.i].cc]>=3?1.1:1); // детали и полный комплект усиливают доход
function rate(){const c=cntry();return S.cars.reduce((a,o)=>a+carInc(o,c),0)}
function gainXp(n){S.xp+=n;while(S.xp>=need(S.lv)){S.xp-=need(S.lv);S.lv++;S.m+=1e5*S.lv;toast('Уровень '+S.lv+'! Бонус '+fmt(1e5*S.lv))}}
function task(k,n=1){const d=new Date().toDateString();if(S.day!==d){S.day=d;S.tk={}}const t=TASKS.find(x=>x[0]===k),was=S.tk[k]||0;S.tk[k]=Math.min(t[2],was+n);if(was<t[2]&&S.tk[k]>=t[2]){S.m+=t[3];gainXp(40);toast('Задание выполнено: +'+fmt(t[3]))}}
const V={
garage(){const r=rate(),cnt={};S.cars.forEach(o=>cnt[CARS[o.i].cc]=(cnt[CARS[o.i].cc]||0)+1);const b=Object.keys(cnt).filter(k=>cnt[k]>=3).map(k=>`<span class="chip2">${FL[k]} +10%</span>`).join('');
return `<div class="card"><div class="r"><span>Доход гаража</span><span>${fmt(r)} / ч</span></div><div class="big" id="acc"></div><div class="bar"><i id="accb"></i></div><button class="blue" data-a="claim">Забрать</button><p class="mute">Копится до ${CAP_H} ч, потом останавливается</p><p class="mute">${b}${b?'<br>':''}3+ машины одной страны: +10% к их доходу</p></div><div class="sec"><span>МАШИНЫ ${S.cars.length}/${slots()}</span>${slots()>=MAXSLOTS?'<span>максимум мест</span>':`<button class="buy ${S.m>=slotCost()?'':'off'}" data-a="slot">➕ Купить место · ${fmt(slotCost())}</button>`}</div>${S.cars.length>=slots()?'<p class="full">Гараж заполнен. Продайте машину или купите место.</p>':''}${S.cars.length?`<div class="grid">${sorted().map(gcard).join('')}</div>`:'<p class="mute">Гараж пуст. Откройте первый кейс!</p>'}`},
cases(){const k=CASES[cs],tot=k.c*cn,sh=tot-S.m,free=slots()-S.cars.length,full=free<cn,w=caseW(k),sum=Object.values(w).reduce((a,b)=>a+b,0);return `<div class="cs">${CASES.map((c,i)=>`<button class="ct ${i===cs?'on':''}" data-a="cs" data-i="${i}" style="--cc:${c.col}"><span>${c.e}</span><b>${c.n}</b><small>${fmt(c.c)}</small></button>`).join('')}</div><div class="mys" style="--cc:${k.col}">${car({col:'#222'})}<span>?</span></div><h2 class="ctt">${k.n}</h2><p class="mute" style="margin:0 0 10px">${k.d} · ${poolFor(k).length} машин</p><div class="chances">${Object.entries(w).map(([r,v])=>rb(r)+' '+Math.round(v/sum*100)+'%').join(' ')}</div><div class="seg">${[1,3,5].map(n=>`<button class="${n===cn?'on':''}" data-a="cn" data-i="${n}">×${n}</button>`).join('')}</div><button class="blue" data-a="open" ${sh>0||full?'disabled':''}>${full?(free<=0?'Гараж заполнен':'Мало места в гараже'):'Открыть ×'+cn+' · '+fmt(tot)}</button>${full?`<p class="full">${free<=0?'Гараж заполнен.':'Свободно мест: '+free+', нужно: '+cn+'.'} Продайте машину или купите место.</p><button class="buy ${S.m>=slotCost()?'':'off'}" data-a="slot" style="display:block;margin:10px auto 0">➕ Купить место · ${fmt(slotCost())}</button>`:`<p class="mute">${sh>0?'Не хватает '+fmt(sh):'Свободных мест в гараже: '+free+' из '+slots()}</p>`}`},
raceV(){return `<button class="back" data-g="hub">‹ Игры</button><div class="card"><p class="mute" style="margin:0">Нажми СТАРТ, дождись зелёного и жми ГАЗ. Фальстарт = проигрыш. Взнос списывается на старте. Приз = взнос × множитель сложности. Реакция быстрее 0,2 с даёт +20% к призу.</p></div><div class="dif">${DIFF.map((d,i)=>`<button class="${i===df?'on':''}" data-a="df" data-i="${i}"><span>${d[0]}<br><small>приз ×${String(d[1]).replace('.',',')}</small></span><span data-pz="${d[1]}">${fmt(stk*d[1])}</span></button>`).join('')}</div><div class="card" style="margin-top:12px">${stakeH()}<button class="blue" data-a="go" data-sl="🏁 Старт · взнос " style="margin-top:14px" ${!S.cars.length?'disabled':''}>🏁 Старт · взнос ${fmt(stk)}</button></div>`},
menu(){const d=new Date().toDateString();if(S.day!==d){S.day=d;S.tk={}}return `<div class="ban"><div class="r"><b>Уровень ${S.lv}</b><span>${S.xp}/${need(S.lv)}</span></div><div class="bar"><i style="width:${S.xp/need(S.lv)*100}%;background:#fff"></i></div><small>На ${S.lv+1} уровне: +${fmt(1e5*(S.lv+1))}</small></div><p class="mute" id="dg" style="margin:10px 0 0"></p><div class="sec"><span>ЗАДАНИЯ НА СЕГОДНЯ</span></div>${TASKS.map(t=>{const v=S.tk[t[0]]||0;return `<div class="task ${v>=t[2]?'ok':''}"><div>${t[1]}<small>+${fmt(t[3])} · +40 опыта</small></div><span>${v>=t[2]?'Получено ✓':v+'/'+t[2]}</span></div>`}).join('')}<div class="sec"><span>КОЛЛЕКЦИЯ ${S.own.length}/${CARS.length}</span></div><div class="grid">${[...CARS.keys()].sort((a,b)=>CARS[b].p-CARS[a].p).map(i=>{const c=CARS[i];return S.own.includes(i)?mini(c):`<div class="cc lock">${rb(c.r)}${car({col:'#fff'})}<h3>???</h3><p>Ещё не открыта</p></div>`}).join('')}</div>`}};
// ===== Детали вместо прокачки =====
const PARTS=[['⚙️','Двигатель'],['🌀','Турбина'],['🕹️','КПП'],['💨','Выхлоп'],['🔩','Подвеска'],['🛞','Диски и шины'],['🛑','Тормоза'],['🛡️','Обвес']];
const partCount=o=>o&&Array.isArray(o.parts)?o.parts.filter(Boolean).length:0;
const eff=o=>CARS[o.i].hp*(1+.06*partCount(o)+(partCount(o)===8?.12:0)),car2=o=>({...CARS[o.i],i:o.i,hp:Math.round(eff(o))}),selCar=()=>S.cars.find(o=>o.id===S.sel)||sorted()[0];
const gcard=o=>mini(car2(o),`<p>Детали ${partCount(o)}/8 · доход ${fmt(carInc(o,cntry()))}/ч</p><div class="two"><button class="sm" data-a="parts" data-i="${o.id}">🔧 Детали</button><button class="sm" data-a="sell" data-i="${o.id}">Продать</button></div>`);
const partsH=o=>`<div class="ovc parts"><h2 class="ctt">🔧 Детали</h2><p class="mute">${CARS[o.i].n} · ${partCount(o)}/8</p><div class="pgrid">${PARTS.map((p,j)=>{const on=!!(o.parts&&o.parts[j]),n=S.parts[j]||0;return `<button class="part ${on?'inst':''}" data-a="install" data-i="${o.id}" data-p="${j}" ${on||!n?'disabled':''}><span>${p[0]}</span><b>${p[1]}</b><small>${on?'Установлено':n?'На складе: '+n:'Нет на складе'}</small></button>`}).join('')}</div><p class="mute">Каждая деталь: +6% мощности и +4% дохода.<br>Полный комплект: ещё +12% мощности и +18% дохода.<br>Детали выпадают из любых кейсов.</p><button class="blue" style="max-width:360px;margin-top:14px" data-a="closeov">Готово</button></div>`;
// ===== Игры =====
let gm=null,wc=33,ws=1,wbusy=false,stk=1e6;const WS=[1e5,1e6,1e7,1e8],WS_LIMIT=[1e5,2.5e5,5e5,1e6,2.5e6,5e6],MAX_STAKE=5e6;
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
const edgeOf=o=>o?Math.max(.02,.06-eff(o)/40000):.06;
const arcD=p=>{const th=Math.min(p,.995)*Math.PI,pt=a=>[100+80*Math.cos(a),100+80*Math.sin(a)],[x1,y1]=pt(Math.PI/2-th),[x2,y2]=pt(Math.PI/2+th);return `M${x1.toFixed(2)} ${y1.toFixed(2)}A80 80 0 ${th>Math.PI/2?1:0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`};
const pickerH=()=>{if(!S.cars.length)return '<div class="card"><p class="mute" style="margin:0">У вас нет машин. Откройте кейс, чтобы начать играть.</p></div>';const o=selCar(),pc=partCount(o);
return `<div class="sec"><span>ВАША МАШИНА</span><span>${Math.round(eff(o))} л.с.</span></div><div class="cs">${sorted().map(x=>{const d=car2(x);return `<button class="pk ${x.id===o.id?'on':''}" data-a="pick" data-i="${x.id}" style="--rc:${RC[d.r]}">${art(d)}<b>${d.n}</b><small>детали ${partCount(x)}/8 · ${d.hp} л.с.</small></button>`}).join('')}</div><button class="up" data-a="parts" data-i="${o.id}">🔧 Установить детали · ${pc}/8<small>+6% мощности и +4% дохода за каждую; бонус за полный комплект</small></button>`};
const wheelH=()=>`<button class="back" data-g="hub">‹ Игры</button><div class="card wcard"><svg id="dial" viewBox="0 0 200 200"><defs><linearGradient id="wg" gradientUnits="userSpaceOnUse" x1="20" y1="0" x2="180" y2="0"><stop offset="0" stop-color="#facc15"/><stop offset=".5" stop-color="#ef4444"/><stop offset="1" stop-color="#facc15"/></linearGradient><radialGradient id="wb"><stop offset="0" stop-color="#1c2230"/><stop offset="1" stop-color="#0a0d14"/></radialGradient></defs><circle cx="100" cy="100" r="97" fill="url(#wb)" stroke="#ffffff1c" stroke-width="2"/><circle cx="100" cy="100" r="80" fill="none" stroke="#1d2433" stroke-width="14"/><path id="warc" d="${arcD(wc/100)}" fill="none" stroke="url(#wg)" stroke-width="14" stroke-linecap="round"/><g fill="#8a93a8" font-size="9" font-weight="700" text-anchor="middle"><text x="100" y="17">100%</text><text x="21" y="103">50%</text><text x="179" y="103">50%</text><text x="100" y="192">0%</text></g><g id="needle" style="transform-box:view-box;transform-origin:100px 100px"><path d="M100 177 93.5 160H106.5Z" fill="#fff"/></g><text id="wpc" x="100" y="100" text-anchor="middle" font-size="27" font-weight="800" fill="#a3e635"></text><text id="wlb" x="100" y="120" text-anchor="middle" font-size="10" font-weight="700" fill="#8a93a8"></text></svg>
<div class="r" style="margin-top:6px"><span>Шанс выигрыша</span><span id="wm"></span></div><input id="wc" type="range" min="5" max="90" value="${wc}">${stakeH()}<div class="r"><span>Выигрыш при победе</span><b id="wp" style="color:#fff"></b></div><div class="r" style="margin-top:4px"><span>Комиссия (меньше у мощных машин)</span><span id="we"></span></div><button class="blue" id="spin" data-a="wspin" data-sl="🎯 Крутить · взнос " style="margin-top:14px">🎯 Крутить · взнос ${fmt(stk)}</button><p class="mute" id="wres"></p></div>`;
function wUpd(){const a=$('#warc');if(!a)return;const p=wc/100,m=(1-edgeOf(selCar()))/p;a.setAttribute('d',arcD(p));$('#wpc').textContent=wc+'%';$('#wlb').textContent=wc<30?'низкий шанс':wc<60?'средний шанс':'высокий шанс';$('#wm').textContent='×'+m.toFixed(2);$('#wp').textContent=fmt(stk*m);$('#we').textContent=Math.round(edgeOf(selCar())*1000)/10+'%'}
function spin(){if(wbusy)return;const o=selCar();if(!o)return toast('Сначала получите машину в кейсе');const st=stk;if(!okStake())return;
const p=wc/100,m=(1-edgeOf(o))/p,win=R()<p,th=p*180;S.m-=st;upd();wbusy=true;$('#spin').disabled=true;$('#wres').textContent='';let f=win?(R()*2-1)*th*.9:th*1.04+R()*(360-2*th*1.04);if(f<0)f+=360;
const nd=$('#needle');nd.style.transition='none';nd.style.transform='rotate(0deg)';void nd.getBoundingClientRect();nd.style.transition='transform 4.6s cubic-bezier(.1,.6,.1,1)';nd.style.transform=`rotate(${1800+f}deg)`;const tk=setInterval(buzz,160);
setTimeout(()=>{clearInterval(tk);wbusy=false;if(win)S.m+=st*m;gainXp(win?20:5);save();upd();const r=$('#wres'),b=$('#spin');if(r){r.textContent=win?'Победа! +'+fmt(st*m-st):'Не повезло: −'+fmt(st);r.style.color=win?'#34d399':'#f87171';r.style.fontSize='18px'}if(b)b.disabled=false;toast(win?'+'+fmt(st*m):'Не повезло')},4800)}
V.games=()=>{if(gm==='pit')return pickerH()+pitView();if(gm==='auction')return pickerH()+aucView();if(gm==='rally')return pickerH()+rallyView();if(gm==='race')return pickerH()+V.raceV();if(gm==='wheel')return pickerH()+wheelH();
return pickerH()+`<div class="sec"><span>ИГРЫ</span></div><div class="gl"><button class="gc" data-g="race"><span>🏁</span><b>Гонка</b><small>Старт против робота · приз ×2–2,5</small></button><button class="gc" data-g="wheel"><span>🎯</span><b>Колесо</b><small>Сам выбираешь шанс и множитель</small></button><button class="gc" data-g="pit"><span>⛽</span><b>Пит-стоп</b><small>Останови ползунок в зелёной зоне</small></button><button class="gc" data-g="auction"><span>🔨</span><b>Аукцион</b><small>Угадай: дороже или дешевле</small></button><button class="gc" data-g="rally"><span>🚧</span><b>Ралли</b><small>Объезжай препятствия</small></button></div><div class="sec"><span>ПРОМОКОД</span></div><div class="card promo"><input id="pc" placeholder="Введите промокод" autocomplete="off" autocapitalize="characters" spellcheck="false"><button class="blue" data-a="promo">Активировать</button><p class="mute" id="pm" style="min-height:18px"></p></div>`};
// ===== Общее для новых игр =====
const okStake=()=>{if(!(stk>=1000)){toast('Минимальный взнос 1 000 ₽');return false}if(gm!=='wheel'&&stk>MAX_STAKE){toast('Максимальный взнос здесь 5 млн ₽');return false}if(stk>S.m){toast('Не хватает на взнос');return false}return true};
const refreshSl=()=>{document.querySelectorAll('[data-sl]').forEach(e=>{if(e.dataset.sl)e.textContent=e.dataset.sl+fmt(stk)});document.querySelectorAll('[data-pz]').forEach(e=>e.textContent=fmt(stk*e.dataset.pz));document.querySelectorAll('.chips2 [data-a="wst"]').forEach(e=>e.classList.toggle('on',+e.dataset.i===stk))};
const stakeH=()=>gm==='wheel'?`<div class="r" style="margin-top:12px"><span>Ваш взнос</span><span id="stkf">${fmt(stk)}</span></div><div class="stk"><input id="stk" inputmode="numeric" autocomplete="off" value="${stk}" aria-label="Сумма взноса"><span>₽</span></div><div class="chips2">${WS.map(v=>`<button class="${v===stk?'on':''}" data-a="wst" data-i="${v}">${fmt(v)}</button>`).join('')}<button data-a="sh">½ баланса</button><button data-a="smax">Весь баланс</button></div>`:`<div class="r" style="margin-top:12px"><span>Ваш взнос</span><span id="stkf">${fmt(stk)}</span></div><div class="chips2">${WS_LIMIT.map(v=>`<button class="${v===stk?'on':''}" data-a="wst" data-i="${v}">${fmt(v)}</button>`).join('')}</div><p class="mute">Максимум 5 млн ₽</p>`;
const lvOf=()=>{const o=selCar();return o?partCount(o):0};
// ===== Пит-стоп =====
const PIT_PAY=[0,.3,.8,1.6,3.2];let pit=null;
const pitX=()=>.5+.5*Math.sin((performance.now()-pit.t0)/1000*pit.sp-Math.PI/2);
function pitRound(){const o=selCar();pit.zw=.065+Math.min(.05,eff(o)/25000);pit.zc=pit.zw/2+.08+R()*(.84-pit.zw);pit.sp=3.1+pit.n*.9;pit.t0=performance.now();pit.on=true;
const z=$('#pz');if(z){z.style.left=(pit.zc-pit.zw/2)*100+'%';z.style.width=pit.zw*100+'%'}const pi=$('#pi');if(pi)pi.textContent='Колесо '+(pit.n+1)+' из 4';const b=$('#pbtn');if(b){b.disabled=false}
const lp=()=>{const m=$('#pm');if(!pit||!pit.on||!m)return;m.style.left=pitX()*100+'%';requestAnimationFrame(lp)};lp()}
function pitStart(){if(!selCar())return toast('Сначала получите машину в кейсе');const fee=stk;if(!okStake())return;S.m-=fee;save();upd();pit={n:0,hits:0,fee,on:false,res:'',done:false};draw();pitRound()}
function pitTap(){if(!pit||!pit.on)return;pit.on=false;const hit=Math.abs(pitX()-pit.zc)<=pit.zw/2;pit.n++;if(hit)pit.hits++;buzz();$('#ph').textContent='Попаданий: '+pit.hits+' из '+pit.n;$('#pbtn').disabled=true;
const rs=$('#pres');rs.textContent=hit?'✅ Точно!':'❌ Мимо';rs.style.color=hit?'#34d399':'#f87171';
if(pit.n<4)setTimeout(()=>{if(pit&&!pit.done&&$('#pm')){rs.textContent='';pitRound()}},650);
else{const pay=pit.fee*PIT_PAY[pit.hits];S.m+=pay;gainXp(pit.hits>1?20:5);save();upd();pit.res=`Итог: ${pit.hits} из 4 · ${pay?'выплата '+fmt(pay):'без выплаты'}`;setTimeout(()=>{if(pit){pit.done=true;draw()}},700)}}
const pitView=()=>{const st=stk,d=pit&&pit.done,run=pit&&!pit.done;return `<button class="back" data-g="hub">‹ Игры</button><div class="card" style="text-align:center"><b style="font-size:20px">⛽ Пит-стоп</b><p class="mute">Меняй 4 колеса: жми СТОП, когда ползунок в зелёной зоне. Зона узкая, ползунок быстрый и ускоряется с каждым колесом. Чем мощнее машина, тем зона чуть шире. Выплаты: 1 колесо ×0,3 · 2 ×0,8 · 3 ×1,6 · 4 ×3,2</p><div class="pit"><i id="pz"></i><i id="pm"></i></div><div class="r" style="margin-top:8px"><span id="pi">${run?'':'Колесо: —'}</span><span id="ph">${pit?'Попаданий: '+pit.hits+' из '+pit.n:''}</span></div>${run?'':stakeH()}<button class="blue" id="pbtn" data-a="${run?'ptap':'pstart'}" style="margin-top:12px" data-sl="${run?'':(d?'Ещё раз':'Начать')+' · взнос '}" ${run?'disabled':''}>${run?'СТОП':(d?'Ещё раз':'Начать')+' · взнос '+fmt(st)}</button><p class="mute" id="pres" style="font-size:16px;color:#fff">${d?pit.res:''}</p></div>`};
// ===== Аукцион =====
let au=null;const auMult=()=>1.45+.025*lvOf();
const auNew=()=>{const i=Math.floor(R()*CARS.length),p=CARS[i].p,f=R()<.5?.55+R()*.25:1.25+R()*.55;au.i=i;au.price=p;au.shown=Math.max(1e4,Math.round(p*f/1e4)*1e4);au.res=null};
function aucStart(){if(!selCar())return toast('Сначала получите машину в кейсе');const fee=stk;if(!okStake())return;S.m-=fee;save();upd();au={fee,pot:fee,round:1,done:false};auNew();draw()}
function aucCash(){if(!au||au.done)return;const w=au.pot;S.m+=w;au.done=true;au.res='cash';gainXp(15);save();upd();draw();toast('Забрано '+fmt(w))}
function aucAns(hi){if(!au||au.res!==null||au.done)return;buzz();if(hi===(au.price>au.shown)){au.pot*=auMult();au.res='win';if(au.round>=5)return aucCash()}else{au.res='lose';au.pot=0;au.done=true;gainXp(5)}draw()}
const aucNext=()=>{if(!au||au.res!=='win')return;au.round++;auNew();draw()};
function aucView(){const st=stk;let h=`<button class="back" data-g="hub">‹ Игры</button><div class="card" style="text-align:center"><b style="font-size:20px">🔨 Аукцион</b>`;
if(!au)return h+`<p class="mute">Показывают машину и стартовую ставку. Угадай: настоящая цена выше или ниже? Каждый верный ответ умножает банк на ×${auMult().toFixed(2)} (+0,025 за каждую деталь машины). Забрать можно после любого верного ответа, ошибка сжигает банк. Максимум 5 раундов.</p>${stakeH()}<button class="blue" data-a="astart" data-sl="Начать · взнос ">Начать · взнос ${fmt(st)}</button></div>`;
const c=CARS[au.i];h+=`<div class="r" style="margin-top:10px"><span>Раунд ${au.round} из 5</span><b style="color:#fff">Банк ${fmt(au.pot)}</b></div><div class="cc" style="border-color:${RC[c.r]}66;margin:12px 0;text-align:left">${rb(c.r)}${art(c)}<h3>${c.n}</h3><p>${FL[c.cc]||''} ${c.hp} л.с.</p></div><p style="font-size:18px;margin:6px 0">Ставка: <b>${fmt(au.shown)}</b></p>`;
if(au.res===null)return h+`<div class="two" style="gap:10px;margin-top:10px"><button class="blue" data-a="ahi">▲ Дороже</button><button class="blue" data-a="alo" style="background:linear-gradient(135deg,#f97316,#c2410c);box-shadow:0 8px 26px #c2410c55">▼ Дешевле</button></div></div>`;
h+=`<p style="font-size:18px">Настоящая цена: <b>${fmt(au.price)}</b></p>`;
if(au.res==='win')return h+`<p style="color:#34d399;font-weight:800">Верно! Банк ×${auMult().toFixed(2)}</p><div class="two" style="gap:10px"><button class="blue" data-a="anext">Дальше</button><button class="blue" style="background:var(--card2);box-shadow:none" data-a="acash">Забрать ${fmt(au.pot)}</button></div></div>`;
return h+`<p style="color:${au.res==='cash'?'#34d399':'#f87171'};font-weight:800">${au.res==='cash'?'Забрали '+fmt(au.pot):'Неверно. Банк сгорел'}</p><button class="blue" data-a="areset">Играть снова</button></div>`}
// ===== Ралли =====
const RT=30;
const rallyView=()=>`<button class="back" data-g="hub">‹ Игры</button><div class="card" style="text-align:center"><b style="font-size:20px">🚧 Ралли</b><p class="mute">Уворачивайся от камней ${RT} секунд: тап слева или справа, либо кнопки ◀ ▶. Выплата растёт со временем: 8 с ×0 · выплата растёт постепенно · финиш ×1,5. Мощная машина чуть замедляет камни.</p>${stakeH()}<button class="blue" data-a="rstart" data-sl="🚧 Старт · взнос ">🚧 Старт · взнос ${fmt(stk)}</button></div>`;
function rally(){const o=selCar();if(!o)return toast('Сначала получите машину в кейсе');const fee=stk;if(!okStake())return;S.m-=fee;save();upd();const c=car2(o),el=$('#race');
el.className='on';el.innerHTML=`<div class="rt"><button id="rx" data-a="closerace" style="display:none" aria-label="Закрыть">‹</button><div id="cd" class="t">Ралли</div><div id="cds">Уворачивайся от камней ${RT} секунд</div></div><canvas id="cv" width="300" height="420"></canvas><div class="bot rb2"><button class="blue" id="lf">◀</button><button class="blue" id="rg">▶</button></div>`;
const cv=$('#cv'),g=cv.getContext('2d');let lane=1,px=150,t=0,last=performance.now(),spawn=.6,ob=[],over=false,raf;
const rr=(x,y,w,h,r)=>{g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()};
const mv=d=>{if(!over){lane=Math.max(0,Math.min(2,lane+d));buzz()}};
$('#lf').onpointerdown=e=>{e.preventDefault();mv(-1)};$('#rg').onpointerdown=e=>{e.preventDefault();mv(1)};
cv.onpointerdown=e=>{const r=cv.getBoundingClientRect();mv(e.clientX<r.left+r.width/2?-1:1)};
const kd=e=>{if(e.key==='ArrowLeft')mv(-1);if(e.key==='ArrowRight')mv(1)};document.addEventListener('keydown',kd);const k=1-Math.min(.2,c.hp/8000);
const finish=()=>{over=true;cancelAnimationFrame(raf);document.removeEventListener('keydown',kd);const mult=t>=RT?1.5:t>8?(t-8)/(RT-8)*1.5:0,pay=fee*mult;S.m+=pay;gainXp(pay>=fee?25:5);save();upd();
$('#cd').className=pay>=fee?'w':'l';$('#cd').textContent=t>=RT?'Финиш!':'Авария';$('#cds').textContent=`Проехал ${Math.min(t,RT).toFixed(1)} с · ×${mult.toFixed(2)} · ${pay?'выплата '+fmt(pay):'без выплаты'}`;$('#rx').style.display='block';document.querySelector('.rb2').innerHTML='<button class="blue" data-a="closerace">Закрыть</button>'};
const loop=n=>{const dt=Math.min(.05,(n-last)/1000);last=n;t+=dt;const v=(230+t*13)*k;px+=((lane*100+50)-px)*Math.min(1,dt*14);
spawn-=dt;if(spawn<=0){spawn=Math.max(.28,.88-t*.021);const a=Math.floor(R()*3);ob.push({x:a*100+50,y:-30});if(t>5&&R()<.45)ob.push({x:((a+1+Math.floor(R()*2))%3)*100+50,y:-30})}
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
const VERSION='5.0',ERRS=[];window.addEventListener('error',e=>ERRS.push(e.message));
function diag(){const el=$('#dg');if(!el)return;const n=typeof CAR_IMG!=='undefined'?CAR_IMG.length:0;el.innerHTML=`Версия ${VERSION} · картинки машин: ${n>=100?'✅ все '+n:'❌ загружено '+n+' из 100 (проверь, что файл images.js лежит в корне репозитория)'}${ERRS.length?' · ошибки: '+ERRS.join('; '):''}`}
const TT={garage:'Гараж',cases:'Кейсы',games:'Игры',menu:'Меню'};
function upd(){$('#mo').textContent=fmt(S.m);$('#lv').textContent=S.lv;const a=$('#acc');if(a){const cap=rate()*CAP_H;a.textContent=fmt(S.acc);$('#accb').style.width=(cap?S.acc/cap*100:0)+'%'}const f=$('#fu');if(f)f.textContent=S.fuel+'/'+FUEL_MAX}
function draw(){$('#ttl').textContent=TT[tab];document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===tab));$('#main').innerHTML=V[tab]();upd();if(tab==='games'&&gm==='wheel')wUpd();if(tab==='menu')diag()}
const RN={D:'Обычная',C:'Необычная',B:'Редкая',A:'Эпическая',S:'Легендарная'},RK='DCBAS';
function openCase(){const k=CASES[cs],tot=k.c*cn;if(S.m<tot||busy)return;if(S.cars.length+cn>slots()){toast('Гараж заполнен');return}busy=true;S.m-=tot;const got=[],partsGot=[];let kept=0,sold=0;
for(let j=0;j<cn;j++){const pi=Math.floor(R()*PARTS.length);S.parts[pi]=(S.parts[pi]||0)+1;partsGot.push(pi);if(R()<.2){const qi=Math.floor(R()*PARTS.length);S.parts[qi]=(S.parts[qi]||0)+1;partsGot.push(qi)}const i=roll(k);got.push(i);if(!S.own.includes(i))S.own.push(i);if(S.cars.length<slots()){S.cars.push({id:S.id++,i});kept++}else{S.m+=CARS[i].p*SELL;sold++}}
got.sort((a,b)=>RK.indexOf(CARS[b].r)-RK.indexOf(CARS[a].r)||CARS[b].p-CARS[a].p);
gainXp(15*cn);task('case',cn);save();draw();const o=$('#ov'),pl=poolFor(k),W=34,best=got[0],info=`${kept?'В гараж: '+kept+'. ':''}${sold?'Гараж полон, продано: '+sold:''}`;
const partInfo='Детали на склад: +'+partsGot.length+'.',info2=info+' '+partInfo;const strip=Array.from({length:42},(_,j)=>j===W?best:pl[Math.floor(R()*pl.length)]);
o.className='on';o.innerHTML=`<div class="ovc"><div class="reelw"><div class="reel" id="reel">${strip.map(i=>{const c=CARS[i];return `<div class="rcd" style="--rc:${RC[c.r]}">${art(c)}<small>${c.n}</small></div>`}).join('')}</div><i class="mk"></i></div><p class="mute" id="rl">Открываем «${k.n}»…</p></div>`;
const rl=$('#reel'),mid=o.clientWidth/2,x=-(W*160+75+(R()-.5)*90)+mid;rl.style.transform=`translateX(${mid}px)`;void rl.offsetWidth;rl.style.transition='transform 4s cubic-bezier(.08,.55,.1,1)';rl.style.transform=`translateX(${x}px)`;
const tk=setInterval(buzz,140);
setTimeout(()=>{clearInterval(tk);buzz();const c=CARS[best];
o.innerHTML=got.length===1?`<div class="ovc"><div class="stage" style="--rc:${RC[c.r]}"><div class="burst"></div><div class="pop">${art(c)}</div></div><div class="rbig">${rb(c.r)}<span style="color:${RC[c.r]}">${RN[c.r]}</span></div><h2 class="ctt">${c.n}</h2><p class="mute">${FL[c.cc]||''} ${c.hp} л.с. · ${fmt(c.p)}</p><p class="mute">${info2}</p><button class="blue" style="max-width:360px;margin-top:14px" data-a="closeov">Забрать</button></div>`
:`<div class="ovc"><h2 class="ctt">Выпало ×${got.length}</h2><div class="cen">${got.map((i,j)=>mini(CARS[i]).replace('style="',`style="animation-delay:${j*.13}s;`)).join('')}</div><p class="mute">${info2}</p><button class="blue" style="max-width:360px;margin-top:10px" data-a="closeov">Забрать</button></div>`;busy=false},4300)}
let rtm=[],rraf;
const gs=()=>(R()+R()+R()-1.5)*2,runT=hp=>Math.max(4.2,8-hp/380)+(R()-.5)*.12;
function race(){if(!S.cars.length)return toast('Сначала получите машину в кейсе');if(!okStake())return;
const so=selCar(),best={...CARS[so.i],i:so.i,hp:Math.round(eff(so))},tg=best.hp*[.8,.95,1.1][df],opp=CARS.slice().sort((a,b)=>Math.abs(a.hp-tg)-Math.abs(b.hp-tg))[Math.floor(R()*3)],fee=stk,rew=Math.round(stk*DIFF[df][1]),mean=[.34,.26,.2][df],sd=[.07,.05,.04][df],rfs=R()<[.1,.06,.04][df],el=$('#race');
el.className='on';el.innerHTML=`<div class="rt"><button id="rx" data-a="closerace" aria-label="Закрыть">‹</button><div class="lights"><i></i><i></i><i></i><i></i></div><div id="cd" class="t">Готов?</div><div id="cds">СТАРТ → считай 4-3-2-1 → жди зелёного → жми ГАЗ</div></div><div class="track"><div class="lane"><span>🤖 Робот · ${opp.n}</span><div class="trk"><div class="rc" id="oc">${art(opp)}</div><b class="fin"></b></div><small id="ort"></small></div><div class="lane"><span>Вы · ${best.n}</span><div class="trk"><div class="rc" id="pc">${art(best)}</div><b class="fin"></b></div><small id="prt"></small></div></div><div class="bot"><div id="sw">0.000</div><div id="sub">секундомер</div><div id="rtx"></div><button id="tap" class="blue">СТАРТ</button></div>`;
let st='idle',goT=0,pr=null,rr=0,rrun=0,prun=0;const L=[...el.querySelectorAll('.lights i')],cd=$('#cd'),sw=$('#sw'),tap=$('#tap'),T=(f,ms)=>rtm.push(setTimeout(f,ms)),clr=()=>{rtm.forEach(clearTimeout);rtm=[];cancelAnimationFrame(rraf)};
const end=(win,msg,sub)=>{if(st==='end')return;st='end';clr();let g=0;if(win){g=rew*(pr!==null&&pr<.2?1.2:1);S.m+=g;task('race')}gainXp(win?30:5);save();upd();cd.className=win?'w':'l';cd.textContent=msg;$('#cds').textContent=sub;$('#rtx').textContent=win?'Награда: '+fmt(g)+(pr!==null&&pr<.2?' (бонус за реакцию +20%)':''):'';tap.textContent='ЗАКРЫТЬ';tap.className='blue';tap.dataset.a='closerace';tap.disabled=true;setTimeout(()=>tap.disabled=false,900)};
const loop=n=>{const t=(n-goT)/1000,xo=Math.min(1,Math.max(0,(t-rr)/rrun)),xp=pr===null?0:Math.min(1,Math.max(0,(t-pr)/prun));$('#oc').style.left=xo*84+'%';$('#pc').style.left=xp*84+'%';if(pr===null)sw.textContent=t.toFixed(3);else if(xp<1)sw.textContent=t.toFixed(3);
 if(pr!==null&&xo>=1&&xp>=1){const tp=pr+prun,to=rr+rrun;sw.textContent=tp.toFixed(3);return end(tp<to,tp<to?'Победа!':'Проигрыш',`Вы: реакция ${pr.toFixed(3)} + заезд ${prun.toFixed(2)} = ${tp.toFixed(2)} с · Робот: ${to.toFixed(2)} с`)}rraf=requestAnimationFrame(loop)};
const go=()=>{st='go';L.forEach(l=>l.className='g');cd.className='g';cd.textContent='ГАЗ!';goT=performance.now();rr=Math.max(.12,mean+sd*gs());rrun=runT(opp.hp);rraf=requestAnimationFrame(loop);T(()=>{if(pr===null)end(false,'Слишком поздно','Вы не успели нажать ГАЗ')},1600)};
const start=()=>{if(S.m<fee)return toast('Не хватает на взнос');S.m-=fee;save();upd();st='cd';$('#rx').style.display='none';cd.className='';tap.textContent='ГАЗ!';tap.classList.add('red');$('#cds').textContent='Не жми раньше зелёного. Это фальстарт!';
[4,3,2,1].forEach((n,j)=>T(()=>{cd.textContent=n;L[j].className='r'},j*850+200));T(go,2750+700+R()*1000);
if(rfs)T(()=>end(true,'Фальстарт робота!','Соперник рванул раньше зелёного. Победа ваша'),1500+R()*1400)};
tap.onpointerdown=e=>{e.preventDefault();if(st==='idle')return start();
 if(st==='cd'){L.forEach(l=>l.className='r');return end(false,'ФАЛЬСТАРТ','Вы нажали до зелёного сигнала')}
 if(st==='go'&&pr===null){pr=(performance.now()-goT)/1000;prun=runT(best.hp);sw.textContent=pr.toFixed(3);$('#sub').textContent='время заезда, сек';$('#prt').textContent='реакция '+pr.toFixed(3);$('#ort').textContent='реакция '+rr.toFixed(3);buzz()}};
}
document.body.onclick=e=>{const b=e.target.closest('[data-a],[data-t],[data-g]');if(!b)return;if(b.dataset.g!==undefined){if(pit&&!pit.done)pit=null;gm=b.dataset.g==='hub'?null:b.dataset.g;if(gm&&gm!=='wheel'&&stk>MAX_STAKE)stk=MAX_STAKE;return draw()}if(b.dataset.t){if(pit&&!pit.done)pit=null;tab=b.dataset.t;scrollTo(0,0);return draw()}
const a=b.dataset.a,i=+b.dataset.i;buzz();
if(a==='claim'){if(S.acc<1)return toast('Пока нечего забирать');S.m+=S.acc;toast('+'+fmt(S.acc));S.acc=0}
else if(a==='sell'){const o=S.cars.find(x=>x.id===i);if(o&&confirm('Продать '+CARS[o.i].n+'? Установленные детали вернутся на склад.')){(o.parts||[]).forEach((v,j)=>{if(v)S.parts[j]=(S.parts[j]||0)+1});S.m+=CARS[o.i].p*SELL;S.cars=S.cars.filter(x=>x!==o);task('sell')}}
else if(a==='pick')S.sel=i;else if(a==='parts'){const o=S.cars.find(x=>x.id===i);if(!o)return;const ov=$('#ov');ov.className='on';ov.innerHTML=partsH(o);return}else if(a==='install'){const o=S.cars.find(x=>x.id===i),j=+b.dataset.p;if(!o||!S.parts[j])return toast('Детали нет на складе');o.parts=Array.isArray(o.parts)?o.parts:Array(8).fill(0);if(o.parts[j])return;S.parts[j]--;o.parts[j]=1;S.sel=o.id;save();$('#ov').innerHTML=partsH(o);toast(PARTS[j][1]+' установлена');return}else if(a==='wst'){if(pit&&!pit.done)return;stk=i}else if(a==='sh'){if(pit&&!pit.done)return;stk=Math.max(1000,Math.floor(S.m/2))}else if(a==='smax'){if(pit&&!pit.done)return;stk=Math.max(1000,Math.floor(S.m))}else if(a==='wspin')return spin();else if(a==='promo')return applyPromo();else if(a==='pstart')return pitStart();else if(a==='ptap')return pitTap();else if(a==='astart')return aucStart();else if(a==='ahi'||a==='alo')return aucAns(a==='ahi');else if(a==='anext')return aucNext();else if(a==='acash')return aucCash();else if(a==='areset'){au=null}else if(a==='rstart')return rally();else if(a==='slot'){const c=slotCost();if(slots()>=MAXSLOTS)return toast('Максимум мест в гараже');if(S.m<c)return toast('Не хватает '+fmt(c-S.m));S.m-=c;S.slots=slots()+1;toast('Куплено место: теперь их '+S.slots)}else if(a==='cs')cs=i;else if(a==='cn')cn=i;else if(a==='df')df=i;else if(a==='open')return openCase();else if(a==='go')return race();
else if(a==='closeov')$('#ov').className='';else if(a==='closerace')$('#race').className='';
save();draw()};
document.body.oninput=e=>{if(e.target.id==='wc'){wc=+e.target.value;wUpd()}if(e.target.id==='stk'){stk=parseInt(e.target.value.replace(/\D/g,''))||0;const f=$('#stkf');if(f)f.textContent=fmt(stk);refreshSl();if(gm==='wheel')wUpd()}};
let lt=Date.now();setInterval(()=>{const n=Date.now(),dt=(n-lt)/1000;lt=n;const cap=rate()*CAP_H;S.acc=Math.min(cap,S.acc+rate()*dt/3600);
if(S.fuel<FUEL_MAX){const k=Math.floor((n-S.ft)/1000/FUEL_SEC);if(k>0){S.fuel=Math.min(FUEL_MAX,S.fuel+k);S.ft+=k*FUEL_SEC*1000}}else S.ft=n;upd()},1000);
setInterval(save,5000);S.acc=Math.min(rate()*CAP_H,S.acc+rate()*Math.min((Date.now()-S.at)/3600000,CAP_H));
try{const w=Telegram.WebApp;w.ready();w.expand();w.disableVerticalSwipes&&w.disableVerticalSwipes();w.setHeaderColor('#000000');w.setBackgroundColor('#000000')}catch(e){}
draw();
cloudLoad();
