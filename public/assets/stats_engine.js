/**
 * STATS ENGINE - CORE ROUTING & GLOBAL STATE
 */

const router = {
    pages: ['dashboard', 'metrics', 'distributions', 'hypothesis', 'modeling', 'spc', 'reports'],
    currentPage: 'dashboard',

    init() {
        // Check hash on load
        const hash = window.location.hash.replace('#', '');
        if (this.pages.includes(hash)) {
            this.navigate(hash, true);
        } else {
            this.navigate('dashboard', true);
        }

        // Listen for history changes
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.navigate(e.state.page, false);
            }
        });
    },

    navigate(page, pushState = true) {
        if (!this.pages.includes(page)) return;

        this.currentPage = page;

        // Update UI
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('nav-item-active');
        });
        const activeBtn = document.getElementById(`nav-${page}`);
        if (activeBtn) activeBtn.classList.add('nav-item-active');

        const pageTitle = page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ');
        document.getElementById('page-title').innerText = pageTitle;

        if (pushState) {
            window.history.pushState({ page }, pageTitle, `#${page}`);
        }

        this.renderPage(page);
    },

    renderPage(page) {
        const outlet = document.getElementById('router-outlet');
        outlet.innerHTML = ''; // Clear current

        // Modules will register their own renderers
        if (modules[page]) {
            outlet.appendChild(modules[page].render());
            // Re-run icon generation for dynamic content
            lucide.createIcons();
            // Scroll to top
            document.getElementById('content-area').scrollTop = 0;
        } else {
            outlet.innerHTML = `<div class="p-20 text-center opacity-50">Module "${page}" is currently under maintenance.</div>`;
        }
    }
};

/**
 * REPORT STORE - ACCUMULATES RESULTS
 */
const store = {
    reportItems: [],
    projectData: {
        name: 'Operation Excellence Audit',
        owner: 'Master Black Belt',
        date: new Date().toLocaleDateString(),
        process: 'Discrete Manufacturing'
    },

    addItem(module, title, data, chartData = null) {
        const item = {
            id: Date.now(),
            module,
            title,
            timestamp: new Date().toLocaleTimeString(),
            data,
            chartData
        };
        this.reportItems.push(item);
        this.updateUI();
        showToast(`Added ${title} to report builder`, 'success');
    },

    removeItem(id) {
        this.reportItems = this.reportItems.filter(i => i.id !== id);
        this.updateUI();
    },

    updateUI() {
        const badge = document.getElementById('report-count');
        if (this.reportItems.length > 0) {
            badge.innerText = this.reportItems.length;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
};

/**
 * UTILS
 */
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const colorClass = type === 'success' ? 'bg-brand-emerald' : (type === 'error' ? 'bg-brand-risk' : 'bg-brand-blue');

    toast.className = `p-4 rounded-xl flex items-center gap-3 text-brand-dark font-bold shadow-2xl animate-fade-in ${colorClass}`;
    toast.innerHTML = `
        <i data-lucide="${type === 'success' ? 'check-circle' : 'info'}" class="w-5 h-5"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        toast.style.transition = '0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function resetSession() {
    if (confirm('Reset all calculations and clear report builder?')) {
        store.reportItems = [];
        store.updateUI();
        router.navigate('dashboard');
        showToast('Session Reset');
    }
}
