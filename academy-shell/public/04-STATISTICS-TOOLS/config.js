const CONFIG = {
    GEMINI_API_KEY: "AIzaSyDtDtcOygeti1pLTwQDr7KN1U8HOS1iWJw",
    GEMINI_API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
};

// --- UNIVERSAL NAVIGATION BAR INJECTOR ---
(function () {
    // 1. Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .universal-nav-bar {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: none !important; /* Legacy floating nav disabled */
            gap: 20px;
            background: rgba(18, 18, 18, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 12px 30px;
            border-radius: 50px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 40px rgba(0,0,0,0.6);
            z-index: 99999;
            transition: all 0.3s ease;
        }

        .universal-nav-bar:hover {
            box-shadow: 0 15px 50px rgba(0,0,0,0.8);
            border-color: rgba(255, 255, 255, 0.2);
            bottom: 25px;
        }

        .nav-btn {
            background: transparent;
            border: none;
            color: #aaa;
            cursor: pointer;
            font-size: 20px;
            transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            text-decoration: none;
        }

        .nav-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.1);
            transform: scale(1.15);
        }

        .nav-btn.active {
            color: #3498db; /* Default Accent */
            background: rgba(52, 152, 219, 0.15);
        }
        
        /* Tooltip */
        .nav-btn { position: relative; }
        .nav-btn::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 110%;
            left: 50%;
            transform: translateX(-50%) translateY(10px);
            background: #222;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 11px;
            opacity: 0;
            pointer-events: none;
            transition: 0.2s;
            white-space: nowrap;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .nav-btn:hover::after {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML when DOM is ready
    window.addEventListener('DOMContentLoaded', () => {
        const nav = document.createElement('div');
        nav.className = 'universal-nav-bar';
        nav.innerHTML = `
            <div class="nav-btn" style="width: auto; padding: 0 10px; pointer-events: none;">
                <img src="images/health_quality_logo.jpg" style="height: 30px; border-radius: 4px;">
            </div>

            <div style="width:1px; height:20px; background:rgba(255,255,255,0.1);"></div>

            <button class="nav-btn" onclick="safelyGoBack()" data-tooltip="Previous Page">
                ←
            </button>
            
            <div style="width:1px; height:20px; background:rgba(255,255,255,0.1);"></div>

            <a href="Tool_WorkflowHub.html" class="nav-btn" data-tooltip="Workflow Hub">
                🧭
            </a>
            
            <a href="Tool_LeanWorkshop.html" class="nav-btn" data-tooltip="Lean Studio">
                💎
            </a>

            <a href="Stats_Calculator_Main.html" class="nav-btn" data-tooltip="Stats Engine">
                🧪
            </a>

            <div style="width:1px; height:20px; background:rgba(255,255,255,0.1);"></div>

            <button class="nav-btn" onclick="window.scrollTo({top:0, behavior:'smooth'})" data-tooltip="Top of Page">
                🔝
            </button>
        `;
        document.body.appendChild(nav);
    });

    // 3. Helper Functions
    window.safelyGoBack = function () {
        if (document.referrer && document.referrer.indexOf(window.location.host) !== -1) {
            window.history.back();
        } else {
            // Fallback if no history or external referrer
            window.location.href = 'Tool_WorkflowHub.html';
        }
    };
})();
