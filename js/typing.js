/* ============================================================
   typing.js — Typewriter Effect for Hero Role
   ------------------------------------------------------------
   Cycles through PORTFOLIO.identity.roles with a typing /
   deleting animation. Respects prefers-reduced-motion.
   ============================================================ */

(function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const roles = (window.PORTFOLIO && PORTFOLIO.identity.roles) || ['DEVELOPER'];

  // Respect reduced-motion: show first role statically
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = roles[0];
    return;
  }

  const TYPE_SPEED = 90;
  const DELETE_SPEED = 55;
  const HOLD_TIME = 1800;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, HOLD_TIME);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
  }

  tick();
})();