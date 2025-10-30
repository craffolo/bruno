// js/main.js
(() => {
  /* ---------------- CONFIG / TIMINGS ---------------- */
  const GALLERY_AUTOPLAY_INTERVAL_MS = 5000; // autoplay gallery player (usato se non manuale)
  const MOUSE_IDLE_MS = 2000; // per gallery overlay
  const MOBILE_OVERLAY_TIMEOUT_MS = 2000
  const USE_OWN_OVERLAY = true;


  /* ---------------- DATA (esempio) ---------------- */
  const HOME_CAROUSEL = (typeof window !== 'undefined' && window.HOME_CAROUSEL) ? window.HOME_CAROUSEL : [
    { 
      id: 'cast_neve_carousel', 
      hls: 'media/home/cast_neve_carousel/index.m3u8', 
      mp4: 'media/home/cast_neve_carousel.mp4', 
      title: 'Neve', 
      desc: 'Cast', 
      category: 'Music videos' , 
      galleryId: '' 
    },
    { 
      id: 'alici_di_menaica_carousel', 
      hls: 'media/home/alici_di_menaica_carousel/index.m3u8', 
      mp4: 'media/home/alici_di_menaica_carousel.mp4', 
      title: 'Alici di Menaica', 
      category: 'Documentaries', 
      galleryId: '' 
    },
    { 
      id: 'casa_marrazzo_festa_di_fine_campagna_carousel', 
      hls: 'media/home/cm_festa_fine_campagna_carousel/index.m3u8',  
      title: 'Festa di Fine Campagna', 
      category: 'Documentaries' , 
      galleryId: 'casa_marrazzo_festa_di_fine_campagna' 
    },
    { 
      id: 'sevdaliza_human_carousel', 
      hls: 'media/home/human_carousel/index.m3u8', 
      mp4: 'media/home/human_carousel.mp4', 
      title: 'Human', 
      category: 'Music Videos' , 
      galleryId: 'sevdaliza_human' 
    },
    { 
      id: 'il_compito_carousel', 
      hls: 'media/home/il_compito_carousel/index.m3u8',  
      title: 'Il Compito', 
      category: '' , 
      galleryId: '' 
    },
    { 
      id: 'antonia_klugmann_la_quinta_stagione_carousel', 
      hls: 'media/home/la_quinta_stagione_carousel/index.m3u8',  
      title: 'La Quinta Stagione', 
      category: 'Food' , 
      galleryId: 'antonia_klugmann_la_quinta_stagione' 
    },
    { 
      id: 'partenope_fashion_film_carousel', 
      hls: 'media/home/partenope_carousel/index.m3u8',  
      title: 'Partenope', 
      category: 'Fashion' , 
      galleryId: 'partenope_fashion_film' 
    },
    { 
      id: 'cast_ride_or_die_carousel', 
      hls: 'media/home/ride_or_die_carousel/index.m3u8',  
      title: 'Ride or Die', 
      category: 'Music videos' , 
      galleryId: 'cast_ride_or_die' 
    },
    { 
      id: 'sinestesie_carousel', 
      hls: 'media/home/sinestesie_carousel/index.m3u8',  
      title: 'Sinestesie', 
      category: 'Music videos' , 
      galleryId: 'sinestesie' 
    },        
    { 
      id: 'spot_notaio_carousel', 
      hls: 'media/home/spot_notaio_carousel/index.m3u8',  
      title: "Studio Notarile D'Ausilio", 
      category: 'Commercials' , 
      galleryId: 'studio_notarile_dausilio' 
    },
    { 
      id: 'varnelli_cocktail_carousel', 
      hls: 'media/home/varnelli_carousel/index.m3u8',  
      title: 'Varnelli di Fine Campagna', 
      category: 'Food' , 
      galleryId: 'varnelli_cocktail' 
    },        
    { 
      id: 'waldeinsamkeit_carousel', 
      hls: 'media/home/waldeinsamkeit_carousel/index.m3u8',  
      title: 'Waldeinsamkeit', 
      category: 'Narratives' , 
      galleryId: 'waldeinsamkeit' 
    },
    
  ];
  const FEATURED_IDS = [];
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
  const CATEGORIES = ['Music videos', 'Commercials', 'Documentaries', 'Food', 'Fashion', 'Narratives', 'Fitness', 'Social', 'Corporate', 'Real estate',];

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

  function pauseAll(scope = document) {
    $$('video', scope).forEach(v => { try { v.pause(); } catch (e) {} });
  }

  /* persistent mute preference */
  const MUTE_KEY = 'site_mute_pref';
  function readMute() { try { return localStorage.getItem(MUTE_KEY) === '1'; } catch (e) { return false; } }
  function writeMute(v) { try { localStorage.setItem(MUTE_KEY, v ? '1' : '0'); } catch (e) {} }

  /* HLS management (centralized) */
  const _hlsMap = new Map();
  function _hlsKeyFor(el) {
    if (!el) return null;
    if (!el.dataset._hlsKey) el.dataset._hlsKey = `hls_${Math.random().toString(36).slice(2,9)}`;
    return el.dataset._hlsKey;
  }
  function destroyHlsForEl(el) {
    try {
      const k = _hlsKeyFor(el);
      if (k && _hlsMap.has(k)) {
        const inst = _hlsMap.get(k);
        try { inst.destroy(); } catch (e) {}
        _hlsMap.delete(k);
      }
    } catch (e) {}
  }
  function attachSource(videoEl, url) {
    return new Promise((resolve) => {
      if (!videoEl) return resolve();
      destroyHlsForEl(videoEl);
      if (!url || typeof url !== 'string') return resolve();
      const isManifest = url.trim().toLowerCase().endsWith('.m3u8');
      const key = _hlsKeyFor(videoEl);

      if (isManifest && window.Hls && Hls.isSupported()) {
        try {
          const hlsCfg = { enableWorker: !isMobileDevice(), xhrSetup: (xhr, url) => {} };
          const hls = new Hls(hlsCfg);
          hls.on(Hls.Events.ERROR, (event, data) => {
            const { type, details, fatal } = data || {};
            console.warn('[HLS] error', type, details, fatal);
            if (fatal) {
              try { if (hls && typeof hls.recoverMediaError === 'function') { hls.recoverMediaError(); return; } } catch(e){}
              try { const key = _hlsKeyFor(videoEl); if (key && _hlsMap.has(key)) { try { hls.destroy(); } catch(e){} _hlsMap.delete(key); } } catch(e){}
            }
          });
          hls.attachMedia(videoEl);
          hls.on(Hls.Events.MEDIA_ATTACHED, () => { try { hls.loadSource(url); } catch (e) {} });
          _hlsMap.set(key, hls);
        } catch (e) { try { videoEl.removeAttribute('src'); videoEl.src = url; videoEl.load(); } catch (e) {} }
      } else {
        try { videoEl.removeAttribute('src'); videoEl.src = url; videoEl.load(); } catch (e) {}
      }

      const onCan = () => { try { videoEl.removeEventListener('canplay', onCan); } catch (e) {} ; resolve(); };
      if (videoEl.readyState >= 3) return resolve();
      videoEl.addEventListener('canplay', onCan);
      setTimeout(() => { try { videoEl.removeEventListener('canplay', onCan); } catch(e){}; resolve(); }, 4000);
    });
  }

  async function safePlay(videoEl) {
    if (!videoEl) return false;
    try {
      await videoEl.play();
      return true;
    } catch (err) {
      try {
        videoEl.muted = true;
        await videoEl.play();
        return true;
      } catch (err2) {
        console.warn('[safePlay] play failed even after mute', err2);
        return false;
      }
    }
  }

  // Helper: assicurati che l'entry abbia .categories come array
  function normCategories(video) {
    if (!video) return [];
    if (Array.isArray(video.categories)) return video.categories;
    if (video.category && typeof video.category === 'string') return [video.category];
    return [];
  }


  /* ---------------- preview helpers ---------------- */
  const _activePreviews = new Set();
  function stopPreview(vid) {
    if (!vid) return;
    try {
      vid.pause();
      if (vid.getAttribute('src')) {
        vid.removeAttribute('src');
        if (typeof vid.load === 'function') vid.load();
      }
      vid.currentTime = 0;
    } catch (e) {}
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

  /* focus helper */
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

  /* ---------------- URL / routing helpers ---------------- */
  function parseGalleryHash() {
    // New: support cats=Cat1,Cat2 and video=ID, or old formats
    const raw = (location.hash || '').replace(/^#/, '');
    if (!raw) return { categories: null, video: null };
    // 1) query-style: cats=...&video=...
    if (raw.includes('=')) {
      const params = new URLSearchParams(raw);
      const cats = params.get('cats') || params.get('categories') || params.get('category') || null;
      const video = params.get('video') || params.get('vid') || null;
      const catsArr = cats ? cats.split(',').map(s => decodeURIComponent(s).trim()).filter(Boolean) : null;
      return { categories: catsArr, video: video ? decodeURIComponent(video) : null };
    }
    // 2) slash format: "Cat1,Cat2/VideoId" or "Category/VideoId" or "Category"
    if (raw.includes('/')) {
      const [catsPart, ...rest] = raw.split('/');
      const video = rest.join('/');
      // catsPart could be "Cat1,Cat2" or a single Category
      const catsArr = catsPart.includes(',') ? catsPart.split(',').map(s => decodeURIComponent(s).trim()).filter(Boolean) : [decodeURIComponent(catsPart).trim()];
      return { categories: catsArr.filter(Boolean), video: decodeURIComponent(video || '').trim() || null };
    }
    // 3) single token: could be a video id or a single category
    const single = decodeURIComponent(raw);
    if (Array.isArray(VIDEOS) && VIDEOS.find(v => v.id === single)) return { categories: null, video: single };
    // otherwise treat as single category
    return { categories: [single], video: null };
  }

  function isMobileDevice() {
    return ('ontouchstart' in window) && /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
  }

  /* ---------------- session helpers (to preserve filters) ---------------- */
  const SESSION_FILTERS_KEY = 'gallery_last_filters';
  const SESSION_VIDEO_KEY = 'gallery_last_video';
  function saveSessionFilters(arr) { try { sessionStorage.setItem(SESSION_FILTERS_KEY, (Array.isArray(arr) ? arr.join(',') : (arr || ''))); } catch(e){} }
  function readSessionFilters() { try { const v = sessionStorage.getItem(SESSION_FILTERS_KEY); return v ? v.split(',').map(s=>s.trim()).filter(Boolean) : null; } catch(e){ return null; } }
  function saveSessionVideo(vid) { try { sessionStorage.setItem(SESSION_VIDEO_KEY, vid || ''); } catch(e){} }
  function readSessionVideo() { try { return sessionStorage.getItem(SESSION_VIDEO_KEY) || null; } catch(e){ return null; } }

  /* ---------------- Menu ---------------- */
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

  /* ---------------- HomeCarousel (cut, HLS enabled) ---------------- */
  class HomeCarousel {
    constructor(opts) {
      this.container = opts.container;
      this.slides = opts.slides || [];
      this.layerA = this.container.querySelector('.layer-a');
      this.layerB = this.container.querySelector('.layer-b');
      this.bottomOverlay = this.container.querySelector('.home-carousel-bottom') || null;
      this.active = 'A';
      this.index = 0;
      this.timer = null;

      if (!this.container || !this.layerA || !this.layerB) return;
      [this.layerA, this.layerB].forEach(v => {
        v.playsInline = true;
        v.muted = true;
        v.loop = false;
        v.preload = 'auto';
        v.classList.remove('active','inactive');
      });
      this.layerA.classList.add('active');
      this.layerB.classList.add('inactive');

      if (!this.bottomOverlay) {
        this.bottomOverlay = create('div', { class: 'home-carousel-bottom' }, '');
        this.container.appendChild(this.bottomOverlay);
      }
      this._renderOverlay('', '');

      if (!this.slides.length && Array.isArray(VIDEOS) && VIDEOS.length) {
        this.slides = VIDEOS.slice(0, Math.min(5, VIDEOS.length));
      }
      if (this.slides.length) this._loadInitial();
      // home advances WHEN video ends (listen to ended)
      this.layerA.addEventListener('ended', () => this._advanceOnEnd());
      this.layerB.addEventListener('ended', () => this._advanceOnEnd());

      // overlay click -> navigate to gallery + category/video hash
      this.bottomOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
        const meta = this.slides[this.index];
        if (!meta) return;
        const targetHash = meta.galleryId ? `#${encodeURIComponent(meta.category || '')}/${encodeURIComponent(meta.galleryId)}` : `#${encodeURIComponent(meta.category || '')}`;
        // navigate to gallery route — let router / caddy handle pretty urls
        location.href = '/gallery' + targetHash;
      });
    }

    async _loadInitial() {
      const meta = this.slides[this.index];
      if (!meta) return;
      const url = meta.hls || meta.mp4 || meta.src || '';
      try { this.layerA.muted = true; } catch (e) {}
      await attachSource(this.layerA, url);
      try { this.layerA.play().catch(()=>{}); } catch(e){}
      this._renderOverlay(meta.title || '', meta.desc || '');
    }

    _renderOverlay(title = '', desc = '') {
      this.bottomOverlay.innerHTML = `
        <div class="hc-meta">
          <div class="hc-title">${escapeHtml(title || '')}</div>
          ${ desc ? `<div class="hc-desc">${escapeHtml(desc)}</div>` : '' }
        </div>
      `;
    }

    async _advanceOnEnd() {
      if (!this.slides.length) return;
      const nextIndex = (this.index + 1) % this.slides.length;
      const meta = this.slides[nextIndex];
      if (!meta) return;
      const active = this.active === 'A' ? this.layerA : this.layerB;
      const inactive = this.active === 'A' ? this.layerB : this.layerA;
      const url = meta.hls || meta.mp4 || meta.src || '';
      await attachSource(inactive, url);
      try { inactive.currentTime = 0; inactive.muted = true; inactive.play().catch(()=>{}); } catch(e){}
      try { active.pause(); active.currentTime = 0; } catch(e){}
      active.classList.remove('active'); active.classList.add('inactive');
      inactive.classList.remove('inactive'); inactive.classList.add('active');
      this.active = this.active === 'A' ? 'B' : 'A';
      this.index = nextIndex;
      this._renderOverlay(meta.title || '', meta.desc || '');
      // prefetch next
      const nxt2 = (this.index + 1) % this.slides.length;
      const preUrl = (this.slides[nxt2] && (this.slides[nxt2].hls || this.slides[nxt2].mp4 || this.slides[nxt2].src)) || '';
      const preLayer = (this.active === 'A') ? this.layerB : this.layerA;
      setTimeout(()=> { attachSource(preLayer, preUrl).catch(()=>{}); }, 600);
    }

    destroy() {
      try { this.layerA.pause(); this.layerB.pause(); } catch(e){}
      destroyHlsForEl(this.layerA);
      destroyHlsForEl(this.layerB);
    }
  }

  /* ---------------- GalleryPlayer (Vimeo-aware, fallback HLS/video) ---------------- */
  class GalleryPlayer {
    constructor(opts) {
      this.container = opts.container;
      // prefer iframe elements (Vimeo), fallback to video elements
      this.iframeA = this.container.querySelector('.gallery-iframe.layer-a');
      this.iframeB = this.container.querySelector('.gallery-iframe.layer-b');
      this.layerA = this.iframeA ? null : this.container.querySelector('.gallery-video.layer-a');
      this.layerB = this.iframeB ? null : this.container.querySelector('.gallery-video.layer-b');

      // Title / controls
      this.titleEl = this.container.querySelector('#galleryTitle');
      this.prevBtn = this.container.querySelector('#gPrevBtn');
      this.nextBtn = this.container.querySelector('#gNextBtn');
      this.progressBar = this.container.querySelector('.progress-bar');
      this.progressBuffer = this.container.querySelector('.progress-buffer');
      this.progressWrap = this.container.querySelector('.progress-wrap');
      this.playOverlay = this.container.querySelector('.play-overlay');
      this.topOverlay = this.container.querySelector('.top-overlay');
      this.bottomOverlay = this.container.querySelector('.bottom-overlay');
      this.topMuteBtn = this.container.querySelector('.top-overlay .mute-btn');
      this.topFsBtn = this.container.querySelector('.top-overlay .fs-btn');
      this.galleryOverlay = this.container.querySelector('.gallery-overlay');

      // slides + state
      this.slides = opts.slides || [];
      this.currentIndex = 0;
      this.front = 'A'; // 'A' or 'B'
      this.players = { A: null, B: null }; // for Vimeo.Player instances
      this.autoplayTimer = null;
      this.isManual = false;

      // internal
      this._boundOnInteraction = this._onUserInteraction.bind(this);
      this._rafId = null;
      this._pauseTimeoutId = null;
      this._overlayTimer = null;
      this._overlayVisible = false;
      this._onMouseMoveBound = this._onMouseMove.bind(this);
      this._onTouchTapBound = this._onTouchTap.bind(this);
      this._domMode = this.iframeA || this.iframeB ? 'iframe' : 'video'; // which DOM mode we are in

      // init
      this._ensureElements();
      this._wireTopControls();
      this._wireControls();
      this._bindClickToToggle();
      this._bindProgressInteractions();
      this._ensureUnifiedOverlay();
      this._showGalleryOverlayTransient();

      // pointer handlers for overlay
      const gpArea = this.container.querySelector('.gallery-player') || this.container;
      if (gpArea) {
        gpArea.addEventListener('pointermove', this._onMouseMoveBound, { passive: true });
        gpArea.addEventListener('pointerenter', this._onMouseMoveBound, { passive: true });
        gpArea.addEventListener('pointerleave', () => { this._startOverlayHideTimer(); });
        gpArea.addEventListener('touchend', this._onTouchTapBound, { passive: true });
      }
    }

    /* ---------------- element helpers ---------------- */
    _ensureElements() {
      // ensure both layers exist as either iframe or video; if not, create placeholders (non-invasive)
      if (this._domMode === 'iframe') {
        if (!this.iframeA || !this.iframeB) {
          // if missing, fallback to video mode
          this._domMode = 'video';
          this.layerA = this.layerA || this.container.querySelector('.gallery-video.layer-a');
          this.layerB = this.layerB || this.container.querySelector('.gallery-video.layer-b');
        } else {
          // style
          [this.iframeA, this.iframeB].forEach(ifr => {
            if (!ifr) return;
            ifr.style.position = 'absolute';
            ifr.style.inset = '0';
            ifr.style.width = '100%';
            ifr.style.height = '100%';
            ifr.style.border = '0';
            ifr.style.objectFit = 'cover';
            ifr.style.opacity = '0';
            ifr.style.zIndex = '2';
            ifr.loading = 'lazy';
          });
          // make A visible by default
          if (this.iframeA) { this.iframeA.style.zIndex = 3; this.iframeA.style.opacity = '1'; }
          if (this.iframeB) { this.iframeB.style.zIndex = 2; this.iframeB.style.opacity = '0'; }
        }
      }
      if (this._domMode === 'video') {
        // ensure video layers exist
        this.layerA = this.layerA || this.container.querySelector('.gallery-video.layer-a');
        this.layerB = this.layerB || this.container.querySelector('.gallery-video.layer-b');
        if (this.layerA) { this.layerA.preload = 'metadata'; this.layerA.style.zIndex = 3; this.layerA.style.opacity = '1'; }
        if (this.layerB) { this.layerB.preload = 'metadata'; this.layerB.style.zIndex = 2; this.layerB.style.opacity = '0'; }
      }
    }

    /* ---------------- overlay / controls (unchanged behaviour) ---------------- */
    _ensureUnifiedOverlay() {
      if (!this.galleryOverlay) {
        this.galleryOverlay = create('div', { class: 'gallery-overlay' }, '');
        const top = this.container.querySelector('.top-overlay');
        const play = this.container.querySelector('.play-overlay');
        const bottom = this.container.querySelector('.bottom-overlay') || this.container.querySelector('.carousel-bottom');
        const bar = this.container.querySelector('.progress-wrap');
        if (top) this.galleryOverlay.appendChild(top);
        if (play) this.galleryOverlay.appendChild(play);
        if (bottom) this.galleryOverlay.appendChild(bottom);
        if (bar) this.galleryOverlay.appendChild(bar);
        this.container.appendChild(this.galleryOverlay);
      }
      this.galleryOverlay.querySelectorAll('.top-btn, .mute-btn, .fs-btn, .control-btn, .progress-wrap').forEach(el => {
        el.style.pointerEvents = 'auto';
      });
    }

    _showGalleryOverlayTransient() {
      this._showGalleryOverlay();
      this._startOverlayHideTimer();
    }
    _showGalleryOverlay() {
      if (!this.galleryOverlay) return;
      this.galleryOverlay.classList.add('visible');
      this.galleryOverlay.classList.remove('hidden');
      this._overlayVisible = true;
      if (this.playOverlay) this.playOverlay.style.opacity = '1';
      if (this.topOverlay) this.topOverlay.style.opacity = '1';
      if (this.bottomOverlay) this.bottomOverlay.style.opacity = '1';
    }
    _hideGalleryOverlay() {
      if (!this.galleryOverlay) return;
      this.galleryOverlay.classList.remove('visible'); this.galleryOverlay.classList.add('hidden');
      this._overlayVisible = false;
      if (this.playOverlay) this.playOverlay.style.opacity = '0';
      if (this.topOverlay) this.topOverlay.style.opacity = '0';
      if (this.bottomOverlay) this.bottomOverlay.style.opacity = '0';
    }
    _startOverlayHideTimer(timeout = MOUSE_IDLE_MS) {
      if (this._overlayTimer) { clearTimeout(this._overlayTimer); this._overlayTimer = null; }
      const useTimeout = isMobileDevice() ? MOBILE_OVERLAY_TIMEOUT_MS : timeout;
      this._overlayTimer = setTimeout(()=> { this._hideGalleryOverlay(); this._overlayTimer = null; }, useTimeout);
    }
    _onMouseMove() { this._showGalleryOverlay(); if (this._overlayTimer) { clearTimeout(this._overlayTimer); this._overlayTimer = null; } this._startOverlayHideTimer(); }
    _onTouchTap(ev) {
      if (!isMobileDevice()) {
        ev.preventDefault(); ev.stopPropagation();
        if (this._overlayVisible) this._hideGalleryOverlay(); else { this._showGalleryOverlay(); this._startOverlayHideTimer(); }
      }
    }

    _wireTopControls() {
      if (this.topMuteBtn) {
        this.updateMuteButton();
        this.topMuteBtn.addEventListener('click', (e) => {
          e.stopPropagation(); e.preventDefault();
          const newVal = !readMute();
          writeMute(newVal);
          this.updateMuteButton();
          // apply to current player if Vimeo
          try {
            const p = this._getFrontPlayer();
            if (p && typeof p.setVolume === 'function') p.setVolume(newVal ? 0 : 1).catch(()=>{});
          } catch(e){}
        });
      }
      if (this.topFsBtn) {
        this.topFsBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          // attempt to request fullscreen on front element
          try {
            const frontEl = (this._domMode === 'iframe') ? this._getFrontIframe() : this._getFrontLayer();
            if (frontEl && frontEl.requestFullscreen) frontEl.requestFullscreen().catch(()=>{});
          } catch(e){}
          this.updateFullscreenButton();
        });
      }
      ['fullscreenchange','webkitfullscreenchange','mozfullscreenchange','MSFullscreenChange'].forEach(ev => document.addEventListener(ev, ()=> this.updateFullscreenButton()));
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

    _onUserInteraction() {
      if (!this.isManual) {
        this.isManual = true;
        this.clearAutoplay();
        log('[gallery] user interaction -> manual mode');
      }
    }

    clearAutoplay() { if (this.autoplayTimer) { clearInterval(this.autoplayTimer); this.autoplayTimer = null; } }
    resetAutoplay() {
      this.clearAutoplay();
      if (this.isManual) return;
      // rely on 'ended' events; fallback interval
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

    /* ---------------- compatibility helpers ---------------- */
    _getFrontIframe() { return this.iframeA && this.iframeB ? ((this.front === 'A') ? this.iframeA : this.iframeB) : null; }
    _getBackIframe()  { return this.iframeA && this.iframeB ? ((this.front === 'A') ? this.iframeB : this.iframeA) : null; }
    _getFrontLayer()  { return this.layerA && this.layerB ? ((this.front === 'A') ? this.layerA : this.layerB) : null; }
    _getBackLayer()   { return this.layerA && this.layerB ? ((this.front === 'A') ? this.layerB : this.layerA) : null; }
    _getFrontPlayer() { return (this.front === 'A') ? this.players.A : this.players.B; }
    _getBackPlayer()  { return (this.front === 'A') ? this.players.B : this.players.A; }

    /* ---------------- core: playIndex (Vimeo if vimeoId present, else HLS/video fallback) ---------------- */
    async playIndex(i, opts = {}) {
      if (!this.slides || !this.slides.length) return;
      i = (i + this.slides.length) % this.slides.length;
      const meta = this.slides[i];
      if (!meta) return;
      if (opts.userTriggered) this._onUserInteraction();

      // If slide indicates a Vimeo source -> use Vimeo flow
      if (meta.vimeoId || meta.iframe || meta.embedUrl) {
        if (this._domMode !== 'iframe') {
          // switch to iframe mode if possible
          this._domMode = 'iframe';
          this.iframeA = this.iframeA || this.container.querySelector('.gallery-iframe.layer-a');
          this.iframeB = this.iframeB || this.container.querySelector('.gallery-iframe.layer-b');
          this._ensureElements();
        }
        await this._playIndexVimeo(i, meta, opts);
        this.currentIndex = i;
        this.resetAutoplay();
        return;
      }

      // FALLBACK: legacy video/HLS flow (uses attachSource + safePlay)
      const backLayer = this._getBackLayer();
      const frontLayer = this._getFrontLayer();
      try { backLayer.pause(); } catch(e) {}
      try { destroyHlsForEl(backLayer); backLayer.removeAttribute('src'); } catch(e) {}

      const sourceUrl = meta.hls || meta.mp4 || meta.src || '';
      try { await attachSource(backLayer, sourceUrl); } catch(e) { console.warn('[gallery] attachSource failed', e); }

      const muted = readMute();
      if (backLayer) backLayer.muted = !!muted;
      if (frontLayer) frontLayer.muted = !!muted;

      try { backLayer.currentTime = 0; } catch(e){}
      const playOk = await safePlay(backLayer);
      if (!playOk) {
        console.warn('[gallery] safePlay failed for backLayer, aborting direct cut');
        this.currentIndex = i;
        this._syncTitle(meta.title);
        try { saveSessionVideo(meta.id); } catch(e){}
        return;
      }

      // direct cut (video)
      try {
        backLayer.style.zIndex = 3; frontLayer.style.zIndex = 2;
        backLayer.style.transition = 'none'; if (frontLayer) frontLayer.style.transition = 'none';
        backLayer.style.opacity = '1'; if (frontLayer) frontLayer.style.opacity = '0';
        try { if (frontLayer) { frontLayer.pause(); frontLayer.currentTime = 0; } } catch(e){}
        this.front = (this.front === 'A') ? 'B' : 'A';
        this._onAfterPlaySwitch(i, meta);
      } catch (e) {
        console.warn('[gallery] video direct cut fallback', e);
        try { if (frontLayer) { frontLayer.pause(); frontLayer.currentTime = 0; } } catch(e){}
        this.front = (this.front === 'A') ? 'B' : 'A';
        this._onAfterPlaySwitch(i, meta);
      }

      this.currentIndex = i;
      this.resetAutoplay();
      this._startProgressLoop();
      try { saveSessionVideo(meta.id); } catch(e){}
    }

    /* ---------------- Vimeo-specific play (preload back iframe -> ready -> cut) ---------------- */
    async _playIndexVimeo(i, meta, opts = {}) {
      if (!window.Vimeo || typeof window.Vimeo.Player !== 'function') {
        console.warn('[vimeo] Player API not found. Make sure <script src="https://player.vimeo.com/api/player.js"></script> is loaded before main.js');
        return;
      }

      const backIframe = this._getBackIframe();
      const frontIframe = this._getFrontIframe();
      const backKey = (this.front === 'A') ? 'B' : 'A';
      const frontKey = this.front;

      // unload previous back player if any
      try {
        if (this.players[backKey]) { try { await this.players[backKey].unload(); } catch(e){} this.players[backKey] = null; }
      } catch(e){}

      // construct url
      const base = meta.iframe ? meta.iframe : (`https://player.vimeo.com/video/${encodeURIComponent(meta.vimeoId)}`);
      const params = {
        autoplay: (opts.autoplay === false) ? '0' : '1',
        muted: readMute() ? '1' : '0',
        playsinline: '1'
      };

      if (USE_OWN_OVERLAY) {
        params.title = '0';
        params.byline = '0';
        params.portrait = '0';
        params.controls = '0'; // rimuove controlli nativi (noi useremo API)
      } else {

      }

      const qs = new URLSearchParams(params).toString();
      const url = base + (base.includes('?') ? '&' + qs : '?' + qs);

      try {
        backIframe.src = url;
        backIframe.style.opacity = '0';
        backIframe.style.zIndex = 4;
      } catch(e){ console.warn('[vimeo] set src failed', e); }

      if (USE_OWN_OVERLAY) {
        backIframe.style.pointerEvents = 'none';
        // anche frontIframe
        if (frontIframe) frontIframe.style.pointerEvents = 'none';
      } else {
        backIframe.style.pointerEvents = ''; // default
        if (frontIframe) frontIframe.style.pointerEvents = '';
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

      // wait until ready/loaded
      const waitReady = async (p, timeout = 7000) => {
        if (!p) return false;
        try { await p.ready(); } catch(e){}
        return new Promise(res => {
          let done = false;
          const finish = (ok) => { if (done) return; done = true; res(!!ok); };
          const to = setTimeout(() => finish(false), timeout);
          try {
            p.once('loaded', () => { clearTimeout(to); finish(true); });
            // fallback: treat ready as enough after short delay
            setTimeout(() => { if (!done) { clearTimeout(to); finish(true); } }, 450);
          } catch(e){ clearTimeout(to); finish(false); }
        });
      };

      const ready = await waitReady(backPlayer).catch(()=>false);
      if (!ready) console.warn('[vimeo] back player not confirmed ready (timeout)');

      // get aspect ratio
      try {
        // se l'API espone getVideoHeight/getVideoWidth
        Promise.all([
          backPlayer.getVideoWidth ? backPlayer.getVideoWidth() : Promise.resolve(null),
          backPlayer.getVideoHeight ? backPlayer.getVideoHeight() : Promise.resolve(null)
        ]).then(([w,h]) => {
          if (w && h) {
            const wrap = this.container.querySelector('.gallery-player') || this.container;
            // usa aspect-ratio CSS (browser moderni)
            if ('aspectRatio' in document.documentElement.style || 'aspect-ratio' in document.documentElement.style) {
              try {
                wrap.style.aspectRatio = (w / h).toString();
                // assicurati che wrap non abbia height fissa, usa width:100% e aspect-ratio
                wrap.style.width = '100%';
                // rimuovi eventuali altezza forzate
                wrap.style.height = '';
              } catch (e) {}
            } else {
              // fallback: calcola height in px based on container width
              const parentWidth = wrap.clientWidth || wrap.offsetWidth || wrap.getBoundingClientRect().width;
              if (parentWidth) {
                wrap.style.height = Math.round(parentWidth * (h / w)) + 'px';
              }
            }
          } else {
            // se non disponibili, puoi comunque lasciare il wrapper responsive (default)
          }
        }).catch(()=>{});
      } catch (e) {}

      // wire events for progress & ended
      try {
        backPlayer.off && backPlayer.off('timeupdate');
        backPlayer.on && backPlayer.on('timeupdate', (data) => {
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
        backPlayer.on && backPlayer.on('ended', () => { this.next(); });
        backPlayer.on && backPlayer.on('bufferstart', () => { if (this.playOverlay) this.playOverlay.classList.add('buffering'); });
        backPlayer.on && backPlayer.on('bufferend', () => { if (this.playOverlay) this.playOverlay.classList.remove('buffering'); });
      } catch(e){}

      // direct cut: show back, hide front, then unload front player
      try {
        backIframe.style.transition = 'none';
        frontIframe && (frontIframe.style.transition = 'none');
        backIframe.style.opacity = '1';
        backIframe.style.zIndex = 3;
        if (frontIframe) { frontIframe.style.opacity = '0'; frontIframe.style.zIndex = 2; }

        setTimeout(async () => {
          try {
            if (this.players[frontKey]) {
              try { await this.players[frontKey].unload(); } catch(e) {}
              this.players[frontKey] = null;
            } else if (frontIframe) {
              try { frontIframe.removeAttribute('src'); } catch(e){}
            }
          } catch(e){}
        }, 220);
      } catch (e) {
        console.warn('[vimeo] cut failed', e);
      }

      // update state & UI
      this.front = backKey;
      this.currentIndex = i;
      this._syncTitle(meta.title);
      try { saveSessionVideo(meta.id || meta.vimeoId); } catch(e){}
      this.resetAutoplay();

      // apply mute state
      try { if (backPlayer && typeof backPlayer.setVolume === 'function') { const vol = readMute() ? 0 : 1; backPlayer.setVolume(vol).catch(()=>{}); } } catch(e){}
    }

    _onAfterPlaySwitch(i, meta) {
      // keep old behaviour for video path
      try { this._syncTitle(meta.title); this._flashOverlay(); this._startProgressLoop(); this._highlightGridItem(i); if (!this.isManual) { const grid = document.getElementById('galleryGrid'); if (grid) focusGridItem(grid, i); } } catch(e){}
      // preload next handled in Vimeo or video code where applicable
      const nextIndex = (i + 1) % (this.slides.length || 1);
      const inactiveLayer = (this.front === 'A') ? (this._domMode === 'iframe' ? this.iframeB : this.layerB) : (this._domMode === 'iframe' ? this.iframeA : this.layerA);
      const preUrl = (this.slides[nextIndex] && (this.slides[nextIndex].hls || this.slides[nextIndex].mp4 || this.slides[nextIndex].src || this.slides[nextIndex].iframe || this.slides[nextIndex].vimeoId)) || '';
      if (preUrl && this._domMode === 'video') {
        setTimeout(()=> { attachSource(inactiveLayer, preUrl).catch(()=>{}); }, 150);
      }
    }

    _syncTitle(t) { if (this.titleEl) this.titleEl.textContent = t || ''; }

    _startProgressLoop() {
      if (this._rafId) return;
      const loop = () => { this._rafId = requestAnimationFrame(loop); this._updateProgressAndBuffer(); };
      this._rafId = requestAnimationFrame(loop);
    }

    _stopProgressLoop() { if (this._rafId) { cancelAnimationFrame(this._rafId); this._rafId = null; } }

    _updateProgressAndBuffer() {
      if (this._domMode === 'iframe') {
        // progress handled by Vimeo timeupdate events; keep as no-op or safeguard
        return;
      }
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
        } catch (e) { buf.style.width = '0%'; }
      } else if (buf) buf.style.width = '0%';
      if (layer.paused && this.isManual) this._stopProgressLoop();
    }

    _bindClickToToggle() {
      const playerArea = this.container.querySelector('.gallery-player') || this.container;
      if (!playerArea) return;
      playerArea.addEventListener('click', (ev) => {
        if (ev.target.closest('.progress-wrap') || ev.target.closest('.control-btn') || ev.target.closest('.top-btn')) return;
        // Vimeo: toggle via API; Video: toggle native video
        try {
          if (this._domMode === 'iframe') {
            const p = this._getFrontPlayer();
            if (p && typeof p.getPaused === 'function') {
              p.getPaused().then(paused => { if (paused) p.play().catch(()=>{}); else p.pause().catch(()=>{}); });
            } else {
              // fallback: just toggle overlay
              if (this._overlayVisible) this._hideGalleryOverlay(); else this._showGalleryOverlayTransient();
            }
          } else {
            const front = this._getFrontLayer();
            if (!front) return;
            if (front.paused) { front.play().catch(()=>{}); this._onUserInteraction(); this._startProgressLoop(); this._showGalleryOverlayTransient(); }
            else { front.pause(); this._onUserInteraction(); this._stopProgressLoop(); this._showPausedOverlay(); }
          }
        } catch (e){}
      });
    }

    _bindProgressInteractions() {
      const wrap = this.progressWrap;
      if (!wrap) return;
      wrap.addEventListener('click', (ev) => { ev.stopPropagation(); });

      let dragging = false; let pointerId = null;
      const clamp = (v, a=0, b=1) => Math.max(a, Math.min(b, v));

      const updateSeekFromEvent = (ev) => {
        const rect = wrap.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const frac = clamp(x / rect.width);
        if (this._domMode === 'iframe') {
          // try seek via Vimeo API if available
          const p = this._getFrontPlayer();
          if (p && typeof p.getDuration === 'function') {
            p.getDuration().then(duration => { if (duration) p.setCurrentTime(frac * duration).catch(()=>{}); }).catch(()=>{});
          }
        } else {
          const front = this._getFrontLayer();
          const dur = front && front.duration ? front.duration : 0;
          if (dur > 0) { try { front.currentTime = frac * dur; } catch(e){} if (this.progressBar) this.progressBar.style.width = (frac*100) + '%'; }
        }
      };

      wrap.addEventListener('pointerdown', (ev) => {
        ev.preventDefault && ev.preventDefault();
        ev.stopPropagation();
        dragging = true; pointerId = ev.pointerId; try { wrap.setPointerCapture?.(pointerId); } catch(e){}
        wrap.classList.add('dragging');
        this._onUserInteraction(); this.clearAutoplay(); this._stopProgressLoop(); updateSeekFromEvent(ev);
      }, { passive: false });

      wrap.addEventListener('pointermove', (ev) => { if (!dragging) return; updateSeekFromEvent(ev); }, { passive: true });

      const stopDrag = (ev) => {
        if (!dragging) return;
        dragging = false;
        try { wrap.releasePointerCapture?.(pointerId); } catch(e){}
        wrap.classList.remove('dragging');
        pointerId = null;
        if (this._domMode === 'iframe') {
          // nothing else; Vimeo will continue playing
        } else {
          const front = this._getFrontLayer();
          if (front && !front.paused) this._startProgressLoop();
        }
      };
      wrap.addEventListener('pointerup', (ev) => { ev.preventDefault && ev.preventDefault(); ev.stopPropagation(); stopDrag(ev); }, { passive: false });
      wrap.addEventListener('pointercancel', stopDrag);
      wrap.addEventListener('lostpointercapture', stopDrag);
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
      if (pa) { pa.style.display = 'block'; pa.style.opacity = '1'; pa.style.transform = 'translate(-50%,-50%) scale(1)'; }
      if (this.topOverlay) { this.topOverlay.classList.add('paused'); this.topOverlay.style.display = 'flex'; this.topOverlay.style.opacity = '1'; }
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

    updateMuteButton() {
      const muted = readMute();
      if (this.topMuteBtn) {
        this.topMuteBtn.classList.toggle('muted', !!muted);
        this.topMuteBtn.setAttribute('aria-pressed', muted ? 'true' : 'false');
      }
      // apply to players
      try {
        if (this._domMode === 'iframe') {
          const p = this._getFrontPlayer();
          if (p && typeof p.setVolume === 'function') { const vol = muted ? 0 : 1; p.setVolume(vol).catch(()=>{}); }
        } else {
          if (this.layerA) this.layerA.muted = !!muted;
          if (this.layerB) this.layerB.muted = !!muted;
        }
      } catch(e){}
    }

    destroy() {
      this.clearAutoplay();
      this._stopProgressLoop();
      if (this._pauseTimeoutId) { clearTimeout(this._pauseTimeoutId); this._pauseTimeoutId = null; }
      // Vimeo unload
      try {
        if (this.players.A) { try { this.players.A.unload(); } catch(e){} this.players.A = null; }
        if (this.players.B) { try { this.players.B.unload(); } catch(e){} this.players.B = null; }
      } catch(e){}
      // video cleanup
      try { if (this.layerA) { try { this.layerA.pause(); } catch(e){} destroyHlsForEl(this.layerA); } } catch(e){}
      try { if (this.layerB) { try { this.layerB.pause(); } catch(e){} destroyHlsForEl(this.layerB); } } catch(e){}
      if (this._overlayTimer) { clearTimeout(this._overlayTimer); this._overlayTimer = null; }
    }
  }


  /* ---------------- Home init ---------------- */
  let homeCarousel = null;
  function initHome(context = document) {
    const section = context.querySelector('#carouselSection');
    if (!section) return;
    let slides = Array.isArray(HOME_CAROUSEL) && HOME_CAROUSEL.length ? HOME_CAROUSEL.slice() : FEATURED_IDS.map(id => VIDEOS.find(v => v.id === id)).filter(Boolean);
    if (!slides.length) slides.push(...(Array.isArray(VIDEOS) ? VIDEOS.slice(0, Math.min(5, VIDEOS.length)) : []));
    homeCarousel = new HomeCarousel({ container: section, slides });
  }

  /* ---------------- populateGrid (preview logic) - UPDATED to accept filters ---------------- */
  function populateGrid(container, categories = null) {
    stopAllPreviewsExcept(null);
    container.innerHTML = '';

    // normalizza categories selezionate
    const sel = Array.isArray(categories) ? categories.slice() : [];
    // se nessun filtro -> prendi tutti i video
    let items;
    if (!sel.length) {
      items = Array.isArray(VIDEOS) ? VIDEOS.slice() : [];
    } else {
      // filter: video is included if ANY of its categories is in sel (OR logic)
      items = Array.isArray(VIDEOS) ? VIDEOS.filter(v => {
        const vcats = normCategories(v);
        return vcats.some(vc => sel.includes(vc));
      }) : [];
    }

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
      const vid = btn.querySelector('video');
      let hoverTimer = null;

      const loadAndPlayPreview = () => {
        if (!vid) return;
        const ds = vid.dataset && vid.dataset.preview ? vid.dataset.preview.trim() : '';
        const isManifest = ds.toLowerCase().endsWith('.m3u8');
        const fallback = (v.mp4 || v.src || '');
        const useUrl = (!isManifest && ds) ? ds : (fallback || '');
        if (!vid.getAttribute('src') && useUrl) {
          const doLoad = () => {
            try {
              stopAllPreviewsExcept(vid);
              destroyHlsForEl(vid);
              vid.removeAttribute('src');
              vid.src = useUrl;
              vid.preload = 'metadata';
              vid.muted = true;
              vid.loop = true;
              vid.load();
              vid.play().catch(()=>{});
              btn.classList.add('hovering');
              _activePreviews.add(vid);
            } catch (e) {}
          };
          if ('requestIdleCallback' in window) requestIdleCallback(doLoad, { timeout: 120 }); else setTimeout(doLoad, 80);
        } else if (vid.getAttribute('src')) {
          try { vid.play().catch(()=>{}); btn.classList.add('hovering'); _activePreviews.add(vid); } catch(e){}
        }
      };

      btn.addEventListener('pointerenter', () => {
        if (hoverTimer) clearTimeout(hoverTimer);
        hoverTimer = setTimeout(loadAndPlayPreview, 60);
      });
      btn.addEventListener('pointerleave', () => {
        if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
        setTimeout(()=> { stopPreview(vid); }, 80);
      });

      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        stopAllPreviewsExcept(null);
        if (window.galleryPlayer) {
          window.galleryPlayer.isManual = true;
          // need to determine index in the current filtered list for playIndex
          const currentItems = (!Array.isArray(sel) || sel.length === 0) ? VIDEOS.slice() : VIDEOS.filter(vv => {
            const vvcats = normCategories(vv);
            return vvcats.some(vc => sel.includes(vc));
          });
          const idxInSlides = currentItems.findIndex(s => s.id === v.id);
          if (idxInSlides >= 0) {
            window.galleryPlayer.playIndex(idxInSlides, { userTriggered: true });
          }
        }
        focusGridItem(container, idx);
        // Update URL hash: use query style for filters + video
        const cats = Array.isArray(sel) && sel.length ? sel.join(',') : '';
        const params = new URLSearchParams();
        if (cats) params.set('cats', cats);
        params.set('video', v.id);
        const newHash = params.toString();
        history.replaceState(null, '', location.pathname.replace(/\/+$/, '') + (newHash ? ('#' + newHash) : ''));
        try { saveSessionFilters(sel || []); saveSessionVideo(v.id); } catch(e){}
      });

      btn.setAttribute('data-id', v.id);
      btn.setAttribute('data-index', idx);

      container.appendChild(btn);
    });
  }


  /* ---------------- initGallery (REWRITTEN to use filters) ---------------- */
  function initGallery(context = document) {
    const catList = context.querySelector('#categoryList');
    const galleryGrid = context.querySelector('#galleryGrid');
    const section = context.querySelector('#galleryCarouselSection');
    if (!catList || !galleryGrid || !section) return;

    // parse existing hash (may contain cats & video)
    const hashInfo = parseGalleryHash(); // { categories: [...], video }

    // build filter buttons (multi-select)
    catList.innerHTML = '';
    CATEGORIES.forEach((category) => {
      const li = create('li');
      const btn = create('button', { 'aria-pressed': 'false', 'data-category': category }, category);
      btn.classList.add('category-item');
      btn.setAttribute('role', 'button');
      // toggle filter on click
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        // toggle UI
        const isActive = btn.classList.toggle('active');
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');

        // compute selected filters
        const selected = Array.from(catList.querySelectorAll('button.active')).map(b => b.getAttribute('data-category')).filter(Boolean);

        // persist selected filters
        try { saveSessionFilters(selected); /* don't overwrite saved video here */ } catch(e){}

        // update URL hash (cats=...)
        const newHash = selected.length ? (`#${new URLSearchParams({cats: selected.join(',')}).toString()}`) : '';
        history.replaceState(null, '', location.pathname.replace(/\/+$/, '') + newHash);

        // repopulate grid with selected filters (or all if none)
        populateGrid(galleryGrid, selected);

        // --- SYNC PLAYER with filtered slides while preserving autoplay behavior ---
        try {
          // build the new slides array from the selected filters
          const newSlides = (Array.isArray(selected) && selected.length) ? VIDEOS.filter(v => selected.includes(v.category)) : VIDEOS.slice();

          if (window.galleryPlayer) {
            // capture currently playing id (if any) BEFORE updating slides
            const front = window.galleryPlayer._getFrontLayer && window.galleryPlayer._getFrontLayer();
            const wasPlaying = !!(front && !front.paused);
            const oldCurrentId = (window.galleryPlayer.slides && window.galleryPlayer.slides[window.galleryPlayer.currentIndex]) ? window.galleryPlayer.slides[window.galleryPlayer.currentIndex].id : null;

            // update slides in player (this resets currentIndex to 0 per impl)
            window.galleryPlayer.setSlides(newSlides);
            window.galleryPlayer.updateMuteButton();

            if (wasPlaying) {
              // try to continue the same video if present in newSlides
              let idx = -1;
              if (oldCurrentId) idx = newSlides.findIndex(s => s.id === oldCurrentId);
              if (idx >= 0) {
                // continue from same video
                window.galleryPlayer.playIndex(idx, { autoplay: true });
              } else if (newSlides.length) {
                // otherwise start from first item of filtered set
                window.galleryPlayer.playIndex(0, { autoplay: true });
              }
            } else {
              // player exists but was paused/manual: do nothing (just updated slides)
              // preserve manual mode
            }
          } else {
            // no player yet: create one so later interactions work consistently
            // create but don't force play; initial autoplay policy will run elsewhere
            window.galleryPlayer = new GalleryPlayer({ container: section, slides: newSlides });
            window.galleryPlayer.updateMuteButton();
            // If you want to auto-start when filters change even if no player, uncomment:
            // const autoplay = isMobileDevice() ? !!readMute() : true;
            // if (newSlides.length && autoplay) window.galleryPlayer.playIndex(0, { autoplay: true });
          }
        } catch (e) {
          console.warn('[filters] failed to sync player with filters', e);
        }
      });

      li.appendChild(btn);
      catList.appendChild(li);
    });

    // helper: set active buttons from array
    function setActiveButtons(arr) {
      try {
        catList.querySelectorAll('button').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
        if (Array.isArray(arr) && arr.length) {
          arr.forEach(cat => {
            const b = catList.querySelector(`button[data-category="${cat}"]`);
            if (b) { b.classList.add('active'); b.setAttribute('aria-pressed','true'); }
          });
        }
      } catch (e) {}
    }

    // determine initial filters:
    // if the URL has NO hash at all -> reset filters immediately (show all).
    // This handles both full page loads and Barba transitions (initGallery is called on enter).
    const sessionFilters = readSessionFilters(); // may be null or array
    let initialFilters = null;

    // If there is no hash in the URL, we clear stored filters and show all (initialFilters = null)
    if (!location.hash || location.hash === '#') {
      try { saveSessionFilters([]); } catch(e){}
      initialFilters = null;
    } else if (hashInfo.categories && Array.isArray(hashInfo.categories) && hashInfo.categories.length) {
      // hash explicitly requested categories -> respect them (with case-insensitive matching fallback)
      const matched = hashInfo.categories.map(h => {
        const exact = CATEGORIES.find(c => c === h);
        if (exact) return exact;
        const found = CATEGORIES.find(c => c.toLowerCase() === (h||'').toLowerCase());
        return found || null;
      }).filter(Boolean);
      initialFilters = matched.length ? matched : null;
    } else if (sessionFilters && sessionFilters.length) {
      // if URL has a hash but it didn't specify categories (e.g. video=...), we may still restore session filters
      initialFilters = sessionFilters.filter(f => CATEGORIES.includes(f));
    } else {
      // fallback: show all
      initialFilters = null;
    }


    // apply initial filter buttons and populate grid
    setActiveButtons(initialFilters);
    populateGrid(galleryGrid, initialFilters);

    // if hash also contained a video -> play that video after populate
    if (hashInfo.video) {
      // find video meta
      const vidMeta = VIDEOS.find(v => v.id === hashInfo.video);
      if (vidMeta) {
        // if the video is not part of the current filtered list, ensure we show its category (activate that filter)
        const belongsToCurrent = !initialFilters || initialFilters.length === 0 ? true : initialFilters.includes(vidMeta.category);
        if (!belongsToCurrent) {
          // activate the video's category
          setActiveButtons([vidMeta.category]);
          populateGrid(galleryGrid, [vidMeta.category]);
        }
        // create or update galleryPlayer and play the specific video (no autoplay if deep link)
        // NOTE: we reuse the galleryPlayer implementation already present (unchanged)
        setTimeout(() => {
          try {
            if (!window.galleryPlayer && section) {
              window.galleryPlayer = new GalleryPlayer({ container: section, slides: VIDEOS.filter(v => (initialFilters && initialFilters.length) ? initialFilters.includes(v.category) : true) });
              window.galleryPlayer.updateMuteButton();
            }
            // compute slide index within current slides
            const slides = (initialFilters && initialFilters.length) ? VIDEOS.filter(v => initialFilters.includes(v.category)) : VIDEOS.slice();
            const idx = slides.findIndex(s => s.id === vidMeta.id);
            if (idx >= 0 && window.galleryPlayer) {
              window.galleryPlayer.playIndex(idx, { userTriggered: true, autoplay: false });
              window.galleryPlayer._showGalleryOverlayTransient?.();
            }
            try { saveSessionFilters(initialFilters || []); saveSessionVideo(vidMeta.id); } catch(e){}
          } catch (e) {}
        }, 150);
      }
    } else {
      // no video deep-link: ensure galleryPlayer exists and maybe autoplay first item based on previous logic
      setTimeout(() => {
        try {
          const slides = (initialFilters && initialFilters.length) ? VIDEOS.filter(v => initialFilters.includes(v.category)) : VIDEOS.slice();
          if (!window.galleryPlayer && section) {
            window.galleryPlayer = new GalleryPlayer({ container: section, slides });
            window.galleryPlayer.updateMuteButton();
          } else if (window.galleryPlayer) {
            window.galleryPlayer.setSlides(slides);
            window.galleryPlayer.updateMuteButton();
          }
          // decide autoplay same as before: mobile only if muted pref set
          const autoplay = isMobileDevice() ? !!readMute() : true;
          if (slides && slides.length) {
            if (!hashInfo.categories && !sessionFilters) {
              // arriving without filters -> behavior equals "no filters selected" (show all)
            }
            // play first (respect autoplay policy)
            if (window.galleryPlayer) {
              window.galleryPlayer.playIndex(0, { autoplay: !!autoplay });
            }
          }
        } catch (e) {}
      }, 150);
    }
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
    } catch (e) { runInitial(document); }
  }

  /* ---------------- START ---------------- */
  function start() {
    if (window.__APP_INITIALIZED__) return;
    window.__APP_INITIALIZED__ = true;
    initBarbaSafe(runInits);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  log('main.js ready — filters-enabled gallery, deep-link compatible, session-preserve filters.');
})();