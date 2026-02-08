import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

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
import SigmaLab from './pages/SigmaLab';
import DockingGame from './pages/DockingGame';
import ScopeSniper from './pages/ScopeSniper';
import CompletionCeremony from './pages/CompletionCeremony';

const NexusOS_Layout = () => {
  const [context, setContext] = useState('healthcare');
  const [method, setMethod] = useState('DMAIC');
  const { isSidebarCollapsed, toggleSidebar, isRightPanelOpen } = useNexus();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer
  const location = useLocation();

  // Determine if we are in a Workspace route
  const isWorkspace = location.pathname.startsWith('/workspace');

  return (
    <div className="nexus-os-shell min-h-screen bg-nexus-navy text-white selection:bg-nexus-cyan selection:text-nexus-navy overflow-hidden flex flex-col">
      {/* 🌌 Atmospheric Layers */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-nexus-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-nexus-purple/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <OnboardingTour />

      {/* 🔝 HEADER */}
      <Header
        onMenuClick={() => setIsSidebarOpen(true)}
        context={context}
        setContext={setContext}
        method={method}
        setMethod={setMethod}
      />

      <div className="flex flex-1 pt-16 h-full">
        {/* ⬅️ LEFT SIDEBAR */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={toggleSidebar}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* 🚀 CONTENT REGION */}
        <main
          className={`
            flex-1 relative z-10 w-full h-full transition-all duration-300
            ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-60'}
            ${(!isWorkspace && isRightPanelOpen) ? 'xl:pr-[320px]' : ''} 
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
      <Footer />
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
              <Route path="sigma-lab" element={<SigmaLab />} />
              <Route path="docking-game" element={<DockingGame />} />
              <Route path="scope-sniper" element={<ScopeSniper />} />
            </Route>
            <Route path="certification" element={<CompletionCeremony />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NexusProvider>
  );
}

export default App;
