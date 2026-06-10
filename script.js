(function () {
  'use strict';

  var sel = '.bg-white,.bg-paper,.bg-soft,.dark-sec,.price-wrap,.final';
  var els = document.querySelectorAll(sel);
  var counters = document.querySelectorAll('.count');

  function countUp(el) {
    var to = parseFloat(el.getAttribute('data-to')) || 0;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var start = null;

    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / 1400, 1);
      var v = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(v * to) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
    counters.forEach(countUp);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  els.forEach(function (e) { io.observe(e); });

  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        countUp(entry.target);
        cio.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(function (e) { cio.observe(e); });
})();