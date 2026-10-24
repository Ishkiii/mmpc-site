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

// email gumbi: na mobitelu otvore mail aplikaciju; na računalu (gdje često nema mail aplikacije)
// kopiraju adresu i ponude Gmail / Outlook / mail aplikaciju
(function () {
  var en = document.documentElement.lang === 'en';
  var T = en ? { copied: 'Email address copied', app: 'Mail app', close: 'Close' }
             : { copied: 'Email adresa kopirana', app: 'Mail aplikacija', close: 'Zatvori' };
  var toast, timer;
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).catch(function () { legacy(text); });
    legacy(text);
  }
  function legacy(text) {
    var t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(t);
  }
  function link(href, label, blank) {
    var a = document.createElement('a'); a.href = href; a.textContent = label; a.className = 'btn sm';
    if (blank) { a.target = '_blank'; a.rel = 'noopener'; }
    return a;
  }
  function show(addr) {
    if (toast) toast.remove();
    toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role', 'status');
    var p = document.createElement('p'); p.innerHTML = '<span class="ok">✓</span> ' + T.copied + ': <b></b>'; p.querySelector('b').textContent = addr;
    var x = document.createElement('button'); x.className = 'x'; x.setAttribute('aria-label', T.close); x.textContent = '×'; x.onclick = function () { toast.remove(); };
    var row = document.createElement('div'); row.className = 'row';
    row.appendChild(link('https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(addr), 'Gmail', true));
    row.appendChild(link('https://outlook.live.com/mail/0/deeplink/compose?to=' + encodeURIComponent(addr), 'Outlook', true));
    var m = link('mailto:' + addr, T.app, false); m.dataset.direct = '1'; row.appendChild(m);
    toast.appendChild(x); toast.appendChild(p); toast.appendChild(row); document.body.appendChild(toast);
    clearTimeout(timer); timer = setTimeout(function () { if (toast) toast.remove(); }, 12000);
  }
  var phone = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (!a || a.dataset.direct) return;
    var addr = a.getAttribute('href').slice(7).split('?')[0];
    copy(addr);
    if (phone) return; // mobitel: neka se otvori mail aplikacija
    e.preventDefault(); show(addr);
  });
})();
