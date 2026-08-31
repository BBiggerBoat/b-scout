#!/usr/bin/env node
const fs = require('fs');
const https = require('https');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HOST = 'b-atlas.org';
const KEY = '7ec2c4a2ebce4b11a764cb71628ae16c';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]).filter(u => u.startsWith(`https://${HOST}/`));

if (!urls.length) throw new Error('No canonical B-Atlas URLs found in sitemap.xml');

const payload = JSON.stringify({host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls});
const req = https.request({
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {'Content-Type':'application/json; charset=utf-8','Content-Length':Buffer.byteLength(payload)}
}, res => {
  let body='';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log(`IndexNow HTTP ${res.statusCode}`);
    if (body) console.log(body);
    if (res.statusCode >= 300) process.exitCode = 1;
  });
});
req.on('error', err => { console.error(err); process.exitCode = 1; });
req.write(payload);
req.end();
