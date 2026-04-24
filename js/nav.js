/* =========================================================
   NAV — offset dinámico sobre el ticker + scrollspy
========================================================= */
(function () {
  const nav     = document.getElementById('mainNav');
  const ticker  = document.querySelector('.ticker');
  const links   = document.querySelectorAll('.nav-links a');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  /* ---------------------------------------------------------
     1. POSICIÓN DINÁMICA: nav se muestra justo debajo del ticker
        y sube conforme el ticker sale del viewport.
  --------------------------------------------------------- */
  function updateNavTop() {
    if (!ticker) return;
    const tickerBottom = ticker.getBoundingClientRect().bottom;
    nav.style.top = Math.max(0, tickerBottom) + 'px';
  }

  /* ---------------------------------------------------------
     2. SCROLL GLASS + posición
  --------------------------------------------------------- */
  function onScroll() {
    updateNavTop();
    nav.classList.toggle('scrolled', window.scrollY > 50);
    updateScrollspy();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateNavTop(); // posición inicial correcta

  /* ---------------------------------------------------------
     3. SCROLLSPY — marca el link de la sección visible
  --------------------------------------------------------- */
  function updateScrollspy() {
    let current = '';
    const offset = nav.offsetHeight + 20;

    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top <= offset) current = section.id;
    });

    links.forEach((link) => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  /* ---------------------------------------------------------
     4. HAMBURGER + OVERLAY
  --------------------------------------------------------- */
  const btn          = document.getElementById('hamburger');
  const overlay      = document.getElementById('navOverlay');
  const overlayLinks = overlay.querySelectorAll('.overlay-link');

  function closeMenu() {
    btn.classList.remove('open');
    overlay.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('open');
    overlay.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlayLinks.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();
