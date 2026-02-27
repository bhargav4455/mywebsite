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

  /* ─── Boot ─────────────────────────────────────────────── */
  function boot() {
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
