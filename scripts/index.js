document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('card-id');
  if (!el) {
    console.error('Element mit ID "card-id" nicht gefunden.');
    return;
  }

  function getClientPoint(e) {
    // Mouse oder Touch unterstützen
    if (e.touches && e.touches.length) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  function handleMove(e) {
    const pt = getClientPoint(e);
    const rect = el.getBoundingClientRect();
    const xVal = pt.x - rect.left; // relative x innerhalb des Elements
    const yVal = pt.y - rect.top;  // relative y innerhalb des Elements

    const width = rect.width || 1;
    const height = rect.height || 1;

    const yRotation = 20 * ((xVal - width / 2) / width);
    const xRotation = -20 * ((yVal - height / 2) / height);

    el.style.transform = `perspective(600px) scale(1.06) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    // Optional debug: console.log(xVal, yVal, xRotation, yRotation);
  }

  function reset() {
    el.style.transform = 'perspective(600px) scale(1) rotateX(0) rotateY(0)';
  }

  el.addEventListener('mousemove', handleMove);
  el.addEventListener('touchmove', (e) => { e.preventDefault(); handleMove(e); }, {passive:false});
  el.addEventListener('mouseleave', reset);
  el.addEventListener('touchend', reset);
  el.addEventListener('mousedown', () => el.style.transform = 'perspective(600px) scale(0.95) rotateX(0) rotateY(0)');
  document.addEventListener('mouseup', () => el.style.transform = 'perspective(600px) scale(1.06) rotateX(0) rotateY(0)');
});


document.querySelector('.card').addEventListener('click', function () {
    this.classList.toggle('is-flipped');
  });