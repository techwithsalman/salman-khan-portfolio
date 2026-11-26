/**
 * =======================================================================
 * Salman Khan Portfolio — Personalizer & Asset Bridge (PUBG Cinematic Edition)
 * =======================================================================
 */

(function () {
  'use strict';

  const cfg = window.PORTFOLIO_CONFIG || {};
  const profile = cfg.profile || {};
  const seo = cfg.seo || {};

  // Custom SK Monogram SVG
  const SK_MONOGRAM_SVG = `
    <svg viewBox="0 0 130 72" aria-hidden="true" fill="#F5B800" class="sk-monogram" style="width:54px; height:30px; display:inline-block; vertical-align:middle; filter:drop-shadow(0 2px 6px rgba(0,0,0,0.5));">
      <!-- S -->
      <path d="M0 0 L52 0 L52 14 L14 14 L14 28 L52 28 L52 72 L0 72 L0 58 L38 58 L38 42 L0 42 Z"></path>
      <!-- K Vertical Bar -->
      <path d="M66 0 L80 0 L80 72 L66 72 Z"></path>
      <!-- K Upper Diagonal -->
      <path d="M78 36 L112 0 L130 0 L90 44 Z"></path>
      <!-- K Lower Diagonal -->
      <path d="M88 32 L128 72 L110 72 L78 40 Z"></path>
    </svg>
  `;

  let isApplying = false;

  function applyPersonalization() {
    if (isApplying) return;
    isApplying = true;

    try {
      // 1. Document Title & Meta
      if (seo.title && document.title !== seo.title) {
        document.title = seo.title;
      }

      // 2. Header Brand & Monogram
      const brandLinks = document.querySelectorAll('a.ui_brand__dQu1Z, a[aria-label*="Mohamed"], a[aria-label*="Salman"]');
      brandLinks.forEach(link => {
        link.setAttribute('aria-label', profile.fullName || 'Salman Khan');
        const existingSvg = link.querySelector('svg:not(.sk-monogram)');
        if (existingSvg) {
          existingSvg.outerHTML = SK_MONOGRAM_SVG;
        }
        const brandName = link.querySelector('.ui_brandName__TKInT');
        if (brandName && brandName.textContent !== profile.fullName) {
          brandName.textContent = profile.fullName;
          brandName.style.color = '#F5F5F5';
          brandName.style.fontWeight = '800';
        }
      });

      // 3. Hero Wordmark SVG (SALMAN / KHAN)
      const wordmarkSvgs = document.querySelectorAll('.LaptopDive_wordmarkSvg__rmDcz');
      wordmarkSvgs.forEach(svg => {
        const texts = svg.querySelectorAll('text');
        if (texts.length >= 2) {
          if (texts[0].textContent !== (profile.firstName || 'SALMAN')) {
            texts[0].textContent = profile.firstName || 'SALMAN';
            texts[0].setAttribute('textLength', '1412');
            texts[0].setAttribute('lengthAdjust', 'spacingAndGlyphs');
          }
          if (texts[1].textContent !== (profile.lastName || 'KHAN')) {
            texts[1].textContent = profile.lastName || 'KHAN';
            texts[1].setAttribute('textLength', '1412');
            texts[1].setAttribute('lengthAdjust', 'spacingAndGlyphs');
          }
        }
      });

      // 4. Hero Background
      const bgImgs = document.querySelectorAll('.LaptopDive_backdropMedia__E_raI, .LaptopDive_backdrop__73xP_ img, .LaptopDive_backdrop__MEAUR img');
      bgImgs.forEach(img => {
        const targetSrc = profile.heroBg || '/images/mohamedandaloussi/laptop/pubg-battleground-bg.jpg';
        if (!img.src.includes('pubg-battleground-bg')) {
          img.src = targetSrc;
          img.style.objectFit = 'cover';
          img.style.objectPosition = 'center 60%';
        }
      });

      // 5. Main Character
      const personImgs = document.querySelectorAll('img[data-person="true"], .LaptopDive_personImg__AyVly');
      personImgs.forEach(img => {
        const targetChar = profile.avatar || '/images/mohamedandaloussi/laptop/salman-pubg-character.png';
        if (!img.src.includes('salman-pubg-character')) {
          img.src = targetChar;
          img.srcset = '';
          img.alt = `${profile.fullName}, ${profile.title}`;
          img.style.objectFit = 'contain';
          img.style.objectPosition = 'center bottom';
        }
      });

      // Ensure Hero Stage has data-in="true" so wordmark and badge drop in reliably
      const stage = document.querySelector('#laptop-dive');
      if (stage && stage.getAttribute('data-in') !== 'true') {
        stage.setAttribute('data-in', 'true');
      }

      // 6. PUBG Hanging Designer Card
      const badgeHovers = document.querySelectorAll('.LaptopDive_badgeHover__4JY0H');
      badgeHovers.forEach(container => {
        if (!container.querySelector('.pubg-designer-card')) {
          const cardDiv = document.createElement('div');
          cardDiv.className = 'pubg-designer-card';
          cardDiv.innerHTML = `
            <div class="pubg-card-header-block">
              <div class="pubg-card-header-flex">
                <h4 class="pubg-card-title">DESIGNER<br>CARD</h4>
                <span class="pubg-card-year">2026</span>
              </div>
              <p class="pubg-card-subtitle">CREATIVE DESIGNER // DEVELOPER</p>
            </div>
            <div class="pubg-card-photo-wrapper">
              <img class="pubg-card-photo" src="${profile.realPhoto || '/images/mohamedandaloussi/laptop/salman-real-photo.png'}" alt="${profile.fullName || 'Salman Khan'}" />
            </div>
            <div class="pubg-card-rows">
              <div class="pubg-card-row pubg-card-row-1">
                <span class="pubg-card-row-label">NAME:</span>
                <span class="pubg-card-row-value">${profile.fullName || 'SALMAN KHAN'}</span>
              </div>
              <div class="pubg-card-row pubg-card-row-2">
                <span class="pubg-card-row-label">ROLE:</span>
                <span class="pubg-card-row-value">DESIGNER &amp; DEVELOPER</span>
              </div>
              <div class="pubg-card-row pubg-card-row-3">
                <span class="pubg-card-row-label">FOCUS:</span>
                <span class="pubg-card-row-value">${profile.focus || 'DESIGN × CODE × AI'}</span>
              </div>
              <div class="pubg-card-row pubg-card-row-4">
                <span class="pubg-card-row-label">LOCATION:</span>
                <span class="pubg-card-row-value">${(profile.location || 'KARACHI, PAKISTAN').toUpperCase()}</span>
              </div>
            </div>
          `;
          container.appendChild(cardDiv);
        }
      });

      // 7. Mobile Contact Phone Panel (Reach)
      const reachPanel = document.querySelector('#ma-reach-card, .Reach_dock__3jVfO');
      if (reachPanel) {
        const nameEl = reachPanel.querySelector('.Reach_name__s1hb7');
        if (nameEl && nameEl.textContent !== profile.fullName) {
          nameEl.textContent = profile.fullName;
        }
        const roleEl = reachPanel.querySelector('.Reach_role__hBszW');
        if (roleEl && !roleEl.textContent.includes('AI Automation')) {
          roleEl.textContent = profile.intro || "Hi, I'm Salman Khan, a UI/UX designer, developer, and AI automation builder.";
          roleEl.style.fontSize = '11px';
          roleEl.style.lineHeight = '1.35';
        }
        const actionLinks = reachPanel.querySelectorAll('.Reach_actions__IL57g a');
        if (actionLinks.length >= 3) {
          actionLinks[0].href = `tel:${(profile.phone || '').replace(/\s+/g, '')}`;
          actionLinks[1].href = profile.whatsappUrl || `https://wa.me/923152181308`;
          actionLinks[1].target = '_blank';
          actionLinks[2].href = `mailto:${profile.email}`;
        }
        const listLinks = reachPanel.querySelectorAll('.Reach_list__T7LUX li');
        if (listLinks.length >= 4) {
          const pLink = listLinks[0].querySelector('a');
          if (pLink) {
            pLink.href = `tel:${(profile.phone || '').replace(/\s+/g, '')}`;
            pLink.textContent = profile.phone;
          }
          const waLink = listLinks[1].querySelector('a');
          if (waLink) {
            waLink.href = profile.whatsappUrl || `https://wa.me/923152181308`;
            waLink.target = '_blank';
            waLink.textContent = profile.whatsapp;
          }
          const emLink = listLinks[2].querySelector('a');
          if (emLink) {
            emLink.href = `mailto:${profile.email}`;
            emLink.textContent = profile.email;
          }
          const webLink = listLinks[3].querySelector('a');
          if (webLink) {
            webLink.href = profile.website;
            webLink.textContent = 'techwithsalman.online';
            webLink.target = '_blank';
          }
        }
        const socialItems = reachPanel.querySelectorAll('.Reach_networks__mz9ry li a');
        socialItems.forEach(a => {
          const label = a.getAttribute('aria-label') || '';
          if (label.includes('LinkedIn') && cfg.socialLinks?.linkedin) {
            a.href = cfg.socialLinks.linkedin;
          } else if (label.includes('Instagram') && cfg.socialLinks?.instagram) {
            a.href = cfg.socialLinks.instagram;
          } else if (label.includes('Behance') && cfg.socialLinks?.behance) {
            a.href = cfg.socialLinks.behance;
          } else if (label.includes('GitHub') && cfg.socialLinks?.github) {
            a.href = cfg.socialLinks.github;
          } else if (label.includes('Facebook') && cfg.socialLinks?.facebook) {
            a.href = cfg.socialLinks.facebook;
          }
        });
      }

      // 8. CV Section Title & Download Button
      const cvTitles = document.querySelectorAll('.CvHome_title__ktMGo');
      cvTitles.forEach(t => {
        const small = t.querySelector('small');
        if (small && !small.textContent.includes('Salman Khan')) {
          small.textContent = `Curriculum vitae · ${profile.fullName || 'Salman Khan'}`;
        }
      });

      const cvButtons = document.querySelectorAll('.CvHome_cvButton__jOq2V, [class*="CvHome_cvButton"], .CvHome_rail__bI79P a[download]');
      cvButtons.forEach(btn => {
        btn.href = profile.cvPath || '/images/mohamedandaloussi/profile/Salman_CV.pdf';
        btn.setAttribute('download', 'Salman_Khan_CV.pdf');
        btn.setAttribute('target', '_blank');
      });

      // 9. Closing Scene: SK//TV · CH 02
      const channelLabels = document.querySelectorAll('.OfflineTV_channel__bU_aV, [class*="OfflineTV_channel"], [class*="channel"], .OfflineTV_osd__73Ls6, [class*="OfflineTV_osd"]');
      channelLabels.forEach(el => {
        el.textContent = 'SK//TV · CH 02';
      });

      // 10. Footer Branding
      const footerBase = document.querySelector('.ui_footerBase__6SSYI span');
      if (footerBase) {
        footerBase.textContent = `${seo.copyright || '© 2026 SALMAN KHAN | TECH WITH SALMAN'}`;
      }

      const footerFirstCol = document.querySelector('.ui_footerGrid__Xhmaf > div:first-child');
      if (footerFirstCol) {
        const role = footerFirstCol.querySelector('.ui_footerRole__sPnI_');
        if (role) role.remove();
        const desc = footerFirstCol.querySelector('p.ui_mono__m5sMh');
        if (desc) {
          desc.textContent = 'CREATIVE DESIGNER, DEVELOPER & AI AUTOMATION BUILDER — KARACHI, PAKISTAN.';
          desc.style.fontSize = '12px';
          desc.style.fontWeight = '700';
          desc.style.letterSpacing = '0.5px';
          desc.style.color = '#F5B800';
        }
      }

      const footerBrands = document.querySelectorAll('footer, #closing, .ui_footer__CCdWi');
      footerBrands.forEach(f => {
        const svgs = f.querySelectorAll('svg:not(.sk-monogram)');
        svgs.forEach(s => {
          if (s.getAttribute('viewBox') === '0 0 130 72') {
            s.outerHTML = SK_MONOGRAM_SVG;
          }
        });
      });

    } finally {
      initReachPhone();
      initLaptopController();
      initPubg3DGallery();
      isApplying = false;
    }
  }

  // =========================================================================
  // Interactive Phone Dock Controller (Bottom-Left "LET'S TALK")
  // =========================================================================
  function initReachPhone() {
    const dock = document.querySelector('.Reach_dock__3jVfO');
    if (!dock || dock.__reachPhoneInitialized) return;
    dock.__reachPhoneInitialized = true;

    // Always ensure data-dive="on" in initial view
    document.documentElement.setAttribute('data-dive', 'on');

    const trigger = dock.querySelector('.Reach_trigger__aimz1');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dock.getAttribute('data-open') === 'true';
        dock.setAttribute('data-open', isOpen ? 'false' : 'true');
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (dock.getAttribute('data-open') === 'true') {
        if (!dock.contains(e.target)) {
          dock.setAttribute('data-open', 'false');
        }
      }
    });

    // Handle scroll to maintain phone visibility in Hero & Laptop sections
    window.addEventListener('scroll', () => {
      const stage = document.getElementById('laptop-dive');
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      if (rect.bottom > 80) {
        document.documentElement.setAttribute('data-dive', 'on');
      } else {
        document.documentElement.setAttribute('data-dive', 'off');
      }
    }, { passive: true });
  }

  // =========================================================================
  // Laptop Showcase & Interactive Project Controller
  // =========================================================================
  function initLaptopController() {
    const stage = document.querySelector('#laptop-dive');
    if (!stage || stage.__laptopControllerInitialized) return;
    stage.__laptopControllerInitialized = true;

    const projects = cfg.webProjects || [];
    if (!projects.length) return;

    let mode = 'hero'; // 'hero' | 'case'
    let activeCase = 0;
    let isTransitioning = false;
    let wheelCooldown = 0;

    const flyer = stage.querySelector('.LaptopDive_flyer__kFeON');
    const viewport = stage.querySelector('.LaptopDive_viewport__uIVt1');
    const address = stage.querySelector('.LaptopDive_address__6s_FT');
    const prevBtn = stage.querySelector('.LaptopDive_prev__CHTFl');
    const nextBtn = stage.querySelector('.LaptopDive_next__T1_ES');
    const hintBtn = stage.querySelector('.LaptopDive_hint__SFYRW');
    const skipBtn = stage.querySelector('.LaptopDive_skip__K18W2');
    const logoBtn = stage.querySelector('.LaptopDive_logo__ACgXu');
    const person = stage.querySelector('.LaptopDive_person__PSEh_');
    const wordmark = stage.querySelector('.LaptopDive_wordmark__Rzh6E');
    const script = stage.querySelector('.LaptopDive_script__fuMhy');
    const badge = stage.querySelector('.LaptopDive_badge__qQVK_');

    if (logoBtn) {
      logoBtn.textContent = 'SALMAN KHAN';
    }

    // Populate viewport with the 8 real project screenshots
    if (viewport) {
      viewport.innerHTML = '';
      projects.forEach((proj, idx) => {
        const img = document.createElement('img');
        img.className = 'LaptopDive_caseImg__PUBG';
        img.src = '/images/mohamedandaloussi/laptop/' + (proj.shot || 'salman-hridoy-portfolio.webp');
        img.alt = proj.title;
        img.setAttribute('data-active', idx === 0 ? 'true' : 'false');
        viewport.appendChild(img);
      });
    }

    // Ensure caseUi exists
    let caseUi = stage.querySelector('.LaptopDive_caseUi__Fx4CB');
    if (!caseUi) {
      caseUi = document.createElement('div');
      caseUi.className = 'LaptopDive_caseUi__Fx4CB';
      caseUi.setAttribute('dir', 'auto');
      const uiContainer = stage.querySelector('.LaptopDive_ui__4Qn5T') || stage;
      uiContainer.appendChild(caseUi);
    }

    function updateCaseDisplay(idx) {
      activeCase = idx;
      const proj = projects[idx] || projects[0];

      // 1. Update active slide image
      const imgs = viewport ? viewport.querySelectorAll('.LaptopDive_caseImg__PUBG') : [];
      imgs.forEach((img, i) => {
        img.setAttribute('data-active', i === idx ? 'true' : 'false');
      });

      // 2. Update address bar
      if (address) {
        const displayUrl = proj.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
        address.innerHTML = `
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8" style="display:inline-block; vertical-align:middle; margin-right:5px;">
            <rect x="3" y="6" width="10" height="9" rx="1.5"></rect>
            <path d="M5 6V4a3 3 0 0 1 6 0v2"></path>
          </svg>
          ${displayUrl}
        `;
      }

      // 3. Update caseUi (Ticket & Description)
      if (caseUi) {
        caseUi.innerHTML = `
          <div class="LaptopDive_ticket__54M_K" aria-live="polite">
            <span class="LaptopDive_hole__uh1HW"></span>
            <span class="LaptopDive_hole__uh1HW"></span>
            <span class="LaptopDive_hole__uh1HW"></span>
            <span class="LaptopDive_hole__uh1HW"></span>
            <h2 class="LaptopDive_ticketTitle__XM_uW" style="--chars: ${Math.max(proj.title.length, 12)};">
              <a href="${proj.url}" target="_blank" rel="noopener noreferrer">${proj.title}</a>
            </h2>
            <div class="LaptopDive_rows__b9wFi">
              <p>2024 - 2026</p>
              <p>${proj.kind}</p>
              <p>Web Development</p>
              <p>React · Next.js · Tactical UI</p>
            </div>
          </div>
          <div class="LaptopDive_desc__RN85a">
            <p class="LaptopDive_key__Ifwts">${proj.kind.toUpperCase()} // TACTICAL</p>
            <p class="LaptopDive_text__U2EFj">${proj.desc}</p>
            <a href="${proj.url}" class="LaptopDive_open__ng6K3" target="_blank" rel="noopener noreferrer">VISIT LIVE PROJECT →</a>
            <p class="LaptopDive_num__YgGUQ">${String(idx + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}</p>
          </div>
        `;
      }

      // 4. Update Navigation Buttons
      if (prevBtn) {
        prevBtn.setAttribute('data-dim', idx === 0 ? 'true' : 'false');
      }
      if (nextBtn) {
        const label = nextBtn.querySelector('.LaptopDive_label__K8rRG');
        if (label) {
          if (idx === projects.length - 1) {
            label.innerHTML = 'CONTINUE<br>GALLERY';
          } else {
            label.innerHTML = 'NEXT<br>CASE';
          }
        }
      }

      // 5. Trigger Screen Flash animation
      const flash = stage.querySelector('.LaptopDive_flash__UpkIi');
      if (flash) {
        flash.style.animation = 'none';
        void flash.offsetWidth;
        flash.style.animation = 'LaptopDive_flash__UpkIi 0.6s ease-out both';
      }
    }

    async function diveToCase(targetIdx = 0) {
      if (isTransitioning) return;
      isTransitioning = true;
      mode = 'case';

      stage.setAttribute('data-phase', 'out');
      if (flyer) flyer.style.opacity = '1';

      // Fade and blur hero elements
      [person, wordmark, script, badge].forEach(el => {
        if (el) {
          el.style.transition = 'opacity 0.26s ease-out, filter 0.26s ease-out';
          el.style.opacity = '0';
          el.style.filter = 'blur(10px)';
        }
      });

      await new Promise(r => setTimeout(r, 180));
      stage.setAttribute('data-phase', 'diving');
      stage.setAttribute('data-mode', 'case');

      await new Promise(r => setTimeout(r, 700));
      stage.setAttribute('data-screen', 'true');
      stage.setAttribute('data-phase', 'idle');

      updateCaseDisplay(targetIdx);

      setTimeout(() => {
        isTransitioning = false;
      }, 400);
    }

    async function returnToHero() {
      if (isTransitioning) return;
      isTransitioning = true;
      mode = 'hero';

      stage.setAttribute('data-screen', 'false');
      await new Promise(r => setTimeout(r, 100));

      stage.setAttribute('data-phase', 'returning');
      stage.setAttribute('data-mode', 'hero');

      [person, wordmark, script, badge].forEach(el => {
        if (el) {
          el.style.transition = 'opacity 0.3s ease-in, filter 0.3s ease-in';
          el.style.opacity = '1';
          el.style.filter = 'blur(0)';
        }
      });

      if (flyer) flyer.style.opacity = '0';

      await new Promise(r => setTimeout(r, 600));
      stage.setAttribute('data-phase', 'idle');

      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    }

    function nextCase() {
      if (isTransitioning) return;
      if (activeCase < projects.length - 1) {
        updateCaseDisplay(activeCase + 1);
      } else {
        const gallery = document.getElementById('gallery');
        if (gallery) {
          gallery.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }

    function prevCase() {
      if (isTransitioning) return;
      if (activeCase > 0) {
        updateCaseDisplay(activeCase - 1);
      } else {
        returnToHero();
      }
    }

    // Expose controller API for QA and external triggers
    window.__laptopController = {
      diveToCase,
      returnToHero,
      nextCase,
      prevCase,
      updateCaseDisplay,
      getMode: () => mode,
      getActiveCase: () => activeCase
    };

    // Event Delegation for all Laptop Dive interactive buttons
    document.addEventListener('click', (e) => {
      const hint = e.target.closest('.LaptopDive_hint__SFYRW');
      if (hint) {
        console.log('[Personalizer] Hint button clicked via delegation');
        e.preventDefault();
        e.stopPropagation();
        diveToCase(0);
        return;
      }
      const next = e.target.closest('.LaptopDive_next__T1_ES');
      if (next) {
        console.log('[Personalizer] Next button clicked via delegation');
        e.preventDefault();
        e.stopPropagation();
        nextCase();
        return;
      }
      const prev = e.target.closest('.LaptopDive_prev__CHTFl');
      if (prev) {
        console.log('[Personalizer] Prev button clicked via delegation');
        e.preventDefault();
        e.stopPropagation();
        prevCase();
        return;
      }
      const skip = e.target.closest('.LaptopDive_skip__K18W2');
      if (skip) {
        e.preventDefault();
        const gallery = document.getElementById('gallery');
        if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      const logo = e.target.closest('.LaptopDive_logo__ACgXu');
      if (logo) {
        e.preventDefault();
        returnToHero();
        return;
      }
    }, true);

    // Wheel event controller
    window.addEventListener('wheel', (e) => {
      if (window.scrollY > 20) return;
      if (isTransitioning) {
        e.preventDefault();
        return;
      }

      if (mode === 'hero') {
        if (e.deltaY > 15) {
          e.preventDefault();
          diveToCase(0);
        }
      } else if (mode === 'case') {
        if (Date.now() < wheelCooldown) {
          e.preventDefault();
          return;
        }
        if (Math.abs(e.deltaY) > 15) {
          wheelCooldown = Date.now() + 650;
          if (e.deltaY > 0) {
            if (activeCase < projects.length - 1) {
              e.preventDefault();
              nextCase();
            } else {
              // On last project, allow smooth scroll into gallery
              const gallery = document.getElementById('gallery');
              if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
            }
          } else {
            e.preventDefault();
            prevCase();
          }
        }
      }
    }, { passive: false });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        if (window.scrollY <= 10) {
          if (mode === 'hero') {
            e.preventDefault();
            diveToCase(0);
          } else if (mode === 'case') {
            e.preventDefault();
            nextCase();
          }
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        if (window.scrollY <= 10 && mode === 'case') {
          e.preventDefault();
          prevCase();
        }
      } else if (mode === 'case' && e.key === 'ArrowRight') {
        e.preventDefault();
        nextCase();
      } else if (mode === 'case' && e.key === 'ArrowLeft') {
        e.preventDefault();
        prevCase();
      }
    });

    // Touch gesture support
    let touchStartY = 0;
    stage.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    stage.addEventListener('touchmove', (e) => {
      if (window.scrollY <= 10 && mode === 'case' && activeCase < projects.length - 1) {
        e.preventDefault();
      }
    }, { passive: false });

    stage.addEventListener('touchend', (e) => {
      if (window.scrollY > 10) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) {
        if (dy > 0) {
          if (mode === 'hero') diveToCase(0);
          else if (mode === 'case') nextCase();
        } else {
          if (mode === 'case') prevCase();
        }
      }
    });

    updateCaseDisplay(0);
  }

  // =========================================================================
  // PUBG 3D Interactive Curved Exhibition Gallery Initializer
  // =========================================================================
  function initPubg3DGallery() {
    if (window.__pubgGalleryInitialized) return;
    const canvas = document.querySelector('.PrintGallery_canvas__AYIfq');
    const gallerySection = document.getElementById('gallery');
    const win = document.querySelector('.PrintGallery_window__AF_6C');
    const veil = document.querySelector('.PrintGallery_veil__8GHBR');
    if (!canvas || !gallerySection || !window.webpackChunk_N_E) return;

    window.__pubgGalleryInitialized = true;

    let wreq = null;
    window.webpackChunk_N_E.push([['__pubg_gallery_init__'], {}, (req) => { wreq = req; }]);
    if (!wreq) return;

    Promise.all([wreq.e(1831), wreq.e(9367), wreq.e(8734)]).then(() => {
      const { GalleryScene } = wreq(28734);
      const mod31947 = wreq(31947);
      if (!GalleryScene || !mod31947) return;

      const items = (mod31947.Yx || []).map(t => ({
        id: t.id,
        src: mod31947._w(t.image, 480),
        title: t.title,
        meta: 'Tactical Exhibition · PUBG Edition'
      }));

      const scene = new GalleryScene(canvas, items, {
        onFocus: (idx) => {},
        onOpen: (idx) => {},
        onDoor: () => {},
        onHover: (focused, x, y, active) => {
          canvas.dataset.pointer = String(active);
        }
      }, {
        title: 'sans-serif',
        mono: 'monospace',
        cta: 'View post'
      });

      window.__galleryInstance = scene;
      scene.resize();
      scene.setEntrance(1);
      scene.start();

      if (win) win.setAttribute('data-ready', 'true');
      if (veil) {
        veil.style.opacity = '0';
        veil.style.pointerEvents = 'none';
        veil.style.display = 'none';
      }

      const updateGalleryScroll = () => {
        const rect = gallerySection.getBoundingClientRect();
        const vh = window.innerHeight;
        const entrance = Math.min(1, Math.max(0, 1 - rect.top / vh));
        scene.setEntrance(entrance > 0.05 ? 1 : 0);
        const scrollWalk = Math.min(1, Math.max(0, -rect.top / Math.max(1, gallerySection.offsetHeight - 1.6 * vh)));
        scene.setScrollWalk(scrollWalk);
      };

      window.addEventListener('scroll', updateGalleryScroll, { passive: true });
      window.addEventListener('resize', () => { scene.resize(); updateGalleryScroll(); }, { passive: true });
      updateGalleryScroll();
      console.log('[Personalizer] PUBG 3D Gallery initialized and running.');
    }).catch(err => {
      console.error('[Personalizer] Error loading PUBG gallery chunks:', err);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPersonalization);
  } else {
    applyPersonalization();
  }

  window.addEventListener('load', applyPersonalization);

  let timer = null;
  const observer = new MutationObserver(() => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      applyPersonalization();
    }, 200);
  });

  observer.observe(document.body || document.documentElement, {
    childList: true,
    subtree: true,
    attributes: false
  });

  console.log('[Personalizer] Salman Khan PUBG Portfolio customization ready.');
})();
