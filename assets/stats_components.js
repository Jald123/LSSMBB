/**
 * UI COMPONENTS & CHART HELPERS
 */

const components = {
    /**
     * Card Container
     */
    card(title, children, accent = 'emerald') {
        const div = document.createElement('div');
        div.className = `glass rounded-2xl p-6 shadow-xl animate-fade-in border-t-2 border-brand-${accent}/30`;
        div.innerHTML = `
            <div class="flex items-center justify-between mb-6">
                <h3 class="font-display font-bold text-lg text-white flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-brand-${accent} shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                    ${title}
                </h3>
            </div>
            <div class="space-y-4">
                ${children}
            </div>
        `;
        return div;
    },

    /**
     * Statistical Stat Box
     */
    stat(label, value, subtext = '', tooltip = '') {
        return `
            <div class="p-4 bg-slate-900/40 rounded-xl border border-slate-800/50 group hover:border-brand-emerald/20 transition-all">
                <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                    ${label}
                    ${tooltip ? `<i data-lucide="help-circle" class="w-3 h-3 lss-tooltip" data-tip="${tooltip}"></i>` : ''}
                </p>
                <p class="text-2xl font-display font-extrabold text-white group-hover:text-brand-emerald transition-colors">${value}</p>
                ${subtext ? `<p class="text-[10px] text-slate-400 mt-1">${subtext}</p>` : ''}
            </div>
        `;
    },

    /**
     * Interactive Input Group
     */
    input(id, label, placeholder = '', type = 'text', helper = '') {
        return `
            <div class="space-y-1.5">
                <label for="${id}" class="text-xs font-bold text-slate-400 uppercase tracking-tight">${label}</label>
                <input type="${type}" id="${id}" placeholder="${placeholder}" 
                    class="w-full bg-slate-900/60 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-emerald/50 focus:ring-1 focus:ring-brand-emerald/20 transition-all placeholder:text-slate-600">
                ${helper ? `<p class="text-[10px] text-slate-500 italic">${helper}</p>` : ''}
            </div>
        `;
    },

    /**
     * Action Button
     */
    button(label, onclick, variant = 'primary', icon = '') {
        const base = "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group";
        const variants = {
            primary: "bg-brand-emerald text-brand-dark hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02]",
            outline: "border border-slate-700 text-slate-300 hover:border-brand-emerald hover:text-brand-emerald",
            ghost: "text-slate-500 hover:text-white"
        };

        return `<button onclick="${onclick}" class="${base} ${variants[variant]}">
            ${icon ? `<i data-lucide="${icon}" class="w-4 h-4"></i>` : ''}
            ${label}
        </button>`;
    },

    /**
     * Chart Wrapper
     */
    chart(id, height = '300px') {
        return `<div class="relative w-full" style="height: ${height}">
            <canvas id="${id}"></canvas>
        </div>`;
    },

    /**
     * MBB Insight Box
     */
    insight(text, level = 'info') {
        const icons = { info: 'lightbulb', warn: 'alert-triangle', check: 'shield-check' };
        const colors = { info: 'brand-blue', warn: 'brand-accent', check: 'brand-emerald' };

        return `
            <div class="p-4 bg-${colors[level]}/5 rounded-xl border border-${colors[level]}/20 flex gap-4">
                <div class="mt-1"><i data-lucide="${icons[level]}" class="w-5 h-5 text-${colors[level]}"></i></div>
                <div>
                    <p class="text-xs font-bold text-${colors[level]} uppercase tracking-widest mb-1">MBB Insight</p>
                    <p class="text-sm leading-relaxed text-slate-300">${text}</p>
                </div>
            </div>
        `;
    }
};
