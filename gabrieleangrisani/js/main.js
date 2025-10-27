// js/main.js
(() => {
  /* ---------------- CONFIG / TIMINGS ---------------- */
  const GALLERY_AUTOPLAY_INTERVAL_MS = 10000; // autoplay gallery player (usato se non manuale)
  const MOUSE_IDLE_MS = 2000; // per gallery overlay
  const MOBILE_OVERLAY_TIMEOUT_MS = 2000

  /* ---------------- DATA (esempio) ---------------- */
  const HOME_CAROUSEL = (typeof window !== 'undefined' && window.HOME_CAROUSEL) ? window.HOME_CAROUSEL : [
    { 
      id: 'cast_neve_carousel', 
      hls: 'media/home/cast_neve_carousel/index.m3u8', 
      mp4: 'media/home/cast_neve_carousel.mp4', 
      title: 'Neve', 
      desc: 'Cast', 
      category: 'Narratives' , 
      galleryId: 'waldeinsamkeit' 
    },
    { 
      id: 'alici_di_menaica_carousel', 
      hls: 'media/home/alici_di_menaica_carousel/index.m3u8', 
      mp4: 'media/home/alici_di_menaica_carousel.mp4', 
      title: 'Alici di Menaica', 
      category: 'Documentaries', 
      galleryId: 'alici_di_menaica_teaser' 
    },
    { 
      id: 'cm_festa_fine_campagna_carousel', 
      hls: 'media/home/cm_festa_fine_campagna_carousel/index.m3u8',  
      title: 'Festa di Fine Campagna', 
      category: '' , 
      galleryId: '' 
    },
    { 
      id: 'human_carousel', 
      hls: 'media/home/human_carousel/index.m3u8', 
      mp4: 'media/home/human_carousel.mp4', 
      title: 'Human', 
      category: 'Music Videos' , 
      galleryId: '' 
    },
    { 
      id: 'il_compito_carousel', 
      hls: 'media/home/il_compito_carousel/index.m3u8',  
      title: 'Il Compito', 
      category: '' , 
      galleryId: '' 
    },
    { 
      id: 'la_quinta_stagione_carousel', 
      hls: 'media/home/la_quinta_stagione_carousel/index.m3u8',  
      title: 'La Quinta Stagione', 
      category: '' , 
      galleryId: '' 
    },
    { 
      id: 'partenope_carousel', 
      hls: 'media/home/partenope_carousel/index.m3u8',  
      title: 'Partenope', 
      category: '' , 
      galleryId: '' 
    },
    { 
      id: 'ride_or_die_carousel', 
      hls: 'media/home/ride_or_die_carousel/index.m3u8',  
      title: 'Ride or Die', 
      category: '' , 
      galleryId: '' 
    },
    { 
      id: 'sinestesie_carousel', 
      hls: 'media/home/sinestesie_carousel/index.m3u8',  
      title: 'Sinestesie', 
      category: '' , 
      galleryId: '' 
    },        
    { 
      id: 'spot_notaio_carousel', 
      hls: 'media/home/spot_notaio_carousel/index.m3u8',  
      title: "Studio Notarile D'Ausilio", 
      category: 'Commercials' , 
      galleryId: 'studio_notarile_dausilio' 
    },
    { 
      id: 'varnelli_carousel', 
      hls: 'media/home/varnelli_carousel/index.m3u8',  
      title: 'Varnelli di Fine Campagna', 
      category: '' , 
      galleryId: '' 
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
    
    // Documentaries
    { 
      id: 'alici_di_menaica_mini_doc', 
      hls: 'media/works/documentaries/alici_di_menaica_mini_doc/index.m3u8', 
      mp4: 'media/works/documentaries/alici_di_menaica_mini_doc.mp4', 
      preview: '', 
      title: 'Alici di Menaica - Mini Doc', 
      desc: 'Documentary - fishing & tradition', 
      category: 'Documentaries' 
    },
    { 
      id: 'alici_di_menaica_teaser', 
      hls: 'media/works/documentaries/alici_di_menaica_teaser/index.m3u8', 
      mp4: 'media/works/documentaries/alici_di_menaica_teaser.mp4', 
      preview: '', 
      title: 'Alici di Menaica - Teaser', 
      desc: 'Documentary teaser', 
      category: 'Documentaries' 
    },
    { 
      id: 'cm_festafinecampagna25', 
      hls: 'media/works/documentaries/cm_festafinecampagna25/index.m3u8', 
      mp4: 'media/works/documentaries/cm_festafinecampagna25.mp4', 
      title: 'CM Festa Fine Campagna 25', 
      desc: 'Documentary - community & celebration', 
      category: 'Documentaries' 
    },

    // Commercials
    { 
      id: 'studio_notarile_dausilio', 
      hls: 'media/works/commercials/studio_notarile_dausilio/index.m3u8', 
      mp4: 'media/works/commercials/studio_notarile_dausilio.mp4', 
      preview: '', 
      title: "Studio Notarile D'Ausilio", 
      desc: 'Spot', 
      category: 'Commercials' 
    },

    // Narratives
    { 
      id: 'waldeinsamkeit', 
      hls: 'media/works/narratives/waldeinsamkeit/index.m3u8',  
      mp4: 'media/works/narratives/waldeinsamkeit.mp4',
      title: 'Waldeinsamkeit', 
      category: 'Narratives' 
    },
  ];
  const CATEGORIES = ['Music Videos', 'Commercials', 'Corporate', 'Fashion', 'Food', 'Documentaries', 'Narratives', 'Social'];

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
          const hlsCfg = { enableWorker: !isMobileDevice(), // disable webworker on mobile
                          xhrSetup: (xhr, url) => { /* keep default for now */ } };
          const hls = new Hls(hlsCfg);

          // add error handler to try recover / fallback
          hls.on(Hls.Events.ERROR, (event, data) => {
            const { type, details, fatal } = data || {};
            console.warn('[HLS] error', type, details, fatal);
            if (fatal) {
              try {
                // try to recover for non-fatal recoverable errors
                if (hls && typeof hls.recoverMediaError === 'function') {
                  hls.recoverMediaError();
                  return;
                }
              } catch (e) {}
              // final fallback: destroy and attach as plain src (if mp4 alternative provided)
              try {
                const key = _hlsKeyFor(videoEl);
                if (key && _hlsMap.has(key)) {
                  try { hls.destroy(); } catch (e) {}
                  _hlsMap.delete(key);
                }
              } catch (e) {}
              // Let outer code decide whether to attach mp4 fallback (attachSource caller has to pass fallback)
            }
          });

          hls.attachMedia(videoEl);
          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            try { hls.loadSource(url); } catch (e) {}
          });
          _hlsMap.set(key, hls);
        } catch (e) {
          // fallback: direct src
          try { videoEl.removeAttribute('src'); videoEl.src = url; videoEl.load(); } catch (e) {}
        }
      } else {
        try { videoEl.removeAttribute('src'); videoEl.src = url; videoEl.load(); } catch (e) {}
      }

      const onCan = () => {
        try { videoEl.removeEventListener('canplay', onCan); } catch (e) {}
        resolve();
      };
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
      // primo tentativo fallito: prova a mutare e riprovare (utile su mobile)
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
    // Accept multiple formats:
    // "#Category/VideoId", "#category=Cat&video=Id", "#Category", "#video=Id"
    const raw = (location.hash || '').replace(/^#/, '');
    if (!raw) return { category: null, video: null };
    // try "Category/VideoId"
    if (raw.includes('/')) {
      const [category, ...rest] = raw.split('/');
      const video = rest.join('/');
      return { category: decodeURIComponent(category || '') || null, video: decodeURIComponent(video || '') || null };
    }
    // try query style "category=...&video=..."
    if (raw.includes('=')) {
      const params = new URLSearchParams(raw);
      return { category: params.get('category') || null, video: params.get('video') || params.get('vid') || null };
    }
    // try "Category" alone or "video:ID"
    if (raw.includes(':')) {
      const [k, v] = raw.split(':');
      if (k.toLowerCase() === 'video' || k.toLowerCase() === 'vid') return { category: null, video: decodeURIComponent(v || '') || null };
      return { category: decodeURIComponent(k || '') || null, video: decodeURIComponent(v || '') || null };
    }
    // fallback: treat as category or video (try to detect video id presence)
    const single = decodeURIComponent(raw);
    // if there's a video with this id, prefer it
    if (Array.isArray(VIDEOS) && VIDEOS.find(v => v.id === single)) return { category: null, video: single };
    return { category: single, video: null };
  }

  function isMobileDevice() {
    return ('ontouchstart' in window) && /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
  }

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
      // try { await safePlay(this.layerA); } catch(e){}
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

  /* ---------------- GalleryPlayer (HLS main, hover preview via mp4) ---------------- */
  class GalleryPlayer {
    constructor(opts) {
      this.container = opts.container;
      this.layerA = this.container.querySelector('.gallery-video.layer-a');
      this.layerB = this.container.querySelector('.gallery-video.layer-b');
      this.titleEl = this.container.querySelector('#galleryTitle');
      this.prevBtn = this.container.querySelector('#gPrevBtn');
      this.nextBtn = this.container.querySelector('#gNextBtn');
      this.progressBar = this.container.querySelector('.progress-bar');
      this.progressBuffer = this.container.querySelector('.progress-buffer');
      this.progressWrap = this.container.querySelector('.progress-wrap');
      this.playOverlay = this.container.querySelector('.play-overlay');
      this.topOverlay = this.container.querySelector('.top-overlay');
      this.bottomOverlay = this.container.querySelector('.bottom-overlay');
      this.galleryOverlay = this.container.querySelector('.gallery-overlay'); // unified overlay container

      this.topMuteBtn = this.container.querySelector('.top-overlay .mute-btn');
      this.topFsBtn = this.container.querySelector('.top-overlay .fs-btn');

      this.slides = opts.slides || [];
      this.currentIndex = 0;
      this.front = 'A';
      this.autoplayTimer = null;
      this.isManual = false;
      this._boundOnInteraction = this._onUserInteraction.bind(this);
      this._rafId = null;
      this._pauseTimeoutId = null;
      this._seeking = false;

      // overlay idle management
      this._overlayVisible = false;
      this._overlayTimer = null;
      this._onMouseMoveBound = this._onMouseMove.bind(this);
      this._onTouchTapBound = this._onTouchTap.bind(this);

      this._setupLayers();
      this._wireTopControls();
      this._wireControls();
      this._bindClickToToggle();
      this._bindProgressInteractions();

      // DON'T autoplay here — initGallery decides whether to start playback
      // show overlays briefly
      this._ensureUnifiedOverlay();
      this._showGalleryOverlayTransient();

      // pointer handlers for overlay show/hide
      const gpArea = this.container.querySelector('.gallery-player') || this.container;
      if (gpArea) {
        gpArea.addEventListener('pointermove', this._onMouseMoveBound, { passive: true });
        gpArea.addEventListener('pointerenter', this._onMouseMoveBound, { passive: true });
        gpArea.addEventListener('pointerleave', () => { this._startOverlayHideTimer(); });
        // mobile tap
        gpArea.addEventListener('touchend', this._onTouchTapBound, { passive: true });
      }
    }

    _ensureUnifiedOverlay() {
      // if no wrapper gallery-overlay present, create one and move top, play, bottom into it
      if (!this.galleryOverlay) {
        this.galleryOverlay = create('div', { class: 'gallery-overlay' }, '');
        // try to find and move existing overlay parts into it
        const top = this.container.querySelector('.top-overlay');
        const play = this.container.querySelector('.play-overlay');
        const bottom = this.container.querySelector('.bottom-overlay') || this.container.querySelector('.carousel-bottom');
        const bar = this.container.querySelector('.progress-wrap');
        if (top) this.galleryOverlay.appendChild(top);
        if (play) this.galleryOverlay.appendChild(play);
        if (bottom) this.galleryOverlay.appendChild(bottom);
        if (bar) this.galleryOverlay.appendChild(bar);
        // append wrapper into container
        this.container.appendChild(this.galleryOverlay);
      }
      // ensure pointer-events on child controls are active
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
      // ensure play/top/bottom visible states (class based; CSS must handle transitions)
      if (this.playOverlay) this.playOverlay.style.opacity = '1';
      if (this.topOverlay) this.topOverlay.style.opacity = '1';
      if (this.bottomOverlay) this.bottomOverlay.style.opacity = '1';
    }

    _hideGalleryOverlay() {
      if (!this.galleryOverlay) return;
      this.galleryOverlay.classList.remove('visible');
      this.galleryOverlay.classList.add('hidden');
      this._overlayVisible = false;
      if (this.playOverlay) this.playOverlay.style.opacity = '0';
      if (this.topOverlay) this.topOverlay.style.opacity = '0';
      if (this.bottomOverlay) this.bottomOverlay.style.opacity = '0';
    }

    _startOverlayHideTimer(timeout = MOUSE_IDLE_MS) {
      if (this._overlayTimer) { clearTimeout(this._overlayTimer); this._overlayTimer = null; }
      // on mobile use mobile timeout
      const useTimeout = isMobileDevice() ? MOBILE_OVERLAY_TIMEOUT_MS : timeout;
      this._overlayTimer = setTimeout(() => {
        this._hideGalleryOverlay();
        this._overlayTimer = null;
      }, useTimeout);
    }

    _onMouseMove() {
      this._showGalleryOverlay();
      if (this._overlayTimer) { clearTimeout(this._overlayTimer); this._overlayTimer = null; }
      this._startOverlayHideTimer();
    }

    _onTouchTap(ev) {
      // toggle overlay on mobile tap
      if (!isMobileDevice()) {
        ev.preventDefault();
        ev.stopPropagation();
        if (this._overlayVisible) {
          this._hideGalleryOverlay();
        } else {
          this._showGalleryOverlay();
          this._startOverlayHideTimer();
        }
      }
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
          layer.addEventListener('ended', () => this._onVideoEnded());
        });
      }
    }

    _onVideoEnded() {
      // normal autoplay sequence when gallery is autoplaying (not when a single video opened via URL)
      if (this.isManual) return; // user / single-video mode -> don't advance
      this.next();
    }

    _wireTopControls() {
      if (this.topMuteBtn) {
        this.updateMuteButton();
        this.topMuteBtn.addEventListener('click', (e) => {
          e.stopPropagation(); e.preventDefault();
          const newVal = !readMute();
          writeMute(newVal);
          this.updateMuteButton();
        });
      }
      if (this.topFsBtn) {
        this.topFsBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleFullscreen();
          // keep icon visible — toggling classes only, do not hide images
          this.updateFullscreenButton();
        });
      }
      ['fullscreenchange','webkitfullscreenchange','mozfullscreenchange','MSFullscreenChange'].forEach(ev => document.addEventListener(ev, ()=> this.updateFullscreenButton()));
    }

    toggleFullscreen() {
      const el = this.container;
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
        if (el.requestFullscreen) el.requestFullscreen().catch(()=>{}); else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen().catch(()=>{});
      }
      setTimeout(()=> this.updateFullscreenButton(), 250);
    }

    updateFullscreenButton() {
      const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
      if (!this.topFsBtn) return;
      this.topFsBtn.classList.toggle('is-full', isFull);
      this.topFsBtn.setAttribute('aria-pressed', isFull ? 'true' : 'false');
      this.topFsBtn.setAttribute('aria-label', isFull ? 'Esci schermo intero' : 'Attiva schermo intero');
      // ensure img/icon remains visible: don't manipulate children display here
    }

    _wireControls() {
      if (this.prevBtn) this.prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this._onUserInteraction(); this.prev(); });
      if (this.nextBtn) this.nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this._onUserInteraction(); this.next(); });
    }

    _onBuffering(layer) {
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
            setTimeout(()=> { try { this.playOverlay.style.display = 'none'; } catch (e){} }, 220);
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
      // fallback timer (not primary); normal advance is triggered on ended event
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
      try { backLayer.removeAttribute('src'); } catch (e) {}

      const sourceUrl = meta.hls || meta.mp4 || meta.src || '';
      await attachSource(backLayer, sourceUrl);

      const muted = readMute();
      backLayer.muted = !!muted;
      frontLayer.muted = !!muted;

      const shouldAutoplay = opts.autoplay !== false;

      try {
        backLayer.currentTime = 0;
        // backLayer.play().catch(()=>{});
        if (shouldAutoplay) {
          safePlay(backLayer).then(ok => {
            if (!ok) console.warn('[gallery] autoplay suppressed by browser');
          });
        }

        if (window.gsap) {
          backLayer.style.zIndex = 3;
          frontLayer.style.zIndex = 2;
          gsap.fromTo(backLayer, { opacity: 0, scale: 1.02 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' });
          gsap.to(frontLayer, { opacity: 0, scale: 0.98, duration: 0.45, ease: 'power2.out', onComplete: () => {
            try { frontLayer.pause(); frontLayer.currentTime = 0; } catch(e){}
            this.front = (this.front === 'A') ? 'B' : 'A';
            this._onAfterPlaySwitch(i, meta);
          }});
        } else {
          backLayer.style.opacity = 1;
          backLayer.style.zIndex = 3;
          frontLayer.style.opacity = 0;
          frontLayer.style.zIndex = 2;
          try { frontLayer.pause(); frontLayer.currentTime = 0; } catch(e){}
          this.front = (this.front === 'A') ? 'B' : 'A';
          this._onAfterPlaySwitch(i, meta);
        }
      } catch (e) {
        this.front = (this.front === 'A') ? 'B' : 'A';
        this._onAfterPlaySwitch(i, meta);
      }

      this.currentIndex = i;
      this.resetAutoplay();
      this._startProgressLoop();
    }

    _onAfterPlaySwitch(i, meta) {
      this._syncTitle(meta.title);
      this._flashOverlay();
      this._startProgressLoop();
      this._highlightGridItem(i);
      try {
        const grid = document.getElementById('galleryGrid');
        if (!this.isManual) focusGridItem(grid, i);
      } catch (e) {}
      // preload next
      const nextIndex = (i + 1) % this.slides.length;
      const inactiveLayer = (this.front === 'A') ? this.layerB : this.layerA;
      const preUrl = (this.slides[nextIndex] && (this.slides[nextIndex].hls || this.slides[nextIndex].mp4 || this.slides[nextIndex].src)) || '';
      setTimeout(()=> { attachSource(preLayer, preUrl).catch(()=>{}); }, 600);
    }

    _syncTitle(t) { if (this.titleEl) this.titleEl.textContent = t || ''; }

    _flashOverlay() {
      this._showGalleryOverlayTransient();
    }

    _getFrontLayer() { return (this.front === 'A') ? this.layerA : this.layerB; }

    _startProgressLoop() {
      if (this._rafId) return;
      const loop = () => { this._rafId = requestAnimationFrame(loop); this._updateProgressAndBuffer(); };
      this._rafId = requestAnimationFrame(loop);
    }

    _stopProgressLoop() {
      if (this._rafId) { cancelAnimationFrame(this._rafId); this._rafId = null; }
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
        } catch (e) { buf.style.width = '0%'; }
      } else if (buf) buf.style.width = '0%';

      if (layer.paused && this.isManual) this._stopProgressLoop();
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
          this._showGalleryOverlayTransient();
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
      let dragging = false; let pointerId = null;
      const clamp = (v, a=0, b=1) => Math.max(a, Math.min(b, v));

      const updateSeekFromEvent = (ev) => {
        const rect = wrap.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const frac = clamp(x / rect.width);
        const front = this._getFrontLayer();
        const dur = front && front.duration ? front.duration : 0;
        if (dur > 0) { try { front.currentTime = frac * dur; } catch(e){} if (this.progressBar) this.progressBar.style.width = (frac*100) + '%'; }
      };

      wrap.addEventListener('pointerdown', (ev) => {
        ev.preventDefault(); ev.stopPropagation();
        dragging = true; pointerId = ev.pointerId; wrap.setPointerCapture?.(pointerId); wrap.classList.add('dragging');
        this._onUserInteraction(); this.clearAutoplay(); this._stopProgressLoop(); updateSeekFromEvent(ev);
      });
      wrap.addEventListener('pointermove', (ev) => { if (!dragging) return; updateSeekFromEvent(ev); });
      const stopDrag = (ev) => { if (!dragging) return; dragging = false; try { wrap.releasePointerCapture?.(pointerId); } catch(e){} wrap.classList.remove('dragging'); pointerId = null; const front = this._getFrontLayer(); if (front && !front.paused) this._startProgressLoop(); };
      wrap.addEventListener('pointerup', (ev) => { ev.preventDefault(); ev.stopPropagation(); stopDrag(ev); });
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
      // const ip = this.playOverlay.querySelector('.icon-play');
      if (pa) { pa.style.display = 'block'; pa.style.opacity = '1'; pa.style.transform = 'translate(-50%,-50%) scale(1)'; }
      // if (ip) { ip.style.opacity = '0'; ip.style.display = 'block'; ip.style.transform = 'translate(-50%,-50%) scale(0.9)'; }
      if (this.topOverlay) { this.topOverlay.classList.add('paused'); this.topOverlay.style.display = 'flex'; this.topOverlay.style.opacity = '1'; }
    }

    _showOverlays() { this._showGalleryOverlay(); this._startOverlayHideTimer(); }
    _hideOverlays() { this._hideGalleryOverlay(); }

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
      this._stopProgressLoop();
      if (this._pauseTimeoutId) { clearTimeout(this._pauseTimeoutId); this._pauseTimeoutId = null; }
      try { this.layerA.pause(); this.layerB.pause(); } catch (e) {}
      destroyHlsForEl(this.layerA);
      destroyHlsForEl(this.layerB);
      if (this._overlayTimer) { clearTimeout(this._overlayTimer); this._overlayTimer = null; }
      // remove event listeners if needed (not fully unbound here for brevity)
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

  /* ---------------- Gallery init ---------------- */
  let galleryPlayer = null;
  function initGallery(context = document) {
    const catList = context.querySelector('#categoryList');
    const galleryGrid = context.querySelector('#galleryGrid');
    const section = context.querySelector('#galleryCarouselSection');
    if (!catList || !galleryGrid || !section) return;

    // parse URL hash for category/video
    const hashInfo = parseGalleryHash(); // { category, video }

    catList.innerHTML = '';
    CATEGORIES.forEach((category, idx) => {
      const li = create('li');
      const btn = create('button', {}, category);
      btn.classList.add('category-item');
      if (idx === 0) {
        btn.classList.toggle('active', true);
        const cat = category || '';
        const newHash = `#${encodeURIComponent(cat)}`;
        history.replaceState(null, '', location.pathname.replace(/\/+$/, '') + newHash);
      }
      btn.setAttribute('data-category', category);
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      btn.addEventListener('click', () => {
        catList.querySelectorAll('button').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-selected','true');
        const cat = category || '';
        const newHash = `#${encodeURIComponent(cat)}`;
        history.replaceState(null, '', location.pathname.replace(/\/+$/, '') + newHash);
        renderCategory(category, { fromHash: false });
      });
      li.appendChild(btn);
      catList.appendChild(li);
    });

    // renderCategory now accepts options: { startVideoId, noAutoplay (boolean) }
    async function renderCategory(category, opts = {}) {
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

      // create or update player
      if (galleryPlayer) {
        galleryPlayer.setSlides(slides);
        galleryPlayer.isManual = false;
        // don't immediately play here — we will decide based on opts
      } else {
        galleryPlayer = new GalleryPlayer({ container: section, slides });
      }

      // update mute state
      if (galleryPlayer) galleryPlayer.updateMuteButton();

      populateGrid(galleryGrid, category);

      // if called from hash and video specified -> select that video and DON'T start autoplay
      if (opts.startVideoId) {
        // mark manual mode so autoplay won't interfere
        galleryPlayer.isManual = true;
        // find index in slides
        const idx = slides.findIndex(s => s.id === opts.startVideoId);
        if (idx >= 0) {
          // small delay to allow gallery DOM render & player ready
          setTimeout(() => {
            try {
              galleryPlayer.playIndex(idx, { userTriggered: true });
              // ensure overlays shown briefly then hide
              galleryPlayer._showGalleryOverlayTransient?.();
            } catch (e) {}
          }, 120);
        } else {
          // video id not found in this category -> do nothing special, maybe navigate fallback
        }
      } else {
        // normal category view: start autoplay behavior (first video)
        // set manual=false to allow autoplay
        galleryPlayer.isManual = false;
        // play first after slight delay so DOM finishes
        setTimeout(() => {
          try {
            galleryPlayer.playIndex(0);
          } catch (e) {}
        }, 120);
      }

      // // Focus first grid item visually (for keyboard)
      // setTimeout(() => focusGridItem(galleryGrid, 0), 60);
    }

    // determine initial category to render:
    let initialCategory = CATEGORIES[0];
    if (hashInfo.category) {
      // try to match a category (case-sensitive as your data uses)
      if (CATEGORIES.includes(hashInfo.category)) initialCategory = hashInfo.category;
      else {
        // try case-insensitive match
        const found = CATEGORIES.find(c => c.toLowerCase() === (hashInfo.category || '').toLowerCase());
        if (found) initialCategory = found;
      }
    } else {
      const activeBtn = catList.querySelector('button.active');
      if (activeBtn) initialCategory = activeBtn.getAttribute('data-category') || CATEGORIES[0];
    }

    // set initial button active visually
    setTimeout(() => {
      const btnToFocus = catList.querySelector(`button[data-category="${initialCategory}"]`) || catList.querySelector('button');
      if (btnToFocus) { try { btnToFocus.focus({ preventScroll: true }); } catch(e) { btnToFocus.focus(); } }
    }, 40);

    // render initial category with hash-driven options
    if (hashInfo.video) {
      // render category but start specific video (no autoplay)
      renderCategory(initialCategory, { startVideoId: hashInfo.video, fromHash: true });
    } else {
      renderCategory(initialCategory, { fromHash: !!hashInfo.category });
    }
  }

  /* ---------------- populateGrid (preview logic) ---------------- */
  function populateGrid(container, category) {
    stopAllPreviewsExcept(null);
    container.innerHTML = '';
    const items = Array.isArray(VIDEOS) ? VIDEOS.filter(v => v.category === category) : [];
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
        if (galleryPlayer) {
          galleryPlayer.isManual = true;
          galleryPlayer.playIndex(idx, { userTriggered: true });
        }
        focusGridItem(container, idx);
        // update URL hash to reflect selection
        const cat = category || '';
        const newHash = `#${encodeURIComponent(cat)}/${encodeURIComponent(v.id)}`;
        history.replaceState(null, '', location.pathname.replace(/\/+$/, '') + newHash);
      });

      // expose data-id for linking from home carousel
      btn.setAttribute('data-id', v.id);
      btn.setAttribute('data-index', idx);

      container.appendChild(btn);
    });

    // setTimeout(() => focusGridItem(container, 0), 40);
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

  log('main.js ready — HLS + MP4 fallback, unified gallery overlay, URL-driven gallery behavior.');
})();
