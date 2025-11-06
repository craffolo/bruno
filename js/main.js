// js/main.js — Vimeo-only (WITHOUT video arrays)
// Assunzione: include <script src="https://player.vimeo.com/api/player.js"></script> prima di questo file.

(() => {
  /* ---------------- CONFIG / TIMINGS ---------------- */
  const GALLERY_AUTOPLAY_INTERVAL_MS = 5000;
  const MOUSE_IDLE_MS = 1600;
  const MOBILE_OVERLAY_TIMEOUT_MS = 1600;

  // behavior flags (modifica se vuoi)
  const USE_VIMEO_OVERLAY = false;
  const ADAPT_ASPECT_RATIO = false;
  const MAX_PLAYER_HEIGHT_PX = 700;          // max height allowed when adapting to video's aspect
  const ASPECT_RATIO_TRANSITION_MS = 2000;
  const AUTOPLAY_FIXED_HEIGHT_PX = 500;      // fixed height while autoplaying
  const AUTOPLAY_PRELOAD_ENABLED = true;     // preload/back-play during autoplay for smooth cut

  // Scroll-to-player toggles (user asked for desktop/mobile options)
  const SCROLL_TO_PLAYER_MOBILE = true;
  const SCROLL_TO_PLAYER_DESKTOP = true;

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
  function escapeHtml(str) { return String(str||'').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }
  function isMobileDevice() { return ('ontouchstart' in window) && /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent); }

  async function safePlay(player, timeoutMs = 1200) {
    if (!player || typeof player.play !== 'function') return;
    try {
      await Promise.race([
        player.play(),
        new Promise(r => setTimeout(r, timeoutMs))
      ]);
    } catch (e) {
      const msg = String((e && (e.name || e.message)) || '');
      if (/PlayInterrupted|The play\(\) request was interrupted|AbortError/i.test(msg)) return;
      console.warn('[vimeo] play failed', e);
    }
  }

  /* ---------------- SESSION (filters, video, mute) ---------------- */
  const SESSION_FILTERS_KEY = 'gallery_last_filters';
  const SESSION_VIDEO_KEY = 'gallery_last_video';
  const MUTE_KEY = 'site_mute_pref';
  function saveSessionFilters(arr){ try{ sessionStorage.setItem(SESSION_FILTERS_KEY, (Array.isArray(arr)?arr.join(','):(arr||''))); }catch(e){} }
  function readSessionFilters(){ try{ const v=sessionStorage.getItem(SESSION_FILTERS_KEY); return v ? v.split(',').map(s=>s.trim()).filter(Boolean) : null; }catch(e){return null;} }
  function saveSessionVideo(vid){ try{ sessionStorage.setItem(SESSION_VIDEO_KEY, vid || ''); }catch(e){} }
  function readSessionVideo(){ try{ return sessionStorage.getItem(SESSION_VIDEO_KEY) || null; }catch(e){return null;} }
  function readMute(){ try{ return localStorage.getItem(MUTE_KEY) === '1'; }catch(e){ return true; } }
  function writeMute(v){ try{ localStorage.setItem(MUTE_KEY, v ? '1' : '0'); }catch(e){} }

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
    if (!mobileDropdown) { mobileDropdown = create('div',{id:'mobileDropdown',class:'mobile-dropdown'},''); document.body.appendChild(mobileDropdown); }
    mobileDropdown.innerHTML = '';
    Array.from(navList.children).forEach(li => {
      const a = li.firstElementChild.cloneNode(true);
      a.classList.add('mobile-link');
      a.addEventListener('click', () => { mobileDropdown.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); });
      mobileDropdown.appendChild(a);
    });
    navToggle.addEventListener('click', (e) => { e.stopPropagation(); const isOpen = mobileDropdown.classList.toggle('open'); navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false'); });
    document.addEventListener('click', (e) => {
      if (!mobileDropdown.classList.contains('open')) return;
      if (!e.target.closest('#mobileDropdown') && !e.target.closest('#navToggle')) { mobileDropdown.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); }
    });
  }

  /* ------------- HomeCarousel  --------------- */
  class HomeCarousel {
    constructor(opts) {
      this.container = opts.container;
      this.slides = opts.slides || [];
      this.iframeA = this.container.querySelector('.layer-a');
      this.iframeB = this.container.querySelector('.layer-b');
      this.bottomOverlay = this.container.querySelector('.home-carousel-bottom') || null;
      this.front = 'A';
      this.players = { A: null, B: null };
      this.index = 0;
      this.timer = null;
      this._onEnded = this._onEnded.bind(this);

      // if (!this.slides.length && Array.isArray(VIDEOS) && VIDEOS.length) {
      //   this.slides = VIDEOS.slice(0, Math.min(5, VIDEOS.length));
      // }

      // if (this.slides.length) this._loadInitial();

      this._init();
    }

    _init() {
      if (!this.bottomOverlay) {
        this.bottomOverlay = create('div', { class: 'home-carousel-bottom' }, '');
        this.container.appendChild(this.bottomOverlay);
      }
      this._renderOverlay('', '');

      // overlay click -> navigate to gallery + category/video hash
      this.bottomOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
        const meta = this.slides[this.index];
        if (!meta) return;
        const targetHash = meta.galleryId ? `#${encodeURIComponent(meta.category || '')}/${encodeURIComponent(meta.galleryId)}` : `#${encodeURIComponent(meta.category || '')}`;
        // navigate to gallery route — let router / caddy handle pretty urls
        location.href = '/gallery' + targetHash;
      });

      this._loadInitial();
    }

    _getFrontIframe(){ return (this.front === 'A') ? this.iframeA : this.iframeB; }
    _getBackIframe(){ return (this.front === 'A') ? this.iframeB : this.iframeA; }
    _getFrontPlayer(){ return (this.front === 'A') ? this.players.A : this.players.B; }
    _getBackPlayer(){ return (this.front === 'A') ? this.players.B : this.players.A; }

    async _loadInitial() {
      const currVideo = this.slides[this.index];
      const nextVideo = this.slides[(this.index + 1) % this.slides.length];
      const currentVideoId = currVideo.vimeoId || currVideo.id;
      if (!currentVideoId) { console.warn(`[HomeCarousel] ${this.index} slide without vimeoId`); return; }
      const nextVideoId = nextVideo.vimeoId || nextVideo.id;
      if (!nextVideoId) { console.warn(`[HomeCarousel] ${this.index + 1} slide without vimeoId`); return; }
      const params = new URLSearchParams({
        autopause: '0',
        autoplay: '1',
        muted: '1',
        playsinline: '1',
        controls: '0',
        title: '0',
        byline: '0',
        portrait: '0'
      }).toString();
      const url = `https://player.vimeo.com/video/${encodeURIComponent(currentVideoId)}?${params}`;
      const nextUrl = `https://player.vimeo.com/video/${encodeURIComponent(nextVideoId)}?${params}`;

      // destroy previous players if exist
      if (this.players.A) {
        try { await this.players.A.unload(); } catch(e){} this.players.A = null;
      }

      if (this.players.B) {
        try { await this.players.B.unload(); } catch(e){} this.players.B = null;
      }

      // set iframes
      try {
        this.iframeA.src = url;
        this.iframeA.style.opacity = 1;
        this.iframeA.style.zIndex = 3;
        this.iframeA.style.pointerEvents = 'none';
      } catch(e){ console.warn('[vimeo] iframe A set src failed', e); }

      try {
        this.iframeB.src = nextUrl;
        this.iframeB.style.opacity = 0;
        this.iframeB.style.zIndex = 4;
        this.iframeB.style.pointerEvents = 'none';
      } catch(e){ console.warn('[vimeo] iframe B set src failed', e); }

      // create vimeo players
      let frontPlayer = null;
      try {
        frontPlayer = new Vimeo.Player(this.iframeA);
        this.players.A = frontPlayer;
      } catch(e){ console.warn('[vimeo] playerA create failed', e); this.players.A = null; }

      let backPlayer = null;
      try {
        backPlayer = new Vimeo.Player(this.iframeB);
        this.players.B = backPlayer;
      } catch(e){ console.warn('[vimeo] playerB create failed', e); this.players.B = null; }

      // wait for ready (with timeout)
      let frontReady = false;
      try {
        await Promise.race([
          frontPlayer && frontPlayer.ready ? frontPlayer.ready() : Promise.resolve(),
          new Promise(r => setTimeout(r, 2200))
        ]);
        frontReady = true;
      } catch(e){ frontReady = false; }

      let backReady = false;
      try {
        await Promise.race([
          backPlayer && backPlayer.ready ? backPlayer.ready() : Promise.resolve(),
          new Promise(r => setTimeout(r, 2200))
        ]);
        backReady = true;
      } catch(e){ backReady = false; }

      // play front player
      try { await frontPlayer.play().catch((e)=>{ console.warn('front play failed', e); }); } catch(e){ console.warn('front play failed', e); }
      // try { await safePlay(frontPlayer); } catch(e){ console.warn('front play failed', e); }
      this._renderOverlay(currVideo.title || '', currVideo.desc || '');

      // pause back player
      try { await backPlayer.pause().catch((e)=>{ console.warn('back pause failed', e); }); } catch(e){ console.warn('back pause failed', e); }

      // advances when video end
      frontPlayer.on('ended', this._onEnded);
    }

    async _switchIframes() {
      let frontIframe = this._getFrontIframe();
      let backIframe = this._getBackIframe();
      let frontPlayer = this._getFrontPlayer();
      let backPlayer = this._getBackPlayer();
      let currVideo;
      let back = (this.front === 'A') ? 'B' : 'A';

      // Remove old listener first
      try {
        frontPlayer.off('ended', this._onEnded);
      } catch(e) {}

      // switch z-index + opacity
      try {
        frontIframe.style.opacity = 0;
        frontIframe.style.zIndex = 4;
        backIframe.style.opacity = 1;
        backIframe.style.zIndex = 3;
      } catch(e){ console.warn('switch iframes failed', e); }

      // swap marker
      this.front = back;
      back = (this.front === 'A') ? 'B' : 'A';
      frontIframe = this._getFrontIframe();
      backIframe = this._getBackIframe();
      frontPlayer = this._getFrontPlayer();
      backPlayer = this._getBackPlayer();

      // advance index
      this.index = (this.index + 1) % this.slides.length;
      currVideo = this.slides[this.index];

      // play new front player
      try { await frontPlayer.play().catch((e)=>{ console.warn('new front play failed', e); }); } catch(e){ console.warn('new front play failed', e); }
      // try { await safePlay(frontPlayer); } catch(e){ console.warn('new front play failed', e); }
      this._renderOverlay(currVideo.title || '', currVideo.desc || '');

      // destroy previous back player instance if exists
      // if (backPlayer) {
      //   try { await backPlayer.unload(); } catch(e){}  backPlayer = null;
      // }

      setTimeout(async ()=> {
        try {
          if (backPlayer) { await backPlayer.unload(); backPlayer = null; }
          else if (backIframe) { try { backIframe.removeAttribute('src'); } catch(e){} }
        } catch(e){}
      }, 300);

      // set backIframe src to next video
      const nextIndex = (this.index + 1) % this.slides.length;
      const nextVideo = this.slides[nextIndex];
      const nextVideoId = nextVideo.vimeoId || nextVideo.id;
      const params = new URLSearchParams({
        autopause: '0',
        autoplay: '1',
        muted: '1',
        playsinline: '1',
        controls: '0',
        title: '0',
        byline: '0',
        portrait: '0'
      }).toString();
      const nextUrl = `https://player.vimeo.com/video/${encodeURIComponent(nextVideoId)}?${params}`;

      try {
        backIframe.src = nextUrl;
      } catch(e){ console.warn('[vimeo] iframe B set src failed', e); }

      // create back player
      let newBackPlayer = null;
      try {
        newBackPlayer = new Vimeo.Player(backIframe);
      } catch(e){ console.warn('[vimeo] playerB create failed', e); this.newBackPlayer = null; }

      // wait for ready (with timeout)
      let backReady = false;
      try {
        await Promise.race([
          newBackPlayer && newBackPlayer.ready ? newBackPlayer.ready() : Promise.resolve(),
          new Promise(r => setTimeout(r, 2200))
        ]);
        backReady = true;
      } catch(e){ backReady = false; }

      // pause back player
      try { await newBackPlayer.pause(); } catch(e){ console.warn('back pause failed', e); }

      // try {
      //   backPlayer = new Vimeo.Player(backIframe);
      //   // Wait for back player to be ready before trying to pause it
      //   await Promise.race([
      //     backPlayer.ready(),
      //     new Promise(r => setTimeout(r, 2200))
      //   ]);
      //   // Now that it's ready, we can pause it
      //   await backPlayer.pause();
      // } catch(e){ 
      //   console.warn('[vimeo] playerB create/pause failed', e); 
      //   this.backPlayer = null; 
      // }

      // advances when video end
      frontPlayer.on('ended', this._onEnded);

      // Add listener to new front player at the end
      // const newFrontPlayer = this._getFrontPlayer();
      // if (newFrontPlayer) {
      //     try {
      //         newFrontPlayer.on('ended', this._onEnded);
      //     } catch(e) {}
      // }
    }

    _renderOverlay(title = '', desc = '') {
      this.bottomOverlay.innerHTML = `
        <div class="hc-meta">
          <div class="hc-title">${escapeHtml(title || '')}</div>
          ${ desc ? `<div class="hc-desc">${escapeHtml(desc)}</div>` : '' }
        </div>
      `;
    }

    // async _advanceOnEnd() {
    //   if (!this.slides.length) return;
    //   const nextIndex = (this.index + 1) % this.slides.length;
    //   const meta = this.slides[nextIndex];
    //   if (!meta) return;
    //   const active = this.active === 'A' ? this.layerA : this.layerB;
    //   const inactive = this.active === 'A' ? this.layerB : this.layerA;
    //   const url = meta.hls || meta.mp4 || meta.src || '';
    //   await attachSource(inactive, url);
    //   try { inactive.currentTime = 0; inactive.muted = true; inactive.play().catch(()=>{}); } catch(e){}
    //   try { active.pause(); active.currentTime = 0; } catch(e){}
    //   active.classList.remove('active'); active.classList.add('inactive');
    //   inactive.classList.remove('inactive'); inactive.classList.add('active');
    //   this.active = this.active === 'A' ? 'B' : 'A';
    //   this.index = nextIndex;
    //   this._renderOverlay(meta.title || '', meta.desc || '');
    //   // prefetch next
    //   const nxt2 = (this.index + 1) % this.slides.length;
    //   const preUrl = (this.slides[nxt2] && (this.slides[nxt2].hls || this.slides[nxt2].mp4 || this.slides[nxt2].src)) || '';
    //   const preLayer = (this.active === 'A') ? this.layerB : this.layerA;
    //   setTimeout(()=> { attachSource(preLayer, preUrl).catch(()=>{}); }, 600);
    // }

    _onEnded() {
      // Non-recursive handler
      this._switchIframes().catch(e => console.warn('switch failed', e));
    }

    destroy() {
      try { if (this.players.A) { this.players.A.unload(); this.players.A=null; } } catch(e){}
      try { if (this.players.B) { this.players.B.unload(); this.players.B=null; } } catch(e){}
    }
  }

  /* ---------------- GalleryPlayer (Vimeo) - improvements for stability ---------------- */
  class GalleryPlayer {
    constructor(opts) {
      this.container = opts.container;
      this.playerWrap = this.container.querySelector('.gallery-player') || this.container;
      this.iframeA = this.playerWrap.querySelector('.gallery-iframe.layer-a');
      this.iframeB = this.playerWrap.querySelector('.gallery-iframe.layer-b');
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
      this.front = 'A';
      this.players = { A: null, B: null };
      this.isManual = false;
      this.autoplayTimer = null;
      this._overlayTimer = null;

      this._init();
    }

    _init() {
      this._ensureIframes();
      this.playerWrap.style.position = 'relative';
      this.playerWrap.style.overflow = 'hidden';
      // set initial fixed autoplay height to avoid layout jumps
      this._setAutoplayFixedHeight(true);

      this._wireControls();
      this._ensureOverlayInsidePlayer();
      this._showGalleryOverlayTransient();

      // pointermove listeners, and click-to-toggle (exclude controls)
      this.playerWrap.addEventListener('pointermove', this._onPointerMove.bind(this), { passive: true });
      this.playerWrap.addEventListener('pointerenter', this._onPointerMove.bind(this), { passive: true });
      this.playerWrap.addEventListener('pointerleave', ()=> this._startOverlayHideTimer());
      this.playerWrap.addEventListener('click', this._onPlayerClick.bind(this));
      this._bindProgressControls();
    }

    _ensureIframes() {
      if (!this.iframeA) { this.iframeA = create('iframe', { class:'gallery-iframe layer-a', frameborder:'0', allow:'autoplay; fullscreen', allowfullscreen:'' }); this.playerWrap.appendChild(this.iframeA); }
      if (!this.iframeB) { this.iframeB = create('iframe', { class:'gallery-iframe layer-b', frameborder:'0', allow:'autoplay; fullscreen', allowfullscreen:'' }); this.playerWrap.appendChild(this.iframeB); }
      [this.iframeA,this.iframeB].forEach(iframe => {
        iframe.style.position='absolute'; iframe.style.inset='0'; iframe.style.width='100%'; iframe.style.height='100%'; iframe.style.border='0'; iframe.style.background='black'; iframe.style.transition='opacity .08s linear';
      });
      this.iframeA.style.zIndex = 2; this.iframeB.style.zIndex = 1; this.iframeA.style.opacity = 1; this.iframeB.style.opacity = 0;
    }

    _ensureOverlayInsidePlayer() {
      // move overlay parts into playerWrap so they don't overlay entire page
      if (!this.playerWrap.querySelector('.gallery-overlay')) {
        const galleryOverlay = create('div',{class:'gallery-overlay'},'');
        galleryOverlay.style.position='absolute'; galleryOverlay.style.inset='0'; galleryOverlay.style.pointerEvents='none';
        const top = this.container.querySelector('.top-overlay'); const play = this.container.querySelector('.play-overlay'); const bottom = this.container.querySelector('.bottom-overlay'); const bar = this.container.querySelector('.progress-wrap');
        if (top) { top.style.pointerEvents='auto'; galleryOverlay.appendChild(top); }
        if (play) { play.style.pointerEvents='auto'; galleryOverlay.appendChild(play); }
        if (bottom) { bottom.style.pointerEvents='auto'; galleryOverlay.appendChild(bottom); }
        if (bar) { bar.style.pointerEvents='auto'; galleryOverlay.appendChild(bar); }
        this.playerWrap.appendChild(galleryOverlay);
      } else {
        // ensure interactive children keep pointer-events auto
        this.playerWrap.querySelectorAll('.top-btn, .mute-btn, .fs-btn, .control-btn, .progress-wrap, .play-overlay').forEach(el => el.style.pointerEvents = 'auto');
      }
    }

    _showGalleryOverlayTransient() { this._showGalleryOverlay(); this._startOverlayHideTimer(); }
    _showGalleryOverlay() { const g = this.playerWrap.querySelector('.gallery-overlay'); if (!g) return; g.classList.add('visible'); if (this.playOverlay) this.playOverlay.style.opacity='1'; if (this.topOverlay) this.topOverlay.style.opacity='1'; if (this.bottomOverlay) this.bottomOverlay.style.opacity='1'; }
    _hideGalleryOverlay() { const g = this.playerWrap.querySelector('.gallery-overlay'); if (!g) return; g.classList.remove('visible'); if (this.playOverlay) this.playOverlay.style.opacity='0'; if (this.topOverlay) this.topOverlay.style.opacity='0'; if (this.bottomOverlay) this.bottomOverlay.style.opacity='0'; }
    _startOverlayHideTimer(timeout = MOUSE_IDLE_MS) { if (this._overlayTimer) { clearTimeout(this._overlayTimer); this._overlayTimer = null; } const useTimeout = isMobileDevice() ? MOBILE_OVERLAY_TIMEOUT_MS : timeout; this._overlayTimer = setTimeout(()=>{ this._hideGalleryOverlay(); this._overlayTimer = null; }, useTimeout); }
    _onPointerMove(){ this._showGalleryOverlay(); if (this._overlayTimer) { clearTimeout(this._overlayTimer); this._overlayTimer=null; } this._startOverlayHideTimer(); }

    _wireControls() {
      if (this.prevBtn) this.prevBtn.addEventListener('click', e => { e.stopPropagation(); this._onUserInteraction(); this.prev(true); });
      if (this.nextBtn) this.nextBtn.addEventListener('click', e => { e.stopPropagation(); this._onUserInteraction(); this.next(true); });
      const topMute = this.container.querySelector('.top-overlay .mute-btn');
      if (topMute) topMute.addEventListener('click', (e) => { e.stopPropagation(); e.preventDefault(); const muted = !readMute(); writeMute(muted); this.updateMuteButton(); this._applyMuteToPlayers(); });
      const fsBtn = this.container.querySelector('.top-overlay .fs-btn');
      if (fsBtn) fsBtn.addEventListener('click', (e) => { e.stopPropagation(); try { const iframe = this._getFrontIframe(); if (iframe && iframe.requestFullscreen) iframe.requestFullscreen().catch(()=>{}); } catch(e){} setTimeout(()=> {}, 200); });
      this.updateMuteButton();
    }

    _onUserInteraction() {
      // Se siamo già in manuale non riattivare tutto
      // if (this.isManual) return;

      // setta manual mode: blocca autoplay, abilita aspect ratio
      this.isManual = true;
      this.clearAutoplay();
      log('[gallery] user interaction -> manual mode (aspect-ratio ON)');

      // rimuovi l'altezza fissa da autoplay così l'elemento può adattarsi
      // this._setAutoplayFixedHeight(false);

      // applica aspect-ratio al video corrente (in modo smooth)
      // usiamo timeout minimo per lasciare a DOM il tempo di aggiornare
      if (ADAPT_ASPECT_RATIO){
        this._setAutoplayFixedHeight(false);
        setTimeout(() => {
          this._adaptAspectRatioToCurrentVideo(ASPECT_RATIO_TRANSITION_MS).catch(()=>{});
        }, 60);
      }
    }


    updateMuteButton(){ const muted = readMute(); const btn = this.container.querySelector('.top-overlay .mute-btn'); if (btn) { btn.classList.toggle('muted', !!muted); btn.setAttribute('aria-pressed', muted ? 'true' : 'false'); } }
    _applyMuteToPlayers(){
      const muted = readMute();
      ['A','B'].forEach(k => {
        const p = this.players[k];
        if (p && typeof p.setVolume === 'function') {
          try { p.setVolume(muted ? 0 : 1).catch(()=>{}); } catch(e){}
        }
      });
    }

    clearAutoplay(){ if (this.autoplayTimer) { clearInterval(this.autoplayTimer); this.autoplayTimer = null; } }
    resetAutoplay(){ this.clearAutoplay(); if (this.isManual) return; this.autoplayTimer = setInterval(()=> this.next(false), GALLERY_AUTOPLAY_INTERVAL_MS); }

    setSlides(slides) {
      this.slides = slides || [];
      this.currentIndex = 0;
      this.isManual = false;
      this._setAutoplayFixedHeight(true);
      this.resetAutoplay();
    }

    prev(userTriggered=false){ if(!this.slides.length) return; const nextIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length; this.playIndex(nextIndex, { userTriggered, autoplay: true }); }
    next(userTriggered=false){ 
      if(!this.slides.length) return; 
      const nextIndex = (this.currentIndex + 1) % this.slides.length; 
      this.playIndex(nextIndex, { userTriggered, autoplay: true, next: true }); 
    }

    async playIndex(i, opts={}) {
      if (!this.slides || !this.slides.length) return;
      i = (i + this.slides.length) % this.slides.length;
      const meta = this.slides[i];
      if (!meta) return;
      if (opts.userTriggered) this._onUserInteraction();

      const shouldScroll = !!(opts.userTriggered || this.isManual);
      // keep fixed height in autoplay
      if (!this.isManual) this._setAutoplayFixedHeight(true);

      try {
        await this._playIndexVimeo(i, meta, opts);
      } catch(e){ console.warn('[gallery] playIndex error', e); }

      this.currentIndex = i;
      try { saveSessionVideo(meta.id || meta.vimeoId || ''); } catch(e){}
      // update url/hash & highlight
      try {
        const selectedCats = getSelectedFiltersFromUI();
        const params = new URLSearchParams();
        if (selectedCats && selectedCats.length) params.set('cats', selectedCats.join(','));
        params.set('video', meta.id || meta.vimeoId || '');
        const newHash = params.toString();
        history.replaceState(null, '', location.pathname.replace(/\/+$/, '') + (newHash ? ('#' + newHash) : ''));
        this._highlightGridItem(this.currentIndex);
      } catch(e){}

      // scroll if user-triggered and enabled
      if (shouldScroll && ((isMobileDevice() && SCROLL_TO_PLAYER_MOBILE) || (!isMobileDevice() && SCROLL_TO_PLAYER_DESKTOP))) {
        try {
          const playerWrap = document.querySelector('.category-nav') || document.querySelector('#galleryCarouselSection .gallery-player');
          if (playerWrap && typeof playerWrap.scrollIntoView === 'function') setTimeout(()=> playerWrap.scrollIntoView({ behavior:'smooth', block:'start' }), 80);
        } catch(e){}
      }
      this.resetAutoplay();
    }

    _getFrontIframe(){ return (this.front === 'A') ? this.iframeA : this.iframeB; }
    _getBackIframe(){ return (this.front === 'A') ? this.iframeB : this.iframeA; }
    _getFrontPlayer(){ return (this.front === 'A') ? this.players.A : this.players.B; }
    _getBackPlayer(){ return (this.front === 'A') ? this.players.B : this.players.A; }

    async _playIndexVimeo(i, meta, opts={}) {
      if (!window.Vimeo || typeof window.Vimeo.Player !== 'function') { console.warn('[vimeo] Player API missing'); return; }

      const backIframe = this._getBackIframe();
      const frontIframe = this._getFrontIframe();
      const backKey = (this.front === 'A') ? 'B' : 'A';
      const frontKey = this.front;
      const vId = meta.vimeoId || meta.id || meta.vimeo_id;
      if (!vId) { console.warn('[vimeo] missing id'); return; }

      const params = new URLSearchParams({
        next: (opts.next === true) ? '1' : '0',
        autoplay: (opts.autoplay === false) ? '0' : '1',
        muted: '1', // start muted to satisfy autoplay policies; we'll apply user's volume after ready
        playsinline: '1',
        controls: USE_VIMEO_OVERLAY ? '1' : '0',
        title: USE_VIMEO_OVERLAY ? '1' : '0',
        byline: USE_VIMEO_OVERLAY ? '1' : '0',
        portrait: USE_VIMEO_OVERLAY ? '1' : '0'
      }).toString();
      const url = `https://player.vimeo.com/video/${encodeURIComponent(vId)}?${params}`;
      
      // play next is already loaded
      // if (!opts.next) {
        // set src on back iframe to begin loading
        try {
          backIframe.src = url;
          backIframe.style.opacity = 0;
          backIframe.style.zIndex = 4;
          backIframe.style.pointerEvents = USE_VIMEO_OVERLAY ? '' : 'none';
        } catch(e){ console.warn('[vimeo] set src failed', e); }

        // destroy previous back player instance if exists
        if (this.players[backKey]) {
          try { await this.players[backKey].unload(); } catch(e){} this.players[backKey] = null;
        }

        // create new Vimeo.Player on back iframe
        let backPlayer = null;
        try {
          backPlayer = new Vimeo.Player(backIframe);
          this.players[backKey] = backPlayer;
        } catch(e){ console.warn('[vimeo] player create failed', e); this.players[backKey] = null; }
      // }

      // wait for ready (with timeout)
      let ready = false;
      try {
        await Promise.race([
          backPlayer && backPlayer.ready ? backPlayer.ready() : Promise.resolve(),
          new Promise(r => setTimeout(r, 2200))
        ]);
        ready = true;
      } catch(e){ ready = false; }

      // set volume according to user pref (muted if pref true)
      try {
        const mutedPref = readMute();
        if (backPlayer && typeof backPlayer.setVolume === 'function') {
          await backPlayer.setVolume(mutedPref ? 0 : 1).catch(()=>{});
        }
      } catch(e){}

      // if autoplay/preload enabled and not manual: try to play muted to buffer
      // if (AUTOPLAY_PRELOAD_ENABLED && !this.isManual && backPlayer && typeof backPlayer.play === 'function') {
        // try { await backPlayer.play().catch(()=>{}); } catch(e){}
      // }

      // attach listeners to front player later; ensure progress updates are tied to front player
      const attachFrontListeners = async (playerInstance, key) => {
        try {
          if (!playerInstance) return;
          // remove existing listeners by cloning? Vimeo doesn't provide .off reliably in all builds. We'll safe-guard by tracking local handlers if needed.
          playerInstance.on('timeupdate', (data) => {
            try {
              const front = this._getFrontPlayer();
              if (!front) return;
              front.getDuration().then(dur => {
                if (!dur) return;
                front.getCurrentTime().then(cur => {
                  if (this.progressBar) {
                    const pct = (cur / dur) * 100;
                    this.progressBar.style.width = Math.max(0, Math.min(100, pct)) + '%';
                    this.progressBar.setAttribute('aria-valuenow', String(Math.round(Math.max(0, Math.min(100, pct)))));
                  }
                }).catch(()=>{});
              }).catch(()=>{});
            } catch(e){}
          });
          playerInstance.on('ended', () => { if (!this.isManual) this.next(false); });
        } catch(e){}
      };

      // perform cut: reveal back iframe and hide front iframe (no crossfade)
      try {
        // ensure transitions are disabled for instant cut
        backIframe.style.transition = 'none';
        frontIframe && (frontIframe.style.transition = 'none');

        // make back visible
        backIframe.style.opacity = 1;
        backIframe.style.zIndex = 3;
        if (frontIframe) { frontIframe.style.opacity = 0; frontIframe.style.zIndex = 2; }

        // briefly show overlay
        try {
          this._showGalleryOverlay();
          if (this._overlayTimer) clearTimeout(this._overlayTimer);
          this._overlayTimer = setTimeout(()=>{ this._hideGalleryOverlay(); this._overlayTimer = null; }, 1200);
        } catch(e){}

        // schedule unloading previous front player
        setTimeout(async ()=> {
          try {
            if (this.players[frontKey]) { await this.players[frontKey].unload(); this.players[frontKey] = null; }
            else if (frontIframe) { try { frontIframe.removeAttribute('src'); } catch(e){} }
          } catch(e){}
        }, 300);
      } catch(e){ console.warn('[vimeo] cut error', e); }

      // swap marker
      this.front = backKey;

      // // preload next 
      // try {
      //   nextUrl = this.slides[i+1].vimeoId;
      //   try {
      //     backIframe.src = nextUrl;
      //     backIframe.style.opacity = 0;
      //     backIframe.style.zIndex = 4;
      //     backIframe.style.pointerEvents = USE_VIMEO_OVERLAY ? '' : 'none';
      //   } catch(e){ console.warn('[vimeo] set next src failed', e); }

      //   // destroy previous back player instance if exists
      //   if (this.players[backKey]) {
      //     try { await this.players[backKey].unload(); } catch(e){} this.players[backKey] = null;
      //   }

      //   // create new Vimeo.Player on back iframe
      //   let backPlayer = null;
      //   try {
      //     backPlayer = new Vimeo.Player(backIframe);
      //     this.players[backKey] = backPlayer;
      //   } catch(e){ console.warn('[vimeo] next player create failed', e); this.players[backKey] = null; }
      // } catch(e){}

      // set front player's controls: assign players[frontKey] reference if not set
      // If we created backPlayer above it's already assigned; ensure event listeners for progress/ended
      try {
        const frontPlayer = this._getFrontPlayer();
        if (frontPlayer) await attachFrontListeners(frontPlayer, this.front);
      } catch(e){}

      // ensure custom title shown
      this._syncTitle(meta.title || '');

      // after cut ensure volume matches user preference
      try {
        const frontPlayer = this._getFrontPlayer();
        if (frontPlayer && typeof frontPlayer.setVolume === 'function') await frontPlayer.setVolume(readMute() ? 0 : 1).catch(()=>{});
      } catch(e){}
    }

    _syncTitle(t) { if (this.titleEl) this.titleEl.textContent = t || ''; }

    /* aspect ratio handling */
    _setAutoplayFixedHeight(enable) {
      try {
        if (enable) {
          this.playerWrap.style.height = AUTOPLAY_FIXED_HEIGHT_PX + 'px';
          this.playerWrap.style.maxHeight = MAX_PLAYER_HEIGHT_PX + 'px';
        } else {
          this.playerWrap.style.height = '';
          this.playerWrap.style.maxHeight = '';
        }
      } catch(e){}
    }

    async _adaptAspectRatioToCurrentVideo(ms = ASPECT_RATIO_TRANSITION_MS) {
      try {
        const p = this._getFrontPlayer();
        if (!p || typeof p.getVideoWidth !== 'function') return;
        const [w,h] = await Promise.all([p.getVideoWidth(), p.getVideoHeight()]);
        if (w && h) {
          const ratio = w/h;
          const parentWidth = this.playerWrap.clientWidth || this.playerWrap.getBoundingClientRect().width || 960;
          let newHeight = Math.min(MAX_PLAYER_HEIGHT_PX, Math.round(parentWidth / ratio));
          this.playerWrap.style.transition = `height ${ms}ms ease`;
          this.playerWrap.style.height = newHeight + 'px';
          setTimeout(()=> { this.playerWrap.style.transition = 'height ${ms}ms ease'; }, ms + 30);
        }
      } catch(e){ console.warn('[aspect] adapt failed', e); }
    }

    _highlightGridItem(index) {
      try {
        const grid = document.getElementById('galleryGrid');
        if (!grid) return;
        grid.querySelectorAll('.is-current').forEach(el => el.classList.remove('is-current'));
        const item = grid.querySelector(`[data-index="${index}"]`);
        if (item) item.classList.add('is-current');
      } catch(e){}
    }

    destroy() {
      this.clearAutoplay();
      try { if (this.players.A) { this.players.A.unload(); this.players.A=null; } } catch(e){}
      try { if (this.players.B) { this.players.B.unload(); this.players.B=null; } } catch(e){}
      if (this._overlayTimer) { clearTimeout(this._overlayTimer); this._overlayTimer = null; }
    }

    /* progress interactions */
    _bindProgressControls() {
      const wrap = this.progressWrap;
      if (!wrap) return;
      wrap.addEventListener('click', (ev) => { ev.stopPropagation(); });

      let dragging = false, pointerId = null;
      const clamp = (v,a=0,b=1)=> Math.max(a,Math.min(b,v));
      const updateSeekFromEvent = (ev) => {
        const rect = wrap.getBoundingClientRect();
        const x = (ev.clientX || (ev.touches && ev.touches[0] && ev.touches[0].clientX) || 0) - rect.left;
        const frac = clamp(x / rect.width);
        const front = this._getFrontPlayer();
        if (!front) return;
        front.getDuration().then(dur => {
          if (dur > 0) {
            const t = frac * dur;
            front.setCurrentTime(t).catch(()=>{});
            if (this.progressBar) this.progressBar.style.width = (frac*100) + '%';
          }
        }).catch(()=>{});
      };

      wrap.addEventListener('pointerdown', (ev) => {
        ev.preventDefault && ev.preventDefault();
        ev.stopPropagation();
        dragging = true; pointerId = ev.pointerId; try { wrap.setPointerCapture && wrap.setPointerCapture(pointerId); } catch(e){}
        wrap.classList.add('dragging');
        this._onUserInteraction();
        this.clearAutoplay();
        updateSeekFromEvent(ev);
      }, { passive:false });

      wrap.addEventListener('pointermove', (ev) => { if (!dragging) return; updateSeekFromEvent(ev); }, { passive:true });
      const stopDrag = (ev) => {
        if (!dragging) return;
        dragging = false;
        try { wrap.releasePointerCapture && wrap.releasePointerCapture(pointerId); } catch(e){}
        wrap.classList.remove('dragging'); pointerId = null;
      };
      wrap.addEventListener('pointerup', (ev) => { ev.preventDefault && ev.preventDefault(); ev.stopPropagation(); stopDrag(ev); }, { passive:false });
      wrap.addEventListener('pointercancel', stopDrag);
      wrap.addEventListener('lostpointercapture', stopDrag);
    }

    /* click on player area toggles pause/play (except on controls) */
    async _onPlayerClick(ev) {
      // se click su controlli, ignora (già gestito)
      if (ev.target.closest('.progress-wrap') || ev.target.closest('.control-btn') || ev.target.closest('.top-btn')) return;

      // se non esiste player frontale -> skip
      const front = this._getFrontPlayer();
      if (!front) return;
      
      if (ADAPT_ASPECT_RATIO) {
        // SE eravamo in autoplay (non manuale) -> prima interazione: entra in manual mode ma NON mettere in pausa
        if (!this.isManual) {
          // this will set isManual, stop autoplay, apply aspect-ratio, and keep playing
          this._onUserInteraction();
          // show overlay briefly
          this._showGalleryOverlay();
          this._startOverlayHideTimer();
          return;
        }
      }


      // altrimenti (se già in manual mode) il comportamento è toggle pause/play come prima
      try {
        const paused = await front.getPaused().catch(()=>true);
        if (paused) {
          await front.play().catch(()=>{});
          this._showGalleryOverlay(); this._startOverlayHideTimer();
        } else {
          await front.pause().catch(()=>{});
          // mostra overlay pause
          if (this.playOverlay) { this.playOverlay.classList.add('paused'); this.playOverlay.style.display='flex'; this.playOverlay.style.opacity='1'; }
        }
        // segnala interazione manuale persistente
        // (non chiamiamo _onUserInteraction di nuovo perché già siamo in manual)
      } catch (e) {
        console.warn('[gallery] toggle play/pause failed', e);
      }
    }

  }

  /* ---------------- Grid & filters ---------------- */
  function getSelectedFiltersFromUI() {
    try {
      const catList = document.querySelector('#categoryList'); if (!catList) return [];
      return Array.from(catList.querySelectorAll('button.active')).map(b => b.getAttribute('data-category')).filter(Boolean);
    } catch(e){ return []; }
  }

  function focusGridItem(container, index = 0) {
    if (!container) return;
    const items = Array.from(container.querySelectorAll('.grid-item'));
    if (!items.length) return;
    const idx = Math.max(0, Math.min(index, items.length-1));
    items.forEach(it => it.classList.remove('is-current'));
    const target = items[idx];
    if (!target) return;
    target.classList.add('is-current');
    try { target.focus({ preventScroll:true }); } catch(e) { try{ target.focus(); }catch(e){} }
  }

  function populateGrid(container, categories = null) {
    container.innerHTML = '';
    const sel = Array.isArray(categories) ? categories.slice() : [];
    let items;
    if (!sel.length) items = Array.isArray(VIDEOS) ? VIDEOS.slice() : [];
    else items = Array.isArray(VIDEOS) ? VIDEOS.filter(v => normCategories(v).some(vc => sel.includes(vc))) : [];

    if (!items.length) { container.innerHTML = `<div style="padding:28px;color:var(--muted);text-align:center">Nessun video</div>`; return; }

    items.forEach((v, idx) => {
      const vidKey = v.id || v.vimeoId;
      const posterUrl = v.poster || (`media/posters/${vidKey}.jpg`);
      const btn = create('button', { class: 'grid-item', type: 'button', dataset: { id: vidKey, index: idx } });
      btn.innerHTML = `
        <div class="thumb" style="background-image:url('${escapeHtml(posterUrl)}'); background-size:cover; background-position:center; width:100%; height:140px;"></div>
        <div class="preview-info"><strong>${escapeHtml(v.title||'')}</strong></div>
        <div class="preview-info"><small>${escapeHtml(v.desc||'')}</small></div>
      `;
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const currentItems = (!sel.length) ? VIDEOS.slice() : VIDEOS.filter(vv => normCategories(vv).some(c => sel.includes(c)));
        const vidKeyLocal = v.id || v.vimeoId;
        const idxInSlides = currentItems.findIndex(s => (s.id || s.vimeoId) === vidKeyLocal);
        if (typeof window.galleryPlayer !== 'undefined' && window.galleryPlayer && idxInSlides >= 0) {
          window.galleryPlayer.isManual = true;
          window.galleryPlayer.playIndex(idxInSlides, { userTriggered: true, autoplay: true, forceResize: ADAPT_ASPECT_RATIO });
        }
        focusGridItem(container, idx);
        const cats = Array.isArray(sel) && sel.length ? sel.join(',') : '';
        const params = new URLSearchParams(); if (cats) params.set('cats', cats); params.set('video', vidKeyLocal);
        const newHash = params.toString();
        history.replaceState(null, '', location.pathname.replace(/\/+$/, '') + (newHash ? ('#' + newHash) : ''));
        try{ saveSessionFilters(sel || []); saveSessionVideo(vidKeyLocal); } catch(e){}
      });
      btn.setAttribute('data-id', vidKey);
      btn.setAttribute('data-index', idx);
      container.appendChild(btn);
    });
  }

  /* ---------------- Routing & init ---------------- */
  let galleryPlayer = null, homeCarousel = null;

  function parseGalleryHash() {
    const raw = (location.hash||'').replace(/^#/,'');
    if (!raw) return { categories:null, video:null };
    if (raw.includes('=')) {
      const params = new URLSearchParams(raw);
      const cats = params.get('cats') || params.get('categories') || params.get('category') || null;
      const video = params.get('video') || params.get('vid') || null;
      const catsArr = cats ? cats.split(',').map(s => decodeURIComponent(s).trim()).filter(Boolean) : null;
      return { categories: catsArr, video: video ? decodeURIComponent(video) : null };
    }
    if (raw.includes('/')) {
      const [catsPart,...rest] = raw.split('/');
      const video = rest.join('/');
      const catsArr = catsPart.includes(',') ? catsPart.split(',').map(s=>decodeURIComponent(s).trim()).filter(Boolean) : [decodeURIComponent(catsPart).trim()];
      return { categories: catsArr.filter(Boolean), video: decodeURIComponent(video||'').trim() || null };
    }
    const single = decodeURIComponent(raw);
    if (Array.isArray(VIDEOS) && VIDEOS.find(v => v.id === single || v.vimeoId === single)) return { categories:null, video:single };
    return { categories: [single], video: null };
  }

  function initHome(context=document) {
    const section = context.querySelector('#carouselSection');
    if (!section) return;
    let slides = Array.isArray(HOME_CAROUSEL) && HOME_CAROUSEL.length ? HOME_CAROUSEL.slice() : [];
    // if (!slides.length && Array.isArray(VIDEOS) && VIDEOS.length) slides.push(...VIDEOS.slice(0, Math.min(5, VIDEOS.length)));
    homeCarousel = new HomeCarousel({ container: section, slides });
  }

  function initGallery(context=document) {
    const catList = context.querySelector('#categoryList');
    const galleryGrid = context.querySelector('#galleryGrid');
    const section = context.querySelector('#galleryCarouselSection');
    if (!catList || !galleryGrid || !section) return;

    const hashInfo = parseGalleryHash();

    // categories as multi-select
    catList.innerHTML = '';
    CATEGORIES.forEach(category => {
      const li = create('li');
      const btn = create('button', { 'aria-pressed':'false', 'data-category':category }, category);
      btn.classList.add('category-item'); btn.setAttribute('role','button');
      btn.addEventListener('click', (e)=> {
        e.stopPropagation();
        const isActive = btn.classList.toggle('active');
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        const selected = Array.from(catList.querySelectorAll('button.active')).map(b => b.getAttribute('data-category')).filter(Boolean);
        try { saveSessionFilters(selected); saveSessionVideo(''); } catch(e){}
        const newHash = selected.length ? (`#${new URLSearchParams({cats:selected.join(',')}).toString()}`) : '';
        history.replaceState(null, '', location.pathname.replace(/\/+$/,'') + newHash);
        populateGrid(galleryGrid, selected);

        // recalc slides order (grid order)
        const newSlides = (selected && selected.length) ? VIDEOS.filter(v => normCategories(v).some(c => selected.includes(c))) : VIDEOS.slice();
        if (galleryPlayer) {
          galleryPlayer.setSlides(newSlides);
          const oldId = (galleryPlayer.slides && galleryPlayer.slides[galleryPlayer.currentIndex]) ? (galleryPlayer.slides[galleryPlayer.currentIndex].id || galleryPlayer.slides[galleryPlayer.currentIndex].vimeoId) : null;
          let idx = -1;
          if (oldId) idx = newSlides.findIndex(s => (s.id || s.vimeoId) === oldId);
          if (idx >= 0) galleryPlayer.playIndex(idx, { autoplay:true });
          else if (newSlides.length) galleryPlayer.playIndex(0, { autoplay:true });
        } else {
          galleryPlayer = new GalleryPlayer({ container: section, slides: newSlides });
          window.galleryPlayer = galleryPlayer;
          if (newSlides && newSlides.length) galleryPlayer.playIndex(0, { autoplay:true });
        }
      });
      li.appendChild(btn); catList.appendChild(li);
    });

    // initial filters selection (session/hash)
    const sessionFilters = readSessionFilters();
    let initialFilters = [];
    if (!location.hash || location.hash === '#') {
      initialFilters = []; try{ saveSessionFilters([]); }catch(e){}
    } else if (hashInfo.categories && Array.isArray(hashInfo.categories) && hashInfo.categories.length) {
      const matched = hashInfo.categories.map(h => {
        const exact = CATEGORIES.find(c => c===h); if (exact) return exact;
        const found = CATEGORIES.find(c => c.toLowerCase() === (h||'').toLowerCase()); return found||null;
      }).filter(Boolean);
      initialFilters = matched.length ? matched : [];
    } else if (sessionFilters && sessionFilters.length) initialFilters = sessionFilters.filter(f => CATEGORIES.includes(f));
    else initialFilters = [];

    // set initial active buttons
    try {
      catList.querySelectorAll('button').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
      if (initialFilters && initialFilters.length) {
        initialFilters.forEach(cat => { const b = catList.querySelector(`button[data-category="${cat}"]`); if (b) { b.classList.add('active'); b.setAttribute('aria-pressed','true'); }});
      }
    } catch(e){}

    // populate grid & slides (grid order controls autoplay order)
    populateGrid(galleryGrid, initialFilters);
    const slidesForPlayer = (initialFilters && initialFilters.length) ? VIDEOS.filter(v => normCategories(v).some(c => initialFilters.includes(c))) : VIDEOS.slice();

    if (!galleryPlayer) {
      galleryPlayer = new GalleryPlayer({ container: section, slides: slidesForPlayer });
      window.galleryPlayer = galleryPlayer;

      if (hashInfo.video) {
        const vidMeta = VIDEOS.find(v => (v.id === hashInfo.video) || (v.vimeoId === hashInfo.video));
        if (vidMeta) {
          const idx = slidesForPlayer.findIndex(s => (s.id || s.vimeoId) === (vidMeta.id || vidMeta.vimeoId));
          if (idx >= 0) {
            setTimeout(()=> galleryPlayer.playIndex(idx, { userTriggered:true, autoplay:true, forceResize: ADAPT_ASPECT_RATIO }), 120);
          }
        }
      } else {
        setTimeout(()=> { try { if (slidesForPlayer && slidesForPlayer.length) galleryPlayer.playIndex(0, { autoplay:true }); } catch(e){} }, 150);
      }
      galleryPlayer.updateMuteButton && galleryPlayer.updateMuteButton();
      galleryPlayer._applyMuteToPlayers && galleryPlayer._applyMuteToPlayers();
    } else {
      galleryPlayer.setSlides(slidesForPlayer);
      galleryPlayer.updateMuteButton && galleryPlayer.updateMuteButton();
    }

    setTimeout(()=> { const btnToFocus = catList.querySelector('button.active') || catList.querySelector('button'); if (btnToFocus) try { btnToFocus.focus({ preventScroll:true }); } catch(e){ btnToFocus.focus(); } }, 40);
  }

  /* ---------------- RUN / BARBA ---------------- */
  function runInits(context=document) {
    initMenu(context);
    if (context.querySelector && context.querySelector('#carouselSection')) initHome(context);
    if (context.querySelector && context.querySelector('#galleryCarouselSection')) initGallery(context);
    if (context.querySelector && context.querySelector('.facts')) initAbout && initAbout(context);
  }

  function initBarbaSafe(runInitial) {
    if (!window.barba) { runInitial(document); return; }
    try {
      barba.init({
        sync:true,
        transitions:[{
          async leave(data){ try{}catch(e){} if(window.gsap) await gsap.to(data.current.container, { opacity:0, y:-20, duration:0.32 }); },
          async enter(data){ document.body.classList.toggle('no-scroll', data.next.namespace==='home'); window.scrollTo(0,0); if(window.gsap) gsap.fromTo(data.next.container,{opacity:0,y:20},{opacity:1,y:0,duration:0.42}); runInitial(data.next.container); },
          async once(data){ document.body.classList.toggle('no-scroll', data.next.namespace==='home'); if(window.gsap) gsap.from(data.next.container, { opacity:0, y:20, duration:0.5 }); runInitial(data.next.container); }
        }],
        prevent({ el }) { if(!el) return false; try { const url = new URL(el.href, location.href); return url.origin !== location.origin; } catch(e){ return false; } }
      });
    } catch(e) { runInitial(document); }
  }

  /* ---------------- START ---------------- */
  function start() {
    if (window.__APP_INITIALIZED__) return;
    window.__APP_INITIALIZED__ = true;
    initBarbaSafe(runInits);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  log('main.js (vimeo) loaded — autoplay (grid order) + fixed autoplay size + persistent mute + smooth preload/cut + progress & pause toggles.');
})();
