const fs = require('fs');
const https = require('https');
const path = require('path');

const profileDir = path.join(__dirname, '2mcrafters.com', 'images', 'mohamedandaloussi', 'profile');

const videos = [
  'IT.mp4',
  'Graphic_designer.mp4',
  'editing.mp4',
  'meta.mp4',
  'photog.mp4'
];

function download(file) {
  return new Promise((resolve) => {
    const dest = path.join(profileDir, file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      return resolve(true);
    }
    const url = `https://2mcrafters.com/images/mohamedandaloussi/profile/${file}`;
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const f = fs.createWriteStream(dest);
        res.pipe(f);
        f.on('finish', () => {
          f.close();
          const stats = fs.statSync(dest);
          console.log(`[OK] ${file} (${stats.size} bytes)`);
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
  for (const v of videos) {
    await download(v);
  }
  console.log('Videos download complete.');
}

run();
