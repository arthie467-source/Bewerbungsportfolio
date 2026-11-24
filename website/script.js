// Einfaches Routing über den URL-Hash: #home, #projekte, #design, #filme, #fotografie, #lebenslauf, #kontakt
const views = [...document.querySelectorAll('.view')].map(v => v.id);
const overlay = document.getElementById('kontakt');
let current = 'home';

function route() {
  const h = location.hash.slice(1) || 'home';
  if (h === 'kontakt') {                       // Kontakt liegt als Overlay über der aktuellen Seite
    overlay.classList.add('open');
    return;
  }
  overlay.classList.remove('open');
  current = views.includes(h) ? h : 'home';
  views.forEach(id => document.getElementById(id).classList.toggle('active', id === current));
  document.body.dataset.view = current;
  window.scrollTo(0, 0);
}

// Zurück-Siegel auf Lebenslauf/Kontakt: zur vorherigen Seite
document.addEventListener('click', e => {
  const b = e.target.closest('[data-back]');
  if (!b) return;
  e.preventDefault();
  location.hash = '#' + (current === 'lebenslauf' ? 'home' : current);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) location.hash = '#' + current; });

window.addEventListener('hashchange', route);
route();
