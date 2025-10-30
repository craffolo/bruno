// js/main.js (VIMEO-only, HLS removed)
// NOTE: this file expects Vimeo Player API to be loaded first:
// <script src="https://player.vimeo.com/api/player.js"></script>

(() => {
  /* ---------------- CONFIG / TIMINGS ---------------- */
  const GALLERY_AUTOPLAY_INTERVAL_MS = 5000;
  const MOUSE_IDLE_MS = 2000;
  const MOBILE_OVERLAY_TIMEOUT_MS = 2000;

  // behaviour / limits
  const USE_VIMEO_OVERLAY = false;   // if true allow Vimeo UI, else hide via embed params (we use our overlay)
  const ADAPT_ASPECT_RATIO = true;   // adapt aspect ratio on manual interaction
  const MAX_PLAYER_HEIGHT_PX = 720;  // don't let player grow beyond this (protect layout)
  const ASPECT_RATIO_TRANSITION_MS = 400; // ms for aspect ratio transition (when user triggers)
  const SCROLL_TO_PLAYER_DESKTOP = true;
  const SCROLL_TO_PLAYER_MOBILE = true;

  /* ---------------- DATA (LEAVE EMPTY — user will inject) ---------------- */
  // Provide these in your page before including this script:
  // window.VIDEOS = [...]
  // window.HOME_CAROUSEL = [...]
  const VIDEOS = (typeof window !== 'undefined' && window.VIDEOS) ? window.VIDEOS : [

    //Music videos
    { 
      id: 'cast_ride_or_die', 
      vimeoId: '1131786808',
      //preview: '',
      poster: 'statics/covers/music_videos/cast_ride_or_die.png', 
      title: 'Cast', 
      desc: 'Ride or Die', 
      category: 'Music videos' 
    },
    { 
      id: 'eb_me_in_te', 
      vimeoId: '1131787217',
      //preview: '',
      poster: 'statics/covers/music_videos/eb_me_in_te.png', 
      title: 'Eb', 
      desc: 'Me in te', 
      categories: ['Music videos','Social'] 
    },
    { 
      id: 'evan_primo_marzo', 
      vimeoId: '1131787356', 
      //preview: '',
      poster: 'statics/covers/music_videos/evan_primo_marzo.png', 
      title: 'Evan', 
      desc: 'Primo Marzo', 
      category: 'Music videos' 
    },
    { 
      id: 'niven_alpaca_freestyle', 
      vimeoId: '1131787946', 
      //preview: '',
      poster: 'statics/covers/music_videos/niven_alpaca_freestyle.png', 
      title: 'Niven', 
      desc: 'Alpaca Freestyle', 
      category: 'Music videos' 
    },
    { 
      id: 'sevdaliza_human', 
      vimeoId: '1131788520',
      //preview: '',
      poster: 'statics/covers/music_videos/sevdaliza_human.png', 
      title: 'Sevdaliza', 
      desc: 'Human', 
      category: 'Music videos' 
    },
    { 
      id: 'sinestesie', 
      vimeoId: '1131789149',
      //preview: '',
      poster: 'statics/covers/music_videos/sinestesie.jpg', 
      title: 'Sinestesie', 
      desc: '', 
      category: 'Music videos' 
    },

    // Commercials
    { 
      id: 'studio_notarile_dausilio', 
      vimeoId: '1131777520',
      //preview: '',
      poster: 'statics/covers/commercials/studio_notarile_dausilio.jpg',
      title: "Studio Notarile D'Ausilio", 
      desc: 'Come a casa, anche nei momenti importanti', 
      category: 'Commercials' 
    },

    //Documentaries
    { 
      id: 'casa_marrazzo_festa_di_fine_campagna', 
      vimeoId: '1131791058',
      //preview: '',
      poster: 'statics/covers/documentaries/casa_marrazzo_festa_di_fine_campagna.png',
      title: 'Casa Marrazzo', 
      desc: 'Festa di fine campagna', 
      categories: ['Documentaries','Food'] 
    },

    //Food
    { 
      id: 'antonia_klugmann_la_quinta_stagione', 
      vimeoId: '1079104268',
      //preview: '',
      poster: 'statics/covers/food/antonia_klugmann_la_quinta_stagione.png',
      title: 'Antonia Klugmann', 
      desc: 'La Quinta Stagione', 
      category: ['Food','Documentaries'] 
    },
    { 
      id: 'varnelli_cocktail', 
      vimeoId: '1131798687',
      //preview: '',
      poster: 'statics/covers/food/varnelli_cocktail.png',
      title: 'Varnelli', 
      desc: 'Cocktail crafting', 
      categories: ['Food', 'Social'] 
    },
    { 
      id: 'varnelli_interview', 
      vimeoId: '1131791456',
      //preview: '',
      poster: 'statics/covers/food/varnelli_interview.png',
      title: 'Varnelli', 
      desc: 'Interview', 
      categories: ['Food', 'Social'] 
    },
    { 
      id: 'martina_caruso_la_quinta_stagione', 
      vimeoId: '1131791508',
      //preview: '',
      poster: 'statics/covers/food/martina_caruso_la_quinta_stagione.png',
      title: 'Martina Caruso', 
      desc: 'La Quinta Stagione', 
      categories: ['Food', 'Documentaries'] 
    },
    { 
      id: 'valeria_piccini_la_quinta_stagione', 
      vimeoId: '1131791508',
      //preview: '',
      poster: 'statics/covers/food/valeria_piccini_la_quinta_stagione.png',
      title: 'Valeria Piccini', 
      desc: 'La Quinta Stagione', 
      categories: ['Food', 'Documentaries'] 
    },
    { 
      id: 'be_truffle_fancy_food_2025', 
      vimeoId: '1131801738',
      //preview: '',
      poster: 'statics/covers/food/be_truffle_fancy_food_2025.png',
      title: 'Be Truffle', 
      desc: 'Fancy food 2025', 
      categories: ['Food', 'Social'] 
    },
    { 
      id: 'be_truffle_basketball_players_reaction', 
      vimeoId: '1131801546',
      //preview: '',
      poster: 'statics/covers/food/be_truffle_basketball_players_reaction.png',
      title: 'Be Truffle', 
      desc: 'Basketball players reaction', 
      categories: ['Food', 'Social'] 
    },
    { 
      id: 'trucillo_tedx', 
      vimeoId: '1131801200',
      //preview: '',
      poster: 'statics/covers/food/trucillo_tedx.png',
      title: 'Trucillo', 
      desc: 'Tedx', 
      categories: ['Food', 'Social'] 
    },
    { 
      id: 'alta_campania_wine_fest_video_hero', 
      vimeoId: '1131801351',
      //preview: '',
      poster: 'statics/covers/food/alta_campania_wine_fest_video_hero.png',
      title: 'Alta Campania Wine fest', 
      desc: 'Video hero', 
      categories: ['Food', 'Social'] 
    },

    //Social
    { 
      id: 'cast_ride_or_die_trailer', 
      vimeoId: '1079178882',
      //preview: '',
      poster: 'statics/covers/music_videos/cast_ride_or_die.png', 
      title: 'Cast', 
      desc: 'Ride or Die Trailer', 
      categories: ['Music videos', 'Social'],
    },

    //Fashion
    { 
      id: 'alienation', 
      vimeoId: '1131794014',
      //preview: '',
      poster: 'statics/covers/fashion/alienation.png',
      title: 'Alienation', 
      desc: '', 
      categories: ['Fashion', 'Social'] 
    },
    { 
      id: 'partenope_fashion_film', 
      vimeoId: '1079106614',
      //preview: '',
      poster: 'statics/covers/fashion/partenope_fashion_film.png',
      title: 'Partenope', 
      desc: 'Fashion Film', 
      categories: ['Fashion', 'Commercials'] 
    },

    //Narratives
    { 
      id: 'chiacchiere_da_ascensore', 
      vimeoId: '1131799734',
      //preview: '',
      poster: 'statics/covers/narratives/chiacchiere_da_ascensore.png',
      title: 'Chiacchiere da Ascensore', 
      desc: '', 
      category: 'Narratives' 
    },
    { 
      id: 'waldeinsamkeit', 
      vimeoId: '1131801331',
      //preview: '',
      poster: 'statics/covers/narratives/waldeinsamkeit.png',
      title: 'Waldeinsamkeit', 
      desc: '', 
      category: 'Narratives' 
    },

    //Fitness
    { 
      id: 'the_buff_biologist_motivational_reel', 
      vimeoId: '1131791275',
      //preview: '',
      poster: 'statics/covers/fitness/the_buff_biologist_motivational_reel.png',
      title: 'The Buff biologist', 
      desc: 'Motivational reel', 
      categories: ['Fitness', 'Social'] 
    },
    { 
      id: 'miriamssfit_e_gianzcoach_workout_compilation', 
      vimeoId: '1131791335',
      //preview: '',
      poster: 'statics/covers/fitness/miriamssfit_e_gianzcoach_workout_compilation.png',
      title: 'Miriamssfit e Gianzcoach', 
      desc: 'Workout compilation', 
      categories: ['Fitness', 'Social'] 
    },

    //Corporate
    { 
      id: 'di_agostino_costruzioni_donna_salerno', 
      vimeoId: '1131778517',
      //preview: '',
      poster: 'statics/covers/corporate/di_agostino_costruzioni_donna_salerno.png',
      title: 'Di Agostino Costruzioni', 
      desc: 'Donna Salerno', 
      category: 'Corporate' 
    },
    { 
      id: 'tecnokarpoint_l_officina_e_il_suo_ritmo', 
      vimeoId: '1131779000',
      //preview: '',
      poster: 'statics/covers/corporate/tecnokarpoint_l_officina_e_il_suo_ritmo.png',
      title: 'Tecnokarpoint', 
      desc: 'L’officina e il suo ritmo', 
      category: 'Corporate' 
    },
    { 
      id: 'di_agostino_costruzioni_villa_utopia', 
      vimeoId: '1131780260',
      //preview: '',
      poster: 'statics/covers/corporate/di_agostino_costruzioni_villa_utopia.png',
      title: 'Di Agostino Costruzioni', 
      desc: 'Villa Utopia', 
      categories: ['Corporate','Real estate'] 
    },
  ];
  const HOME_CAROUSEL = (typeof window !== 'undefined' && window.HOME_CAROUSEL) ? window.HOME_CAROUSEL : [
    { 
      id: 'cast_neve_carousel', 
      vimeoId: '1131806450',
      title: 'Neve', 
      desc: 'Cast', 
      category: 'Music videos' , 
      galleryId: '' 
    },
    { 
      id: 'alici_di_menaica_carousel', 
      vimeoId: '1131806251',
      title: 'Alici di Menaica', 
      category: 'Documentaries', 
      galleryId: '' 
    },
    { 
      id: 'casa_marrazzo_festa_di_fine_campagna_carousel', 
      vimeoId: '1131806500',
      title: 'Festa di Fine Campagna', 
      category: 'Documentaries' , 
      galleryId: 'casa_marrazzo_festa_di_fine_campagna' 
    },
    { 
      id: 'sevdaliza_human_carousel', 
      vimeoId: '1131806552',
      title: 'Human', 
      category: 'Music Videos' , 
      galleryId: 'sevdaliza_human' 
    },
    { 
      id: 'il_compito_carousel', 
      vimeoId: '1131806594',
      title: 'Il Compito', 
      category: '' , 
      galleryId: '' 
    },
    { 
      id: 'la_quinta_stagione_carousel', 
      vimeoId: '1131806645',
      title: 'La Quinta Stagione', 
      category: 'Food' , 
      galleryId: 'antonia_klugmann_la_quinta_stagione' 
    },
    { 
      id: 'partenope_fashion_film_carousel', 
      vimeoId: '1131806708',
      title: 'Partenope', 
      category: 'Fashion' , 
      galleryId: 'partenope_fashion_film' 
    },
    { 
      id: 'cast_ride_or_die_carousel', 
      vimeoId: '1131806797',
      title: 'Ride or Die', 
      category: 'Music videos' , 
      galleryId: 'cast_ride_or_die' 
    },
    { 
      id: 'sinestesie_carousel', 
      vimeoId: '1131806838',
      title: 'Sinestesie', 
      category: 'Music videos' , 
      galleryId: 'sinestesie' 
    },        
    { 
      id: 'spot_notaio_carousel', 
      vimeoId: '1131806904',
      title: "Studio Notarile D'Ausilio", 
      category: 'Commercials' , 
      galleryId: 'studio_notarile_dausilio' 
    },
    { 
      id: 'varnelli_cocktail_carousel', 
      vimeoId: '1131806975',
      title: 'Varnelli di Fine Campagna', 
      category: 'Food' , 
      galleryId: 'varnelli_cocktail' 
    },        
    { 
      id: 'waldeinsamkeit_carousel', 
      vimeoId: '1131807020',
      title: 'Waldeinsamkeit', 
      category: 'Narratives' , 
      galleryId: 'waldeinsamkeit' 
    },
  ];
  const FEATURED_IDS = (typeof window !== 'undefined' && window.FEATURED_IDS) ? window.FEATURED_IDS : [];

  const CATEGORIES = (typeof window !== 'undefined' && window.CATEGORIES) ? window.CATEGORIES : [
    'Music videos','Commercials','Documentaries','Food','Fashion','Narratives','Fitness','Social','Corporate','Real estate'
  ];

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

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
  }

  function isMobileDevice() {
    return ('ontouchstart' in window) && /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
  }

  /* ---------------- SESSION ---------------- */
  const SESSION_FILTERS_KEY = 'gallery_last_filters';
  const SESSION_VIDEO_KEY = 'gallery_last_video';
  function saveSessionFilters(arr) { try { sessionStorage.setItem(SESSION_FILTERS_KEY, (Array.isArray(arr) ? arr.join(',') : (arr || ''))); } catch(e){} }
  function readSessionFilters() { try { const v = sessionStorage.getItem(SESSION_FILTERS_KEY); return v ? v.split(',').map(s=>s.trim()).filter(Boolean) : null; } catch(e){ return null; } }
  function saveSessionVideo(vid) { try { sessionStorage.setItem(SESSION_VIDEO_KEY, vid || ''); } catch(e){} }
  function readSessionVideo() { try { return sessionStorage.getItem(SESSION_VIDEO_KEY) || null; } catch(e){ return null; } }

  /* normalize categories for legacy compatibility */
  function normCategories(video) {
    if (!video) return [];
    if (Array.isArray(video.categories)) return video.categories;
    if (video.category && typeof video.category === 'string') return [video.category];
    return [];
  }

  /* ---------------- Menu (unchanged) ---------------- */
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
    });
    document.addEventListener('click', (e) => {
      if (!mobileDropdown.classList.contains('open')) return;
      if (!e.target.closest('#mobileDropdown') && !e.target.closest('#navToggle')) {
        mobileDropdown.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------- HomeCarousel (Vimeo-based) ---------------- */
  class HomeCarousel {
    constructor(opts) {
      this.container = opts.container;
      this.slides = opts.slides || [];
      this.iframeA = this.container.querySelector('.layer-a');
      this.iframeB = this.container.querySelector('.layer-b');
      this.active = 'A';
      this.index = 0;
      this.timer = null;

      // keep CSS-based sizing: home is no-scroll, full-viewport handled via CSS
      this._ensureIframes();
      if (!this.slides.length && Array.isArray(VIDEOS) && VIDEOS.length) this.slides = VIDEOS.slice(0, Math.min(6, VIDEOS.length));
      if (this.slides.length) this._loadInitial();
    }

    _ensureIframes() {
      // if not present they may be created server-side — assume valid iframe elements exist
      if (!this.iframeA || !this.iframeB) {
        const a = create('iframe', { class: 'layer-a', frameborder: '0', allow: 'autoplay; fullscreen', allowfullscreen: '' }, '');
        const b = create('iframe', { class: 'layer-b', frameborder: '0', allow: 'autoplay; fullscreen', allowfullscreen: '' }, '');
        a.style.position = 'absolute'; a.style.inset = '0'; a.style.width = '100%'; a.style.height = '100%';
        b.style.position = 'absolute'; b.style.inset = '0'; b.style.width = '100%'; b.style.height = '100%';
        const wrap = this.container;
        if (wrap) { wrap.appendChild(a); wrap.appendChild(b); }
        this.iframeA = a; this.iframeB = b;
      }
    }

    async _loadInitial() {
      const meta = this.slides[this.index];
      if (!meta) return;
      // autoplay muted in home
      const vId = meta.vimeoId || meta.id || meta.vimeo_id;
      if (!vId) return;
      const url = `${meta.iframe || `https://player.vimeo.com/video/${encodeURIComponent(vId)}` }?autoplay=1&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1`;
      try { this.iframeA.src = url; } catch (e) {}
      // no heavy preloading management: keep it simple (home is CSS sized)
      this._renderOverlay(meta.title || '', meta.desc || '');
      // start rotation
      this._startAutoplay();
    }

    _renderOverlay(title = '', desc = '') {
      let bottom = this.container.querySelector('.home-carousel-bottom');
      if (!bottom) {
        bottom = create('div', { class: 'home-carousel-bottom' }, '');
        this.container.appendChild(bottom);
      }
      bottom.innerHTML = `<div class="hc-meta"><div class="hc-title">${escapeHtml(title)}</div>${ desc ? `<div class="hc-desc">${escapeHtml(desc)}</div>` : '' }</div>`;
      bottom.addEventListener('click', (e) => {
        e.stopPropagation();
        const meta = this.slides[this.index];
        if (!meta) return;
        const galleryHash = meta.id ? `#video=${encodeURIComponent(meta.id)}` : (meta.vimeoId ? `#video=${encodeURIComponent(meta.vimeoId)}` : '');
        location.href = '/gallery' + (galleryHash || '');
      });
    }

    _startAutoplay() {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => this._advance(), 6000);
    }

    _advance() {
      if (!this.slides.length) return;
      this.index = (this.index + 1) % this.slides.length;
      const meta = this.slides[this.index];
      const vId = meta.vimeoId || meta.id;
      if (!vId) return;
      try {
        const url = `${meta.iframe || `https://player.vimeo.com/video/${encodeURIComponent(vId)}` }?autoplay=1&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1`;
        const inactive = (this.active === 'A') ? this.iframeB : this.iframeA;
        inactive.src = url;
        inactive.style.opacity = '1';
        const active = (this.active === 'A') ? this.iframeA : this.iframeB;
        active.style.opacity = '0';
        this.active = (this.active === 'A') ? 'B' : 'A';
        this._renderOverlay(meta.title || '', meta.desc || '');
      } catch (e) { console.warn('[homeCarousel] advance failed', e); }
    }

    destroy() {
      try { if (this.timer) clearInterval(this.timer); } catch(e){}
    }
  }

  /* ---------------- Gallery Player (Vimeo, dual-iframe) ---------------- */
  class GalleryPlayer {
    constructor(opts) {
      this.container = opts.container;
      this.iframeA = this.container.querySelector('.gallery-iframe.layer-a');
      this.iframeB = this.container.querySelector('.gallery-iframe.layer-b');
      this.titleEl = this.container.querySelector('#galleryTitle');
      this.prevBtn = this.container.querySelector('#gPrevBtn');
      this.nextBtn = this.container.querySelector('#gNextBtn');
      this.progressBar = this.container.querySelector('.progress-bar');
      this.progressBuffer = this.container.querySelector('.progress-buffer');
      this.progressWrap = this.container.querySelector('.progress-wrap');
      this.playOverlay = this.container.querySelector('.play-overlay');
      this.topOverlay = this.container.querySelector('.top-overlay');
      this.bottomOverlay = this.container.querySelector('.bottom-overlay');

      this.slides = opts.slides || [];
      this.currentIndex = 0;
      this.front = 'A'; // A is front by default
      this.players = { A: null, B: null }; // Vimeo.Player instances
      this.isManual = false;
      this.autoplayTimer = null;

      this._overlayTimer = null;
      this._initElements();
      this._wireControls();
      this._ensureOverlayWrapper();
      this._showOverlayTransient();
    }

    _initElements() {
      if (!this.iframeA || !this.iframeB) {
        // create if not present
        const gp = this.container.querySelector('.gallery-player') || this.container;
        if (!this.iframeA) {
          this.iframeA = create('iframe', { class: 'gallery-iframe layer-a', frameborder: '0', allow: 'autoplay; fullscreen', allowfullscreen: '' });
          this.iframeA.style.position = 'absolute'; this.iframeA.style.inset = '0'; this.iframeA.style.width = '100%'; this.iframeA.style.height = '100%';
          gp.insertBefore(this.iframeA, gp.firstChild || null);
        }
        if (!this.iframeB) {
          this.iframeB = create('iframe', { class: 'gallery-iframe layer-b', frameborder: '0', allow: 'autoplay; fullscreen', allowfullscreen: '' });
          this.iframeB.style.position = 'absolute'; this.iframeB.style.inset = '0'; this.iframeB.style.width = '100%'; this.iframeB.style.height = '100%';
          gp.insertBefore(this.iframeB, this.iframeA.nextSibling || null);
        }
      }
      // ensure wrapper has footprint; aspect ratio in CSS
      const wrap = this.container.querySelector('.gallery-player') || this.container;
      wrap.style.position = 'relative';
      // enforce max height to avoid huge videos
      wrap.style.maxHeight = MAX_PLAYER_HEIGHT_PX + 'px';
      wrap.style.overflow = 'hidden';
    }

    _ensureOverlayWrapper() {
      if (!this.galleryOverlay) {
        this.galleryOverlay = create('div', { class: 'gallery-overlay' }, '');
        const top = this.container.querySelector('.top-overlay');
        const play = this.container.querySelector('.play-overlay');
        const bottom = this.container.querySelector('.bottom-overlay');
        const bar = this.container.querySelector('.progress-wrap');
        if (top) this.galleryOverlay.appendChild(top);
        if (play) this.galleryOverlay.appendChild(play);
        if (bottom) this.galleryOverlay.appendChild(bottom);
        if (bar) this.galleryOverlay.appendChild(bar);
        this.container.appendChild(this.galleryOverlay);
      }
      // pointer-events ok
      this.galleryOverlay.querySelectorAll('.top-btn, .mute-btn, .fs-btn, .control-btn, .progress-wrap').forEach(el => {
        el.style.pointerEvents = 'auto';
      });
    }

    _showOverlayTransient() {
      this._showGalleryOverlay();
      this._startOverlayHideTimer();
    }

    _showGalleryOverlay() {
      if (!this.galleryOverlay) return;
      this.galleryOverlay.classList.add('visible');
      this.galleryOverlay.classList.remove('hidden');
      if (this.playOverlay) this.playOverlay.style.opacity = '1';
      if (this.topOverlay) this.topOverlay.style.opacity = '1';
      if (this.bottomOverlay) this.bottomOverlay.style.opacity = '1';
    }

    _hideGalleryOverlay() {
      if (!this.galleryOverlay) return;
      this.galleryOverlay.classList.remove('visible');
      this.galleryOverlay.classList.add('hidden');
      if (this.playOverlay) this.playOverlay.style.opacity = '0';
      if (this.topOverlay) this.topOverlay.style.opacity = '0';
      if (this.bottomOverlay) this.bottomOverlay.style.opacity = '0';
    }

    _startOverlayHideTimer(timeout = MOUSE_IDLE_MS) {
      if (this._overlayTimer) { clearTimeout(this._overlayTimer); this._overlayTimer = null; }
      const useTimeout = isMobileDevice() ? MOBILE_OVERLAY_TIMEOUT_MS : timeout;
      this._overlayTimer = setTimeout(()=> { this._hideGalleryOverlay(); this._overlayTimer = null; }, useTimeout);
    }

    _wireControls() {
      if (this.prevBtn) this.prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this._onUserInteraction(); this.prev(); });
      if (this.nextBtn) this.nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this._onUserInteraction(); this.next(); });

      // mute button
      const topMute = this.container.querySelector('.top-overlay .mute-btn');
      if (topMute) topMute.addEventListener('click', (e) => {
        e.stopPropagation(); e.preventDefault();
        const muted = !this._readMute();
        this._writeMute(muted);
        this.updateMuteButton();
        try { const p = this._getFrontPlayer(); if (p && typeof p.setVolume === 'function') p.setVolume(muted ? 0 : 1).catch(()=>{}); } catch(e){}
      });

      // fullscreen (attempt on iframe)
      const fsBtn = this.container.querySelector('.top-overlay .fs-btn');
      if (fsBtn) fsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        try {
          const iframe = this._getFrontIframe();
          if (iframe && iframe.requestFullscreen) iframe.requestFullscreen().catch(()=>{});
        } catch(e){}
        setTimeout(()=> this.updateFullscreenButton(), 200);
      });
    }

    _onUserInteraction() {
      if (!this.isManual) {
        this.isManual = true;
        this.clearAutoplay();
        // when user interacts, enable aspect ratio adaptation if configured
        if (ADAPT_ASPECT_RATIO) this._adaptAspectRatioToCurrentVideo(ASPECT_RATIO_TRANSITION_MS).catch(()=>{});
        log('[gallery] user interaction -> manual mode');
      }
    }

    _readMute() { try { return localStorage.getItem('site_mute_pref') === '1'; } catch(e){ return true; } }
    _writeMute(v) { try { localStorage.setItem('site_mute_pref', v ? '1' : '0'); } catch(e){} }
    updateMuteButton() {
      const muted = this._readMute();
      const btn = this.container.querySelector('.top-overlay .mute-btn');
      if (btn) { btn.classList.toggle('muted', !!muted); btn.setAttribute('aria-pressed', muted ? 'true' : 'false'); }
    }

    clearAutoplay() { if (this.autoplayTimer) { clearInterval(this.autoplayTimer); this.autoplayTimer = null; } }
    resetAutoplay() {
      this.clearAutoplay();
      if (this.isManual) return;
      this.autoplayTimer = setInterval(()=> { this.next(); }, GALLERY_AUTOPLAY_INTERVAL_MS);
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
      if (!this.slides || !this.slides.length) return;
      i = (i + this.slides.length) % this.slides.length;
      const meta = this.slides[i];
      if (!meta) return;
      if (opts.userTriggered) this._onUserInteraction();

      // perform Vimeo-only cut:
      try {
        await this._playIndexVimeo(i, meta, opts);
      } catch (e) {
        console.warn('[gallery] playIndex error', e);
      }

      this.currentIndex = i;
      try { saveSessionVideo(meta.id || meta.vimeoId || ''); } catch(e){}
      // update url + highlight
      try {
        const selectedCats = getSelectedFiltersFromUI();
        const params = new URLSearchParams();
        if (selectedCats && selectedCats.length) params.set('cats', selectedCats.join(','));
        params.set('video', meta.id || meta.vimeoId || '');
        const newHash = params.toString();
        history.replaceState(null, '', location.pathname.replace(/\/+$/, '') + (newHash ? ('#' + newHash) : ''));
        this._highlightGridItem(this.currentIndex);
      } catch(e){}

      // scroll if desired
      if ((isMobileDevice() && SCROLL_TO_PLAYER_MOBILE) || (!isMobileDevice() && SCROLL_TO_PLAYER_DESKTOP)) {
        try {
          const wrap = this.container.querySelector('.gallery-player') || this.container;
          if (wrap && typeof wrap.scrollIntoView === 'function') setTimeout(()=> wrap.scrollIntoView({behavior:'smooth', block:'start'}), 80);
        } catch(e){}
      }

      this.resetAutoplay();
    }

    _getFrontIframe() { return (this.front === 'A') ? this.iframeA : this.iframeB; }
    _getBackIframe()  { return (this.front === 'A') ? this.iframeB : this.iframeA; }
    _getFrontPlayer() { return (this.front === 'A') ? this.players.A : this.players.B; }
    _getBackPlayer()  { return (this.front === 'A') ? this.players.B : this.players.A; }

    async _playIndexVimeo(i, meta, opts = {}) {
      if (!window.Vimeo || typeof window.Vimeo.Player !== 'function') {
        console.warn('[vimeo] Player API missing. Include https://player.vimeo.com/api/player.js');
        return;
      }

      const backIframe = this._getBackIframe();
      const frontIframe = this._getFrontIframe();
      const backKey = (this.front === 'A') ? 'B' : 'A';
      const frontKey = this.front;

      const vId = meta.vimeoId || meta.id || meta.vimeo_id;
      if (!vId) { console.warn('[vimeo] meta has no vimeoId'); return; }

      // Build embed url - hide vimeo UI if desired
      const params = new URLSearchParams({
        autoplay: (opts.autoplay === false) ? '0' : '1',
        muted: '1', // autoplay always muted by your requirement; user can toggle volume with UI
        playsinline: '1',
        controls: USE_VIMEO_OVERLAY ? '1' : '0',
        title: USE_VIMEO_OVERLAY ? '1' : '0',
        byline: USE_VIMEO_OVERLAY ? '1' : '0',
        portrait: USE_VIMEO_OVERLAY ? '1' : '0'
      }).toString();
      const url = `${meta.iframe ? meta.iframe : `https://player.vimeo.com/video/${encodeURIComponent(vId)}`}?${params}`;

      // set src of back iframe (this starts load)
      try {
        backIframe.src = url;
        backIframe.style.opacity = '0';
        backIframe.style.zIndex = '4';
        backIframe.style.pointerEvents = USE_VIMEO_OVERLAY ? '' : 'none';
      } catch (e) { console.warn('[vimeo] set src failed', e); }

      // cleanup previous back player if present
      if (this.players[backKey]) {
        try { await this.players[backKey].unload(); } catch(e){}
        this.players[backKey] = null;
      }

      // create player instance
      let backPlayer = null;
      try {
        backPlayer = new Vimeo.Player(backIframe);
        this.players[backKey] = backPlayer;
      } catch (e) {
        console.warn('[vimeo] Player creation failed', e);
        this.players[backKey] = null;
      }

      // wait for ready (robust)
      try {
        if (backPlayer && typeof backPlayer.ready === 'function') {
          await backPlayer.ready();
        }
      } catch(e){
        console.warn('[vimeo] back player ready() failed', e);
      }

      // attach basic events
      try {
        if (backPlayer) {
          backPlayer.off && backPlayer.off('timeupdate');
          backPlayer.on && backPlayer.on('timeupdate', (data) => {
            // update simple progress UI based on duration
            try {
              backPlayer.getDuration().then(duration => {
                if (duration && this.progressBar) {
                  const pct = (data.seconds / duration) * 100;
                  this.progressBar.style.width = Math.max(0, Math.min(100, pct)) + '%';
                  this.progressBar.setAttribute('aria-valuenow', String(Math.round(Math.max(0, Math.min(100, pct)))));
                }
              }).catch(()=>{});
            } catch(e){}
          });
          backPlayer.on && backPlayer.on('ended', () => { if (!this.isManual) this.next(); });
        }
      } catch(e){}

      // if user-interaction and aspect adaptation desired, compute dims and animate
      const shouldAdapt = ADAPT_ASPECT_RATIO && (this.isManual || opts.forceResize);
      if (shouldAdapt) {
        try {
          const dims = await Promise.all([backPlayer.getVideoWidth(), backPlayer.getVideoHeight()]);
          const w = dims[0] || 16;
          const h = dims[1] || 9;
          this._animateAspectRatio(w, h, ASPECT_RATIO_TRANSITION_MS);
        } catch(e){}
      }

      // try to play the back player
      try {
        if (backPlayer && typeof backPlayer.play === 'function') {
          try { await backPlayer.play(); } catch(e) { /* still continue with cut even if autoplay blocked */ }
        }
      } catch(e){}

      // CUT: reveal back -> hide front
      try {
        backIframe.style.transition = 'none';
        frontIframe && (frontIframe.style.transition = 'none');

        backIframe.style.opacity = '1';
        backIframe.style.zIndex = '3';
        if (frontIframe) { frontIframe.style.opacity = '0'; frontIframe.style.zIndex = '2'; }

        // show custom overlay briefly
        try {
          this._showGalleryOverlay();
          if (this._overlayTimer) { clearTimeout(this._overlayTimer); this._overlayTimer = null; }
          this._overlayTimer = setTimeout(()=> { this._hideGalleryOverlay(); this._overlayTimer = null; }, 1400);
        } catch(e){}

        // unload/detach previous front player after short delay
        setTimeout(async () => {
          try {
            if (this.players[frontKey]) { await this.players[frontKey].unload(); this.players[frontKey] = null; }
            else if (frontIframe) { try { frontIframe.removeAttribute('src'); } catch(e){} }
          } catch(e){}
        }, 250);
      } catch(e){ console.warn('[vimeo] cut failed', e); }

      // update internal state
      this.front = backKey;
      this._syncTitle(meta.title || '');
      // ensure mute state enforced (UI handles unmuting)
      try { if (backPlayer && typeof backPlayer.setVolume === 'function') backPlayer.setVolume(this._readMute() ? 0 : 1).catch(()=>{}); } catch(e){}
    }

    _syncTitle(t) { if (this.titleEl) this.titleEl.textContent = t || ''; }

    _animateAspectRatio(w, h, ms = ASPECT_RATIO_TRANSITION_MS) {
      try {
        const ratio = (w && h) ? (w / h) : (16/9);
        const wrap = this.container.querySelector('.gallery-player') || this.container;
        if (!wrap) return;
        // guard max height
        const parentWidth = wrap.clientWidth || wrap.getBoundingClientRect().width || 960;
        let newHeight = Math.min(MAX_PLAYER_HEIGHT_PX, Math.round(parentWidth / ratio));
        // apply CSS transition on aspect-ratio or height
        try {
          // prefer modern aspect-ratio
          wrap.style.transition = `aspect-ratio ${ms}ms ease`;
          wrap.style.aspectRatio = ratio.toString();
          // enforce max height via max-height css
          wrap.style.maxHeight = MAX_PLAYER_HEIGHT_PX + 'px';
        } catch(e) {
          // fallback: animate height
          const prevH = wrap.clientHeight;
          wrap.style.transition = `height ${ms}ms ease`;
          wrap.style.height = newHeight + 'px';
          setTimeout(()=> { wrap.style.transition = ''; }, ms + 30);
        }
        // ensure overlay fits
        const overlay = wrap.querySelector('.gallery-overlay') || this.container.querySelector('.gallery-overlay');
        if (overlay) overlay.style.height = '100%';
      } catch(e){ console.warn('[aspect] animate failed', e); }
    }

    async _adaptAspectRatioToCurrentVideo(ms = ASPECT_RATIO_TRANSITION_MS) {
      try {
        const p = this._getFrontPlayer();
        if (!p) return;
        const dims = await Promise.all([p.getVideoWidth(), p.getVideoHeight()]);
        const w = dims[0] || 16, h = dims[1] || 9;
        this._animateAspectRatio(w,h, ms);
      } catch(e){ console.warn('[aspect] adapt failed', e); }
    }

    _highlightGridItem(index) {
      try {
        const grid = document.getElementById('galleryGrid');
        if (!grid) return;
        grid.querySelectorAll('.is-current').forEach(el => el.classList.remove('is-current'));
        const item = grid.querySelector(`[data-index="${index}"]`);
        if (item) item.classList.add('is-current');
      } catch (e) {}
    }

    destroy() {
      this.clearAutoplay();
      try { if (this.players.A) { this.players.A.unload(); this.players.A = null; } } catch(e){}
      try { if (this.players.B) { this.players.B.unload(); this.players.B = null; } } catch(e){}
      if (this._overlayTimer) { clearTimeout(this._overlayTimer); this._overlayTimer = null; }
    }
  }

  /* ---------------- Grid population (filters + click behaviour) ---------------- */
  function getSelectedFiltersFromUI() {
    try {
      const catList = document.querySelector('#categoryList');
      if (!catList) return [];
      return Array.from(catList.querySelectorAll('button.active')).map(b => b.getAttribute('data-category')).filter(Boolean);
    } catch (e) { return []; }
  }

  function focusGridItem(container, index = 0) {
    if (!container) return;
    const items = Array.from(container.querySelectorAll('.grid-item'));
    if (!items.length) return;
    const idx = Math.max(0, Math.min(index, items.length - 1));
    items.forEach(it => it.classList.remove('is-current'));
    const target = items[idx];
    if (!target) return;
    target.classList.add('is-current');
    try { target.focus({ preventScroll: true }); } catch (e) { try { target.focus(); } catch (e) {} }
  }

  function populateGrid(container, categories = null) {
    container.innerHTML = '';
    const sel = Array.isArray(categories) ? categories.slice() : [];
    let items;
    if (!sel.length) items = Array.isArray(VIDEOS) ? VIDEOS.slice() : [];
    else items = Array.isArray(VIDEOS) ? VIDEOS.filter(v => normCategories(v).some(vc => sel.includes(vc))) : [];

    if (!items.length) {
      container.innerHTML = `<div style="padding:28px;color:var(--muted);text-align:center">Nessun video</div>`;
      return;
    }

    items.forEach((v, idx) => {
      const posterUrl = v.poster || (`media/posters/${v.id}.jpg`);
      const btn = create('button', { class: 'grid-item', type: 'button', dataset: { id: v.id, index: idx } });
      const previewUrl = v.preview || v.mp4 || v.src || '';
      btn.innerHTML = `
        <video data-preview="${previewUrl}" poster="${posterUrl}" preload="none" playsinline muted loop aria-hidden="true"></video>
        <div class="hover-overlay" aria-hidden="true"></div>
        <div class="preview-info"><strong>${escapeHtml(v.title || '')}</strong></div>
        <div class="preview-info"><small>${escapeHtml(v.desc || '')}</small></div>
      `;

      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const currentItems = (!sel.length) ? VIDEOS.slice() : VIDEOS.filter(vv => normCategories(vv).some(c => sel.includes(c)));
        const vidKey = v.id || v.vimeoId;
        const idxInSlides = currentItems.findIndex(s => (s.id || s.vimeoId) === vidKey);

        if (typeof window.galleryPlayer !== 'undefined' && window.galleryPlayer && idxInSlides >= 0) {
          window.galleryPlayer.isManual = true;
          window.galleryPlayer.playIndex(idxInSlides, { userTriggered: true, autoplay: true, forceResize: true });
        }

        focusGridItem(container, idx);

        // update URL hash
        const cats = Array.isArray(sel) && sel.length ? sel.join(',') : '';
        const params = new URLSearchParams();
        if (cats) params.set('cats', cats);
        params.set('video', vidKey);
        const newHash = params.toString();
        history.replaceState(null, '', location.pathname.replace(/\/+$/, '') + (newHash ? ('#' + newHash) : ''));

        try { saveSessionFilters(sel || []); saveSessionVideo(vidKey); } catch(e){}

        // scroll to player (desktop+mobile controlled via constants)
        if ((isMobileDevice() && SCROLL_TO_PLAYER_MOBILE) || (!isMobileDevice() && SCROLL_TO_PLAYER_DESKTOP)) {
          try {
            const playerWrap = document.querySelector('.gallery-player') || document.querySelector('#galleryCarouselSection .gallery-player');
            if (playerWrap && typeof playerWrap.scrollIntoView === 'function') {
              setTimeout(() => { playerWrap.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 80);
            }
          } catch(e){}
        }
      });

      btn.setAttribute('data-id', v.id || v.vimeoId);
      btn.setAttribute('data-index', idx);
      container.appendChild(btn);
    });
  }

  /* ---------------- Gallery init and routing ---------------- */
  let galleryPlayer = null;
  let homeCarousel = null;

  function parseGalleryHash() {
    const raw = (location.hash || '').replace(/^#/, '');
    if (!raw) return { categories: null, video: null };
    if (raw.includes('=')) {
      const params = new URLSearchParams(raw);
      const cats = params.get('cats') || params.get('categories') || params.get('category') || null;
      const video = params.get('video') || params.get('vid') || null;
      const catsArr = cats ? cats.split(',').map(s => decodeURIComponent(s).trim()).filter(Boolean) : null;
      return { categories: catsArr, video: video ? decodeURIComponent(video) : null };
    }
    if (raw.includes('/')) {
      const [catsPart, ...rest] = raw.split('/');
      const video = rest.join('/');
      const catsArr = catsPart.includes(',') ? catsPart.split(',').map(s => decodeURIComponent(s).trim()).filter(Boolean) : [decodeURIComponent(catsPart).trim()];
      return { categories: catsArr.filter(Boolean), video: decodeURIComponent(video || '').trim() || null };
    }
    const single = decodeURIComponent(raw);
    if (Array.isArray(VIDEOS) && VIDEOS.find(v => v.id === single || v.vimeoId === single)) return { categories: null, video: single };
    return { categories: [single], video: null };
  }

  function initHome(context = document) {
    const section = context.querySelector('#carouselSection');
    if (!section) return;
    let slides = Array.isArray(HOME_CAROUSEL) && HOME_CAROUSEL.length ? HOME_CAROUSEL.slice() : FEATURED_IDS.map(id => VIDEOS.find(v => v.id === id)).filter(Boolean);
    if (!slides.length) slides.push(...(Array.isArray(VIDEOS) ? VIDEOS.slice(0, Math.min(5, VIDEOS.length)) : []));
    homeCarousel = new HomeCarousel({ container: section, slides });
  }

  function initGallery(context = document) {
    const catList = context.querySelector('#categoryList');
    const galleryGrid = context.querySelector('#galleryGrid');
    const section = context.querySelector('#galleryCarouselSection');
    if (!catList || !galleryGrid || !section) return;

    const hashInfo = parseGalleryHash();

    // render categories as multi-select filters
    catList.innerHTML = '';
    CATEGORIES.forEach(category => {
      const li = create('li');
      const btn = create('button', { 'aria-pressed': 'false', 'data-category': category }, category);
      btn.classList.add('category-item');
      btn.setAttribute('role','button');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = btn.classList.toggle('active');
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        const selected = Array.from(catList.querySelectorAll('button.active')).map(b => b.getAttribute('data-category')).filter(Boolean);
        try { saveSessionFilters(selected); saveSessionVideo(''); } catch(e){}
        const newHash = selected.length ? (`#${new URLSearchParams({cats: selected.join(',')}).toString()}`) : '';
        history.replaceState(null, '', location.pathname.replace(/\/+$/, '') + newHash);
        populateGrid(galleryGrid, selected);
        // update player slides
        try {
          const newSlides = (selected && selected.length) ? VIDEOS.filter(v => normCategories(v).some(c => selected.includes(c))) : VIDEOS.slice();
          if (galleryPlayer) {
            galleryPlayer.setSlides(newSlides);
            const oldId = (galleryPlayer.slides && galleryPlayer.slides[galleryPlayer.currentIndex]) ? (galleryPlayer.slides[galleryPlayer.currentIndex].id || galleryPlayer.slides[galleryPlayer.currentIndex].vimeoId) : null;
            let idx = -1;
            if (oldId) idx = newSlides.findIndex(s => (s.id || s.vimeoId) === oldId);
            if (idx >= 0) galleryPlayer.playIndex(idx, { autoplay: true });
            else if (newSlides.length) galleryPlayer.playIndex(0, { autoplay: true });
          } else {
            galleryPlayer = new GalleryPlayer({ container: section, slides: newSlides });
            window.galleryPlayer = galleryPlayer;
            galleryPlayer.playIndex(0, { autoplay: true });
            galleryPlayer.updateMuteButton && galleryPlayer.updateMuteButton();
          }
        } catch(e){ console.warn('[gallery] sync player error', e); }
      });
      li.appendChild(btn);
      catList.appendChild(li);
    });

    // initial filters logic: session or hash
    const sessionFilters = readSessionFilters();
    let initialFilters = [];
    if (!location.hash || location.hash === '#') {
      initialFilters = [];
      try { saveSessionFilters([]); } catch(e){}
    } else if (hashInfo.categories && Array.isArray(hashInfo.categories) && hashInfo.categories.length) {
      const matched = hashInfo.categories.map(h => {
        const exact = CATEGORIES.find(c => c === h);
        if (exact) return exact;
        const found = CATEGORIES.find(c => c.toLowerCase() === (h||'').toLowerCase());
        return found || null;
      }).filter(Boolean);
      initialFilters = matched.length ? matched : [];
    } else if (sessionFilters && sessionFilters.length) {
      initialFilters = sessionFilters.filter(f => CATEGORIES.includes(f));
    } else {
      initialFilters = [];
    }

    // set initial active
    try {
      catList.querySelectorAll('button').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
      if (initialFilters && initialFilters.length) {
        initialFilters.forEach(cat => {
          const b = catList.querySelector(`button[data-category="${cat}"]`);
          if (b) { b.classList.add('active'); b.setAttribute('aria-pressed','true'); }
        });
      }
    } catch(e){}

    populateGrid(galleryGrid, initialFilters);
    const slidesForPlayer = (initialFilters && initialFilters.length) ? VIDEOS.filter(v => normCategories(v).some(c => initialFilters.includes(c))) : VIDEOS.slice();

    // create or update galleryPlayer
    if (!galleryPlayer) {
      galleryPlayer = new GalleryPlayer({ container: section, slides: slidesForPlayer });
      window.galleryPlayer = galleryPlayer;
      if (hashInfo.video) {
        const vidMeta = VIDEOS.find(v => (v.id === hashInfo.video) || (v.vimeoId === hashInfo.video));
        if (vidMeta) {
          const belongs = (!initialFilters || initialFilters.length === 0) ? true : normCategories(vidMeta).some(c => initialFilters.includes(c));
          if (!belongs) {
            const cat = (normCategories(vidMeta)[0]) || null;
            if (cat) {
              catList.querySelectorAll('button').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
              const b = catList.querySelector(`button[data-category="${cat}"]`);
              if (b) { b.classList.add('active'); b.setAttribute('aria-pressed','true'); }
              populateGrid(galleryGrid, [cat]);
              galleryPlayer.setSlides(VIDEOS.filter(v=> normCategories(v).some(cc => cc===cat)));
            }
          }
          setTimeout(() => {
            const slides = galleryPlayer.slides || [];
            const idx = slides.findIndex(s => (s.id || s.vimeoId) === (vidMeta.id || vidMeta.vimeoId));
            if (idx >= 0) galleryPlayer.playIndex(idx, { userTriggered: true, autoplay: false, forceResize: true });
          }, 120);
        }
      } else {
        setTimeout(() => {
          try { if (slidesForPlayer && slidesForPlayer.length) galleryPlayer.playIndex(0, { autoplay: true }); } catch(e){}
        }, 150);
      }
      galleryPlayer.updateMuteButton && galleryPlayer.updateMuteButton();
    } else {
      galleryPlayer.setSlides(slidesForPlayer);
      galleryPlayer.updateMuteButton && galleryPlayer.updateMuteButton();
    }

    setTimeout(() => {
      const btnToFocus = catList.querySelector('button.active') || catList.querySelector('button');
      if (btnToFocus) try { btnToFocus.focus({ preventScroll: true }); } catch(e){ btnToFocus.focus(); }
    }, 40);
  }

  /* ---------------- RUN / BARBA ---------------- */
  function runInits(context = document) {
    initMenu(context);
    if (context.querySelector && context.querySelector('#carouselSection')) initHome(context);
    if (context.querySelector && context.querySelector('#galleryCarouselSection')) initGallery(context);
    if (context.querySelector && context.querySelector('.facts')) initAbout && initAbout(context);
  }

  function initBarbaSafe(runInitial) {
    if (!window.barba) { runInitial(document); return; }
    try {
      barba.init({
        sync: true,
        transitions: [{
          async leave(data) {
            try { /* pause all media */ } catch (e) {}
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
    } catch (e) { runInitial(document); }
  }

  /* ---------------- START ---------------- */
  function start() {
    if (window.__APP_INITIALIZED__) return;
    window.__APP_INITIALIZED__ = true;
    initBarbaSafe(runInits);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  log('main.js ready — Vimeo-only gallery & home carousel; aspect-ratio adapts on manual interaction; hash/grid sync; scroll options.');
})();
