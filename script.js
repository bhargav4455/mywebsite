/* ═══════════════════════════════════════════════════════════
   BHARGAVAKATTA.COM — Interactive Engine
   Particles · Typing · Counters · Scroll Reveals · Forms
   ═══════════════════════════════════════════════════════════ */

;(function () {
  'use strict';

  /* ─── Force scroll to top on page load/refresh ─────────── */
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  /* ─── Particle Canvas ──────────────────────────────────── */
  function initParticles() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h, particles;
    const COLORS = [
      'rgba(99, 102, 241, 0.35)',    // indigo
      'rgba(236, 72, 153, 0.25)',    // fuchsia
      'rgba(20, 184, 166, 0.2)',     // teal
      'rgba(255, 255, 255, 0.12)',   // white
    ];
    const COUNT = Math.min(80, Math.floor(window.innerWidth / 16));

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.5 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: COUNT }, createParticle);
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(99, 102, 241, ' + (0.06 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', () => { resize(); });
  }

  /* ─── Typing Animation ────────────────────────────────── */
  function initTyping() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const phrases = [
      'AI & Automation Engineer',
      'Copilot Studio Agent · GitHub Copilot Agent',
      'SRE Agent · Custom Agent · Azure AI',
      'Cloud Infrastructure at Scale',
      'Microsoft · HPCL · HDFC · Indian Railway',
      'Power Platform & Automation',
      'Making Enterprise Work Easier with AI',
    ];
    let phraseIdx = 0, charIdx = 0, deleting = false;

    function type() {
      const current = phrases[phraseIdx];
      if (deleting) {
        el.textContent = current.substring(0, charIdx--);
        if (charIdx < 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(type, 500);
          return;
        }
        setTimeout(type, 35);
      } else {
        el.textContent = current.substring(0, charIdx++);
        if (charIdx > current.length) {
          deleting = true;
          setTimeout(type, 2000);
          return;
        }
        setTimeout(type, 65);
      }
    }

    setTimeout(type, 1200);
  }

  /* ─── Counter Animation ────────────────────────────────── */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const isDecimal = String(target).includes('.');
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = ease * target;

      if (isDecimal) {
        el.textContent = value.toFixed(1);
      } else {
        el.textContent = Math.round(value);
      }

      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = isDecimal ? target.toFixed(1) : target;
    }

    requestAnimationFrame(update);
  }

  /* ─── Skill Bar Animation ──────────────────────────────── */
  function animateSkillBars(container) {
    const fills = container.querySelectorAll('.skill-card__bar-fill');
    fills.forEach(fill => {
      const pct = fill.dataset.width;
      if (pct) fill.style.width = pct + '%';
    });
  }

  /* ─── Scroll Reveal (IntersectionObserver) ─────────────── */
  function initScrollReveal() {
    const els = document.querySelectorAll('.animate-on-scroll');
    if (!els.length) return;

    const counterEls = document.querySelectorAll('[data-count]');
    const counterSet = new Set();

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll--visible');

            // Trigger counters
            if (entry.target.dataset.count && !counterSet.has(entry.target)) {
              counterSet.add(entry.target);
              animateCounter(entry.target);
            }

            // Trigger skill bars
            if (entry.target.classList.contains('skill-card')) {
              animateSkillBars(entry.target);
            }

            // Trigger child counters inside visible containers
            entry.target.querySelectorAll('[data-count]').forEach(c => {
              if (!counterSet.has(c)) {
                counterSet.add(c);
                animateCounter(c);
              }
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    els.forEach(el => observer.observe(el));
    counterEls.forEach(el => {
      if (!el.classList.contains('animate-on-scroll')) observer.observe(el);
    });
  }

  /* ─── Header Scroll Effect ─────────────────────────────── */
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let last = 0;
    function check() {
      const y = window.scrollY;
      header.classList.toggle('header--scrolled', y > 60);
      last = y;
    }

    window.addEventListener('scroll', check, { passive: true });
    check();
  }

  /* ─── Mobile Navigation ────────────────────────────────── */
  function initMobileNav() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');
    const overlay = document.querySelector('.nav-overlay');
    if (!toggle || !menu) return;

    function close() {
      toggle.classList.remove('nav__toggle--active');
      menu.classList.remove('nav__menu--open');
      if (overlay) overlay.classList.remove('nav-overlay--visible');
      document.body.style.overflow = '';
    }

    function open() {
      toggle.classList.add('nav__toggle--active');
      menu.classList.add('nav__menu--open');
      if (overlay) overlay.classList.add('nav-overlay--visible');
      document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', () => {
      menu.classList.contains('nav__menu--open') ? close() : open();
    });

    if (overlay) overlay.addEventListener('click', close);

    menu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', close);
    });
  }

  /* ─── Smooth Scroll ────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* ─── Back to Top ──────────────────────────────────────── */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    function check() {
      btn.classList.toggle('back-to-top--visible', window.scrollY > 500);
    }
    window.addEventListener('scroll', check, { passive: true });
    check();

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Contact Form ─────────────────────────────────────── */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const status = form.querySelector('.contact__form-status');
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        if (status) {
          status.textContent = 'Please fill in all fields.';
          status.className = 'contact__form-status contact__form-status--error';
        }
        return;
      }

      // Email validation
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        if (status) {
          status.textContent = 'Please enter a valid email.';
          status.className = 'contact__form-status contact__form-status--error';
        }
        return;
      }

      // Simulate send
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        if (status) {
          status.textContent = 'Message sent! I\'ll get back to you soon.';
          status.className = 'contact__form-status contact__form-status--success';
        }
        form.reset();
        btn.textContent = originalText;
        btn.disabled = false;

        setTimeout(() => {
          if (status) status.textContent = '';
        }, 5000);
      }, 1200);
    });
  }

  /* ─── Active Nav on Scroll ─────────────────────────────── */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
              link.classList.toggle(
                'nav__link--active',
                link.getAttribute('href') === '#' + id
              );
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    sections.forEach(s => observer.observe(s));
  }

  /* ─── Experience Accordion ───────────────────────────────── */
  function initExpAccordion() {
    const cards = document.querySelectorAll('.exp-card');
    if (!cards.length) return;

    cards.forEach(card => {
      const header = card.querySelector('.exp-card__header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isOpen = card.classList.contains('exp-card--open');

        // Close all cards
        cards.forEach(c => {
          c.classList.remove('exp-card--open');
          const btn = c.querySelector('.exp-card__header');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        // Open clicked card (if it was closed)
        if (!isOpen) {
          card.classList.add('exp-card--open');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ─── Dark Mode Toggle ──────────────────────────────────── */
  function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    // Apply saved theme on load
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (saved === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    toggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  /* ─── Travel Maps ───────────────────────────────────────── */
  function initStatesMap() {
    /* ══ World Countries ══ */
    const worldGrid = document.getElementById('worldGrid');
    if (worldGrid) {
      const visitedCountries = new Set(['IN','US','CA','AE']);

      // [code, name, row, col] — simplified geographic tile grid (25 cols x 13 rows)
      const countries = [
        // ── Row 0: Arctic / Northern ──
        ['IS','Iceland',0,8], ['NO','Norway',0,11], ['SE','Sweden',0,12], ['FI','Finland',0,13], ['RU','Russia',0,16],
        // ── Row 1: Canada + Northern Europe ──
        ['CA','Canada',1,2], ['GL','Greenland',1,7],
        ['UK','United Kingdom',1,9], ['IE','Ireland',1,8], ['DK','Denmark',1,11],
        ['EE','Estonia',1,13], ['LV','Latvia',1,14],
        // ── Row 2: USA + Western Europe ──
        ['US','United States',2,2],
        ['PT','Portugal',2,8], ['ES','Spain',2,9], ['FR','France',2,10], ['BE','Belgium',2,11],
        ['NL','Netherlands',2,12], ['DE','Germany',2,13], ['PL','Poland',2,14], ['LT','Lithuania',2,15],
        ['BY','Belarus',2,16], ['UA','Ukraine',2,17], ['KZ','Kazakhstan',2,19], ['MN','Mongolia',2,21],
        // ── Row 3: Mexico + S.Europe + Central Asia ──
        ['MX','Mexico',3,1],
        ['CH','Switzerland',3,10], ['IT','Italy',3,11], ['AT','Austria',3,12],
        ['CZ','Czechia',3,13], ['SK','Slovakia',3,14], ['HU','Hungary',3,15],
        ['RO','Romania',3,16], ['GE','Georgia',3,17], ['UZ','Uzbekistan',3,19],
        ['KG','Kyrgyzstan',3,20], ['CN','China',3,21], ['JP','Japan',3,23], ['KR','South Korea',3,22],
        // ── Row 4: Central America + Middle East + South Asia ──
        ['CU','Cuba',4,2], ['GT','Guatemala',4,1],
        ['MA','Morocco',4,8], ['DZ','Algeria',4,9], ['TN','Tunisia',4,10], ['LY','Libya',4,11],
        ['GR','Greece',4,12], ['TR','Turkey',4,14], ['SY','Syria',4,15],
        ['IQ','Iraq',4,16], ['IR','Iran',4,17], ['AF','Afghanistan',4,18],
        ['PK','Pakistan',4,19], ['NP','Nepal',4,20], ['BT','Bhutan',4,21],
        // ── Row 5: Caribbean / N.Africa / India / SE Asia ──
        ['CO','Colombia',5,2], ['VE','Venezuela',5,3],
        ['EG','Egypt',5,12], ['SA','Saudi Arabia',5,14], ['AE','UAE',5,16],
        ['OM','Oman',5,17], ['IN','India',5,19], ['BD','Bangladesh',5,20],
        ['MM','Myanmar',5,21], ['TH','Thailand',5,22], ['VN','Vietnam',5,23], ['LA','Laos',5,24],
        // ── Row 6: S.America + Africa ──
        ['EC','Ecuador',6,1], ['BR','Brazil',6,3], ['PE','Peru',6,2],
        ['ML','Mali',6,9], ['NE','Niger',6,10], ['TD','Chad',6,11],
        ['SD','Sudan',6,12], ['ET','Ethiopia',6,13], ['SO','Somalia',6,14],
        ['YE','Yemen',6,15],
        ['LK','Sri Lanka',6,19],
        ['KH','Cambodia',6,22], ['MY','Malaysia',6,23], ['PH','Philippines',6,24],
        // ── Row 7: S.America + Central Africa ──
        ['BO','Bolivia',7,3], ['PY','Paraguay',7,4],
        ['SN','Senegal',7,8], ['GN','Guinea',7,9], ['NG','Nigeria',7,10], ['CM','Cameroon',7,11],
        ['CF','Central African Rep.',7,12], ['SS','South Sudan',7,13],
        ['KE','Kenya',7,14], ['UG','Uganda',7,15],
        ['ID','Indonesia',7,22], ['SG','Singapore',7,23],
        // ── Row 8: S.America + Southern Africa ──
        ['CL','Chile',8,2], ['AR','Argentina',8,3], ['UY','Uruguay',8,4],
        ['GH','Ghana',8,9], ['CI','Ivory Coast',8,8],
        ['CD','DR Congo',8,11], ['TZ','Tanzania',8,13], ['RW','Rwanda',8,14],
        ['MG','Madagascar',8,15],
        ['AU','Australia',8,21], ['PG','Papua New Guinea',8,23],
        // ── Row 9: Tip of S.America + S.Africa ──
        ['AO','Angola',9,10], ['ZM','Zambia',9,11], ['MW','Malawi',9,12],
        ['MZ','Mozambique',9,13], ['ZW','Zimbabwe',9,14],
        // ── Row 10: Southern tips ──
        ['NA','Namibia',10,10], ['BW','Botswana',10,11], ['ZA','South Africa',10,12],
        ['NZ','New Zealand',10,23],
      ];

      countries.forEach(([code, name, row, col]) => {
        const tile = document.createElement('div');
        const isVisited = visitedCountries.has(code);
        tile.className = 'state-tile' + (isVisited ? ' state-tile--visited' : '');
        tile.textContent = code;
        tile.style.gridRow = row + 1;
        tile.style.gridColumn = col + 1;
        tile.title = isVisited ? name + ' — Visited ✓' : name;
        worldGrid.appendChild(tile);
      });
    }

    /* ── US States ── */
    const grid = document.getElementById('statesGrid');
    if (!grid) return;

    const visited = new Set(['WA', 'CA', 'OR']);

    // [abbreviation, row, col] — geographic grid layout
    const states = [
      ['AK',0,0],                                                                     ['ME',0,10],
      ['WA',1,1], ['MT',1,2],          ['ND',1,4], ['MN',1,5], ['WI',1,6],            ['MI',1,8], ['VT',1,9], ['NH',1,10],
      ['OR',2,1], ['ID',2,2], ['WY',2,3], ['SD',2,4], ['IA',2,5], ['IL',2,6], ['IN',2,7], ['OH',2,8], ['NY',2,9], ['MA',2,10], ['CT',2,11], ['RI',2,12],
      ['CA',3,1], ['NV',3,2], ['UT',3,3], ['CO',3,4], ['NE',3,5], ['MO',3,6], ['KY',3,7], ['WV',3,8], ['VA',3,9], ['PA',3,10], ['NJ',3,11],
      ['HI',4,0],             ['AZ',4,2], ['NM',4,3], ['KS',4,4], ['AR',4,5], ['TN',4,6], ['NC',4,7], ['SC',4,8], ['MD',4,9], ['DE',4,10], ['DC',4,11],
                              ['TX',5,3], ['OK',5,4], ['LA',5,5], ['MS',5,6], ['AL',5,7], ['GA',5,8],
                                                                                                       ['FL',6,9],
    ];

    states.forEach(([abbr, row, col]) => {
      const tile = document.createElement('div');
      tile.className = 'state-tile' + (visited.has(abbr) ? ' state-tile--visited' : '');
      tile.textContent = abbr;
      tile.style.gridRow = row + 1;
      tile.style.gridColumn = col + 1;
      tile.title = visited.has(abbr) ? abbr + ' — Visited ✓' : abbr;
      grid.appendChild(tile);
    });

    /* ── India States & UTs (tile grid shaped like India map) ── */
    const indiaGrid = document.getElementById('indiaStatesGrid');
    if (!indiaGrid) return;

    const notVisited = new Set(['JK','GJ','WB','JH','BR','OD','LA','SK','AS','NL','MN','MZ','TR','ML','LD','AN','DD','AR']);

    // [abbreviation, fullName, row, col, span?] - positioned on 12-col x 14-row grid to form India shape
    // Rows 0-1: J&K / Ladakh crown (centred top)
    // Rows 2-3: Punjab belt
    // Rows 4-5: Rajasthan + UP wide belt
    // Rows 6-7: Gujarat bulge + MP/CG + Bihar/JH
    // Rows 8-9: Maharashtra / Telangana / Odisha / WB
    // Rows 10-11: Karnataka / AP peninsula
    // Rows 12-13: Kerala / TN tip
    // NE states offset to right cols 9-11
    const indiaStates = [
      // ── Row 0-1: Crown ──
      ['LA','Ladakh',             0, 6],
      ['JK','Jammu & Kashmir',    1, 5],
      // ── Row 2: Punjab belt ──
      ['HP','Himachal Pradesh',   2, 6],
      ['PB','Punjab',             2, 5],
      ['UK','Uttarakhand',        2, 7],
      // ── Row 3: Haryana / Delhi ──
      ['HR','Haryana',            3, 5],
      ['DL','Delhi',              3, 6],
      ['CH','Chandigarh',         3, 4],
      // ── Row 4: Rajasthan + UP ──
      ['RJ','Rajasthan',          4, 3],
      ['UP','Uttar Pradesh',      4, 6],
      // ── Row 5: Gujarat bulge + MP ──
      ['GJ','Gujarat',            5, 2],
      ['MP','Madhya Pradesh',     5, 5],
      ['BR','Bihar',              5, 8],
      // ── Row 6: DD + Maharashtra + CG + JH + WB ──
      ['DD','Daman & Diu',        6, 2],
      ['MH','Maharashtra',        6, 4],
      ['CG','Chhattisgarh',       6, 6],
      ['JH','Jharkhand',          6, 8],
      // ── Row 7: Goa + Telangana + Odisha + WB ──
      ['GA','Goa',                7, 3],
      ['TS','Telangana',          7, 5],
      ['OD','Odisha',             7, 7],
      ['WB','West Bengal',        7, 9],
      // ── Row 8: Karnataka + AP ──
      ['KA','Karnataka',          8, 4],
      ['AP','Andhra Pradesh',     8, 6],
      // ── Row 9: Kerala + TN + Puducherry ──
      ['KL','Kerala',             9, 4],
      ['TN','Tamil Nadu',         9, 5],
      ['PY','Puducherry',         9, 6],
      // ── Row 10: Tip ──
      ['LD','Lakshadweep',       10, 3],
      // ── Row 12: Andaman & Nicobar ──
      ['AN','Andaman & Nicobar', 12, 8],
      // ── NE States (rows 4-9, cols 9-11) ──
      ['SK','Sikkim',             4, 9],
      ['AR','Arunachal Pradesh',  4,10],
      ['AS','Assam',              5,10],
      ['NL','Nagaland',           5,11],
      ['ML','Meghalaya',          6,10],
      ['MN','Manipur',            6,11],
      ['TR','Tripura',            7,10],
      ['MZ','Mizoram',            7,11],
    ];

    indiaStates.forEach(([abbr, fullName, row, col]) => {
      const tile = document.createElement('div');
      const visited = !notVisited.has(abbr);
      tile.className = 'state-tile' + (visited ? ' state-tile--visited' : '');
      tile.textContent = abbr;
      tile.style.gridRow = row + 1;
      tile.style.gridColumn = col + 1;
      tile.title = visited ? fullName + ' — Visited ✓' : fullName;
      indiaGrid.appendChild(tile);
    });

    /* ── Tab switching ── */
    document.querySelectorAll('.travel-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.travel-tab').forEach(t => t.classList.remove('travel-tab--active'));
        document.querySelectorAll('.travel-panel').forEach(p => p.classList.remove('travel-panel--active'));
        tab.classList.add('travel-tab--active');
        const panel = document.getElementById(tab.dataset.tab + '-panel');
        if (panel) panel.classList.add('travel-panel--active');
      });
    });
  }

  /* ─── Daily Steps Tracker ──────────────────────────────── */
  function initStepsTracker() {
    fetch('data/steps.json')
      .then(r => r.json())
      .then(data => {
        const today = new Date().toISOString().slice(0, 10);
        const entry = data.find(d => d.date === today) || data[data.length - 1];
        const steps = entry.steps;
        const goal = 10000;
        const pct = Math.min(Math.round((steps / goal) * 100), 100);

        // average
        const total = data.reduce((s, d) => s + d.steps, 0);
        const avg = Math.round(total / data.length);

        // streak (consecutive days with 9000+)
        let streak = 0;
        for (let i = data.length - 1; i >= 0; i--) {
          if (data[i].steps >= 9000) streak++;
          else break;
        }

        // date display
        const dateObj = new Date(entry.date + 'T00:00:00');
        const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        // motivational message
        let msg;
        if (pct >= 100) msg = '🎉 Goal crushed! You\'re on fire today!';
        else if (pct >= 90) msg = '🔥 Almost there — just a few more steps!';
        else if (pct >= 70) msg = '💪 Great progress — keep moving!';
        else if (pct >= 50) msg = '👟 Halfway there — you got this!';
        else msg = '🚶 Every step counts — let\'s go!';

        // populate
        const el = id => document.getElementById(id);
        el('steps-date').textContent = dateStr;
        el('steps-count').textContent = steps.toLocaleString();
        el('steps-pct').textContent = pct + '%';
        el('steps-avg').textContent = avg.toLocaleString();
        el('steps-streak').textContent = streak + 'd';
        el('steps-msg').textContent = msg;

        // animate bar
        requestAnimationFrame(() => {
          setTimeout(() => {
            el('steps-bar-fill').style.width = pct + '%';
          }, 300);
        });
      })
      .catch(() => {
        const msg = document.getElementById('steps-msg');
        if (msg) msg.textContent = 'Steps data unavailable';
      });
  }

  /* ─── Boot ─────────────────────────────────────────────── */
  function boot() {
    initThemeToggle();
    initExpAccordion();
    initStatesMap();
    initStepsTracker();
    initParticles();
    initTyping();
    initScrollReveal();
    initHeaderScroll();
    initMobileNav();
    initSmoothScroll();
    initBackToTop();
    initContactForm();
    initActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
