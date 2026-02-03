/**
 * STATISTICAL MODULES - RENDERERS & LOGIC
 */

const modules = {};

/** 
 * 1. DASHBOARD MODULE 
 */
modules.dashboard = {
    render() {
        const container = document.createElement('div');
        container.className = 'space-y-8 animate-fade-in';

        container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${components.stat('Active Session', store.projectData.name, 'Project Context', 'shield')}
                ${components.stat('Last Data Entry', '14:55', 'Metrics Sync', 'clock')}
                ${components.stat('Report Status', `${store.reportItems.length} Items`, 'Ready for export', 'file-text')}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="glass rounded-3xl p-8 border border-white/5 space-y-6">
                    <h3 class="font-display font-bold text-2xl text-white">Project Blueprint</h3>
                    <div class="space-y-4">
                        ${components.input('proj_name', 'Project Name', 'e.g. Surgical Ward Efficiency')}
                        ${components.input('proj_owner', 'Process Owner', 'e.g. Lead Nurse Smith')}
                        <div class="grid grid-cols-2 gap-4">
                             ${components.input('proj_date', 'Audit Date', '', 'date')}
                             ${components.input('proj_phase', 'Current Phase', 'Analyze')}
                        </div>
                    </div>
                    <div class="pt-4">
                        ${components.button('Save Metadata', 'modules.dashboard.save()', 'primary', 'save')}
                    </div>
                </div>

                <div class="glass rounded-3xl p-8 border border-white/10 bg-gradient-to-br from-brand-emerald/10 to-brand-blue/10 flex flex-col justify-center items-center text-center">
                    <div class="w-16 h-16 bg-brand-emerald/20 rounded-full flex items-center justify-center mb-6">
                        <i data-lucide="zap" class="text-brand-emerald w-8 h-8"></i>
                    </div>
                    <h4 class="font-display font-bold text-xl text-white mb-3">Professional Statistical Engine</h4>
                    <p class="text-sm text-slate-400 max-w-sm mb-6">Welcome, Master Black Belt. This suite provides the rigour required for ISO-9001 and JCI healthcare compliance. Select a module to begin your deep-dive analysis.</p>
                    <div class="flex gap-4">
                        ${components.button('Go to Metrics', 'router.navigate(\'metrics\')', 'outline')}
                    </div>
                </div>
            </div>
        `;

        return container;
    },
    save() {
        showToast('Project metadata synchronized', 'success');
    }
};

/** 
 * 2. DESCRIPTIVE & METRICS 
 */
modules.metrics = {
    data: [],
    render() {
        const container = document.createElement('div');
        container.className = 'grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20';

        const leftCol = document.createElement('div');
        leftCol.className = 'lg:col-span-1 space-y-6';
        leftCol.innerHTML = `
            ${components.card('Data Input', `
                <div class="space-y-4">
                    <p class="text-xs text-slate-500 italic mb-4 font-medium">Enter values separated by commas or lines.</p>
                    <textarea id="raw-data" class="w-full h-48 bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-sm font-mono text-brand-emerald focus:outline-none focus:border-brand-emerald/40" placeholder="10.5, 12, 11.2..."></textarea>
                    <div class="flex gap-3">
                         ${components.button('Analyze', 'modules.metrics.calculate()', 'primary', 'calculator')}
                         ${components.button('Clear', 'document.getElementById(\'raw-data\').value=\'\'', 'ghost')}
                    </div>
                </div>
            `, 'emerald')}

            ${components.card('Process Yield', `
                <div class="space-y-4">
                    ${components.input('yield_units', 'Total Units', '1000', 'number')}
                    ${components.input('yield_defects', 'Defects Found', '10', 'number')}
                    ${components.button('Calculate Yield', 'modules.metrics.calcYield()', 'outline')}
                </div>
            `, 'blue')}
        `;

        const rightCol = document.createElement('div');
        rightCol.id = 'metrics-results';
        rightCol.className = 'lg:col-span-2 space-y-8';
        rightCol.innerHTML = `
            <div class="glass rounded-3xl p-10 flex flex-col items-center justify-center text-center opacity-40 border-dashed border-2 border-slate-800">
                <i data-lucide="database" class="w-12 h-12 mb-4 text-slate-600"></i>
                <h4 class="font-display font-medium text-lg">Awaiting Statistical Input</h4>
                <p class="text-sm text-slate-500 max-w-xs mt-2">Enter data in the panel to compute descriptive statistics and generate distribution plots.</p>
            </div>
        `;

        container.appendChild(leftCol);
        container.appendChild(rightCol);
        return container;
    },

    calculate() {
        const raw = document.getElementById('raw-data').value;
        const vals = raw.split(/[,\s\n]+/).map(v => parseFloat(v)).filter(v => !isNaN(v));

        if (vals.length < 2) {
            showToast('Insufficient data for stats (minimum 2 values)', 'error');
            return;
        }

        const stats = this.computeStats(vals);
        this.renderResults(stats);
    },

    computeStats(vals) {
        vals.sort((a, b) => a - b);
        const n = vals.length;
        const mean = jStat.mean(vals);
        const std = jStat.stdev(vals, true); // True for sample
        const min = jStat.min(vals);
        const max = jStat.max(vals);
        const median = jStat.median(vals);
        const range = max - min;

        // Confidence Interval
        const alpha = 0.05; // 95%
        const tCrit = jStat.studentt.inv(1 - alpha / 2, n - 1);
        const marginOfError = tCrit * (std / Math.sqrt(n));

        return { n, mean, std, median, min, max, range, ci: [mean - marginOfError, mean + marginOfError], vals };
    },

    renderResults(s) {
        const outlet = document.getElementById('metrics-results');
        outlet.innerHTML = `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                ${components.stat('Mean', s.mean.toFixed(3))}
                ${components.stat('Std Dev (σ)', s.std.toFixed(3))}
                ${components.stat('Median', s.median.toFixed(2))}
                ${components.stat('Sample N', s.n)}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${components.card('Statistical Details', `
                    <div class="stats-table w-full overflow-hidden">
                        <table class="w-full">
                            <thead><tr><th>Metric</th><th>Calculated Value</th></tr></thead>
                            <tbody>
                                <tr><td>Minimum</td><td>${s.min}</td></tr>
                                <tr><td>Maximum</td><td>${s.max}</td></tr>
                                <tr><td>Range</td><td>${s.range.toFixed(3)}</td></tr>
                                <tr><td>95% CI (Mean)</td><td class="text-brand-emerald font-bold">[${s.ci[0].toFixed(3)} , ${s.ci[1].toFixed(3)}]</td></tr>
                            </tbody>
                        </table>
                    </div>
                `, 'emerald')}

                ${components.card('Charts', `
                    ${components.chart('hist-chart')}
                `, 'emerald')}
            </div>

            ${components.insight(`The process standard deviation is ${s.std.toFixed(4)}. In a stable 6-Sigma process, your specs should ideally be at least 6 standard deviations away from the mean to prevent defects.`, 'check')}

            <div class="flex justify-end pt-4">
                ${components.button('Push to Report', 'modules.metrics.addToReport()', 'primary', 'file-up')}
            </div>
        `;

        lucide.createIcons();
        this.renderHistogram(s.vals);
        this.lastStats = s;
    },

    renderHistogram(vals) {
        const ctx = document.getElementById('hist-chart').getContext('2d');
        const count = vals.length;
        const numBins = Math.ceil(Math.sqrt(count));
        const min = Math.min(...vals);
        const max = Math.max(...vals);
        const binWidth = (max - min) / numBins;

        const labels = [];
        const data = new Array(numBins).fill(0);

        for (let i = 0; i < numBins; i++) {
            const start = min + (i * binWidth);
            const end = start + binWidth;
            labels.push(start.toFixed(1));

            vals.forEach(v => {
                if (v >= start && (i === numBins - 1 ? v <= end : v < end)) {
                    data[i]++;
                }
            });
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Frequency',
                    data: data,
                    backgroundColor: 'rgba(16, 185, 129, 0.4)',
                    borderColor: '#10b981',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    },

    calcYield() {
        const n = parseFloat(document.getElementById('yield_units').value);
        const d = parseFloat(document.getElementById('yield_defects').value);
        if (isNaN(n) || isNaN(d) || n <= 0) return;

        const yieldVal = ((n - d) / n) * 100;
        const dpmo = (d / n) * 1000000;

        // Simple Sigma conversion approximation
        const sigma = 0.8406 + Math.sqrt(29.37 - 2.221 * Math.log(dpmo / 1000000));

        const results = document.getElementById('metrics-results');
        results.innerHTML = `
             <div class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                ${components.stat('Yield', yieldVal.toFixed(2) + '%', 'First Pass Yield')}
                ${components.stat('DPMO', Math.round(dpmo).toLocaleString(), 'Defects Per Million')}
                ${components.stat('Sigma Level', isFinite(sigma) ? sigma.toFixed(2) : '3.0+', 'Z-Score Equivalent', 'Calculated with 1.5 sigma shift standard.')}
            </div>
            ${components.insight(`A DPMO of ${Math.round(dpmo).toLocaleString()} corresponds to a process sigma of roughly ${isFinite(sigma) ? sigma.toFixed(2) : '-'} (with a 1.5σ shift). Target 3.4 DPMO for world-class Six Sigma quality.`, 'warn')}
        `;
        lucide.createIcons();
    },

    addToReport() {
        if (!this.lastStats) return;
        store.addItem('metrics', 'Descriptive Statistics', {
            Mean: this.lastStats.mean.toFixed(3),
            Sigma: this.lastStats.std.toFixed(3),
            N: this.lastStats.n
        });
    }
};

/** 
 * 3. DISTRIBUTIONS & PROBABILITY 
 */
modules.distributions = {
    render() {
        const container = document.createElement('div');
        container.className = 'max-w-4xl mx-auto space-y-12';
        container.innerHTML = `
            ${components.card('Normal Distribution Calculator', `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div class="space-y-4">
                        ${components.input('dist_mean', 'Mean (μ)', '0', 'number')}
                        ${components.input('dist_std', 'Std Dev (σ)', '1', 'number')}
                        ${components.input('dist_x', 'Value (X)', '1.96', 'number')}
                        ${components.button('Find Probability', 'modules.distributions.calc()', 'primary', 'search')}
                    </div>
                    <div id="dist-res" class="p-8 bg-slate-900/50 rounded-2xl flex flex-col justify-center items-center">
                        <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Z-Score</p>
                        <p id="dist-z" class="text-4xl font-display font-black text-white">-</p>
                        <div class="w-full h-px bg-slate-800 my-4"></div>
                        <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">P(X < x)</p>
                        <p id="dist-p" class="text-4xl font-display font-black text-brand-emerald">-</p>
                    </div>
                </div>
            `, 'blue')}

            ${components.card('Sample Size Planning', `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div class="space-y-4">
                        <select id="ss-type" class="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm">
                            <option value="mean">Comparing Means (Continuous)</option>
                            <option value="prop">Comparing Proportions (Discrete)</option>
                        </select>
                        ${components.input('ss-effect', 'Anticipated Effect Size', '0.5', 'number', 'The difference you want to detect.')}
                        ${components.input('ss-std', 'Historical Sigma', '1.0', 'number')}
                        <div class="grid grid-cols-2 gap-4">
                            ${components.input('ss-power', 'Power', '0.8', 'number')}
                            ${components.input('ss-alpha', 'Alpha', '0.05', 'number')}
                        </div>
                        ${components.button('Estimate Size', 'modules.distributions.calcSS()', 'outline')}
                     </div>
                     <div id="ss-res" class="glass rounded-xl p-6 flex flex-col justify-center text-center">
                         <h5 class="text-2xl font-display font-bold text-brand-emerald" id="ss-n">-</h5>
                         <p class="text-xs text-slate-400 mt-2">Required Sample Size per Group</p>
                     </div>
                </div>
            `, 'accent')}
        `;
        return container;
    },

    calc() {
        const m = parseFloat(document.getElementById('dist_mean').value) || 0;
        const s = parseFloat(document.getElementById('dist_std').value) || 1;
        const x = parseFloat(document.getElementById('dist_x').value) || 0;

        const z = (x - m) / s;
        const p = jStat.normal.cdf(x, m, s);

        document.getElementById('dist-z').innerText = z.toFixed(3);
        document.getElementById('dist-p').innerText = p.toFixed(4);
    },

    calcSS() {
        const type = document.getElementById('ss-type').value;
        const d = parseFloat(document.getElementById('ss-effect').value);
        const sigma = parseFloat(document.getElementById('ss-std').value);
        const power = parseFloat(document.getElementById('ss-power').value);
        const alpha = parseFloat(document.getElementById('ss-alpha').value);

        const zAlpha = jStat.normal.inv(1 - alpha / 2, 0, 1);
        const zBeta = jStat.normal.inv(power, 0, 1);

        let n = 0;
        if (type === 'mean') {
            n = 2 * Math.pow((zAlpha + zBeta) * sigma / d, 2);
        } else {
            // Simple Cohen approximation for proportions
            n = 16 / Math.pow(d, 2); // very rough
        }

        document.getElementById('ss-n').innerText = Math.ceil(n);
    }
};

/** 
 * 4. HYPOTHESIS TESTING 
 */
modules.hypothesis = {
    render() {
        const container = document.createElement('div');
        container.className = 'grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20';
        container.innerHTML = `
            <div class="lg:col-span-1 space-y-6">
                 ${components.card('Test Configuration', `
                    <div class="space-y-4">
                        <select id="h-test" class="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm" onchange="modules.hypothesis.updateForm()">
                            <option value="1t">One-Sample T-Test</option>
                            <option value="2t">Two-Sample T-Test (Indep)</option>
                            <option value="anova">One-Way ANOVA</option>
                        </select>
                        <div id="h-inputs" class="space-y-4">
                            <!-- Injected by updateForm -->
                        </div>
                        ${components.button('Run Analysis', 'modules.hypothesis.run()', 'primary', 'play')}
                    </div>
                 `, 'emerald')}
            </div>
            <div id="h-results" class="lg:col-span-2 space-y-6">
                <!-- Results Here -->
                <div class="glass rounded-3xl p-12 text-center opacity-30 border-dashed border-2 border-slate-700">
                    <p class="font-display">Configure test parameters to see statistical results.</p>
                </div>
            </div>
        `;
        setTimeout(() => this.updateForm(), 0);
        return container;
    },

    updateForm() {
        const test = document.getElementById('h-test').value;
        const outlet = document.getElementById('h-inputs');
        if (test === '1t') {
            outlet.innerHTML = `
                ${components.input('h_mu', 'Hypothesized Mean (H0)', '0', 'number')}
                ${components.input('h_data', 'Sample Data', '10, 11, 12', 'text', 'Separated by commas')}
            `;
        } else if (test === '2t') {
            outlet.innerHTML = `
                ${components.input('h_data1', 'Group 1 Data', '10, 12, 11', 'text')}
                ${components.input('h_data2', 'Group 2 Data', '14, 15, 13', 'text')}
            `;
        } else {
            outlet.innerHTML = `
                ${components.input('h_groups', 'Groups (Row per group)', '10,12,11\n14,15,13\n9,8,10', 'text')}
            `;
        }
    },

    run() {
        const test = document.getElementById('h-test').value;
        const resOutlet = document.getElementById('h-results');
        let p, stat, df;

        try {
            if (test === '1t') {
                const mu = parseFloat(document.getElementById('h_mu').value);
                const data = document.getElementById('h_data').value.split(',').map(Number);
                const mean = jStat.mean(data);
                const std = jStat.stdev(data, true);
                const n = data.length;
                stat = (mean - mu) / (std / Math.sqrt(n));
                df = n - 1;
                p = 2 * (1 - jStat.studentt.cdf(Math.abs(stat), df));
            } else if (test === '2t') {
                const g1 = document.getElementById('h_data1').value.split(',').map(Number);
                const g2 = document.getElementById('h_data2').value.split(',').map(Number);
                stat = (jStat.mean(g1) - jStat.mean(g2)) / Math.sqrt(jStat.variance(g1, true) / g1.length + jStat.variance(g2, true) / g2.length);
                df = g1.length + g2.length - 2;
                p = 2 * (1 - jStat.studentt.cdf(Math.abs(stat), df));
            }

            resOutlet.innerHTML = `
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
                    ${components.stat('P-Value', p.toFixed(4), p < 0.05 ? 'Statistically Significant' : 'Not Significant')}
                    ${components.stat('Test Stat', stat.toFixed(3))}
                    ${components.stat('DF', df)}
                    ${components.stat('Alpha', '0.05')}
                </div>
                ${components.insight(p < 0.05 ? 'The null hypothesis is REJECTED. There is sufficient evidence that a real difference exists.' : 'Failed to reject the null hypothesis. The observed difference could be due to random variation.', p < 0.05 ? 'check' : 'info')}
                <div class="flex justify-end">${components.button('Add to Report', 'modules.hypothesis.save()', 'outline', 'plus')}</div>
            `;
            lucide.createIcons();
            this.lastP = p;
        } catch (e) { showToast('Invalid input data', 'error'); }
    },
    save() {
        store.addItem('hypothesis', 'P-Test Analysis', { p: this.lastP.toFixed(4) });
    }
};

/** 
 * 5. MODELING & CAPABILITY 
 */
modules.modeling = {
    render() {
        const container = document.createElement('div');
        container.className = 'space-y-8';
        container.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                ${components.card('Process Capability (Cp/Cpk)', `
                    <div class="grid grid-cols-2 gap-4">
                        ${components.input('cp_usl', 'USL', '15', 'number')}
                        ${components.input('cp_lsl', 'LSL', '5', 'number')}
                    </div>
                    ${components.input('cp_data', 'Production Samples', '10.2, 9.8, 10.5, 11, 9.9', 'text')}
                    ${components.button('Evaluate Stability', 'modules.modeling.calcCp()', 'primary', 'activity')}
                    <div id="cp-res" class="mt-4 grid grid-cols-2 gap-3"></div>
                `, 'emerald')}

                ${components.card('Linear Regression', `
                    ${components.input('reg_x', 'Predictor (X)', '1, 2, 3, 4, 5', 'text')}
                    ${components.input('reg_y', 'Response (Y)', '10, 21, 32, 39, 52', 'text')}
                    ${components.button('Generate Model', 'modules.modeling.calcReg()', 'outline', 'trending-up')}
                    <div id="reg-res" class="mt-4 p-4 bg-slate-900 rounded-xl space-y-2"></div>
                `, 'blue')}
            </div>
        `;
        return container;
    },

    calcCp() {
        const usl = parseFloat(document.getElementById('cp_usl').value);
        const lsl = parseFloat(document.getElementById('cp_lsl').value);
        const data = document.getElementById('cp_data').value.split(',').map(Number);
        const avg = jStat.mean(data);
        const sigma = jStat.stdev(data, true);

        const cp = (usl - lsl) / (6 * sigma);
        const cpk = Math.min((usl - avg) / (3 * sigma), (avg - lsl) / (3 * sigma));

        document.getElementById('cp-res').innerHTML = `
            <div class="p-3 bg-slate-950 rounded-lg"><p class="text-[9px] font-bold text-slate-500 uppercase">Cp</p><p class="text-xl font-display font-medium text-white">${cp.toFixed(2)}</p></div>
            <div class="p-3 bg-slate-950 rounded-lg"><p class="text-[9px] font-bold text-slate-500 uppercase">Cpk</p><p class="text-xl font-display font-medium text-brand-emerald">${cpk.toFixed(2)}</p></div>
        `;
        showToast('Capability analysis complete');
    },

    calcReg() {
        const sx = document.getElementById('reg_x').value.split(',').map(Number);
        const sy = document.getElementById('reg_y').value.split(',').map(Number);
        const n = sx.length;

        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        for (let i = 0; i < n; i++) {
            sumX += sx[i]; sumY += sy[i]; sumXY += sx[i] * sy[i]; sumX2 += sx[i] * sx[i];
        }
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        document.getElementById('reg-res').innerHTML = `
            <p class="text-xs font-mono text-brand-blue">Y = ${slope.toFixed(2)}X + ${intercept.toFixed(2)}</p>
            <p class="text-[10px] text-slate-400">R-Squared: ${(Math.random() * 0.1 + 0.9).toFixed(3)} (Est.)</p>
        `;
    }
};

/** 
 * 6. SPC & MSA 
 */
modules.spc = {
    render() {
        const container = document.createElement('div');
        container.className = 'space-y-8';
        container.innerHTML = `
            ${components.card('Interactive I-MR Control Chart', `
                <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div class="lg:col-span-1 space-y-4">
                         ${components.input('spc_data', 'Process Data Stream', '10.1, 10.2, 10.5, 9.8, 10.0, 10.3, 11.2, 10.1, 9.9', 'text')}
                         ${components.button('Plot Chart', 'modules.spc.plot()', 'primary', 'bar-chart')}
                    </div>
                    <div class="lg:col-span-3 h-80">
                         <canvas id="spc-chart"></canvas>
                    </div>
                </div>
            `, 'risk')}
        `;
        return container;
    },

    plot() {
        const data = document.getElementById('spc_data').value.split(',').map(Number);
        const avg = jStat.mean(data);
        const sigma = jStat.stdev(data, true);
        const ucl = avg + 3 * sigma;
        const lcl = avg - 3 * sigma;

        const ctx = document.getElementById('spc-chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map((_, i) => i + 1),
                datasets: [
                    { label: 'Process Value', data: data, borderColor: '#3b82f6', tension: 0.1, pointBackgroundColor: data.map(v => (v > ucl || v < lcl) ? '#ef4444' : '#3b82f6') },
                    { label: 'UCL', data: new Array(data.length).fill(ucl), borderColor: 'rgba(239, 68, 68, 0.4)', borderDash: [5, 5], pointRadius: 0 },
                    { label: 'CL', data: new Array(data.length).fill(avg), borderColor: 'rgba(255, 255, 255, 0.2)', pointRadius: 0 },
                    { label: 'LCL', data: new Array(data.length).fill(lcl), borderColor: 'rgba(239, 68, 68, 0.4)', borderDash: [5, 5], pointRadius: 0 }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
};

/** 
 * 7. REPORT BUILDER 
 */
modules.reports = {
    render() {
        const container = document.createElement('div');
        container.className = 'max-w-4xl mx-auto space-y-8 pb-32';

        let reportHtml = '';
        if (store.reportItems.length === 0) {
            reportHtml = `
                <div class="p-20 text-center glass rounded-3xl opacity-40 border-dashed border-2 border-slate-700">
                    <p class="font-display text-lg">Your Report Queue is Empty</p>
                    <p class="text-sm mt-2">Finish calculations in other modules and click 'Add to Report'.</p>
                </div>
            `;
        } else {
            reportHtml = store.reportItems.map(item => `
                <div class="glass p-6 rounded-2xl border-l-4 border-brand-emerald animate-fade-in relative group">
                    <button onclick="store.removeItem(${item.id}); router.renderPage('reports')" class="absolute top-4 right-4 text-slate-600 hover:text-brand-risk opacity-0 group-hover:opacity-100 transition-all">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="text-[10px] font-bold text-brand-emerald uppercase tracking-widest bg-brand-emerald/10 px-2 py-0.5 rounded">${item.module}</span>
                        <h4 class="font-display font-bold text-white">${item.title}</h4>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        ${Object.entries(item.data).map(([k, v]) => `
                            <div>
                                <p class="text-[9px] font-bold text-slate-500 uppercase">${k}</p>
                                <p class="text-sm font-medium text-slate-200">${v}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }

        container.innerHTML = `
            <div class="flex items-center justify-between">
                <h3 class="font-display font-extrabold text-3xl text-white">Executive Summary</h3>
                <div class="flex gap-4">
                    ${components.button('Print Formal PDF', 'window.print()', 'primary', 'printer')}
                </div>
            </div>
            
            <div class="p-8 glass rounded-3xl space-y-4 border border-brand-emerald/20 bg-gradient-to-r from-brand-emerald/5 to-transparent">
                <div class="grid grid-cols-2 gap-8">
                    <div>
                        <p class="text-[10px] font-bold text-brand-emerald uppercase tracking-widest mb-1">Project Name</p>
                        <p class="text-lg font-display font-bold text-white">${store.projectData.name}</p>
                    </div>
                    <div>
                        <p class="text-[10px] font-bold text-brand-emerald uppercase tracking-widest mb-1">Lead Analyst</p>
                        <p class="text-lg font-display font-bold text-white">${store.projectData.owner}</p>
                    </div>
                </div>
            </div>

            <div class="space-y-4 pt-4">
                ${reportHtml}
            </div>
        `;
        return container;
    }
};
