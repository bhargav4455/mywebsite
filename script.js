/* ═══════════════════════════════════════════════════════════
   BHARGAVAKATTA.COM — Interactive Engine
   Particles · Typing · Counters · Scroll Reveals · Forms
   ═══════════════════════════════════════════════════════════ */

;(function () {
  'use strict';

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

  /* ─── US States Map ────────────────────────────────────── */
  function initStatesMap() {
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

    /* ── India SVG Map ── */
    const indiaContainer = document.getElementById('indiaMapContainer');
    if (!indiaContainer) return;

    const notVisited = new Set(['JK','GJ','WB','JH','BR','OD','UP','CH']);
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 520 600');
    svg.setAttribute('class', 'india-svg-map');

    const indiaStates = [
      // ═══ NORTH ═══
      {id:'JK',name:'Jammu & Kashmir',d:'M195,18 L218,10 248,14 268,28 280,52 270,72 250,80 230,78 212,70 195,48Z',lx:235,ly:46},
      {id:'LA',name:'Ladakh',d:'M268,8 L308,12 338,26 342,48 325,60 302,55 280,52 268,28Z',lx:306,ly:36},
      {id:'HP',name:'Himachal Pradesh',d:'M238,80 L262,74 278,86 272,108 256,114 240,108Z',lx:258,ly:96},
      {id:'PB',name:'Punjab',d:'M200,88 L238,80 240,108 226,122 210,126 198,112Z',lx:220,ly:104},
      {id:'UK',name:'Uttarakhand',d:'M278,86 L306,78 324,90 316,114 296,122 272,108Z',lx:298,ly:102},
      // ═══ UPPER PLAINS ═══
      {id:'HR',name:'Haryana',d:'M210,126 L226,122 240,134 244,156 230,166 214,162 204,148Z',lx:225,ly:146},
      {id:'RJ',name:'Rajasthan',d:'M96,168 L156,146 204,152 214,168 212,200 200,236 178,264 150,278 120,282 88,272 72,244 80,208Z',lx:148,ly:220},
      {id:'UP',name:'Uttar Pradesh',d:'M248,134 L314,126 350,140 370,160 364,186 340,202 302,206 272,196 256,182 248,160Z',lx:308,ly:166},
      // ═══ WEST ═══
      {id:'GJ',name:'Gujarat',d:'M54,274 L88,272 118,282 132,310 122,342 100,358 80,362 60,352 50,330 48,302Z',lx:90,ly:318},
      // ═══ CENTRAL ═══
      {id:'MP',name:'Madhya Pradesh',d:'M174,234 L240,222 296,226 322,240 316,274 292,288 252,292 214,288 182,272Z',lx:248,ly:258},
      {id:'CG',name:'Chhattisgarh',d:'M292,272 L328,264 344,280 344,314 324,334 298,328 284,308Z',lx:316,ly:300},
      // ═══ EAST ═══
      {id:'BR',name:'Bihar',d:'M340,166 L370,160 392,170 388,198 368,204 340,202Z',lx:366,ly:184},
      {id:'JH',name:'Jharkhand',d:'M340,202 L368,204 388,220 382,244 362,256 338,250 332,228Z',lx:360,ly:230},
      {id:'WB',name:'West Bengal',d:'M378,180 L398,174 410,188 414,218 406,256 396,286 376,302 370,278 364,256 370,230 375,210 378,192Z',lx:392,ly:238},
      {id:'SK',name:'Sikkim',d:'M372,152 L388,150 390,168 380,174 372,164Z',lx:381,ly:162},
      // ═══ WEST COAST ═══
      {id:'MH',name:'Maharashtra',d:'M100,306 L142,294 182,288 224,294 254,308 254,346 234,370 196,380 154,376 120,370 104,354 98,336Z',lx:178,ly:338},
      {id:'GA',name:'Goa',d:'M118,374 L136,374 136,394 126,400 116,394Z',lx:127,ly:386},
      // ═══ EAST COAST ═══
      {id:'OD',name:'Odisha',d:'M328,306 L364,296 384,302 388,326 378,352 356,362 328,346Z',lx:358,ly:330},
      // ═══ SOUTH CENTRAL ═══
      {id:'TS',name:'Telangana',d:'M202,316 L254,308 280,322 280,356 262,372 232,378 206,362 200,342Z',lx:242,ly:345},
      {id:'AP',name:'Andhra Pradesh',d:'M232,378 L262,372 290,362 314,380 318,420 298,448 268,464 238,454 222,430 216,404Z',lx:268,ly:418},
      // ═══ DEEP SOUTH ═══
      {id:'KA',name:'Karnataka',d:'M112,402 L154,392 200,402 210,430 204,462 190,482 164,490 134,480 120,454 110,430Z',lx:160,ly:445},
      {id:'KL',name:'Kerala',d:'M144,494 L164,490 174,510 170,542 160,562 144,558 140,540 136,516Z',lx:155,ly:528},
      {id:'TN',name:'Tamil Nadu',d:'M192,480 L232,464 272,470 298,454 310,482 300,512 280,538 252,550 228,544 210,524 194,504Z',lx:252,ly:505},
      // ═══ NORTHEAST ═══
      {id:'AR',name:'Arunachal Pradesh',d:'M436,124 L476,120 496,136 492,162 466,168 439,158Z',lx:466,ly:144},
      {id:'AS',name:'Assam',d:'M416,162 L446,158 466,168 472,188 456,208 432,218 412,208 406,188Z',lx:440,ly:188},
      {id:'ML',name:'Meghalaya',d:'M412,214 L432,218 448,212 448,230 432,236 412,230Z',lx:430,ly:224},
      {id:'NL',name:'Nagaland',d:'M466,160 L492,162 496,178 486,194 472,188Z',lx:482,ly:177},
      {id:'MN',name:'Manipur',d:'M472,194 L486,194 492,212 482,226 470,220 466,204Z',lx:479,ly:210},
      {id:'MZ',name:'Mizoram',d:'M462,226 L476,226 482,252 472,268 460,264 456,242Z',lx:470,ly:248},
      {id:'TR',name:'Tripura',d:'M444,236 L458,234 460,258 450,266 440,258Z',lx:450,ly:250},
      // ═══ SMALL UTs ═══
      {id:'CH',name:'Chandigarh',type:'circle',cx:228,cy:120,r:5,lx:228,ly:120},
      {id:'DL',name:'Delhi',type:'circle',cx:244,cy:154,r:6,lx:244,ly:154},
      {id:'DD',name:'Daman & Diu',type:'circle',cx:78,cy:308,r:6,lx:78,ly:308},
      {id:'PY',name:'Puducherry',type:'circle',cx:282,cy:484,r:5,lx:282,ly:484},
      {id:'LD',name:'Lakshadweep',type:'circle',cx:88,cy:502,r:5,lx:88,ly:502},
      {id:'AN',name:'Andaman & Nicobar',type:'dots',dots:[{cx:440,cy:420,r:4},{cx:443,cy:442,r:3},{cx:440,cy:462,r:3}],lx:440,ly:442},
    ];

    indiaStates.forEach(s => {
      const visited = !notVisited.has(s.id);
      const cls = visited ? 'india-state india-state--visited' : 'india-state';
      const lblCls = visited ? 'india-state-label india-state-label--visited' : 'india-state-label';
      const tip = visited ? s.name + ' — Visited ✓' : s.name;

      if (s.type === 'circle') {
        const c = document.createElementNS(ns, 'circle');
        c.setAttribute('cx', s.cx); c.setAttribute('cy', s.cy); c.setAttribute('r', s.r);
        c.setAttribute('class', cls);
        const t = document.createElementNS(ns, 'title'); t.textContent = tip; c.appendChild(t);
        svg.appendChild(c);
      } else if (s.type === 'dots') {
        const g = document.createElementNS(ns, 'g'); g.setAttribute('class', cls);
        s.dots.forEach(d => {
          const c = document.createElementNS(ns, 'circle');
          c.setAttribute('cx', d.cx); c.setAttribute('cy', d.cy); c.setAttribute('r', d.r);
          g.appendChild(c);
        });
        const t = document.createElementNS(ns, 'title'); t.textContent = tip; g.appendChild(t);
        svg.appendChild(g);
      } else {
        const p = document.createElementNS(ns, 'path');
        p.setAttribute('d', s.d); p.setAttribute('class', cls);
        const t = document.createElementNS(ns, 'title'); t.textContent = tip; p.appendChild(t);
        svg.appendChild(p);
      }

      // Add label
      const lbl = document.createElementNS(ns, 'text');
      lbl.setAttribute('x', s.lx); lbl.setAttribute('y', s.ly);
      lbl.setAttribute('class', lblCls);
      lbl.textContent = s.id;
      svg.appendChild(lbl);
    });

    indiaContainer.appendChild(svg);

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

  /* ─── Boot ─────────────────────────────────────────────── */
  function boot() {
    initThemeToggle();
    initExpAccordion();
    initStatesMap();
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
