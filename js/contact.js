/* ============================================================
   contact.js — Contact Form Validation & Feedback
   ------------------------------------------------------------
   - Inline validation with error messages
   - Email format check
   - Toast notification on submit
   ============================================================ */

(function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name:    { el: document.getElementById('cf-name'),    label: 'Name' },
    email:   { el: document.getElementById('cf-email'),   label: 'Email' },
    subject: { el: document.getElementById('cf-subject'), label: 'Subject' },
    message: { el: document.getElementById('cf-message'), label: 'Message' },
  };

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ── Validate a single field ── */
  function validateField(key) {
    const { el, label } = fields[key];
    if (!el) return true;

    const errorEl = el.parentElement.querySelector('.form-error');
    const value = el.value.trim();
    let error = '';

    if (!value) {
      error = `${label} is required`;
    } else if (key === 'email' && !EMAIL_RE.test(value)) {
      error = 'Please enter a valid email address';
    }

    if (error) {
      el.classList.add('invalid');
      if (errorEl) errorEl.textContent = error;
      return false;
    }

    el.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
    return true;
  }

  /* ── Live validation on blur ── */
  Object.keys(fields).forEach(key => {
    const { el } = fields[key];
    if (!el) return;
    el.addEventListener('blur', () => validateField(key));
    el.addEventListener('input', () => {
      if (el.classList.contains('invalid')) validateField(key);
    });
  });

  /* ── Submit handler ── */
  const submitBtn = document.getElementById('cf-submit');
  submitBtn.addEventListener('click', () => {
    const results = Object.keys(fields).map(validateField);
    const valid = results.every(Boolean);

    if (!valid) {
      window.showToast('Please fix the highlighted fields', 'error');
      return;
    }

    /* No backend on a static site — compose the message and hand it off
       to the visitor's email client, pre-filled and addressed to me. */
    const to =
      (window.PORTFOLIO && PORTFOLIO.contact && PORTFOLIO.contact.email) || '';
    if (!to) {
      window.showToast('No contact email is configured yet.', 'error');
      return;
    }

    const name    = fields.name.el.value.trim();
    const email   = fields.email.el.value.trim();
    const subject = fields.subject.el.value.trim();
    const message = fields.message.el.value.trim();

    const body = `${message}\n\n— ${name} (${email})`;
    const mailto =
      `mailto:${to}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    window.showToast('Opening your email app…', 'success');
  });
})();