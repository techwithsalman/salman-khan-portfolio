const fs = require('fs');
const https = require('https');
const path = require('path');

const optDir = path.join(__dirname, '2mcrafters.com', 'images', 'mohamedandaloussi', 'profile', 'optimized');
if (!fs.existsSync(optDir)) {
  fs.mkdirSync(optDir, { recursive: true });
}

function download(file) {
  return new Promise((resolve) => {
    const dest = path.join(optDir, file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      return resolve(true);
    }
    const url = `https://2mcrafters.com/images/mohamedandaloussi/profile/optimized/${file}`;
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const f = fs.createWriteStream(dest);
        res.pipe(f);
        f.on('finish', () => {
          f.close();
          console.log(`[OK] ${file}`);
          resolve(true);
        });
      } else {
        console.log(`[${res.statusCode}] ${file}`);
        resolve(false);
      }
    }).on('error', () => resolve(false));
  });
}

async function run() {
  const filesToDownload = [];
  for (let i = 1; i <= 34; i++) {
    filesToDownload.push(`post-${i}-jpg-480.webp`);
    filesToDownload.push(`post-${i}-jpg-800.webp`);
  }
  filesToDownload.push('post-1-png-480.webp', 'post-1-png-800.webp');
  filesToDownload.push('post-2-png-480.webp', 'post-2-png-800.webp');

  console.log(`Starting download of ${filesToDownload.length} files...`);
  for (const f of filesToDownload) {
    await download(f);
  }
  console.log('Finished downloading post images.');
}

run();
