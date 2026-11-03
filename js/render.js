/* ============================================================
   render.js — Content Renderer
   ------------------------------------------------------------
   Reads from PORTFOLIO (data.js) and populates the static
   shell in index.html. Runs before the behaviour modules so
   the elements they target already exist.
   ============================================================ */

(function render() {
  if (!window.PORTFOLIO) return;
  const P = PORTFOLIO;

  const $ = (id) => document.getElementById(id);

  /* helper to build an inline SVG social icon */
  function socialSvg(iconKey, size = 16) {
    const path = (window.ICONS && ICONS[iconKey]) || '';
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor">${path}</svg>`;
  }

  /* ── Identity ── */
  if ($('hero-name'))        $('hero-name').textContent = P.identity.name + ',';
  if ($('hero-tagline'))     $('hero-tagline').textContent = P.identity.tagline;
  if ($('about-location'))   $('about-location').textContent = P.identity.location;
  if ($('year'))             $('year').textContent = new Date().getFullYear();

  /* Avatar: photo if imageUrl set, otherwise initials placeholder */
  if ($('hero-avatar')) {
    const url = P.identity.imageUrl;
    if (url) {
      $('hero-avatar').classList.remove('avatar-placeholder');
      $('hero-avatar').classList.add('avatar-photo');
      $('hero-avatar').innerHTML =
        `<img src="${url}" alt="${P.identity.name}" loading="lazy" />`;
    } else {
      $('hero-avatar').textContent = P.identity.initials;
    }
  }

  if ($('hero-availability')) {
    $('hero-availability').style.display = P.identity.available ? '' : 'none';
  }

  /* ── Hero socials ── */
  if ($('hero-socials')) {
    const map = {
      GitHub: 'github', LinkedIn: 'linkedin',
    };
    let html = P.contact.socials.map(s =>
      `<a href="${s.url}" target="_blank" rel="noopener">${socialSvg(map[s.name] || 'github', 15)} ${s.name}</a>`
    ).join('');
    if (P.contact.email) {
      html += `<a href="mailto:${P.contact.email}">${socialSvg('email', 15)} Email</a>`;
    }
    $('hero-socials').innerHTML = html;
  }

  /* ── Hero stats (first two) ── */
  if ($('hero-stats')) {
    $('hero-stats').innerHTML = P.stats.slice(0, 2).map(s => `
      <div class="stat">
        <div class="stat-number" data-counter>${s.num}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');
  }

  /* ── About paragraphs ── */
  if ($('about-paragraphs')) {
    $('about-paragraphs').innerHTML = P.about.map(p => `<p>${p}</p>`).join('');
  }

  /* ── Hobbies ── */
  if ($('about-hobbies')) {
    $('about-hobbies').innerHTML = P.hobbies.map(h =>
      `<div class="hobby">${h.icon} ${h.label}</div>`
    ).join('');
  }

  /* ── About stats (all four) ── */
  if ($('about-stats')) {
    $('about-stats').innerHTML = P.stats.map(s => `
      <div class="about-stat-card">
        <div class="about-stat-num" data-counter>${s.num}</div>
        <div class="about-stat-label">${s.label}</div>
      </div>
    `).join('');
  }

  /* ── Credly Badges (official embed) ── */
  if ($('badges-grid') && Array.isArray(P.badges)) {
    $('badges-grid').innerHTML = P.badges.map(b => `
      <div class="badge-embed"
           data-iframe-width="150"
           data-iframe-height="270"
           data-share-badge-id="${b.badgeId}"
           data-share-badge-host="https://www.credly.com"></div>
    `).join('');

    // Load Credly's embed script once; it converts the divs above
    // into live badge iframes. (It only scans on load, so if it's
    // already present we re-add it to force a re-scan.)
    const existing = document.getElementById('credly-embed-script');
    if (existing) existing.remove();
    const s = document.createElement('script');
    s.id = 'credly-embed-script';
    s.type = 'text/javascript';
    s.async = true;
    s.src = '//cdn.credly.com/assets/utilities/embed.js';
    document.body.appendChild(s);
  }
  if ($('badges-cta') && P.credlyProfile) {
    $('badges-cta').innerHTML =
      `<a href="${P.credlyProfile}" target="_blank" rel="noopener" class="btn-outline"
          style="width:fit-content;display:inline-flex;font-size:.85rem;">
        View all on Credly ↗
      </a>`;
  }

  /* ── Projects ── */
  if ($('projects-grid')) {
    // Only render a link when a real URL is present (not empty / not '#').
    const realLink = (url) => url && url !== '#';
    $('projects-grid').innerHTML = P.projects.map((proj, i) => {
      const links = [];
      if (realLink(proj.github)) {
        links.push(`
            <a href="${proj.github}" class="project-link" target="_blank" rel="noopener">
              ${socialSvg('github', 13)} GitHub
            </a>`);
      }
      if (realLink(proj.demo)) {
        links.push(`
            <a href="${proj.demo}" class="project-link" target="_blank" rel="noopener">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>`);
      }
      const linksHtml = links.length
        ? `<div class="project-links">${links.join('')}
          </div>`
        : '';
      return `
      <div class="project-card reveal" style="--reveal-delay:${i * 0.1}s">
        <div class="project-img">
          <div class="project-img-overlay"></div>
          <span>${proj.icon}</span>
        </div>
        <div class="project-body">
          <div class="project-tags">
            ${proj.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <div class="project-title">${proj.title}</div>
          <div class="project-desc">${proj.desc}</div>
          ${linksHtml}
        </div>
      </div>
    `;
    }).join('');
  }

  /* ── Contact info ── */
  if ($('contact-info')) {
    const c = P.contact;
    const rows = [
      { icon: '📧', label: 'Email', val: c.email },
      { icon: '📞', label: 'Phone', val: c.phone },
      { icon: '📍', label: 'Location', val: c.location },
    ].filter(r => r.val);
    $('contact-info').innerHTML = rows.map(r => `
      <div class="contact-info-item">
        <div class="contact-icon">${r.icon}</div>
        <div>
          <div class="contact-info-label">${r.label}</div>
          <div class="contact-info-val">${r.val}</div>
        </div>
      </div>
    `).join('');
  }

  /* ── Contact socials ── */
  if ($('contact-socials')) {
    $('contact-socials').innerHTML = P.contact.socials.map(s =>
      `<a href="${s.url}" target="_blank" rel="noopener" class="social-link">
        ${socialSvg(s.icon, 16)} ${s.handle}
      </a>`
    ).join('');
  }
})();