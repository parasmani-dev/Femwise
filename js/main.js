/* FemWise site behaviour: nav, reveal-on-scroll, marquee, APK availability. */
(function () {
  'use strict';

  /* ---- Release info: edit these when you publish a new build ---- */
  var APK = {
    path: 'downloads/femwise.apk',   // drop the built APK at this path
    version: '1.0.0',
    minAndroid: 'Android 6.0+'
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

  /* APK: fill in version, check the file exists, show its size */
  document.querySelectorAll('[data-apk-version]').forEach(function (el) { el.textContent = APK.version; });
  document.querySelectorAll('[data-apk-android]').forEach(function (el) { el.textContent = APK.minAndroid; });
  document.querySelectorAll('[data-apk-link]').forEach(function (a) { a.setAttribute('href', APK.path); a.setAttribute('download', ''); });

  var sizeEls = document.querySelectorAll('[data-apk-size]');
  var statusEls = document.querySelectorAll('[data-apk-status]');
  function setStatus(text) { statusEls.forEach(function (el) { el.textContent = text; }); }
  function setSize(text) { sizeEls.forEach(function (el) { el.textContent = text; }); }
  function formatBytes(n) {
    if (n >= 1048576) return (n / 1048576).toFixed(1) + ' MB';
    if (n >= 1024) return Math.round(n / 1024) + ' KB';
    return n + ' B';
  }

  if (location.protocol === 'file:') {
    setSize('—');
    setStatus('Size is detected automatically once the site is served over HTTP.');
    return;
  }

  fetch(APK.path, { method: 'HEAD', cache: 'no-store' }).then(function (res) {
    if (!res.ok) throw new Error('missing');
    var len = res.headers.get('content-length');
    setSize(len ? formatBytes(parseInt(len, 10)) : 'APK');
    setStatus('Direct download. Not on Google Play yet, so Android will ask you to allow installs from this source.');
  }).catch(function () {
    setSize('—');
    setStatus('The APK is not uploaded yet. Check back soon.');
    document.querySelectorAll('[data-apk-link]').forEach(function (a) {
      a.classList.add('is-disabled');
      a.setAttribute('aria-disabled', 'true');
      a.removeAttribute('download');
      a.setAttribute('href', '#download');
    });
  });
})();
