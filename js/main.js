(function () {
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var ss = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };

  /* sound */
  var theme = $('#theme');
  function soundLabel() { $$('[data-sound]').forEach(function (b) { b.textContent = theme && !theme.paused ? 'Sound on' : 'Sound off'; }); }
  function soundOn() {
    if (!theme) return;
    var t = parseFloat(ss.get('t') || '0'); if (t) { try { theme.currentTime = t; } catch (e) {} }
    var p = theme.play(); if (p && p.then) p.then(soundLabel).catch(soundLabel); else soundLabel();
    ss.set('sound', '1');
  }
  function soundOff() { if (theme) theme.pause(); ss.set('sound', '0'); soundLabel(); }
  $$('[data-sound]').forEach(function (b) { b.addEventListener('click', function () { theme.paused ? soundOn() : soundOff(); }); });
  if (theme) setInterval(function () { if (!theme.paused) ss.set('t', String(theme.currentTime)); }, 500);
  if (ss.get('sound') === '1' && theme) {
    var resume = function () { window.removeEventListener('pointerdown', resume); window.removeEventListener('keydown', resume); if (theme.paused) soundOn(); };
    window.addEventListener('pointerdown', resume); window.addEventListener('keydown', resume);
  }

  /* enter: idle store -> fly in -> site */
  var enter = $('#enter'), fly = $('#fly');
  function open() {
    document.body.classList.remove('locked');
    if (enter) enter.classList.add('gone');
    ss.set('in', '1');
  }
  if (enter) {
    if (ss.get('in')) { enter.classList.add('gone'); document.body.classList.remove('locked'); }
    else {
      setTimeout(function () { enter.classList.add('ready'); }, 600);
      $$('[data-enter]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (b.getAttribute('data-enter') === 'sound') soundOn();
          enter.classList.add('flying');
          var p = fly.play(); if (p && p.catch) p.catch(open);
          fly.addEventListener('ended', open, { once: true });
          setTimeout(open, 4800);
        });
      });
    }
  }

  /* header */
  var head = $('#head');
  if (head && !head.classList.contains('solid')) {
    var onScroll = function () { head.classList.toggle('solid', window.scrollY > 28); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
  var menuBtn = $('#menuBtn'), menu = $('#menu');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var o = menu.classList.toggle('open');
      menuBtn.textContent = o ? 'Close' : 'Menu'; menuBtn.setAttribute('aria-expanded', o);
      head.classList.add('solid'); document.body.classList.toggle('locked', o);
    });
    $$('#menu a').forEach(function (a) { a.addEventListener('click', function () { menu.classList.remove('open'); menuBtn.textContent = 'Menu'; document.body.classList.remove('locked'); }); });
  }

  /* countdown in the top bar */
  var cd = $('[data-countdown]');
  if (cd) {
    var target = Date.parse('2026-12-05T18:00:00Z');
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var tick = function () {
      var d = Math.max(0, target - Date.now());
      cd.textContent = pad(Math.floor(d / 864e5)) + 'D ' + pad(Math.floor(d / 36e5) % 24) + 'H ' + pad(Math.floor(d / 6e4) % 60) + 'M ' + pad(Math.floor(d / 1e3) % 60) + 'S';
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------------- catalogue ---------------- */
  var S = 'assets/img/shop/', R = 'assets/img/';
  var CAT = [
    { id: 'logo-tee-white', group: 'logo-tee', name: 'Logo Tee', colour: 'White', price: 35, cat: 'tshirts', tag: 'New',
      imgs: [S + 'white-tee-1.jpg', S + 'white-tee-detail.jpg', S + 'white-tee-2.jpg', S + 'white-tee-3.jpg'],
      desc: 'Heavyweight cotton tee with the Laivestyle hand mark printed on the left chest. Regular fit.' },
    { id: 'logo-tee-black', group: 'logo-tee', name: 'Logo Tee', colour: 'Black', price: 35, cat: 'tshirts',
      imgs: [S + 'black-tee-1.jpg', S + 'black-tee-detail.jpg'],
      desc: 'Heavyweight cotton tee with the Laivestyle hand mark printed on the chest. Regular fit.' },
    { id: 'back-print-hoodie', group: 'back-print-hoodie', name: 'Back Print Hoodie', colour: 'Heather Grey', price: 75, cat: 'hoodies', tag: 'New',
      imgs: [S + 'grey-hoodie-1.jpg', S + 'grey-hoodie-detail.jpg'],
      desc: 'Brushed-back fleece hoodie with the hand and light printed large across the back. Relaxed fit.' },
    { id: 'logo-crew-white', group: 'logo-crew', name: 'Logo Crewneck', colour: 'White', price: 60, cat: 'sweatshirts',
      imgs: [S + 'white-crew-1.jpg', S + 'white-crew-detail.jpg'],
      desc: 'Crewneck sweatshirt with the Laivestyle mark printed centre chest. Ribbed cuffs and hem.' },
    { id: 'fitted-tee', group: 'fitted-tee', name: 'Fitted Logo Tee', colour: 'Charcoal', price: 30, cat: 'tshirts',
      imgs: [R + 'fitted-tee.jpg', R + 'fitted-tee-detail.jpg'],
      desc: 'Fitted tee with a small hand mark on the chest.' },
    { id: 'back-print-tee', group: 'back-print-tee', name: 'Back Print Tee', colour: 'White', price: 35, cat: 'tshirts',
      imgs: [R + 'back-print-tee.jpg', R + 'back-print-detail.jpg'],
      desc: 'Relaxed tee with the hand and light printed on the back.' },
    { id: 'graffiti-joggers', group: 'graffiti-joggers', name: 'Graffiti Joggers', colour: 'Navy / Pink', price: 70, cat: 'bottoms', tag: 'Limited',
      imgs: [R + 'joggers.jpg', R + 'joggers-detail.jpg'],
      desc: 'Navy joggers with hand-drawn pink graffiti print on both legs. Elasticated waist and cuffs.' },
    { id: 'logo-crew-orange', group: 'logo-crew', name: 'Logo Crewneck', colour: 'Orange', price: 60, cat: 'sweatshirts',
      imgs: [S + 'orange-crew-1.jpg', S + 'orange-crew-detail.jpg'],
      desc: 'Crewneck sweatshirt with the Laivestyle mark on the left chest. Ribbed cuffs and hem.' },
    { id: 'logo-tee-grey', group: 'logo-tee', name: 'Logo Tee', colour: 'Heather Grey', price: 35, cat: 'tshirts', hidden: true,
      imgs: [S + 'grey-tee-1.jpg', S + 'grey-tee-detail.jpg'],
      desc: 'Heavyweight cotton tee with the Laivestyle hand mark printed on the chest. Regular fit.' }
  ];
  var byId = {}; CAT.forEach(function (p) { byId[p.id] = p; });
  var gbp = function (n) { return '£' + n.toFixed(2); };
  function card(p) {
    var a = document.createElement('a'); a.className = 'item'; a.href = 'product.html?p=' + p.id; a.setAttribute('data-cat', p.cat);
    a.innerHTML = '<div class="item__img">' + (p.tag ? '<span class="item__tag"></span>' : '') +
      '<img loading="lazy" alt=""><img loading="lazy" alt=""></div><div class="item__info"><div><span class="n"></span><br><span class="muted c"></span></div><div class="pr"></div></div>';
    var im = a.querySelectorAll('img'); im[0].src = p.imgs[0]; im[0].alt = p.name + ' — ' + p.colour; im[1].src = p.imgs[1] || p.imgs[0];
    if (p.tag) a.querySelector('.item__tag').textContent = p.tag;
    a.querySelector('.n').textContent = p.name; a.querySelector('.c').textContent = p.colour; a.querySelector('.pr').textContent = gbp(p.price);
    return a;
  }

  /* ---------------- home grid + filters ---------------- */
  var grid = $('[data-grid]');
  function renderGrid(f) {
    if (!grid) return;
    grid.innerHTML = '';
    var list = CAT.filter(function (p) { return !p.hidden && (f === 'all' || p.cat === f); });
    list.forEach(function (p) { grid.appendChild(card(p)); });
    $('[data-results]').textContent = list.length;
    $$('[data-filter]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-filter') === f); b.setAttribute('aria-selected', b.getAttribute('data-filter') === f); });
  }
  if (grid) {
    renderGrid('all');
    $$('[data-filter]').forEach(function (b) { b.addEventListener('click', function () { renderGrid(b.getAttribute('data-filter')); }); });
    $$('.cats [data-cat]').forEach(function (a) { a.addEventListener('click', function () { renderGrid(a.getAttribute('data-cat')); }); });
  }

  /* ---------------- bag ---------------- */
  var bag = [];
  try { bag = JSON.parse(localStorage.getItem('laiv-bag') || '[]'); } catch (e) { bag = []; }
  function saveBag() { try { localStorage.setItem('laiv-bag', JSON.stringify(bag)); } catch (e) {} drawBag(); }
  function drawBag() {
    var n = bag.reduce(function (t, l) { return t + l.qty; }, 0);
    $$('[data-count]').forEach(function (el) { el.textContent = n; });
    var box = $('[data-bag-items]'); if (!box) return;
    box.innerHTML = '';
    if (!bag.length) { box.textContent = 'Your bag is empty.'; $('[data-bag-foot]').style.display = 'none'; return; }
    $('[data-bag-foot]').style.display = '';
    var sub = 0;
    bag.forEach(function (l, i) {
      var p = byId[l.id]; if (!p) return; sub += p.price * l.qty;
      var row = document.createElement('div'); row.className = 'line';
      row.innerHTML = '<img alt=""><div><span class="n"></span><span class="muted d"></span><span class="muted q"></span></div><div style="text-align:right"><div class="pr"></div><button>Remove</button></div>';
      row.querySelector('img').src = p.imgs[0];
      row.querySelector('.n').textContent = p.name;
      row.querySelector('.d').textContent = p.colour + ' / ' + l.size;
      row.querySelector('.q').textContent = 'Qty ' + l.qty;
      row.querySelector('.pr').textContent = gbp(p.price * l.qty);
      row.querySelector('button').addEventListener('click', function () { bag.splice(i, 1); saveBag(); });
      box.appendChild(row);
    });
    $('[data-subtotal]').textContent = gbp(sub);
  }
  function openBag() { document.body.classList.add('bag-open'); }
  $$('[data-bag]').forEach(function (b) { b.addEventListener('click', openBag); });
  $$('[data-bag-close]').forEach(function (b) { b.addEventListener('click', function () { document.body.classList.remove('bag-open'); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') document.body.classList.remove('bag-open'); });
  $$('[data-checkout]').forEach(function (b) { b.addEventListener('click', function () { $('[data-checkout-msg]').textContent = 'Checkout opens 05.12.26 at 18:00 GMT.'; }); });
  drawBag();

  /* sign up (connect to Shopify / Klaviyo when live) */
  var form = $('#signupForm');
  if (form) form.addEventListener('submit', function (e) { e.preventDefault(); $('#signup').classList.add('sent'); });

  /* ---------------- product page ---------------- */
  if ($('#pdp')) {
    var p = byId[new URLSearchParams(location.search).get('p')] || CAT[0];
    var size = null;
    document.title = p.name + ' — ' + p.colour + ' — Laivestyle';
    $('[data-name]').textContent = p.name;
    $('[data-price]').textContent = gbp(p.price);
    $('[data-desc]').textContent = p.desc;
    $('[data-colour-name]').textContent = p.colour;
    var imgs = $('[data-imgs]');
    p.imgs.forEach(function (src, i) {
      var d = document.createElement('div'), im = document.createElement('img');
      im.src = src; im.alt = i ? '' : p.name + ' — ' + p.colour; d.appendChild(im); imgs.appendChild(d);
    });
    var sw = $('[data-colours]'); sw.className = 'swatches';
    CAT.filter(function (q) { return q.group === p.group; }).forEach(function (q) {
      var a = document.createElement('a'); a.href = 'product.html?p=' + q.id; a.title = q.colour; a.setAttribute('aria-label', q.colour);
      if (q.id === p.id) a.className = 'on';
      var im = document.createElement('img'); im.src = q.imgs[0]; im.alt = ''; a.appendChild(im); sw.appendChild(a);
    });
    var sizes = p.cat === 'bottoms' ? ['XS', 'S', 'M', 'L', 'XL'] : ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    var box = $('[data-sizes]');
    sizes.forEach(function (v) {
      var b = document.createElement('button'); b.className = 'opt'; b.textContent = v;
      b.addEventListener('click', function () {
        size = v; $$('[data-sizes] .opt').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
        $('#addBtn').textContent = 'Add to bag — ' + gbp(p.price);
      });
      box.appendChild(b);
    });
    var msg = $('#msg'), baseMsg = msg.textContent;
    $('#addBtn').addEventListener('click', function () {
      if (!size) { msg.textContent = 'Please select a size.'; msg.style.color = '#fff'; return; }
      msg.textContent = baseMsg; msg.style.color = '';
      var ex = bag.filter(function (l) { return l.id === p.id && l.size === size; })[0];
      if (ex) ex.qty++; else bag.push({ id: p.id, size: size, qty: 1 });
      saveBag(); openBag();
    });
    var also = $('[data-also]');
    CAT.filter(function (q) { return q.group !== p.group && !q.hidden; }).slice(0, 4).forEach(function (q) { also.appendChild(card(q)); });
  }
})();
