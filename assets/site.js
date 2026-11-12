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
