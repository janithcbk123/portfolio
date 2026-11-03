/* ============================================================
   animations.js — Polish Layer
   ------------------------------------------------------------
   - Scroll-reveal via IntersectionObserver
   - Animated stat counters
   - Scroll progress bar
   - Back-to-top button
   - Global toast helper  ->  window.showToast(msg, type)
   ============================================================ */

(function initPolish() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ────────────────────────────────────────
     1. Scroll-reveal
     ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('visible'));
    } else {
      const revealObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(el => revealObs.observe(el));
    }
  }

  /* ────────────────────────────────────────
     2. Animated stat counters
     ──────────────────────────────────────── */
  function animateCounter(el) {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+)(\D*)$/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2] || '';
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      // leave static
    } else {
      const counterObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach(el => counterObs.observe(el));
    }
  }

  /* ────────────────────────────────────────
     3. Scroll progress bar
     ──────────────────────────────────────── */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ────────────────────────────────────────
     4. Back-to-top button
     ──────────────────────────────────────── */
  const backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ────────────────────────────────────────
     5. Global toast helper
     ──────────────────────────────────────── */
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  window.showToast = function (message, type = 'info', duration = 3500) {
    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    // trigger transition
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };
})();