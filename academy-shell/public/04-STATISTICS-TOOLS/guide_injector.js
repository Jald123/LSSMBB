function renderGuide(config) {
    const storySteps = config.story.map((step, index) => `
        <div style="background:#334155; padding:10px; border-radius:6px; position:relative;">
            <div style="position:absolute; top:-5px; left:-5px; width:20px; height:20px; background:#f97316; color:white; border-radius:50%; font-size:10px; display:flex; align-items:center; justify-content:center; font-weight:bold;">${index + 1}</div>
            <div style="margin-left:15px;">
                <div style="color:white; font-weight:bold; font-size:11px;">${step.title}</div>
                <div style="color:#cbd5e1; font-size:10px; margin-top:2px;">${step.desc}</div>
            </div>
        </div>
    `).join('');

    const html = `
    <div class="explainer-section" style="background:#0f172a; padding:20px; border-radius:12px; margin-bottom:30px; border:1px solid #1e293b; color:white; font-family:'Inter', sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;">
            <div>
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:5px;">
                    <h1 style="margin:0; font-family:'Orbitron',sans-serif; font-size:24px; color:white;">${config.title}</h1>
                    <span style="background:#2563eb; color:white; padding:2px 8px; border-radius:4px; font-size:10px; font-weight:bold;">${config.phase || 'MEASURE'}</span>
                </div>
                <div style="color:#94a3b8; font-style:italic; font-size:14px;">"${config.quote}"</div>
            </div>
            <button onclick="window.print()" class="sticky-export">📷 Export PNG / Print</button>
        </div>
        <div style="background:#1e293b; padding:15px; border-radius:8px; margin-bottom:15px; border-left:4px solid #3b82f6;">
            <h4 style="margin:0 0 5px 0; color:#60a5fa; font-size:11px; text-transform:uppercase;">📜 Origin & Power</h4>
            <p style="margin:0; font-size:12px; color:#cbd5e1; line-height:1.5;">${config.origin}</p>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:15px; margin-bottom:15px;">
            <div style="background:#1e293b; padding:15px; border-radius:8px; border:1px solid #334155;">
                <h4 style="margin:0 0 5px 0; color:#ea580c; font-size:11px; text-transform:uppercase;">🤔 What is it?</h4>
                <p style="margin:0; font-size:12px; color:#cbd5e1;">${config.what}</p>
            </div>
            <div style="background:#1e293b; padding:15px; border-radius:8px; border:1px solid #334155;">
                <h4 style="margin:0 0 5px 0; color:#ea580c; font-size:11px; text-transform:uppercase;">💡 Why use it?</h4>
                <p style="margin:0; font-size:12px; color:#cbd5e1;">${config.why}</p>
            </div>
            <div style="background:#1e293b; padding:15px; border-radius:8px; border:1px solid #334155;">
                <h4 style="margin:0 0 5px 0; color:#ea580c; font-size:11px; text-transform:uppercase;">🕒 When to use?</h4>
                <p style="margin:0; font-size:12px; color:#cbd5e1;">${config.when}</p>
            </div>
        </div>
        
        <div style="display:grid; grid-template-columns:1fr 2fr; gap:15px;">
            <div style="background:#1e293b; padding:15px; border-radius:8px; border:1px solid #334155;">
                <h4 style="margin:0 0 10px 0; color:#ea580c; font-size:11px; text-transform:uppercase;">📋 Pre-Requirements</h4>
                <p style="margin:0 0 15px 0; font-size:12px; color:#cbd5e1;">${config.preReq}</p>
                <h4 style="margin:0 0 10px 0; color:#ea580c; font-size:11px; text-transform:uppercase;">👮 Strict Roles</h4>
                <p style="margin:0; font-size:12px; color:#cbd5e1;">${config.roles}</p>
            </div>
            <div style="background:#1e293b; padding:15px; border-radius:8px; border:1px solid #334155;">
                <details class="story-mode">
                    <summary>🎮 How to Execute (Story Mode)</summary>
                    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-top:10px;">
                        ${storySteps}
                    </div>
                </details>
            </div>
        </div>
    </div>
    `;

    // Inject
    const target = document.querySelector('.guide-column');
    if (target) {
        target.innerHTML = html + target.innerHTML; // Prepend or replace?
        // Actually, the guide column should BE empty and we inject this.
        // Or we replace the 'explainer-section' inside it.
        const old = target.querySelector('.explainer-section');
        if (old) old.remove();
        target.insertAdjacentHTML('afterbegin', html);
    }
}
