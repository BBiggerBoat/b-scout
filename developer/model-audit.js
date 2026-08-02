(function () {
  'use strict';
  const engine = window.BScoutModelCompleteness;
  let audit = null;
  let visibleRecords = [];

  const $ = id => document.getElementById(id);
  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const scoreClass = score => score < 70 ? 'low' : score < 90 ? 'medium' : 'high';

  async function init() {
    const response = await fetch('../boatmodels.json');
    if (!response.ok) throw new Error('Boat Model dataset could not be loaded.');
    audit = engine.auditModels(await response.json());
    populateGroupFilter();
    renderSummary();
    renderInsights();
    applyFilters();
    bindEvents();
  }

  function populateGroupFilter() {
    $('groupFilter').insertAdjacentHTML('beforeend', audit.groups.map(group => `<option value="${group.id}">${escapeHtml(group.label)}</option>`).join(''));
  }

  function renderSummary() {
    const metrics = [
      ['Production models', audit.actionableTotal, 'Records evaluated for research completeness'],
      ['Identity placeholders', audit.identityPlaceholders, 'Retained for imperfect listings; not scored as research gaps'],
      ['Average completeness', `${audit.average}%`, 'Weighted across all data areas'],
      ['Search-data average', `${audit.searchAverage}%`, 'Fields used by discovery and exclusions'],
      ['Research priority', audit.priority, 'Production models below 70%'],
      ['Images needed', audit.missingImages, 'Missing or placeholder image']
    ];
    $('auditSummary').innerHTML = metrics.map(([label,value,note]) => `<article class="audit-metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`).join('');
  }

  function renderInsights() {
    $('commonMissing').innerHTML = audit.commonMissing.slice(0, 12).map(item => `<li>${escapeHtml(item.label)} <span>${item.count} · ${item.percent}%</span></li>`).join('');
    $('weightList').innerHTML = audit.groups.map(group => `<li><span>${escapeHtml(group.label)}</span><strong>${group.weight}%</strong></li>`).join('');
  }

  function applyFilters() {
    const query = $('auditSearch').value.trim().toLowerCase();
    const score = $('scoreFilter').value;
    const group = $('groupFilter').value;
    const image = $('imageFilter').value;
    visibleRecords = audit.records.filter(record => {
      const textMatch = !query || `${record.displayName} ${record.BoatModelID}`.toLowerCase().includes(query);
      const scoreMatch = score === 'all' || (score === 'critical' && record.score < 70) || (score === 'developing' && record.score >= 70 && record.score < 90) || (score === 'complete' && record.score >= 90);
      const groupMatch = group === 'all' || record.groups.find(item => item.id === group)?.missing.length > 0;
      const imageMatch = image === 'all' || (image === 'missing' && !record.hasImage) || (image === 'present' && record.hasImage);
      return textMatch && scoreMatch && groupMatch && imageMatch;
    });
    const sort = $('sortAudit').value;
    visibleRecords.sort((a,b) => sort === 'search-asc' ? a.searchScore - b.searchScore || a.score - b.score : sort === 'missing-desc' ? b.missingCount - a.missingCount || a.score - b.score : sort === 'name' ? a.displayName.localeCompare(b.displayName) : a.score - b.score || a.searchScore - b.searchScore);
    renderRows();
  }

  function renderRows() {
    $('auditResultCount').textContent = `${visibleRecords.length} of ${audit.total} models shown`;
    $('auditRows').innerHTML = visibleRecords.length ? visibleRecords.map(record => `<tr>
      <td class="audit-model-name"><strong>${escapeHtml(record.displayName || record.BoatModelID)}</strong><small>${escapeHtml(record.BoatModelID)} · ${escapeHtml(record.auditDisposition)}</small></td>
      <td>${record.actionable ? `<span class="score-pill ${scoreClass(record.score)}">${record.score}%</span>` : '<span class="score-pill medium">Not scored</span>'}</td>
      <td>${record.actionable ? `<span class="score-pill ${scoreClass(record.searchScore)}">${record.searchScore}%</span>` : '<span class="score-pill medium">Identity</span>'}</td>
      <td>${record.missingCount}</td>
      <td class="audit-image-state">${record.hasImage ? 'Available' : 'Needed'}</td>
      <td><button type="button" class="audit-detail-btn" data-model-id="${escapeHtml(record.BoatModelID)}">Review</button></td>
    </tr>`).join('') : '<tr><td class="audit-empty" colspan="6">No model records match these audit filters.</td></tr>';
    document.querySelectorAll('.audit-detail-btn').forEach(button => button.addEventListener('click', () => openDetail(button.dataset.modelId)));
  }

  function openDetail(id) {
    const record = audit.records.find(item => item.BoatModelID === id);
    if (!record) return;
    $('detailTitle').textContent = record.displayName || record.BoatModelID;
    $('detailContent').innerHTML = `<div class="detail-score-row"><div class="detail-score"><span>Audit disposition</span><strong>${escapeHtml(record.auditDisposition)}</strong></div>${record.actionable ? `<div class="detail-score"><span>Overall completeness</span><strong>${record.score}%</strong></div><div class="detail-score"><span>Search-critical completeness</span><strong>${record.searchScore}%</strong></div>` : '<div class="detail-score"><span>Completeness scoring</span><strong>Not applicable</strong></div>'}</div>
      ${record.groups.map(group => `<section class="audit-group"><h3><span>${escapeHtml(group.label)}</span><span>${group.percent}%</span></h3>${group.missing.length ? `<div class="missing-chips">${group.missing.map(field => `<span class="missing-chip">${escapeHtml(engine.FIELD_LABELS[field] || field)}</span>`).join('')}</div>` : '<p>All audited fields are populated.</p>'}</section>`).join('')}
      <section class="audit-group"><h3><span>Representative image</span><span>${record.hasImage ? 'Available' : 'Needed'}</span></h3></section>`;
    $('auditDetail').showModal();
  }

  function exportCsv() {
    const headers = ['BoatModelID','Model','AuditDisposition','OverallScore','SearchScore','MissingFieldCount','ImageStatus','ResearchStatus','DataConfidence','MissingFields'];
    const rows = visibleRecords.map(record => [record.BoatModelID, record.displayName, record.auditDisposition, record.score, record.searchScore, record.missingCount, record.hasImage ? 'Available' : 'Needed', record.researchStatus, record.confidence, record.missingFields.map(item => item.label).join('; ')]);
    const quote = value => `"${String(value ?? '').replace(/"/g,'""')}"`;
    const csv = [headers, ...rows].map(row => row.map(quote).join(',')).join('\r\n');
    const blob = new Blob(['\ufeff', csv], {type:'text/csv;charset=utf-8'});
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'b-scout-model-completeness-audit.csv'; link.click(); URL.revokeObjectURL(link.href);
  }

  function bindEvents() {
    ['auditSearch','scoreFilter','groupFilter','imageFilter','sortAudit'].forEach(id => $(id).addEventListener(id === 'auditSearch' ? 'input' : 'change', applyFilters));
    $('exportAudit').addEventListener('click', exportCsv);
    $('closeDetail').addEventListener('click', () => $('auditDetail').close());
  }

  init().catch(error => { $('auditRows').innerHTML = `<tr><td class="audit-empty" colspan="6">${escapeHtml(error.message)}</td></tr>`; console.error(error); });
})();
