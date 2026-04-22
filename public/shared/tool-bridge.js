/**
 * NEXUS COMMAND PROTOCOL BRIDGE v1.0
 * Deep Integration Layer for Legacy Statistics Tools
 */

(function() {
    console.log("🚀 Nexus Command Protocol Bridge Initialized");

    const Nexus = {
        save: function(data) {
            window.parent.postMessage({ type: 'SAVE_DELIVERABLE', data: data }, '*');
        },
        markComplete: function(data) {
            window.parent.postMessage({ type: 'MARK_COMPLETE', data: data }, '*');
        },
        notifyChange: function() {
            window.parent.postMessage({ type: 'FORM_CHANGED' }, '*');
        },
        // Hook for tools to implement
        onSaveTriggered: null,
        onLoadData: null
    };

    // Global listeners for Parent Shell signals
    window.addEventListener('message', function(event) {
        const { type, data } = event.data;

        if (type === 'TRIGGER_SAVE' && Nexus.onSaveTriggered) {
            Nexus.onSaveTriggered();
        } else if (type === 'TRIGGER_COMPLETE' && Nexus.onSaveTriggered) {
            // Usually complete also triggers a save first
            Nexus.onSaveTriggered(true);
        } else if (type === 'LOAD_SAVED_DATA' && Nexus.onLoadData) {
            Nexus.onLoadData(data);
        }
    });

    // Auto-detection: Handle form changes
    document.addEventListener('input', function() {
        Nexus.notifyChange();
    }, true);

    // Export to global scope
    window.NexusBridge = Nexus;

    // Premium UI Injections (Sidebar/Help Toggle)
    const injectStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .nexus-bridge-status {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(2, 6, 23, 0.8);
                backdrop-filter: blur(8px);
                border: 1px solid rgba(34, 211, 238, 0.2);
                padding: 8px 16px;
                border-radius: 99px;
                color: #22d3ee;
                font-family: 'Inter', sans-serif;
                font-size: 10px;
                font-weight: 900;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                z-index: 9999;
                pointer-events: none;
                display: flex;
                items-center;
                gap: 8px;
            }
            .nexus-pulse {
                width: 6px;
                height: 6px;
                background: #22d3ee;
                border-radius: 50%;
                animation: nexus-pulse 2s infinite;
            }
            @keyframes nexus-pulse {
                0% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.4); }
                70% { box-shadow: 0 0 0 10px rgba(34, 211, 238, 0); }
                100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); }
            }
        `;
        document.head.appendChild(style);
    };

    const injectIndicator = () => {
        const div = document.createElement('div');
        div.className = 'nexus-bridge-status';
        div.innerHTML = '<div class="nexus-pulse"></div> Link Active';
        document.body.appendChild(div);
    };

    if (document.readyState === 'complete') {
        injectStyles();
        injectIndicator();
    } else {
        window.addEventListener('load', () => {
            injectStyles();
            injectIndicator();
        });
    }
})();
