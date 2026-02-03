/**
 * Twilight Horizon Assistant Tools
 * A floating, draggable toolkit for Lean Six Sigma students.
 */

(function () {
    // 0. SELF-INJECTION (CSS)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'AssistantTools.css';
    document.head.appendChild(link);

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
            mode: 'highlighter', // 'pen' or 'highlighter'
            colorIndex: 0,
            baseColors: [
                { hex: "#fcd34d", rgb: "252, 211, 77" }, // Yellow
                { hex: "#4ade80", rgb: "74, 222, 128" }, // Green
                { hex: "#60a5fa", rgb: "96, 165, 250" }, // Blue
                { hex: "#f472b6", rgb: "244, 114, 182" }, // Pink
                { hex: "#a78bfa", rgb: "167, 139, 250" }  // Purple
            ],
            size: 15
        },
        sniper: {
            active: false,
            scale: 2
        }
    };

    // 2. INJECT HTML
    const dockHtml = `
        <div id="assistant-dock">
            <div class="dock-tool" title="Sticky Notes" onclick="toggleWindow('sticky-window')">📝</div>
            <div class="dock-tool" title="Calculator" onclick="toggleWindow('calc-window')">🔢</div>
            <div class="dock-tool" title="Biostats" onclick="window.open('../Tool_MBB_Stats_Assistant.html', '_blank')">📊</div>
            <div class="dock-tool" title="Highlighter" id="highlighter-toggle" onclick="toggleHighlighter()">🖍️</div>
            <div class="dock-tool" title="Sniper Zoom" id="sniper-toggle" onclick="toggleSniper()">🔍</div>
            <div class="dock-tool" title="Page Zoom Out" onclick="changePageZoom(-0.1)">➖</div>
            <div class="dock-tool" title="Page Zoom In" onclick="changePageZoom(0.1)">➕</div>
            <div style="width:1px; height:20px; background:rgba(255,255,255,0.2); margin:0 5px;"></div>
            <div style="font-size:10px; color:#aaa; font-family:monospace;">AST-V1</div>
        </div>

        <!-- Sticky Notes Window -->
        <div id="sticky-window" class="assistant-window" style="width:320px; top:100px; left:100px;">
            <div class="window-header">📌 Sticky Notes <span class="close-window" onclick="toggleWindow('sticky-window')">×</span></div>
            <div class="window-content">
                <div class="sticky-controls">
                    <select onchange="updateStickyStyle('font', this.value)" style="width:75px; font-size:10px;">
                        <option value="Inter">Inter</option>
                        <option value="Courier New">Courier</option>
                        <option value="Georgia">Georgia</option>
                    </select>
                    <select onchange="updateStickyStyle('size', this.value)" style="width:55px; font-size:10px;">
                        <option value="12px">12px</option>
                        <option value="14px" selected>14px</option>
                        <option value="18px">18px</option>
                    </select>
                    <div style="display:flex; gap:4px; margin: 0 5px;" id="sticky-color-presets">
                        <!-- Bubbles injected by JS -->
                    </div>
                    <button class="btn-mini" onclick="addStickyPage()">+</button>
                    <button class="btn-mini" style="background:#ef4444" onclick="deleteStickyPage()">🗑️</button>
                </div>
                <textarea class="sticky-textarea" id="sticky-text" placeholder="Start typing..." oninput="saveSticky()"></textarea>
                <div class="sticky-page-nav">
                    <button onclick="navSticky(-1)">←</button>
                    <span id="sticky-page-info">Page 1 of 1</span>
                    <button onclick="navSticky(1)">→</button>
                </div>
            </div>
        </div>

        <!-- Calculator Window -->
        <div id="calc-window" class="assistant-window" style="width:260px; top:150px; left:150px; background:#000;">
            <div class="window-header">📱 Calculator <span class="close-window" onclick="toggleWindow('calc-window')">×</span></div>
            <div class="calc-display" id="calc-display">0</div>
            <div class="window-content" style="padding:10px;">
                <div class="calc-grid">
                    <button class="calc-btn special" onclick="calcInput('AC')">AC</button>
                    <button class="calc-btn special" onclick="calcInput('+/-')">±</button>
                    <button class="calc-btn special" onclick="calcInput('%')">%</button>
                    <button class="calc-btn op" onclick="calcInput('/')">÷</button>
                    <button class="calc-btn num" onclick="calcInput('7')">7</button>
                    <button class="calc-btn num" onclick="calcInput('8')">8</button>
                    <button class="calc-btn num" onclick="calcInput('9')">9</button>
                    <button class="calc-btn op" onclick="calcInput('*')">×</button>
                    <button class="calc-btn num" onclick="calcInput('4')">4</button>
                    <button class="calc-btn num" onclick="calcInput('5')">5</button>
                    <button class="calc-btn num" onclick="calcInput('6')">6</button>
                    <button class="calc-btn op" onclick="calcInput('-')">-</button>
                    <button class="calc-btn num" onclick="calcInput('1')">1</button>
                    <button class="calc-btn num" onclick="calcInput('2')">2</button>
                    <button class="calc-btn num" onclick="calcInput('3')">3</button>
                    <button class="calc-btn op" onclick="calcInput('+')">+</button>
                    <button class="calc-btn num zero" onclick="calcInput('0')">0</button>
                    <button class="calc-btn num" onclick="calcInput('.')">.</button>
                    <button class="calc-btn op" onclick="calcInput('=')">=</button>
                </div>
            </div>
        </div>

        <!-- Biostats Window -->
        <div id="biostats-window" class="assistant-window" style="width:350px; top:200px; left:200px;">
            <div class="window-header">🧬 Biostats Advanced <span class="close-window" onclick="toggleWindow('biostats-window')">×</span></div>
            <div class="window-content">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div>
                        <label style="font-size:10px;">Mean (μ)</label>
                        <input type="number" id="stats-mean" value="0" step="0.1" style="padding:4px; font-size:12px;">
                    </div>
                    <div>
                        <label style="font-size:10px;">Std Dev (σ)</label>
                        <input type="number" id="stats-sd" value="1" step="0.1" style="padding:4px; font-size:12px;">
                    </div>
                </div>
                <button class="btn btn-primary btn-mini" style="width:100%" onclick="updateStatsChart()">Generate Distribution</button>
                <div style="height:150px; margin-top:10px; background:#000; border-radius:8px; position:relative;">
                    <canvas id="stats-chart"></canvas>
                </div>
                <div id="stats-results" style="margin-top:10px; font-size:11px; color:#aaa;">
                    Input mean and SD to see the normal curve.
                </div>
            </div>
        </div>

        <canvas id="highlighter-canvas"></canvas>
        <div id="sniper-lens"></div>

        <!-- Highlighter Controls Floating (when active) -->
        <div id="highlighter-tools" style="display:none; position:fixed; top:20px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.8); padding:10px 20px; border-radius:50px; z-index:10005; gap:15px; align-items:center; border:1px solid #3b82f6; box-shadow: 0 0 20px rgba(59,130,246,0.3);">
            <div style="display:flex; background:rgba(255,255,255,0.1); border-radius:20px; padding:2px;">
                <button id="mode-pen" onclick="setHighlighterMode('pen')" style="background:none; border:none; padding:5px 10px; border-radius:15px; color:white; font-size:10px; cursor:pointer;">🖋️ Pen</button>
                <button id="mode-highlighter" onclick="setHighlighterMode('highlighter')" style="background:#3b82f6; border:none; padding:5px 10px; border-radius:15px; color:white; font-size:10px; cursor:pointer;">🖍️ High</button>
            </div>
            
            <div style="display:flex; gap:8px;" id="highlighter-color-presets">
                <!-- Injected by JS -->
            </div>

            <div style="display:flex; align-items:center; gap:8px;">
                <span style="color:white; font-size:10px;">Size</span>
                <input type="range" min="2" max="50" value="15" oninput="setHighlighterSize(this.value)" style="width:60px; height:4px;">
            </div>

            <button onclick="clearHighlights()" style="background:#ef4444; color:white; border:none; padding:6px 12px; border-radius:20px; font-size:10px; cursor:pointer;">Eraser All</button>
            <button onclick="toggleHighlighter()" style="color:#aaa; background:none; border:none; font-size:18px; cursor:pointer; padding:0 5px;">&times;</button>
        </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = dockHtml;
    document.body.appendChild(div);

    // 3. CORE UTILITIES
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
        const text = document.getElementById('sticky-text').value;
        state.sticky.pages[state.sticky.currentPage].content = text;
        localStorage.setItem('lss_assistant_sticky', JSON.stringify(state.sticky.pages));
    };

    window.addStickyPage = function () {
        state.sticky.pages.push({ content: "", color: "#92400e", bgColor: "#fef3c7", size: "14px", font: "Inter" });
        state.sticky.currentPage = state.sticky.pages.length - 1;
        renderSticky();
    };

    window.setStickyTheme = function (index) {
        const page = state.sticky.pages[state.sticky.currentPage];
        const theme = state.sticky.themes[index];
        page.bgColor = theme.bg;
        page.color = theme.text;
        renderSticky();
        saveSticky();
    };

    function initHighlighterColors() {
        const container = document.getElementById('highlighter-color-presets');
        if (!container) return;
        container.innerHTML = '';
        state.highlighter.baseColors.forEach((c, i) => {
            const div = document.createElement('div');
            div.style.width = '18px';
            div.style.height = '18px';
            div.style.borderRadius = '50%';
            div.style.background = c.hex;
            div.style.cursor = 'pointer';
            div.style.border = state.highlighter.colorIndex === i ? '2px solid white' : '1px solid rgba(255,255,255,0.2)';
            div.onclick = () => setHighlighterColor(i);
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

    window.navSticky = function (dir) {
        state.sticky.currentPage = (state.sticky.currentPage + dir + state.sticky.pages.length) % state.sticky.pages.length;
        renderSticky();
    };

    window.updateStickyStyle = function (type, val) {
        const page = state.sticky.pages[state.sticky.currentPage];
        page[type] = val;
        renderSticky();
    };

    function renderSticky() {
        const page = state.sticky.pages[state.sticky.currentPage];
        const area = document.getElementById('sticky-text');
        const winContent = area.parentElement;
        area.value = page.content;
        area.style.color = page.color;
        area.style.fontSize = page.size;
        area.style.fontFamily = page.font;
        winContent.style.background = page.bgColor || "#fef3c7";
        document.getElementById('sticky-page-info').innerText = `P. ${state.sticky.currentPage + 1}/${state.sticky.pages.length}`;
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
        document.getElementById('mode-pen').style.background = mode === 'pen' ? '#3b82f6' : 'none';
        document.getElementById('mode-highlighter').style.background = mode === 'highlighter' ? '#3b82f6' : 'none';
    };

    window.setHighlighterSize = function (size) {
        state.highlighter.size = parseInt(size);
    };

    window.setHighlighterColor = function (index) {
        state.highlighter.colorIndex = index;
        initHighlighterColors();
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
        const color = state.highlighter.baseColors[state.highlighter.colorIndex];
        const isHigh = state.highlighter.mode === 'highlighter';
        const opacity = isHigh ? 0.2 : 1.0;

        ctx.lineTo(e.clientX, e.clientY);
        ctx.strokeStyle = `rgba(${color.rgb}, ${opacity})`;
        ctx.lineWidth = state.highlighter.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (isHigh) {
            ctx.shadowBlur = 5;
            ctx.shadowColor = `rgba(${color.rgb}, 0.5)`;
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.stroke();
    };

    canvas.onmouseup = () => isDrawing = false;

    // 7. SNIPER ZOOM LOGIC (Enhanced CSS Magnifier)
    const lens = document.getElementById('sniper-lens');
    window.toggleSniper = function () {
        state.sniper.active = !state.sniper.active;
        lens.style.display = state.sniper.active ? 'block' : 'none';
        document.getElementById('sniper-toggle').classList.toggle('active', state.sniper.active);

        if (state.sniper.active) {
            // We use a CSS scale approach on the body, but applied to the lens background
            // To make it look "real", we clone relevant text or use a backdrop-filter trick
            // For now, a high-contrast zoom lens:
            lens.style.background = "rgba(255,255,255,0.1)";
            lens.style.backdropFilter = "contrast(1.2) brightness(1.1) saturate(1.2)";
        }
    };

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
        state.zoom += delta;
        state.zoom = Math.max(0.5, Math.min(2.0, state.zoom));
        document.body.style.transformOrigin = "top center";
        document.body.style.transform = `scale(${state.zoom})`;
        // Fix for fixed elements
        document.getElementById('assistant-dock').style.transform = `translateX(-50%) scale(${1 / state.zoom})`;
    };

})();
