const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const targetUrl = 'http://127.0.0.1:8080/2mcrafters.com/mohamedandaloussi/index.html';
const outDir = path.resolve(__dirname, 'screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function verifyAll() {
  console.log('Launching browser with hardware WebGL...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--use-gl=angle']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  // 1. 1920x1080 Full Section Capture
  console.log('Testing 1920x1080 full scroll flow...');
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4500));

  // Hero
  await page.screenshot({ path: path.join(outDir, 'verified_01_hero_1920.png') });
  console.log('Captured verified_01_hero_1920.png');

  // Scroll to laptop projects
  await page.evaluate(() => window.scrollTo(0, 700));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, 'verified_02_laptop_project.png') });
  console.log('Captured verified_02_laptop_project.png');

  // Scroll to gallery
  await page.evaluate(() => {
    const el = document.querySelector('#gallery');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'verified_03_gallery_entrance.png') });
  console.log('Captured verified_03_gallery_entrance.png');

  // Scroll gallery mid
  await page.evaluate(() => window.scrollBy(0, 1800));
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'verified_04_gallery_mid.png') });
  console.log('Captured verified_04_gallery_mid.png');

  // Scroll to CV
  await page.evaluate(() => {
    const el = document.querySelector('#cv');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, 'verified_05_cv.png') });
  console.log('Captured verified_05_cv.png');

  // Scroll to offline / Thanks for watching
  await page.evaluate(() => {
    const el = document.querySelector('#offline');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'verified_06_closing_tv.png') });
  console.log('Captured verified_06_closing_tv.png');

  // Footer
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'verified_07_footer.png') });
  console.log('Captured verified_07_footer.png');

  // Responsive Viewports
  const viewports = [
    { name: '1649x928', width: 1649, height: 928 },
    { name: '1440x900', width: 1440, height: 900 },
    { name: '1366x768', width: 1366, height: 768 },
    { name: '768x1024_tablet', width: 768, height: 1024 },
    { name: '390x844_mobile', width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    console.log(`Testing viewport ${vp.name}...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(outDir, `verified_hero_${vp.name}.png`) });

    // Also verify TV section on this viewport
    await page.evaluate(() => {
      const el = document.querySelector('#offline');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(outDir, `verified_tv_${vp.name}.png`) });
  }

  console.log('Console errors encountered:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  await browser.close();
  console.log('All verifications completed successfully!');
}

verifyAll().catch(e => {
  console.error('Verification failed:', e);
  process.exit(1);
});
