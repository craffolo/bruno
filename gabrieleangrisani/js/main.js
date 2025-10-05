(() => {
  /* ---------------- CONFIG ---------------- */
  const AUTOPLAY_INTERVAL_MS = 4000;
  const SLIDE_CHANGE_OVERLAY_MS = 1000;
  const FEATURED_IDS = ['cm_festafinecampagna25', 'alici_di_menaica_teaser', 'partenope_fashion_film', 'cast_ride_or_die', 'evan_primo_marzo', 'niven_alpaca_freestyle', 'sevdaliza_human', 'sinestesie', 'waldeinsamkeit', 'studio_notarile_dausilio'];
  const VIDEOS = [
    // Corporate
    { id: 'di-agostino-costruzioni', src: 'https://jellybruno.home04.cyou/Items/afedd456c88d3f5dd2d53b6de535e9eb/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Di Agostino Costruzioni', desc: 'Corporate video - architecture & construction', descrizione: 'Video aziendale che mette in risalto l\'architettura e la costruzione.', category: 'Corporate' },
    { id: 'tecnocarpoint_trailer', src: '', title: 'Tecnocarpoint Trailer', desc: 'Corporate video - cars & showroom', descrizione: 'Trailer aziendale che presenta auto e showroom.', category: 'Corporate' },
    { id: 'villa_utopia', src: 'https://jellybruno.home04.cyou/Items/9dcd31f4187d033811d211958d7fc56a/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Villa Utopia', desc: 'Corporate video - real estate & luxury', descrizione: 'Video aziendale che mette in risalto il settore immobiliare di lusso.', category: 'Corporate' },
    
    // Documentaries
    { id: 'alici_di_menaica_mini_doc', src: 'https://jellybruno.home04.cyou/Items/eb10ccc7da5c8da500798977db515274/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Alici di Menaica - Mini Doc', desc: 'Documentary - fishing & tradition', descrizione: 'Documentario che esplora la pesca tradizionale delle alici.', category: 'Documentaries' },
    { id: 'alici_di_menaica_teaser', src: 'https://jellybruno.home04.cyou/Items/159939ff98105cb84976523d4a8747f0/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Alici di Menaica - Teaser', desc: 'Documentary teaser - fishing & tradition', descrizione: 'Teaser del documentario che esplora la pesca tradizionale delle alici.', category: 'Documentaries' },
    { id: 'cm_festafinecampagna25', src: 'https://jellybruno.home04.cyou/Items/a3af8e041039eaa5b24a1df30e33ac34/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'CM Festa Fine Campagna 25', desc: 'Documentary - community & celebration', descrizione: 'Documentario che cattura la celebrazione della comunità.', category: 'Documentaries' },

    // Fashion
    { id: 'alienation', src: 'https://jellybruno.home04.cyou/Items/d65a707cc651a33626c791874ef9db68/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Alienation', desc: 'Fashion video - avant-garde & surreal', descrizione: 'Video di moda che esplora temi avanguardisti e surreali.', category: 'Fashion' },
    { id: 'partenope_fashion_film', src: 'https://jellybruno.home04.cyou/Items/38281e6c00e1ae9f8d4f2588a7a4cf95/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Partenope Fashion Film', desc: 'Fashion video - elegance & style', descrizione: 'Video di moda che mette in risalto eleganza e stile.', category: 'Fashion' },

    // Fitness
    { id: 'duetto_nuova_scheda', src: 'https://jellybruno.home04.cyou/Items/4864602a68758ea7d8fa9fd9b98491d5/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Duetto Nuova Scheda', desc: 'Fitness video - workout & training', descrizione: 'Video di fitness che mostra esercizi e allenamenti.', category: 'Fitness' },
    { id: 'estratto_trailer_video_lungo', src: 'https://jellybruno.home04.cyou/Items/41f0285d1af84931e0b3dde5ed6c0f9e/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Estratto Trailer Video Lungo', desc: 'Fitness video - training & motivation', descrizione: 'Trailer di un video di fitness che ispira allenamento e motivazione.', category: 'Fitness' },
    { id: 'reel_leg_day', src: 'https://jellybruno.home04.cyou/Items/8cfbfee50dde73127d8202247785db7b/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Reel Leg Day', desc: 'Fitness video - leg workout & strength', descrizione: 'Video di fitness che si concentra su esercizi per le gambe e la forza.', category: 'Fitness' },
    { id: 'reel_presentazione', src: 'https://jellybruno.home04.cyou/Items/e6458e7d6f33fe808a553c9184c4d673/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Reel Presentazione', desc: 'Fitness video - introduction & overview', descrizione: 'Video di fitness che introduce e fornisce una panoramica degli allenamenti.', category: 'Fitness' },
    { id: 'reel_workouts', src: 'https://jellybruno.home04.cyou/Items/b805a3ca2d59298839c94c0c184766d3/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Reel Workouts', desc: 'Fitness video - various workouts & routines', descrizione: 'Video di fitness che presenta vari allenamenti e routine.', category: 'Fitness' },
    { id: 'tiktok_1_tom_plantz', src: 'https://jellybruno.home04.cyou/Items/fc2b5a2bbb447341d7fa1644fd9ae189/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'TikTok 1 Tom Plantz', desc: 'Fitness video - TikTok style workout', descrizione: 'Video di fitness in stile TikTok che mostra un allenamento rapido e coinvolgente.', category: 'Fitness' },
    { id: 'tiktok_2_hipthrust', src: 'https://jellybruno.home04.cyou/Items/042ecf17e8a944e6d28689cdbf674ba4/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'TikTok 2 Hipthrust', desc: 'Fitness video - TikTok style hip thrust workout', descrizione: 'Video di fitness in stile TikTok che mostra un allenamento focalizzato sugli hip thrust.', category: 'Fitness' },
    { id: 'tiktok_3_compilation', src: 'https://jellybruno.home04.cyou/Items/74b4f4339fcf531164603748a7cc1408/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'TikTok 3 Compilation', desc: 'Fitness video - TikTok style compilation', descrizione: 'Video di fitness in stile TikTok che presenta una compilation di esercizi rapidi e coinvolgenti.', category: 'Fitness' },

    // Food
    { id: 'antonia_klugman_la_quinta_stagione', src: 'https://jellybruno.home04.cyou/Items/d9042551a90b1e420921d77d471e1261/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Antonia Klugman - La Quinta Stagione', desc: 'Food video - culinary art & seasonal ingredients', descrizione: 'Video culinario che celebra l\'arte culinaria e gli ingredienti stagionali.', category: 'Food' },
    { id: 'cocktail_demo', src: 'https://jellybruno.home04.cyou/Items/14ff37f6bac567d8cc20dcda153ba097/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Cocktail Demo', desc: 'Food video - cocktail making & bartending', descrizione: 'Video che mostra l\'arte della preparazione di cocktail e del bartending.', category: 'Food' },
    { id: 'intervista_varnelli', src: 'https://jellybruno.home04.cyou/Items/7f1b5ee20fb88fe586d71572c8da6956/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Intervista Varnelli', desc: 'Food video - interview & brand story', descrizione: 'Video intervista che racconta la storia del marchio Varnelli.', category: 'Food' },
    { id: 'martina_caruso_la_quinta_stagione', src: 'https://jellybruno.home04.cyou/Items/867031d47a4efe9844b7060b8c4a02a7/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Martina Caruso - La Quinta Stagione', desc: 'Food video - culinary art & seasonal ingredients', descrizione: 'Video culinario che celebra l\'arte culinaria e gli ingredienti stagionali.', category: 'Food' },
    { id: 'scarpariello_varnelli', src: 'https://jellybruno.home04.cyou/Items/45cd826b8b47e86564dd795de250a079/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Scarpariello Varnelli', desc: 'Food video - recipe & cooking demonstration', descrizione: 'Video che presenta una ricetta e una dimostrazione di cucina.', category: 'Food' },
    { id: 'valeria_piccini_la_quinta_stagione', src: 'https://jellybruno.home04.cyou/Items/90ee38af27ed5dd0687e83d8cfd1e90b/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Valeria Piccini - La Quinta Stagione', desc: 'Food video - culinary art & seasonal ingredients', descrizione: 'Video culinario che celebra l\'arte culinaria e gli ingredienti stagionali.', category: 'Food' },

    // Music
    { id: 'cast_ride_or_die', src: 'https://jellybruno.home04.cyou/Items/e3c02ec29604a8e23bb2b22cf4d13b7c/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'CAST - RIDE OR DIE', desc: 'Music video - urban & dynamic', descrizione: 'Video musicale con temi urbani e dinamici.', category: 'Music' },
    { id: 'eb_me_in_te', src: 'https://jellybruno.home04.cyou/Items/202700e20ff2c7f7f986f019d9a3dc1c/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'EB - ME IN TE', desc: 'Music video - romantic & emotional', descrizione: 'Video musicale con temi romantici ed emotivi.', category: 'Music' },
    { id: 'evan_primo_marzo', src: 'https://jellybruno.home04.cyou/Items/490247b718a393c61736a2c5cf3e95f7/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'EVAN - PRIMO MARZO', desc: 'Music video - introspective & moody', descrizione: 'Video musicale con temi introspettivi e cupi.', category: 'Music' },
    { id: 'niven_alpaca_freestyle', src: 'https://jellybruno.home04.cyou/Items/b6ce87128c53f9332b742fa435cf0eaa/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'NIVEN - ALPACA FREESTYLE', desc: 'Music video - energetic & vibrant', descrizione: 'Video musicale con temi energetici e vibranti.', category: 'Music' },
    { id: 'sevdaliza_human', src: 'https://jellybruno.home04.cyou/Items/3493805ee55cff227e17a821a8ee5985/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'SEVDALIZA - HUMAN', desc: 'Music video - artistic & thought-provoking', descrizione: 'Video musicale con temi artistici e stimolanti.', category: 'Music' },
    { id: 'sinestesie', src: 'https://jellybruno.home04.cyou/Items/ac45a1bc19fcf9f8845d62654886e7a1/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'SINESTESIE', desc: 'Music video - experimental & surreal', descrizione: 'Video musicale con temi sperimentali e surreali.', category: 'Music' },
    
    // Shortfilm
    {id: 'chiacchiere_da_ascensore', src: 'https://jellybruno.home04.cyou/Items/45ec83c2dadbcf2c62d751129ad6808d/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Chiacchiere da Ascensore', desc: 'Short film - comedy & daily life', descrizione: 'Corto comico che esplora situazioni quotidiane in un ascensore.', category: 'Shortfilm' },
    {id: 'waldeinsamkeit', src: 'https://jellybruno.home04.cyou/Items/0e10af99dee24604fe30d6425b2c3e2f/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Waldeinsamkeit', desc: 'Short film - nature & solitude', descrizione: 'Corto che esplora il tema della solitudine nella natura.', category: 'Shortfilm' },

    // Spot
    { id: 'studio_notarile_dausilio', src: 'https://jellybruno.home04.cyou/Items/0a8f310e7ea2eac7b335e28bf853bcf2/Download?api_key=34cc06d14de0430c8c9715656f23abb3', title: 'Studio Notarile D\'Ausilio', desc: 'Spot - professional services', descrizione: 'Spot pubblicitario per servizi professionali notarili.', category: 'Spot' },
    
  
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

  /* ---------------- (Kept for compatibility) MUTE PERSISTENCE helpers ----------------
     Nota: per il comportamento richiesto (mute locale) NON useremo questi in maniera globale.
     Li lascio nel file in caso volessi ripristinare futuro comportamento globale.
  */
  const MUTE_KEY = 'site_mute_pref';
  function readMute() { try { return localStorage.getItem(MUTE_KEY) === '1'; } catch (e) { return false; } }
  function writeMute(v) { try { localStorage.setItem(MUTE_KEY, v ? '1' : '0'); } catch (e) {} }

  /* ---------------- Instance registry (container -> VideoCarousel) ----------------
     Serve al delegato click per trovare l'istanza corretta e togglare solo quella.
  */
  const instanceMap = new WeakMap();

  // references to main carousels if needed elsewhere
  let homeCarousel = null;
  let galleryCarousel = null;

  /* ---------------- Menu (desktop inline / mobile dropdown) ---------------- */
  function initMenu(context = document) {
    const navToggle = context.querySelector('#navToggle');
    const navList = context.querySelector('#navList');
    if (!navToggle || !navList) return;

    // create the mobile dropdown (global element appended to body)
    let mobileDropdown = document.getElementById('mobileDropdown');
    if (!mobileDropdown) {
      mobileDropdown = create('div', { id: 'mobileDropdown', class: 'mobile-dropdown' }, '');
      document.body.appendChild(mobileDropdown);
    }
    mobileDropdown.innerHTML = ''; // clear previous

    // populate mobileDropdown with clones but styled for mobile
    Array.from(navList.children).forEach(li => {
      const a = li.firstElementChild.cloneNode(true);
      a.classList.add('mobile-link');
      // ensure links are block + white (CSS will style .mobile-dropdown a)
      a.addEventListener('click', () => {
        mobileDropdown.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
      mobileDropdown.appendChild(a);
    });

    // hamburger toggle
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDropdown.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      if (window.gsap) {
        if (isOpen) gsap.fromTo(mobileDropdown, { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.36, ease: 'power2.out' });
        else gsap.to(mobileDropdown, { y: -6, opacity: 0, duration: 0.22, ease: 'power1.in' });
      }
    });

    // click outside closes dropdown
    document.addEventListener('click', (e) => {
      if (!mobileDropdown.classList.contains('open')) return;
      if (!e.target.closest('#mobileDropdown') && !e.target.closest('#navToggle')) {
        mobileDropdown.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------- Reusable VideoCarousel ---------------- */
  class VideoCarousel {
    constructor(opts) {
      this.container = opts.container;
      this.videoEl = this.container.querySelector('.carousel-video');
      this.prevBtn = this.container.querySelector(opts.prevSelector);
      this.nextBtn = this.container.querySelector(opts.nextSelector);
      this.titleEl = this.container.querySelector('.carousel-title');
      this.descEl = this.container.querySelector('.carousel-desc');
      this.linkEl = this.container.querySelector(opts.linkSelector);
      this.muteBtn = opts.muteBtn || null; // button inside this carousel
      this.slides = opts.slides || [];
      this.idx = 0;
      this.autoplayTimer = null;
      this.savedTime = {};
      // LOCAL mute: default false -> start with audio (browser autoplay policy may block)
      this.muted = false;
      this._saveInterval = null;

      // register instance for delegation
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
        this.linkEl.addEventListener('click', () => {
          const meta = this.slides[this.idx];
          if (meta) try { sessionStorage.setItem('selectedVideoId', meta.id); } catch (e) {}
        });
      }

      // If there's a local mute button inside this carousel, set its initial visual state
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

        // Forza la proprietà 'muted' e aggiorna il volume
        v.muted = !!muted;
        v.volume = muted ? 0 : 1;

        // 🧠 Fix specifico per desktop:
        // Forza un "nudge" all'audio per applicare il cambio in riproduzione
        if (!v.paused) {
          v.pause();
          const curTime = v.currentTime;
          // riavvia dopo leggerissimo delay per ricaricare l’audio context
          setTimeout(() => {
            try {
              v.currentTime = curTime;
              v.play().catch(() => {});
            } catch (e) {}
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
        if (this.linkEl) this.linkEl.href = `video.html?id=${encodeURIComponent(meta.id)}`;
        this.videoEl.play().catch(()=>{ /* autoplay may be blocked */ });
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
      this.autoplayTimer = setInterval(() => this.go(this.idx + 1), AUTOPLAY_INTERVAL_MS);
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

  /* ---------------- Home init ---------------- */
  function initHome(context = document) {
    const section = context.querySelector('#carouselSection');
    if (!section) return;
    const slides = FEATURED_IDS.map(id => VIDEOS.find(v => v.id === id)).filter(Boolean);
    if (!slides.length) slides.push(...VIDEOS.slice(0, Math.min(2, VIDEOS.length)));
    const muteBtn = context.querySelector('#muteToggle');
    homeCarousel = new VideoCarousel({
      container: section,
      prevSelector: '#prevBtn',
      nextSelector: '#nextBtn',
      linkSelector: '#carouselLink',
      slides,
      muteBtn
    });
    // if there is a mute button element we also ensure it's wired visually (the delegate toggles the instance)
    if (muteBtn) homeCarousel.muteBtn = muteBtn;
    if (homeCarousel.muteBtn) homeCarousel.updateMuteButton();
  }

  /* ---------------- Gallery init (single carousel filtered) ---------------- */
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

    const muteBtn = context.querySelector('#muteToggleGallery');

    function renderCategory(category) {
      const slides = VIDEOS.filter(v => v.category === category);
      if (!slides.length) {
        section.querySelector('.carousel-video').removeAttribute('src');
        section.querySelector('.carousel-video').load?.();
        const titleEl = section.querySelector('.carousel-title');
        const descEl = section.querySelector('.carousel-desc');
        if (titleEl) titleEl.textContent = 'Nessun video';
        if (descEl) descEl.textContent = '';
        galleryGrid.innerHTML = `<div style="padding:28px;color:var(--muted);text-align:center">Nessun video per la categoria "${category}"</div>`;
        return;
      }

      if (galleryCarousel) {
        galleryCarousel.saveState(galleryCarousel.idx || 0);
        galleryCarousel.slides = slides;
        galleryCarousel.setSlide(0);
        galleryCarousel.resetAutoplay();
        galleryCarousel.updateMuteButton();
      } else {
        galleryCarousel = new VideoCarousel({
          container: section,
          prevSelector: '#gPrevBtn',
          nextSelector: '#gNextBtn',
          linkSelector: '#gCarouselLink',
          slides,
          muteBtn
        });
        // ensure the instance knows its mute button
        if (muteBtn) galleryCarousel.muteBtn = muteBtn;
      }

      // sync visuals (only local instances will be updated by their updateMuteButton)
      if (galleryCarousel && galleryCarousel.muteBtn) galleryCarousel.updateMuteButton();

      populateGrid(galleryGrid, category);
    }

    renderCategory(CATEGORIES[0]);
  }

  function populateGrid(container, category) {
    container.innerHTML = '';
    const items = VIDEOS.filter(v => v.category === category);
    items.forEach(v => {
      const a = create('a', { class: 'grid-item', href: `video.html?id=${encodeURIComponent(v.id)}` });
      a.innerHTML = `
        <video src="${v.src}" preload="metadata" playsinline muted></video>
        <div class="hover-overlay" aria-hidden="true"></div>
        <div class="preview-info"><strong>${v.title}</strong></div>
        <div class="preview-info"><small>${v.desc}</small></div>
      `;
      const vid = a.querySelector('video');
      let t = null;
      a.addEventListener('mouseenter', () => {
        t = setTimeout(() => { try { vid.play().catch(()=>{}); } catch(e){}; a.classList.add('hovering'); }, 60);
      });
      a.addEventListener('mouseleave', () => { if (t) clearTimeout(t); try { vid.pause(); vid.currentTime = 0; } catch(e){}; a.classList.remove('hovering'); });
      a.addEventListener('click', () => { try { sessionStorage.setItem('selectedVideoId', v.id); } catch(e){}; });
      container.appendChild(a);
    });
  }

  /* ---------------- Video page ---------------- */
  function initVideoPage(context = document) {
    const player = context.querySelector('#player');
    if (!player) return;
    const params = new URLSearchParams(window.location.search);
    let id = params.get('id') || null;
    if (!id) {
      try { id = sessionStorage.getItem('selectedVideoId'); } catch (e) {}
    }
    let meta = VIDEOS.find(v => String(v.id) === String(id));
    if (!meta) meta = VIDEOS[0];
    try { sessionStorage.removeItem('selectedVideoId'); } catch (e) {}
    pauseAll(context);
    player.src = meta.src;
    player.load();
    // On the dedicated video page we'll keep player unmuted by default (user asked local behavior)
    player.muted = false;
    try { player.play().catch(()=>{}); } catch(e){}
    const titleEl = context.querySelector('#videoTitle');
    const descEl = context.querySelector('#videoDesc');
    if (titleEl) titleEl.textContent = meta.title || '';
    if (descEl) descEl.textContent = meta.descrizione || meta.desc || '';
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

  /* ---------------- Delegated click: mute-toggle (LOCAL instance) ----------------
     Questo listener intercetta click su qualunque .mute-toggle e applica toggle
     solo all'istanza del carosello più vicino (se presente). Funziona anche con Barba.
  */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('.mute-toggle');
    if (!btn) return;
    // cerca il container .carousel più vicino
    const carouselContainer = btn.closest('.carousel') || btn.closest('.carousel--gallery') || btn.closest('.carousel--full') || btn.closest('[data-carousel-container]');
    if (!carouselContainer) {
      // fallback: se non è dentro un .carousel, applica solo al video vicino (closest video)
      const vid = btn.closest('section') ? btn.closest('section').querySelector('video') : document.querySelector('video');
      if (vid) {
        vid.muted = !vid.muted;
        btn.classList.toggle('muted', !!vid.muted);
      }
      log('[mute] fallback toggled video (no carousel container)');
      return;
    }

    const instance = instanceMap.get(carouselContainer);
    if (!instance) {
      // fallback: trova il video e toggle
      const v = carouselContainer.querySelector('video');
      if (v) {
        v.muted = !v.muted;
        btn.classList.toggle('muted', !!v.muted);
      }
      log('[mute] no instance found for container, toggled video directly');
      return;
    }

    // toggle only this instance
    instance.toggleMute();
    // update the clicked button visual (and any other mute toggles inside same container)
    carouselContainer.querySelectorAll('.mute-toggle').forEach(b => b.classList.toggle('muted', !!instance.muted));
    log('[mute] toggled instance for container', carouselContainer, 'now muted=', instance.muted);
  });

  /* ---------------- RUN / BARBA ---------------- */
  function runInits(context = document) {
    initMenu(context);
    if (context.querySelector && context.querySelector('#carouselSection')) initHome(context);
    if (context.querySelector && context.querySelector('#galleryCarouselSection')) initGallery(context);
    if (context.querySelector && context.querySelector('#player')) initVideoPage(context);
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

  log('main.js ready — mute is LOCAL per-carousel (per-instance) — delegate active');
})();
