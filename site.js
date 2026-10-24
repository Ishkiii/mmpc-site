// galerija CafeOS: za svaku sliku proba .jpg, .png pa .webp; ako nijedna ne postoji, sakrije je
(function () {
  var figs = [].slice.call(document.querySelectorAll('#gallery figure'));
  var exts = ['.jpg', '.png', '.webp'], pending = figs.length, shown = 0;
  function done() { if (--pending === 0 && shown === 0) { document.getElementById('gallery').hidden = true; document.getElementById('gallery-soon').hidden = false; } }
  figs.forEach(function (f) {
    var img = f.querySelector('img'), i = 0;
    img.alt = f.querySelector('figcaption').textContent;
    img.onload = function () { shown++; done(); };
    img.onerror = function () { if (++i < exts.length) img.src = f.dataset.img + exts[i]; else { f.hidden = true; done(); } };
    img.src = f.dataset.img + exts[0];
  });
  var box = document.getElementById('lightbox');
  if (!box.showModal) return; // vrlo stari preglednici: slike se samo prikazuju
  var cur = 0;
  function visible() { return figs.filter(function (f) { return !f.hidden; }); }
  function open(n) { var v = visible(); if (!v.length) return; cur = (n + v.length) % v.length; box.querySelector('img').src = v[cur].querySelector('img').src; box.querySelector('p').textContent = v[cur].querySelector('figcaption').textContent; if (!box.open) box.showModal(); }
  figs.forEach(function (f) { f.addEventListener('click', function () { open(visible().indexOf(f)); }); });
  box.addEventListener('click', function (e) { if (e.target === box || e.target.className === 'x') box.close(); });
  document.addEventListener('keydown', function (e) { if (!box.open) return; if (e.key === 'ArrowRight') open(cur + 1); if (e.key === 'ArrowLeft') open(cur - 1); });
})();
