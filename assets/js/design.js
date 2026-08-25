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

  var state = { seats: null, fabric: 'solid', color: '#ff2d95', dash: null, doors: null };
  var activeTab = 'seats';

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
    if (finishBtn.disabled) return;
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
    finishOverlay.classList.remove('hidden');
  });

  document.getElementById('againBtn').addEventListener('click', function () {
    finishOverlay.classList.add('hidden');
    resetAll();
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
  document.documentElement.style.setProperty('--acc', '#ff2d95');
  document.documentElement.style.setProperty('--fabric', 'url(#pat-solid)');
  renderOptions();
  updateStatus();
})();
