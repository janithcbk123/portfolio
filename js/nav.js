/* ============================================================
   nav.js — Navigation Behaviour
   ------------------------------------------------------------
   - Hamburger toggle (mobile)
   - Close menu on link click + outside click
   - Active link highlight based on scroll position (scroll spy)
   ============================================================ */

(function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const nav       = document.getElementById('nav');
  if (!hamburger || !navLinks) return;

  /* ── Toggle mobile menu ── */
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('open');
  });

  /* ── Close on link click ── */
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ── Close on outside click ── */
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navLinks.classList.remove('open');
    }
  });

  /* ── Scroll spy: highlight current section ── */
  const sections = document.querySelectorAll('section[id]');
  const linkMap = {};
  navLinks.querySelectorAll('a[href^="#"]').forEach(a => {
    linkMap[a.getAttribute('href').slice(1)] = a;
  });

  function onScroll() {
    let current = '';
    const offset = (nav ? nav.offsetHeight : 64) + 40;

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - offset) {
        current = section.id;
      }
    });

    Object.entries(linkMap).forEach(([id, link]) => {
      link.classList.toggle('active', id === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();