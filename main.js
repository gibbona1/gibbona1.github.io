/* =========================================================
   Theme toggle
   ========================================================= */
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
html.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* =========================================================
   Mobile nav
   ========================================================= */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* =========================================================
   Scroll animations (Intersection Observer)
   ========================================================= */
const fadeEls = document.querySelectorAll('.fade-up');

// Assign stagger delays per section
document.querySelectorAll('section, footer').forEach(section => {
  section.querySelectorAll('.fade-up').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
  });
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

/* =========================================================
   Active nav link on scroll
   ========================================================= */
const sections   = document.querySelectorAll('section[id], footer[id]');
const navAnchors = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

/* =========================================================
   Nav shadow on scroll
   ========================================================= */
const nav = document.getElementById('nav');
let lastY = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.style.boxShadow = y > 12 ? '0 1px 20px rgba(0,0,0,0.25)' : '';
  lastY = y;
}, { passive: true });
