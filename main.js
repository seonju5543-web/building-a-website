/* =====================
   LOADER
===================== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    initHeroAnimations();
  }, 1500);
});
document.body.classList.add('loading');

/* =====================
   HERO ENTRANCE
===================== */
function initHeroAnimations() {
  const eyebrow = document.querySelector('.hero__eyebrow');
  const words    = document.querySelectorAll('.hero__title-line');
  const divider  = document.querySelector('.hero__divider');
  const fades    = document.querySelectorAll('.hero .reveal-fade');

  // staggered entrance
  setTimeout(() => eyebrow && eyebrow.classList.add('in-view'), 100);
  words.forEach((w, i) => setTimeout(() => w.classList.add('in-view'), 300 + i * 120));
  setTimeout(() => divider && divider.classList.add('in-view'), 650);
  fades.forEach((el, i) => setTimeout(() => el.classList.add('in-view'), 800 + i * 120));
}

/* =====================
   NAV: scroll shrink
===================== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* =====================
   NAV: mobile toggle
===================== */
const toggle  = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  toggle.classList.remove('open');
  navLinks.classList.remove('open');
}));

/* =====================
   PARALLAX HERO BG
===================== */
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroBg && y < window.innerHeight) {
    heroBg.style.transform = `translateY(${y * 0.3}px) scale(1.05)`;
  }
}, { passive: true });

/* =====================
   INTERSECTION OBSERVER
===================== */
const ioOptions = { threshold: 0.12 };

const mainObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');
    mainObserver.unobserve(entry.target);
  });
}, ioOptions);

document.querySelectorAll('.reveal-up, .reveal-right, .reveal-fade').forEach(el => {
  if (!el.closest('.hero')) mainObserver.observe(el);
});

/* Stagger children in groups */
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stagger').forEach((el, i) => {
      setTimeout(() => el.classList.add('in-view'), i * 90);
    });
    staggerObserver.unobserve(entry.target);
  });
}, { threshold: 0.08 });

document.querySelectorAll('.menu__list, .menu__featured, .hours, .about__stats').forEach(el => {
  staggerObserver.observe(el);
});

/* =====================
   COUNTER ANIMATION
===================== */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat__num').forEach(el => {
      const target = +el.dataset.count;
      const duration = 1400;
      const start = performance.now();
      const animate = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.floor(ease * target);
        if (p < 1) requestAnimationFrame(animate);
        else el.textContent = target;
      };
      requestAnimationFrame(animate);
    });
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.about__stats');
if (statsEl) counterObserver.observe(statsEl);

/* =====================
   MENU TABS
===================== */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const t = tab.dataset.tab;
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.menu__panel').forEach(x => x.classList.remove('active'));
    tab.classList.add('active');

    const panel = document.querySelector(`[data-panel="${t}"]`);
    panel.classList.add('active');

    // re-trigger stagger for newly shown items
    panel.querySelectorAll('.stagger').forEach((el, i) => {
      el.classList.remove('in-view');
      setTimeout(() => el.classList.add('in-view'), 40 + i * 70);
    });
  });
});

/* Initial stagger for visible panel */
document.querySelectorAll('.menu__panel.active .stagger').forEach((el, i) => {
  setTimeout(() => el.classList.add('in-view'), 200 + i * 80);
});

/* =====================
   SMOOTH HOVER on rows
===================== */
document.querySelectorAll('.menu__row').forEach(row => {
  row.addEventListener('mouseenter', () => {
    row.style.paddingLeft = '.6rem';
  });
  row.addEventListener('mouseleave', () => {
    row.style.paddingLeft = '';
  });
});
