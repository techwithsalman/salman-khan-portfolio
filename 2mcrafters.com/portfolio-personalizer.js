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
      const bgImgs = document.querySelectorAll('.LaptopDive_backdropMedia__E_raI, .LaptopDive_backdrop__73xP_ img');
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
              <div class="pubg-card-row">
                <span class="pubg-card-row-label">NAME:</span>
                <span class="pubg-card-row-value">${profile.fullName || 'SALMAN KHAN'}</span>
              </div>
              <div class="pubg-card-row">
                <span class="pubg-card-row-label">ROLE:</span>
                <span class="pubg-card-row-value">DESIGNER &amp; DEVELOPER</span>
              </div>
              <div class="pubg-card-row">
                <span class="pubg-card-row-label">FOCUS:</span>
                <span class="pubg-card-row-value">${profile.focus || 'DESIGN × CODE × AI'}</span>
              </div>
              <div class="pubg-card-row">
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
          actionLinks[0].href = `tel:${profile.phone.replace(/\s+/g, '')}`;
          actionLinks[1].href = profile.whatsappUrl || `https://wa.me/923152181308`;
          actionLinks[1].target = '_blank';
          actionLinks[2].href = `mailto:${profile.email}`;
        }
        const listLinks = reachPanel.querySelectorAll('.Reach_list__T7LUX li');
        if (listLinks.length >= 4) {
          const pLink = listLinks[0].querySelector('a');
          if (pLink) {
            pLink.href = `tel:${profile.phone.replace(/\s+/g, '')}`;
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

      // 8. CV Section Title & Clean Native Download Button (Single Button)
      const duplicateBtn = document.getElementById('cv-download-btn');
      if (duplicateBtn) {
        duplicateBtn.remove();
      }

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
      const channelLabels = document.querySelectorAll('.OfflineTV_channel__bU_aV, [class*="OfflineTV_channel"], [class*="channel"]');
      channelLabels.forEach(el => {
        if (el.textContent.includes('SK//TV') || el.textContent.includes('CH 02')) {
          el.textContent = 'SK//TV · CH 02';
        }
      });

      // 10. Footer Branding & Single Clean Description Line
      const footerBase = document.querySelector('.ui_footerBase__6SSYI span');
      if (footerBase) {
        footerBase.textContent = `${seo.copyright || '© 2026 SALMAN KHAN | TECH WITH SALMAN'}`;
      }
      
      const footerRole = document.querySelector('.ui_footerRole__sPnI_');
      if (footerRole) {
        // Hide duplicated role line so only the location line appears
        footerRole.style.display = 'none';
      }

      const footerLocation = document.querySelectorAll('.ui_footer__CCdWi p.ui_mono__m5sMh, footer p.ui_mono__m5sMh');
      footerLocation.forEach(p => {
        p.textContent = 'CREATIVE DESIGNER, DEVELOPER & AI AUTOMATION BUILDER — KARACHI, PAKISTAN.';
        p.style.fontSize = '12px';
        p.style.fontWeight = '700';
        p.style.letterSpacing = '0.5px';
        p.style.color = '#F5B800';
      });

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
      isApplying = false;
    }
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
