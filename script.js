/**
 * ================================================
 * PIZZERIA ZIO ARMANDO — script.js
 * ================================================
 * Vanilla JavaScript — no frameworks, no dependencies
 *
 * Contents:
 * 1. Mobile nav toggle
 * 2. Sticky header shadow on scroll
 * 3. Smooth scrolling for anchor links
 * 4. Opening hours: highlight today & show status
 * 5. Menu category filtering (menu.html)
 * 6. Menu search (menu.html)
 * 7. Update category item counts (menu.html)
 * 8. Back to top button
 * 9. Active nav link on scroll (index.html)
 * ================================================
 */

/* ============================================
   1. MOBILE NAV TOGGLE
   ============================================ */
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close nav when any link inside it is clicked */
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* Close on outside click */
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

/* ============================================
   2. STICKY HEADER SHADOW ON SCROLL
   ============================================ */
(function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* ============================================
   3. SMOOTH SCROLLING FOR ANCHOR LINKS
   ============================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return; /* Skip empty placeholders */

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height')
      ) || 70;

      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ============================================
   4. OPENING HOURS: HIGHLIGHT TODAY & STATUS
   ============================================ */
(function initOpeningHours() {
  /* JS day: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat */

  const schedule = {
    0: { name: 'Domenica',  lunch: null,            dinner: { open: '17:30', close: '23:00' } },
    1: { name: 'Lunedì',    lunch: null,            dinner: null }, /* Closed */
    2: { name: 'Martedì',   lunch: null,            dinner: { open: '17:30', close: '22:00' } },
    3: { name: 'Mercoledì', lunch: { open: '12:00', close: '14:30' }, dinner: { open: '17:30', close: '22:00' } },
    4: { name: 'Giovedì',   lunch: { open: '12:00', close: '14:30' }, dinner: { open: '17:30', close: '22:00' } },
    5: { name: 'Venerdì',   lunch: { open: '12:00', close: '14:30' }, dinner: { open: '17:30', close: '22:30' } },
    6: { name: 'Sabato',    lunch: { open: '12:00', close: '14:00' }, dinner: { open: '17:30', close: '23:00' } },
  };

  /**
   * Returns true if current time falls within an open slot.
   * timeStr format: "HH:MM"
   */
  function timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  }

  function isCurrentlyOpen(day) {
    const info = schedule[day];
    if (!info || (!info.lunch && !info.dinner)) return false;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const inSlot = (slot) =>
      slot && currentMinutes >= timeToMinutes(slot.open) && currentMinutes < timeToMinutes(slot.close);

    return inSlot(info.lunch) || inSlot(info.dinner);
  }

  function buildHoursText(day) {
    const info = schedule[day];
    if (!info || (!info.lunch && !info.dinner)) return 'Chiuso';

    const parts = [];
    if (info.lunch)  parts.push(`Pranzo ${info.lunch.open}–${info.lunch.close}`);
    if (info.dinner) parts.push(`Cena ${info.dinner.open}–${info.dinner.close}`);
    return parts.join(' · ');
  }

  /* Highlight today's row in the hours table */
  const today = new Date().getDay();
  const rows = document.querySelectorAll('.hours-table tr[data-day]');

  rows.forEach(row => {
    const rowDay = parseInt(row.getAttribute('data-day'), 10);
    if (rowDay === today) {
      row.classList.add('today');
      const dayCell = row.querySelector('.day');
      if (dayCell) {
        const badge = document.createElement('span');
        badge.className = 'day-today-badge';
        badge.textContent = 'Oggi';
        dayCell.appendChild(badge);
      }
    }
  });

  /* Update the status note under the table */
  const statusNote = document.getElementById('today-hours-text');
  if (statusNote) {
    const info = schedule[today];
    const open = isCurrentlyOpen(today);

    if (!info || (!info.lunch && !info.dinner)) {
      statusNote.innerHTML = '<strong style="color:var(--red)">Chiuso oggi</strong>';
    } else {
      const hoursText = buildHoursText(today);
      const statusBadge = open
        ? '<strong style="color:var(--green)">Aperto ora</strong>'
        : '<strong style="color:var(--red)">Chiuso al momento</strong>';
      statusNote.innerHTML = `${statusBadge} &nbsp;·&nbsp; ${hoursText}`;
    }
  }
})();

/* ============================================
   5. MENU CATEGORY FILTERING  (menu.html)
   ============================================ */
(function initMenuFilter() {
  const tabs = document.querySelectorAll('.cat-tab');
  const categories = document.querySelectorAll('.menu-category[data-cat]');
  const noResults = document.getElementById('no-results');
  const searchInput = document.getElementById('menu-search');

  if (!tabs.length || !categories.length) return;

  let activeCategory = 'all';

  function filterByCategory(cat) {
    activeCategory = cat;

    tabs.forEach(t => {
      const isActive = t.getAttribute('data-cat') === cat;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', String(isActive));
    });

    categories.forEach(section => {
      const sectionCat = section.getAttribute('data-cat');
      const visible = cat === 'all' || sectionCat === cat;
      section.style.display = visible ? '' : 'none';
    });

    /* Re-run search if there's a query */
    if (searchInput && searchInput.value.trim()) {
      filterBySearch(searchInput.value);
    } else {
      checkNoResults();
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterByCategory(tab.getAttribute('data-cat'));
    });
  });

  /* ============================================
     6. MENU SEARCH FUNCTIONALITY  (menu.html)
     ============================================ */
  function filterBySearch(query) {
    if (!searchInput) return;

    const q = query.trim().toLowerCase();
    let anyVisible = false;

    categories.forEach(section => {
      const sectionCat = section.getAttribute('data-cat');
      const catMatch = activeCategory === 'all' || sectionCat === activeCategory;

      if (!catMatch) {
        section.style.display = 'none';
        return;
      }

      const items = section.querySelectorAll('.menu-item, .allergen-item');
      let sectionHasVisible = false;

      items.forEach(item => {
        if (!q) {
          item.classList.remove('hidden');
          sectionHasVisible = true;
          return;
        }

        const name = (item.getAttribute('data-name') || '').toLowerCase();
        const ingredients = (item.getAttribute('data-ingredients') || '').toLowerCase();
        const itemText = (item.textContent || '').toLowerCase();
        const matches = name.includes(q) || ingredients.includes(q) || itemText.includes(q);

        item.classList.toggle('hidden', !matches);
        if (matches) sectionHasVisible = true;
      });

      section.style.display = sectionHasVisible ? '' : 'none';
      if (sectionHasVisible) anyVisible = true;
    });

    if (noResults) {
      const noResultsQuery = document.getElementById('no-results-query');
      if (noResultsQuery) noResultsQuery.textContent = q;
      noResults.classList.toggle('show', !anyVisible && !!q);
    }
  }

  function checkNoResults() {
    if (!noResults) return;
    const anyVisible = Array.from(categories).some(s => s.style.display !== 'none');
    noResults.classList.toggle('show', !anyVisible);
  }

  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => filterBySearch(searchInput.value), 200);
    });

    /* Clear search on Escape */
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        filterBySearch('');
      }
    });
  }

  /* ============================================
     7. UPDATE CATEGORY ITEM COUNTS
     ============================================ */
  function updateCounts() {
    categories.forEach(section => {
      const cat = section.getAttribute('data-cat');
      const countEl = document.getElementById(`count-${cat}`);
      if (!countEl) return;
      const selector = cat === 'allergeni' ? '.allergen-item' : '.menu-item';
      const total = section.querySelectorAll(selector).length;
      countEl.textContent = cat === 'allergeni' ? `${total} voci` : `${total} piatti`;
    });
  }

  updateCounts();
})();

/* ============================================
   8. BACK TO TOP BUTTON
   ============================================ */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================
   9. ACTIVE NAV LINK ON SCROLL (index.html)
   ============================================ */
(function initActiveNavOnScroll() {
  /* Only run on the homepage */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-link:not(.nav-cta)');

  if (!sections.length || !navLinks.length) return;

  const headerHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--header-height')
  ) || 70;

  const onScroll = () => {
    let current = '';

    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= headerHeight + 80) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const isActive = href === `#${current}` || (current === '' && href === 'index.html');
      link.classList.toggle('active', isActive);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();
