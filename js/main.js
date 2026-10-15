/* FemWise site behaviour: nav, reveal-on-scroll, marquee, APK availability. */
(function () {
  'use strict';

  /* ---- Release info: edit these when you publish a new build ----
     The APK (~350 MB) is hosted externally, not in this repo: a Google Drive
     direct-download link or a GitHub Release asset. Paste the link into `url`,
     set `hosted: true`, and keep `size` current (it is shown as-is because a
     cross-origin file can't be measured from the page). */
  var APK = {
    version: '1.0.0',
    minAndroid: 'Android 6.0+',
    size: '350 MB',
    url: '',                 // e.g. https://drive.google.com/uc?export=download&id=FILE_ID
    hosted: false            // set true once the release asset is uploaded
  };

  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.nav_burger');

  /* Mobile menu */
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav_mobile a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* Active pill while scrolling */
  var pills = Array.prototype.slice.call(document.querySelectorAll('.navbar_menu .pill'));
  var targets = pills.map(function (p) { return document.querySelector(p.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && targets.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        pills.forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    targets.forEach(function (t) { spy.observe(t); });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el, i) {
      if (!el.style.getPropertyValue('--delay')) el.style.setProperty('--delay', ((i % 4) * 80) + 'ms');
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Marquee: duplicate the list so the loop is seamless */
  document.querySelectorAll('[data-marquee]').forEach(function (m) {
    var list = m.querySelector('.marquee__list');
    if (!list) return;
    var clone = list.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    m.appendChild(clone);
  });

  /* APK: fill in version/size and point the buttons at the release asset */
  document.querySelectorAll('[data-apk-version]').forEach(function (el) { el.textContent = APK.version; });
  document.querySelectorAll('[data-apk-android]').forEach(function (el) { el.textContent = APK.minAndroid; });
  document.querySelectorAll('[data-apk-size]').forEach(function (el) { el.textContent = APK.hosted ? APK.size : '—'; });

  var statusText = APK.hosted
    ? 'Direct download. Not on Google Play yet, so Android will ask you to allow installs from this source.'
    : 'The APK is not uploaded yet. Check back soon.';
  document.querySelectorAll('[data-apk-status]').forEach(function (el) { el.textContent = statusText; });

  document.querySelectorAll('[data-apk-link]').forEach(function (a) {
    if (APK.hosted) {
      a.setAttribute('href', APK.url);
      a.setAttribute('rel', 'noopener');
      a.removeAttribute('aria-disabled');
      a.classList.remove('is-disabled');
    } else {
      a.setAttribute('href', '#download');
      a.setAttribute('aria-disabled', 'true');
      a.classList.add('is-disabled');
    }
  });
})();
