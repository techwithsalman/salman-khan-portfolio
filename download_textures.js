const fs = require('fs');
const https = require('https');
const path = require('path');

const galleryDir = path.join(__dirname, '2mcrafters.com', 'images', 'mohamedandaloussi', 'gallery');
if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
}

const textures = ['asphalt.webp', 'curb.webp', 'soil.webp', 'flowers.webp'];

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(dest);
          console.log(`[OK] ${path.basename(dest)} (${stats.size} bytes)`);
          resolve(true);
        });
      } else {
        console.log(`[FAIL ${res.statusCode}] ${url}`);
        resolve(false);
      }
    }).on('error', (e) => {
      console.log(`[ERR] ${url}:`, e.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const t of textures) {
    const url = `https://2mcrafters.com/images/mohamedandaloussi/gallery/${t}`;
    const dest = path.join(galleryDir, t);
    await downloadFile(url, dest);
  }
}

run();
