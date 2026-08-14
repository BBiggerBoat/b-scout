const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const models = JSON.parse(fs.readFileSync(path.join(root, 'boatmodels.json'), 'utf8'));
const registryPath = path.join(root, 'data', 'imageassets.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const imageDir = path.join(root, 'images');

const exists = rel => !!rel && fs.existsSync(path.join(root, rel));
const basenamePrefix = rel => path.basename(rel || '').toLowerCase().split(/[-_.]/)[0];
const idPrefix = id => String(id || '').slice(0, 4).toLowerCase();
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

const modelRefs = new Map(models.map(m => [m.BoatModelID, m]));
const assetById = new Map((registry.assets || []).map(a => [a.boatModelId, a]));
const referenced = new Set(models.map(m => m.ImageURL).filter(Boolean));
const imageFiles = fs.readdirSync(imageDir).filter(f => fs.statSync(path.join(imageDir, f)).isFile()).map(f => `images/${f}`);

const report = {
  generatedAt: new Date().toISOString(),
  modelCount: models.length,
  imageFileCount: imageFiles.length,
  registryCount: (registry.assets || []).length,
  prefixMismatches: [],
  missingRequestedFiles: [],
  registryStaleMissing: [],
  registryAvailableButMissing: [],
  manufacturerPrefixInconsistencies: [],
  orphanModelImages: [],
  siteAssets: [],
  exactDuplicateGroups: [],
  duplicateIdentityCandidates: []
};

for (const m of models) {
  const rel = m.ImageURL;
  if (rel && basenamePrefix(rel) !== idPrefix(m.BoatModelID)) {
    report.prefixMismatches.push({boatModelId:m.BoatModelID, manufacturer:m.Manufacturer, model:m.Model, imageURL:rel, expectedPrefix:idPrefix(m.BoatModelID), actualPrefix:basenamePrefix(rel)});
  }
  if (rel && !exists(rel)) report.missingRequestedFiles.push({boatModelId:m.BoatModelID, manufacturer:m.Manufacturer, model:m.Model, imageURL:rel});
}

for (const a of registry.assets || []) {
  const requestedExists = exists(a.requestedPath);
  if (a.status === 'missing' && requestedExists) report.registryStaleMissing.push({boatModelId:a.boatModelId, requestedPath:a.requestedPath, registryPath:a.path});
  if (a.status === 'available' && !exists(a.path)) report.registryAvailableButMissing.push({boatModelId:a.boatModelId, path:a.path});
}

const manufacturerPrefixes = new Map();
for (const m of models) {
  if (!manufacturerPrefixes.has(m.Manufacturer)) manufacturerPrefixes.set(m.Manufacturer, new Map());
  const p = String(m.BoatModelID || '').slice(0,4);
  const mp = manufacturerPrefixes.get(m.Manufacturer);
  mp.set(p, (mp.get(p)||0)+1);
}
for (const [manufacturer, counts] of manufacturerPrefixes) {
  if (counts.size > 1) report.manufacturerPrefixInconsistencies.push({manufacturer, prefixes:Object.fromEntries(counts)});
}

const siteAssetNames = new Set(['boat-placeholder.svg','bscout-horizontal-lockup.png','header.png','bscout-wordmark-wave.svg']);
for (const rel of imageFiles) {
  if (referenced.has(rel)) continue;
  const filename = path.basename(rel);
  if (siteAssetNames.has(filename)) report.siteAssets.push(rel);
  else report.orphanModelImages.push(rel);
}

const hashes = new Map();
for (const rel of imageFiles) {
  if (siteAssetNames.has(path.basename(rel))) continue;
  const h = sha(path.join(root, rel));
  if (!hashes.has(h)) hashes.set(h, []);
  hashes.get(h).push(rel);
}
for (const [hash, files] of hashes) if (files.length > 1) report.exactDuplicateGroups.push({hash, files});

// Conservative identity candidates: same manufacturer and same leading numeric model token.
const identityGroups = new Map();
for (const m of models) {
  const token = String(m.Model||'').match(/\d+(?:\.\d+)?/);
  if (!token) continue;
  const key = `${m.Manufacturer}::${token[0]}`;
  if (!identityGroups.has(key)) identityGroups.set(key, []);
  identityGroups.get(key).push({boatModelId:m.BoatModelID, model:m.Model, imageURL:m.ImageURL, researchStatus:m.ResearchStatus});
}
for (const [key, list] of identityGroups) {
  const prefixes = new Set(list.map(x => x.boatModelId.slice(0,4)));
  if (list.length > 1 && prefixes.size > 1) report.duplicateIdentityCandidates.push({key, records:list});
}

const out = path.join(root, 'developer', 'reports', 'model-image-audit.json');
fs.mkdirSync(path.dirname(out), {recursive:true});
fs.writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({
  modelCount:report.modelCount,
  imageFileCount:report.imageFileCount,
  prefixMismatches:report.prefixMismatches.length,
  missingRequestedFiles:report.missingRequestedFiles.length,
  registryStaleMissing:report.registryStaleMissing.length,
  manufacturerPrefixInconsistencies:report.manufacturerPrefixInconsistencies.length,
  orphanModelImages:report.orphanModelImages.length,
  exactDuplicateGroups:report.exactDuplicateGroups.length,
  duplicateIdentityCandidates:report.duplicateIdentityCandidates.length
}, null, 2));
