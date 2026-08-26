/* ===================== MUNDA Light Match — game.js v7 (interior lights) ===================== */
(function () {
  'use strict';

  /* ---------- Textile light shapes (drawn in a 100x100 unit box) ---------- */
  var SHAPES = {
    circle:   { box: '0 0 100 100', el: '<circle CLASS="X" cx="50" cy="50" r="38"/>' },
    square:   { box: '0 0 100 100', el: '<rect CLASS="X" x="12" y="12" width="76" height="76" rx="6"/>' },
    pill:     { box: '0 0 100 48',  el: '<rect CLASS="X" x="2" y="8" width="96" height="32" rx="16"/>' },
    line:     { box: '0 0 100 24',  el: '<rect CLASS="X" x="2" y="2" width="96" height="20" rx="10"/>' },
    triangle: { box: '0 0 100 100', el: '<path CLASS="X" d="M50 8 L92 92 L8 92 Z"/>' },
    diamond:  { box: '0 0 100 100', el: '<path CLASS="X" d="M50 6 L94 50 L50 94 L6 50 Z"/>' },
    hexagon:  { box: '0 0 100 100', el: '<path CLASS="X" d="M28 8 L72 8 L94 50 L72 92 L28 92 L6 50 Z"/>' },
    star:     { box: '0 0 100 100', el: '<path CLASS="X" d="M50 4 L61 36 L94 36 L67 56 L77 90 L50 70 L23 90 L33 56 L6 36 L39 36 Z"/>' }
  };

  /* Light spots on the interior (fractions of the 900x500 frame) */
  var LIGHTS = [
    { shape: 'line',     fx: 0.74, fy: 0.50, s: 1.7,  hs: 0.72 },
    { shape: 'circle',   fx: 0.09, fy: 0.68, s: 1.15, hs: 0.6 },
    { shape: 'pill',     fx: 0.92, fy: 0.68, s: 0.95, hs: 0.72 },
    { shape: 'square',   fx: 0.16, fy: 0.28, s: 1.15, hs: 0.6 },
    { shape: 'diamond',  fx: 0.85, fy: 0.28, s: 1.1,  hs: 0.6 },
    { shape: 'hexagon',  fx: 0.58, fy: 0.72, s: 1.05, hs: 0.6 },
    { shape: 'triangle', fx: 0.34, fy: 0.40, s: 1.15, hs: 0.6 },
    { shape: 'star',     fx: 0.52, fy: 0.42, s: 1.1,  hs: 0.6 }
  ];

  var HOME_XS = [110, 215, 320, 425, 530, 635, 740, 845];
  var HOME_Y = 430;

  var TIME_LIMIT = 75;
  var BEST_KEY = 'munda-light-match-best';

  /* ---------- Design briefs (Luka asks for a style) ---------- */
  var STYLES = [
    {
      key: 'sporty',
      name: 'Sporty & Sharp',
      ask: "Hey! I'm Luka, MUNDA designer. I want a SPORTY design - sharp angular lights: triangles, diamonds, stars, hexagons. Build it and finish fast - time is score!",
      winFast: "That's the sporty design I wanted - sharp, aggressive, and quick! {t}s to spare. Score: {s}. Great pace!",
      winSlow: "The sporty design is lit - but only {t}s left is a slow pace for an aggressive cabin. Score: {s}.",
      lose: "Time's up - the sporty design isn't finished. Sharp means every light locked in, fast. Try again!"
    },
    {
      key: 'elegant',
      name: 'Elegant & Soft',
      ask: "Hey! I'm Luka, MUNDA designer. I want an ELEGANT design - soft, flowing lights: circles, pills, smooth lines. Build it and finish fast - time is score!",
      winFast: "The elegant design I asked for - soft, flowing, and finished with {t}s to spare. Score: {s}. Beautiful!",
      winSlow: "The elegant design came together - a little slowly, but calm and refined. Score: {s}.",
      lose: "Time's up - the elegant design needs every soft light placed. It's not finished yet. Try again!"
    },
    {
      key: 'minimal',
      name: 'Modern & Minimal',
      ask: "Hey! I'm Luka, MUNDA designer. I want a MINIMAL design - clean geometric lights, nothing extra. Build it and finish fast - time is score!",
      winFast: "Clean, minimal, precise - and fast! {t}s to spare. Score: {s}. Exactly my style.",
      winSlow: "Minimal and clean, but slow - precision should be quick. Score: {s}.",
      lose: "Time's up - minimal needs total precision, and there's no time left. Try again!"
    },
    {
      key: 'luxury',
      name: 'Luxury & Bold',
      ask: "Hey! I'm Luka, MUNDA designer. I want a LUXURY design - bold, confident lights that make a statement. Build it and finish fast - time is score!",
      winFast: "Bold, luxurious, and quick - {t}s to spare. Score: {s}. Now THAT is a statement!",
      winSlow: "Luxury takes time, but {t}s left? It's bold, though. Score: {s}.",
      lose: "Time's up - a bold design must be complete to make a statement. Try again!"
    }
  ];

  /* Luka — the corner NPC, drawn as inline SVG (SMIL arm wave + blink) */
  var GURU_SVG =
    '<svg viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">' +
    '  <g>' +
    '    <animateTransform attributeName="transform" type="rotate" values="-8 100 112; 14 100 112; -8 100 112" keyTimes="0;0.5;1" dur="1.7s" repeatCount="indefinite"/>' +
    '    <path d="M100 114 Q122 104 128 86" stroke="#221a2e" stroke-width="15" stroke-linecap="round" fill="none"/>' +
    '    <circle cx="130" cy="82" r="9" fill="#f0c294"/>' +
    '  </g>' +
    '  <path d="M28 170 C28 128 48 110 70 110 C92 110 112 128 112 170 Z" fill="#171726" stroke="#26263a" stroke-width="2"/>' +
    '  <path d="M70 110 L59 128 L70 121 L81 128 Z" fill="#ff2d95"/>' +
    '  <rect x="64" y="96" width="12" height="16" rx="4" fill="#e8b98c"/>' +
    '  <circle cx="70" cy="62" r="34" fill="#f0c294"/>' +
    '  <path d="M36 60 A34 34 0 0 1 104 60 L104 50 C104 34 90 24 70 24 C50 24 36 34 36 50 Z" fill="#221a2e"/>' +
    '  <ellipse cx="57" cy="62" rx="4.2" ry="4.6" fill="#191222">' +
    '    <animate attributeName="ry" values="4.6;4.6;0.5;4.6" keyTimes="0;0.93;0.97;1" dur="3.8s" repeatCount="indefinite"/>' +
    '  </ellipse>' +
    '  <ellipse cx="83" cy="62" rx="4.2" ry="4.6" fill="#191222">' +
    '    <animate attributeName="ry" values="4.6;4.6;0.5;4.6" keyTimes="0;0.93;0.97;1" dur="3.8s" repeatCount="indefinite"/>' +
    '  </ellipse>' +
    '  <g fill="rgba(255,45,149,0.12)" stroke="#ff2d95" stroke-width="2.5">' +
    '    <circle cx="57" cy="62" r="11"/>' +
    '    <circle cx="83" cy="62" r="11"/>' +
    '    <path d="M68 62 L72 62" fill="none"/>' +
    '  </g>' +
    '  <path d="M60 78 Q70 88 80 78" stroke="#8a5a3a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '  <circle cx="70" cy="142" r="8" fill="#ff2d95"/>' +
    '  <path d="M65.5 142 L69 145.5 L75 138" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  /* ---------- State ---------- */
  var score = 0;
  var timeLeft = TIME_LIMIT;
  var filledCount = 0;
  var playing = false;
  var timerId = null;
  var best = 0;
  var style = null;
  var lastStyleKey = null;
  var firstGame = true;
  var hideTimer = null;
  var typeIv = null;

  /* ---------- Elements ---------- */
  var carWrap = document.getElementById('carWrap');
  var svg = document.getElementById('gameSvg');
  var socketsLayer = document.getElementById('socketsLayer');
  var piecesLayer = document.getElementById('piecesLayer');
  var scoreEl = document.getElementById('score');
  var timerFill = document.getElementById('timerFill');
  var timerLabel = document.getElementById('timerLabel');
  var winOverlay = document.getElementById('winOverlay');
  var loseOverlay = document.getElementById('loseOverlay');
  var guru = document.getElementById('guru');
  var guruBubble = document.getElementById('guruBubble');
  var guruName = document.getElementById('guruName');
  var guruText = document.getElementById('guruText');
  var guruBody = document.getElementById('guruBody');

  function spot(def) {
    return { x: def.fx * 900, y: def.fy * 500 };
  }

  /* ---------- Markup ---------- */
  function shapeMarkup(shape, cls) {
    var sh = SHAPES[shape];
    return '<svg x="0" y="0" width="100" height="100" viewBox="' + sh.box + '" preserveAspectRatio="xMidYMid meet">' +
      sh.el.replace('CLASS="X"', 'class="' + cls + '"') +
      '</svg>';
  }

  function pieceMarkup(shape) {
    return '<g class="inner">' + shapeMarkup(shape, 'p-shape') + '</g>';
  }

  function socketMarkup(shape) {
    return shapeMarkup(shape, 'sock') +
      '<circle class="spot-glow" cx="50" cy="50" r="58"/>';
  }

  /* ---------- Sound (Web Audio, no assets) ---------- */
  var SOUND_ON = true;
  var audioCtx = null;

  function ensureAudio() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; }
    }
    if (audioCtx && audioCtx.state === 'suspended') { audioCtx.resume(); }
  }

  function tone(freq, start, dur, type, vol) {
    if (!SOUND_ON || !audioCtx) return;
    var t = audioCtx.currentTime + start;
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  function sndCorrect() { tone(660, 0, 0.12, 'sine', 0.22); tone(990, 0.09, 0.16, 'sine', 0.22); }
  function sndWrong()   { tone(180, 0, 0.25, 'sawtooth', 0.15); }
  function sndWin()     { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, i * 0.12, 0.24, 'sine', 0.2); }); }
  function sndLose()    { tone(330, 0, 0.3, 'triangle', 0.2); tone(220, 0.26, 0.45, 'triangle', 0.2); }

  /* ---------- Helpers ---------- */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function updateScore() { scoreEl.textContent = score; }

  function updateTimer() {
    timerFill.style.width = (timeLeft / TIME_LIMIT) * 100 + '%';
    timerLabel.textContent = timeLeft;
    timerFill.classList.toggle('danger', timeLeft <= 15);
  }

  function defByShape(shape) {
    for (var i = 0; i < LIGHTS.length; i++) {
      if (LIGHTS[i].shape === shape) return LIGHTS[i];
    }
    return null;
  }

  /* transform: translate(cx - 50k, cy - 50k) scale(k) — centers the 100x100 box on (cx, cy) */
  function setTF(p, cx, cy, k) {
    p.setAttribute('transform',
      'translate(' + (cx - 50 * k) + ' ' + (cy - 50 * k) + ') scale(' + k.toFixed(3) + ')');
  }

  function tween(el, fromX, fromY, fromS, toX, toY, toS, dur, done) {
    var t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      setTF(el, fromX + (toX - fromX) * e, fromY + (toY - fromY) * e, fromS + (toS - fromS) * e);
      if (p < 1) requestAnimationFrame(step);
      else if (done) done();
    }
    requestAnimationFrame(step);
  }

  function svgPoint(clientX, clientY) {
    var ctm = svg.getScreenCTM().inverse();
    var pt = svg.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    return pt.matrixTransform(ctm);
  }

  /* ---------- Render ---------- */
  function buildSockets() {
    socketsLayer.innerHTML = '';
    LIGHTS.forEach(function (def) {
      var p = spot(def);
      var s = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      s.setAttribute('class', 'socket');
      s.setAttribute('data-shape', def.shape);
      setTF(s, p.x, p.y, def.s);
      s.innerHTML = socketMarkup(def.shape);
      socketsLayer.appendChild(s);
    });
  }

  function buildPieces() {
    piecesLayer.innerHTML = '';
    var order = shuffle(LIGHTS.slice());
    order.forEach(function (def, i) {
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      p.setAttribute('class', 'part');
      p.setAttribute('data-shape', def.shape);
      p._hx = HOME_XS[i];
      p._hy = HOME_Y;
      p._cx = HOME_XS[i];
      p._cy = HOME_Y;
      p._scale = def.hs;
      setTF(p, p._cx, p._cy, p._scale);
      p.innerHTML = pieceMarkup(def.shape);
      piecesLayer.appendChild(p);
      bindPiece(p);
    });
  }

  /* ---------- Drag & drop ---------- */
  var dragPiece = null;
  var grabDx = 0, grabDy = 0;

  function bindPiece(p) {
    p.addEventListener('pointerdown', function (e) {
      if (!playing || p.classList.contains('placed')) return;
      ensureAudio();
      e.preventDefault();
      var sp = svgPoint(e.clientX, e.clientY);
      grabDx = sp.x - p._cx;
      grabDy = sp.y - p._cy;
      dragPiece = p;
      p.setPointerCapture(e.pointerId);
      p.classList.add('grabbing');
    });

    p.addEventListener('pointermove', function (e) {
      if (dragPiece !== p) return;
      var sp = svgPoint(e.clientX, e.clientY);
      p._cx = sp.x - grabDx;
      p._cy = sp.y - grabDy;
      setTF(p, p._cx, p._cy, 1.05);
    });

    p.addEventListener('pointerup', function (e) {
      if (dragPiece !== p) return;
      dragPiece = null;
      p.classList.remove('grabbing');
      if (!playing) { returnHome(p); return; }
      var sp = svgPoint(e.clientX, e.clientY);
      dropPiece(p, sp.x, sp.y);
    });

    p.addEventListener('pointercancel', function () {
      if (dragPiece !== p) return;
      dragPiece = null;
      p.classList.remove('grabbing');
      returnHome(p);
    });
  }

  function returnHome(p) {
    var def = defByShape(p.getAttribute('data-shape'));
    tween(p, p._cx, p._cy, p._scale, p._hx, p._hy, def.hs, 260, function () {
      p._cx = p._hx; p._cy = p._hy; p._scale = def.hs;
    });
  }

  function dropPiece(piece, sx, sy) {
    var shape = piece.getAttribute('data-shape');
    var sockets = socketsLayer.querySelectorAll('.socket');
    for (var i = 0; i < sockets.length; i++) {
      var s = sockets[i];
      if (s.classList.contains('filled')) continue;
      var r = s.getBoundingClientRect();
      var p1 = svgPoint(r.left, r.top);
      var p2 = svgPoint(r.right, r.bottom);
      if (sx >= Math.min(p1.x, p2.x) && sx <= Math.max(p1.x, p2.x) &&
          sy >= Math.min(p1.y, p2.y) && sy <= Math.max(p1.y, p2.y)) {
        if (s.getAttribute('data-shape') === shape) { placePiece(piece, s); return; }
        wrongDrop(piece, s);
        return;
      }
    }
    returnHome(piece);
  }

  function placePiece(piece, socket) {
    var def = defByShape(piece.getAttribute('data-shape'));
    if (!def) return;
    var p = spot(def);

    score += 100;
    updateScore();
    sndCorrect();
    floatText(p.x, p.y, '+100');

    tween(piece, piece._cx, piece._cy, piece._scale, p.x, p.y, def.s, 300, function () {
      piece._cx = p.x; piece._cy = p.y; piece._scale = def.s;
    });

    socket.classList.add('filled');
    piece.classList.add('placed');

    filledCount++;
    if (filledCount === 1) hideBubble(); /* the ask is done — player is building */
    if (filledCount === LIGHTS.length) win();
  }

  function wrongDrop(piece, socket) {
    score = Math.max(0, score - 25);
    updateScore();
    socket.classList.add('flash');
    setTimeout(function () { socket.classList.remove('flash'); }, 350);
    sndWrong();
    returnHome(piece);
  }

  function floatText(x, y, text) {
    var f = document.createElement('span');
    f.className = 'float';
    f.textContent = text;
    f.style.left = (x / 900 * 100) + '%';
    f.style.top = (y / 500 * 100) + '%';
    carWrap.appendChild(f);
    setTimeout(function () { f.remove(); }, 850);
  }

  /* ---------- Timer ---------- */
  function startTimer() {
    stopTimer();
    timerId = setInterval(function () {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) lose();
    }, 1000);
  }

  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }

  /* ---------- Luka (corner NPC) ---------- */
  function injectGuru() {
    guruBody.innerHTML = GURU_SVG;
  }

  function showBubble() { guruBubble.classList.add('show'); }

  function hideBubble() {
    guruBubble.classList.remove('show');
    if (typeIv) { clearInterval(typeIv); typeIv = null; }
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
  }

  function setBubble(text) {
    guruName.textContent = 'Luka \u00B7 MUNDA Designer';
    guruText.textContent = text;
    guruText.classList.remove('typing');
  }

  function typeBubble(text, speed, done) {
    if (typeIv) clearInterval(typeIv);
    showBubble();
    guruName.textContent = 'Luka \u00B7 MUNDA Designer';
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

  function pickStyle() {
    var pool = [];
    for (var i = 0; i < STYLES.length; i++) {
      if (STYLES[i].key !== lastStyleKey) pool.push(STYLES[i]);
    }
    var s = pool[Math.floor(Math.random() * pool.length)];
    lastStyleKey = s.key;
    return s;
  }

  /* slide in + ask for a style while the timer runs (game stays untouched) */
  function npcAsk(first) {
    style = pickStyle();
    if (!guru.classList.contains('in')) guru.classList.add('in');
    typeBubble(style.ask, first ? 14 : 10, function () {
      hideTimer = setTimeout(hideBubble, 5500);
    });
  }

  /* short verdict after the game — mentions the time-based score */
  function npcVerdict(won) {
    if (!style) return;
    var text = won ? (timeLeft >= 40 ? style.winFast : style.winSlow) : style.lose;
    if (won) text = text.replace('{t}', timeLeft).replace('{s}', score);
    showBubble();
    setBubble(text);
    hideTimer = setTimeout(hideBubble, 8000);
  }

  /* ---------- End states ---------- */
  function win() {
    playing = false;
    stopTimer();
    carWrap.classList.add('lit');
    var bonus = timeLeft * 5;
    score += bonus;
    updateScore();
    document.getElementById('finalScore').textContent = score;
    document.getElementById('timeBonus').textContent = '+' + bonus;
    if (score > best) {
      best = score;
      try { localStorage.setItem(BEST_KEY, best); } catch (e) {}
    }
    document.getElementById('bestScore').textContent = best;
    sndWin();
    setTimeout(function () {
      winOverlay.classList.remove('hidden');
      npcVerdict(true);
    }, 900);
  }

  function lose() {
    playing = false;
    stopTimer();
    document.getElementById('loseScore').textContent = score;
    document.getElementById('bestScore2').textContent = best;
    sndLose();
    loseOverlay.classList.remove('hidden');
    npcVerdict(false);
  }

  /* ---------- Start / restart ---------- */
  function startGame() {
    score = 0;
    timeLeft = TIME_LIMIT;
    filledCount = 0;
    playing = true;
    carWrap.classList.remove('lit');
    winOverlay.classList.add('hidden');
    loseOverlay.classList.add('hidden');
    updateScore();
    updateTimer();
    buildSockets();
    buildPieces();
    startTimer();
    hideBubble();
    npcAsk(firstGame);
    firstGame = false;
  }

  /* ---------- Sparkles: inject the 4-point star shape into every .sparkle ---------- */
  var STAR = '<svg viewBox="-16 -16 32 32"><path d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14 Z" fill="#ffd0e8"/></svg>';
  var sparkles = document.querySelectorAll('.sparkle');
  for (var i = 0; i < sparkles.length; i++) {
    sparkles[i].innerHTML = STAR;
  }

  /* ---------- Sound toggle ---------- */
  var soundBtn = document.getElementById('soundToggle');
  soundBtn.addEventListener('click', function () {
    SOUND_ON = !SOUND_ON;
    ensureAudio();
    soundBtn.textContent = SOUND_ON ? '🔊' : '🔇';
  });

  /* ---------- Restart buttons ---------- */
  document.getElementById('restartWinBtn').addEventListener('click', startGame);
  document.getElementById('restartLoseBtn').addEventListener('click', startGame);

  /* ---------- Boot ---------- */
  try { best = parseInt(localStorage.getItem(BEST_KEY), 10) || 0; } catch (e) { best = 0; }
  injectGuru();
  startGame();
})();
