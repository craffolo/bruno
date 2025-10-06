// js/main.js (PATCH - robusto contro "VIDEOS is not defined")
(() => {
  /* ---------------- CONFIG / TIMINGS (modifica qui) ---------------- */
  // Intervalli separati per autoplay
  const HOME_AUTOPLAY_INTERVAL_MS = 4000;     // autoplay carosello home
  const GALLERY_AUTOPLAY_INTERVAL_MS = 10000;  // autoplay gallery player

  // overlay / animazioni
  const SLIDE_CHANGE_OVERLAY_MS = 1000; // overlay visibile al cambio slide
  const PLAY_TRANSIENT_MS = 620;        // durata effetto play transient (ms)


  // HOME_CAROUSEL: sorgenti dedicate al carosello della home (ottimizzate)
  // Modifica questi src con i preview / teaser reali (piccoli/leggeri).
  const HOME_CAROUSEL = (typeof window !== 'undefined' && window.HOME_CAROUSEL) ? window.HOME_CAROUSEL : [
    // { id: 'home_preview_1', src: 'media/carousel/preview1.mp4', title: 'Preview 1' },
    // { id: 'home_preview_2', src: 'media/carousel/preview2.mp4', title: 'Preview 2' },
    // { id: 'home_preview_3', src: 'media/carousel/preview3.mp4', title: 'Preview 3' }
  ];

  // FEATURED_IDS per fallback (se vuoi mantenere la selezione per la home)
  const FEATURED_IDS = ['cm_festafinecampagna25', 'alici_di_menaica_teaser', 'partenope_fashion_film', 'cast_ride_or_die', 'evan_primo_marzo', 'niven_alpaca_freestyle', 'sevdaliza_human', 'sinestesie', 'waldeinsamkeit', 'studio_notarile_dausilio'];

  // VIDEOS: la galleria userà SOLO questo array. Se esiste window.VIDEOS (caricato altrove) lo rispettiamo.
  const VIDEOS = (typeof window !== 'undefined' && window.VIDEOS) ? window.VIDEOS : [
    // Corporate
    { 
      id: 'di-agostino-costruzioni', 
      src: 'https://jellybruno.home04.cyou/Items/afedd456c88d3f5dd2d53b6de535e9eb/Download?api_key=34cc06d14de0430c8c9715656f23abb3', 
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

  function pauseAll(scope = document) {
    $$('video', scope).forEach(v => { try { v.pause(); } catch (e) {} });
  }

  const MUTE_KEY = 'site_mute_pref';
  function readMute() { try { return localStorage.getItem(MUTE_KEY) === '1'; } catch (e) { return false; } }
  function writeMute(v) { try { localStorage.setItem(MUTE_KEY, v ? '1' : '0'); } catch (e) {} }

  const instanceMap = new WeakMap();
  let homeCarousel = null;
  let galleryPlayer = null;

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

  /* ---------------- VideoCarousel (Home) ---------------- */
  class VideoCarousel {
    constructor(opts) {
      this.container = opts.container;
      this.videoEl = this.container.querySelector('.carousel-video');
      this.prevBtn = this.container.querySelector(opts.prevSelector);
      this.nextBtn = this.container.querySelector(opts.nextSelector);
      this.titleEl = this.container.querySelector('.carousel-title');
      this.descEl = this.container.querySelector('.carousel-desc');
      this.linkEl = this.container.querySelector(opts.linkSelector);
      this.muteBtn = opts.muteBtn || null;
      this.slides = opts.slides || [];
      this.idx = 0;
      this.autoplayTimer = null;
      this.savedTime = {};
      this.muted = false;
      this._saveInterval = null;

      if (this.container) instanceMap.set(this.container, this);
      this.init();
    }

    init() {
      if (!this.container || !this.videoEl) return;
      this.videoEl.playsInline = true;
      this.applyMute();

      if (this.prevBtn) this.prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this.go(this.idx - 1); this.resetAutoplay(); });
      if (this.nextBtn) this.nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this.go(this.idx + 1); this.resetAutoplay(); });

      if (this.linkEl) {
        this.linkEl.setAttribute('href', '#');
        this.linkEl.addEventListener('click', (ev) => {
          ev.preventDefault();
          const meta = this.slides[this.idx];
          if (meta) try { sessionStorage.setItem('selectedVideoId', meta.id); } catch (e) {}
        });
      }

      if (this.muteBtn) this.updateMuteButton();
      this._bindPointer();

      this.videoEl.addEventListener('playing', () => {
        if (this._saveInterval) clearInterval(this._saveInterval);
        this._saveInterval = setInterval(() => {
          try { this.savedTime[this.slides[this.idx].id] = this.videoEl.currentTime || 0; } catch (e) {}
        }, 1000);
      });
      this.videoEl.addEventListener('pause', () => {
        if (this._saveInterval) { clearInterval(this._saveInterval); this._saveInterval = null; }
        try { this.savedTime[this.slides[this.idx].id] = this.videoEl.currentTime || 0; } catch (e) {}
      });

      this.setSlide(0);
      this.resetAutoplay();
    }

    updateMuteButton() {
      if (!this.muteBtn) return;
      this.muteBtn.classList.toggle('muted', !!this.muted);
      this.muteBtn.setAttribute('aria-pressed', this.muted ? 'true' : 'false');
      this.muteBtn.setAttribute('aria-label', this.muted ? 'Attiva audio' : 'Disattiva audio');
    }

    applyMute() {
      try {
        const muted = readMute();
        this.muted = muted;
        const v = this.videoEl;
        if (!v) return;
        v.muted = !!muted;
        v.volume = muted ? 0 : 1;
        if (!v.paused) {
          v.pause();
          const curTime = v.currentTime;
          setTimeout(() => {
            try { v.currentTime = curTime; v.play().catch(()=>{}); } catch (e) {}
          }, 80);
        }
      } catch (e) {
        console.warn('[mute] applyMute error', e);
      }
    }

    toggleMute() {
      this.muted = !this.muted;
      this.applyMute();
      this.updateMuteButton();
    }

    saveState(oldIdx) {
      try {
        const cur = this.slides[oldIdx];
        if (!cur) return;
        this.savedTime[cur.id] = Math.max(0, Math.min(this.videoEl.duration || 0, this.videoEl.currentTime || 0));
      } catch (e) {}
    }

    setSlide(i) {
      if (!this.slides.length) return;
      i = (i + this.slides.length) % this.slides.length;
      this.saveState(this.idx);
      this.idx = i;
      const meta = this.slides[this.idx];
      if (!meta) return;

      try { this.videoEl.pause(); } catch (e) {}
      this.applyMute();
      this.videoEl.removeAttribute('src');
      this.videoEl.src = meta.src;
      this.videoEl.load();

      const onLoaded = () => {
        try {
          const t = Math.min(this.savedTime[meta.id] || 0, Math.max(0, this.videoEl.duration || Infinity));
          if (t > 0 && !Number.isNaN(t)) this.videoEl.currentTime = t;
        } catch (e) {}
        if (this.titleEl) this.titleEl.textContent = meta.title || '';
        if (this.descEl) this.descEl.textContent = meta.desc || '';
        this.videoEl.play().catch(()=>{});
        this.videoEl.removeEventListener('loadedmetadata', onLoaded);
      };
      this.videoEl.addEventListener('loadedmetadata', onLoaded);

      const overlay = this.container.querySelector('.carousel-overlay');
      if (overlay) {
        overlay.classList.add('force-visible');
        setTimeout(() => overlay.classList.remove('force-visible'), SLIDE_CHANGE_OVERLAY_MS);
      }
    }

    go(i) {
      if (!this.slides.length) return;
      const next = (i + this.slides.length) % this.slides.length;
      if (window.gsap) {
        const tl = gsap.timeline();
        tl.to(this.videoEl, { opacity: 0, duration: 0.28 });
        tl.add(() => this.setSlide(next));
        tl.to(this.videoEl, { opacity: 1, duration: 0.42 }, '>-0.02');
      } else {
        this.videoEl.style.opacity = 0;
        setTimeout(() => { this.setSlide(next); this.videoEl.style.opacity = 1; }, 360);
      }
    }

    resetAutoplay() {
      if (this.autoplayTimer) clearInterval(this.autoplayTimer);
      this.autoplayTimer = setInterval(() => this.go(this.idx + 1), HOME_AUTOPLAY_INTERVAL_MS);
    }


    _bindPointer() {
      let startX = 0, deltaX = 0, isSwiping = false;
      const TH = 60;
      const c = this.container;
      c.addEventListener('pointerdown', (ev) => {
        if (ev.target.closest && (ev.target.closest('.control-btn') || ev.target.closest('a') || ev.target.closest('#navToggle'))) return;
        startX = ev.clientX; deltaX = 0; isSwiping = true;
        try { if (ev.pointerType === 'touch') ev.preventDefault(); } catch(e){}
        c.setPointerCapture?.(ev.pointerId);
      });
      c.addEventListener('pointermove', (ev) => { if (!isSwiping) return; deltaX = ev.clientX - startX; });
      const up = (ev) => {
        if (!isSwiping) return;
        isSwiping = false;
        c.releasePointerCapture?.(ev.pointerId);
        if (Math.abs(deltaX) > TH) {
          if (deltaX < 0) this.go(this.idx + 1); else this.go(this.idx - 1);
          this.resetAutoplay();
        }
        deltaX = 0;
      };
      c.addEventListener('pointerup', up);
      c.addEventListener('pointercancel', up);
      c.addEventListener('pointerleave', up);
    }
  }

  /* ---------------- GalleryPlayer (double video) with progress + click-to-play ---------------- */
  class GalleryPlayer {
    constructor(opts) {
      this.container = opts.container;
      this.layerA = this.container.querySelector('.gallery-video.layer-a');
      this.layerB = this.container.querySelector('.gallery-video.layer-b');
      this.titleEl = this.container.querySelector('#galleryTitle');
      this.prevBtn = this.container.querySelector('#gPrevBtn');
      this.nextBtn = this.container.querySelector('#gNextBtn');
      this.muteBtn = opts.muteBtn || null;
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
      if (this.muteBtn) this.updateMuteButton();

      this._bindClickToToggle();
      this._bindProgressInteractions();

      // Ensure no pause icon visible on init (only show after user interaction)
      try {
        if (this.playOverlay) {
          this.playOverlay.classList.remove('paused', 'buffering', 'animate-in');
          const pa = this.playOverlay.querySelector('.icon-pause');
          const ip = this.playOverlay.querySelector('.icon-play');
          const sp = this.playOverlay.querySelector('.buffer-spinner');
          if (pa) { pa.style.display = 'none'; pa.style.opacity = '0'; }
          if (ip) { ip.style.opacity = '0'; ip.style.display = 'none'; }
          if (sp) { sp.style.display = 'none'; sp.style.opacity = '0'; }
          // hide overlay visually until an event requests it
          this.playOverlay.style.opacity = '0';
          this.playOverlay.style.display = 'none';
        }
        if (this.topOverlay) {
          // hide top overlay until needed
          this.topOverlay.classList.remove('paused','buffering','animate-in','force-visible');
          this.topOverlay.style.display = 'none';
          this.topOverlay.style.opacity = '0';
        }
      } catch (e) { /* silent fail for older browsers */ }


      if (this.slides.length) this.playIndex(0, { autoplayStart: true });
      this.resetAutoplay();
      this._attachInteractionListeners();
    }

    _setupLayers() {
      if (this.layerA && this.layerB) {
        const gp = this.container.querySelector('.gallery-player');
        if (gp) { gp.style.position = 'relative'; gp.style.overflow = 'hidden'; }
        // wire basic buffering listeners for both layers (we will route events to front)
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
      // ensure buttons exist and wire events
      if (this.topMuteBtn) {
        // reflect initial state
        this.updateMuteButton(); // will set .muted on btn if needed
        this.topMuteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          // toggle instance mute
          this.toggleMute();
          // update visual quickly (readMute persists)
          this.topMuteBtn.classList.toggle('muted', !!readMute());
        });
      }

      if (this.topFsBtn) {
        this.topFsBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleFullscreen();
        });
      }

      // Listen for fullscreen changes so we can update icon even when user uses ESC
      document.addEventListener('fullscreenchange', () => this.updateFullscreenButton());
      document.addEventListener('webkitfullscreenchange', () => this.updateFullscreenButton());
      document.addEventListener('mozfullscreenchange', () => this.updateFullscreenButton());
      document.addEventListener('MSFullscreenChange', () => this.updateFullscreenButton());
    }

    toggleFullscreen() {
      const el = this.container; // fullscreen the whole container (change if prefer .gallery-player)
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
        // request fullscreen
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
      // update icon after small delay (browser takes a little to enter FS)
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
      if (this.muteBtn) {
        // legacy / fallback mute button (if any) - keep for safety
        this.muteBtn.addEventListener('click', (e) => { e.stopPropagation(); this.toggleMute(); });
        this.updateMuteButton();
      }
    }

    _onBuffering(layer) {
      // show spinner only if affected layer is the front or is loading into front
      const front = this._getFrontLayer();
      if (!front) return;
      // show buffering overlay (bottom)
      if (this.playOverlay) {
        this.playOverlay.classList.add('buffering');
        this.playOverlay.classList.remove('paused');
      }
      // also make top overlay visible in buffering (match bottom)
      if (this.topOverlay) {
        this.topOverlay.classList.add('buffering');
        this.topOverlay.classList.remove('paused');
        this.topOverlay.style.display = 'flex';
        this.topOverlay.style.opacity = '1';
      }
    }

    _onPlaying(layer) {
      // hide spinner
      if (this.playOverlay) {
        this.playOverlay.classList.remove('buffering');
        // ensure play/pause state remains correct: if paused state set, show pause icon, else hide icons
        if (!this._getFrontLayer() || this._getFrontLayer().paused) {
          // show paused if paused
          this.playOverlay.classList.add('paused');
        } else {
          this.playOverlay.classList.remove('paused');
        }
      }
      // sync top overlay states
      if (this.topOverlay) {
        this.topOverlay.classList.remove('buffering');
        if (!this._getFrontLayer() || this._getFrontLayer().paused) {
          this.topOverlay.classList.add('paused');
          this.topOverlay.style.display = 'flex';
          this.topOverlay.style.opacity = '1';
        } else {
          this.topOverlay.classList.remove('paused');
          // hide if nothing else requires it
          if (!this.playOverlay.classList.contains('paused') && !this.playOverlay.classList.contains('buffering')) {
            this.topOverlay.style.opacity = '0';
            setTimeout(()=> { try { this.topOverlay.style.display = 'none'; } catch(e){} }, 260);
          }
        }
      }
    }

    updateMuteButton() {
      // update both top mute and legacy muteBtn
      const muted = readMute();
      if (this.muteBtn) {
        this.muteBtn.classList.toggle('muted', !!muted);
        this.muteBtn.setAttribute('aria-pressed', muted ? 'true' : 'false');
      }
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
        // crossfade + zoom
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

    // -------- progress loop (RAF) + buffer detection --------
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
          // choose last buffered range that starts before currentTime or last range end
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

    // -------- click-to-play/pause (ignora progress-wrap) --------
    _bindClickToToggle() {
      const playerArea = this.container.querySelector('.gallery-player') || this.container;
      if (!playerArea) return;

      playerArea.addEventListener('click', (ev) => {
        // IGNORA click sulla progress bar o sui controlli
        if (ev.target.closest('.progress-wrap') || ev.target.closest('.control-btn')) return;
        const front = this._getFrontLayer();
        if (!front) return;

        if (front.paused) {
          front.play().catch(()=>{});
          this._onUserInteraction(); // manual mode
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

    // -------- progress interactions (seek click/drag) --------
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
        ev.stopPropagation(); // important: don't bubble to player click
        dragging = true;
        pointerId = ev.pointerId;
        wrap.setPointerCapture?.(pointerId);
        wrap.classList.add('dragging');
        this._onUserInteraction(); // set manual mode & stop autoplay
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

    // -------- overlay animations for play/pause & spinner --------
    _showPausedOverlay() {
      if (!this.playOverlay) return;
      // cancel any play transient timeouts
      if (this._pauseTimeoutId) { clearTimeout(this._pauseTimeoutId); this._pauseTimeoutId = null; }

      // ensure spinner hidden
      this.playOverlay.classList.remove('buffering');
      const spinner = this.playOverlay.querySelector('.buffer-spinner');
      if (spinner) { spinner.style.opacity = '0'; }

      // mark paused class (JS consumer will remove it when play)
      this.playOverlay.classList.add('paused');

      // inline style fallback to ensure visibility
      this.playOverlay.style.display = 'flex';
      this.playOverlay.style.opacity = '1';

      // ensure pause icon visible (inline fallback)
      const pa = this.playOverlay.querySelector('.icon-pause');
      const ip = this.playOverlay.querySelector('.icon-play');
      if (pa) { pa.style.display = 'block'; pa.style.opacity = '1'; pa.style.transform = 'translate(-50%,-50%) scale(1)'; }
      if (ip) { ip.style.opacity = '0'; ip.style.display = 'block'; ip.style.transform = 'translate(-50%,-50%) scale(0.9)'; }

      // ensure top overlay also shows paused state
      if (this.topOverlay) {
        this.topOverlay.classList.add('paused');
        this.topOverlay.style.display = 'flex';
        this.topOverlay.style.opacity = '1';
      }
    }

    // Show play transient — if paused present, morph pause -> play -> hide
    _showPlayTransient() {
      if (!this.playOverlay) return;

      const pa = this.playOverlay.querySelector('.icon-pause');
      const ip = this.playOverlay.querySelector('.icon-play');
      const spinner = this.playOverlay.querySelector('.buffer-spinner');

      // 1) nascondi IMMEDIATAMENTE l'icona pause (inline) — questo soddisfa la tua richiesta
      if (pa) {
        try {
          pa.style.transition = 'none';
          pa.style.opacity = '0';
          pa.style.transform = 'translate(-50%,-50%) scale(0.88)';
          // opzionale: rimuovi display in modo da non catturare rendering
          pa.style.display = 'none';
        } catch (e) {}
      }
      // rimuovi classe paused subito sul bottom overlay
      this.playOverlay.classList.remove('paused');

      // also remove paused/buffering from top overlay so it can hide
      if (this.topOverlay) {
        this.topOverlay.classList.remove('paused');
        this.topOverlay.classList.remove('buffering');
        // animate-in for top overlay briefly (keeps consistent UX)
        this.topOverlay.classList.add('animate-in');
        this.topOverlay.style.display = 'flex';
        this.topOverlay.style.opacity = '1';
        setTimeout(()=> {
          try { this.topOverlay.classList.remove('animate-in'); } catch(e){}
          // hide top overlay if nothing else
          if (!this.playOverlay.classList.contains('paused') && !this.playOverlay.classList.contains('buffering')) {
            this.topOverlay.style.opacity = '0';
            setTimeout(()=> { try { this.topOverlay.style.display = 'none'; } catch(e){} }, 220);
          }
        }, PLAY_TRANSIENT_MS + 40);
      }

      // 2) hide spinner (if any) to make play animation visible
      if (spinner) {
        spinner.style.opacity = '0';
        spinner.style.display = 'none';
        this.playOverlay.classList.remove('buffering');
      }

      // make overlay visible for animation
      this.playOverlay.style.display = 'flex';
      this.playOverlay.style.opacity = '1';

      // prepare play icon
      if (ip) {
        ip.style.display = 'block';
        ip.style.opacity = '1';
        ip.style.transform = 'translate(-50%,-50%) scale(0.95)';
        ip.style.zIndex = '9999';
      }

      // animate: play zoom + fade out
      if (window.gsap) {
        // use GSAP for smoother animation
        gsap.fromTo(ip, { scale: 0.95, opacity: 1 }, {
          scale: 1.28,
          opacity: 0,
          duration: PLAY_TRANSIENT_MS / 1000,
          ease: 'power2.out',
          onComplete: () => {
            // cleanup: hide play icon and overlay if nothing else active
            try { ip.style.opacity = '0'; ip.style.display = 'none'; } catch (e) {}
            if (!this.playOverlay.classList.contains('buffering') && !this.playOverlay.classList.contains('paused')) {
              this.playOverlay.style.opacity = '0';
              setTimeout(()=> this.playOverlay.style.display = 'none', 220);
            }
          }
        });
      } else {
        // fallback: use CSS transition + timeout
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



    destroy() {
      this.clearAutoplay();
      this._stopProgressLoop();
      if (this._pauseTimeoutId) { clearTimeout(this._pauseTimeoutId); this._pauseTimeoutId = null; }
      try {
        this.layerA.pause(); this.layerB.pause();
      } catch (e) {}
    }
  }

  /* ---------------- Home init ---------------- */
  function initHome(context = document) {
    const section = context.querySelector('#carouselSection');
    if (!section) return;

    // Prefer HOME_CAROUSEL (sorgenti separate), fallback a FEATURED_IDS -> VIDEOS
    let slides = Array.isArray(HOME_CAROUSEL) && HOME_CAROUSEL.length ? HOME_CAROUSEL.slice() : FEATURED_IDS.map(id => VIDEOS.find(v => v.id === id)).filter(Boolean);
    if (!slides.length) slides.push(...(Array.isArray(VIDEOS) ? VIDEOS.slice(0, Math.min(2, VIDEOS.length)) : []));

    const muteBtn = context.querySelector('#muteToggle');
    homeCarousel = new VideoCarousel({
      container: section,
      prevSelector: '#prevBtn',
      nextSelector: '#nextBtn',
      linkSelector: '#carouselLink',
      slides,
      muteBtn
    });
    if (muteBtn) homeCarousel.muteBtn = muteBtn;
    if (homeCarousel.muteBtn) homeCarousel.updateMuteButton();
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
      btn.classList.toggle('active', idx === 0);
      btn.addEventListener('click', () => {
        catList.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCategory(c);
      });
      li.appendChild(btn);
      catList.appendChild(li);
    });

    // use the new top-overlay mute button if present (fallback null)
    const muteBtn = section.querySelector('.top-overlay .mute-btn');

    async function renderCategory(category) {
      // safety: if VIDEOS is not an array, provide fallback empty
      const slides = Array.isArray(VIDEOS) ? VIDEOS.filter(v => v.category === category) : [];
      if (!slides.length) {
        if (galleryPlayer) galleryPlayer.destroy();
        const layerA = section.querySelector('.gallery-video.layer-a');
        const layerB = section.querySelector('.gallery-video.layer-b');
        if (layerA) { layerA.removeAttribute('src'); layerA.load?.(); layerA.style.opacity = 0; }
        if (layerB) { layerB.removeAttribute('src'); layerB.load?.(); layerB.style.opacity = 0; }
        const titleEl = section.querySelector('#galleryTitle');
        if (titleEl) titleEl.textContent = 'Nessun video';
        galleryGrid.innerHTML = `<div style="padding:28px;color:var(--muted);text-align:center">Nessun video per la categoria "${category}"</div>`;
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
          slides,
          muteBtn
        });
      }

      if (galleryPlayer && galleryPlayer.muteBtn) galleryPlayer.updateMuteButton();
      populateGrid(galleryGrid, category);
    }

    renderCategory(CATEGORIES[0]);
  }

  function populateGrid(container, category) {
    container.innerHTML = '';
    const items = Array.isArray(VIDEOS) ? VIDEOS.filter(v => v.category === category) : [];
    items.forEach((v, idx) => {
      const btn = create('button', { class: 'grid-item', type: 'button', dataset: { id: v.id } });
      btn.innerHTML = `
        <video src="${v.src}" preload="metadata" playsinline muted></video>
        <div class="hover-overlay" aria-hidden="true"></div>
        <div class="preview-info"><strong>${v.title}</strong></div>
        <div class="preview-info"><small>${v.desc}</small></div>
      `;
      const vid = btn.querySelector('video');
      let t = null;
      btn.addEventListener('mouseenter', () => {
        t = setTimeout(() => { try { vid.play().catch(()=>{}); } catch(e){}; btn.classList.add('hovering'); }, 60);
      });
      btn.addEventListener('mouseleave', () => { if (t) clearTimeout(t); try { vid.pause(); vid.currentTime = 0; } catch(e){}; btn.classList.remove('hovering'); });

      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        if (galleryPlayer) {
          galleryPlayer.playIndex(idx, { userTriggered: true });
        }
      });

      container.appendChild(btn);
    });
  }

  /* ---------------- ABOUT ---------------- */
  function initAbout(context = document) {
    const facts = context.querySelector('.facts');
    setTimeout(() => { if (facts) facts.classList.add('visible'); }, 300);
    const bioCard = context.querySelector('#bioCard');
    const profileImg = context.querySelector('#profileImg');
    if (bioCard && profileImg) {
      bioCard.addEventListener('mousemove', (e) => {
        const r = bioCard.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        profileImg.style.transform = `translate(${dx * 10}px, ${dy * 6}px) scale(1.05)`;
      });
      bioCard.addEventListener('mouseleave', () => { profileImg.style.transform = ''; });
    }
  }

  /* ---------------- RUN / BARBA ---------------- */
  function runInits(context = document) {
    initMenu(context);
    if (context.querySelector && context.querySelector('#carouselSection')) initHome(context);
    if (context.querySelector && context.querySelector('#galleryCarouselSection')) initGallery(context);
    if (context.querySelector && context.querySelector('.facts')) initAbout(context);
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

  log('main.js ready — patched (VIDEOS safe-guarded).');
})();
