/* ============================================================
   rating.js — "Rate This Portfolio" Widget
   ------------------------------------------------------------
   Interactive 5-star rating. Selection is held in memory for
   the session (resets on refresh). To persist ratings, POST
   `value` to your endpoint where marked below.
   ============================================================ */

(function initRating() {
  const container = document.getElementById('rate-stars');
  const feedback  = document.getElementById('rate-feedback');
  if (!container) return;

  const stars = Array.from(container.querySelectorAll('.rate-star'));
  let selected = 0;
  let locked = false;

  const messages = {
    1: 'Thanks for the feedback.',
    2: 'Thanks — I appreciate it.',
    3: 'Thanks for rating!',
    4: 'Glad you liked it!',
    5: 'Awesome — thank you! 🎉',
  };

  /* Paint stars up to `n` as active */
  function paint(n) {
    stars.forEach((star, i) => {
      star.classList.toggle('active', i < n);
    });
  }

  stars.forEach(star => {
    const value = Number(star.dataset.value);

    // Hover preview (desktop)
    star.addEventListener('mouseenter', () => {
      if (!locked) paint(value);
    });

    // Click to select
    star.addEventListener('click', () => {
      selected = value;
      locked = true;
      paint(value);
      feedback.textContent = messages[value] || 'Thanks!';
      feedback.classList.add('show');

      /* ── Persist here ──
         fetch('/api/rate', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ rating: value })
         });
      */
      if (window.showToast) {
        window.showToast(`You rated this ${value} star${value > 1 ? 's' : ''}!`, 'success');
      }
    });
  });

  // Reset to selected state when mouse leaves the row
  container.addEventListener('mouseleave', () => {
    paint(locked ? selected : 0);
  });
})();