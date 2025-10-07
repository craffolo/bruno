// js/main.js 
(() => {
  /* ---------------- CONFIG / TIMINGS ---------------- */
  const HOME_AUTOPLAY_INTERVAL_MS = 5000;     // autoplay carosello home (modificabile)
  const GALLERY_AUTOPLAY_INTERVAL_MS = 15000; // autoplay gallery player

  const SLIDE_CHANGE_OVERLAY_MS = 1500;
  const PLAY_TRANSIENT_MS = 500;
  const MOUSE_IDLE_MS = 2000; // per gallery overlay

  // Data arrays (possono essere sovrascritti globalmente)
  const HOME_CAROUSEL = (typeof window !== 'undefined' && window.HOME_CAROUSEL) ? window.HOME_CAROUSEL : [];
  const FEATURED_IDS = [ 'alici_di_menaica_teaser', 'studio_notarile_dausilio','partenope_fashion_film', 'cast_ride_or_die', 'evan_primo_marzo', 'niven_alpaca_freestyle', 'sevdaliza_human', 'sinestesie', 'waldeinsamkeit'];
  const VIDEOS = (typeof window !== 'undefined' && window.VIDEOS) ? window.VIDEOS : [
    { 
      id: 'di-agostino-costruzioni', 
      src: 'https://jellybruno.home04.cyou/Items/afedd456c88d3f5dd2d53b6de535e9eb/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      poster: 'media/static/profile.png',
      title: 'Di Agostino Costruzioni', 
      desc: 'Corporate video - architecture & construction', 
      category: 'Corporate' 
    },
    { 
      id: 'tecnocarpoint_trailer', 
      src: '', 
      title: 'Tecnocarpoint Trailer', 
      desc: 'Corporate video - cars & showroom', 
      category: 'Corporate' 
    },
    { 
      id: 'villa_utopia', 
      src: 'https://jellybruno.home04.cyou/Items/9dcd31f4187d033811d211958d7fc56a/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Villa Utopia', 
      desc: 'Corporate video - real estate & luxury', 
      category: 'Corporate' 
    },
    
    // Documentaries
    { 
      id: 'alici_di_menaica_mini_doc', 
      src: 'https://jellybruno.home04.cyou/Items/eb10ccc7da5c8da500798977db515274/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Alici di Menaica - Mini Doc', 
      desc: 'Documentary - fishing & tradition',  
      category: 'Documentaries' 
    },
    { 
      id: 'alici_di_menaica_teaser', 
      src: 'https://jellybruno.home04.cyou/Items/159939ff98105cb84976523d4a8747f0/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Alici di Menaica - Teaser', 
      desc: 'Documentary teaser - fishing & tradition', 
      category: 'Documentaries'
    },
    { 
      id: 'cm_festafinecampagna25', 
      src: 'https://jellybruno.home04.cyou/Items/a3af8e041039eaa5b24a1df30e33ac34/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'CM Festa Fine Campagna 25', 
      desc: 'Documentary - community & celebration', 
      category: 'Documentaries' 
    },

    // Fashion
    { 
      id: 'alienation', 
      src: 'https://jellybruno.home04.cyou/Items/d65a707cc651a33626c791874ef9db68/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Alienation', 
      desc: 'Fashion video - avant-garde & surreal', 
      category: 'Fashion' 
    },
    { 
      id: 'partenope_fashion_film', 
      src: 'https://jellybruno.home04.cyou/Items/38281e6c00e1ae9f8d4f2588a7a4cf95/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Partenope Fashion Film', 
      desc: 'Fashion video - elegance & style', 
      category: 'Fashion' 
    },

    // Fitness
    { 
      id: 'duetto_nuova_scheda', 
      src: 'https://jellybruno.home04.cyou/Items/4864602a68758ea7d8fa9fd9b98491d5/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Duetto Nuova Scheda', 
      desc: 'Fitness video - workout & training', 
      category: 'Fitness' 
    },
    { 
      id: 'estratto_trailer_video_lungo', 
      src: 'https://jellybruno.home04.cyou/Items/41f0285d1af84931e0b3dde5ed6c0f9e/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Estratto Trailer Video Lungo', 
      desc: 'Fitness video - training & motivation', 
      category: 'Fitness' 
    },
    { 
      id: 'reel_leg_day', 
      src: 'https://jellybruno.home04.cyou/Items/8cfbfee50dde73127d8202247785db7b/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Reel Leg Day', 
      desc: 'Fitness video - leg workout & strength', 
      category: 'Fitness' 
    },
    { 
      id: 'reel_presentazione', 
      src: 'https://jellybruno.home04.cyou/Items/e6458e7d6f33fe808a553c9184c4d673/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Reel Presentazione', 
      desc: 'Fitness video - introduction & overview', 
      category: 'Fitness' 
    },
    { 
      id: 'reel_workouts', 
      src: 'https://jellybruno.home04.cyou/Items/b805a3ca2d59298839c94c0c184766d3/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Reel Workouts', 
      desc: 'Fitness video - various workouts & routines', 
      category: 'Fitness' 
    },
    { 
      id: 'tiktok_1_tom_plantz', 
      src: 'https://jellybruno.home04.cyou/Items/fc2b5a2bbb447341d7fa1644fd9ae189/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'TikTok 1 Tom Plantz', 
      desc: 'Fitness video - TikTok style workout', 
      category: 'Fitness' 
    },
    { 
      id: 'tiktok_2_hipthrust', 
      src: 'https://jellybruno.home04.cyou/Items/042ecf17e8a944e6d28689cdbf674ba4/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'TikTok 2 Hipthrust', 
      desc: 'Fitness video - TikTok style hip thrust workout', 
      category: 'Fitness' 
    },
    { 
      id: 'tiktok_3_compilation', 
      src: 'https://jellybruno.home04.cyou/Items/74b4f4339fcf531164603748a7cc1408/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'TikTok 3 Compilation', 
      desc: 'Fitness video - TikTok style compilation', 
      category: 'Fitness' 
    },

    // Food
    { 
      id: 'antonia_klugman_la_quinta_stagione', 
      src: 'https://jellybruno.home04.cyou/Items/d9042551a90b1e420921d77d471e1261/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Antonia Klugman - La Quinta Stagione', 
      desc: 'Food video - culinary art & seasonal ingredients', 
      category: 'Food' 
    },
    { 
      id: 'cocktail_demo', 
      src: 'https://jellybruno.home04.cyou/Items/14ff37f6bac567d8cc20dcda153ba097/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Cocktail Demo', 
      desc: 'Food video - cocktail making & bartending', 
      category: 'Food' 
    },
    { 
      id: 'intervista_varnelli', 
      src: 'https://jellybruno.home04.cyou/Items/7f1b5ee20fb88fe586d71572c8da6956/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Intervista Varnelli', 
      desc: 'Food video - interview & brand story', 
      category: 'Food' 
    },
    { 
      id: 'martina_caruso_la_quinta_stagione', 
      src: 'https://jellybruno.home04.cyou/Items/867031d47a4efe9844b7060b8c4a02a7/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Martina Caruso - La Quinta Stagione', 
      desc: 'Food video - culinary art & seasonal ingredients', 
      category: 'Food' 
    },
    { 
      id: 'scarpariello_varnelli', 
      src: 'https://jellybruno.home04.cyou/Items/45cd826b8b47e86564dd795de250a079/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Scarpariello Varnelli', 
      desc: 'Food video - recipe & cooking demonstration', 
      category: 'Food' 
    },
    { 
      id: 'valeria_piccini_la_quinta_stagione', 
      src: 'https://jellybruno.home04.cyou/Items/90ee38af27ed5dd0687e83d8cfd1e90b/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Valeria Piccini - La Quinta Stagione', 
      desc: 'Food video - culinary art & seasonal ingredients', 
      category: 'Food' 
    },

    // Music
    { 
      id: 'cast_ride_or_die', 
      src: 'https://jellybruno.home04.cyou/Items/e3c02ec29604a8e23bb2b22cf4d13b7c/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'CAST - RIDE OR DIE', 
      desc: 'Music video - urban & dynamic', 
      category: 'Music' 
    },
    { 
      id: 'eb_me_in_te', 
      src: 'https://jellybruno.home04.cyou/Items/202700e20ff2c7f7f986f019d9a3dc1c/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'EB - ME IN TE', 
      desc: 'Music video - romantic & emotional', 
      category: 'Music' 
    },
    { 
      id: 'evan_primo_marzo', 
      src: 'https://jellybruno.home04.cyou/Items/490247b718a393c61736a2c5cf3e95f7/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'EVAN - PRIMO MARZO', 
      desc: 'Music video - introspective & moody', 
      category: 'Music' 
    },
    { 
      id: 'niven_alpaca_freestyle', 
      src: 'https://jellybruno.home04.cyou/Items/b6ce87128c53f9332b742fa435cf0eaa/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'NIVEN - ALPACA FREESTYLE', 
      desc: 'Music video - energetic & vibrant', 
      category: 'Music' 
    },
    { 
      id: 'sevdaliza_human', 
      src: 'https://jellybruno.home04.cyou/Items/3493805ee55cff227e17a821a8ee5985/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'SEVDALIZA - HUMAN', 
      desc: 'Music video - artistic & thought-provoking', 
      category: 'Music' 
    },
    { 
      id: 'sinestesie', 
      src: 'https://jellybruno.home04.cyou/Items/ac45a1bc19fcf9f8845d62654886e7a1/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'SINESTESIE', 
      desc: 'Music video - experimental & surreal', 
      category: 'Music' 
    },

    // Shortfilm
    {
      id: 'chiacchiere_da_ascensore', 
      src: 'https://jellybruno.home04.cyou/Items/45ec83c2dadbcf2c62d751129ad6808d/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Chiacchiere da Ascensore', 
      desc: 'Short film - comedy & daily life', 
      category: 'Shortfilm' 
    },
    {
      id: 'waldeinsamkeit', 
      src: 'https://jellybruno.home04.cyou/Items/0e10af99dee24604fe30d6425b2c3e2f/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Waldeinsamkeit', 
      desc: 'Short film - nature & solitude', 
      category: 'Shortfilm' 
    },

    // Spot
    { 
      id: 'studio_notarile_dausilio', 
      src: 'https://jellybruno.home04.cyou/Items/0a8f310e7ea2eac7b335e28bf853bcf2/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
      title: 'Studio Notarile D\'Ausilio', 
      desc: 'Spot - professional services', 
      category: 'Spot' 
    },

  ];
  const CATEGORIES = ['Corporate', 'Documentaries', 'Fashion', 'Fitness', 'Food', 'Music', 'Shortfilm', 'Spot'];

  /* ---------------- HELPERS ---------------- */
  const $ = (s, ctx = document) => (ctx || document).querySelector(s);
  const $$ = (s, ctx = document) => Array.from((ctx || document).querySelectorAll(s));
  const log = (...a) => console.log('[main]', ...a);

  function create(tag, attrs = {}, html = '') {
    const el = document.createElement(tag);
    for (const k in attrs) {
      if (k === 'class') el.className = attrs[k];
      else if (k === 'dataset') Object.entries(attrs[k]).forEach(([dn, dv]) => el.dataset[dn] = dv);
      else el.setAttribute(k, attrs[k]);
    }
    if (html) el.innerHTML = html;
    return el;
  }

  /* ---------- Gallery preview helpers (lazy on hover) ---------- */
  /* Mantiene traccia delle preview attive per interromperle quando necessario */
  const _activePreviews = new Set();

  function stopPreview(vid) {
    if (!vid) return;
    try {
      vid.pause();
      // rimuove la sorgente per liberare memoria/bandwidth
      if (vid.getAttribute('src')) {
        vid.removeAttribute('src');
        if (typeof vid.load === 'function') vid.load();
      }
      vid.currentTime = 0;
    } catch (e) { /* ignore */ }
    const item = vid.closest && vid.closest('.grid-item');
    if (item) item.classList.remove('hovering');
    _activePreviews.delete(vid);
  }

  function stopAllPreviewsExcept(exceptVid = null) {
    for (const v of Array.from(_activePreviews)) {
      if (v === exceptVid) continue;
      stopPreview(v);
    }
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, (s) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }

  function pauseAll(scope = document) {
    $$('video', scope).forEach(v => { try { v.pause(); } catch (e) {} });
  }

  /* persistent mute preference (used by GalleryPlayer) */
  const MUTE_KEY = 'site_mute_pref';
  function readMute() { try { return localStorage.getItem(MUTE_KEY) === '1'; } catch (e) { return false; } }
  function writeMute(v) { try { localStorage.setItem(MUTE_KEY, v ? '1' : '0'); } catch (e) {} }

  const instanceMap = new WeakMap();
  let homeCarousel = null;
  let galleryPlayer = null;

  /* ------------- NEW: focus helper for grid items ------------- */
  function focusGridItem(container, index = 0) {
    if (!container) return;
    // find all grid items inside container
    const items = Array.from(container.querySelectorAll('.grid-item'));
    if (!items || items.length === 0) return;
    // clamp index
    const idx = Math.max(0, Math.min(index, items.length - 1));
    // remove 'focused' class from all
    items.forEach(it => {
      it.classList.remove('focused');
      // ensure they are focusable (buttons already are)
      if (it.tabIndex < 0) it.tabIndex = 0;
    });
    const target = items[idx];
    if (!target) return;
    // add visual focused class
    target.classList.add('focused');
    // move DOM focus to the element so keyboard users see it too
    try { target.focus({ preventScroll: true }); } catch (e) { try { target.focus(); } catch(e){} }
  }

  /* ---------- rest of code unchanged until populateGrid ---------- */

  /* ---------------- Menu (desktop inline / mobile dropdown) ---------------- */
  function initMenu(context = document) {
    const navToggle = context.querySelector('#navToggle');
    const navList = context.querySelector('#navList');
    if (!navToggle || !navList) return;

    let mobileDropdown = document.getElementById('mobileDropdown');
    if (!mobileDropdown) {
      mobileDropdown = create('div', { id: 'mobileDropdown', class: 'mobile-dropdown' }, '');
      document.body.appendChild(mobileDropdown);
    }
    mobileDropdown.innerHTML = '';

    Array.from(navList.children).forEach(li => {
      const a = li.firstElementChild.cloneNode(true);
      a.classList.add('mobile-link');
      a.addEventListener('click', () => {
        mobileDropdown.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
      mobileDropdown.appendChild(a);
    });

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDropdown.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      if (window.gsap) {
        if (isOpen) gsap.fromTo(mobileDropdown, { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.36, ease: 'power2.out' });
        else gsap.to(mobileDropdown, { y: -6, opacity: 0, duration: 0.22, ease: 'power1.in' });
      }
    });

    document.addEventListener('click', (e) => {
      if (!mobileDropdown.classList.contains('open')) return;
      if (!e.target.closest('#mobileDropdown') && !e.target.closest('#navToggle')) {
        mobileDropdown.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------- HomeCarousel (immersive, automatic, 2-layer crossfade) ---------------- */
  class HomeCarousel {
    constructor(opts) {
      this.container = opts.container;
      this.slides = opts.slides || [];
      this.interval = opts.interval || HOME_AUTOPLAY_INTERVAL_MS;
      this.layerA = this.container.querySelector('.layer-a');
      this.layerB = this.container.querySelector('.layer-b');
      this.active = 'A'; // 'A' or 'B'
      this.index = 0;
      this.timer = null;

      if (this.container) instanceMap.set(this.container, this);
      this._init();
    }

    _init() {
      if (!this.container || !this.layerA || !this.layerB) return;
      // ensure attributes for autoplay (muted + playsinline)
      [this.layerA, this.layerB].forEach(v => {
        v.playsInline = true;
        v.muted = true;
        v.loop = false;
        v.preload = 'auto';
        v.classList.remove('active','inactive');
      });

      // initial state
      this.layerA.classList.add('active');
      this.layerB.classList.add('inactive');

      // load first video and start
      if (this.slides.length === 0) {
        // fallback: load first video from VIDEOS array
        if (Array.isArray(VIDEOS) && VIDEOS.length) {
          this.slides = VIDEOS.slice(0, 5);
        } else {
          log('[home] no slides available');
          return;
        }
      }
      this._loadAndPlayInitial();

      // start automatic loop
      this._startLoop();
    }

    _loadAndPlayInitial() {
      const meta = this.slides[this.index];
      if (!meta) return;
      this.layerA.src = meta.src || '';
      this.layerA.load();
      this.layerA.play().catch(()=>{});
    }

    _startLoop() {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(()=> this._switchTo((this.index + 1) % this.slides.length), this.interval);
    }

    _switchTo(nextIndex) {
      const activeEl = this.active === 'A' ? this.layerA : this.layerB;
      const inactiveEl = this.active === 'A' ? this.layerB : this.layerA;
      const meta = this.slides[nextIndex];
      if (!meta) return;

      // prepare inactive
      inactiveEl.src = meta.src || '';
      inactiveEl.load();

      const onCan = () => {
        inactiveEl.removeEventListener('canplay', onCan);
        // play inactive, then crossfade
        inactiveEl.play().catch(()=>{});
        if (window.gsap) {
          // crossfade + slight scale animation
          inactiveEl.style.zIndex = 3;
          activeEl.style.zIndex = 2;
          gsap.set(inactiveEl, { opacity: 0, scale: 1.02 });
          const tl = gsap.timeline();
          tl.to(inactiveEl, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 0);
          tl.to(activeEl, { opacity: 0, scale: 1, duration: 1.2, ease: 'power2.out' }, 0);
          tl.call(() => {
            try { activeEl.pause(); } catch(e){}
            activeEl.classList.remove('active'); activeEl.classList.add('inactive');
            inactiveEl.classList.remove('inactive'); inactiveEl.classList.add('active');
            this.active = (this.active === 'A') ? 'B' : 'A';
            this.index = nextIndex;
          });
        } else {
          // fallback: class toggle (CSS handles transition)
          inactiveEl.classList.remove('inactive');
          inactiveEl.classList.add('active');
          activeEl.classList.remove('active');
          activeEl.classList.add('inactive');
          try { activeEl.pause(); } catch(e){}
          this.active = (this.active === 'A') ? 'B' : 'A';
          this.index = nextIndex;
        }
      };

      inactiveEl.addEventListener('canplay', onCan, { once: true });
    }

    destroy() {
      if (this.timer) { clearInterval(this.timer); this.timer = null; }
      try { this.layerA.pause(); this.layerB.pause(); } catch(e){}
    }
  }

  /* ---------------- GalleryPlayer (double video) with progress + click-to-play (left intact) ---------------- */
  class GalleryPlayer {
    constructor(opts) {
      this.container = opts.container;
      this.layerA = this.container.querySelector('.gallery-video.layer-a');
      this.layerB = this.container.querySelector('.gallery-video.layer-b');
      this.titleEl = this.container.querySelector('#galleryTitle');
      this.prevBtn = this.container.querySelector('#gPrevBtn');
      this.nextBtn = this.container.querySelector('#gNextBtn');
      // legacy muteBtn intentionally ignored for gallery (we use topMuteBtn)
      this.progressBar = this.container.querySelector('.progress-bar');
      this.progressBuffer = this.container.querySelector('.progress-buffer');
      this.progressWrap = this.container.querySelector('.progress-wrap');
      this.playOverlay = this.container.querySelector('.play-overlay');
      this.topOverlay = this.container.querySelector('.top-overlay');
      this.topMuteBtn = this.container.querySelector('.top-overlay .mute-btn');
      this.topFsBtn = this.container.querySelector('.top-overlay .fs-btn');

      this._wireTopControls();
      this.slides = opts.slides || [];
      this.currentIndex = 0;
      this.front = 'A';
      this.autoplayTimer = null;
      this.isManual = false;
      this._boundOnInteraction = this._onUserInteraction.bind(this);
      this._rafId = null;
      this._pauseTimeoutId = null;
      this._seeking = false;

      this._setupLayers();
      this._wireControls();

      this._bindClickToToggle();
      this._bindProgressInteractions();

      // Ensure overlays initial state
      try {
        if (this.playOverlay) {
          this.playOverlay.classList.remove('paused', 'buffering', 'animate-in');
          const pa = this.playOverlay.querySelector('.icon-pause');
          const ip = this.playOverlay.querySelector('.icon-play');
          const sp = this.playOverlay.querySelector('.buffer-spinner');
          if (pa) { pa.style.display = 'none'; pa.style.opacity = '0'; }
          if (ip) { ip.style.opacity = '0'; ip.style.display = 'none'; }
          if (sp) { sp.style.display = 'none'; sp.style.opacity = '0'; }
          this.playOverlay.style.opacity = '0';
          this.playOverlay.style.display = 'none';
        }
        if (this.topOverlay) {
          this.topOverlay.classList.remove('paused','buffering','animate-in','force-visible');
          this.topOverlay.style.display = 'none';
          this.topOverlay.style.opacity = '0';
        }
      } catch (e) {}

      // mouse idle / overlay show-hide
      this._idleTimer = null;
      this._onMouseMoveBound = this._onMouseMove.bind(this);
      const gpArea = this.container.querySelector('.gallery-player') || this.container;
      if (gpArea) {
        gpArea.addEventListener('pointermove', this._onMouseMoveBound, { passive: true });
        gpArea.addEventListener('pointerenter', this._onMouseMoveBound, { passive: true });
        gpArea.addEventListener('pointerleave', () => {
          if (this._idleTimer) { clearTimeout(this._idleTimer); this._idleTimer = null; }
          this._hideOverlays();
        });
      }
      // show overlays briefly at init
      this._showOverlays();
      if (this._idleTimer) { clearTimeout(this._idleTimer); this._idleTimer = null; }
      this._idleTimer = setTimeout(()=> { this._hideOverlays(); this._idleTimer = null; }, MOUSE_IDLE_MS);

      if (this.slides.length) this.playIndex(0, { autoplayStart: true });
      this.resetAutoplay();
      this._attachInteractionListeners();
    }

    _setupLayers() {
      if (this.layerA && this.layerB) {
        const gp = this.container.querySelector('.gallery-player');
        if (gp) { gp.style.position = 'relative'; gp.style.overflow = 'hidden'; }
        [this.layerA, this.layerB].forEach(layer => {
          if (!layer) return;
          layer.addEventListener('waiting', () => this._onBuffering(layer));
          layer.addEventListener('stalled', () => this._onBuffering(layer));
          layer.addEventListener('playing', () => this._onPlaying(layer));
          layer.addEventListener('canplay', () => this._onPlaying(layer));
          layer.addEventListener('error', () => this._onPlaying(layer));
        });
      }
    }

    _wireTopControls() {
      if (this.topMuteBtn) {
        // reflect initial state
        this.updateMuteButton();
        this.topMuteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          const newVal = !readMute();
          writeMute(newVal);
          this.updateMuteButton();
        });
      }

      if (this.topFsBtn) {
        this.topFsBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleFullscreen();
        });
      }

      document.addEventListener('fullscreenchange', () => this.updateFullscreenButton());
      document.addEventListener('webkitfullscreenchange', () => this.updateFullscreenButton());
      document.addEventListener('mozfullscreenchange', () => this.updateFullscreenButton());
      document.addEventListener('MSFullscreenChange', () => this.updateFullscreenButton());
    }

    toggleFullscreen() {
      const el = this.container;
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
        if (el.requestFullscreen) el.requestFullscreen().catch(()=>{});
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
        else if (el.msRequestFullscreen) el.msRequestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen().catch(()=>{});
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
      }
      setTimeout(()=> this.updateFullscreenButton(), 250);
    }

    updateFullscreenButton() {
      const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
      if (!this.topFsBtn) return;
      this.topFsBtn.classList.toggle('is-full', isFull);
      this.topFsBtn.setAttribute('aria-pressed', isFull ? 'true' : 'false');
      this.topFsBtn.setAttribute('aria-label', isFull ? 'Esci schermo intero' : 'Attiva schermo intero');
    }

    _wireControls() {
      if (this.prevBtn) this.prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this._onUserInteraction(); this.prev(); });
      if (this.nextBtn) this.nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this._onUserInteraction(); this.next(); });
    }

    _onBuffering(layer) {
      const front = this._getFrontLayer();
      if (!front) return;
      if (this.playOverlay) {
        this.playOverlay.classList.add('buffering');
        this.playOverlay.classList.remove('paused');
        this.playOverlay.style.display = 'flex';
        this.playOverlay.style.opacity = '1';
      }
    }

    _onPlaying(layer) {
      if (this.playOverlay) {
        this.playOverlay.classList.remove('buffering');
        if (!this._getFrontLayer() || this._getFrontLayer().paused) {
          this.playOverlay.classList.add('paused');
          this.playOverlay.style.display = 'flex';
          this.playOverlay.style.opacity = '1';
        } else {
          this.playOverlay.classList.remove('paused');
          if (!this.playOverlay.classList.contains('paused') && !this.playOverlay.classList.contains('buffering')) {
            this.playOverlay.style.opacity = '0';
            setTimeout(()=> { try { this.playOverlay.style.display = 'none'; } catch(e){} }, 220);
          }
        }
      }
    }

    updateMuteButton() {
      const muted = readMute();
      if (this.topMuteBtn) {
        this.topMuteBtn.classList.toggle('muted', !!muted);
        this.topMuteBtn.setAttribute('aria-pressed', muted ? 'true' : 'false');
      }
      if (this.layerA) this.layerA.muted = !!muted;
      if (this.layerB) this.layerB.muted = !!muted;
    }

    toggleMute() {
      const newVal = !readMute();
      writeMute(newVal);
      this.updateMuteButton();
    }

    _attachInteractionListeners() {
      this.container.addEventListener('pointerdown', this._boundOnInteraction, { passive: true });
      document.addEventListener('keydown', this._boundOnInteraction);
    }

    _onUserInteraction() {
      if (!this.isManual) {
        this.isManual = true;
        this.clearAutoplay();
        log('[gallery] user interaction -> manual mode');
      }
    }

    clearAutoplay() {
      if (this.autoplayTimer) { clearInterval(this.autoplayTimer); this.autoplayTimer = null; }
    }

    resetAutoplay() {
      this.clearAutoplay();
      if (this.isManual) return;
      this.autoplayTimer = setInterval(() => { this.next(); }, GALLERY_AUTOPLAY_INTERVAL_MS);
    }

    setSlides(slides) {
      this.slides = slides || [];
      this.currentIndex = 0;
      this.isManual = false;
      this.resetAutoplay();
    }

    prev() {
      if (!this.slides.length) return;
      const nextIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.playIndex(nextIndex);
    }

    next() {
      if (!this.slides.length) return;
      const nextIndex = (this.currentIndex + 1) % this.slides.length;
      this.playIndex(nextIndex);
    }

    async playIndex(i, opts = {}) {
      if (!this.slides.length) return;
      i = (i + this.slides.length) % this.slides.length;
      const meta = this.slides[i];
      if (!meta) return;
      if (opts.userTriggered) this._onUserInteraction();

      const backLayer = (this.front === 'A') ? this.layerB : this.layerA;
      const frontLayer = (this.front === 'A') ? this.layerA : this.layerB;

      try { backLayer.pause(); } catch (e) {}
      backLayer.removeAttribute('src');
      backLayer.src = meta.src || '';
      backLayer.load();

      const muted = readMute();
      backLayer.muted = !!muted;
      frontLayer.muted = !!muted;

      const onLoaded = () => {
        backLayer.removeEventListener('loadedmetadata', onLoaded);
        backLayer.currentTime = 0;
        backLayer.play().catch(()=>{});
        if (window.gsap) {
          backLayer.style.zIndex = 3;
          frontLayer.style.zIndex = 2;
          gsap.fromTo(backLayer, { opacity: 0, scale: 1.02 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' });
          gsap.to(frontLayer, { opacity: 0, scale: 0.98, duration: 0.6, ease: 'power2.out', onComplete: () => {
            frontLayer.pause();
            frontLayer.currentTime = 0;
            this.front = (this.front === 'A') ? 'B' : 'A';
            this._syncTitle(meta.title);
            this._flashOverlay();
            this._startProgressLoop();
          }});
        } else {
          backLayer.style.opacity = 0;
          backLayer.style.zIndex = 3;
          frontLayer.style.zIndex = 2;
          backLayer.style.transform = 'scale(1.02)';
          frontLayer.style.transform = 'scale(1)';
          const steps = 12;
          let step = 0;
          const t = setInterval(() => {
            step++;
            const p = step / steps;
            backLayer.style.opacity = String(p);
            frontLayer.style.opacity = String(1 - p);
            backLayer.style.transform = `scale(${1.02 - (0.02 * p)})`;
            frontLayer.style.transform = `scale(${1 - (0.02 * p)})`;
            if (step >= steps) {
              clearInterval(t);
              frontLayer.pause();
              frontLayer.currentTime = 0;
              this.front = (this.front === 'A') ? 'B' : 'A';
              this._syncTitle(meta.title);
              this._flashOverlay();
              this._startProgressLoop();
            }
          }, 60);
        }
      };
      backLayer.addEventListener('loadedmetadata', onLoaded);

      this.currentIndex = i;
      this.resetAutoplay();
      this._startProgressLoop();
    }

    _syncTitle(t) {
      if (this.titleEl) this.titleEl.textContent = t || '';
    }

    _flashOverlay() {
      const overlay = this.container.querySelector('.gallery-overlay');
      if (!overlay) return;
      overlay.classList.add('force-visible');
      setTimeout(() => overlay.classList.remove('force-visible'), SLIDE_CHANGE_OVERLAY_MS);
    }

    _getFrontLayer() {
      return (this.front === 'A') ? this.layerA : this.layerB;
    }

    _startProgressLoop() {
      if (this._rafId) return;
      const loop = () => {
        this._rafId = requestAnimationFrame(loop);
        this._updateProgressAndBuffer();
      };
      this._rafId = requestAnimationFrame(loop);
    }

    _stopProgressLoop() {
      if (this._rafId) {
        cancelAnimationFrame(this._rafId);
        this._rafId = null;
      }
    }

    _updateProgressAndBuffer() {
      const layer = this._getFrontLayer();
      const bar = this.progressBar;
      const buf = this.progressBuffer;
      if (!layer || !bar) return;
      const dur = layer.duration || 0;
      const cur = layer.currentTime || 0;
      const pct = (dur > 0) ? Math.min(100, (cur / dur) * 100) : 0;
      bar.style.width = pct + '%';
      bar.setAttribute('aria-valuenow', String(Math.round(pct)));

      if (buf && layer.buffered && layer.buffered.length) {
        try {
          let end = 0;
          for (let i=0;i<layer.buffered.length;i++){
            try { if (layer.buffered.start(i) <= cur) end = layer.buffered.end(i); }
            catch(e){ end = layer.buffered.end(layer.buffered.length-1); }
          }
          const bufPct = (dur > 0) ? Math.min(100, (end / dur) * 100) : 0;
          buf.style.width = bufPct + '%';
        } catch (e) {
          buf.style.width = '0%';
        }
      } else if (buf) {
        buf.style.width = '0%';
      }

      if (layer.paused && this.isManual) {
        this._stopProgressLoop();
      }
    }

    _bindClickToToggle() {
      const playerArea = this.container.querySelector('.gallery-player') || this.container;
      if (!playerArea) return;

      playerArea.addEventListener('click', (ev) => {
        if (ev.target.closest('.progress-wrap') || ev.target.closest('.control-btn')) return;
        const front = this._getFrontLayer();
        if (!front) return;

        if (front.paused) {
          front.play().catch(()=>{});
          this._onUserInteraction();
          this._startProgressLoop();
          this._showPlayTransient();
        } else {
          front.pause();
          this._onUserInteraction();
          this._stopProgressLoop();
          this._showPausedOverlay();
        }
      });
    }

    _bindProgressInteractions() {
      const wrap = this.progressWrap;
      if (!wrap) return;
      let dragging = false;
      let pointerId = null;

      const clamp = (v, a=0, b=1) => Math.max(a, Math.min(b, v));

      const updateSeekFromEvent = (ev) => {
        const rect = wrap.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const frac = clamp(x / rect.width);
        const front = this._getFrontLayer();
        const dur = front && front.duration ? front.duration : 0;
        if (dur > 0) {
          try { front.currentTime = frac * dur; } catch(e){}
          if (this.progressBar) this.progressBar.style.width = (frac*100) + '%';
        }
      };

      wrap.addEventListener('pointerdown', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        dragging = true;
        pointerId = ev.pointerId;
        wrap.setPointerCapture?.(pointerId);
        wrap.classList.add('dragging');
        this._onUserInteraction();
        this.clearAutoplay();
        this._stopProgressLoop();
        updateSeekFromEvent(ev);
      });

      wrap.addEventListener('pointermove', (ev) => {
        if (!dragging) return;
        updateSeekFromEvent(ev);
      });

      const stopDrag = (ev) => {
        if (!dragging) return;
        dragging = false;
        try { wrap.releasePointerCapture?.(pointerId); } catch (e) {}
        wrap.classList.remove('dragging');
        pointerId = null;
        const front = this._getFrontLayer();
        if (front && !front.paused) this._startProgressLoop();
      };

      wrap.addEventListener('pointerup', (ev) => { ev.preventDefault(); ev.stopPropagation(); stopDrag(ev); });
      wrap.addEventListener('pointercancel', (ev) => { stopDrag(ev); });
      wrap.addEventListener('lostpointercapture', (ev) => { stopDrag(ev); });
    }

    _showPausedOverlay() {
      if (!this.playOverlay) return;
      if (this._pauseTimeoutId) { clearTimeout(this._pauseTimeoutId); this._pauseTimeoutId = null; }

      this.playOverlay.classList.remove('buffering');
      const spinner = this.playOverlay.querySelector('.buffer-spinner');
      if (spinner) { spinner.style.opacity = '0'; }

      this.playOverlay.classList.add('paused');

      this.playOverlay.style.display = 'flex';
      this.playOverlay.style.opacity = '1';

      const pa = this.playOverlay.querySelector('.icon-pause');
      const ip = this.playOverlay.querySelector('.icon-play');
      if (pa) { pa.style.display = 'block'; pa.style.opacity = '1'; pa.style.transform = 'translate(-50%,-50%) scale(1)'; }
      if (ip) { ip.style.opacity = '0'; ip.style.display = 'block'; ip.style.transform = 'translate(-50%,-50%) scale(0.9)'; }

      if (this.topOverlay) {
        this.topOverlay.classList.add('paused');
        this.topOverlay.style.display = 'flex';
        this.topOverlay.style.opacity = '1';
      }
    }

    _showPlayTransient() {
      if (!this.playOverlay) return;

      const pa = this.playOverlay.querySelector('.icon-pause');
      const ip = this.playOverlay.querySelector('.icon-play');
      const spinner = this.playOverlay.querySelector('.buffer-spinner');

      if (pa) {
        try {
          pa.style.transition = 'none';
          pa.style.opacity = '0';
          pa.style.transform = 'translate(-50%,-50%) scale(0.88)';
          pa.style.display = 'none';
        } catch (e) {}
      }
      this.playOverlay.classList.remove('paused');

      if (this.topOverlay) {
        this.topOverlay.classList.remove('paused');
        this.topOverlay.classList.remove('buffering');
        this.topOverlay.classList.add('animate-in');
        this.topOverlay.style.display = 'flex';
        this.topOverlay.style.opacity = '1';
        setTimeout(()=> {
          try { this.topOverlay.classList.remove('animate-in'); } catch(e){}
          if (!this.playOverlay.classList.contains('paused') && !this.playOverlay.classList.contains('buffering')) {
            this.topOverlay.style.opacity = '0';
            setTimeout(()=> { try { this.topOverlay.style.display = 'none'; } catch(e){} }, 220);
          }
        }, PLAY_TRANSIENT_MS + 40);
      }

      if (spinner) {
        spinner.style.opacity = '0';
        spinner.style.display = 'none';
        this.playOverlay.classList.remove('buffering');
      }

      this.playOverlay.style.display = 'flex';
      this.playOverlay.style.opacity = '1';

      if (ip) {
        ip.style.display = 'block';
        ip.style.opacity = '1';
        ip.style.transform = 'translate(-50%,-50%) scale(0.95)';
        ip.style.zIndex = '9999';
      }

      if (window.gsap) {
        gsap.fromTo(ip, { scale: 0.95, opacity: 1 }, {
          scale: 1.28,
          opacity: 0,
          duration: PLAY_TRANSIENT_MS / 1000,
          ease: 'power2.out',
          onComplete: () => {
            try { ip.style.opacity = '0'; ip.style.display = 'none'; } catch (e) {}
            if (!this.playOverlay.classList.contains('buffering') && !this.playOverlay.classList.contains('paused')) {
              this.playOverlay.style.opacity = '0';
              setTimeout(()=> this.playOverlay.style.display = 'none', 220);
            }
          }
        });
      } else {
        ip.style.transition = `transform ${PLAY_TRANSIENT_MS}ms cubic-bezier(.22,.9,.3,1), opacity ${PLAY_TRANSIENT_MS}ms ease`;
        requestAnimationFrame(() => {
          ip.style.transform = 'translate(-50%,-50%) scale(1.28)';
          ip.style.opacity = '0';
        });
        setTimeout(() => {
          try { ip.style.display = 'none'; ip.style.opacity = '0'; } catch(e){}
          if (!this.playOverlay.classList.contains('buffering') && !this.playOverlay.classList.contains('paused')) {
            this.playOverlay.style.opacity = '0';
            setTimeout(()=> this.playOverlay.style.display = 'none', 220);
          }
        }, PLAY_TRANSIENT_MS + 20);
      }
    }

    // overlay mouse handling
    _showOverlays() {
      if (this.playOverlay) {
        this.playOverlay.style.display = 'flex';
        this.playOverlay.style.opacity = '1';
      }
      if (this.topOverlay) {
        this.topOverlay.style.display = 'flex';
        this.topOverlay.style.opacity = '1';
        this.topOverlay.classList.add('force-visible');
        setTimeout(()=> { try { this.topOverlay.classList.remove('force-visible'); } catch(e){} }, 50);
      }
    }

    _hideOverlays() {
      if (this.playOverlay) {
        if (!this.playOverlay.classList.contains('paused') && !this.playOverlay.classList.contains('buffering')) {
          this.playOverlay.style.opacity = '0';
          setTimeout(()=> { try { this.playOverlay.style.display = 'none'; } catch(e){} }, 220);
        }
      }
      if (this.topOverlay) {
        this.topOverlay.style.opacity = '0';
        setTimeout(()=> { try { this.topOverlay.style.display = 'none'; } catch(e){} }, 220);
      }
    }

    _onMouseMove(ev) {
      this._showOverlays();
      if (this._idleTimer) { clearTimeout(this._idleTimer); this._idleTimer = null; }
      this._idleTimer = setTimeout(() => {
        this._hideOverlays();
        this._idleTimer = null;
      }, MOUSE_IDLE_MS);
    }

    destroy() {
      this.clearAutoplay();
      this._stopProgressLoop();
      if (this._pauseTimeoutId) { clearTimeout(this._pauseTimeoutId); this._pauseTimeoutId = null; }
      try {
        this.layerA.pause(); this.layerB.pause();
      } catch (e) {}
    }
  }

  /* ---------------- Home init (creates HomeCarousel) ---------------- */
  function initHome(context = document) {
    const section = context.querySelector('#carouselSection');
    if (!section) return;

    // build slides: prefer explicit HOME_CAROUSEL, otherwise featured ids mapping -> VIDEOS
    let slides = Array.isArray(HOME_CAROUSEL) && HOME_CAROUSEL.length ? HOME_CAROUSEL.slice() : FEATURED_IDS.map(id => VIDEOS.find(v => v.id === id)).filter(Boolean);
    if (!slides.length) slides.push(...(Array.isArray(VIDEOS) ? VIDEOS.slice(0, Math.min(5, VIDEOS.length)) : []));

    // ensure section has two layers (layer-a / layer-b) in HTML; HomeCarousel expects them
    homeCarousel = new HomeCarousel({
      container: section,
      slides,
      interval: HOME_AUTOPLAY_INTERVAL_MS
    });
  }

  /* ---------------- Gallery init (uses GalleryPlayer) ---------------- */
  function initGallery(context = document) {
    const catList = context.querySelector('#categoryList');
    const galleryGrid = context.querySelector('#galleryGrid');
    const section = context.querySelector('#galleryCarouselSection');
    if (!catList || !galleryGrid || !section) return;

    catList.innerHTML = '';
    CATEGORIES.forEach((c, idx) => {
      const li = create('li');
      const btn = create('button', {}, c);

      // non sovrascrivere classi: aggiungi la classe category-item
      btn.classList.add('category-item');
      // mark initial active via classe (solo visuale)
      if (idx === 0) btn.classList.toggle('active', true);

      // accessibilità e metadata
      btn.setAttribute('data-category', c);
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');

      btn.addEventListener('click', () => {
        // aggiorna stati su tutti i bottoni
        catList.querySelectorAll('button').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // renderizza la categoria selezionata
        renderCategory(c);
      });

      li.appendChild(btn);
      catList.appendChild(li);
    });

    // gallery uses topOverlay mute only
    const topMuteBtn = section.querySelector('.top-overlay .mute-btn');

    async function renderCategory(category) {
      const slides = Array.isArray(VIDEOS) ? VIDEOS.filter(v => v.category === category) : [];
      if (!slides.length) {
        if (galleryPlayer) galleryPlayer.destroy();
        const layerA = section.querySelector('.gallery-video.layer-a');
        const layerB = section.querySelector('.gallery-video.layer-b');
        if (layerA) { layerA.removeAttribute('src'); layerA.load?.(); layerA.style.opacity = 0; }
        if (layerB) { layerB.removeAttribute('src'); layerB.load?.(); layerB.style.opacity = 0; }
        const titleEl = section.querySelector('#galleryTitle');
        if (titleEl) titleEl.textContent = 'Nessun video';
        galleryGrid.innerHTML = `<div style="padding:28px;color:var(--muted);text-align:center">Nessun video per la categoria "${escapeHtml(category)}"</div>`;
        return;
      }

      if (galleryPlayer) {
        galleryPlayer.setSlides(slides);
        galleryPlayer.playIndex(0);
        galleryPlayer.isManual = false;
        galleryPlayer.resetAutoplay();
      } else {
        galleryPlayer = new GalleryPlayer({
          container: section,
          slides
        });
      }

      if (galleryPlayer) galleryPlayer.updateMuteButton();
      populateGrid(galleryGrid, category);

      // Focus first grid item to indicate what's in focus
      // small timeout to ensure DOM has rendered
      setTimeout(() => focusGridItem(galleryGrid, 0), 60);
    }

    // Decide initial category: prefer button.active se presente, altrimenti CATEGORIES[0]
    const activeBtn = catList.querySelector('button.active');
    const initialCategory = activeBtn ? (activeBtn.getAttribute('data-category') || CATEGORIES[0]) : CATEGORIES[0];

    // Ensure the active button is focused visually / for keyboard users
    setTimeout(() => {
      const btnToFocus = catList.querySelector(`button[data-category="${initialCategory}"]`) || catList.querySelector('button');
      if (btnToFocus) {
        try { btnToFocus.focus({ preventScroll: true }); } catch (e) { btnToFocus.focus(); }
      }
    }, 40);

    // render initial category
    renderCategory(initialCategory);
  }


  function populateGrid(container, category) {
    // pulisce e rimuove eventuali preview attive
    stopAllPreviewsExcept(null);
    container.innerHTML = '';

    const items = Array.isArray(VIDEOS) ? VIDEOS.filter(v => v.category === category) : [];

    items.forEach((v, idx) => {
      // preferisci poster esplicito, altrimenti fallback su media/posters/<id>.jpg
      const posterUrl = v.poster || (`media/posters/${v.id}.jpg`);

      // crea bottone/thumbnail senza src video iniziale per lazy load
      const btn = create('button', { class: 'grid-item', type: 'button', dataset: { id: v.id, index: idx } });
      btn.innerHTML = `
        <video data-src="${v.src || ''}" poster="${posterUrl}" preload="none" playsinline muted loop aria-hidden="true"></video>
        <div class="hover-overlay" aria-hidden="true"></div>
        <div class="preview-info"><strong>${escapeHtml(v.title || '')}</strong></div>
        <div class="preview-info"><small>${escapeHtml(v.desc || '')}</small></div>
      `;

      const vid = btn.querySelector('video');
      let hoverTimer = null;

      // helper che carica e avvia la preview in maniera sicura (requestIdleCallback fallback)
      const loadAndPlayPreview = () => {
        if (!vid) return;
        // se non ha src e ha data-src valido, carica
        const ds = vid.dataset && vid.dataset.src ? vid.dataset.src.trim() : '';
        if (!vid.getAttribute('src') && ds) {
          const doLoad = () => {
            try {
              // interrompi altre preview
              stopAllPreviewsExcept(vid);
              vid.src = ds;
              // assicura attributi necessari
              vid.preload = 'metadata';
              vid.muted = true;
              vid.loop = true;
              // play appena pronto
              vid.load();
              vid.play().catch(()=>{});
              btn.classList.add('hovering');
              _activePreviews.add(vid);
            } catch (e) { /* ignore */ }
          };
          if ('requestIdleCallback' in window) requestIdleCallback(doLoad, { timeout: 120 });
          else setTimeout(doLoad, 80);
        } else if (vid.getAttribute('src')) {
          // già caricato: semplicemente play
          try { vid.play().catch(()=>{}); btn.classList.add('hovering'); _activePreviews.add(vid); } catch(e){}
        }
      };

      // pointer events: pointerenter/leave coprono mouse + pen; per touch non forziamo preview (click apre player)
      btn.addEventListener('pointerenter', () => {
        if (hoverTimer) clearTimeout(hoverTimer);
        hoverTimer = setTimeout(loadAndPlayPreview, 60);
      });

      btn.addEventListener('pointerleave', () => {
        if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
        // fermiamo e scarichiamo dopo breve delay per evitare flicker se entra/esce rapidamente
        setTimeout(() => {
          // se non è nel set active (ad es. l'utente non ha toccato), stop
          stopPreview(vid);
        }, 80);
      });

      // click: apre il video nel player in alto
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        // stop preview globali (libera banda/memoria)
        stopAllPreviewsExcept(null);
        if (galleryPlayer) {
          galleryPlayer.playIndex(idx, { userTriggered: true });
        }
        // set focus visual on the clicked thumbnail
        focusGridItem(container, idx);
      });

      container.appendChild(btn);
    });

    // After populating, focus the first grid item so it's clear what's in focus
    setTimeout(() => focusGridItem(container, 0), 40);
  }


  /* ---------------- RUN / BARBA ---------------- */
  function runInits(context = document) {
    initMenu(context);
    if (context.querySelector && context.querySelector('#carouselSection')) initHome(context);
    if (context.querySelector && context.querySelector('#galleryCarouselSection')) initGallery(context);
    if (context.querySelector && context.querySelector('.facts')) initAbout && initAbout(context); // initAbout is defined elsewhere in your original code if present
  }

  function initBarbaSafe(runInitial) {
    if (!window.barba) { runInitial(document); return; }
    try {
      barba.init({
        sync: true,
        transitions: [{
          async leave(data) {
            try { pauseAll(data.current.container); } catch (e) {}
            if (window.gsap) await gsap.to(data.current.container, { opacity: 0, y: -20, duration: 0.32 });
          },
          async enter(data) {
            document.body.classList.toggle('no-scroll', data.next.namespace === 'home');
            window.scrollTo(0, 0);
            if (window.gsap) gsap.fromTo(data.next.container, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.42 });
            runInitial(data.next.container);
          },
          async once(data) {
            document.body.classList.toggle('no-scroll', data.next.namespace === 'home');
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

  /* ---------------- START ---------------- */
  function start() {
    if (window.__APP_INITIALIZED__) return;
    window.__APP_INITIALIZED__ = true;
    initBarbaSafe(runInits);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  log('main.js ready — home immersive carousel enabled, gallery intact.');
})();
