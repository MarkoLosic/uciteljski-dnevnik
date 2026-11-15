// Zaglavlje priprema: hamburger meni na telefonu i senka posle skrola (kao Header.tsx na sajtu).
(function () {
  'use strict';
  var zaglavlje = document.querySelector('.site-header');
  if (!zaglavlje) return;
  var dugme = zaglavlje.querySelector('.menu-btn');

  function postavi(otvoren) {
    zaglavlje.classList.toggle('menu-open', otvoren);
    if (dugme) {
      dugme.setAttribute('aria-expanded', String(otvoren));
      dugme.setAttribute('aria-label', otvoren ? 'Zatvori meni' : 'Otvori meni');
    }
  }

  if (dugme) {
    dugme.addEventListener('click', function () {
      postavi(!zaglavlje.classList.contains('menu-open'));
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') postavi(false);
  });
  document.addEventListener('click', function (e) {
    if (!zaglavlje.contains(e.target)) postavi(false);
  });

  function naSkrol() {
    zaglavlje.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  naSkrol();
  window.addEventListener('scroll', naSkrol, { passive: true });
})();
