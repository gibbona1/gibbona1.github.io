/* ── Theme ─────────────────────────────────────────────────── */
const html = document.documentElement;

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

const saved = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(saved);

document.getElementById('desktopThemeBtn').addEventListener('click', toggleTheme);
document.getElementById('mobileThemeBtn').addEventListener('click', toggleTheme);

/* ── Mobile nav ────────────────────────────────────────────── */
const hamburger   = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');

hamburger.addEventListener('click', () => {
  const open = mobileDrawer.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  mobileDrawer.setAttribute('aria-hidden', String(!open));
});

mobileDrawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
  });
});

/* ── Sidebar nav: active section highlight ─────────────────── */
const navItems = document.querySelectorAll('.nav-item[data-target]');
const sections = Array.from(document.querySelectorAll('section[id]'));

function setActive(id) {
  navItems.forEach(a => {
    a.classList.toggle('active', a.dataset.target === id);
  });
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActive(entry.target.id);
  });
}, { threshold: 0.25, rootMargin: '-10% 0px -60% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// Set first section active on load
if (sections.length) setActive(sections[0].id);

/* ── Scroll animations ─────────────────────────────────────── */
const fadeEls = document.querySelectorAll(
  '.entry, .pub-entry, .skill-row, .prose p, .section-label'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

// Small per-section stagger
document.querySelectorAll('.section').forEach(section => {
  section.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
  });
});

fadeEls.forEach(el => fadeObserver.observe(el));
