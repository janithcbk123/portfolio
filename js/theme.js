/* ============================================================
   theme.js — Dark / Light Theme Toggle
   ------------------------------------------------------------
   - Default theme: dark (embedded / terminal aesthetic)
   - Toggles [data-theme] on <html>
   - Persists choice in localStorage (works on real deploys;
     falls back gracefully to in-memory if storage is blocked)
   - Respects OS preference on first visit if no saved choice
   ============================================================ */

(function initTheme() {
  const STORAGE_KEY = 'portfolio-theme';
  const root = document.documentElement;

  /* ── Safe storage helpers (sandbox-proof) ── */
  let memoryFallback = null;
  function readStored() {
    try { return localStorage.getItem(STORAGE_KEY); }
    catch (e) { return memoryFallback; }
  }
  function writeStored(value) {
    try { localStorage.setItem(STORAGE_KEY, value); }
    catch (e) { memoryFallback = value; }
  }

  /* ── Determine initial theme ──
     1. Saved choice  2. OS preference  3. dark default        */
  function resolveInitial() {
    const saved = readStored();
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    // keep the browser UI (mobile address bar) in sync
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a0e14' : '#ffffff');
  }

  // Apply ASAP to avoid a flash
  applyTheme(resolveInitial());

  /* ── Wire the toggle button ──
     Reads the live theme from the DOM (not a captured variable)
     so it stays correct even if this script runs more than once
     (e.g. dev-server hot reload). Guards against double-binding. */
  function bindToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    if (btn.dataset.bound === '1') return;   // already wired — skip
    btn.dataset.bound = '1';

    btn.addEventListener('click', () => {
      const now = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = now === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      writeStored(next);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindToggle);
  } else {
    bindToggle();
  }
})();