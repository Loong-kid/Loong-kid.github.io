(function () {
  var LANGS = ['en', 'ko', 'ja'];
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var lang = LANGS.indexOf(saved) >= 0 ? saved : null;
  if (!lang) {
    var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    lang = LANGS.indexOf(nav) >= 0 ? nav : 'en';
  }

  function apply(l) {
    document.documentElement.lang = l;
    var els = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < els.length; i++) els[i].hidden = els[i].getAttribute('data-lang') !== l;
    var btns = document.querySelectorAll('.langs button');
    for (var j = 0; j < btns.length; j++) btns[j].setAttribute('aria-pressed', String(btns[j].getAttribute('data-set') === l));
  }

  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('.langs button');
    if (b) {
      var l = b.getAttribute('data-set');
      apply(l);
      try { localStorage.setItem('lang', l); } catch (e) {}
      return;
    }
    var c = ev.target.closest('[data-copy]');
    if (c) {
      var text = c.getAttribute('data-copy');
      var done = function () {
        var labels = c.querySelectorAll('[data-lang]');
        c.classList.add('copied');
        var old = [];
        for (var k = 0; k < labels.length; k++) { old.push(labels[k].textContent); labels[k].textContent = labels[k].getAttribute('data-done'); }
        setTimeout(function () {
          for (var k = 0; k < labels.length; k++) labels[k].textContent = old[k];
          c.classList.remove('copied');
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      }
    }
  });

  apply(lang);
})();
