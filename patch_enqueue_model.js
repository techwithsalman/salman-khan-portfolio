const fs = require('fs');

const targetFiles = [
  '_next/static/chunks/3794-3be9945a719e8342.js',
  '2mcrafters.com/_next/static/chunks/3794-3be9945a719e8342.js'
];

const targetA = 'function A(e,t,r){if("pending"!==t.status)t.reason.enqueueModel(r);else{var n=t.value,u=t.reason;t.status="resolved_model",t.value=r,t.reason=e,null!==n&&(L(t),M(e,t,n,u))}}';
const replacementA = 'function A(e,t,r){if("pending"!==t.status){if(t.reason&&typeof t.reason.enqueueModel==="function")t.reason.enqueueModel(r)}else{var n=t.value,u=t.reason;t.status="resolved_model",t.value=r,t.reason=e,null!==n&&(L(t),M(e,t,n,u))}}';

const targetW = 'function w(e,t,r){if("pending"!==t.status&&"blocked"!==t.status)t.reason.error(r);else{var n=t.reason;t.status="rejected",t.reason=r,null!==n&&j(e,n,r)}}';
const replacementW = 'function w(e,t,r){if("pending"!==t.status&&"blocked"!==t.status){if(t.reason&&typeof t.reason.error==="function")t.reason.error(r)}else{var n=t.reason;t.status="rejected",t.reason=r,null!==n&&j(e,n,r)}}';

for (const f of targetFiles) {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    let replaced = 0;
    if (content.includes(targetA)) {
      content = content.replace(targetA, replacementA);
      replaced++;
    }
    if (content.includes(targetW)) {
      content = content.replace(targetW, replacementW);
      replaced++;
    }
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated ${f}: replaced ${replaced} targets.`);
  } else {
    console.log(`File not found: ${f}`);
  }
}
