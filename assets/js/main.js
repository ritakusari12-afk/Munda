/* ===================== MUNDA — main.js ===================== */
(function () {
  'use strict';

  /* ============ Language (DE / EN) ============ */
  var LANG_KEY = 'munda-lang';
  var DEFAULT_LANG = 'en';

  var translations = {
    en: {
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.technology': 'Technology',
      'nav.projects': 'Projects',
      'nav.team': 'Team',
      'nav.contact': 'Contact',

      'hero.tagline': 'Textile Lighting Systems',
      'hero.title': 'The world of textile light',
      'hero.sub': 'We combine the know-how of technical textiles with LED-based lighting technology to create something entirely new — light woven into fabric.',
      'hero.cta1': 'Discover our projects',
      'hero.cta2': 'About MUNDA',

      'about.eyebrow': 'About us',
      'about.title': 'A joint venture creating a new technology',
      'about.intro1': 'In summer 2019, <strong>AUNDE</strong> and <strong>MENTOR</strong> founded <strong>MUNDA Textile Lichtsysteme GmbH</strong> in Erkrath, Germany, as equal partners. Our name — MUNDA, derived from <strong>MEN</strong>TOR and <strong>A</strong>UNDE — symbolises the idea behind the joint venture: two companies with one shared goal, each contributing their core competence to enable something new.',
      'about.intro2': 'Textile lighting systems — built to the highest technical standard and ready for series production in the most demanding industries.',
      'about.card1.tag': 'Partner · Technical Textiles',
      'about.card1.body': "Founded in 1899 in Mönchengladbach, AUNDE is one of the world's leading automotive suppliers. Its brands — AUNDE, ISRINGHAUSEN and FEHRER — produce yarns, technical textiles, foams, seat covers, seats, technical springs and interior modules for the world's leading car makers. AUNDE contributes the know-how in technical textiles.",
      'about.card1.label': 'employees · 117 plants · 28 countries',
      'about.card2.tag': 'Partner · Integrated Light',
      'about.card2.body': "Founded in 1920, MENTOR is a leading German specialist for product-integrated light and a recognised development partner and series supplier to major automotive manufacturers and OEMs. With production sites on three continents and representation in more than 40 countries, MENTOR contributes decades of experience in LED-based lighting technology.",
      'about.card2.label': 'years of lighting expertise',
      'about.quote1.text': '“With MUNDA\'s textile lighting systems we meet these new requirements and help create entirely new customer experiences.”',
      'about.quote1.cite': 'Rolf Königs — CEO, AUNDE Group',
      'about.quote2.text': '“The technology emerging at MUNDA opens up new fields of application and further growth opportunities for us in many industries.”',
      'about.quote2.cite': 'Wido Weyer — Managing Partner, MENTOR',

      'tech.eyebrow': 'Technology',
      'tech.title': 'How textile light works',
      'tech.p1': 'A textile lighting system consists of one or more LED light sources and a textile material — individual fibres or a woven fabric that acts as the light guide. Clear polymer optical fibres (POFs made of PMMA) are woven as weft threads together with warp threads of white polyester yarn to form light-conducting fibre mats.',
      'tech.p2': 'The light-conducting fibres are gathered in a ferrule and connected to the LED module. The light typically exits through the side of the fibre or fabric (<em>lateral coupling</em>) — the surface is activated at the desired emission areas with individual, light-scattering structures. A decorative cover fabric is applied on top, with an optional diffuser and reflector layer. When the mat is not activated, light exits at the end — <em>axial coupling</em> — ideal for line lighting.',
      'tech.p3': 'The LED modules — monochrome, white or RGB — integrate the LED, its driver and thermoelements, with a special mixing optic that distributes the light evenly across all polished fibre ends.',
      'tech.subtitle': 'The advantages of textile lighting',
      'tech.f1.title': 'Optimal use of installation space',
      'tech.f1.body': 'The light guide needs under 5 mm for its entire construction and can be deformed almost freely in a spherical way. Light can be integrated where other technologies reach their limits — even in complex package situations, and in facelifts and relaunches with minimal process changes.',
      'tech.f2.title': 'No initial tooling investment',
      'tech.f2.body': 'Unlike plastic injection moulding, textile lighting requires no component-specific tooling. Short development times and very economical production — even for small series.',
      'tech.f3.title': 'Large surfaces, free forms, dynamic light',
      'tech.f3.body': 'Confectionable and drapable, textile lighting is predestined for lighting larger areas and free forms — and for realising dynamic, individual light scenarios.',

      'projects.eyebrow': 'Projects',
      'projects.title': 'Textile light, in series production',
      'projects.badge': 'Flagship · 2024',
      'projects.audiTitle': 'Audi A3 — Facelift 2024',
      'projects.lead': 'The first series-production vehicle with textile lighting from MUNDA.',
      'projects.body': 'With the new Audi A3 facelift, our textile lighting systems celebrate their world premiere in summer 2024. As the first automotive manufacturer in the world, Audi integrates our textile light system into the door panels of a series vehicle — impressive proof of how large-surface ambient lighting can be integrated aesthetically <em>and safely</em>, even in crash-sensitive zones.',
      'projects.p1': "World's first series vehicle with MUNDA textile light",
      'projects.p2': 'Integrated into the door trim panels',
      'projects.p3': 'Large-surface ambient lighting in crash-sensitive zones',
      'projects.awards': 'Recognised for design and innovation',

      'team.eyebrow': 'People',
      'team.title': 'The team behind MUNDA',
      'team.intro': 'A committed, dynamic team working with the spirit of a start-up — backed by strong partners. Our managing directors and points of contact:',
      'team.role1': 'Managing Director · MUNDA',
      'team.role2': 'Managing Director · AUNDE / Sales AUNDE',
      'team.role3': 'Sales · MENTOR',
      'team.role4': 'Marketing · MUNDA',

      'contact.eyebrow': 'Contact',
      'contact.title': 'Get in touch',
      'contact.c2title': 'Reach us',
      'contact.c3title': 'Partners',

      'footer.text': 'MUNDA Textile Lichtsysteme GmbH · A joint venture of AUNDE &amp; MENTOR<br />Textile Lighting Systems for the automotive industry and beyond.',
      'footer.legal': 'MUNDA Textile Lichtsysteme GmbH. All rights reserved.'
    },

    de: {
      'nav.home': 'Start',
      'nav.about': 'Unternehmen',
      'nav.technology': 'Technologie',
      'nav.projects': 'Projekte',
      'nav.team': 'Team',
      'nav.contact': 'Kontakt',

      'hero.tagline': 'Textile Lichtsysteme',
      'hero.title': 'Die Welt des textilen Lichts',
      'hero.sub': 'Wir verbinden das Know-how technischer Textilien mit dem Wissen rund um LED-basierte Lichttechnik – und schaffen so etwas wirklich Neues: Licht, gewebt in Textil.',
      'hero.cta1': 'Entdecken Sie unsere Projekte',
      'hero.cta2': 'Über MUNDA',

      'about.eyebrow': 'Über uns',
      'about.title': 'Ein Joint Venture schafft eine neue Technologie',
      'about.intro1': 'Im Sommer 2019 gründen die beiden Unternehmen <strong>AUNDE</strong> und <strong>MENTOR</strong> als gleichberechtigte Partner das Gemeinschaftsunternehmen <strong>MUNDA Textile Lichtsysteme GmbH</strong> in Erkrath. Unser Name MUNDA, abgeleitet von <strong>MEN</strong>TOR und <strong>A</strong>UNDE, symbolisiert den Grundgedanken des Joint Ventures: Zwei Unternehmen mit einem gemeinsamen Ziel bringen ihre jeweiligen Kernkompetenzen ein und ermöglichen etwas Neues.',
      'about.intro2': 'Textile Lichtsysteme – auf höchstem technischem Niveau und geeignet für den Einsatz in der Serienproduktion höchst anspruchsvoller Branchen.',
      'about.card1.tag': 'Partner · Technische Textilien',
      'about.card1.body': '1899 in Mönchengladbach gegründet, ist AUNDE einer der weltweit führenden Automobilzulieferer. Die Marken AUNDE, ISRINGHAUSEN und FEHRER produzieren unter anderem Garne, technische Textilien, Schäume, Sitzbezüge, Sitze, technische Federn und Interieurmodule für die führenden Automobilhersteller weltweit. AUNDE bringt das Know-how im Bereich technischer Textilien ein.',
      'about.card1.label': 'Mitarbeiter · 117 Werke · 28 Länder',
      'about.card2.tag': 'Partner · Integriertes Licht',
      'about.card2.body': '1920 gegründet, ist MENTOR für bedeutende Automobilhersteller und namhafte OEMs anderer Branchen anerkannter Entwicklungspartner und Serienlieferant. Mit Produktionsstandorten auf drei Kontinenten und Vertretungen für mehr als 40 Länder bringt MENTOR jahrzehntelange Erfahrung mit LED-basierter Lichttechnik ein.',
      'about.card2.label': 'Jahre Licht-Erfahrung',
      'about.quote1.text': '„Mit textilen Lichtsystemen von MUNDA werden wir diesen neuen Anforderungen gerecht und helfen, ganz neue Kundenerlebnisse zu kreieren.“',
      'about.quote1.cite': 'Rolf Königs – CEO der AUNDE Gruppe',
      'about.quote2.text': '„Die bei MUNDA entstehende Technologie eröffnet uns in vielen Branchen neue Einsatzfelder und weitere Wachstumsmöglichkeiten.“',
      'about.quote2.cite': 'Wido Weyer – Geschäftsführender Gesellschafter, MENTOR',

      'tech.eyebrow': 'Technologie',
      'tech.title': 'Wie textiles Licht funktioniert',
      'tech.p1': 'Ein textiles Lichtsystem besteht aus einer oder mehreren LED-Lichtquellen und einem textilen Material – einzelnen Fasern oder einem Gewebe, das als Lichtleiter dient. Klare Polymer-optische Fasern (POFs aus PMMA) werden als Schussfäden mit Kettfäden aus weißem Polyestergarn zu lichtleitenden Fasermatten verwebt.',
      'tech.p2': 'Die lichtleitenden Fasern werden in einer Ferrule zusammengeführt und mit dieser an die LED-Module angebunden. Das Licht tritt in der Regel seitlich aus der Faser bzw. dem Gewebe aus (<em>laterale Auskopplung</em>) – das Gewebe wird an den gewünschten Lichtaustrittsbereichen mit individuellen, lichtstreuenden Oberflächenstrukturen aktiviert. Davor wird ein Deckstoff appliziert, optional mit Diffusorstoff und Reflektorschicht. Wird die Fasermatte nicht aktiviert, tritt das Licht am Ende aus – <em>axiale Auskopplung</em> – ideal für Linienbeleuchtung.',
      'tech.p3': 'Die für textile Lichtsysteme entwickelten LED-Module – monochrom, weiß oder RGB – integrieren die LED, ihren Treiber und Thermoelemente, mit einer speziellen Mischoptik, die das Licht gleichmäßig auf alle polierten Faserenden verteilt.',
      'tech.subtitle': 'Die Vorteile textiler Lichtlösungen',
      'tech.f1.title': 'Optimale Nutzung des Bauraums',
      'tech.f1.body': 'Der Lichtleiter benötigt für seinen gesamten Aufbau keine 5 mm und lässt sich sphärisch nahezu frei verformen. Licht lässt sich dort integrieren, wo andere Technologien an ihre Grenzen stoßen – auch in Facelifts und Relaunches mit minimalen Anpassungen der Fügeprozesse.',
      'tech.f2.title': 'Keine initiale Werkzeuginvestition',
      'tech.f2.body': 'Anders als beim Kunststoff-Spritzguss fallen bei textilen Lichtlösungen keine initialen bauteilspezifischen Werkzeuginvestitionen an. Kurze Entwicklungszeiten und eine sehr wirtschaftliche Produktion – auch bei Kleinserien.',
      'tech.f3.title': 'Große Flächen, freie Formen, dynamisches Licht',
      'tech.f3.body': 'Konfektionier- und drapierbar, sind textile Lichtlösungen prädestiniert für die Beleuchtung größerer Flächen und freier Formen – und für die Realisierung dynamischer, individueller Lichtszenarien.',

      'projects.eyebrow': 'Projekte',
      'projects.title': 'Textiles Licht in Serie',
      'projects.badge': 'Vorzeigeprojekt · 2024',
      'projects.audiTitle': 'Audi A3 – Facelift 2024',
      'projects.lead': 'Das erste Serienfahrzeug mit textilen Lichtlösungen von MUNDA.',
      'projects.body': 'Mit dem neuen Audi A3 Facelift feiern unsere textilen Lichtsysteme im Sommer 2024 Premiere. Als weltweit erster Automobilhersteller integriert Audi unser textiles Lichtsystem in die Türverkleidungen eines Serienfahrzeugs – eindrucksvoller Beweis, wie sich großflächige Ambientebeleuchtung auch in crashempfindlichen Zonen ästhetisch und sicher integrieren lässt.',
      'projects.p1': 'Weltweit erstes Serienfahrzeug mit MUNDA-Textillicht',
      'projects.p2': 'Integriert in die Türverkleidungen',
      'projects.p3': 'Großflächige Ambientebeleuchtung in crashempfindlichen Zonen',
      'projects.awards': 'Ausgezeichnet für Design und Innovation',

      'team.eyebrow': 'Menschen',
      'team.title': 'Das Team hinter MUNDA',
      'team.intro': 'Ein engagiertes, dynamisches Team, das mit Leidenschaft und großem Enthusiasmus an der Entwicklung einer neuen Technologie arbeitet – mit dem Spirit eines Start-Ups und starken Partnern im Rücken. Unsere Geschäftsführung und Ansprechpartner:innen:',
      'team.role1': 'Geschäftsführer · MUNDA',
      'team.role2': 'Geschäftsführer · AUNDE / Vertrieb AUNDE',
      'team.role3': 'Vertrieb · MENTOR',
      'team.role4': 'Marketing · MUNDA',

      'contact.eyebrow': 'Kontakt',
      'contact.title': 'Kontaktieren Sie uns',
      'contact.c2title': 'Erreichen Sie uns',
      'contact.c3title': 'Partner',

      'footer.text': 'MUNDA Textile Lichtsysteme GmbH · Ein Joint Venture von AUNDE &amp; MENTOR<br />Textile Lichtsysteme für die Automobilindustrie und darüber hinaus.',
      'footer.legal': 'MUNDA Textile Lichtsysteme GmbH. Alle Rechte vorbehalten.'
    }
  };

  function currentLang() {
    var saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
    return translations[saved] ? saved : DEFAULT_LANG;
  }

  function applyLang(lang) {
    var dict = translations[lang];
    if (!dict) return;
    document.documentElement.lang = lang;

    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      if (dict[key] !== undefined) els[i].innerHTML = dict[key];
    }

    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    var btns = document.querySelectorAll('.lang-btn');
    for (var b = 0; b < btns.length; b++) {
      btns[b].classList.toggle('is-active', btns[b].getAttribute('data-lang') === lang);
    }

    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  /* ---- Language switcher ---- */
  var langSwitch = document.getElementById('langSwitch');
  if (langSwitch) {
    langSwitch.addEventListener('click', function (e) {
      var target = e.target;
      while (target && target !== langSwitch && !target.classList.contains('lang-btn')) {
        target = target.parentNode;
      }
      if (target && target.classList && target.classList.contains('lang-btn')) {
        applyLang(target.getAttribute('data-lang'));
      }
    });
  }

  /* ---- Random hero background ---- */
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

    // Preload the rest so a future cycle/switch is instant
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
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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

  /* ---- Apply saved language on load ---- */
  applyLang(currentLang());
})();
