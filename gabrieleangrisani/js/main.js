(() => {
  const AUTOPLAY_INTERVAL_MS = 10000; // 10s
  const SLIDE_CHANGE_OVERLAY_MS = 2000; // overlay visivo 2s
  const CAROUSEL_VIDEO_COUNT = 2; // numero massimo di video nel carosello
  const VIDEOS = [
    { id: 'ourcraft', src: 'media/ourcraft.mp4', title: 'Ourcraft', desc: 'Short film - urban story' },
    { id: 'spot-di-mauro', src: 'media/spot_di_mauro.mp4', title: 'Spot Di Mauro', desc: 'Documentary excerpt - sea & light' },
    { id: 'cast-invincible-rmx', src: 'media/cast_invincible_rmx.mp4', title: 'CAST - INVINCIBLE RMX', desc: 'Drone footage - landscape' },
  ];


  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from((ctx || document).querySelectorAll(s));
  const log = (...a) => console.log('[main]', ...a);
  const err = (...a) => console.error('[main]', ...a);

  /* ---------------- helpers ---------------- */
  function pauseAndMuteAllVideos(scope = document) {
    try {
      $$('video', scope).forEach(v => {
        try { v.pause(); } catch (e) {}
        try { v.currentTime = 0; } catch (e) {}
        try { v.muted = true; v.volume = 0; v.setAttribute('muted',''); } catch(e){}
      });
    } catch (e) {}
  }

  function createElem(tag, props = {}, html = '') {
    const el = document.createElement(tag);
    for (const k in props) {
      if (k === 'class') el.className = props[k];
      else if (k === 'dataset') {
        for (const d in props[k]) el.dataset[d] = props[k][d];
      } else el.setAttribute(k, props[k]);
    }
    if (html) el.innerHTML = html;
    return el;
  }

  /* ---------------- MENU with GSAP ---------------- */
  function initMenu(root = document) {
    const navToggle = root.querySelector('#navToggle');
    const navList = root.querySelector('#navList');
    const mainEl = document.querySelector('main');
    if (!navToggle || !navList || !mainEl) return;

    const basePaddingTop = parseInt(getComputedStyle(mainEl).paddingTop, 10) || 96;

    function openMenu() {
      const h = navList.scrollHeight;
      navList.style.maxHeight = h + 'px';
      navList.classList.add('open');
      mainEl.style.paddingTop = (basePaddingTop ) + 'px';
      navToggle.setAttribute('aria-expanded', 'true');
      const items = Array.from(navList.querySelectorAll('a'));
      if (window.gsap && items.length) gsap.fromTo(items, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.28, ease: 'power2.out' });
    }
    function closeMenu() {
      navList.classList.remove('open');
      navList.style.maxHeight = '0px';
      mainEl.style.paddingTop = basePaddingTop + 'px';
      navToggle.setAttribute('aria-expanded', 'false');
      if (window.gsap) gsap.to(navList.querySelectorAll('a'), { y: 6, opacity: 0, stagger: 0.03, duration: 0.12, ease: 'power1.in' });
    }

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navList.classList.contains('open') ? closeMenu() : openMenu();
    });

    document.addEventListener('click', (e) => {
      if (!navList.classList.contains('open')) return;
      const isInside = e.target.closest && e.target.closest('#navList');
      if (!isInside && !e.target.closest('#navToggle')) closeMenu();
    });

    navList.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-nav]');
      if (a) closeMenu();
    });

    window.addEventListener('resize', () => {
      if (navList.classList.contains('open')) {
        const h = navList.scrollHeight;
        navList.style.maxHeight = h + 'px';
        mainEl.style.paddingTop = (basePaddingTop + h) + 'px';
      }
    });
  }

  /* ---------------- populate previews (home previewGrid + galleryGrid) ----------------
     - create anchor -> video + info
     - set src immediately with preload=metadata so thumbnail shows
     - play on hover (muted), pause+reset on leave
  */
  function populatePreviews(root = document) {
    try {
      const previewGrid = root.querySelector('#previewGrid');
      const galleryGrid = root.querySelector('#galleryGrid');

      function makeItem(vmeta, idx, cls = 'preview-item') {
        // usa vmeta.id (stabile) nell'href e data
        const a = createElem('a', {
          class: cls,
          href: `video.html?id=${encodeURIComponent(vmeta.id)}`,
          dataset: { videoId: vmeta.id }
        });
        a.style.position = 'relative';
        const videoHtml = `<video src="${vmeta.src}" preload="metadata" playsinline muted></video>`;
        const infoHtml = `<div class="preview-info"><strong>${vmeta.title}</strong><small>${vmeta.desc}</small></div>`;
        a.innerHTML = videoHtml + `<div class="hover-overlay" aria-hidden="true"></div>` + infoHtml;

        // store id on click for fallback
        a.addEventListener('click', (e) => {
          try { sessionStorage.setItem('selectedVideoId', String(vmeta.id)); } catch (err) {}
          // navigation via anchor
        });

        // hover handlers identici
        const vid = a.querySelector('video');
        try {
          vid.controls = false;
          vid.removeAttribute('controls');
          vid.muted = true;
          vid.volume = 0;
          vid.playsInline = true;
        } catch (e) {}

        let hoverTimeout = null;
        const start = () => {
          hoverTimeout = setTimeout(() => {
            try { vid.muted = true; vid.volume = 0; vid.play().catch(()=>{}); a.classList.add('hovering'); } catch(e){}
          }, 60);
        };
        const stop = () => {
          if (hoverTimeout) { clearTimeout(hoverTimeout); hoverTimeout = null; }
          try { vid.pause(); vid.currentTime = 0; } catch(e){}
          a.classList.remove('hovering');
        };
        a.addEventListener('mouseenter', start);
        a.addEventListener('mouseleave', stop);
        a.addEventListener('focusin', start);
        a.addEventListener('focusout', stop);

        return a;
      }

      if (previewGrid) {
        previewGrid.innerHTML = '';
        VIDEOS.forEach((m, i) => previewGrid.appendChild(makeItem(m, i, 'preview-item')));
      }
      if (galleryGrid) {
        galleryGrid.innerHTML = '';
        VIDEOS.forEach((m, i) => galleryGrid.appendChild(makeItem(m, i, 'grid-item')));
      }
    } catch (e) {
      err('populatePreviews:', e);
    }
  }


  /* ---------------- carousel (hero) ----------------
     - mostra l'overlay esistente (title/desc) per 2s al cambio slide
     - reset autoplay quando si usa prev/next
     - click SOLO sul titolo (.carousel-text)
     - evita chiamate fragili a barba.go (usa click su <a> per lasciare che Barba intercetti)
     - swipe: prev/next, e blocco dei gesture orizzontali del browser
  */
  function initHomeCarousel(root = document) {
    const section = root.querySelector('#carouselSection');
    if (!section) return;
    if (section.dataset._init) return;
    section.dataset._init = '1';

    // disambiguazione elementi
    const videoEl = section.querySelector('.carousel-video');
    const prevBtn = section.querySelector('#prevBtn');
    const nextBtn = section.querySelector('#nextBtn');
    const overlay = section.querySelector('.carousel-overlay');
    const overlayBottom = section.querySelector('.carousel-bottom');

    const titleEl = overlay?.querySelector('.carousel-text h1') ? overlay.querySelector('.carousel-text') : overlay?.querySelector('.carousel-text');
    const descEl = overlay?.querySelector('.carousel-text p');

    if (!videoEl || !overlay || !overlayBottom || !titleEl || !descEl) {
      console.warn('[main][carousel] elementi mancanti', { videoEl, overlay, overlayBottom, titleEl, descEl });
      return;
    }

    // --- prevenzione gesture orizzontali del browser (migliora swipe)
    try {
      // preferibile usare CSS lato stylesheet, ma applichiamo anche inline per sicurezza
      section.style.touchAction = section.style.touchAction || 'pan-y';
      section.style.overscrollBehavior = section.style.overscrollBehavior || 'contain';
      section.style.WebkitOverflowScrolling = section.style.WebkitOverflowScrolling || 'touch';
    } catch (e) {}

    // scegli random subset ma CONSERVA l'id originale di ogni video
    const shuffled = [...VIDEOS].sort(() => 0.5 - Math.random());
    const slides = shuffled.slice(0, CAROUSEL_VIDEO_COUNT).map((m, originalIndex) => {
      return Object.assign({}, m, { originalIndex });
    });

    let idx = 0;
    let autoplayTimer = null;
    const savedTime = Object.create(null);

    function saveCurrentState(oldIdx) {
      try {
        const cur = slides[oldIdx];
        if (!cur) return;
        const vidId = cur.id;
        savedTime[vidId] = Math.max(0, Math.min(videoEl.duration || 0, videoEl.currentTime || 0));
      } catch (e) {}
    }

    function setVideo(i) {
      i = (i + slides.length) % slides.length;
      saveCurrentState(idx);
      idx = i;
      const meta = slides[idx];

      try { videoEl.pause(); } catch (e) {}
      try { videoEl.muted = true; videoEl.volume = 0; videoEl.playsInline = true; videoEl.setAttribute('muted',''); } catch (e) {}

      // lazy load current slide video
      videoEl.removeAttribute('src');
      videoEl.src = meta.src;
      videoEl.load();

      const onLoaded = () => {
        try {
          const t = Math.min(savedTime[meta.id] || 0, Math.max(0, videoEl.duration || Infinity));
          if (t > 0 && !Number.isNaN(t)) videoEl.currentTime = t;
        } catch (e) {}
        overlay.querySelector('.carousel-text h1').textContent = meta.title;
        overlay.querySelector('.carousel-text p').textContent = meta.desc;
        videoEl.play().catch(()=>{});
        videoEl.removeEventListener('loadedmetadata', onLoaded);
      };
      videoEl.addEventListener('loadedmetadata', onLoaded);
    }

    function showExistingOverlayBriefly() {
      overlay.classList.add('force-visible');
      setTimeout(() => overlay.classList.remove('force-visible'), SLIDE_CHANGE_OVERLAY_MS);
    }

    function goTo(i) {
      const nextIdx = (i + slides.length) % slides.length;
      showExistingOverlayBriefly();
      if (window.gsap) {
        const tl = gsap.timeline();
        tl.to(videoEl, { opacity: 0, duration: 0.28 });
        tl.add(() => setVideo(nextIdx));
        tl.to(videoEl, { opacity: 1, duration: 0.42 }, '>-0.02');
      } else {
        videoEl.style.opacity = 0;
        setTimeout(() => { setVideo(nextIdx); videoEl.style.opacity = 1; }, 360);
      }
    }

    function resetAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => goTo(idx + 1), AUTOPLAY_INTERVAL_MS);
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(idx - 1); resetAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(idx + 1); resetAutoplay(); });

    // --- swipe handlers (stesso comportamento) ---
    let startX = 0, deltaX = 0, isSwiping = false;
    const SWIPE_THRESHOLD = 60;
    function onPointerDown(ev) {
      // ignora click sui controlli/ link / nav toggle
      if (ev.target.closest && (ev.target.closest('.control-btn') || ev.target.closest('a') || ev.target.closest('#navToggle'))) return;
      startX = ev.clientX; deltaX = 0; isSwiping = true;
      // per touch, proviamo a prevenire il comportamento del browser (back/forward su swipe)
      try { if (ev.pointerType === 'touch') ev.preventDefault(); } catch(e){}
      section.setPointerCapture?.(ev.pointerId);
    }
    function onPointerMove(ev) { if (!isSwiping) return; deltaX = ev.clientX - startX; }
    function onPointerUp(ev) {
      if (!isSwiping) return;
      isSwiping = false;
      section.releasePointerCapture?.(ev.pointerId);
      if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
        if (deltaX < 0) goTo(idx + 1); else goTo(idx - 1);
        resetAutoplay();
      }
      deltaX = 0;
    }
    section.addEventListener('pointerdown', onPointerDown);
    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('pointerup', onPointerUp);
    section.addEventListener('pointercancel', onPointerUp);
    section.addEventListener('pointerleave', onPointerUp);

    // savedTime persistence while playing
    let saveInterval = null;
    videoEl.addEventListener('playing', () => {
      if (saveInterval) clearInterval(saveInterval);
      saveInterval = setInterval(() => {
        try { savedTime[slides[idx].id] = videoEl.currentTime || savedTime[slides[idx].id] || 0; } catch(e){}
      }, 1000);
    });
    videoEl.addEventListener('pause', () => {
      if (saveInterval) { clearInterval(saveInterval); saveInterval = null; }
      try { savedTime[slides[idx].id] = videoEl.currentTime || savedTime[slides[idx].id] || 0; } catch(e){}
    });

    /* ---------- robust navigation via anchor (Barba-friendly) ---------- */
    function navigateTo(url) {
      try {
        // creiamo <a> e dispatchiamo click: Barba lo intercetterà correttamente
        const a = document.createElement('a');
        a.href = url;
        a.style.display = 'none';
        document.body.appendChild(a);
        const ev = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });
        a.dispatchEvent(ev);
        setTimeout(() => {
          try { a.remove(); } catch(e){}
          // fallback se non siamo stati reindirizzati
          if (location.href.indexOf(url) === -1) {
            try { location.assign(url); } catch (err) { try { window.open(url, '_self'); } catch (err2) {} }
          }
        }, 80);
      } catch (e) {
        try { location.assign(url); } catch (err) { try { window.open(url, '_self'); } catch (err2) {} }
      }
    }

    /* ---------- better touch handling: detect horizontal drag and prevent browser nav ---------- */
    let touchStartX = 0, touchStartY = 0, touchMoved = false;
    function onTouchStart(e) {
      if (!e.touches || !e.touches[0]) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
    }
    function onTouchMove(e) {
      if (!e.touches || !e.touches[0]) return;
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      // se movimento orizzontale dominante, previeni default per evitare history-swipe
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 12) {
        touchMoved = true;
        e.preventDefault(); // ATTENZIONE: listener impostato con {passive:false} sotto
      }
    }
    // aggiungi listener touch con passive:false per poter chiamare preventDefault
    section.addEventListener('touchstart', onTouchStart, { passive: true });
    section.addEventListener('touchmove', onTouchMove, { passive: false });

    /* ---------- NAVIGAZIONE SOLO SUL TITOLO (.carousel-text) ---------- */
    try {
      // Pulisci eventuale aria-hidden per accessibilità
      if (overlay.hasAttribute('aria-hidden')) {
        overlay.removeAttribute('aria-hidden');
      }

      // Se non c’è ancora un link dentro, creiamolo
      let titleLink = titleEl.querySelector('a');
      if (!titleLink) {
        titleLink = document.createElement('a');
        titleLink.href = '#';
        titleLink.id = 'carouselLink';
        titleLink.innerHTML = titleEl.innerHTML;
        titleEl.innerHTML = '';
        titleEl.appendChild(titleLink);
      }

      titleLink.setAttribute('role', 'link');
      titleLink.setAttribute('tabindex', '0');
      titleLink.style.cursor = 'pointer';
      titleLink.style.textDecoration = 'none';
      titleLink.style.color = 'inherit';

      // Click o Enter aprono il link (compatibile Barba o fallback normale)
      titleLink.addEventListener('click', (e) => {
        const currentMeta = slides[idx];
        const vidId = currentMeta?.id || idx;
        const url = `video.html?id=${encodeURIComponent(vidId)}`;
        sessionStorage.setItem('selectedVideoId', vidId);
        titleLink.href = url; // aggiorna l'href effettivo
      });

      titleLink.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          titleLink.click();
        }
      });

      // Hover effect GSAP
      if (window.gsap) {
        titleLink.addEventListener('mouseenter', () => {
          gsap.to(titleLink, {
            duration: 0.36,
            scale: 1.04,
            textShadow: "0px 0px 12px rgba(255,255,255,0.85)",
            ease: "power2.out"
          });
        });
        titleLink.addEventListener('mouseleave', () => {
          gsap.to(titleLink, {
            duration: 0.28,
            scale: 1,
            textShadow: "0px 0px 0px rgba(0,0,0,0)",
            ease: "power2.inOut"
          });
        });
      }

    } catch (e) {
      console.warn('[main][carousel] errore binding titolo:', e);
    }



    // NOTE: ho rimosso il document-level capture click e l'overlayBottom click che facevano navigazione
    // perchè rendevano l'area troppo grande; ora la sola interazione che apre il video è il click sul .carousel-text

    try { videoEl.muted = true; videoEl.volume = 0; videoEl.playsInline = true; } catch(e) {}
    setVideo(0);
    resetAutoplay();
    window.addEventListener('beforeunload', () => { try { videoEl.pause(); } catch(e) {} });
    console.log('[main][carousel] init completato — title-only navigation + swipe fix attivi');
  }



  /* ---------------- video page ---------------- */
  function initVideoPage(root = document) {
    const player = root.querySelector('#player') || root.querySelector('video');
    if (!player) return;
    const params = new URLSearchParams(window.location.search);
    let idParam = null;
    if (params.has('id')) idParam = params.get('id');

    // fallback sessionStorage
    if (!idParam) {
      try {
        const stored = sessionStorage.getItem('selectedVideoId');
        if (stored) idParam = stored;
      } catch (e) {}
    }
    // se idParam è una stringa che rappresenta un numero, ok; ma cerchiamo per id (stringa) PRIMARIO
    let foundIndex = VIDEOS.findIndex(v => String(v.id) === String(idParam));
    if (foundIndex === -1) {
      // se non trovato per id, prova a parsare come indice numerico
      const parsed = parseInt(idParam, 10);
      if (!Number.isNaN(parsed) && parsed >= 0 && parsed < VIDEOS.length) foundIndex = parsed;
    }
    const idToUse = (foundIndex === -1) ? 0 : foundIndex;

    try { sessionStorage.removeItem('selectedVideoId'); } catch(e){}

    // pause/mute any other videos
    pauseAndMuteAllVideos(document);

    const meta = VIDEOS[idToUse];
    player.src = meta.src;
    player.load();
    try { player.muted = false; player.removeAttribute('muted'); } catch(e){}
    player.controls = true;
    player.style.width = '100%';
    player.style.height = 'auto';
    player.play().catch(()=>{});
    const title = root.querySelector('#videoTitle');
    const desc = root.querySelector('#videoDesc');
    if (title) title.textContent = meta.title;
    if (desc) desc.textContent = meta.desc;
  }


  /* ---------------- Barba-safe init ---------------- */
  function initBarbaSafe(runInitial) {
    const hasBarba = !!window.barba;
    if (!hasBarba) { runInitial(document); return; }

    try {
      barba.init({
        sync: true,
        transitions: [{
          async leave(data) {
            try { pauseAndMuteAllVideos(data.current.container); } catch(e){}
            if (window.gsap) await gsap.to(data.current.container, { opacity: 0, y: -20, duration: 0.32 });
          },
          async enter(data) {
            window.scrollTo(0, 0);
            if (window.gsap) gsap.fromTo(data.next.container, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.42 });
            runInitial(data.next.container);
          },
          async once(data) {
            if (window.gsap) gsap.from(data.next.container, { opacity: 0, y: 20, duration: 0.5 });
            runInitial(data.next.container);
          }
        }],
        prevent({ el }) {
          if (!el) return false;
          try {
            const url = new URL(el.href, location.href);
            return url.origin !== location.origin;
          } catch (e) { return false; }
        }
      });
    } catch (e) {
      runInitial(document);
    }
  }

  /* ---------------- run inits by page ---------------- */
  function runInits(context = document) {
    initMenu(context);
    populatePreviews(context);
    if (context.querySelector && context.querySelector('#carouselSection')) initHomeCarousel(context);
    if (context.querySelector && context.querySelector('#player')) initVideoPage(context);

    // facts toggle in about
    const factsBtn = context.querySelector && context.querySelector('#factsBtn');
    if (factsBtn) {
      const factsList = context.querySelector('.facts');
      factsBtn.addEventListener('click', () => {
        if (factsList) factsList.classList.toggle('hidden');
        if (window.gsap && factsList && !factsList.classList.contains('hidden')) gsap.fromTo(factsList, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32 });
      });
    }
  }

  /* ---------------- start ---------------- */
  function start() {
    if (window.__APP_INITIALIZED__) return;
    window.__APP_INITIALIZED__ = true;
    initBarbaSafe(runInits);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  log('main.js ready — carousel arrows, overlay on change, dynamic previews populated');
})();
