# STANDARD NAVIGATION COMPONENT
This file replicates the standard, bottom-floating navigation capsule across all Lean Six Sigma tools.

## CSS Component
Include this in the `<style>` block:
```css
/* BOTTOM NAVIGATION - STANDARD */
.bottom-nav {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 100px;
    padding: 8px 24px;
    display: flex;
    gap: 0;
    align-items: center;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
    z-index: 1000;
}

.nav-item {
    color: #94a3b8;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.nav-item:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
}

.nav-divider {
    width: 1px;
    height: 20px;
    background: rgba(255, 255, 255, 0.1);
    margin: 0 5px;
}

/* TOOLTIP */
.nav-tooltip {
    position: absolute;
    bottom: 140%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.1);
}

.nav-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: rgba(0,0,0,0.9) transparent transparent transparent;
}

.nav-item:hover .nav-tooltip {
    opacity: 1;
    visibility: visible;
    bottom: 130%;
}

/* HIDE ON PRINT */
@media print {
    .bottom-nav { display: none !important; }
}
```

## HTML Component
Paste this just before the closing `</body>` tag or before the main `<script>` block:
```html
<!-- BOTTOM NAVIGATION -->
<div class="bottom-nav">
    <a href="Stats_Calculator_Main.html" class="nav-item">
        🛡️
        <span class="nav-tooltip">Dashboard</span>
    </a>
    <div class="nav-divider"></div>
    <a href="#" onclick="window.history.back(); return false;" class="nav-item">
        ←
        <span class="nav-tooltip">Previous Page</span>
    </a>
    <div class="nav-divider"></div>
    <a href="Tool_WorkflowHub.html" class="nav-item">
        📁
        <span class="nav-tooltip">Workflow Hub</span>
    </a>
    <div class="nav-divider"></div>
    <a href="Stats_Calculator_Main.html" class="nav-item">
        📊
        <span class="nav-tooltip">Stats Engine</span>
    </a>
    <div class="nav-divider"></div>
    <div class="nav-item" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
        ↑
        <span class="nav-tooltip">Top of Page</span>
    </div>
</div>
```
