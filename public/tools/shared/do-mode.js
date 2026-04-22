/**
 * Nexus OS Academy - DO Mode Utility
 * Injected into tool HTML files to handle professional operational mode.
 */

(function () {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const projectId = params.get('projectId');
    const toolId = params.get('toolId');
    const phase = params.get('phase');
    const caseTitle = params.get('caseTitle') || 'Operational Case';

    if (mode !== 'do') return;

    // 1. Initialize DO Mode
    document.body.classList.add('do-mode');

    // 2. Load DO Mode CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../shared/do-mode-theme.css';
    document.head.appendChild(link);

    // 3. Inject Top Context Bar
    const contextBar = document.createElement('div');
    contextBar.id = 'do-mode-context-bar';
    contextBar.innerHTML = `
    <div style="display: flex; gap: 12px; align-items: center;">
      <span style="opacity: 0.5;">PROJECT:</span>
      <span>${caseTitle.toUpperCase()}</span>
      <span style="opacity: 0.2;">|</span>
      <span style="color: var(--primary)">${phase?.toUpperCase() || 'EXECUTION'}</span>
    </div>
    <div class="auto-save-tag" id="save-indicator">
      <div style="width: 8px; height: 8px; border-radius: 50%; background: #59ce8f;"></div>
      <span>All changes saved</span>
    </div>
  `;
    document.body.prepend(contextBar);

    // 4. Inject Bottom Action Bar
    const actionBar = document.createElement('div');
    actionBar.id = 'do-mode-action-bar';
    actionBar.innerHTML = `
    <div class="save-timestamp" id="last-saved">Last saved: Just now</div>
    <div class="action-buttons">
      <button class="btn-secondary" id="saveDraftBtn">Save Draft</button>
      <button class="btn-primary" id="saveProjectBtn">Save to Project</button>
      <button class="btn-complete" id="markCompleteBtn">Mark Complete</button>
    </div>
  `;
    document.body.appendChild(actionBar);

    // 5. Restyle existing primary buttons
    const primaryBtns = document.querySelectorAll('#calculateBtn, .submit-action, .btn-primary');
    primaryBtns.forEach(btn => {
        btn.textContent = 'Save to Project';
    });

    // 6. Hide evidence buttons (DO mode uses automated data capture)
    const evidenceBtns = document.querySelectorAll('.upload-evidence, #uploadBtn');
    evidenceBtns.forEach(btn => btn.style.display = 'none');

    // 7. Data Collection Logic
    function collectFormData() {
        const data = {};
        const inputs = document.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            if (input.name || input.id) {
                const key = input.name || input.id;
                if (input.type === 'checkbox') data[key] = input.checked;
                else if (input.type === 'radio') {
                    if (input.checked) data[key] = input.value;
                } else data[key] = input.value;
            }
        });

        // Capture specific result elements if they exist
        const results = document.querySelectorAll('.result-value, #final-output');
        results.forEach(res => {
            data[`result_${res.id || 'value'}`] = res.innerText;
        });

        return data;
    }

    // 8. Communication with Parent
    function sendToParent(type) {
        const payload = {
            type: type,
            toolId: toolId,
            projectId: projectId,
            phase: phase,
            data: collectFormData(),
            timestamp: new Date().toISOString()
        };
        window.parent.postMessage(payload, '*');

        // Visual feedback
        const indicator = document.getElementById('save-indicator');
        if (indicator) {
            indicator.innerHTML = '<div style="width: 8px; height: 8px; border-radius: 50%; background: #ff1e00;"></div><span>Saving...</span>';
        }
    }

    // 9. Event Listeners
    document.getElementById('saveProjectBtn')?.addEventListener('click', () => sendToParent('SAVE_DELIVERABLE'));
    document.getElementById('saveDraftBtn')?.addEventListener('click', () => sendToParent('SAVE_DRAFT'));
    document.getElementById('markCompleteBtn')?.addEventListener('click', () => sendToParent('MARK_COMPLETE'));

    // Handle Parent Response
    window.addEventListener('message', (event) => {
        if (event.data.type === 'SAVE_CONFIRMED') {
            const indicator = document.getElementById('save-indicator');
            if (indicator) {
                indicator.innerHTML = '<div style="width: 8px; height: 8px; border-radius: 50%; background: #59ce8f;"></div><span aria-live="polite">All changes saved</span>';
            }
            const timeLabel = document.getElementById('last-saved');
            if (timeLabel) {
                const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                timeLabel.innerText = `Last saved: ${now}`;
            }
        }

        if (event.data.type === 'TRIGGER_SAVE') {
            sendToParent('SAVE_DELIVERABLE');
        }

        if (event.data.type === 'LOAD_SAVED_DATA') {
            const savedData = event.data.data;
            if (savedData) {
                console.log("DO MODE: Loading saved data...", savedData);
                Object.keys(savedData).forEach(key => {
                    const el = document.getElementById(key) || document.getElementsByName(key)[0];
                    if (el) {
                        if (el.type === 'checkbox') el.checked = savedData[key];
                        else if (el.type === 'radio') {
                            const radio = document.querySelector(`input[name="${key}"][value="${savedData[key]}"]`);
                            if (radio) radio.checked = true;
                        } else {
                            el.value = savedData[key];
                        }
                        // Trigger change/input events for calculations
                        el.dispatchEvent(new Event('input', { bubbles: true }));
                        el.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                });

                // Auto-click calculation button after a small delay
                setTimeout(() => {
                    const calcBtn = document.querySelector('[data-role="primary-submit"]') ||
                        document.getElementById('calculateBtn') ||
                        document.querySelector('.submit-action');
                    if (calcBtn && typeof calcBtn.click === 'function') {
                        console.log("DO MODE: Auto-calculating results...");
                        calcBtn.click();
                    }
                }, 500);
            }
        }
    });

    // 10. Debounced Auto-Save & Offline Queue
    let lastData = JSON.stringify(collectFormData());
    let debounceTimer;

    function autoSave() {
        if (!navigator.onLine) {
            console.warn("DO MODE: Offline. Queueing save...");
            localStorage.setItem(`offline_save_${projectId}_${toolId}`, JSON.stringify(collectFormData()));
            return;
        }

        const currentData = JSON.stringify(collectFormData());
        if (currentData !== lastData) {
            sendToParent('SAVE_DELIVERABLE');
            lastData = currentData;
        }
    }

    document.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(autoSave, 2000);

        // Tell parent form changed (for navigation guard)
        window.parent.postMessage({ type: 'FORM_CHANGED' }, '*');
    });

    // Replay offline saves
    window.addEventListener('online', () => {
        const queuedData = localStorage.getItem(`offline_save_${projectId}_${toolId}`);
        if (queuedData) {
            console.log("DO MODE: Reconnecting. Replaying queued save...");
            sendToParent('SAVE_DELIVERABLE');
            localStorage.removeItem(`offline_save_${projectId}_${toolId}`);
        }
    });

})();
