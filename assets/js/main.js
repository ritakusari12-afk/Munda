/* ===================== MUNDA — main.js ===================== */
(function () {
  'use strict';

  /* ---- Random hero background (rotates through the image set) ---- */
  var backgrounds = [
    'assets/img/bg/bg-home-1.jpg',
    'assets/img/bg/bg-home-2.jpg',
    'assets/img/bg/bg-home-3.jpg',
    'assets/img/bg/bg-14.jpg',
    'assets/img/bg/bg-16.jpg',
    'assets/img/bg/bg-17.jpg',
    'assets/img/bg/bg-23.jpg',
    'assets/img/bg/bg-04.jpg',
    'assets/img/bg/bg-06.jpg'
  ];

  var heroBg = document.getElementById('heroBg');
  if (heroBg) {
    var pick = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    heroBg.style.backgroundImage = 'url(' + pick + ')';

    // Preload the rest so switching later (if we add a cycle) is instant
    backgrounds.forEach(function (src) {
      var img = new Image();
      img.src = src;
    });
  }

  /* ---- Sticky nav shadow on scroll ---- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Reveal-on-scroll (subtle) ---- */
  var revealables = document.querySelectorAll('.card, .feature, .person, .audi, .project, .quote');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealables.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      io.observe(el);
    });
  }
})();
