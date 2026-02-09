import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Context & State
import { NexusProvider, useNexus } from './context/NexusContext';

// Layout & Navigation
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import RouteTransitionOutlet from './components/RouteTransitionOutlet';
import OnboardingTour from './components/OnboardingTour';

// Pages
import HangarHome from './pages/HangarHome';
import JourneyEngine from './pages/JourneyEngine';
import PhaseOrbitView from './pages/PhaseOrbitView';
import ToolWorkspace from './pages/ToolWorkspace';
import AnalystArmory from './pages/AnalystArmory';
import ArmoryHub from './pages/ArmoryHub';
import SigmaLab from './pages/SigmaLab';
import DockingGame from './pages/DockingGame';
import ScopeSniper from './pages/ScopeSniper';
import CompletionCeremony from './pages/CompletionCeremony';
import Settings from './pages/Settings';

const NexusOS_Layout = () => {
  const { isSidebarCollapsed, toggleSidebar, isRightPanelOpen } = useNexus();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer
  const location = useLocation();

  // Determine if we are in a Workspace route
  const isWorkspace = location.pathname.startsWith('/workspace');

  return (
    <div className="nexus-os-shell min-h-screen bg-nexus-navy text-nexus-text-primary selection:bg-nexus-cyan selection:text-nexus-text-primary overflow-hidden flex flex-col">
      {/* 🌌 Atmospheric Layers */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-nexus-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-nexus-purple/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <OnboardingTour />

      {/* 🔝 HEADER */}
      {!isWorkspace && <Header onMenuClick={() => setIsSidebarOpen(true)} />}

      <div className={`flex flex-1 h-full ${!isWorkspace ? 'pt-16' : ''}`}>
        {/* ⬅️ LEFT SIDEBAR */}
        {!isWorkspace && (
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={toggleSidebar}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
        )}

        {/* 🚀 CONTENT REGION */}
        <main
          className={`
            flex-1 relative z-10 w-full h-full transition-all duration-300
            ${!isWorkspace ? (isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-60') : ''}
          `}
        >
          <div className="h-full overflow-y-auto">
            <RouteTransitionOutlet />
          </div>
        </main>

        {/* ➡️ RIGHT CONTEXT PANEL */}
        {!isWorkspace && isRightPanelOpen && <RightPanel />}
      </div>

      {/* 🏷️ FOOTER */}
      {!isWorkspace && <Footer />}
    </div>
  );
};

function App() {
  return (
    <NexusProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NexusOS_Layout />}>
            <Route index element={<HangarHome />} />
            <Route path="journey" element={<JourneyEngine />}>
              <Route path=":phaseId" element={<PhaseOrbitView />} />
            </Route>
            <Route path="workspace/:toolId" element={<ToolWorkspace />} />
            <Route path="armory" element={<AnalystArmory />}>
              <Route index element={<ArmoryHub />} />
              <Route path="sigma-lab" element={<SigmaLab />} />
              <Route path="docking-game" element={<DockingGame />} />
              <Route path="scope-sniper" element={<ScopeSniper />} />
            </Route>
            <Route path="certification" element={<CompletionCeremony />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NexusProvider>
  );
}

export default App;
