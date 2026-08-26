/* ===================== MUNDA Design Studio — design.js ===================== */
(function () {
  'use strict';

  var svg = document.getElementById('studioSvg');
  var ambient = document.getElementById('ambient');
  var finishBtn = document.getElementById('finishBtn');
  var tabsEl = document.getElementById('tabs');
  var optionsEl = document.getElementById('options');
  var statusEl = document.getElementById('status');
  var previewTag = document.getElementById('previewTag');
  var finishOverlay = document.getElementById('finishOverlay');
  var timeOverlay = document.getElementById('timeOverlay');
  var timerFill = document.getElementById('timerFill');
  var timerLabel = document.getElementById('timerLabel');
  var guru = document.getElementById('guru');
  var guruBubble = document.getElementById('guruBubble');
  var guruName = document.getElementById('guruName');
  var guruText = document.getElementById('guruText');
  var guruBody = document.getElementById('guruBody');

  var state = { seats: null, fabric: 'solid', color: '#ff2d95', dash: null, doors: null };
  var activeTab = 'seats';
  var TIME_LIMIT = 75;
  var BEST_KEY = 'munda-design-studio-best';
  var timeLeft = TIME_LIMIT;
  var timerId = null;
  var finished = false;
  var customer = null;
  var lastCustomerKey = null;
  var firstGame = true;
  var hideTimer = null;
  var typeIv = null;
  var best = 0;

  /* ---------- mini icons ---------- */
  function seatIcon(v) {
    if (v === 'comfort') {
      return '<svg viewBox="0 0 64 44"><rect x="22" y="2" width="20" height="8" rx="4" fill="#b9b9ca"/><rect x="12" y="12" width="40" height="24" rx="9" fill="#c6c6d6"/><rect x="2" y="34" width="60" height="8" rx="4" fill="#9a9aaa"/></svg>';
    }
    if (v === 'luxury') {
      return '<svg viewBox="0 0 64 44"><rect x="19" y="0" width="26" height="10" rx="4" fill="#b9b9ca"/><rect x="10" y="12" width="44" height="22" rx="4" fill="#c6c6d6"/><path d="M16 16 L48 16 M16 22 L48 22 M16 28 L48 28" stroke="var(--acc)" stroke-width="1.4"/><rect x="2" y="34" width="60" height="8" rx="3" fill="#9a9aaa"/></svg>';
    }
    // sport
    return '<svg viewBox="0 0 64 44"><rect x="23" y="1" width="18" height="7" rx="3" fill="#b9b9ca"/><path d="M11 12 L5 16 L6 35 L15 31 Z" fill="var(--acc)"/><path d="M53 12 L59 16 L58 35 L49 31 Z" fill="var(--acc)"/><rect x="10" y="12" width="44" height="22" rx="5" fill="#c6c6d6"/><rect x="2" y="34" width="60" height="8" rx="3" fill="#9a9aaa"/></svg>';
  }

  function dashIcon(v) {
    if (v === 'sporty') {
      return '<svg viewBox="0 0 64 44"><rect x="2" y="16" width="60" height="20" rx="6" fill="#b9b9ca"/><circle cx="12" cy="22" r="4" fill="#191926"/><circle cx="22" cy="22" r="4" fill="#191926"/><rect x="40" y="20" width="16" height="10" rx="2" fill="#191926"/><rect x="2" y="31" width="60" height="5" rx="2.5" fill="var(--acc)"/></svg>';
    }
    if (v === 'classic') {
      return '<svg viewBox="0 0 64 44"><rect x="2" y="16" width="60" height="20" rx="6" fill="#b9b9ca"/><rect x="2" y="17" width="60" height="5" fill="var(--acc)" opacity="0.6"/><rect x="40" y="22" width="18" height="9" rx="2" fill="#191926"/></svg>';
    }
    // minimal
    return '<svg viewBox="0 0 64 44"><rect x="2" y="16" width="60" height="20" rx="6" fill="#b9b9ca"/><rect x="40" y="20" width="18" height="10" rx="2" fill="#191926"/><rect x="2" y="31" width="60" height="5" rx="2.5" fill="var(--acc)"/></svg>';
  }

  function doorIcon(v) {
    if (v === 'sporty') {
      return '<svg viewBox="0 0 64 44"><rect x="6" y="2" width="52" height="40" rx="7" fill="#c6c6d6"/><path d="M10 6 L58 6 L58 14 L10 22 Z" fill="#b0b0c0"/><circle cx="32" cy="28" r="7" fill="#8a8a9a"/><circle cx="32" cy="28" r="3" fill="var(--acc)"/></svg>';
    }
    if (v === 'classic') {
      return '<svg viewBox="0 0 64 44"><rect x="6" y="2" width="52" height="40" rx="7" fill="#c6c6d6"/><rect x="8" y="8" width="48" height="5" fill="var(--acc)" opacity="0.6"/><rect x="16" y="20" width="32" height="12" rx="3" fill="#b0b0c0"/><rect x="24" y="34" width="16" height="4" rx="2" fill="#8a8a9a"/></svg>';
    }
    // modern
    return '<svg viewBox="0 0 64 44"><rect x="6" y="2" width="52" height="40" rx="7" fill="#c6c6d6"/><rect x="16" y="10" width="32" height="5" rx="2.5" fill="var(--acc)"/><rect x="20" y="24" width="24" height="4" rx="2" fill="#8a8a9a"/><rect x="14" y="30" width="36" height="8" rx="3" fill="#b0b0c0"/></svg>';
  }

  function patIcon(id) {
    return '<svg viewBox="0 0 64 44"><rect width="64" height="44" rx="6" fill="url(#pat-' + id + ')"/><rect width="64" height="44" rx="6" fill="none" stroke="#2a2a40" stroke-width="1.5"/></svg>';
  }

  var OPTIONS = {
    seats: [
      { id: 'sport', label: 'Sport', icon: seatIcon('sport') },
      { id: 'comfort', label: 'Comfort', icon: seatIcon('comfort') },
      { id: 'luxury', label: 'Luxury', icon: seatIcon('luxury') }
    ],
    fabric: [
      { id: 'solid', label: 'Solid', icon: patIcon('solid') },
      { id: 'carbon', label: 'Carbon', icon: patIcon('carbon') },
      { id: 'quilt', label: 'Quilted', icon: patIcon('quilt') },
      { id: 'mesh', label: 'Mesh', icon: patIcon('mesh') }
    ],
    color: [
      { id: '#ff2d95', label: 'Magenta', swatch: '#ff2d95' },
      { id: '#00e5ff', label: 'Cyan', swatch: '#00e5ff' },
      { id: '#8b5cf6', label: 'Purple', swatch: '#8b5cf6' },
      { id: '#ff3b3b', label: 'Red', swatch: '#ff3b3b' },
      { id: '#ffb347', label: 'Amber', swatch: '#ffb347' },
      { id: '#4ade80', label: 'Green', swatch: '#4ade80' }
    ],
    dash: [
      { id: 'minimal', label: 'Minimal', icon: dashIcon('minimal') },
      { id: 'sporty', label: 'Sporty', icon: dashIcon('sporty') },
      { id: 'classic', label: 'Classic', icon: dashIcon('classic') }
    ],
    doors: [
      { id: 'modern', label: 'Modern', icon: doorIcon('modern') },
      { id: 'sporty', label: 'Sporty', icon: doorIcon('sporty') },
      { id: 'classic', label: 'Classic', icon: doorIcon('classic') }
    ]
  };

  var LABELS = {};
  Object.keys(OPTIONS).forEach(function (cat) {
    OPTIONS[cat].forEach(function (o) { LABELS[o.id] = o.label; });
  });

  /* ---------- Customers — personalities, not exact specs ---------- */
  var CAT_LABEL = { seats: 'seats', fabric: 'fabric', color: 'color', dash: 'dashboard', doors: 'doors' };
  var MOOD_EMOJI = { perfect: '\uD83D\uDE0D', good: '\uD83D\uDE0A', okay: '\uD83D\uDE10', angry: '\uD83D\uDE21' };

  var CUSTOMERS = [
    {
      key: 'racer',
      name: 'Max',
      title: 'The Racer',
      accent: '#ff3b3b',
      look: { hairFill: '#14142a', mohawk: false, helmet: true, glasses: '#ff3b3b', glassTint: 'rgba(255,59,59,0.14)', tie: false, mustache: false, earring: false },
      ask: "Hey! I'm Max - and this build is about SPEED. Sport seats, technical carbon fabric, an aggressive color, sporty dashboard. Make it scream! Clock's ticking!",
      pref: { seats: ['sport'], fabric: ['carbon'], color: ['#ff3b3b', '#ff2d95', '#ffb347'], dash: ['sporty'], doors: ['sporty'] },
      neutral: { seats: ['comfort'], fabric: ['mesh'], color: ['#8b5cf6', '#00e5ff'], dash: ['minimal'], doors: ['modern'] },
      wrong: { seats: ['luxury'], fabric: ['solid', 'quilt'], color: ['#4ade80'], dash: ['classic'], doors: ['classic'] },
      perfect: "THIS IS EXACTLY WHAT I WANTED! Sport seats, carbon, an aggressive color - pure speed! Beautiful work!",
      good: "Solid build! A couple of choices weren't my taste, but this cabin has real attitude.",
      okay: "It's okay... I can see the effort, but it's not really a racer's cabin.",
      angry: "Why did you put {X} in a racing build?!",
      timeout: "Time's up - and a racer doesn't wait. I needed sport seats, carbon and aggression. Try again!"
    },
    {
      key: 'executive',
      name: 'Mr. Sterling',
      title: 'The Executive',
      accent: '#c9a86a',
      look: { hairFill: '#c9c9d8', mohawk: false, helmet: false, glasses: '#c9a86a', glassTint: 'rgba(201,168,106,0.14)', tie: true, mustache: true, earring: false },
      ask: "Good day. Mr. Sterling. I expect refinement: luxury seats, quilted leather, a minimal dashboard, subtle colors. Discretion matters. The clock is running.",
      pref: { seats: ['luxury'], fabric: ['quilt'], color: ['#ff2d95', '#8b5cf6'], dash: ['minimal'], doors: ['classic'] },
      neutral: { seats: ['comfort'], fabric: ['solid'], color: ['#00e5ff'], dash: ['classic'], doors: ['modern'] },
      wrong: { seats: ['sport'], fabric: ['carbon', 'mesh'], color: ['#ff3b3b', '#ffb347', '#4ade80'], dash: ['sporty'], doors: ['sporty'] },
      perfect: "Exquisite. Luxury seats, quilted leather, a quiet dashboard - exactly the discretion I asked for. Well done.",
      good: "Refined enough. A couple of choices were a touch loud for my taste, but the cabin is presentable.",
      okay: "It's okay... acceptable, but not quite the understated elegance I expect.",
      angry: "Why did you put {X} in an executive build?! This is a boardroom, not a playground.",
      timeout: "The clock has beaten you. I expected luxury seats, quilted leather and restraint. Try again."
    },
    {
      key: 'rebel',
      name: 'Kai',
      title: 'The Rebel',
      accent: '#4ade80',
      look: { hairFill: '#4ade80', mohawk: true, helmet: false, glasses: '#4ade80', glassTint: 'rgba(74,222,128,0.14)', tie: false, mustache: false, earring: true },
      ask: "Yo, Kai here. I want something EXPERIMENTAL - weird color combos, bold doors, break the rules. Don't play it safe. But hurry - the clock's running!",
      pref: { seats: [], fabric: ['mesh'], color: ['#4ade80', '#ffb347', '#8b5cf6'], dash: ['minimal'], doors: ['modern'] },
      neutral: { seats: ['sport', 'comfort', 'luxury'], fabric: ['carbon'], color: ['#00e5ff', '#ff2d95'], dash: ['sporty'], doors: ['sporty'] },
      wrong: { seats: [], fabric: ['solid', 'quilt'], color: ['#ff3b3b'], dash: ['classic'], doors: ['classic'] },
      perfect: "YES! THIS IS EXACTLY WHAT I WANTED! Bold colors, experimental doors - totally unconventional. Love it!",
      good: "Now that's different! A couple of safe choices, but the cabin has real edge.",
      okay: "It's okay... a bit conventional for my taste. I asked for weird.",
      angry: "Why did you put {X} in an experimental build?! So conventional. I'm disappointed.",
      timeout: "Time's up - and my patience too. I wanted bold colors and experimental doors. Try again!"
    }
  ];

  /* The corner NPC — one base character, per-customer look (helmet / tie+moustache / mohawk+earring) */
  var FALLBACK_LOOK = { hairFill: '#221a2e', mohawk: false, helmet: false, glasses: '#ff2d95', glassTint: 'rgba(255,45,149,0.12)', tie: false, mustache: false, earring: false };

  function guruSvg(c) {
    var acc = c.accent;
    var L = c.look || FALLBACK_LOOK;
    var hair = L.mohawk
      ? '<path d="M56 62 L56 16 C60 10 80 10 84 16 L84 62 Z" fill="' + L.hairFill + '"/>' +
        '<path d="M63 62 L63 22 M70 62 L70 14 M77 62 L77 22" stroke="#14361f" stroke-width="3" stroke-linecap="round" opacity="0.35"/>'
      : '<path d="M36 60 A34 34 0 0 1 104 60 L104 50 C104 34 90 24 70 24 C50 24 36 34 36 50 Z" fill="' + L.hairFill + '"/>';
    var helmet = L.helmet
      ? '<path d="M36 54 C36 24 52 12 70 12 C88 12 104 24 104 54 L104 46 C104 32 90 24 70 24 C50 24 36 32 36 46 Z" fill="' + acc + '"/>' +
        '<path d="M40 46 L100 46 L98 54 L42 54 Z" fill="#14142a"/>' +
        '<path d="M54 22 L58 14 M76 22 L80 14" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>'
      : '';
    var tie = L.tie
      ? '<circle cx="70" cy="127" r="3.5" fill="#8f7a4d"/>' +
        '<path d="M64 128 L76 128 L72.5 142 L70 150 L67.5 142 Z" fill="#c9a86a"/>'
      : '';
    var mustache = L.mustache
      ? '<path d="M56 76 Q63 72 70 76 Q77 72 84 76" stroke="#b8b8c8" stroke-width="2.5" fill="none" stroke-linecap="round"/>'
      : '';
    var earring = L.earring
      ? '<circle cx="102" cy="74" r="3.5" fill="#c9a86a"/>' +
        '<path d="M102 77.5 L102 80.5" stroke="#c9a86a" stroke-width="1.5" stroke-linecap="round"/>'
      : '';
    var badge = L.tie ? '' :
      '<circle cx="70" cy="142" r="8" fill="' + acc + '"/>' +
      '<path d="M65.5 142 L69 145.5 L75 138" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
    return '<svg viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">' +
      '  <g>' +
      '    <animateTransform attributeName="transform" type="rotate" values="-8 100 112; 14 100 112; -8 100 112" keyTimes="0;0.5;1" dur="1.7s" repeatCount="indefinite"/>' +
      '    <path d="M100 114 Q122 104 128 86" stroke="#221a2e" stroke-width="15" stroke-linecap="round" fill="none"/>' +
      '    <circle cx="130" cy="82" r="9" fill="#f0c294"/>' +
      '  </g>' +
      '  <path d="M28 170 C28 128 48 110 70 110 C92 110 112 128 112 170 Z" fill="#171726" stroke="#26263a" stroke-width="2"/>' +
      '  <path d="M70 110 L59 128 L70 121 L81 128 Z" fill="' + acc + '"/>' +
      tie +
      '  <rect x="64" y="96" width="12" height="16" rx="4" fill="#e8b98c"/>' +
      '  <circle cx="70" cy="62" r="34" fill="#f0c294"/>' +
      hair + helmet +
      '  <ellipse cx="57" cy="62" rx="4.2" ry="4.6" fill="#191222">' +
      '    <animate attributeName="ry" values="4.6;4.6;0.5;4.6" keyTimes="0;0.93;0.97;1" dur="3.8s" repeatCount="indefinite"/>' +
      '  </ellipse>' +
      '  <ellipse cx="83" cy="62" rx="4.2" ry="4.6" fill="#191222">' +
      '    <animate attributeName="ry" values="4.6;4.6;0.5;4.6" keyTimes="0;0.93;0.97;1" dur="3.8s" repeatCount="indefinite"/>' +
      '  </ellipse>' +
      '  <g fill="' + L.glassTint + '" stroke="' + L.glasses + '" stroke-width="2.5">' +
      '    <circle cx="57" cy="62" r="11"/>' +
      '    <circle cx="83" cy="62" r="11"/>' +
      '    <path d="M68 62 L72 62" fill="none"/>' +
      '  </g>' +
      mustache +
      '  <path d="M60 78 Q70 88 80 78" stroke="#8a5a3a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      earring + badge +
      '</svg>';
  }

  /* ---------- timer ---------- */
  function updateTimer() {
    timerFill.style.width = (timeLeft / TIME_LIMIT) * 100 + '%';
    timerLabel.textContent = timeLeft;
    timerFill.classList.toggle('danger', timeLeft <= 15);
  }

  function startTimer() {
    stopTimer();
    timerId = setInterval(function () {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) timeUp();
    }, 1000);
  }

  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }

  function timeUp() {
    if (finished) return;
    finished = true;
    stopTimer();
    hideBubble();
    finishBtn.disabled = true;
    document.getElementById('timeName').textContent = customer ? customer.name + ' \u00B7 ' + customer.title : 'Luka \u00B7 MUNDA Designer';
    document.getElementById('timeVerdictText').textContent = customer ? '\u23F1 ' + customer.timeout : '';
    timeOverlay.classList.remove('hidden');
  }

  /* ---------- Luka (corner NPC) ---------- */
  function injectGuru(c) {
    var markup = guruSvg(c || { accent: '#ff2d95', look: FALLBACK_LOOK });
    guruBody.innerHTML = markup;
    var s = guruBody.querySelector('svg');
    ['verdictAvatar', 'timeAvatar'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && s) el.innerHTML = s.outerHTML;
    });
  }

  function showBubble() { guruBubble.classList.add('show'); }

  function hideBubble() {
    guruBubble.classList.remove('show');
    if (typeIv) { clearInterval(typeIv); typeIv = null; }
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
  }

  function setBubble(text) {
    guruName.textContent = customer ? customer.name + ' \u00B7 ' + customer.title : 'Luka \u00B7 MUNDA Designer';
    guruText.textContent = text;
    guruText.classList.remove('typing');
  }

  function typeBubble(text, speed, done) {
    if (typeIv) clearInterval(typeIv);
    showBubble();
    guruName.textContent = customer ? customer.name + ' \u00B7 ' + customer.title : 'Luka \u00B7 MUNDA Designer';
    guruText.textContent = '';
    guruText.classList.add('typing');
    var i = 0;
    typeIv = setInterval(function () {
      i++;
      guruText.textContent = text.slice(0, i);
      if (i >= text.length) {
        clearInterval(typeIv);
        typeIv = null;
        guruText.classList.remove('typing');
        if (done) done();
      }
    }, speed);
  }

  function pickCustomer() {
    var pool = [];
    for (var i = 0; i < CUSTOMERS.length; i++) {
      if (CUSTOMERS[i].key !== lastCustomerKey) pool.push(CUSTOMERS[i]);
    }
    var c = pool[Math.floor(Math.random() * pool.length)];
    lastCustomerKey = c.key;
    return c;
  }

  /* slide in + ask with a personality; the request stays visible the WHOLE time */
  function prefList(vals) {
    if (!vals || vals.length === 0) return 'Any';
    return vals.map(function (v) { return LABELS[v] || v; }).join('/');
  }

  function briefSpecText(c) {
    return 'Seats: <b>' + prefList(c.pref.seats) + '</b> \u00B7 Fabric: <b>' + prefList(c.pref.fabric) +
      '</b> \u00B7 Color: <b>' + prefList(c.pref.color) + '</b> \u00B7 Dashboard: <b>' + prefList(c.pref.dash) +
      '</b> \u00B7 Doors: <b>' + prefList(c.pref.doors) + '</b>';
  }

  function npcAsk(first) {
    customer = pickCustomer();
    injectGuru(customer);
    document.getElementById('briefbar').classList.remove('hidden');
    document.getElementById('briefWho').textContent = customer.name + ' (' + customer.title + ') wants';
    document.getElementById('briefSpec').innerHTML = briefSpecText(customer);
    if (!guru.classList.contains('in')) guru.classList.add('in');
    typeBubble(customer.ask, first ? 14 : 10);
  }

  function npcRestart() {
    finished = false;
    timeLeft = TIME_LIMIT;
    updateTimer();
    hideBubble();
    startTimer();
    npcAsk(false);
  }

  /* ---------- Customer verdict ---------- */
  function evaluateDesign() {
    if (!customer) return { pref: 0, wrongAny: [], wrongStruct: [] };
    var ev = { pref: 0, wrongAny: [], wrongStruct: [] };
    ['seats', 'fabric', 'color', 'dash', 'doors'].forEach(function (cat) {
      var v = state[cat];
      if (customer.pref[cat].indexOf(v) !== -1) ev.pref++;
      else if (customer.wrong[cat].indexOf(v) !== -1) {
        ev.wrongAny.push([cat, v]);
        if (cat === 'seats' || cat === 'dash' || cat === 'doors') ev.wrongStruct.push([cat, v]);
      }
    });
    return ev;
  }

  function moodOf(ev) {
    if (ev.wrongStruct.length > 0) return 'angry';
    if (ev.wrongAny.length === 0 && ev.pref >= 4) return 'perfect';
    if (ev.pref >= 3) return 'good';
    return 'okay';
  }

  /* ---------- MUNDA Quality Report (Max, Quality Monitor) ---------- */
  function clamp100(v) { return Math.max(0, Math.min(100, Math.round(v))); }

  function randomScore() {
    return Math.floor(Math.random() * 41) + 10; /* 10-50 */
  }

  function computeReport(ev) {
    var reqCount = 0;
    ['seats', 'fabric', 'color', 'dash', 'doors'].forEach(function (cat) {
      if (customer.pref[cat].length > 0) reqCount++;
    });
    var fill = clamp100((reqCount ? (ev.pref / reqCount) * 100 : 0) - ev.wrongAny.length * 10);
    /* texture: correct fabric → 100%, otherwise a random 10-50 */
    var texture = customer.pref.fabric.indexOf(state.fabric) !== -1 ? 100 : randomScore();
    /* brightness: color the customer asked for → 100%, otherwise a random 10-50 */
    var bright = customer.pref.color.indexOf(state.color) !== -1 ? 100 : randomScore();
    var overall = Math.round((fill + bright + texture) / 3);
    var grade = overall >= 85 ? 'A' : overall >= 70 ? 'B' : overall >= 55 ? 'C' : overall >= 40 ? 'D' : 'F';
    return { fill: fill, bright: bright, texture: texture, overall: overall, grade: grade };
  }

  function barColor(v) {
    return v >= 80 ? '#6cf08f' : v >= 60 ? '#ffb347' : '#ff6b6b';
  }

  function showReport(ev) {
    var rep = computeReport(ev);
    document.getElementById('reportBlock').classList.remove('hidden');
    function set(id, val) {
      var el = document.getElementById(id);
      el.style.width = val + '%';
      el.style.background = barColor(val);
    }
    set('repFill', rep.fill);
    set('repBright', rep.bright);
    set('repTexture', rep.texture);
    document.getElementById('repFillVal').textContent = rep.fill + '%';
    document.getElementById('repBrightVal').textContent = rep.bright + '%';
    document.getElementById('repTextureVal').textContent = rep.texture + '%';
    var g = document.getElementById('repGrade');
    g.textContent = rep.grade;
    g.style.color = barColor(rep.overall);
    document.getElementById('repOverall').textContent = rep.overall + '/100';
  }

  function showVerdict() {
    var ev = evaluateDesign();
    var mood = moodOf(ev);
    var bonus = timeLeft * 5;
    var sc = ev.pref * 100 + bonus;
    var text;
    if (mood === 'angry') {
      var w = ev.wrongStruct[0];
      var X = (LABELS[w[1]] || w[1]) + ' ' + CAT_LABEL[w[0]];
      text = MOOD_EMOJI.angry + ' ' + customer.angry.replace('{X}', X);
    } else {
      text = MOOD_EMOJI[mood] + ' ' + customer[mood];
    }
    document.getElementById('verdictName').textContent = customer.name + ' \u00B7 ' + customer.title;
    document.getElementById('verdictText').textContent = text;
    document.getElementById('verdictScore').textContent = sc;
    document.getElementById('verdictBonus').textContent = '(+' + bonus + ' time)';
    if (sc > best) {
      best = sc;
      try { localStorage.setItem(BEST_KEY, best); } catch (e) {}
    }
    document.getElementById('verdictBest').textContent = best;
    showReport(ev);
  }

  /* ---------- apply to preview ---------- */
  function toggleVariants(selector, value) {
    var els = document.querySelectorAll(selector);
    for (var i = 0; i < els.length; i++) {
      els[i].style.display = els[i].getAttribute('data-var') === value ? '' : 'none';
    }
  }

  function setPlaceholder(id, show) {
    var el = document.getElementById(id);
    if (el) el.style.display = show ? '' : 'none';
  }

  function applyChoice(cat, val) {
    if (cat === 'seats') { toggleVariants('.seatvar', val); setPlaceholder('phSeats', false); }
    else if (cat === 'dash') { toggleVariants('.dashvar', val); setPlaceholder('phDash', false); }
    else if (cat === 'doors') { toggleVariants('.doorvar', val); setPlaceholder('phDoors', false); }
    else if (cat === 'fabric') {
      document.documentElement.style.setProperty('--fabric', 'url(#pat-' + val + ')');
    }
    else if (cat === 'color') {
      document.documentElement.style.setProperty('--acc', val);
      ambient.style.background =
        'radial-gradient(70% 60% at 50% 45%, ' + hexToRgba(val, 0.28) + ' 0%, ' + hexToRgba(val, 0.10) + ' 50%, transparent 78%)';
      ambient.classList.add('on');
    }
  }

  function hexToRgba(hex, a) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  /* ---------- options rendering ---------- */
  function renderOptions() {
    optionsEl.innerHTML = '';
    var list = OPTIONS[activeTab];
    list.forEach(function (o) {
      var btn = document.createElement('button');
      btn.className = 'opt';
      btn.setAttribute('data-id', o.id);
      if (state[activeTab] === o.id) btn.classList.add('is-active');
      if (o.swatch) {
        var sw = document.createElement('span');
        sw.className = 'opt__swatch';
        sw.style.background = o.swatch;
        btn.appendChild(sw);
      } else {
        var pv = document.createElement('span');
        pv.className = 'opt__preview';
        pv.innerHTML = o.icon;
        btn.appendChild(pv);
      }
      var lb = document.createElement('span');
      lb.className = 'opt__label';
      lb.textContent = o.label;
      btn.appendChild(lb);
      btn.addEventListener('click', function () {
        state[activeTab] = o.id;
        applyChoice(activeTab, o.id);
        renderOptions();
        updateStatus();
      });
      optionsEl.appendChild(btn);
    });
  }

  /* ---------- tabs ---------- */
  tabsEl.addEventListener('click', function (e) {
    var t = e.target.closest('.tab');
    if (!t) return;
    activeTab = t.getAttribute('data-cat');
    var tabs = tabsEl.querySelectorAll('.tab');
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.toggle('is-active', tabs[i] === t);
    renderOptions();
  });

  /* ---------- status + finish ---------- */
  function updateStatus() {
    var required = ['seats', 'dash', 'doors'];
    var done = required.filter(function (c) { return state[c] !== null; }).length;
    var total = required.length;
    statusEl.textContent = done === total ? 'Your design is ready — press Finish!' : done + '/' + total + ' parts chosen';
    finishBtn.disabled = done !== total;
  }

  finishBtn.addEventListener('click', function () {
    if (finishBtn.disabled || finished) return;
    finished = true;
    stopTimer();
    hideBubble();
    // clone the designed interior into the overlay
    var car = document.getElementById('overlayCar');
    car.innerHTML = '';
    car.appendChild(svg.cloneNode(true));
    // chips
    var chips = document.getElementById('chips');
    chips.innerHTML = '';
    var parts = [
      ['Seats', state.seats], ['Fabric', state.fabric], ['Color', state.color],
      ['Dashboard', state.dash], ['Doors', state.doors]
    ];
    parts.forEach(function (p) {
      var chip = document.createElement('span');
      chip.className = 'chip';
      chip.innerHTML = p[0] + ': <b>' + (p[1] === state.color ? LABELS[p[1]] || p[1] : LABELS[p[1]] || p[1]) + '</b>';
      chips.appendChild(chip);
    });
    showVerdict();
    finishOverlay.classList.remove('hidden');
  });

  document.getElementById('againBtn').addEventListener('click', function () {
    finishOverlay.classList.add('hidden');
    resetAll();
    npcRestart();
  });

  document.getElementById('timeAgainBtn').addEventListener('click', function () {
    timeOverlay.classList.add('hidden');
    resetAll();
    npcRestart();
  });

  /* ---------- reset ---------- */
  function resetAll() {
    state = { seats: null, fabric: 'solid', color: '#ff2d95', dash: null, doors: null };
    document.documentElement.style.setProperty('--acc', '#ff2d95');
    document.documentElement.style.setProperty('--fabric', 'url(#pat-solid)');
    toggleVariants('.seatvar', null);
    toggleVariants('.dashvar', null);
    toggleVariants('.doorvar', null);
    setPlaceholder('phSeats', true);
    setPlaceholder('phDash', true);
    setPlaceholder('phDoors', true);
    ambient.classList.remove('on');
    previewTag.textContent = 'Start with an empty interior — choose your parts';
    renderOptions();
    updateStatus();
  }

  /* ---------- sparkles ---------- */
  var STAR = '<svg viewBox="-16 -16 32 32"><path d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14 Z" fill="#ffd0e8"/></svg>';
  var sparkles = document.querySelectorAll('.sparkle');
  for (var i = 0; i < sparkles.length; i++) sparkles[i].innerHTML = STAR;

  /* ---------- boot ---------- */
  try { best = parseInt(localStorage.getItem(BEST_KEY), 10) || 0; } catch (e) { best = 0; }
  document.documentElement.style.setProperty('--acc', '#ff2d95');
  document.documentElement.style.setProperty('--fabric', 'url(#pat-solid)');
  injectGuru();
  renderOptions();
  updateStatus();
  updateTimer();
  startTimer();
  npcAsk(true);
})();
