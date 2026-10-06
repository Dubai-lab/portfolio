(function () {
  'use strict';

  const ICONS = {
    external:
      '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M9 7h8v8"/></svg>',
    github:
      '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.1c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    fingerprint:
      '<svg viewBox="0 0 120 120" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><path d="M30 44a36 36 0 0 1 60 0"/><path d="M22 66a38 38 0 0 1 8-10M90 56a38 38 0 0 1 8 22c0 8-1 15-3 22"/><path d="M36 96c4-8 6-18 6-30a18 18 0 0 1 36 0c0 14-2 26-7 38"/><path d="M52 106c4-10 8-22 8-40"/><path d="M26 82c2-5 3-10 3-16a31 31 0 0 1 52-23"/></svg>',
  };

  const VISITS_API = 'https://2zf3eccymh.execute-api.eu-north-1.amazonaws.com/visits';

  const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  function terminalVisual() {
    return (
      '<div class="visual visual-terminal">' +
      '<pre><code>' +
      '<span class="t-dim">$</span> npm install -g smartmail-cli\n' +
      '<span class="t-dim">$</span> smartmail login\n' +
      '<span class="t-ok">✓</span> Logged in\n' +
      '<span class="t-dim">$</span> smartmail get apikey\n' +
      'Your API Key: <span class="t-key">sm_••••••••••••</span>\n' +
      '<span class="t-dim">$</span> smartmail get template welcome\n' +
      '<span class="t-ok">✓</span> Template: welcome (HTML)' +
      '</code></pre></div>'
    );
  }

  function fingerprintVisual() {
    const roles = ['Admin', 'Instructor', 'Invigilator', 'Security', 'Student'];
    return (
      '<div class="visual visual-fingerprint">' +
      '<div class="scan">' + ICONS.fingerprint + '<span class="scan-line"></span></div>' +
      '<ul class="chips">' + roles.map((r) => '<li>' + r + '</li>').join('') + '</ul>' +
      '</div>'
    );
  }

  function media(p) {
    const bar =
      '<div class="frame-bar"><span></span><span></span><span></span>' +
      '<em>' + (p.live ? host(p.live) : host(p.repos[0].url)) + '</em></div>';
    let body;
    if (p.image) {
      const img = '<img src="' + p.image + '" alt="Screenshot of ' + p.name + '" width="1200" height="750" loading="lazy">';
      body = p.live
        ? '<a href="' + p.live + '" target="_blank" rel="noopener" aria-label="Open ' + p.name + ' live site">' + img + '</a>'
        : img;
    } else {
      body = p.visual === 'terminal' ? terminalVisual() : fingerprintVisual();
    }
    return '<div class="project-media"><div class="frame">' + bar + body + '</div></div>';
  }

  function projectCard(p, i) {
    const links =
      (p.live
        ? '<a class="btn btn-primary btn-sm" href="' + p.live + '" target="_blank" rel="noopener">Live demo' + ICONS.external + '</a>'
        : '') +
      p.repos
        .map((r) => '<a class="btn btn-glass btn-sm" href="' + r.url + '" target="_blank" rel="noopener">' + ICONS.github + r.label + '</a>')
        .join('');

    return (
      '<article class="project glass reveal" style="--accent:' + p.accent + '">' +
      media(p) +
      '<div class="project-body">' +
      '<p class="project-meta"><span class="num">' + String(i + 1).padStart(2, '0') + '</span>' +
      '<span>' + p.category + '</span><span class="dot"></span><span>' + p.meta + '</span>' +
      (p.live ? '<span class="live-badge">Live</span>' : '') + '</p>' +
      '<h3>' + p.name + '</h3>' +
      '<p class="project-tagline">' + p.tagline + '</p>' +
      '<p class="project-desc">' + p.description + '</p>' +
      '<ul class="highlights">' + p.highlights.map((h) => '<li>' + h + '</li>').join('') + '</ul>' +
      '<ul class="chips">' + p.stack.map((s) => '<li>' + s + '</li>').join('') + '</ul>' +
      '<div class="project-links">' + links + '</div>' +
      '</div></article>'
    );
  }

  function repoCard(r) {
    const url = 'https://github.com/' + GITHUB_USER + '/' + r.name;
    return (
      '<article class="glass repo reveal">' +
      '<h3><a href="' + url + '" target="_blank" rel="noopener">' + ICONS.github + r.name + '</a></h3>' +
      '<p>' + r.text + '</p>' +
      '<p class="repo-foot"><span class="lang">' + r.lang + '</span>' +
      (r.live ? '<a href="' + r.live + '" target="_blank" rel="noopener">Live site' + ICONS.external + '</a>' : '') +
      '</p></article>'
    );
  }

  document.getElementById('project-list').innerHTML = PROJECTS.map(projectCard).join('');
  document.getElementById('repo-list').innerHTML = MORE_REPOS.map(repoCard).join('');
  document.getElementById('year').textContent = new Date().getFullYear();

  // Live repository count from GitHub; the number in the HTML is the fallback.
  fetch('https://api.github.com/users/' + GITHUB_USER)
    .then((res) => (res.ok ? res.json() : null))
    .then((user) => {
      if (!user || typeof user.public_repos !== 'number') return;
      document.getElementById('repo-count').textContent = user.public_repos;
      document.getElementById('repo-count-2').textContent = user.public_repos;
    })
    .catch(() => {});

  // Visitor counter (API Gateway + Lambda + DynamoDB); stays hidden if the call fails.
  fetch(VISITS_API, { method: 'POST' })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (!data || typeof data.visits !== 'number') return;
      document.getElementById('visit-count').textContent = data.visits.toLocaleString();
      document.getElementById('visitors').hidden = false;
    })
    .catch(() => {});

  // Mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Reveal on scroll
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    items.forEach((el) => io.observe(el));
  }
})();
