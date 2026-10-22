const $ = s => document.querySelector(s), R = Math.random, KEY = 'tdrop1';
const RC = { D:'#8a8f98', C:'#3a9bdc', B:'#a05fe0', A:'#ffa31a', S:'#ff4d6d' };
const FL = { JP:'🇯🇵', DE:'🇩🇪', US:'🇺🇸', IT:'🇮🇹', GB:'🇬🇧' };

// ===== МАШИНЫ: Название|редкость|л.с.|цена(млн)|страна|цвет|кузов(hatch/sedan/coupe/super/hyper) =====
const CARS = `Sakura Mini|D|75|0.3|JP|#e8c547|hatch
Volkstar Hatch|D|90|0.4|DE|#9fb4c7|hatch
Bristol Cub|D|70|0.35|GB|#6fbf73|hatch
Detroit Pony|D|120|0.5|US|#d96b4a|coupe
Kenji Sprint|C|220|1.5|JP|#e0e0e0|coupe
Bavar M-Line|C|280|2.4|DE|#3a6fd8|sedan
Roma Gioia|C|240|2|IT|#c8372d|coupe
Midland Rover|C|200|1.8|GB|#4d6b57|hatch
Liberty Coupe|C|260|2.2|US|#f0f0f0|coupe
Hanzo RS|B|380|5|JP|#f2a33a|coupe
Adler Turbo|B|450|6.5|DE|#7b7f86|sedan
Fiora GT|B|420|7|IT|#e0462f|coupe
Stratus V8|B|480|5.5|US|#2f64c9|coupe
Ronin GT-X|A|570|15|JP|#b8bcc4|super
Quattro Nova|A|620|22|DE|#f5f5f5|super
Vipera ACR|A|645|15|US|#e02424|super
Cavallo Veloce|A|700|19|IT|#f2c200|super
Windsor Speed|A|600|17|GB|#1c6b45|super
Kuro Phantom|S|900|60|JP|#141414|hyper
Spectre One|S|1000|75|DE|#8d5cf5|hyper
Toro Furia|S|1100|90|IT|#ff7a00|hyper
Excalibur 9|S|950|70|GB|#00bcd4|hyper`.split('\n').map(s => {
  const [n, r, hp, p, cc, col, body] = s.split('|');
  return { n, r, hp: +hp, p: p * 1e6, cc, col, body: body || 'sedan' };
});

const CASES = [
  { n:'Старт', c:4e5, w:{ D:80, C:17, B:3 }, e:'📦' },
  { n:'Стандарт', c:2e6, w:{ D:30, C:50, B:17, A:3 }, e:'🎁' },
  { n:'Элита', c:8e6, w:{ C:20, B:50, A:25, S:5 }, e:'👑' }
];
const DIFF = [['Лёгкая',9,150e3], ['Средняя',7,400e3], ['Сложная',6,1.2e6]];
const TASKS = [['race','Выиграй гонку',1,170e3], ['case','Открой 2 кейса',2,100e3], ['sell','Продай машину',1,68e3]];
const SLOTS = 10, CAP_H = 4, INC = .02, SELL = .7, FUEL_MAX = 15, FUEL_SEC = 120;
const DAILY = 250e3;

// ===== ВСПОМОГАТЕЛЬНОЕ =====
const fmt = n => { n = Math.round(n); return n >= 1e6 ? (+(n/1e6).toFixed(n>=1e7?0:1)+'').replace('.',',')+' млн ₽' : n.toLocaleString('ru-RU')+' ₽'; };
const need = l => 85 + 25 * l;
const pick = w => { let r = R() * Object.values(w).reduce((a,b)=>a+b,0), k; for (k in w) if ((r -= w[k]) < 0) return k; return k; };
const shade = (hex, p) => {
  const n = parseInt(hex.slice(1), 16);
  const r = (n>>16)&255, g = (n>>8)&255, b = n&255;
  const t = p > 0 ? 255 : 0, a = Math.abs(p) / 100;
  const f = v => Math.round(v + (t - v) * a).toString(16).padStart(2, '0');
  return '#' + f(r) + f(g) + f(b);
};

// ===== SVG-МАШИНЫ =====
const BODY = {
  hatch: {
    path: 'M16 72 L12 60 Q11 52 20 50 L48 46 L72 28 Q76 24 84 24 L150 24 Q160 24 166 32 L184 48 L216 52 Q228 54 228 64 L228 72 L214 72 A16 16 0 0 0 182 72 L66 72 A16 16 0 0 0 34 72 L16 72 Z',
    win: 'M80 28 L148 28 L158 46 L80 46 Z',
    rearQ: 'M66 36 L80 28 L80 46 L62 46 Z',
    rear: 'M14 54 L20 54 L20 62 L14 62 Z',
    head: 'M218 54 L226 56 L226 62 L218 60 Z',
    wx: [50, 198], wy: 78
  },
  sedan: {
    path: 'M14 72 L10 60 Q9 52 18 50 L60 46 L82 28 Q86 24 94 24 L148 24 Q158 24 164 32 L180 46 L218 50 Q230 52 230 62 L230 72 L214 72 A16 16 0 0 0 182 72 L66 72 A16 16 0 0 0 34 72 L14 72 Z',
    win: 'M88 28 L148 28 L158 46 L88 46 Z',
    rearQ: 'M76 34 L88 28 L88 46 L72 46 Z',
    rear: 'M12 54 L18 54 L18 62 L12 62 Z',
    head: 'M220 52 L228 54 L228 60 L220 58 Z',
    wx: [50, 198], wy: 78
  },
  coupe: {
    path: 'M12 72 L8 60 Q7 52 16 50 L58 46 L86 30 Q90 26 98 26 L150 26 Q160 26 166 34 L182 48 L218 52 Q230 54 230 64 L230 72 L214 72 A16 16 0 0 0 182 72 L66 72 A16 16 0 0 0 34 72 L12 72 Z',
    win: 'M92 30 L150 30 L160 48 L92 48 Z',
    rearQ: 'M78 38 L92 30 L92 48 L74 48 Z',
    rear: 'M10 54 L16 54 L16 62 L10 62 Z',
    head: 'M220 54 L228 56 L228 62 L220 60 Z',
    wx: [50, 198], wy: 78
  },
  super: {
    path: 'M10 72 L6 62 Q5 54 14 52 L54 48 L84 36 Q88 32 96 32 L152 32 Q162 32 168 38 L184 50 L218 54 Q230 56 230 66 L230 72 L214 72 A16 16 0 0 0 182 72 L66 72 A16 16 0 0 0 34 72 L10 72 Z',
    win: 'M90 36 L152 36 L164 50 L90 50 Z',
    rearQ: 'M76 44 L90 36 L90 50 L72 50 Z',
    rear: 'M8 56 L14 56 L14 64 L8 64 Z',
    head: 'M220 56 L228 58 L228 64 L220 62 Z',
    wx: [50, 198], wy: 78
  },
  hyper: {
    path: 'M8 72 L4 62 Q3 54 12 52 L50 48 L82 38 Q86 34 94 34 L156 34 Q166 34 172 40 L188 52 L222 56 Q234 58 234 66 L234 72 L214 72 A16 16 0 0 0 182 72 L66 72 A16 16 0 0 0 34 72 L8 72 Z',
    win: 'M88 38 L156 38 L168 52 L88 52 Z',
    rearQ: 'M74 46 L88 38 L88 52 L70 52 Z',
    rear: 'M6 58 L12 58 L12 66 L6 66 Z',
    head: 'M224 58 L232 60 L232 66 L224 64 Z',
    wx: [50, 198], wy: 78
  }
};

let uid = 0;
const wheel = (cx, cy) => `
  <g>
    <circle cx="${cx}" cy="${cy}" r="16" fill="#0a0a0a"/>
    <circle cx="${cx}" cy="${cy}" r="10.5" fill="#2e2e36"/>
    <circle cx="${cx}" cy="${cy}" r="7" fill="#16161c"/>
    ${[0,60,120].map(a => {
      const rad = a * Math.PI / 180, l = 10;
      return `<line x1="${cx-Math.cos(rad)*l}" y1="${cy-Math.sin(rad)*l}" x2="${cx+Math.cos(rad)*l}" y2="${cy+Math.sin(rad)*l}" stroke="#555" stroke-width="1.2"/>`;
    }).join('')}
    <circle cx="${cx}" cy="${cy}" r="2.2" fill="#888"/>
  </g>`;

function carSVG(c) {
  const b = BODY[c.body] || BODY.sedan;
  const id = 'c' + (++uid);
  const light = shade(c.col, 42);
  const dark = shade(c.col, -32);
  return `<svg class="car" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${light}"/>
        <stop offset=".45" stop-color="${c.col}"/>
        <stop offset="1" stop-color="${dark}"/>
      </linearGradient>
      <linearGradient id="sh${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".55"/>
        <stop offset=".55" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="wn${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3d4d63"/>
        <stop offset="1" stop-color="#0c131b"/>
      </linearGradient>
    </defs>
    <ellipse cx="120" cy="94" rx="106" ry="5" fill="#000" opacity=".45"/>
    <path d="${b.path}" fill="url(#bg${id})" stroke="#000" stroke-opacity=".35" stroke-width=".8"/>
    <path d="${b.path}" fill="url(#sh${id})"/>
    <path d="${b.win}" fill="url(#wn${id})"/>
    <path d="${b.rearQ}" fill="url(#wn${id})"/>
    <path d="${b.head}" fill="#ffe9a8" opacity=".9"/>
    <path d="${b.rear}" fill="#ff3b3b" opacity=".85"/>
    ${wheel(b.wx[0], b.wy)}
    ${wheel(b.wx[1], b.wy)}
  </svg>`;
}

function carMystery() {
  const b = BODY.sedan;
  return `<svg class="car" viewBox="0 0 240 100">
    <ellipse cx="120" cy="94" rx="106" ry="5" fill="#000" opacity=".4"/>
    <path d="${b.path}" fill="#1a1a22" stroke="#2a2a34" stroke-width=".8"/>
    <path d="${b.win}" fill="#0d0d12"/>
    <path d="${b.rearQ}" fill="#0d0d12"/>
    <circle cx="50" cy="78" r="16" fill="#0a0a0d"/>
    <circle cx="198" cy="78" r="16" fill="#0a0a0d"/>
  </svg>`;
}

// ===== СОСТОЯНИЕ =====
const DEF = { m: 2e6, cars: [], own: [], acc: 0, at: Date.now(), xp: 0, lv: 1,
  fuel: FUEL_MAX, ft: Date.now(), day: '', tk: {}, id: 1, lastBonus: '' };
let S;
try { S = Object.assign({}, DEF, JSON.parse(localStorage.getItem(KEY)) || {}); } catch { S = { ...DEF }; }

let tab = 'garage', cs = 1, cn = 1, df = 0, busy = false;
const save = () => { S.at = Date.now(); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };
const toast = t => { const e = $('#toast'); e.textContent = t; e.classList.add('show'); setTimeout(() => e.classList.remove('show'), 2100); };
const buzz = () => { try { Telegram.WebApp.HapticFeedback.impactOccurred('light'); } catch {} };

const rb = r => `<b class="rb" style="background:${RC[r]}">${r}</b>`;
const mini = (c, x = '') => `<div class="cc r-${c.r}">${rb(c.r)}${carSVG(c)}<h3>${c.n}</h3><p>${FL[c.cc]} ${c.hp} л.с. · ${fmt(c.p)}</p>${x}</div>`;

// ===== ДОХОД / ОПЫТ =====
function rate() {
  const cnt = {};
  S.cars.forEach(o => cnt[CARS[o.i].cc] = (cnt[CARS[o.i].cc] || 0) + 1);
  return S.cars.reduce((a, o) => a + CARS[o.i].p * INC * (cnt[CARS[o.i].cc] >= 3 ? 1.1 : 1), 0);
}
function gainXp(n) {
  S.xp += n;
  while (S.xp >= need(S.lv)) {
    S.xp -= need(S.lv); S.lv++; S.m += 1e5 * S.lv;
    toast('Уровень ' + S.lv + '! +' + fmt(1e5 * S.lv));
  }
}
function task(k, n = 1) {
  const d = new Date().toDateString();
  if (S.day !== d) { S.day = d; S.tk = {}; }
  const t = TASKS.find(x => x[0] === k), was = S.tk[k] || 0;
  S.tk[k] = Math.min(t[2], was + n);
  if (was < t[2] && S.tk[k] >= t[2]) { S.m += t[3]; gainXp(40); toast('Задание: +' + fmt(t[3])); }
}

// ===== ЭКРАНЫ =====
const V = {
  garage() {
    const r = rate(), cnt = {};
    S.cars.forEach(o => cnt[CARS[o.i].cc] = (cnt[CARS[o.i].cc] || 0) + 1);
    const b = Object.keys(cnt).filter(k => cnt[k] >= 3).map(k => `<span class="chip2">${FL[k]} +10%</span>`).join('');
    return `<div class="card">
      <div class="r"><span>Доход гаража</span><span>${fmt(r)} / ч</span></div>
      <div class="big" id="acc"></div>
      <div class="bar"><i id="accb"></i></div>
      <button class="blue" data-a="claim">Забрать</button>
      <p class="mute">Копится до ${CAP_H} ч, потом останавливается</p>
      <p class="mute">${b}${b?'<br>':''}3+ машины одной страны: +10% к их доходу</p>
    </div>
    <div class="sec"><span>МАШИНЫ ${S.cars.length}/${SLOTS}</span></div>
    ${S.cars.length
      ? `<div class="grid">${S.cars.map(o => mini(CARS[o.i],
          `<button class="sm" data-a="sell" data-i="${o.id}">Продать ${fmt(CARS[o.i].p*SELL)}</button>`)).join('')}</div>`
      : '<p class="mute">Гараж пуст. Откройте первый кейс!</p>'}`;
  },

  cases() {
    const k = CASES[cs], tot = k.c * cn, sh = tot - S.m;
    return `<div class="chips">${CASES.map((c,i) =>
      `<button class="chip ${i===cs?'on':''}" data-a="cs" data-i="${i}">${c.e} ${c.n}</button>`).join('')}</div>
      <div class="mys">${carMystery()}<span>?</span></div>
      <div class="chances">${Object.entries(k.w).map(([r,w]) => rb(r) + ' ' + w + '%').join(' ')}</div>
      <div class="seg">${[1,3,5].map(n =>
        `<button class="${n===cn?'on':''}" data-a="cn" data-i="${n}">×${n}</button>`).join('')}</div>
      <button class="blue" data-a="open" ${sh>0?'disabled':''}>Открыть ×${cn} · ${fmt(tot)}</button>
      <p class="mute">${sh>0?'Не хватает '+fmt(sh):'Если гараж полон, лишние машины продаются автоматически'}</p>`;
  },

  race() {
    return `<div class="card"><div class="r"><span>⛽ Топливо</span><span id="fu"></span></div>
      <p class="mute" style="margin:14px 0 0">Тапай по экрану как можно быстрее и приди к финишу раньше соперника. Чем мощнее твоя лучшая машина — тем сильнее каждый тап.</p></div>
      <div class="dif">${DIFF.map((d,i) =>
        `<button class="${i===df?'on':''}" data-a="df" data-i="${i}"><span>${d[0]}</span><span>${fmt(d[2])}</span></button>`).join('')}</div>
      <button class="blue" data-a="go">🏁 Старт гонки</button>`;
  },

  menu() {
    const d = new Date().toDateString();
    if (S.day !== d) { S.day = d; S.tk = {}; }
    const canBonus = S.lastBonus !== d;
    return `<div class="ban">
        <div class="r"><b>Уровень ${S.lv}</b><span>${S.xp}/${need(S.lv)}</span></div>
        <div class="bar"><i style="width:${S.xp/need(S.lv)*100}%"></i></div>
        <small>На ${S.lv+1} уровне: +${fmt(1e5*(S.lv+1))}</small>
      </div>
      <div class="card daily">
        <div><b>Ежедневный бонус</b><p>${canBonus ? 'Забери свою награду!' : 'Возвращайся завтра'}</p></div>
        <button class="sm ${canBonus?'blue':''}" data-a="bonus" ${canBonus?'':'disabled'}>${canBonus ? '+250k' : '✓'}</button>
      </div>
      <div class="sec"><span>ЗАДАНИЯ НА СЕГОДНЯ</span></div>
      ${TASKS.map(t => {
        const v = S.tk[t[0]] || 0;
        return `<div class="task ${v>=t[2]?'ok':''}">
          <div>${t[1]}<small>+${fmt(t[3])} · +40 опыта</small></div>
          <span>${v>=t[2]?'Готово ✓':v+'/'+t[2]}</span>
        </div>`;
      }).join('')}
      <div class="sec"><span>КОЛЛЕКЦИЯ ${S.own.length}/${CARS.length}</span></div>
      <div class="grid">${CARS.map((c,i) => S.own.includes(i) ? mini(c) :
        `<div class="cc lock">${rb(c.r)}${carMystery()}<h3>???</h3><p>Ещё не открыта</p></div>`).join('')}</div>`;
  }
};

const TT = { garage:'Гараж', cases:'Кейсы', race:'Гонки', menu:'Меню' };

function upd() {
  $('#mo').textContent = fmt(S.m);
  $('#lv').textContent = S.lv;
  const a = $('#acc');
  if (a) { const cap = rate() * CAP_H; a.textContent = fmt(S.acc); $('#accb').style.width = (cap ? S.acc/cap*100 : 0) + '%'; }
  const f = $('#fu'); if (f) f.textContent = S.fuel + '/' + FUEL_MAX;
}
function draw() {
  $('#ttl').textContent = TT[tab];
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.t === tab));
  $('#main').innerHTML = V[tab]();
  upd();
}

// ===== ОТКРЫТИЕ КЕЙСА (CS:GO-ROLL) =====
function openCase() {
  if (busy) return;
  const k = CASES[cs], tot = k.c * cn;
  if (S.m < tot) return;
  busy = true;
  S.m -= tot;

  const got = [];
  let kept = 0, sold = 0;
  for (let j = 0; j < cn; j++) {
    const r = pick(k.w);
    const pool = CARS.map((_, i) => i).filter(i => CARS[i].r === r);
    const i = pool[Math.floor(R() * pool.length)];
    got.push(i);
    if (!S.own.includes(i)) S.own.push(i);
    if (S.cars.length < SLOTS) { S.cars.push({ id: S.id++, i }); kept++; }
    else { S.m += CARS[i].p * SELL; sold++; }
  }
  gainXp(15 * cn);
  task('case', cn);
  save(); draw();

  const ov = $('#ov');
  ov.className = 'on';
  ov.innerHTML = `<div class="rv"><h2>Открываем кейс…</h2>
    <div class="roll"><div class="strip" id="strip"></div><div class="marker"></div></div></div>`;

  // строим ленту
  const strip = ov.querySelector('#strip');
  const roll = ov.querySelector('.roll');
  const rollW = roll.clientWidth;
  const N = 40, WIN_IDX = 34, itemW = 100, gap = 10, step = itemW + gap;
  let html = '';
  for (let j = 0; j < N; j++) {
    let ci;
    if (j === WIN_IDX) ci = got[0];
    else {
      const rr = pick(k.w);
      const pool = CARS.map((_, i) => i).filter(i => CARS[i].r === rr);
      ci = pool[Math.floor(R() * pool.length)];
    }
    const c = CARS[ci];
    html += `<div class="si" style="border-color:${RC[c.r]}55">${carSVG(c)}<b style="background:${RC[c.r]}">${c.r}</b></div>`;
  }
  strip.innerHTML = html;

  // анимация
  const jitter = (R() - .5) * itemW * .7;
  const target = WIN_IDX * step + itemW / 2 - rollW / 2 + jitter;
  strip.style.transition = 'none';
  strip.style.transform = 'translateX(0)';
  void strip.offsetWidth;
  requestAnimationFrame(() => {
    strip.style.transition = 'transform 4.2s cubic-bezier(.12,.82,.18,1)';
    strip.style.transform = `translateX(${-target}px)`;
  });

  setTimeout(() => {
    ov.innerHTML = `<div class="rv">
      <h2>Выпало</h2>
      <div class="grid">${got.map(i => mini(CARS[i])).join('')}</div>
      <p class="mute">${kept ? 'В гараж: ' + kept + '. ' : ''}${sold ? 'Гараж полон, продано: ' + sold : ''}</p>
      <button class="blue" data-a="closeov">Круто!</button>
    </div>`;
    busy = false;
  }, 4500);
}

// ===== ГОНКА =====
function race() {
  if (!S.cars.length) return toast('Сначала получите машину в кейсе');
  if (S.fuel < 1) return toast('Нет топлива. Подождите немного');

  S.fuel--;
  if (S.fuel === FUEL_MAX - 1) S.ft = Date.now();
  save();

  const best = S.cars.map(o => CARS[o.i]).sort((a, b) => b.hp - a.hp)[0];
  const opp = CARS[Math.floor(R() * CARS.length)];
  const pw = 1.2 + best.hp / 400;
  const [, T, rew] = DIFF[df];
  const el = $('#race');
  el.className = 'on';
  el.innerHTML = `
    <div class="lane"><span>Соперник · ${opp.n}</span>
      <div class="trk"><div class="rc" id="oc">${carSVG(opp)}</div></div></div>
    <div class="lane"><span>Вы · ${best.n}</span>
      <div class="trk"><div class="rc" id="pc">${carSVG(best)}</div></div></div>
    <div id="cd">3</div><div id="rtx"></div><button id="tap">ТАП!</button>`;

  let st = 'cd', pl = 0, t0 = 0, c = 3, raf;
  const tap = $('#tap');
  const end = win => {
    st = 'end'; cancelAnimationFrame(raf);
    const g = win ? rew : 0;
    if (win) { S.m += g; task('race'); }
    gainXp(win ? 30 : 5); save(); upd();
    $('#cd').textContent = win ? '🏆 Победа!' : 'Проиграли';
    $('#rtx').innerHTML = `<p class="mute">${win ? 'Награда: ' + fmt(g) : 'Соперник был быстрее. Попробуйте ещё!'}</p>
      <button class="blue" data-a="closerace">Закрыть</button>`;
    tap.style.display = 'none';
  };
  const loop = n => {
    if (st !== 'go') return;
    const p = Math.min(100, (n - t0) / 1000 * 100 / T);
    $('#oc').style.left = p * .84 + '%';
    if (p >= 100) return end(false);
    raf = requestAnimationFrame(loop);
  };
  tap.onpointerdown = e => {
    e.preventDefault();
    if (st !== 'go') return;
    buzz();
    pl += pw;
    $('#pc').style.left = Math.min(100, pl) * .84 + '%';
    if (pl >= 100) end(true);
  };
  const iv = setInterval(() => {
    c--;
    if (c > 0) $('#cd').textContent = c;
    else {
      clearInterval(iv);
      $('#cd').textContent = 'ТАП!';
      st = 'go';
      t0 = performance.now();
      raf = requestAnimationFrame(loop);
      setTimeout(() => { if (st === 'go') $('#cd').textContent = ''; }, 600);
    }
  }, 900);
}

// ===== КЛИКИ =====
document.body.onclick = e => {
  const b = e.target.closest('[data-a],[data-t]');
  if (!b) return;
  if (b.dataset.t) { tab = b.dataset.t; scrollTo(0, 0); return draw(); }
  const a = b.dataset.a, i = +b.dataset.i;
  buzz();
  if (a === 'claim') {
    if (S.acc < 1) return toast('Пока нечего забирать');
    S.m += S.acc; toast('+' + fmt(S.acc)); S.acc = 0;
  } else if (a === 'sell') {
    const o = S.cars.find(x => x.id === i);
    if (o && confirm('Продать ' + CARS[o.i].n + '?')) {
      S.m += CARS[o.i].p * SELL;
      S.cars = S.cars.filter(x => x !== o);
      task('sell');
    }
  } else if (a === 'cs') cs = i;
  else if (a === 'cn') cn = i;
  else if (a === 'df') df = i;
  else if (a === 'open') return openCase();
  else if (a === 'go') return race();
  else if (a === 'closeov') $('#ov').className = '';
  else if (a === 'closerace') $('#race').className = '';
  else if (a === 'bonus') {
    const d = new Date().toDateString();
    if (S.lastBonus === d) return;
    S.lastBonus = d;
    S.m += DAILY; gainXp(100);
    toast('Бонус +' + fmt(DAILY));
  }
  save(); draw();
};

// ===== ТИКИ =====
let lt = Date.now();
setInterval(() => {
  const n = Date.now(), dt = (n - lt) / 1000; lt = n;
  const cap = rate() * CAP_H;
  S.acc = Math.min(cap, S.acc + rate() * dt / 3600);
  if (S.fuel < FUEL_MAX) {
    const k = Math.floor((n - S.ft) / 1000 / FUEL_SEC);
    if (k > 0) { S.fuel = Math.min(FUEL_MAX, S.fuel + k); S.ft += k * FUEL_SEC * 1000; }
  } else S.ft = n;
  upd();
}, 1000);

setInterval(save, 5000);
S.acc = Math.min(rate() * CAP_H, S.acc + rate() * Math.min((Date.now() - S.at) / 3600000, CAP_H));

// ===== TELEGRAM =====
try {
  const w = Telegram.WebApp;
  w.ready(); w.expand();
  w.disableVerticalSwipes && w.disableVerticalSwipes();
  w.setHeaderColor('#07070a'); w.setBackgroundColor('#07070a');
} catch {}

draw();