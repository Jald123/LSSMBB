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

    // 2. INJECT HTML
    const dockHtml = `
        <div id="assistant-dock">
            <div class="dock-tool" title="Sticky Notes" onclick="toggleWindow('sticky-window')">📝</div>
            <div class="dock-tool" title="Calculator" onclick="toggleWindow('calc-window')">🔢</div>
            <div class="dock-tool" title="Biostats" onclick="window.open('../Tool_MBB_Stats_Assistant.html', '_blank')">📊</div>
            <div class="dock-tool" title="Highlighter" id="highlighter-toggle" onclick="toggleHighlighter()">🖍️</div>
            <div class="dock-tool" title="Sniper Zoom" id="sniper-toggle" onclick="toggleSniper()">🔍</div>
            <div class="dock-tool zoom-out" title="Zoom Out" onclick="changePageZoom(-0.1)" style="background:linear-gradient(135deg, #6366f1, #4f46e5);">➖</div>
            <div class="dock-tool zoom-reset" title="Zoom Reset" onclick="changePageZoom(0)" style="background:linear-gradient(135deg, #f97316, #ea580c);">🏠</div>
            <div class="dock-tool zoom-in" title="Zoom In" onclick="changePageZoom(0.1)" style="background:linear-gradient(135deg, #22c55e, #16a34a);">➕</div>
            <div style="width:1px; height:20px; background:rgba(255,255,255,0.2); margin:0 5px;"></div>
            <div style="font-size:10px; color:#aaa; font-family:monospace;">AST-V2</div>
        </div>

        <!-- Sticky Notes Window (Professional Enterprise Style) - Resizable -->
        <div id="sticky-window" class="assistant-window" style="position:fixed; width:380px; min-width:300px; min-height:300px; top:100px; right:50px; left:auto; background: linear-gradient(180deg, #1e293b, #0f172a); border-radius: 16px; box-shadow: 0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08); z-index:10001; border:none; resize:both; overflow:hidden; display:none; flex-direction:column;">
            <!-- Color Selection Bar - More Obvious -->
            <div class="sticky-header-bar" id="sticky-color-presets" style="display:flex; height:12px; border-radius:16px 16px 0 0; overflow:hidden; cursor:pointer;">
                <!-- Colors injected here -->
            </div>
            <div class="window-header sticky-app-header" style="background:transparent; color:#f1f5f9; height:50px; border-bottom:1px solid rgba(255,255,255,0.08); padding:0 18px;">
                <div style="display:flex; align-items:center; gap:14px;">
                    <span onclick="toggleStickyList()" style="cursor:pointer; font-size:16px; color:#64748b; transition:color 0.2s;" title="Notes List" onmouseover="this.style.color='#f1f5f9'" onmouseout="this.style.color='#64748b'">☰</span>
                    <span style="font-weight:600; font-size:13px; letter-spacing:1.5px; color:#94a3b8;">NOTES</span>
                </div>
                <div style="display:flex; gap:15px; align-items:center;">
                    <span onclick="deleteStickyPage()" title="Delete Note" style="cursor:pointer; color:#64748b; font-size:14px; transition:all 0.2s;" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#64748b'">🗑️</span>
                    <span class="close-window" onclick="toggleWindow('sticky-window')" style="font-size:20px; color:#64748b; cursor:pointer; transition:color 0.2s;" onmouseover="this.style.color='#f1f5f9'" onmouseout="this.style.color='#64748b'">&times;</span>
                </div>
            </div>
            <div class="window-content sticky-content-area" style="padding:0; position:relative; background:transparent;">
                <!-- Content with bright white text for clarity -->
                <div id="sticky-editor" contenteditable="true" class="sticky-rich-editor" oninput="saveSticky()" style="min-height:280px; padding:20px 22px; outline:none; font-family:'Inter', 'Segoe UI', -apple-system, sans-serif; font-size:15px; color:#ffffff; line-height:1.8; background:transparent;"></div>
                
                <!-- Bottom Toolbar - Darker Background -->
                <div class="sticky-footer-toolbar" style="display:flex; padding:12px 18px; border-top:1px solid rgba(255,255,255,0.06); background:#0a0f1a; gap:6px; align-items:center; justify-content:space-between;">
                    <div style="display:flex; gap:4px; align-items:center;">
                        <button class="tool-btn-rich dark" onclick="execCmd('bold')" title="Bold"><b>B</b></button>
                        <button class="tool-btn-rich dark" onclick="execCmd('italic')" title="Italic"><i>I</i></button>
                        <button class="tool-btn-rich dark" onclick="execCmd('underline')" title="Underline"><u>U</u></button>
                        <button class="tool-btn-rich dark" onclick="execCmd('strikeThrough')" title="Strikethrough"><s>S</s></button>
                        <button class="tool-btn-rich dark" onclick="execCmd('insertUnorderedList')" title="Bullets">•</button>
                        <div style="width:1px; height:20px; background:rgba(255,255,255,0.08); margin:0 8px;"></div>
                        <!-- Font Color Picker -->
                        <div style="position:relative;">
                            <button class="tool-btn-rich dark" onclick="toggleFontColorPicker()" title="Font Color" id="font-color-btn" style="display:flex; align-items:center; gap:4px;">A<span id="font-color-indicator" style="width:12px; height:3px; background:#3b82f6; border-radius:1px; margin-top:2px;"></span></button>
                            <div id="font-color-picker" style="display:none; position:absolute; bottom:40px; left:0; background:#0a0f1a; border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:10px; box-shadow:0 15px 40px rgba(0,0,0,0.6); z-index:100;">
                                <div style="display:grid; grid-template-columns:repeat(5,1fr); gap:6px;" id="font-color-options"></div>
                            </div>
                        </div>
                        <div style="width:1px; height:20px; background:rgba(255,255,255,0.08); margin:0 8px;"></div>
                        <!-- Font Size Controls -->
                        <div style="display:flex; gap:2px; align-items:center;">
                            <button class="tool-btn-rich dark" onclick="changeStickyFontSize(-1)" title="Decrease Font Size" style="font-size:11px;">A-</button>
                            <button class="tool-btn-rich dark" onclick="changeStickyFontSize(1)" title="Increase Font Size" style="font-size:14px;">A+</button>
                        </div>
                    </div>
                    <div style="display:flex; gap:15px; align-items:center;">
                        <span onclick="addStickyPage()" title="New Note" style="cursor:pointer; font-size:22px; font-weight:300; color:#3b82f6; transition:all 0.2s; line-height:1;" onmouseover="this.style.color='#60a5fa'" onmouseout="this.style.color='#3b82f6'">+</span>
                        <span id="sticky-page-info" style="font-size:11px; color:#64748b; font-weight:500; background:rgba(255,255,255,0.05); padding:4px 10px; border-radius:12px;">1/1</span>
                    </div>
                </div>
            </div>
            
            <!-- Notes List View (Professional Dark Style) -->
            <div id="sticky-list-view" style="display:none; position:absolute; top:62px; left:0; width:100%; height:calc(100% - 62px); background:#0a0f1a; z-index:10; overflow-y:auto; padding:18px; border-radius:0 0 16px 16px;">
                <div style="font-size:10px; font-weight:600; color:#64748b; margin-bottom:15px; padding:0 5px; text-transform:uppercase; letter-spacing:2px;">All Notes</div>
                <div id="sticky-list-items"></div>
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

        <!-- Advanced Drawing Toolbar (MS Word Inspired) -->
        <div id="highlighter-tools" style="display:none; position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#f3f3f3; padding:10px 25px; border-radius:12px; z-index:10005; gap:20px; align-items:center; border:1px solid #ccc; box-shadow: 0 10px 40px rgba(0,0,0,0.2); color:#333;">
            <div class="tool-section-label" style="position:absolute; bottom:-18px; left:50%; transform:translateX(-50%); font-size:9px; color:#888; text-transform:uppercase; font-weight:700;">Ink Tools</div>
            
            <div style="display:flex; gap:12px; border-right:1px solid #ddd; padding-right:15px;">
                <div class="draw-tool-item active" id="pen-select" onclick="setHighlighterMode('pen')" title="Pen">
                    <div style="font-size:22px;">✒️</div>
                </div>
                <div class="draw-tool-item" id="highlighter-select" onclick="setHighlighterMode('highlighter')" title="Highlighter">
                    <div style="font-size:22px;">🖍️</div>
                </div>
                <div class="draw-tool-item" id="pencil-select" onclick="setHighlighterMode('pencil')" title="Pencil">
                    <div style="font-size:22px;">✏️</div>
                </div>
                <div class="draw-tool-item" onclick="toggleLasso()" id="lasso-toggle" title="Lasso Select">
                    <div style="font-size:22px;">➰</div>
                </div>
            </div>
            
            <div style="display:flex; flex-direction:column; gap:5px; border-right:1px solid #ddd; padding-right:15px;">
                <div style="display:grid; grid-template-columns: repeat(5, 1fr); gap:4px;" id="highlighter-color-presets">
                    <!-- Colors Injected by JS -->
                </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-size:9px; font-weight:bold; color:#666; text-transform:uppercase;">Thickness</span>
                <input type="range" min="5" max="60" value="25" id="thickness-slider" oninput="setHighlighterSize(this.value)" style="width:80px; cursor:pointer;">
            </div>

            <!-- Transparency Control (visible only for highlighter mode) -->
            <div id="transparency-control" style="display:none; flex-direction:column; gap:2px; border-left:1px solid #ddd; padding-left:15px;">
                <span style="font-size:9px; font-weight:bold; color:#666; text-transform:uppercase;">Transparency</span>
                <div style="display:flex; align-items:center; gap:8px;">
                    <input type="range" min="90" max="99" value="95" id="transparency-slider" oninput="setHighlighterTransparency(this.value)" style="width:70px; cursor:pointer;">
                    <span id="transparency-value" style="font-size:11px; font-weight:600; color:#333; min-width:35px;">95%</span>
                </div>
            </div>

            <div style="display:flex; gap:10px; align-items:center;">
                <button onclick="clearHighlights()" style="background:#fff; color:#333; border:1px solid #ccc; padding:8px 12px; border-radius:6px; font-size:11px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:5px;"><span>🧹</span> Clear</button>
                <div class="lss-toggle-btn" id="shape-toggle" onclick="toggleShapeMode()" title="Ink to Shape">📐</div>
                <button onclick="toggleHighlighter()" style="color:#aaa; background:none; border:none; font-size:24px; cursor:pointer;" title="Exit">&times;</button>
            </div>
        </div>

        <!-- Sniper Zoom UI (positioned below dock icon) -->
        <div id="sniper-controls" style="display:none; position:fixed; top:70px; background:rgba(15,23,42,0.95); padding:10px 20px; border-radius:25px; z-index:10005; gap:12px; align-items:center; border:1px solid rgba(255,255,255,0.15); color:white; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
            <div style="font-size:10px; font-weight:bold; text-transform:uppercase; color:#64748b; letter-spacing:1px;">Zoom Mode:</div>
            <button onclick="setSniperMode('lens')" id="sniper-mode-lens" class="sniper-btn active">⚪ Lens</button>
            <button onclick="setSniperMode('pointer')" id="sniper-mode-pointer" class="sniper-btn">🎯 Sniper</button>
            <div style="width:1px; height:18px; background:rgba(255,255,255,0.15);"></div>
            <div style="font-size:10px; color:#94a3b8;">Scroll to Zoom</div>
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

        controls.style.display = state.sniper.active ? 'flex' : 'none';
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
            lens.style.border = "2px solid white";
            lens.style.background = "rgba(255,255,255,0.1)";
            lens.style.backdropFilter = "contrast(1.2) brightness(1.1) saturate(1.2) blur(0px)";
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

})();
