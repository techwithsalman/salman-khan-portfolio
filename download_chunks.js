const fs = require('fs');
const https = require('https');
const path = require('path');

const chunks = [
  '8734.c7e0a9326b6dad2c.js',
  'bd904a5c.7ce1355f3bdfebab.js',
  'b536a0f1.5ce0c40327c4df77.js',
  'e49654ac.61e8e84f3695bd92.js',
  '1966.b8f83f7ba376c962.js',
  '3899.3f761f7e3a944e8c.js',
  '5297.14a7f182a2394b88.js',
  '8049.13655e3a7879c54d.js',
  '9682.f0a9df23cad9537c.js',
  '6681-d859c4ba975e66e4.js',
  '847-c7fdeab4ec5c89b7.js'
];

const destDir = path.join(__dirname, '2mcrafters.com', '_next', 'static', 'chunks');

function download(chunk) {
  return new Promise((resolve) => {
    const url = `https://2mcrafters.com/_next/static/chunks/${chunk}`;
    const filePath = path.join(destDir, chunk);
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(filePath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(filePath);
          console.log(`[SUCCESS] ${chunk} (${stats.size} bytes)`);
          resolve(true);
        });
      } else {
        console.log(`[FAILED ${res.statusCode}] ${chunk}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`[ERROR] ${chunk}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const c of chunks) {
    await download(c);
  }
  console.log('All chunk downloads complete.');
}

run();
