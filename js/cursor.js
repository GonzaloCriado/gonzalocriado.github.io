/* =========================================================
   CUSTOM CURSOR — lerp suave, escala en hover
========================================================= */
(function () {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  let mouseX = 0;
  let mouseY = 0;
  let curX = 0;
  let curY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function loop() {
    curX += (mouseX - curX) * 0.15;
    curY += (mouseY - curY) * 0.15;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  const hoverTargets = document.querySelectorAll(
    'a, button, .work-card, .cert-card, .skill-pill'
  );
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
})();
