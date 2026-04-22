'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NexusState {
    lastPhaseId: string;
    lastToolId: string;
    completedTools: string[];
    completedPhases: string[];
    industry: string;
    methodology: string;
    isSidebarCollapsed: boolean;
    isRightPanelOpen: boolean;
    hasSeenOnboarding: boolean;
    currentMission: string;
    xp: number;
    theme: 'light' | 'dark';
}

interface NexusContextType extends NexusState {
    updateProgress: (key: keyof NexusState, value: NexusState[keyof NexusState]) => void;
    markToolComplete: (toolId: string) => void;
    toggleSidebar: () => void;
    toggleRightPanel: () => void;
    toggleTheme: () => void;
    completeOnboarding: () => void;
    setIndustry: (val: string) => void;
    setMethodology: (val: string) => void;
}

const NexusContext = createContext<NexusContextType | undefined>(undefined);

export const useNexus = () => {
    const context = useContext(NexusContext);
    if (!context) {
        throw new Error('useNexus must be used within a NexusProvider');
    }
    return context;
};

export const NexusProvider = ({ children }: { children: ReactNode }) => {
    // --- SAVED STATE (via LocalStorage) ---
    const [state, setState] = useState<NexusState>(() => {
        if (typeof window === 'undefined') return {
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
            theme: 'dark'
        };
        
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
            theme: 'dark'
        };
    });

    // Persist state changes
    useEffect(() => {
        localStorage.setItem('nexus_os_state', JSON.stringify(state));
        // Apply theme to document body
        if (state.theme === 'light') {
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
        }
    }, [state]);

    // --- ACTIONS ---
    const updateProgress = (key: keyof NexusState, value: NexusState[keyof NexusState]) => {
        setState(prev => ({ ...prev, [key]: value }));
    };

    const markToolComplete = (toolId: string) => {
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

    const setIndustry = (val: string) => updateProgress('industry', val);
    const setMethodology = (val: string) => updateProgress('methodology', val);

    const value: NexusContextType = {
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
