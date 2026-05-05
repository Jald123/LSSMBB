'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AppAesthetic = 'slate' | 'obsidian' | 'ocean' | 'carbon' | 'light' | 'ether' | 'aurora' | 'zenith';

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
    appAesthetic: AppAesthetic;
    quickTools: string[];
}

interface NexusContextType extends NexusState {
    updateProgress: (key: keyof NexusState, value: NexusState[keyof NexusState]) => void;
    markToolComplete: (toolId: string) => void;
    resetMethodologyTools: (toolIds: string[]) => void;
    toggleSidebar: () => void;
    toggleRightPanel: () => void;
    toggleTheme: () => void;
    setAppAesthetic: (style: AppAesthetic) => void;
    addQuickTool: (toolId: string) => void;
    removeQuickTool: (toolId: string) => void;
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
        const defaultState: NexusState = {
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
            theme: 'dark',
            appAesthetic: 'slate',
            quickTools: ['charter', 'sipoc', 'triage']
        };

        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('nexus_os_state');
            return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
        }
        return defaultState;
    });

    const [isMounted, setIsMounted] = useState(false);

    // Initial load from LocalStorage
    useEffect(() => {
        setIsMounted(true);
        const saved = localStorage.getItem('nexus_os_state');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setState(prev => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error("Failed to parse nexus_os_state", e);
            }
        }
    }, []);

    // Persist state changes
    useEffect(() => {
        if (!isMounted) return;
        localStorage.setItem('nexus_os_state', JSON.stringify(state));
        // Apply theme to document body
        if (state.theme === 'light') {
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
        }
    }, [state, isMounted]);

    // --- ACTIONS ---
    const updateProgress = (key: keyof NexusState, value: NexusState[keyof NexusState]) => {
        setState(prev => ({ ...prev, [key]: value }));
    };

    const markToolComplete = (toolId: string) => {
        setState(prev => {
            if (prev.completedTools.includes(toolId)) {
                return {
                    ...prev,
                    completedTools: prev.completedTools.filter(id => id !== toolId),
                    xp: Math.max(0, prev.xp - 50)
                };
            } else {
                return {
                    ...prev,
                    completedTools: [...prev.completedTools, toolId],
                    xp: prev.xp + 50
                };
            }
        });
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

    const setAppAesthetic = (val: AppAesthetic) => {
        setState(prev => ({ ...prev, appAesthetic: val }));
    };

    const addQuickTool = (toolId: string) => {
        setState(prev => {
            if (prev.quickTools.includes(toolId)) return prev;
            return { ...prev, quickTools: [...prev.quickTools, toolId] };
        });
    };

    const removeQuickTool = (toolId: string) => {
        setState(prev => ({
            ...prev,
            quickTools: prev.quickTools.filter(id => id !== toolId)
        }));
    };

    const completeOnboarding = () => {
        setState(prev => ({ ...prev, hasSeenOnboarding: true }));
    };

    const setIndustry = (val: string) => updateProgress('industry', val);
    const setMethodology = (val: string) => updateProgress('methodology', val);

    const resetMethodologyTools = (toolIds: string[]) => {
        setState(prev => {
            const removedCount = prev.completedTools.filter(id => toolIds.includes(id)).length;
            return {
                ...prev,
                completedTools: prev.completedTools.filter(id => !toolIds.includes(id)),
                xp: Math.max(0, prev.xp - (removedCount * 50))
            };
        });
    };

    const value: NexusContextType = {
        ...state,
        updateProgress,
        markToolComplete,
        resetMethodologyTools,
        toggleSidebar,
        toggleRightPanel,
        toggleTheme,
        setAppAesthetic,
        addQuickTool,
        removeQuickTool,
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
