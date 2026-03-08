import React, { createContext, useContext, useState, useEffect } from 'react';

const NexusContext = createContext();

export const useNexus = () => {
    const context = useContext(NexusContext);
    if (!context) {
        throw new Error('useNexus must be used within a NexusProvider');
    }
    return context;
};

export const NexusProvider = ({ children }) => {
    // --- SAVED STATE (via LocalStorage) ---
    const [state, setState] = useState(() => {
        const saved = localStorage.getItem('nexus_os_state');
        return saved ? JSON.parse(saved) : {
            lastPhaseId: 'define',
            lastToolId: 'charter',
            completedTools: [],
            completedPhases: [],
            industry: 'healthcare',
            methodology: 'DMAIC',
            isSidebarCollapsed: false,
            isRightPanelOpen: true,
            hasSeenOnboarding: false,
            currentMission: 'ER Wait Time Reduction',
            xp: 1240,
            theme: 'light'
        };
    });

    // Persist state changes
    useEffect(() => {
        localStorage.setItem('nexus_os_state', JSON.stringify(state));

        // Apply theme to document body
        const root = document.documentElement;
        if (state.theme === 'light') {
            root.classList.add('light-mode');
        } else {
            root.classList.remove('light-mode');
        }

        // Apply industry (sector) class for dynamic CSS theme shifting
        root.classList.remove('sector-healthcare', 'sector-business', 'sector-life');
        root.classList.add(`sector-${state.industry}`);
    }, [state]);

    // --- ACTIONS ---
    const updateProgress = (key, value) => {
        setState(prev => ({ ...prev, [key]: value }));
    };

    const markToolComplete = (toolId) => {
        if (!state.completedTools.includes(toolId)) {
            setState(prev => ({
                ...prev,
                completedTools: [...prev.completedTools, toolId],
                xp: prev.xp + 50
            }));
        }
    };

    const toggleSidebar = () => {
        setState(prev => ({ ...prev, isSidebarCollapsed: !prev.isSidebarCollapsed }));
    };

    const toggleRightPanel = () => {
        setState(prev => ({ ...prev, isRightPanelOpen: !prev.isRightPanelOpen }));
    };

    const toggleTheme = () => {
        setState(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
    };

    const completeOnboarding = () => {
        setState(prev => ({ ...prev, hasSeenOnboarding: true }));
    };

    const setIndustry = (val) => updateProgress('industry', val);
    const setMethodology = (val) => updateProgress('methodology', val);

    const value = {
        ...state,
        updateProgress,
        markToolComplete,
        toggleSidebar,
        toggleRightPanel,
        toggleTheme,
        completeOnboarding,
        setIndustry,
        setMethodology
    };

    return (
        <NexusContext.Provider value={value}>
            {children}
        </NexusContext.Provider>
    );
};
