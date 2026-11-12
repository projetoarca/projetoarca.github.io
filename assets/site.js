(() => {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#nav');
  if (!button || !nav) return;
  document.documentElement.classList.add('js');
  const closeMenu = (restoreFocus = false) => {
    button.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (restoreFocus) button.focus();
  };
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  matchMedia('(min-width: 561px)').addEventListener('change', () => closeMenu());
})();
(() => {
  const lists = document.querySelectorAll('[role="tablist"]');
  if (!lists.length) return;
  document.documentElement.classList.add('js');
  lists.forEach(list => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const ids = tabs.map(t => t.getAttribute('aria-controls'));
    const show = id => tabs.forEach(t => {
      const on = t.getAttribute('aria-controls') === id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    tabs.forEach(t => t.addEventListener('click', () => show(t.getAttribute('aria-controls'))));
    list.addEventListener('keydown', e => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0 || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      const next = tabs.at((i + (e.key === 'ArrowRight' ? 1 : -1)) % tabs.length);
      next.focus(); show(next.getAttribute('aria-controls'));
    });
    const fromHash = () => {
      const h = decodeURIComponent(location.hash.slice(1));
      if (ids.includes(h)) { show(h); return true; }
      return false;
    };
    if (!fromHash()) show(ids[0]);
    addEventListener('hashchange', fromHash);
  });
})();
