/* ═══════════════════════════════════════════════════════════
   BHARGAVAKATTA.COM — JavaScript
   Handles: particles, typing, counters, navigation,
   scroll effects, animations, contact form
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── DOM References ─────────────────────────────────────
  const header      = document.getElementById('header');
  const navMenu     = document.getElementById('navMenu');
  const navToggle   = document.getElementById('navToggle');
  const navLinks    = document.querySelectorAll('.nav__link');
  const backToTop   = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');
  const formStatus  = document.getElementById('formStatus');
  const heroCanvas  = document.getElementById('heroCanvas');
  const typingText  = document.getElementById('typingText');

  // ═══════════════════════════════════════════════════════════
  // PARTICLE CANVAS — Floating dots with connecting lines
  // ═══════════════════════════════════════════════════════════
  (function initParticles() {
    if (!heroCanvas) return;

    var ctx = heroCanvas.getContext('2d');
    var particles = [];
    var mouse = { x: null, y: null };
    var PARTICLE_COUNT = 60;
    var CONNECTION_DIST = 120;
    var animId;

    function resize() {
      heroCanvas.width = heroCanvas.offsetWidth;
      heroCanvas.height = heroCanvas.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * heroCanvas.width,
        y: Math.random() * heroCanvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      };
    }

    function initParticleArray() {
      particles = [];
      // Scale particle count for smaller screens
      var count = window.innerWidth < 768 ? Math.floor(PARTICLE_COUNT * 0.4) : PARTICLE_COUNT;
      for (var i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = heroCanvas.width;
        if (p.x > heroCanvas.width) p.x = 0;
        if (p.y < 0) p.y = heroCanvas.height;
        if (p.y > heroCanvas.height) p.y = 0;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, ' + p.opacity + ')';
        ctx.fill();

        // Draw connections
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var dx = p.x - p2.x;
          var dy = p.y - p2.y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            var lineOpacity = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(59, 130, 246, ' + lineOpacity + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse interaction — gentle push
        if (mouse.x !== null) {
          var mdx = p.x - mouse.x;
          var mdy = p.y - mouse.y;
          var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 150) {
            var force = (150 - mDist) / 150 * 0.02;
            p.vx += mdx * force;
            p.vy += mdy * force;
          }
        }

        // Dampen velocity
        p.vx *= 0.999;
        p.vy *= 0.999;
      }

      animId = requestAnimationFrame(drawParticles);
    }

    heroCanvas.addEventListener('mousemove', function (e) {
      var rect = heroCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroCanvas.addEventListener('mouseleave', function () {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', function () {
      resize();
      initParticleArray();
    });

    resize();
    initParticleArray();
    drawParticles();
  })();

  // ═══════════════════════════════════════════════════════════
  // TYPING ANIMATION
  // ═══════════════════════════════════════════════════════════
  (function initTyping() {
    if (!typingText) return;

    var phrases = [
      'Cloud Infrastructure Engineer',
      'Automation & DevOps Specialist',
      'Power Platform Developer',
      'System Management Expert',
      'Enterprise Solutions Architect'
    ];

    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 60;
    var deleteSpeed = 35;
    var pauseTime = 2000;

    function type() {
      var current = phrases[phraseIndex];

      if (isDeleting) {
        typingText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      var delay = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === current.length) {
        delay = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }

      setTimeout(type, delay);
    }

    // Start after a brief delay
    setTimeout(type, 1000);
  })();

  // ═══════════════════════════════════════════════════════════
  // COUNTER ANIMATION (hero stats)
  // ═══════════════════════════════════════════════════════════
  (function initCounters() {
    var counters = document.querySelectorAll('.hero__stat-number[data-count]');
    if (!counters.length) return;

    var animated = false;

    function animateCounters() {
      if (animated) return;
      animated = true;

      counters.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          // Ease-out cubic
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target;
          }
        }

        requestAnimationFrame(step);
      });
    }

    // Trigger when hero stats come into view
    if ('IntersectionObserver' in window) {
      var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.disconnect();
          }
        });
      }, { threshold: 0.5 });

      var statsSection = document.querySelector('.hero__stats');
      if (statsSection) statsObserver.observe(statsSection);
    } else {
      animateCounters();
    }
  })();

  // ─── Mobile Navigation ─────────────────────────────────
  var overlay = null;

  function getOverlay() {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', closeMenu);
    }
    return overlay;
  }

  function openMenu() {
    navMenu.classList.add('nav__menu--open');
    navToggle.classList.add('nav__toggle--active');
    navToggle.setAttribute('aria-expanded', 'true');
    getOverlay().classList.add('nav-overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenu.classList.remove('nav__menu--open');
    navToggle.classList.remove('nav__toggle--active');
    navToggle.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.classList.remove('nav-overlay--visible');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    var isOpen = navMenu.classList.contains('nav__menu--open');
    isOpen ? closeMenu() : openMenu();
  }

  navToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // ─── Header Scroll Effect ──────────────────────────────
  let lastScrollY = 0;
  let ticking = false;

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }

  function updateOnScroll() {
    // Header background
    if (lastScrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    // Back-to-top button
    if (lastScrollY > 500) {
      backToTop.classList.add('back-to-top--visible');
    } else {
      backToTop.classList.remove('back-to-top--visible');
    }

    // Active nav link highlighting
    updateActiveNavLink();

    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ─── Active Nav Link ───────────────────────────────────
  const sections = document.querySelectorAll('.section, .hero');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  // ─── Back to Top ───────────────────────────────────────
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ─── Scroll Animations (Intersection Observer) ─────────
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll--visible');
          observer.unobserve(entry.target); // Animate only once
        }
      });
    }, observerOptions);

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    animatedElements.forEach(function (el) {
      el.classList.add('animate-on-scroll--visible');
    });
  }

  // ─── Contact Form (Frontend-Only) ─────────────────────
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const name    = contactForm.elements.name.value.trim();
      const email   = contactForm.elements.email.value.trim();
      const message = contactForm.elements.message.value.trim();

      if (!name || !email || !message) {
        showFormStatus('Please fill in all required fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate submission (replace with real backend later)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(function () {
        showFormStatus(
          'Thank you, ' + name + '! Your message has been received. I\'ll get back to you soon.',
          'success'
        );
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML =
          'Send Message ' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';
      }, 1500);
    });
  }

  /** Display form status message */
  function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'contact__form-status contact__form-status--' + type;

    // Auto-clear after 6 seconds
    setTimeout(function () {
      formStatus.textContent = '';
      formStatus.className = 'contact__form-status';
    }, 6000);
  }

  /** Validate email format */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ─── Smooth Scroll for Anchor Links ────────────────────
  // Enhances native smooth scroll with offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-height'), 10
        ) || 72;

        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update URL hash without jumping
        history.pushState(null, null, targetId);
      }
    });
  });

  // ─── Initial State ─────────────────────────────────────
  // Trigger scroll handlers on load
  onScroll();

  // Ensure hero animations fire immediately
  document.querySelectorAll('.hero .animate-on-scroll').forEach(function (el) {
    el.classList.add('animate-on-scroll--visible');
  });

})();
