(function initSkills() {
  const tabsContainer  = document.getElementById('skills-tabs');
  const panelsContainer = document.getElementById('skills-panels');
  if (!tabsContainer || !panelsContainer || !window.PORTFOLIO) return;

  const { skills, skillTabs } = PORTFOLIO;

  /* ── Build tab buttons ── */
  tabsContainer.innerHTML = skillTabs.map((tab, i) => `
    <button class="skill-tab ${i === 0 ? 'active' : ''}" data-tab="${tab.key}">
      ${tab.label}
    </button>
  `).join('');

  /* ── Build panels ── */
  panelsContainer.innerHTML = skillTabs.map((tab, i) => {
    const group = skills[tab.key];
    return `
      <div class="skills-panel ${i === 0 ? 'active' : ''}" id="tab-${tab.key}">
        <div class="skill-panel-title">${group.title}</div>
        <div class="skill-panel-desc">${group.desc}</div>
        <div class="skills-grid">
          ${group.items.map(s => `
            <div class="skill-badge">
              <div class="skill-badge-name">${s.name}</div>
              <div class="skill-badge-level">${s.level}</div>
              <div class="skill-bar">
                <div class="skill-bar-fill" data-pct="${s.pct}" style="width:0%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  /* ── Animate bars within a panel ── */
  function animateBars(panel) {
    const bars = panel.querySelectorAll('.skill-bar-fill');
    bars.forEach((bar, i) => {
      bar.style.width = '0%';
      // small stagger for a nicer cascade
      setTimeout(() => {
        bar.style.width = bar.dataset.pct + '%';
      }, 60 + i * 40);
    });
  }

  /* ── Tab click handling ── */
  const tabButtons = tabsContainer.querySelectorAll('.skill-tab');
  const panels = panelsContainer.querySelectorAll('.skills-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById('tab-' + btn.dataset.tab);
      if (panel) {
        panel.classList.add('active');
        animateBars(panel);
      }
    });
  });

  /* ── Animate the first (active) panel once it scrolls into view ── */
  const firstPanel = panelsContainer.querySelector('.skills-panel.active');
  if (firstPanel) {
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateBars(firstPanel);
            observer.disconnect();
          }
        });
      }, { threshold: 0.3 });
      obs.observe(firstPanel);
    } else {
      animateBars(firstPanel);
    }
  }
})();