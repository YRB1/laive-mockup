/* Laivestyle — store engine. Site by YRB Nova. */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); };
  var ls = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var gbp = function (n) { return '£' + n.toFixed(2); };
  var FREE_SHIP = 75;

  /* ---------------- icons ---------------- */
  var I = {
    search: '<svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    heart: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
    bag: '<svg class="icon" viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    user: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    menu: '<svg class="icon" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18"/></svg>',
    close: '<svg class="icon" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    left: '<svg class="icon" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg class="icon" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
    truck: '<svg class="icon" viewBox="0 0 24 24"><path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
    ret: '<svg class="icon" viewBox="0 0 24 24"><path d="M4 10h11a5 5 0 0 1 0 10H8"/><path d="M8 6l-4 4 4 4"/></svg>',
    card: '<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>',
    lock: '<svg class="icon" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="M12 2l3 7 7 .6-5.3 4.7L18.3 22 12 18.2 5.7 22l1.6-7.7L2 9.6 9 9z"/></svg>',
    ig: '<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
    tt: '<svg class="icon" viewBox="0 0 24 24"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 3 2.5 5 5.5 5.2"/></svg>',
    x: '<svg class="icon" viewBox="0 0 24 24"><path d="M4 4l16 16M20 4L4 20"/></svg>',
    yt: '<svg class="icon" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/></svg>'
  };
  var stars = function (n) { var s = ''; for (var i = 0; i < 5; i++) s += i < Math.round(n) ? I.star : I.star.replace('<svg', '<svg style="opacity:.25"'); return '<span class="stars">' + s + '</span>'; };

  /* ---------------- catalogue ---------------- */
  var A = 'assets/img/ai/', S = 'assets/img/shop/', R = 'assets/img/';
  var CAT = [
    { id: 'oversized-tee-white', group: 'oversized-tee', name: 'Oversized Logo Tee', colour: 'White', hex: '#f1f0ec', price: 40, cat: 'T-shirts', badge: 'New', rating: 4.9, reviews: 0, low: ['XL'],
      imgs: [A + 'studio-white.jpg', A + 'look-clouds.jpg', S + 'white-tee-1.jpg', S + 'white-tee-detail.jpg'],
      desc: 'Boxy, dropped-shoulder tee in 240gsm cotton with the Laivestyle hand mark printed on the chest.',
      details: ['240gsm 100% cotton jersey', 'Oversized boxy fit — size down for a regular fit', 'Screen-printed hand mark', 'Machine wash cold, inside out'] },
    { id: 'oversized-tee-black', group: 'oversized-tee', name: 'Oversized Logo Tee', colour: 'Black', hex: '#111', price: 40, cat: 'T-shirts', badge: 'New', low: ['S', 'M'],
      imgs: [A + 'studio-black.jpg', S + 'black-tee-1.jpg', S + 'black-tee-detail.jpg'],
      desc: 'Boxy, dropped-shoulder tee in 240gsm cotton with the hand mark printed in off-white.',
      details: ['240gsm 100% cotton jersey', 'Oversized boxy fit — size down for a regular fit', 'Screen-printed hand mark', 'Machine wash cold, inside out'] },
    { id: 'back-print-hoodie', group: 'back-print-hoodie', name: 'Back Print Hoodie', colour: 'Heather Grey', hex: '#b9bcbf', price: 85, cat: 'Hoodies', badge: 'Bestseller', low: ['L'],
      imgs: [A + 'studio-hoodie.jpg', A + 'look-hoodie.jpg', S + 'grey-hoodie-1.jpg', S + 'grey-hoodie-detail.jpg'],
      desc: 'Heavyweight brushed-back hoodie with the hand and light printed large across the back.',
      details: ['420gsm brushed-back fleece', 'Relaxed fit with dropped shoulders', 'Double-lined hood, kangaroo pocket', 'Large back print, small chest mark'] },
    { id: 'logo-crewneck-cream', group: 'logo-crewneck', name: 'Logo Crewneck', colour: 'Cream', hex: '#efe8da', price: 70, cat: 'Sweatshirts', badge: 'New',
      imgs: [A + 'look-crew.jpg', S + 'white-crew-1.jpg', S + 'white-crew-detail.jpg'],
      desc: 'Soft brushed crewneck with the hand mark printed on the left chest.',
      details: ['380gsm brushed-back fleece', 'Relaxed fit', 'Ribbed collar, cuffs and hem', 'Printed hand mark'] },
    { id: 'logo-crewneck-orange', group: 'logo-crewneck', name: 'Logo Crewneck', colour: 'Sunset Orange', hex: '#e8792d', price: 70, cat: 'Sweatshirts',
      imgs: [S + 'orange-crew-1.jpg', S + 'orange-crew-detail.jpg'],
      desc: 'Soft brushed crewneck in sunset orange with the hand mark on the left chest.',
      details: ['380gsm brushed-back fleece', 'Relaxed fit', 'Ribbed collar, cuffs and hem', 'Printed hand mark'] },
    { id: 'fitted-tee-charcoal', group: 'fitted-tee', name: 'Fitted Logo Tee', colour: 'Charcoal', hex: '#3b3e44', price: 35, cat: 'T-shirts',
      imgs: [A + 'look-water.jpg', R + 'fitted-tee.jpg', R + 'fitted-tee-detail.jpg'],
      desc: 'Close-fitting stretch tee with a small hand mark on the chest.',
      details: ['Cotton-elastane stretch jersey', 'Fitted, body-skimming cut', 'Small chest mark', 'Machine wash cold'] },
    { id: 'back-print-tee', group: 'back-print-tee', name: 'Back Print Tee', colour: 'White', hex: '#f1f0ec', price: 40, cat: 'T-shirts',
      imgs: [R + 'back-print-tee.jpg', R + 'back-print-detail.jpg'],
      desc: 'Relaxed tee with the hand and light figure printed across the back.',
      details: ['Heavyweight cotton jersey', 'Relaxed fit', 'Back print', 'Machine wash cold, inside out'] },
    { id: 'graffiti-joggers', group: 'graffiti-joggers', name: 'Graffiti Joggers', colour: 'Navy / Pink', hex: '#2c3550', price: 75, cat: 'Bottoms', badge: 'Limited', low: ['M', 'L'],
      imgs: [R + 'joggers.jpg', R + 'joggers-detail.jpg'],
      desc: 'Relaxed navy joggers with hand-drawn pink graffiti print on both legs.',
      details: ['Brushed-back fleece', 'Relaxed straight leg', 'Elasticated waist and cuffs', 'All-over leg print'] },
    { id: 'logo-tee-grey', group: 'oversized-tee', name: 'Logo Tee', colour: 'Heather Grey', hex: '#b9bcbf', price: 35, cat: 'T-shirts',
      imgs: [S + 'grey-tee-1.jpg', S + 'grey-tee-detail.jpg'],
      desc: 'Classic-fit cotton tee with the hand mark on the chest.',
      details: ['180gsm cotton jersey', 'Regular fit', 'Printed hand mark', 'Machine wash cold'] }
  ];
  var byId = {}; CAT.forEach(function (p) { byId[p.id] = p; });
  var CATS = ['T-shirts', 'Sweatshirts', 'Hoodies', 'Bottoms'];
  window.LAIV = { CAT: CAT, byId: byId, gbp: gbp, I: I, stars: stars, esc: esc };

  /* SAMPLE reviews — placeholders for the concept, replaced by real customer reviews at launch */
  var REVIEWS = [
    { p: 'back-print-hoodie', r: 5, t: 'Heavy and warm', b: 'Sample review. Placeholder text showing where a customer would talk about weight, fit and how the back print holds up after washing.', n: 'Sample customer', s: 'L', fit: 'True to size' },
    { p: 'oversized-tee-white', r: 5, t: 'Perfect boxy fit', b: 'Sample review. Placeholder text showing where a customer would describe the oversized cut and the quality of the print.', n: 'Sample customer', s: 'M', fit: 'Oversized' },
    { p: 'graffiti-joggers', r: 5, t: 'The print is crazy', b: 'Sample review. Placeholder text showing where a customer would talk about the hand-drawn print and the fit of the leg.', n: 'Sample customer', s: 'M', fit: 'True to size' },
    { p: 'logo-crewneck-cream', r: 4, t: 'Soft and clean', b: 'Sample review. Placeholder text showing where a customer would talk about softness, colour and sizing.', n: 'Sample customer', s: 'S', fit: 'Slightly big' },
    { p: 'fitted-tee-charcoal', r: 5, t: 'Fits like a glove', b: 'Sample review. Placeholder text showing where a customer would describe the stretch and the fitted shape.', n: 'Sample customer', s: 'S', fit: 'True to size' },
    { p: 'oversized-tee-black', r: 5, t: 'Wear it every week', b: 'Sample review. Placeholder text showing where a customer would talk about everyday wear and how the colour holds.', n: 'Sample customer', s: 'XL', fit: 'Oversized' }
  ];
  window.LAIV.REVIEWS = REVIEWS;

  /* ---------------- toast ---------------- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('on');
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove('on'); }, 2200);
  }

  /* ---------------- header / footer ---------------- */
  var page = document.body.getAttribute('data-page') || '';
  function header() {
    var feat = byId['back-print-hoodie'];
    return '<div class="announce" aria-live="polite">' +
      '<p class="on">Drop 01 — 05.12.26 · 18:00 GMT</p><p>Free UK delivery on orders over £75</p><p>Free 30-day returns · Pay in 3 with Klarna</p></div>' +
      '<header class="header' + (page === 'home' ? ' over' : '') + '" id="hdr"><div class="wrap header__in">' +
      '<div style="display:flex;align-items:center;gap:8px"><button class="tool burger" data-open="mnav" aria-label="Menu">' + I.menu + '</button>' +
      '<nav class="nav" aria-label="Main"><a href="shop.html?sort=new">New in</a>' +
      '<div class="mega-wrap"><a href="shop.html" aria-haspopup="true">Shop</a><div class="mega">' +
      '<div><h4>Clothing</h4>' + CATS.map(function (c) { return '<a href="shop.html?c=' + encodeURIComponent(c) + '">' + c + '</a>'; }).join('') + '<a href="shop.html">Shop all</a></div>' +
      '<div><h4>Collections</h4><a href="shop.html?sort=new">Drop 01</a><a href="shop.html?c=T-shirts">The Logo Tee</a><a href="lookbook.html">Lookbook</a></div>' +
      '<div><h4>Featured</h4><a href="product.html?p=back-print-hoodie">Back Print Hoodie</a><a href="product.html?p=graffiti-joggers">Graffiti Joggers</a><a href="product.html?p=oversized-tee-white">Oversized Logo Tee</a></div>' +
      '<div><h4>Help</h4><a href="faq.html#sizing">Size guide</a><a href="faq.html#delivery">Delivery</a><a href="faq.html#returns">Returns</a><a href="contact.html">Contact</a></div>' +
      '<a class="mega__feat" href="product.html?p=' + feat.id + '"><img src="' + feat.imgs[1] + '" alt=""><span class="label">Back Print Hoodie — ' + gbp(feat.price) + '</span></a>' +
      '</div></div><a href="lookbook.html">Lookbook</a><a href="about.html">About</a></nav></div>' +
      '<a class="logo" href="index.html" aria-label="Laivestyle home"><img src="assets/img/logo-white.png" alt="Laivestyle"></a>' +
      '<div class="tools"><button class="tool" data-open="search" aria-label="Search">' + I.search + '</button>' +
      '<a class="tool" href="contact.html" aria-label="Account" style="display:none">' + I.user + '</a>' +
      '<button class="tool" data-open="wish" aria-label="Wishlist">' + I.heart + '<b data-wish-n></b></button>' +
      '<button class="tool" data-open="bag" aria-label="Bag">' + I.bag + '<b data-bag-n></b></button></div></div></header>';
  }
  function footer() {
    return '<section class="wrap news" id="newsletter"><div><p class="label muted" style="margin:0 0 14px">The list</p><h2 class="display h2">Get 10% off<br>your first order</h2></div>' +
      '<div><form class="field-row" data-news><label class="sr" for="nl">Email</label><input id="nl" type="email" required placeholder="Email address"><button type="submit">Sign up</button></form>' +
      '<p class="fine">Early access to every drop. Unsubscribe any time. See our <a class="link" href="policies.html#privacy">privacy policy</a>.</p></div></section>' +
      '<footer class="footer wrap"><div class="footer__cols">' +
      '<div><img src="assets/img/logo-white.png" alt="Laivestyle" style="height:64px;width:auto"><p class="muted" style="max-width:280px;margin:14px 0 0">Everything under the light. Clothing made in small runs, released in drops.</p>' +
      '<div class="socials"><a href="https://instagram.com/laivestyle_" target="_blank" rel="noopener" aria-label="Instagram">' + I.ig + '</a><a href="#" aria-label="TikTok">' + I.tt + '</a><a href="#" aria-label="X">' + I.x + '</a><a href="#" aria-label="YouTube">' + I.yt + '</a></div></div>' +
      '<div><h5>Shop</h5><a href="shop.html?sort=new">New in</a>' + CATS.map(function (c) { return '<a href="shop.html?c=' + encodeURIComponent(c) + '">' + c + '</a>'; }).join('') + '<a href="shop.html">Shop all</a></div>' +
      '<div><h5>Help</h5><a href="faq.html">FAQ</a><a href="faq.html#delivery">Delivery</a><a href="faq.html#returns">Returns</a><a href="faq.html#sizing">Size guide</a><a href="contact.html">Contact us</a></div>' +
      '<div><h5>Laivestyle</h5><a href="about.html">About</a><a href="lookbook.html">Lookbook</a><a href="https://instagram.com/laivestyle_" target="_blank" rel="noopener">Instagram</a><a href="contact.html">Wholesale</a></div>' +
      '<div><h5>Legal</h5><a href="policies.html#terms">Terms</a><a href="policies.html#privacy">Privacy</a><a href="policies.html#cookies">Cookies</a><a href="policies.html#shipping">Shipping policy</a></div></div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-top:48px"><div class="pay" aria-label="Payment methods"><span>VISA</span><span>Mastercard</span><span>AMEX</span><span>Apple Pay</span><span>Google Pay</span><span>PayPal</span><span>Klarna</span></div>' +
      '<label class="muted" style="font-size:12px">Currency <select aria-label="Currency"><option>GBP £</option><option>EUR €</option><option>USD $</option></select></label></div>' +
      '<div class="footer__bot"><span>© 2026 Laivestyle. All rights reserved.</span><span>Site by <a class="credit link" href="https://yrbnova.com" target="_blank" rel="noopener">YRB Nova</a></span></div></footer>';
  }
  function overlays() {
    return '<div class="shade" data-close></div>' +
      '<div class="mnav" id="mnav" aria-label="Menu"><div class="mnav__top"><img src="assets/img/logo-white.png" alt="" style="height:40px"><button class="tool" data-close aria-label="Close">' + I.close + '</button></div>' +
      '<a class="big" href="shop.html?sort=new">New in</a><a class="big" href="shop.html">Shop all</a>' +
      '<div class="cats">' + CATS.map(function (c) { return '<a class="btn btn--line" style="height:44px" href="shop.html?c=' + encodeURIComponent(c) + '">' + c + '</a>'; }).join('') + '</div>' +
      '<a class="big" href="lookbook.html">Lookbook</a><a class="big" href="about.html">About</a><a class="big" href="faq.html">Help</a>' +
      '<div class="small"><a href="contact.html">Contact</a><a href="https://instagram.com/laivestyle_">Instagram</a><a href="#">TikTok</a><span>GBP £</span></div></div>' +
      '<div class="search" id="search" role="dialog" aria-label="Search"><div class="wrap"><div class="search__bar">' + I.search +
      '<label class="sr" for="q">Search</label><input id="q" type="search" placeholder="Search Laivestyle" autocomplete="off"><button class="tool" data-close aria-label="Close search">' + I.close + '</button></div>' +
      '<div data-sres></div></div></div>' +
      '<aside class="drawer" id="bag" aria-label="Bag"><div class="drawer__top"><h3>Bag (<span data-bag-n2>0</span>)</h3><button class="tool" data-close aria-label="Close">' + I.close + '</button></div>' +
      '<div class="drawer__body" data-bag-body></div><div class="drawer__foot" data-bag-foot></div></aside>' +
      '<aside class="drawer" id="wish" aria-label="Wishlist"><div class="drawer__top"><h3>Wishlist (<span data-wish-n2>0</span>)</h3><button class="tool" data-close aria-label="Close">' + I.close + '</button></div>' +
      '<div class="drawer__body" data-wish-body></div></aside>' +
      '<div class="modal" id="sizeguide" role="dialog" aria-label="Size guide"><div class="modal__box"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><h3 class="display h3" style="font-size:22px">Size guide</h3><button class="tool" data-close aria-label="Close">' + I.close + '</button></div>' +
      sizeTable() + '<p class="muted" style="font-size:12px;margin:14px 0 0">Measurements in cm, garment laid flat. Oversized styles are cut 4–6cm wider than regular.</p></div></div>' +
      '<div class="cookie" id="cookie"><p>We use cookies to run the store, remember your bag and improve the site. <a class="link" href="policies.html#cookies">Learn more</a></p><div><button class="btn btn--solid" data-cookie="1">Accept</button><button class="btn btn--line" data-cookie="0">Decline</button></div></div>';
  }
  function sizeTable() {
    var rows = [['XS', 50, 66, 20], ['S', 53, 69, 21], ['M', 56, 72, 22], ['L', 59, 74, 23], ['XL', 62, 76, 24], ['XXL', 65, 78, 25]];
    return '<table><thead><tr><th>Size</th><th>Chest (½)</th><th>Length</th><th>Sleeve</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td></tr>'; }).join('') + '</tbody></table>';
  }
  window.LAIV.sizeTable = sizeTable;
  var hSlot = $('[data-header]'); if (hSlot) hSlot.outerHTML = header();
  var fSlot = $('[data-footer]'); if (fSlot) fSlot.outerHTML = footer();
  document.body.insertAdjacentHTML('beforeend', overlays());

  /* announcement rotation */
  var ann = $$('.announce p'), ai = 0;
  if (ann.length) setInterval(function () { ann[ai].classList.remove('on'); ai = (ai + 1) % ann.length; ann[ai].classList.add('on'); }, 4000);

  /* header over hero */
  var hdr = $('#hdr');
  if (hdr && hdr.classList.contains('over')) {
    var onS = function () { hdr.classList.toggle('solid', window.scrollY > 30); };
    window.addEventListener('scroll', onS, { passive: true }); onS();
  }

  /* ---------------- overlays ---------------- */
  var shade = $('.shade'), openEl = null;
  function open(id) {
    close(); openEl = document.getElementById(id); if (!openEl) return;
    openEl.classList.add(openEl.classList.contains('modal') ? 'on' : (id === 'mnav' ? 'open' : 'on'));
    if (id !== 'sizeguide') shade.classList.add('on');
    document.body.classList.add('lock');
    if (id === 'search') setTimeout(function () { $('#q').focus(); renderSearch($('#q').value); }, 50);
    if (id === 'bag') renderBag();
    if (id === 'wish') renderWish();
  }
  function close() {
    $$('.drawer.on,.search.on,.modal.on').forEach(function (e) { e.classList.remove('on'); });
    $$('.mnav.open').forEach(function (e) { e.classList.remove('open'); });
    shade.classList.remove('on'); document.body.classList.remove('lock'); openEl = null;
  }
  window.LAIV.open = open;
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]'); if (o) { e.preventDefault(); open(o.getAttribute('data-open')); return; }
    if (e.target.closest('[data-close]') || e.target.classList.contains('modal')) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  /* ---------------- product card ---------------- */
  var wish = ls.get('laiv-wish', []);
  function sizesFor(p) { return p.cat === 'Bottoms' ? ['XS', 'S', 'M', 'L', 'XL'] : ['XS', 'S', 'M', 'L', 'XL', 'XXL']; }
  window.LAIV.sizesFor = sizesFor;
  function swatches(p) {
    return '<div class="dots">' + CAT.filter(function (q) { return q.group === p.group; }).map(function (q) { return '<i style="background:' + q.hex + '" title="' + esc(q.colour) + '"></i>'; }).join('') + '</div>';
  }
  function card(p) {
    var on = wish.indexOf(p.id) > -1;
    return '<article class="card" data-id="' + p.id + '">' +
      '<a class="card__media" href="product.html?p=' + p.id + '">' +
      (p.badge ? '<span class="badge' + (p.badge === 'Limited' ? ' badge--pink' : '') + '">' + p.badge + '</span>' : '') +
      '<img src="' + p.imgs[0] + '" alt="' + esc(p.name + ' — ' + p.colour) + '" loading="lazy">' +
      (p.imgs[1] ? '<img class="alt" src="' + p.imgs[1] + '" alt="" loading="lazy">' : '') + '</a>' +
      '<button class="heart' + (on ? ' on' : '') + '" data-wish="' + p.id + '" aria-label="Save ' + esc(p.name) + '" aria-pressed="' + on + '">' + I.heart + '</button>' +
      '<div class="quick"><p>Quick add</p><div>' + sizesFor(p).map(function (s) { return '<button data-quick="' + p.id + '" data-size="' + s + '">' + s + '</button>'; }).join('') + '</div></div>' +
      '<div class="card__info"><div><a class="card__name" href="product.html?p=' + p.id + '">' + esc(p.name) + '</a><div class="card__sub">' + esc(p.colour) + '</div>' + swatches(p) + '</div><div class="card__price">' + gbp(p.price) + '</div></div></article>';
  }
  window.LAIV.card = card;

  /* ---------------- wishlist ---------------- */
  function saveWish() { ls.set('laiv-wish', wish); countWish(); }
  function countWish() {
    $$('[data-wish-n]').forEach(function (b) { b.textContent = wish.length || ''; b.setAttribute('data-n', wish.length); });
    $$('[data-wish-n2]').forEach(function (b) { b.textContent = wish.length; });
  }
  function toggleWish(id) {
    var i = wish.indexOf(id), on = i < 0;
    if (on) wish.push(id); else wish.splice(i, 1);
    saveWish();
    $$('[data-wish="' + id + '"]').forEach(function (b) { b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    toast(on ? 'Saved to wishlist' : 'Removed from wishlist');
  }
  window.LAIV.toggleWish = toggleWish; window.LAIV.isWished = function (id) { return wish.indexOf(id) > -1; };
  function renderWish() {
    var b = $('[data-wish-body]');
    if (!wish.length) { b.innerHTML = '<p class="empty">Nothing saved yet. Tap the heart on any piece to keep it here.</p>'; return; }
    b.innerHTML = wish.map(function (id) {
      var p = byId[id]; if (!p) return '';
      return '<div class="line"><a href="product.html?p=' + p.id + '"><img src="' + p.imgs[0] + '" alt=""></a><div><h4>' + esc(p.name) + '</h4><p>' + esc(p.colour) + '</p><p>' + gbp(p.price) + '</p><a class="rm" href="product.html?p=' + p.id + '" style="color:#111">Choose size</a></div><button class="rm" data-wish="' + p.id + '">Remove</button></div>';
    }).join('');
  }

  /* ---------------- bag ---------------- */
  var bag = ls.get('laiv-bag', []);
  function bagCount() { return bag.reduce(function (t, l) { return t + l.q; }, 0); }
  function bagTotal() { return bag.reduce(function (t, l) { return t + (byId[l.id] ? byId[l.id].price * l.q : 0); }, 0); }
  function saveBag() { ls.set('laiv-bag', bag); countBag(); if ($('#bag.on')) renderBag(); }
  function countBag() {
    var n = bagCount();
    $$('[data-bag-n]').forEach(function (b) { b.textContent = n || ''; b.setAttribute('data-n', n); });
    $$('[data-bag-n2]').forEach(function (b) { b.textContent = n; });
  }
  function addToBag(id, size, qty) {
    var l = bag.filter(function (x) { return x.id === id && x.s === size; })[0];
    if (l) l.q += qty || 1; else bag.push({ id: id, s: size, q: qty || 1 });
    saveBag(); open('bag');
  }
  window.LAIV.addToBag = addToBag;
  function renderBag() {
    var b = $('[data-bag-body]'), f = $('[data-bag-foot]'), t = bagTotal();
    var left = Math.max(0, FREE_SHIP - t), pct = Math.min(100, t / FREE_SHIP * 100);
    var ship = '<div class="ship">' + (left > 0 ? 'You\'re <b>' + gbp(left) + '</b> away from free UK delivery' : '<b>You\'ve unlocked free UK delivery</b>') + '<div class="bar"><i style="width:' + pct + '%"></i></div></div>';
    if (!bag.length) {
      var picks = ['oversized-tee-white', 'back-print-hoodie'].map(function (id) { var p = byId[id]; return '<a href="product.html?p=' + id + '"><img src="' + p.imgs[0] + '" alt="">' + esc(p.name) + '<br>' + gbp(p.price) + '</a>'; }).join('');
      b.innerHTML = ship + '<p class="empty">Your bag is empty.</p><p class="label" style="margin:8px 0 0">Popular right now</p><div class="upsell">' + picks + '</div>';
      f.innerHTML = '<a class="btn btn--dark btn--block" href="shop.html">Shop Drop 01</a>'; return;
    }
    b.innerHTML = ship + bag.map(function (l, i) {
      var p = byId[l.id]; if (!p) return '';
      return '<div class="line"><a href="product.html?p=' + p.id + '"><img src="' + p.imgs[0] + '" alt=""></a><div><h4>' + esc(p.name) + '</h4><p>' + esc(p.colour) + ' / ' + l.s + '</p>' +
        '<div class="qty"><button data-q="' + i + '" data-d="-1" aria-label="Decrease">−</button><span>' + l.q + '</span><button data-q="' + i + '" data-d="1" aria-label="Increase">+</button></div>' +
        '<button class="rm" data-rm="' + i + '">Remove</button></div><div>' + gbp(p.price * l.q) + '</div></div>';
    }).join('');
    f.innerHTML = '<div class="row2"><span>Subtotal</span><b>' + gbp(t) + '</b></div><div class="row2" style="color:#6b6b6b"><span>Delivery</span><span>' + (left > 0 ? 'Calculated at checkout' : 'Free') + '</span></div>' +
      '<p style="margin:0;font-size:12px;color:#6b6b6b">Or 3 interest-free payments of ' + gbp(t / 3) + ' with Klarna</p>' +
      '<button class="btn btn--dark btn--block" data-checkout>Checkout — ' + gbp(t) + '</button><p data-co-msg style="margin:0;font-size:12px;color:#6b6b6b"></p>';
  }
  document.addEventListener('click', function (e) {
    var w = e.target.closest('[data-wish]'); if (w) { e.preventDefault(); toggleWish(w.getAttribute('data-wish')); if ($('#wish.on')) renderWish(); return; }
    var q = e.target.closest('[data-quick]'); if (q) { e.preventDefault(); addToBag(q.getAttribute('data-quick'), q.getAttribute('data-size'), 1); return; }
    var qb = e.target.closest('[data-q]'); if (qb) { var l = bag[+qb.getAttribute('data-q')]; l.q += +qb.getAttribute('data-d'); if (l.q < 1) bag.splice(+qb.getAttribute('data-q'), 1); saveBag(); return; }
    var rm = e.target.closest('[data-rm]'); if (rm) { bag.splice(+rm.getAttribute('data-rm'), 1); saveBag(); return; }
    if (e.target.closest('[data-checkout]')) { $('[data-co-msg]').textContent = 'Checkout opens with Drop 01 — 05.12.26, 18:00 GMT. Your bag is saved.'; }
  });
  countBag(); countWish();

  /* ---------------- search ---------------- */
  function renderSearch(q) {
    var box = $('[data-sres]'); q = q.trim().toLowerCase();
    if (!q) { box.innerHTML = '<div class="search__hint"><span class="label muted" style="width:100%">Popular searches</span>' + ['Hoodie', 'Tee', 'Joggers', 'Crewneck', 'Black'].map(function (t) { return '<button data-term="' + t + '">' + t + '</button>'; }).join('') + '</div>'; return; }
    var res = CAT.filter(function (p) { return (p.name + ' ' + p.colour + ' ' + p.cat).toLowerCase().indexOf(q) > -1; });
    box.innerHTML = res.length ? '<p class="label muted" style="margin:18px 0 0">' + res.length + ' result' + (res.length > 1 ? 's' : '') + '</p><div class="search__res">' + res.map(card).join('') + '</div>' : '<p class="muted" style="padding:20px 0 28px">No results for “' + esc(q) + '”.</p>';
  }
  document.addEventListener('input', function (e) { if (e.target.id === 'q') renderSearch(e.target.value); });
  document.addEventListener('click', function (e) { var t = e.target.closest('[data-term]'); if (t) { $('#q').value = t.getAttribute('data-term'); renderSearch($('#q').value); } });

  /* ---------------- sliders ---------------- */
  window.LAIV.slider = function (root) {
    var track = $('.slider', root), prev = $('[data-prev]', root), next = $('[data-next]', root), bar = $('.progress i', root);
    if (!track) return;
    var step = function () { var c = track.children[0]; return c ? c.getBoundingClientRect().width + 14 : 300; };
    var upd = function () {
      var max = track.scrollWidth - track.clientWidth;
      if (prev) prev.disabled = track.scrollLeft < 4; if (next) next.disabled = track.scrollLeft > max - 4;
      if (bar) { var w = track.clientWidth / track.scrollWidth * 100; bar.style.width = w + '%'; bar.style.left = (max > 0 ? track.scrollLeft / max * (100 - w) : 0) + '%'; }
    };
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step() * 2, behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step() * 2, behavior: 'smooth' }); });
    track.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
  };

  /* ---------------- newsletter + forms ---------------- */
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.hasAttribute('data-news')) { e.preventDefault(); f.outerHTML = '<p style="margin:0;font-size:15px">You\'re on the list. Your 10% code is on its way.</p>'; }
    if (f.hasAttribute('data-contact')) { e.preventDefault(); f.outerHTML = '<p style="font-size:16px">Thanks — we\'ve got your message and will reply within 1–2 working days.</p>'; }
  });

  /* ---------------- cookie ---------------- */
  var ck = $('#cookie');
  if (ck && !ls.get('laiv-cookie', null)) { var showCk = function () { setTimeout(function () { ck.classList.add('on'); }, 4000); }; if (document.body.classList.contains('entered')) showCk(); else new MutationObserver(function (m, o) { if (document.body.classList.contains('entered')) { o.disconnect(); showCk(); } }).observe(document.body, { attributes: true, attributeFilter: ['class'] }); }
  document.addEventListener('click', function (e) { var c = e.target.closest('[data-cookie]'); if (c) { ls.set('laiv-cookie', c.getAttribute('data-cookie')); ck.classList.remove('on'); } });

  /* ---------------- intro (home only): sound plays here and nowhere else ---------------- */
  var intro = $('#intro');
  var enterSite = function () { document.body.classList.add('entered'); };
  if (!intro) enterSite();
  if (intro) {
    var music = $('#introMusic'), done = false, seen = false;
    try { seen = sessionStorage.getItem('laiv-in'); } catch (e) {}
    var fadeOut = function () {
      if (!music || music.paused) return;
      var v = music.volume, t = setInterval(function () { v -= 0.04; if (v <= 0) { clearInterval(t); music.pause(); } else music.volume = v; }, 70);
    };
    var finish = function () {
      if (done) return; done = true;
      intro.classList.add('gone'); document.body.classList.remove('lock');
      try { sessionStorage.setItem('laiv-in', '1'); } catch (e) {}
      setTimeout(enterSite, 150);
      setTimeout(fadeOut, 1200);
    };
    if (seen) { intro.classList.add('gone'); enterSite(); }
    else {
      document.body.classList.add('lock');
      var pct = $('[data-pct]', intro), bar = $('.intro__load b', intro), start = Date.now(), dur = 2300;
      var load = function () {
        var k = Math.min(1, (Date.now() - start) / dur), e = 1 - Math.pow(1 - k, 3);
        pct.textContent = String(Math.round(e * 100)).padStart(3, '0'); bar.style.width = (e * 100) + '%';
        if (k < 1) requestAnimationFrame(load); else intro.classList.add('ready');
      };
      requestAnimationFrame(load);
      $$('[data-enter]', intro).forEach(function (b) {
        b.addEventListener('click', function () {
          if (b.getAttribute('data-enter') === 'sound' && music) { music.volume = 0.9; var p = music.play(); if (p && p.catch) p.catch(function () {}); }
          intro.classList.add('playing');
          setTimeout(function () { intro.classList.add('flash'); }, 2500);
          setTimeout(finish, 3300);
        });
      });
    }
  }

  /* hero videos: always playing, always muted */
  $$('video[data-loop]').forEach(function (v) { v.muted = true; v.setAttribute('muted', ''); var p = v.play(); if (p && p.catch) p.catch(function () {}); });

  /* hero film progress bar */
  var hv = $$('.hero video'), hb = $('.hero__bar i');
  if (hb && hv.length) setInterval(function () { var v = hv.filter(function (x) { return x.offsetParent; })[0]; if (v && v.duration) hb.style.width = (v.currentTime / v.duration * 100) + '%'; }, 120);

  /* recently viewed */
  window.LAIV.viewed = function (id) { var v = ls.get('laiv-viewed', []).filter(function (x) { return x !== id; }); v.unshift(id); ls.set('laiv-viewed', v.slice(0, 8)); };
  window.LAIV.getViewed = function () { return ls.get('laiv-viewed', []); };

  document.dispatchEvent(new Event('laiv:ready'));
})();
