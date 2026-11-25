const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const targetUrl = 'http://127.0.0.1:8080/2mcrafters.com/mohamedandaloussi/index.html';
const outDir = path.resolve(__dirname, 'screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function runVerification() {
  console.log('Launching browser with hardware WebGL...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--use-gl=angle']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('[Personalizer]') || text.includes('[Gallery]')) {
      console.log('PAGE:', text);
    }
  });

  console.log('Navigating to', targetUrl);
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4000));

  // Scroll directly to gallery section
  console.log('Scrolling to #gallery...');
  await page.evaluate(() => {
    const g = document.getElementById('gallery');
    if (g) {
      g.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await new Promise(r => setTimeout(r, 2000));

  // View 1: Entrance position
  console.log('Capturing Position 1: Entrance view...');
  await page.evaluate(() => {
    if (window.__galleryInstance) {
      window.__galleryInstance.setScrollWalk(0.02);
      window.__galleryInstance.resize();
    }
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'gallery_01_entrance.png') });

  // View 2: Mid-curve walk with illuminated artwork
  console.log('Navigating to Position 2: Mid-curve...');
  await page.evaluate(() => {
    if (window.__galleryInstance) {
      window.__galleryInstance.setScrollWalk(0.35);
    }
  });
  // Simulate slight mouse drag to dynamically steer camera
  const canvas = await page.$('.PrintGallery_canvas__AYIfq');
  if (canvas) {
    const box = await canvas.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.35, box.y + box.height * 0.5, { steps: 15 });
      await page.mouse.up();
    }
  }
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'gallery_02_mid_curve.png') });

  // View 3: Warm amber road reflections and exit portal view
  console.log('Navigating to Position 3: Warm amber exit view...');
  await page.evaluate(() => {
    if (window.__galleryInstance) {
      window.__galleryInstance.setScrollWalk(0.70);
    }
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'gallery_03_warm_exit.png') });

  // View 4: Poster Click / Close-up
  console.log('Testing poster click close-up...');
  if (canvas) {
    const box = await canvas.boundingBox();
    if (box) {
      // Click right-side poster area
      await page.mouse.click(box.x + box.width * 0.72, box.y + box.height * 0.42);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  await page.screenshot({ path: path.join(outDir, 'gallery_04_poster_closeup.png') });

  // View 5: Gallery / List view toggle
  console.log('Testing List view toggle...');
  await page.evaluate(() => {
    // Find list button in toggle
    const buttons = Array.from(document.querySelectorAll('.PrintGallery_toggle__38yZE button, button'));
    const listBtn = buttons.find(b => b.textContent && b.textContent.trim() === 'List');
    if (listBtn) {
      listBtn.click();
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, 'gallery_05_list_view.png') });

  console.log('All gallery verification views captured successfully!');
  await browser.close();
}

runVerification().catch(console.error);
