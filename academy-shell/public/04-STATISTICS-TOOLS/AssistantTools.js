(function () {



    // 0. SELF-INJECTION (CSS)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'AssistantTools.css';
    document.head.appendChild(link);

    // HIDE REQUESTED UI ELEMENTS (AI, EXPORT, DASHBOARD)
    const hideStyle = document.createElement('style');
    hideStyle.textContent = `
        .app-nav-bar,
        #assistant-dock, #retry-alert-banner,
        .ai-coach-btn, .ai-badge, .ai-rewrite-btn, .ai-magic-btn,
        .ai-panel, .ai-coach-output,
        .sticky-export, .btn-export,
        a.nav-btn-back[href*="Stats_Calculator_Main.html"],
        a.nav-back[href*="Stats_Calculator_Main.html"],
        a.nav-back[href*="Tool_LeanLeadership.html"],
        [onclick*="askAICoach"], [onclick*="askAIData"], [onclick*="askGemini"],
        [onclick*="showLobby"], [onclick*="downloadPNG"], [onclick*="downloadPDF"],
        [onclick*="export4K"], button[onclick*="Stats_Calculator_Main.html"],
        button[onclick*="history.back()"] {
            display: none !important;
        }
    `;
    document.head.appendChild(hideStyle);

    // Ensure Chart.js is loaded
    if (!window.Chart) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        document.head.appendChild(script);
    }

    // 1. DATA MODELS
    const state = {
        sticky: {
            pages: [{ content: "", color: "#92400e", bgColor: "#fef3c7", size: "14px", font: "Inter" }],
            themes: [
                { bg: "#fef3c7", text: "#92400e" }, // Yellow
                { bg: "#dbeafe", text: "#1e40af" }, // Blue
                { bg: "#dcfce7", text: "#166534" }, // Green
                { bg: "#f3e8ff", text: "#6b21a8" }, // Purple
                { bg: "#fce7f3", text: "#9d174d" }, // Pink
                { bg: "#1e293b", text: "#f8fafc" }  // Dark
            ],
            currentPage: 0
        },
        calculator: {
            display: "0",
            currentVal: "",
            prevVal: "",
            operator: null
        },
        isDragging: false,
        zoom: 1.0,
        highlighter: {
            active: false,
            mode: 'highlighter', // 'pen', 'highlighter', or 'pencil'
            colorIndex: 0,
            baseColors: [
                { hex: "#fcd34d", rgb: "252, 211, 77" }, // Yellow
                { hex: "#4ade80", rgb: "74, 222, 128" }, // Green
                { hex: "#60a5fa", rgb: "96, 165, 250" }, // Blue
                { hex: "#f472b6", rgb: "244, 114, 182" }, // Pink
                { hex: "#a78bfa", rgb: "167, 139, 250" }  // Purple
            ],
            size: 25,
            transparency: 95 // Default 95% transparent (range: 90-99%)
        },
        sniper: {
            active: false,
            mode: 'lens', // 'lens' or 'pointer'
            scale: 2
        }
    };

    // 2. SHELL SYNERGY (Listen for Command Palette)
    // Listens for triggers from the Academy Shell's Command Palette (CMD_SAVE, CMD_COMPLETE)
    window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'TRIGGER_SAVE') {
            if (typeof triggerSave === 'function') triggerSave();
        }
        if (e.data && e.data.type === 'TRIGGER_COMPLETE') {
            if (typeof triggerComplete === 'function') triggerComplete();
        }
    });

    // 3. CORE UTILITIES
    window.toggleHubTools = function() {
        const menu = document.getElementById('hub-tools-menu');
        menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
    };

    window.triggerSave = function() {
        // Collect data from the page - this usually assumes a global 'collectData' function exists in the tool
        if (typeof window.collectData === 'function') {
            const data = window.collectData();
            window.parent.postMessage({ type: 'SAVE_DELIVERABLE', data: data }, '*');
        } else {
            // Fallback: try to find common input fields
            const data = {};
            document.querySelectorAll('input, textarea, select').forEach(el => {
                if (el.id) data[el.id] = el.value;
            });
            window.parent.postMessage({ type: 'SAVE_DELIVERABLE', data: data }, '*');
        }
    };

    window.triggerComplete = function() {
        if (confirm("Submit your final work for Sensei's Verdict? This will use 1 attempt.")) {
            if (typeof window.collectData === 'function') {
                const data = window.collectData();
                window.parent.postMessage({ type: 'MARK_COMPLETE', data: data }, '*');
            } else {
                const data = {};
                document.querySelectorAll('input, textarea, select').forEach(el => {
                    if (el.id) data[el.id] = el.value;
                });
                window.parent.postMessage({ type: 'MARK_COMPLETE', data: data }, '*');
            }
        }
    };

    window.toggleWindow = function (id) {
        const win = document.getElementById(id);
        win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
        if (id === 'biostats-window' && win.style.display === 'flex') {
            setTimeout(initStatsChart, 100);
        }
    };

    // DRAGGABLE LOGIC
    function makeDraggable(element, handle) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        handle.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;

            // Convert right positioning to left on first drag
            if (element.style.right && element.style.right !== 'auto') {
                const rect = element.getBoundingClientRect();
                element.style.left = rect.left + 'px';
                element.style.right = 'auto';
            }

            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    makeDraggable(document.getElementById('assistant-dock'), document.getElementById('assistant-dock'));
    document.querySelectorAll('.window-header').forEach(header => {
        makeDraggable(header.parentElement, header);
    });

    // START STICKY NOTES LOGIC
    window.saveSticky = function () {
        const editor = document.getElementById('sticky-editor');
        state.sticky.pages[state.sticky.currentPage].content = editor.innerHTML;
        localStorage.setItem('lss_assistant_sticky', JSON.stringify(state.sticky.pages));
    };

    window.addStickyPage = function () {
        state.sticky.pages.push({ content: "New Note Content...", color: "#333", bgColor: "#fff2ab", size: "15px", font: "Segoe UI" });
        state.sticky.currentPage = state.sticky.pages.length - 1;
        renderSticky();
        if (document.getElementById('sticky-list-view').style.display === 'block') toggleStickyList();
    };

    window.setStickyTheme = function (index) {
        const page = state.sticky.pages[state.sticky.currentPage];
        const colors = [
            { bg: "#fff2ab", border: "#fbdc3f" }, // Yellow
            { bg: "#dcfce7", border: "#4ade80" }, // Green
            { bg: "#fce7f3", border: "#f472b6" }, // Pink
            { bg: "#f3e8ff", border: "#a78bfa" }, // Purple
            { bg: "#dbeafe", border: "#3b82f6" }, // Blue
            { bg: "#f3f4f6", border: "#94a3b8" }, // Gray
            { bg: "#1e293b", border: "#0f172a" }  // Charcoal
        ];
        const theme = colors[index];
        page.bgColor = theme.bg;
        page.color = index === 6 ? "#fff" : "#333";
        renderSticky();
        saveSticky();
    };

    window.execCmd = function (cmd, val = null) {
        document.execCommand(cmd, false, val);
        saveSticky();
    };

    window.toggleFontColorPicker = function () {
        const picker = document.getElementById('font-color-picker');
        const options = document.getElementById('font-color-options');
        picker.style.display = picker.style.display === 'none' ? 'block' : 'none';

        if (picker.style.display === 'block') {
            const fontColors = ['#ffffff', '#f87171', '#fb923c', '#fbbf24', '#a3e635', '#34d399', '#22d3d8', '#60a5fa', '#a78bfa', '#f472b6', '#94a3b8', '#64748b', '#1e293b', '#000000', '#ef4444'];
            options.innerHTML = fontColors.map(c => `
                <div onclick=\"applyFontColor('${c}')\" style=\"width:20px; height:20px; background:${c}; border-radius:3px; cursor:pointer; border:1px solid rgba(255,255,255,0.2);\" title=\"${c}\"></div>
            `).join('');
        }
    };

    window.applyFontColor = function (color) {
        document.execCommand('foreColor', false, color);
        document.getElementById('font-color-indicator').style.background = color;
        document.getElementById('font-color-picker').style.display = 'none';
        saveSticky();
    };

    window.toggleStickyList = function () {
        const list = document.getElementById('sticky-list-view');
        const items = document.getElementById('sticky-list-items');
        list.style.display = list.style.display === 'none' ? 'block' : 'none';

        if (list.style.display === 'block') {
            items.innerHTML = state.sticky.pages.map((p, i) => `
                <div onclick="selectStickyPage(${i})" style="background:rgba(255,255,255,0.03); padding:14px 16px; border-radius:10px; margin-bottom:10px; cursor:pointer; font-size:13px; border-left:3px solid ${p.bgColor}; color:#cbd5e1; transition:all 0.2s; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" onmouseover="this.style.background='rgba(255,255,255,0.08)'; this.style.color='#f1f5f9'" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.color='#cbd5e1'">
                    ${p.content.replace(/<[^>]*>/g, '').substring(0, 45) || '(Empty Note)'}
                </div>
            `).join('');
        }
    };

    window.selectStickyPage = function (index) {
        state.sticky.currentPage = index;
        renderSticky();
        toggleStickyList();
    };

    function initColorPresets() {
        const bar = document.getElementById('sticky-color-presets');
        if (!bar) return;
        const colors = ["#fff2ab", "#dcfce7", "#fce7f3", "#f3e8ff", "#dbeafe", "#f3f4f6", "#1e293b"];
        bar.innerHTML = colors.map((c, i) => `
            <div onclick="setStickyTheme(${i})" style="flex:1; background:${c}; cursor:pointer; height:100%; border-bottom: 2px solid ${state.sticky.currentPage === i ? '#3b82f6' : 'transparent'}"></div>
        `).join('');
    }

    function initHighlighterColors() {
        const container = document.getElementById('highlighter-color-presets');
        if (!container) return;
        container.innerHTML = '';
        const palette = ["#000", "#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#fcd34d", "#dcfce7", "#dbeafe", "#f3e8ff", "#fff"];
        palette.forEach((hex, i) => {
            const div = document.createElement('div');
            div.style.width = '14px';
            div.style.height = '14px';
            div.style.borderRadius = '2px';
            div.style.background = hex;
            div.style.cursor = 'pointer';
            div.style.border = '1px solid #ccc';
            div.onclick = () => {
                state.highlighter.color = hex;
                initHighlighterColors();
            };
            if (state.highlighter.color === hex) div.style.outline = '2px solid #3b82f6';
            container.appendChild(div);
        });
    }
    setTimeout(() => { initColorPresets(); initHighlighterColors(); }, 100);

    window.deleteStickyPage = function () {
        if (state.sticky.pages.length > 1) {
            state.sticky.pages.splice(state.sticky.currentPage, 1);
            state.sticky.currentPage = Math.max(0, state.sticky.currentPage - 1);
            renderSticky();
        }
    };

    window.minimizeSticky = function () {
        document.getElementById('sticky-window').style.display = 'none';
        showToast('Sticky Notes hidden');
    };

    window.navSticky = function (dir) {
        state.sticky.currentPage = (state.sticky.currentPage + dir + state.sticky.pages.length) % state.sticky.pages.length;
        renderSticky();
    };

    window.changeStickyFontSize = function (delta) {
        const page = state.sticky.pages[state.sticky.currentPage];
        let currentSize = parseInt(page.size || "15px");
        let newSize = Math.max(10, Math.min(40, currentSize + delta));
        page.size = newSize + "px";
        renderSticky();
        saveSticky();
    };

    window.updateStickyStyle = function (type, val) {
        const page = state.sticky.pages[state.sticky.currentPage];
        page[type] = val;
        renderSticky();
    };

    function renderSticky() {
        const page = state.sticky.pages[state.sticky.currentPage];
        const editor = document.getElementById('sticky-editor');
        const win = document.getElementById('sticky-window');

        editor.innerHTML = page.content;
        editor.style.color = page.color;
        editor.style.fontSize = page.size || '15px'; // Apply font size
        win.style.background = page.bgColor || "#fff2ab";

        document.getElementById('sticky-page-info').innerText = `${state.sticky.currentPage + 1}/${state.sticky.pages.length}`;
        initColorPresets();
    }

    // Load initial sticky data
    const savedSticky = localStorage.getItem('lss_assistant_sticky');
    if (savedSticky) {
        state.sticky.pages = JSON.parse(savedSticky);
    }
    renderSticky();

    // 4. CALCULATOR LOGIC
    window.calcInput = function (val) {
        const display = document.getElementById('calc-display');
        if (val === 'AC') {
            state.calculator.display = "0";
            state.calculator.currentVal = "";
            state.calculator.prevVal = "";
            state.calculator.operator = null;
        } else if (['+', '-', '*', '/'].includes(val)) {
            state.calculator.operator = val;
            state.calculator.prevVal = state.calculator.display;
            state.calculator.currentVal = "";
        } else if (val === '=') {
            if (state.calculator.operator) {
                const a = parseFloat(state.calculator.prevVal);
                const b = parseFloat(state.calculator.display);
                let res = 0;
                switch (state.calculator.operator) {
                    case '+': res = a + b; break;
                    case '-': res = a - b; break;
                    case '*': res = a * b; break;
                    case '/': res = a / b; break;
                }
                state.calculator.display = res.toString();
                state.calculator.currentVal = res.toString();
                state.calculator.operator = null;
            }
        } else {
            if (state.calculator.display === "0") state.calculator.display = "";
            state.calculator.display += val;
        }
        display.innerText = state.calculator.display;
    };

    // 5. BIOSTATS CHART LOGIC
    let statsChart = null;
    function initStatsChart() {
        const ctx = document.getElementById('stats-chart').getContext('2d');
        if (statsChart) statsChart.destroy();
        statsChart = new Chart(ctx, {
            type: 'line',
            data: { labels: [], datasets: [{ label: 'Normal Distribution', data: [], borderColor: '#3b82f6', tension: 0.4 }] },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { display: false }, y: { display: false } }
            }
        });
        updateStatsChart();
    }

    window.updateStatsChart = function () {
        const m = parseFloat(document.getElementById('stats-mean').value) || 0;
        const sd = parseFloat(document.getElementById('stats-sd').value) || 1;
        const data = [];
        const labels = [];
        for (let x = m - 4 * sd; x <= m + 4 * sd; x += 0.1 * sd) {
            labels.push(x.toFixed(2));
            const y = (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - m) / sd, 2));
            data.push(y);
        }
        statsChart.data.labels = labels;
        statsChart.data.datasets[0].data = data;
        statsChart.update();
        document.getElementById('stats-results').innerText = `Curve centered at μ=${m} with σ=${sd}.`;
    };

    // 6. HIGHLIGHTER LOGIC
    const canvas = document.getElementById('highlighter-canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.toggleHighlighter = function () {
        state.highlighter.active = !state.highlighter.active;
        canvas.className = state.highlighter.active ? 'drawing' : '';
        document.getElementById('highlighter-tools').style.display = state.highlighter.active ? 'flex' : 'none';
        document.getElementById('highlighter-toggle').classList.toggle('active', state.highlighter.active);
        if (state.highlighter.active) initHighlighterColors();
    };

    window.setHighlighterMode = function (mode) {
        state.highlighter.mode = mode;
        document.querySelectorAll('.draw-tool-item').forEach(el => el.classList.remove('active'));
        document.getElementById(`${mode}-select`).classList.add('active');

        // Show/hide transparency control based on mode
        const transparencyControl = document.getElementById('transparency-control');
        const thicknessSlider = document.getElementById('thickness-slider');

        if (mode === 'highlighter') {
            transparencyControl.style.display = 'flex';
            thicknessSlider.value = 25; // Default larger size for highlighter
            state.highlighter.size = 25;
        } else {
            transparencyControl.style.display = 'none';
            thicknessSlider.value = mode === 'pen' ? 3 : 5;
            state.highlighter.size = mode === 'pen' ? 3 : 5;
        }
    };

    window.setHighlighterSize = function (size) {
        state.highlighter.size = parseInt(size);
    };

    window.setHighlighterTransparency = function (value) {
        state.highlighter.transparency = parseInt(value);
        document.getElementById('transparency-value').textContent = value + '%';
    };

    window.toggleLasso = function () {
        const l = document.getElementById('lasso-toggle');
        l.classList.toggle('active-mode');
        showToast(l.classList.contains('active-mode') ? "Lasso Select Active" : "Lasso Select Deactivated");
    };

    window.toggleShapeMode = function () {
        const s = document.getElementById('shape-toggle');
        s.classList.toggle('active-mode');
        showToast(s.classList.contains('active-mode') ? "Ink to Shape Enabled" : "Drawing mode: Freehand");
    };

    window.clearHighlights = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    canvas.onmousedown = (e) => {
        if (!state.highlighter.active) return;
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    };

    canvas.onmousemove = (e) => {
        if (!isDrawing) return;
        const color = state.highlighter.color || "#fcd34d";
        const isHigh = state.highlighter.mode === 'highlighter';
        const isPencil = state.highlighter.mode === 'pencil';

        // Use dynamic transparency from slider for highlighter, otherwise fixed values
        const transparency = state.highlighter.transparency || 80;
        const opacity = isHigh ? (1 - transparency / 100) : (isPencil ? 0.5 : 1.0);

        ctx.lineTo(e.clientX, e.clientY);
        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = state.highlighter.size;

        // Real highlighter effect: flat/square caps for that marker look
        if (isHigh) {
            ctx.lineCap = 'butt';  // Flat ends like real highlighter
            ctx.lineJoin = 'miter';
            ctx.shadowBlur = 0;    // No blur for clean look
        } else {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowBlur = 0;
        }

        ctx.stroke();
        ctx.globalAlpha = 1.0; // Reset
    };

    canvas.onmouseup = () => isDrawing = false;

    // 7. SNIPER ZOOM LOGIC (Enhanced CSS Magnifier)
    const lens = document.getElementById('sniper-lens');
    window.toggleSniper = function () {
        state.sniper.active = !state.sniper.active;
        lens.style.display = state.sniper.active ? 'block' : 'none';
        const controls = document.getElementById('sniper-controls');
        const toggle = document.getElementById('sniper-toggle');
        const overlay = document.getElementById('sniper-overlay');

        controls.style.display = state.sniper.active ? 'flex' : 'none';
        // Overlay effect is now handled by lens box-shadow
        toggle.classList.toggle('active', state.sniper.active);

        if (state.sniper.active) {
            // Position controls directly below the sniper icon
            const rect = toggle.getBoundingClientRect();
            controls.style.left = (rect.left + rect.width / 2) + 'px';
            controls.style.transform = 'translateX(-50%)';
            setSniperMode(state.sniper.mode);
        }
    };

    window.setSniperMode = function (mode) {
        state.sniper.mode = mode;
        document.querySelectorAll('.sniper-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`sniper-mode-${mode}`).classList.add('active');

        if (mode === 'lens') {
            lens.style.borderRadius = "50%";
            lens.style.border = "3px solid rgba(255,255,255,0.9)";
            lens.style.background = "transparent";
            lens.style.backdropFilter = "none";
            lens.style.boxShadow = "0 0 0 9999px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.5) inset";
            lens.innerHTML = "";
        } else {
            lens.style.borderRadius = "4px";
            lens.style.border = "1px solid red";
            lens.style.background = "transparent";
            lens.style.backdropFilter = "none";
            lens.innerHTML = `
                <div style="position:absolute; top:50%; left:0; width:100%; height:1px; background:red; opacity:0.5;"></div>
                <div style="position:absolute; top:0; left:50%; width:1px; height:100%; background:red; opacity:0.5;"></div>
                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:10px; height:10px; border:1px solid red; border-radius:50%;"></div>
            `;
        }
    }

    document.addEventListener('mousemove', (e) => {
        if (!state.sniper.active) return;
        const x = e.clientX;
        const y = e.clientY;

        lens.style.left = (x - 100) + 'px';
        lens.style.top = (y - 100) + 'px';

        // Sniper Effect: Increase contrast and slightly "bulge" via border radius and filters
        // For actual magnification without libs, we'd need to clone the DOM or use a magic filter.
    });

    // Handle Wheel for Sniper Scale
    document.addEventListener('wheel', (e) => {
        if (!state.sniper.active) return;
        e.preventDefault();
        state.sniper.scale += e.deltaY > 0 ? -0.1 : 0.1;
        state.sniper.scale = Math.max(1, Math.min(5, state.sniper.scale));
        lens.style.width = (100 * state.sniper.scale) + 'px';
        lens.style.height = (100 * state.sniper.scale) + 'px';
        lens.style.transform = `scale(${state.sniper.scale / 2})`; // keep physical size stable-ish
    }, { passive: false });

    // 8. PAGE ZOOM LOGIC
    window.changePageZoom = function (delta) {
        if (delta === 0) {
            state.zoom = 1.0;
        } else {
            state.zoom += delta;
        }
        state.zoom = Math.max(0.5, Math.min(2.0, state.zoom));
        document.body.style.transformOrigin = "top center";
        document.body.style.transform = `scale(${state.zoom})`;
        // Fix for fixed elements
        document.getElementById('assistant-dock').style.transform = `translateX(-50%) scale(${1 / state.zoom})`;
        showToast(`Zoom: ${Math.round(state.zoom * 100)}%`);
    };

    // 9. FULLSCREEN LOGIC
    window.toggleFullScreen = function () {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                showToast("Entering Full-Screen Mode");
            }).catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
                showToast("Full-screen unavailable");
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                showToast("Exiting Full-Screen Mode");
            }
        }
    };

    // 10. TOAST FALLBACK (If not defined elsewhere)
    if (typeof window.showToast !== 'function') {
        window.showToast = function (msg) {
            let toast = document.getElementById('assistant-toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'assistant-toast';
                toast.style.cssText = `
                    position: fixed;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(15, 23, 42, 0.95);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 30px;
                    font-size: 13px;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    z-index: 20000;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    border: 1px solid rgba(255,255,255,0.1);
                    pointer-events: none;
                    opacity: 0;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                `;
                document.body.appendChild(toast);
            }
            toast.innerText = msg;
            toast.style.opacity = '1';
            toast.style.bottom = '40px';

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.bottom = '30px';
            }, 2500);
        };
    }

    // 11. GLOBAL THEME ENGINE (Universal + Pareto Specialized)
    window.setTheme = function (theme) {
        document.body.classList.remove('theme-universal', 'theme-night');
        localStorage.setItem('lss_theme_mode', theme);
        
        // Chart.js Global Contrast Overrides
        if (typeof Chart !== 'undefined') {
            const isUniversal = theme === 'universal' || theme === 'day';
            const isNight = theme === 'night';
            
            Chart.defaults.color = isUniversal ? '#1A1917' : (isNight ? '#ffffff' : '#cbd5e1');
            Chart.defaults.font.family = isUniversal ? "'Plus Jakarta Sans'" : Chart.defaults.font.family;
            Chart.defaults.font.weight = isUniversal ? '500' : 'normal';
            
            if (Chart.defaults.scale) {
                Chart.defaults.scale.grid.color = isUniversal ? 'rgba(26,25,23,0.06)' : (isNight ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.05)');
            }

            // Re-render any active chart instances
            document.querySelectorAll('canvas').forEach(canvas => {
                const chart = Chart.getChart(canvas);
                if (chart) {
                    chart.options.scales.x.ticks.color = Chart.defaults.color;
                    chart.options.scales.y.ticks.color = Chart.defaults.color;
                    chart.update();
                }
            });
        }

        const introTitle = document.querySelector('.lss-intro-title');
        const introText = document.querySelector('.lss-intro-text');

        if (theme === 'universal' || theme === 'day') {
            document.body.classList.add('theme-universal');
            if (introTitle && window.generatePareto) introTitle.innerHTML = '<i class="fas fa-khanda" style="margin-right:10px;"></i> The Sword of Focus';
            if (introText && window.generatePareto) introText.innerHTML = 'The biggest mistake in problem-solving is trying to fix everything. In reality, <b style="color: #000033;">80% of your pain comes from 20% of your sources</b>. The Pareto Chart is your weapon to ignore the \"Trivial Many\" and strike the \"Vital Few\" with surgical precision.';
        } else if (theme === 'night') {
            document.body.classList.add('theme-night');
            if (introTitle && window.generatePareto) introTitle.innerHTML = '<i class=\"fas fa-khanda\" style=\"margin-right:10px; color:#f59e0b; text-shadow:0 0 15px #f59e0b;\"></i> The Sword of Focus';
            if (introText && window.generatePareto) introText.innerHTML = 'The biggest mistake in problem-solving is trying to fix everything. In reality, <b style=\"color: #fde047;\">80% of your pain comes from 20% of your sources</b>. The Pareto Chart is your weapon to ignore the \"Trivial Many\" and strike the \"Vital Few\" with surgical precision.';
        } else {
            if (introTitle && window.generatePareto) introTitle.innerHTML = '⚔️ The Sword of Focus';
            if (introText && window.generatePareto) introText.innerHTML = 'The biggest mistake in problem-solving is trying to fix everything. In reality, <b style=\"color:var(--accent);\">80% of your pain comes from 20% of your sources</b>. The Pareto Chart is your weapon to ignore the \"Trivial Many\" and strike the \"Vital Few\" with surgical precision.';
        }

        // Adapted Re-renders (if chartInstance globally exposed)
        if (window.chartInstance && typeof window.generatePareto === 'function') {
             try { window.generatePareto(); } catch(e) {}
        }
        
        // Update toggle UI (if auto-injected)
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('onclick').includes(theme));
        });
    };

    // CLEANUP: Aggressively hide all legacy theme switchers except from the Sensei Hub
    function cleanupLegacyThemes() {
        // No longer hiding legacy buttons to allow header switcher restoration
    }

    // 12. MASTER Hub SENSEI MBB CONTROL - GLASSMORPHIC V3 (Draggable)
    window.toggleRail = function() {
        const rail = document.getElementById('sensei-mbb-rail');
        if (!rail) return;
        rail.classList.toggle('minimized');
        localStorage.setItem('lss_rail_minimized', rail.classList.contains('minimized'));
    };

    // Drag Engine for the Hub
    function _initRailDrag(el) {
        let isDragging = false, startX, startY, origLeft, origTop, hasMoved = false;

        function onPointerDown(e) {
            if (e.target.closest('.rail-minimize-btn') || e.target.closest('.rail-card') || e.target.closest('.rail-pill')) return;
            if (!el.classList.contains('minimized') && !e.target.closest('.hub-header')) return;

            isDragging = true;
            hasMoved = false;
            startX = e.clientX;
            startY = e.clientY;
            const rect = el.getBoundingClientRect();
            origLeft = rect.left;
            origTop = rect.top;
            el.style.transition = 'none';
            document.addEventListener('pointermove', onPointerMove);
            document.addEventListener('pointerup', onPointerUp);
            e.preventDefault();
        }

        function onPointerMove(e) {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;
            
            // Free Drag: Unrestricted movement
            el.style.left = (origLeft + dx) + 'px';
            el.style.top = (origTop + dy) + 'px';
            el.style.right = 'auto';
            el.style.bottom = 'auto';
        }

        function onPointerUp() {
            isDragging = false;
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);
            el.style.transition = '';

            if (hasMoved) {
                localStorage.setItem('lss_rail_pos', JSON.stringify({ left: el.style.left, top: el.style.top }));
            } else if (el.classList.contains('minimized') || e_target_is_robot) {
                // If clicked without moving, toggle the rail
                toggleRail();
            }
        }

        let e_target_is_robot = false;
        el.addEventListener('pointerdown', (e) => {
            e_target_is_robot = e.target.classList.contains('rail-robot-icon');
            onPointerDown(e);
        });

        // Restore position
        try {
            const saved = JSON.parse(localStorage.getItem('lss_rail_pos'));
            if (saved && saved.left && saved.top) {
                el.style.left = saved.left;
                el.style.top = saved.top;
                el.style.right = 'auto';
                el.style.bottom = 'auto';
            }
        } catch(e) {}
    }

    function buildMasterRail() {
        if (document.getElementById('sensei-mbb-rail')) return;
        
        const path = window.location.pathname.toLowerCase();
        if (path.includes('dashboard') || path.includes('certificate')) return;

        const progress = JSON.parse(localStorage.getItem('LSS_StudentProgress') || '{}');
        const toolName = window.location.pathname.split('/').pop().replace('.html', '').replace('Tool_', '').replace('_Premium', '');
        const isSubmitted = progress[toolName] && progress[toolName].reportHtml;
        const isMinimized = localStorage.getItem('lss_rail_minimized') === 'true';

        const hub = document.createElement('div');
        hub.id = 'sensei-mbb-rail';
        if (isMinimized) hub.classList.add('minimized');

        hub.innerHTML = `
            <!-- Roboto Toggle / Handle (Always Visible) -->
            <div class="hub-header">
                <i class="fas fa-robot rail-robot-icon"></i>
                <i class="fas fa-minus rail-minimize-btn" onclick="toggleRail()" title="Minimize"></i>
            </div>

            <!-- Expanded Content -->
            <div class="rail-expanded-content" style="display: contents;">
                <div class="hub-grid">
                    <div class="rail-card active" id="hub-q-submit" 
                         data-explanation="Submit Verification: Send my work for final scoring and feedback.">
                        <div class="rail-card-icon"><i class="fas fa-bullseye"></i></div>
                    </div>
                    
                    <div class="rail-card" id="hub-q-dash" 
                         data-explanation="Strategic Dashboard: View my grades, tool progress, and certificate status.">
                        <div class="rail-card-icon"><i class="fas fa-chart-line"></i></div>
                    </div>

                    <div class="rail-card ${isSubmitted ? '' : 'disabled'}" id="hub-q-audit" 
                         data-explanation="Audit Report: Review detailed feedback and architecture alignment notes." 
                         style="opacity:${isSubmitted ? '1' : '0.4'}">
                        <div class="rail-card-icon"><i class="fas fa-file-contract"></i></div>
                    </div>
                </div>

                <div class="rail-footer-pills" style="display: flex; justify-content: center; gap: 10px;">
                    <div class="rail-pill" onclick="setTheme('universal')" title="Balanced Day">
                        <i class="fas fa-sun"></i>
                    </div>
                    <div class="rail-pill" onclick="setTheme('night')" title="Futuristic Night">
                        <i class="fas fa-moon"></i>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(hub);

        // Initialize Drag Engine (using the new header architecture)
        _initRailDrag(hub);

        // Bind Actions
        document.getElementById('hub-q-submit').onclick = () => {
            if (typeof lssSubmitProgress === 'function') lssSubmitProgress();
            else if (typeof analyzeDOE === 'function') analyzeDOE();
            else alert("Validation Engine loading...");
        };
        document.getElementById('hub-q-dash').onclick = () => window.location.href = 'Student_Dashboard.html';
        
        const auditBtn = document.getElementById('hub-q-audit');
        if (isSubmitted) {
            auditBtn.onclick = () => {
                if (typeof _openReportPreview === 'function') {
                     _openReportPreview(progress[toolName].reportHtml, toolName);
                } else {
                     localStorage.setItem('LSS_PreviewReport', progress[toolName].reportHtml);
                     window.open('Report_Preview.html', '_blank');
                }
            };
        }
    }

    // Inject switcher and Master Rail on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            injectThemeSwitcher();
            buildMasterRail();
        });
    } else {
        injectThemeSwitcher();
        buildMasterRail();
    }
})();
