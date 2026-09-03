'use strict';
const fs=require('fs');
const index=fs.readFileSync('index.html','utf8');
const workspace=fs.readFileSync('boatworkspace.js','utf8');
const script=fs.readFileSync('script.js','utf8');
const errors=[];
for(const id of ['shareGuideBtn','copyGuideLink','emailGuideLink','facebookGuideLink','copyGuideSummary']) if(!index.includes(`id="${id}"`)) errors.push(`Missing share control ${id}`);
if(!index.includes('<base href="/">'))errors.push('SPA base href missing for permanent History API paths');
if(workspace.includes('<h3>Find This Model</h3>'))errors.push('Public model listing search is still rendered in Buy');
if(workspace.includes('market-source-grid'))errors.push('Marketplace source grid is still rendered in Buy');
if(!workspace.includes('id="addWorkspaceListing"'))errors.push('Add Listing was accidentally removed');
if(!workspace.includes('Known Problems'))errors.push('Buying-decision content was accidentally removed');
if(!script.includes('public marketplace/listing search is intentionally suppressed'))errors.push('Legacy notebook listing search is not suppressed');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('PASS: listing search hidden; Add Listing, buying guidance, permanent sharing controls retained.');
