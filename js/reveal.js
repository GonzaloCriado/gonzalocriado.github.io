/* =========================================================
   SCROLL REVEAL — IntersectionObserver + stagger por grupo
========================================================= */
(function () {
  /* --- reveal individual --- */
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((item) => observer.observe(item));

  /* --- stagger delay entre hijos de cada contenedor --- */
  const groups = [
    '.works-grid',
    '.skills-grid',
    '.cert-grid',
    '.exp-table',
    '.contact-list',
    '.about-grid',
  ];

  groups.forEach((selector) => {
    const container = document.querySelector(selector);
    if (!container) return;
    container.querySelectorAll('.reveal').forEach((child, i) => {
      child.style.transitionDelay = (i * 0.07) + 's';
    });
  });
})();
