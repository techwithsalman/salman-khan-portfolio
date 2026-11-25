const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const targetUrl = 'http://127.0.0.1:8080/2mcrafters.com/mohamedandaloussi/index.html';
const outDir = path.join(__dirname, 'screenshots');

async function verifyFinalPhase() {
  console.log('[QA Final] Launching Microsoft Edge...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('[QA Final] Navigating to:', targetUrl);
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4500));

  // 1. Hero
  console.log('[QA Final] Capturing final_01_hero.png...');
  await page.screenshot({ path: path.join(outDir, 'final_01_hero.png') });

  // 2. Wheel into Laptop Dive (Project 01)
  console.log('[QA Final] Stepping into laptop showcase...');
  await page.mouse.wheel({ deltaY: 100 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, 'final_02_laptop_project_01.png') });

  // Scroll through to Project 04
  await page.mouse.wheel({ deltaY: 100 });
  await new Promise(r => setTimeout(r, 1000));
  await page.mouse.wheel({ deltaY: 100 });
  await new Promise(r => setTimeout(r, 1000));
  await page.mouse.wheel({ deltaY: 100 });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outDir, 'final_03_laptop_project_04.png') });

  // Scroll through to Project 08
  for (let i = 5; i <= 8; i++) {
    await page.mouse.wheel({ deltaY: 100 });
    await new Promise(r => setTimeout(r, 1000));
  }
  await page.screenshot({ path: path.join(outDir, 'final_04_laptop_project_08.png') });

  // Scroll on Project 08 to unpin into 3D Gallery
  console.log('[QA Final] Unpinning into 3D PUBG Gallery Corridor...');
  await page.mouse.wheel({ deltaY: 120 });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(outDir, 'final_05_pubg_3d_gallery.png') });

  // 3. Scroll to CV Battleground Section
  console.log('[QA Final] Scrolling to CV Battleground Section...');
  await page.evaluate(() => {
    const cv = document.getElementById('cv');
    if (cv) cv.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'final_06_pubg_cv_battleground.png') });

  // 4. Scroll to Thanks for Watching Closing Scene (TV)
  console.log('[QA Final] Scrolling to Closing TV Scene...');
  await page.evaluate(() => {
    const offline = document.querySelector('[class*="OfflineTV_offline"]');
    if (offline) {
      window.scrollTo({ top: offline.offsetTop + 100, behavior: 'instant' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight - 1200, behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: path.join(outDir, 'final_07_closing_tv_scene.png') });

  // 5. Scroll to Tactical Footer
  console.log('[QA Final] Scrolling to Tactical Footer...');
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'final_08_tactical_footer.png') });

  // 6. Responsive Viewports
  const viewports = [
    { name: '1649x928', width: 1649, height: 928 },
    { name: '1440x900', width: 1440, height: 900 },
    { name: '1366x768', width: 1366, height: 768 },
    { name: '768x1024_tablet', width: 768, height: 1024 },
    { name: '390x844_mobile', width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    console.log(`[QA Final] Testing ${vp.name}...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(outDir, `final_09_hero_${vp.name}.png`) });
  }

  await browser.close();
  console.log('[QA Final] All screenshots captured successfully.');
}

verifyFinalPhase().catch(err => {
  console.error('[QA Final Error]', err);
  process.exit(1);
});
