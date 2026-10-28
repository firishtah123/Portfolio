(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const menuToggle = $('.menu-toggle');
  const nav = $('#site-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.innerHTML = open ? 'CLOSE <span>−</span>' : 'MENU <span>＋</span>';
    });
    $$('a', nav).forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = 'MENU <span>＋</span>';
    }));
  }

  // Scroll reveals: gracefully expose content if IntersectionObserver is unavailable.
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    }), { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else revealEls.forEach(el => el.classList.add('is-visible'));

  // A small parallax nudge on the background, while the orbital SVG physically circles the globe.
  const hero = $('.hero-home');
  const earthStage = $('.earth-stage');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (hero && earthStage && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', ev => {
      const b = hero.getBoundingClientRect();
      const dx = (ev.clientX - b.left) / b.width - .5;
      const dy = (ev.clientY - b.top) / b.height - .5;
      earthStage.style.setProperty('--parallax-x', `${dx * -9}px`);
      earthStage.style.setProperty('--parallax-y', `${dy * -7}px`);
    });
    hero.addEventListener('pointerleave', () => {
      earthStage.style.setProperty('--parallax-x', '0px');
      earthStage.style.setProperty('--parallax-y', '0px');
    });
  }

  // Project-library filters.
  const filterButtons = $$('.filter[data-filter]');
  const libraryCards = $$('.library-card[data-category]');
  if (filterButtons.length && libraryCards.length) {
    const count = $('#projectCount');
    const noResults = $('#noResults');
    function applyFilter(filter) {
      let visible = 0;
      libraryCards.forEach(card => {
        const categories = card.dataset.category.split(/\s+/);
        const show = filter === 'all' || categories.includes(filter);
        card.hidden = !show;
        if (show) visible++;
      });
      if (count) count.textContent = `${visible} PROJECT${visible === 1 ? '' : 'S'}`;
      if (noResults) noResults.hidden = visible !== 0;
    }
    filterButtons.forEach(button => button.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.toggle('active', b === button));
      applyFilter(button.dataset.filter);
    }));
    applyFilter('all');
  }

  // About-page image fallback. Upload your photo to assets/firishtah.jpg when ready.
  const profilePhoto = $('#profilePhoto');
  const portraitPlaceholder = $('#portraitPlaceholder');
  if (profilePhoto && portraitPlaceholder) {
    const showFallback = () => { profilePhoto.hidden = true; portraitPlaceholder.hidden = false; };
    profilePhoto.addEventListener('error', showFallback);
    profilePhoto.addEventListener('load', () => { profilePhoto.hidden = false; portraitPlaceholder.hidden = true; });
    if (profilePhoto.complete && profilePhoto.naturalWidth > 0) { profilePhoto.hidden = false; portraitPlaceholder.hidden = true; }
    else if (profilePhoto.complete && profilePhoto.naturalWidth === 0) showFallback();
  }

  // Locations page: the location narrative and Leaflet map stay in sync.
  const mapEl = $('#worldMap');
  if (mapEl && window.L) {
    const locations = {
      mumbai: { name: 'Mumbai, India', coords: [19.0760, 72.8777], zoom: 4, title: 'Mumbai', text: 'Financial-document intelligence, extraction and validation workflows, and open-source model evaluation at HDFC Bank.', link: 'projects.html#banking-ai', linkText: 'Explore banking AI' },
      london: { name: 'London, United Kingdom', coords: [51.5072, -0.1276], zoom: 4, title: 'London', text: 'At LSE, research combined flood-hazard rasters, satellite imagery and socioeconomic data to investigate exposure, vulnerability and environmental change.', link: 'projects.html#climate-risk', linkText: 'Explore climate-risk projects' },
      singapore: { name: 'Singapore & Southeast Asia', coords: [1.3521, 103.8198], zoom: 4, title: 'Singapore', text: 'ESG data and analytics, emissions reporting and environmental records at Project Flux, working across cross-functional teams.', link: 'projects.html#data-analytics', linkText: 'Explore analytics projects' }
    };
    const map = L.map(mapEl, { scrollWheelZoom: false, zoomControl: true, worldCopyJump: true }).setView([29, 44], 2);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd', maxZoom: 19
    }).addTo(map);
    const icon = L.divIcon({ className: 'fg-map-marker', html: '<span></span>', iconSize: [18,18], iconAnchor: [9,9] });
    const markers = {};
    Object.entries(locations).forEach(([key, place]) => {
      markers[key] = L.marker(place.coords, { icon }).addTo(map).bindPopup(`<strong>${place.name}</strong><br>${place.text}`);
      markers[key].on('click', () => activate(key, false));
    });
    const detail = $('#locationDetail');
    function activate(key, fly = true) {
      const place = locations[key];
      if (!place) return;
      $$('.location-choice').forEach(btn => btn.classList.toggle('active', btn.dataset.location === key));
      if (detail) detail.innerHTML = `<span class="mono accent">SELECTED LOCATION</span><h3>${place.title}</h3><p>${place.text}</p><a class="text-arrow" href="${place.link}">${place.linkText} <span>↗</span></a>`;
      if (fly) { map.flyTo(place.coords, place.zoom, { duration: 1.25 }); markers[key].openPopup(); }
    }
    $$('.location-choice').forEach(button => button.addEventListener('click', () => activate(button.dataset.location, true)));
    setTimeout(() => map.invalidateSize(), 200);
    window.addEventListener('resize', () => map.invalidateSize());
  } else if (mapEl) {
    mapEl.innerHTML = '<div class="map-unavailable">The map could not load. Check your connection and try again.</div>';
  }
})();