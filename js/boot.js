/* ============================================================
   boot.js — Terminal Boot-Sequence Animation
   ------------------------------------------------------------
   Plays a brief monospace "system boot" log on page load,
   then fades to reveal the site. Skippable by click/key.
   Respects prefers-reduced-motion (skips straight through).
   Shows once per session (sessionStorage), so navigating
   back doesn't replay it.
   ============================================================ */

(function initBoot() {
  const screen = document.getElementById('boot-screen');
  const term   = document.getElementById('boot-terminal');
  if (!screen || !term) return;

  const reduceMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Skip if already shown this session, or reduced motion */
  let alreadyShown = false;
  try { alreadyShown = sessionStorage.getItem('booted') === '1'; } catch (e) {}

  function finish() {
    screen.classList.add('done');
    try { sessionStorage.setItem('booted', '1'); } catch (e) {}
    setTimeout(() => screen.remove(), 600);
    screen.removeEventListener('click', finish);
    document.removeEventListener('keydown', finish);
  }

  if (alreadyShown || reduceMotion) {
    screen.remove();
    return;
  }

  // Lock scroll during boot
  document.body.style.overflow = 'hidden';
  function unlock() { document.body.style.overflow = ''; }

  const name = (window.PORTFOLIO && PORTFOLIO.identity.name) || 'Developer';
  const mac = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join(':').toUpperCase();

  /* Each line: text + the delay (ms) before the NEXT line.
     [ok]/[--] tags get colorized via spans. */
  const lines = [
    { t: 'boot: initializing system .................. <span class="ok">[ OK ]</span>', d: 180 },
    { t: 'cpu : ARM Cortex-M7 @ 480MHz detected ...... <span class="ok">[ OK ]</span>', d: 140 },
    { t: 'mem : 2048 KB SRAM / 16 MB flash ........... <span class="ok">[ OK ]</span>', d: 140 },
    { t: `net : eth0 MAC ${mac} ......... <span class="ok">[ OK ]</span>`, d: 160 },
    { t: 'i2c : scanning bus ........................ <span class="ok">[ OK ]</span>', d: 120 },
    { t: 'gpio: configuring peripherals ............. <span class="ok">[ OK ]</span>', d: 120 },
    { t: 'rtos: scheduler started ................... <span class="ok">[ OK ]</span>', d: 200 },
    { t: '', d: 120 },
    { t: `mounting profile: <span class="hl">${name.toLowerCase().replace(/\s+/g, '_')}</span>`, d: 220 },
    { t: 'launching portfolio interface ............. <span class="ok">[ DONE ]</span>', d: 420 },
  ];

  let i = 0;
  function typeLine() {
    if (i >= lines.length) {
      setTimeout(finish, 250);
      return;
    }
    const line = document.createElement('div');
    line.className = 'boot-line';
    line.innerHTML = lines[i].t || '&nbsp;';
    term.appendChild(line);
    const delay = lines[i].d;
    i++;
    setTimeout(typeLine, delay);
  }

  // Allow skipping (only clicks on the boot screen itself)
  screen.addEventListener('click', finish);
  document.addEventListener('keydown', finish);

  // Kick off shortly after load
  setTimeout(typeLine, 200);

  // Safety: never trap the user — auto-finish after 4s max
  setTimeout(() => { if (document.body.contains(screen)) finish(); }, 4000);

  // Hard failsafe: once everything loads, the boot screen must never
  // linger as an invisible click-blocker.
  window.addEventListener('load', () => {
    setTimeout(() => { if (document.body.contains(screen)) finish(); }, 2500);
  });

  // Restore scroll when done
  screen.addEventListener('transitionend', unlock, { once: true });
})();