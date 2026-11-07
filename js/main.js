/* Laivestyle — concept site by YRB Nova */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var store = {
    get: function (k, s) { try { return (s ? sessionStorage : localStorage).getItem(k); } catch (e) { return null; } },
    set: function (k, v, s) { try { (s ? sessionStorage : localStorage).setItem(k, v); } catch (e) {} }
  };

  /* ---------------- music ---------------- */
  var audio = $('#track');
  var player = $('#player');
  var stateEl = $('[data-player-state]');
  var fadeTimer = null;
  function setPlayingUI(on) {
    if (!player) return;
    player.classList.toggle('is-playing', on);
    player.setAttribute('aria-pressed', on ? 'true' : 'false');
    player.setAttribute('aria-label', on ? 'Pause music' : 'Play music');
    if (stateEl) stateEl.textContent = on ? 'Now playing' : 'Sound off';
  }
  function fadeTo(target, ms, done) {
    clearInterval(fadeTimer);
    var start = audio.volume, steps = Math.max(1, Math.round(ms / 40)), i = 0;
    fadeTimer = setInterval(function () {
      i++; audio.volume = Math.min(1, Math.max(0, start + (target - start) * (i / steps)));
      if (i >= steps) { clearInterval(fadeTimer); if (done) done(); }
    }, 40);
  }
  function playMusic() {
    if (!audio) return;
    if (audio.preload === 'none') { audio.preload = 'auto'; }
    var t = parseFloat(store.get('laiv-t', true) || '0');
    if (t && !audio.currentTime) { try { audio.currentTime = t; } catch (e) {} }
    audio.volume = 0;
    var p = audio.play();
    if (p && p.then) p.then(function () { fadeTo(0.7, 1800); setPlayingUI(true); }).catch(function () { setPlayingUI(false); });
    else { fadeTo(0.7, 1800); setPlayingUI(true); }
    store.set('laiv-sound', 'on');
  }
  function pauseMusic() {
    if (!audio) return;
    fadeTo(0, 500, function () { audio.pause(); });
    setPlayingUI(false);
    store.set('laiv-sound', 'off');
  }
  if (player) player.addEventListener('click', function () { audio.paused ? playMusic() : pauseMusic(); });
  if (audio) {
    setInterval(function () { if (!audio.paused) store.set('laiv-t', String(audio.currentTime), true); }, 1000);
  }
  function showPlayer() { if (player) setTimeout(function () { player.classList.add('is-shown'); }, 600); }

  /* ---------------- intro / enter ---------------- */
  var loader = $('#loader');
  function enter(withSound) {
    body.classList.remove('is-locked');
    body.classList.add('is-entered');
    if (loader) loader.classList.add('is-done');
    store.set('laiv-entered', '1', true);
    showPlayer();
    if (withSound) playMusic();
  }
  if (loader && !store.get('laiv-entered', true)) {
    setTimeout(function () { loader.classList.add('is-ready'); var b = $('[data-enter="sound"]'); if (b) b.focus({ preventScroll: true }); }, reduce ? 50 : 1900);
    $$('[data-enter]').forEach(function (b) {
      b.addEventListener('click', function () { enter(b.getAttribute('data-enter') === 'sound'); });
    });
  } else {
    if (loader) loader.classList.add('is-done');
    body.classList.remove('is-locked');
    requestAnimationFrame(function () { body.classList.add('is-entered'); });
    showPlayer();
    // returning visitor who chose sound: resume on first interaction (browsers block autoplay)
    if (store.get('laiv-sound') === 'on' && audio) {
      var resume = function () {
        ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) { window.removeEventListener(ev, resume); });
        if (audio.paused) playMusic();
      };
      ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) { window.addEventListener(ev, resume, { passive: true }); });
    }
  }

  /* ---------------- hero film ---------------- */
  var film = $('#heroFilm');
  if (film) { film.muted = true; var fp = film.play(); if (fp && fp.catch) fp.catch(function () {}); }

  /* ---------------- header ---------------- */
  var header = $('#header'), lastY = 0;
  function onScrollHeader() {
    var y = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 40);
      header.classList.toggle('is-hidden', y > 500 && y > lastY && !body.classList.contains('menu-open'));
    }
    lastY = y;
  }

  /* ---------------- mobile menu ---------------- */
  var burger = $('#burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('#mobileMenu a').forEach(function (a) { a.addEventListener('click', function () { body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); }); });
  }

  /* ---------------- countdown ---------------- */
  var cd = $('[data-drop]');
  if (cd) {
    var target = Date.parse(cd.getAttribute('data-drop'));
    var els = { d: $('[data-cd="d"]'), h: $('[data-cd="h"]'), m: $('[data-cd="m"]'), s: $('[data-cd="s"]') };
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var td = new Date(target), lbl = $('[data-drop-label]');
    if (lbl) lbl.textContent = td.getUTCDate() + ' ' + months[td.getUTCMonth()] + ', ' + pad(td.getUTCHours()) + ':' + pad(td.getUTCMinutes()) + ' GMT';
    var set = function (el, v) { if (el && el.textContent !== v) { el.textContent = v; el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); } };
    var tick = function () {
      var diff = Math.max(0, target - Date.now());
      set(els.d, pad(Math.floor(diff / 864e5))); set(els.h, pad(Math.floor(diff / 36e5) % 24));
      set(els.m, pad(Math.floor(diff / 6e4) % 60)); set(els.s, pad(Math.floor(diff / 1e3) % 60));
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------------- reveal on scroll ---------------- */
  var revealEls = $$('[data-reveal], .card');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else { revealEls.forEach(function (el) { el.classList.add('is-in'); }); }

  /* ---------------- story: words light up as you scroll ---------------- */
  var story = $('#storyText');
  var words = [];
  if (story) {
    var gold = story.getAttribute('data-gold') || '';
    var text = story.textContent, gi = text.indexOf(gold);
    var plain = gi > -1 ? text.slice(0, gi) : text, gtxt = gi > -1 ? gold : '';
    story.setAttribute('aria-label', text);
    story.textContent = '';
    var addWords = function (str, isGold) {
      str.split(/(\s+)/).forEach(function (w) {
        if (!w) return;
        if (/^\s+$/.test(w)) { story.appendChild(document.createTextNode(w)); return; }
        var s = document.createElement('span'); s.className = 'w' + (isGold ? ' g' : ''); s.textContent = w; s.setAttribute('aria-hidden', 'true');
        story.appendChild(s); words.push(s);
      });
    };
    addWords(plain, false); addWords(gtxt, true);
    if (reduce) words.forEach(function (w) { w.classList.add('on'); });
  }
  function onScrollStory() {
    if (!story || reduce) return;
    var r = story.getBoundingClientRect(), vh = window.innerHeight;
    var p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
    var n = Math.round(p * words.length);
    words.forEach(function (w, i) { w.classList.toggle('on', i < n); });
  }

  /* ---------------- parallax ---------------- */
  var px = $$('[data-parallax]');
  function onScrollParallax() {
    if (reduce) return;
    var vh = window.innerHeight;
    px.forEach(function (img) {
      var r = img.parentNode.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var k = parseFloat(img.getAttribute('data-parallax'));
      var off = (r.top + r.height / 2 - vh / 2) * -k;
      img.style.transform = 'translate3d(0,' + (off - r.height * 0.09).toFixed(1) + 'px,0)';
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { onScrollHeader(); onScrollStory(); onScrollParallax(); onScrollSticky(); ticking = false; });
  }, { passive: true });

  /* ---------------- hero light follows cursor ---------------- */
  var spot = $('#spot'), hero = $('.hero');
  if (spot && hero && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      spot.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      spot.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  }

  /* ---------------- waitlist ---------------- */
  var form = $('#waitlistForm');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    // TODO when live: POST to Shopify /contact (form_type=customer) or a Klaviyo list
    $('#formCard').classList.add('is-done');
  });

  /* ---------------- bag ---------------- */
  var cart = [];
  try { cart = JSON.parse(store.get('laiv-cart') || '[]'); } catch (e) { cart = []; }
  function renderCart() {
    $$('[data-cart-count]').forEach(function (el) { el.textContent = cart.length; });
    var box = $('[data-cart-items]'); if (!box) return;
    if (!cart.length) { box.innerHTML = '<p class="drawer__empty">Your bag is empty — Drop 01 opens soon.</p>'; return; }
    box.innerHTML = '';
    cart.forEach(function (it, i) {
      var row = document.createElement('div'); row.className = 'line-item';
      row.innerHTML = '<img alt="" src="' + it.img + '"><div><b></b><span></span></div><button class="link" aria-label="Remove item">Remove</button>';
      row.querySelector('b').textContent = it.name;
      row.querySelector('span').textContent = it.colour + ' / ' + it.size + ' · [PRICE]';
      row.querySelector('button').addEventListener('click', function () { cart.splice(i, 1); saveCart(); });
      box.appendChild(row);
    });
  }
  function saveCart() { store.set('laiv-cart', JSON.stringify(cart)); renderCart(); }
  function openCart() { body.classList.add('cart-open'); }
  function closeCart() { body.classList.remove('cart-open'); }
  $$('[data-cart-open]').forEach(function (b) { b.addEventListener('click', openCart); });
  $$('[data-cart-close]').forEach(function (b) { b.addEventListener('click', closeCart); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeCart(); body.classList.remove('menu-open'); } });
  renderCart();

  /* ---------------- product page ---------------- */
  var pdp = $('#pdp');
  var stickyBuy = $('.sticky-buy'), mainAdd = $('#addToBag');
  function onScrollSticky() {
    if (!stickyBuy || !mainAdd) return;
    stickyBuy.classList.toggle('show', mainAdd.getBoundingClientRect().bottom < 0);
  }
  if (pdp) {
    var colours = {
      charcoal: { name: 'Charcoal', img: 'assets/img/fitted-tee.jpg', pos: 'center 40%' },
      white: { name: 'White', img: 'assets/img/back-print-tee.jpg', pos: 'center 30%' }
    };
    var q = new URLSearchParams(location.search).get('c');
    var state = { colour: colours[q] ? q : 'charcoal', size: null };
    var stage = $('#stage'), stageImg = $('#stageImg'), cLabel = $$('[data-colour-name]'), sLabel = $('[data-size-name]');
    var setColour = function (id, instant) {
      state.colour = id; var c = colours[id];
      cLabel.forEach(function (el) { el.textContent = c.name; });
      $$('[data-colour]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-colour') === id); b.setAttribute('aria-pressed', b.getAttribute('data-colour') === id); });
      if (instant) { stageImg.src = c.img; stageImg.style.objectPosition = c.pos; return; }
      stageImg.classList.add('out');
      setTimeout(function () { stageImg.src = c.img; stageImg.style.objectPosition = c.pos; stageImg.classList.remove('out'); }, 350);
      updateCta();
    };
    $$('[data-colour]').forEach(function (b) { b.addEventListener('click', function () { setColour(b.getAttribute('data-colour')); }); });
    $$('.size').forEach(function (b) {
      b.addEventListener('click', function () {
        state.size = b.textContent.trim();
        $$('.size').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
        if (sLabel) sLabel.textContent = state.size;
        updateCta();
      });
    });
    var ctas = $$('[data-add]');
    function updateCta() { ctas.forEach(function (b) { b.firstChild.textContent = state.size ? 'Add to bag — ' + colours[state.colour].name + ' / ' + state.size + ' ' : 'Select a size '; }); }
    ctas.forEach(function (b) {
      b.addEventListener('click', function () {
        if (!state.size) {
          var s = $('.sizes'); s.classList.remove('shake'); void s.offsetWidth; s.classList.add('shake');
          s.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); return;
        }
        cart.push({ name: 'Fitted Logo Tee', colour: colours[state.colour].name, size: state.size, img: colours[state.colour].img });
        saveCart(); openCart();
      });
    });
    if (stage) {
      stage.addEventListener('click', function () { stage.classList.toggle('zoom'); });
      stage.addEventListener('pointermove', function (e) {
        if (!stage.classList.contains('zoom')) return;
        var r = stage.getBoundingClientRect();
        stageImg.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%';
      });
    }
    setColour(state.colour, true); updateCta();
  }

  onScrollHeader(); onScrollStory(); onScrollParallax();
})();
