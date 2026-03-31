/* ============================================================
   StudentAuth.js — Authentication + Submit + Report Engine
   Lean Six Sigma Interactive Platform
   ============================================================
   ARCHITECTURE: Zero-backend, localStorage-first
   LOADS ON: Every tool page (via <script> tag)
   ============================================================ */

// ── CONFIG ───────────────────────────────────────
const SHEETS_ENDPOINT = ''; // Phase 5: paste Google Apps Script URL here

// ── BOOT ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Inject CSS
    _injectAsset('link', { rel: 'stylesheet', href: 'StudentAuth.css' });

    // Inject Font Awesome if missing
    if (!document.querySelector('link[href*="font-awesome"]'))
        _injectAsset('link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' });

    // Inject Google Fonts if missing
    if (!document.querySelector('link[href*="fonts.googleapis"]'))
        _injectAsset('link', { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Orbitron:wght@400;500;600;700;800;900&display=swap" });

    // Track tool interactions (for scoring)
    window._lssInteracted = false;
    document.body.addEventListener('click', e => {
        const tag = e.target.tagName;
        if (['INPUT','BUTTON','SELECT','TEXTAREA'].includes(tag)) {
            if (!e.target.closest('#lss-login-overlay') && !e.target.closest('#lss-identity-pill'))
                window._lssInteracted = true;
        }
    });

    // Build the login modal (always inject into DOM)
    _buildLoginModal();

    // Check for existing profile
    const profile = _getProfile();
    if (!profile) {
        document.getElementById('lss-login-overlay').style.display = 'flex';
    } else {
        _initUI(profile);
    }
});

// ── HELPERS ──────────────────────────────────────
function _injectAsset(tag, attrs) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el[k] = v);
    document.head.appendChild(el);
}

function _getProfile() {
    try { return JSON.parse(localStorage.getItem('LSS_Profile')); } catch { return null; }
}

function _getProgress() {
    try { return JSON.parse(localStorage.getItem('LSS_Progress')) || {}; } catch { return {}; }
}

function _getToolName() {
    return document.title.split('|')[0].trim() || 'This Tool';
}

function _generateStudentId() {
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `STU-${year}-${rand}`;
}

// ── LOGIN MODAL ──────────────────────────────────
function _buildLoginModal() {
    const html = `
    <div id="lss-login-overlay">
        <div class="lss-login-card">
            <div class="lss-login-brand">
                <div class="brand-icon">⚡</div>
                <h2>Student Portal</h2>
                <p>Track your Lean Six Sigma mastery journey</p>
            </div>

            <div class="lss-field-group">
                <label>Full Name</label>
                <input type="text" id="lss-f-name" class="lss-field-input" placeholder="e.g. Ahmed Al-Dhaheri" autocomplete="name">
                <i class="fas fa-user field-icon"></i>
            </div>

            <div class="lss-field-group">
                <label>Email</label>
                <input type="email" id="lss-f-email" class="lss-field-input" placeholder="e.g. ahmed@company.com" autocomplete="email">
                <i class="fas fa-envelope field-icon"></i>
            </div>

            <div class="lss-field-group">
                <label>Organization</label>
                <input type="text" id="lss-f-org" class="lss-field-input" placeholder="e.g. Ministry of Health" autocomplete="organization">
                <i class="fas fa-building field-icon"></i>
            </div>

            <div class="lss-field-group">
                <label>Target Belt</label>
                <select id="lss-f-belt" class="lss-field-select">
                    <option value="Yellow Belt">🟡 Yellow Belt</option>
                    <option value="Green Belt" selected>🟢 Green Belt</option>
                    <option value="Black Belt">⚫ Black Belt</option>
                    <option value="Master Black Belt">🏆 Master Black Belt</option>
                </select>
                <i class="fas fa-award field-icon"></i>
            </div>

            <button class="lss-login-btn" onclick="lssSignIn()">
                <i class="fas fa-rocket"></i> Start My Journey
            </button>

            <div class="lss-login-footer">
                <i class="fas fa-shield-halved"></i> Your progress is saved locally & synced to your instructor.<br>
                No password required — just your name to get started.
            </div>
        </div>
    </div>

    <div id="lss-generating-overlay">
        <div class="generating-spinner"></div>
        <div class="generating-text">GENERATING REPORT</div>
        <div class="generating-sub">Capturing charts, data & analysis...</div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
}

// ── SIGN IN ──────────────────────────────────────
function lssSignIn() {
    const name  = document.getElementById('lss-f-name').value.trim();
    const email = document.getElementById('lss-f-email').value.trim();
    const org   = document.getElementById('lss-f-org').value.trim();
    const belt  = document.getElementById('lss-f-belt').value;

    if (!name) { _shake('lss-f-name'); return; }

    const profile = {
        id:    _generateStudentId(),
        name,
        email,
        org,
        belt,
        joined: new Date().toISOString()
    };

    // Check if returning student (by email)
    const existing = _getProfile();
    if (existing && existing.email === email) {
        profile.id = existing.id;
        profile.joined = existing.joined;
    }

    localStorage.setItem('LSS_Profile', JSON.stringify(profile));
    document.getElementById('lss-login-overlay').style.display = 'none';
    _initUI(profile);
}

function _shake(id) {
    const el = document.getElementById(id);
    el.style.borderColor = '#ef4444';
    el.style.animation = 'shake 0.4s ease';
    el.focus();
    setTimeout(() => { el.style.animation = ''; el.style.borderColor = ''; }, 500);
}

// ── INITIALIZE UI (after login) ──────────────────
function _initUI(profile) {
    const toolName = _getToolName();
    const progress = _getProgress();
    const isCompleted = !!progress[toolName];

    const pillHtml = `
    <div id="lss-identity-pill">
        <button id="lss-submit-btn" class="${isCompleted ? 'completed' : ''}" onclick="lssSubmitProgress()">
            <i class="fas ${isCompleted ? 'fa-check-circle' : 'fa-file-export'}"></i>
            ${isCompleted ? 'View Report' : 'Submit & Generate Report'}
        </button>
        <div class="pill-capsule" title="Click to edit profile">
            <div class="pill-avatar">${profile.name[0].toUpperCase()}</div>
            <div class="pill-details">
                <span class="pill-name">${profile.name}</span>
                <span class="pill-belt">${profile.belt}</span>
            </div>
            <div class="pill-actions">
                <i class="fas fa-chart-line pill-action-icon" title="My Dashboard" onclick="event.stopPropagation(); window.location.href='Student_Dashboard.html';"></i>
                <i class="fas fa-cog pill-action-icon" title="Edit Profile" onclick="event.stopPropagation(); lssEditProfile();"></i>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', pillHtml);
}

// ── EDIT PROFILE ─────────────────────────────────
function lssEditProfile() {
    const p = _getProfile() || {};
    document.getElementById('lss-f-name').value  = p.name  || '';
    document.getElementById('lss-f-email').value = p.email || '';
    document.getElementById('lss-f-org').value   = p.org   || '';
    document.getElementById('lss-f-belt').value  = p.belt  || 'Green Belt';
    document.getElementById('lss-login-overlay').style.display = 'flex';
}

// ============================================================
// PHASE 3: SUBMIT & REPORT ENGINE
// ============================================================

function lssSubmitProgress() {
    const toolName = _getToolName();
    const progress = _getProgress();

    // If already submitted, re-download the stored report
    if (progress[toolName] && progress[toolName].reportHtml) {
        _openReportPreview(progress[toolName].reportHtml, toolName);
        return;
    }

    // Show generating overlay
    document.getElementById('lss-generating-overlay').style.display = 'flex';

    // Short delay to let the overlay render before heavy DOM work
    setTimeout(() => {
        try {
            const reportData = _scanPage();
            const score = _calculateScore(reportData);
            const reportHtml = _buildReport(reportData, score);

            // Save to localStorage
            progress[toolName] = {
                score: score.total,
                badge: score.badge,
                breakdown: score.breakdown,
                date: new Date().toISOString(),
                reportHtml: reportHtml
            };
            localStorage.setItem('LSS_Progress', JSON.stringify(progress));

            // Update button state
            const btn = document.getElementById('lss-submit-btn');
            if (btn) {
                btn.classList.add('completed');
                btn.innerHTML = '<i class="fas fa-check-circle"></i> View Report';
            }

            // Sync to Google Sheets (fire-and-forget)
            _syncToSheets(toolName, score, reportData);

            // Hide generating overlay and show report
            document.getElementById('lss-generating-overlay').style.display = 'none';
            _openReportPreview(reportHtml, toolName);

        } catch (err) {
            console.error('Report generation error:', err);
            document.getElementById('lss-generating-overlay').style.display = 'none';
            alert('Report generation encountered an issue. Please try again.');
        }
    }, 600);
}

// ── PAGE SCANNER ─────────────────────────────────
function _scanPage() {
    const data = {
        title: '',
        inputs: [],
        charts: [],
        tables: [],
        stats: [],
        interpretations: [],
        verdicts: [],
        recommendations: [],
        processMaps: [],
        canvasImages: [],
        summaries: []
    };

    // 1. Title
    const h1 = document.querySelector('.container h1, h1');
    data.title = h1 ? h1.textContent.trim().replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim() : _getToolName();

    // 2. Input fields with values
    document.querySelectorAll('input[type="text"], input[type="number"], textarea, select').forEach(el => {
        if (el.closest('#lss-login-overlay') || el.closest('#lss-identity-pill')) return;
        const val = el.value.trim();
        if (!val || val === '0' || val === '-- Select --') return;

        let label = '';
        // Try to find associated label
        const labelEl = el.closest('.progress-form-group, .lss-field-group, .form-group, .meta-box');
        if (labelEl) {
            const lbl = labelEl.querySelector('label, .meta-label, h4, h3');
            if (lbl) label = lbl.textContent.trim();
        }
        if (!label && el.id) label = el.id.replace(/([A-Z])/g, ' $1').replace(/[-_]/g, ' ').trim();
        if (!label) label = el.placeholder || 'Field';

        data.inputs.push({ label, value: val, type: el.tagName.toLowerCase() });
    });

    // 3. Canvas elements (charts)
    document.querySelectorAll('canvas').forEach(canvas => {
        if (canvas.closest('#lss-login-overlay')) return;
        try {
            const imgData = canvas.toDataURL('image/png');
            if (imgData && imgData.length > 100) {
                data.charts.push({ image: imgData, width: canvas.width, height: canvas.height });
            }
        } catch (e) { /* cross-origin canvas, skip */ }
    });

    // 4. Tables with data
    document.querySelectorAll('table').forEach(table => {
        if (table.closest('#lss-login-overlay') || table.closest('#lss-identity-pill')) return;
        const rows = table.querySelectorAll('tr');
        if (rows.length < 2) return;

        const tableData = [];
        rows.forEach(row => {
            const cells = [];
            row.querySelectorAll('th, td').forEach(cell => {
                cells.push(cell.textContent.trim());
            });
            if (cells.length > 0 && cells.some(c => c.length > 0)) tableData.push(cells);
        });
        if (tableData.length > 1) data.tables.push(tableData);
    });

    // 5. Statistics / Key values
    const statSelectors = '.stat-value, .stat-card, .key-stat, .metric-value, .result-value, .calc-result, [id*="result"], [id*="stat"], [id*="output"], [id*="Score"], [id*="mean"], [id*="median"], [id*="sigma"], [id*="cpk"], [id*="pValue"]';
    document.querySelectorAll(statSelectors).forEach(el => {
        if (el.closest('#lss-login-overlay')) return;
        const text = el.textContent.trim();
        if (text && text.length > 0 && text.length < 200) {
            let label = '';
            const parent = el.closest('.stat-card, .metric-card, .result-card, .key-stat');
            if (parent) {
                const lbl = parent.querySelector('label, .stat-label, .metric-label, h4, h5, small');
                if (lbl) label = lbl.textContent.trim();
            }
            if (!label) label = el.id || '';
            data.stats.push({ label: label.replace(/([A-Z])/g, ' $1').trim(), value: text });
        }
    });

    // 6. Interpretations & Analysis text
    const interpSelectors = '.interpretation, .analysis-text, .ai-panel, #aiOutput, #aiPanel, .result-text, [id*="interpretation"], [id*="analysis"], .executive-summary';
    document.querySelectorAll(interpSelectors).forEach(el => {
        if (el.closest('#lss-login-overlay')) return;
        if (el.style.display === 'none' || el.offsetParent === null) return;
        const text = el.textContent.trim();
        if (text && text.length > 20) {
            data.interpretations.push(text.substring(0, 1500));
        }
    });

    // 7. Verdicts
    document.querySelectorAll('.verdict, [id*="verdict"], .conclusion, [id*="conclusion"]').forEach(el => {
        const text = el.textContent.trim();
        if (text && text.length > 5) data.verdicts.push(text);
    });

    // 8. Recommendations
    document.querySelectorAll('.recommendation, [id*="recommendation"], [id*="nextStep"]').forEach(el => {
        const text = el.textContent.trim();
        if (text && text.length > 5) data.recommendations.push(text);
    });

    // 9. Process / Timeline items
    document.querySelectorAll('.process-step, .timeline-item, .swimlane-row, .step-card').forEach(el => {
        const text = el.textContent.trim();
        if (text && text.length > 5) data.processMaps.push(text.substring(0, 300));
    });

    // 10. SVG visualizations → convert to image
    document.querySelectorAll('svg').forEach(svg => {
        if (svg.closest('#lss-login-overlay') || svg.closest('.zoom-controls')) return;
        if (svg.getBoundingClientRect().width < 50) return;
        try {
            const svgData = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);
            data.canvasImages.push({ type: 'svg', url: url });
        } catch (e) { /* skip */ }
    });

    return data;
}

// ── SCORING ENGINE ───────────────────────────────
function _calculateScore(data) {
    const breakdown = {};
    let total = 0;

    // Data Input (30%): How many fields were filled
    const inputScore = Math.min(data.inputs.length * 10, 100);
    breakdown.dataInput = Math.round(inputScore * 0.30);
    total += breakdown.dataInput;

    // Tool Interaction (20%): Did they click buttons / interact
    const interacted = window._lssInteracted ? 100 : 0;
    breakdown.interaction = Math.round(interacted * 0.20);
    total += breakdown.interaction;

    // Results Generated (25%): Are there stats, interpretations, verdicts
    const resultElements = data.stats.length + data.interpretations.length + data.verdicts.length;
    const resultScore = Math.min(resultElements * 15, 100);
    breakdown.results = Math.round(resultScore * 0.25);
    total += breakdown.results;

    // Charts/Visuals (15%): Were charts rendered
    const chartScore = data.charts.length > 0 ? 100 : (data.canvasImages.length > 0 ? 60 : 0);
    breakdown.visuals = Math.round(chartScore * 0.15);
    total += breakdown.visuals;

    // Report Quality (10%): Overall content richness
    const contentPieces = data.inputs.length + data.charts.length + data.tables.length + data.stats.length + data.interpretations.length;
    const qualityScore = Math.min(contentPieces * 8, 100);
    breakdown.quality = Math.round(qualityScore * 0.10);
    total += breakdown.quality;

    // Badge
    let badge = '';
    let color = '';
    if (total >= 90) { badge = '🏆 Mastery'; color = '#10b981'; }
    else if (total >= 70) { badge = '✅ Proficient'; color = '#3b82f6'; }
    else if (total >= 50) { badge = '🟡 Developing'; color = '#facc15'; }
    else { badge = '🔴 Needs Attention'; color = '#ef4444'; }

    return { total: Math.min(total, 100), badge, color, breakdown };
}

// ── REPORT BUILDER ───────────────────────────────
function _buildReport(data, score) {
    const profile = _getProfile() || { name: 'Student', belt: 'LSS', org: '', email: '', id: '' };
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    let html = `<!DOCTYPE html><html lang="en"><head>
    <meta charset="UTF-8">
    <title>${data.title} — Analysis Report</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Orbitron:wght@400;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Inter',sans-serif; color:#0f172a; background:#fff; padding:40px 50px; line-height:1.7; }
        .report-header { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:3px solid #3b82f6; padding-bottom:25px; margin-bottom:30px; }
        .report-title { font-family:'Orbitron',sans-serif; font-size:24px; font-weight:800; color:#0f172a; margin-bottom:4px; }
        .report-subtitle { color:#64748b; font-size:13px; }
        .report-meta { text-align:right; font-size:12px; color:#64748b; }
        .report-meta strong { color:#0f172a; display:block; font-size:14px; }
        .report-meta .belt-badge { background:linear-gradient(135deg,#3b82f6,#6366f1); color:#fff; padding:3px 12px; border-radius:20px; font-size:10px; font-weight:800; letter-spacing:1px; display:inline-block; margin-top:5px; }

        .section { margin-bottom:28px; page-break-inside:avoid; }
        .section-title { font-size:14px; font-weight:800; text-transform:uppercase; letter-spacing:2px; color:#3b82f6; margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid #e2e8f0; display:flex; align-items:center; gap:8px; }
        .section-body { font-size:13px; color:#334155; }

        .score-bar { display:flex; align-items:center; gap:15px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:20px 25px; margin-bottom:25px; }
        .score-ring { width:70px; height:70px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:900; color:#fff; flex-shrink:0; }
        .score-details h3 { font-size:18px; margin-bottom:2px; }
        .score-details p { font-size:12px; color:#64748b; }
        .score-breakdown { display:flex; gap:12px; margin-top:8px; flex-wrap:wrap; }
        .score-chip { background:#eef2ff; color:#3b82f6; padding:3px 10px; border-radius:20px; font-size:10px; font-weight:700; }

        .data-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
        .data-item { background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px; }
        .data-label { font-size:10px; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; font-weight:700; }
        .data-value { font-size:13px; color:#0f172a; font-weight:600; margin-top:2px; }

        .chart-img { width:100%; max-height:400px; object-fit:contain; border:1px solid #e2e8f0; border-radius:8px; margin:10px 0; }

        table { width:100%; border-collapse:collapse; font-size:12px; margin:10px 0; }
        th { background:#f1f5f9; color:#334155; padding:10px 12px; text-align:left; font-weight:700; border-bottom:2px solid #e2e8f0; }
        td { padding:8px 12px; border-bottom:1px solid #f1f5f9; color:#475569; }
        tr:nth-child(even) td { background:#fafbfc; }

        .text-block { background:#f8fafc; border-left:4px solid #3b82f6; padding:15px 20px; border-radius:0 8px 8px 0; white-space:pre-wrap; }

        .report-footer { margin-top:40px; padding-top:20px; border-top:2px solid #e2e8f0; display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; }

        @media print {
            body { padding:20px 30px; }
            .section { page-break-inside:avoid; }
        }
    </style>
    </head><body>`;

    // ─── HEADER
    html += `<div class="report-header">
        <div>
            <div class="report-title">${data.title}</div>
            <div class="report-subtitle">Lean Six Sigma Interactive Platform — Analysis Report</div>
        </div>
        <div class="report-meta">
            <strong>${profile.name}</strong>
            ${profile.org ? profile.org + '<br>' : ''}
            ${dateStr} — ${timeStr}<br>
            <span class="belt-badge">${profile.belt.toUpperCase()}</span>
        </div>
    </div>`;

    // ─── SCORE BAR
    html += `<div class="score-bar">
        <div class="score-ring" style="background:${score.color};">${score.total}%</div>
        <div class="score-details">
            <h3>${score.badge}</h3>
            <p>Auto-scored based on tool utilization and content completeness</p>
            <div class="score-breakdown">
                <span class="score-chip">Data: ${score.breakdown.dataInput}%</span>
                <span class="score-chip">Interaction: ${score.breakdown.interaction}%</span>
                <span class="score-chip">Results: ${score.breakdown.results}%</span>
                <span class="score-chip">Visuals: ${score.breakdown.visuals}%</span>
                <span class="score-chip">Quality: ${score.breakdown.quality}%</span>
            </div>
        </div>
    </div>`;

    // ─── INPUT DATA
    if (data.inputs.length > 0) {
        html += `<div class="section"><div class="section-title"><span>📋</span> Input Data</div><div class="data-grid">`;
        data.inputs.forEach(inp => {
            const displayVal = inp.value.length > 200 ? inp.value.substring(0, 200) + '...' : inp.value;
            html += `<div class="data-item"><div class="data-label">${_escHtml(inp.label)}</div><div class="data-value">${_escHtml(displayVal)}</div></div>`;
        });
        html += `</div></div>`;
    }

    // ─── CHARTS / VISUALIZATIONS
    if (data.charts.length > 0) {
        html += `<div class="section"><div class="section-title"><span>📊</span> Visualization & Charts</div><div class="section-body">`;
        data.charts.forEach(chart => {
            html += `<img src="${chart.image}" class="chart-img" alt="Analysis Chart">`;
        });
        html += `</div></div>`;
    }

    // ─── TABLES
    if (data.tables.length > 0) {
        html += `<div class="section"><div class="section-title"><span>📐</span> Key Statistics</div><div class="section-body">`;
        data.tables.forEach(tableData => {
            html += '<table>';
            tableData.forEach((row, i) => {
                html += '<tr>';
                row.forEach(cell => {
                    html += i === 0 ? `<th>${_escHtml(cell)}</th>` : `<td>${_escHtml(cell)}</td>`;
                });
                html += '</tr>';
            });
            html += '</table>';
        });
        html += `</div></div>`;
    }

    // ─── STANDALONE STATS
    if (data.stats.length > 0) {
        html += `<div class="section"><div class="section-title"><span>🔢</span> Computed Statistics</div><div class="data-grid">`;
        data.stats.forEach(s => {
            html += `<div class="data-item"><div class="data-label">${_escHtml(s.label)}</div><div class="data-value">${_escHtml(s.value)}</div></div>`;
        });
        html += `</div></div>`;
    }

    // ─── ANALYSIS / INTERPRETATION
    if (data.interpretations.length > 0) {
        html += `<div class="section"><div class="section-title"><span>🔬</span> Analysis Report & Interpretation</div><div class="section-body">`;
        data.interpretations.forEach(text => {
            html += `<div class="text-block">${_escHtml(text)}</div>`;
        });
        html += `</div></div>`;
    }

    // ─── VERDICTS
    if (data.verdicts.length > 0) {
        html += `<div class="section"><div class="section-title"><span>⚖️</span> Verdict</div><div class="section-body">`;
        data.verdicts.forEach(v => {
            html += `<div class="text-block">${_escHtml(v)}</div>`;
        });
        html += `</div></div>`;
    }

    // ─── RECOMMENDATIONS
    if (data.recommendations.length > 0) {
        html += `<div class="section"><div class="section-title"><span>💡</span> Recommendations</div><div class="section-body">`;
        data.recommendations.forEach(r => {
            html += `<div class="text-block">${_escHtml(r)}</div>`;
        });
        html += `</div></div>`;
    }

    // ─── PROCESS / TIMELINE
    if (data.processMaps.length > 0) {
        html += `<div class="section"><div class="section-title"><span>🔄</span> Process Data & Timeline</div><div class="section-body">`;
        data.processMaps.forEach((step, i) => {
            html += `<div class="data-item" style="margin-bottom:6px;"><div class="data-label">Step ${i + 1}</div><div class="data-value">${_escHtml(step)}</div></div>`;
        });
        html += `</div></div>`;
    }

    // ─── FOOTER
    html += `<div class="report-footer">
        <span>Lean Six Sigma Interactive Platform — ${profile.belt}</span>
        <span>Student ID: ${profile.id || 'N/A'} | Generated: ${dateStr} at ${timeStr}</span>
        <span>Confidential — For Training Purposes Only</span>
    </div>`;

    html += `</body></html>`;
    return html;
}

// ── REPORT PREVIEW (opens in new tab) ────────────
function _openReportPreview(reportHtml, toolName) {
    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');

    // Fallback: if popup blocked, download instead
    if (!win) {
        const a = document.createElement('a');
        a.href = url;
        a.download = `${toolName.replace(/[^a-z0-9]/gi, '_')}_Report.html`;
        a.click();
    }
}

// ── ESCAPE HTML ──────────────────────────────────
function _escHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

// ── GOOGLE SHEETS SYNC ──────────────────────────
function _syncToSheets(toolName, score, reportData) {
    if (!SHEETS_ENDPOINT || SHEETS_ENDPOINT.trim() === '') return;

    const profile = _getProfile() || {};
    fetch(SHEETS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            studentId: profile.id || '',
            studentName: profile.name || 'Anonymous',
            email: profile.email || '',
            organization: profile.org || '',
            beltTarget: profile.belt || '',
            toolName: toolName,
            finalScore: score.total,
            badge: score.badge.replace(/🏆|✅|🟡|🔴/g, '').trim(),
            dataInputScore: score.breakdown.dataInput,
            interactionScore: score.breakdown.interaction,
            resultsScore: score.breakdown.results,
            visualsScore: score.breakdown.visuals,
            qualityScore: score.breakdown.quality,
            fieldsDetected: reportData.inputs.length,
            chartsDetected: reportData.charts.length,
            tablesDetected: reportData.tables.length,
            submittedAt: new Date().toLocaleString()
        })
    }).catch(() => { /* silent fail */ });
}

// ── CSS ANIMATION (for shake) ────────────────────
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }`;
document.head.appendChild(shakeStyle);
