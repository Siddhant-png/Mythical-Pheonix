import React, { useState } from 'react';
import { Header, NavTab } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { ProblemDashboard } from './views/ProblemDashboard';
import { ManufacturerCollabHub } from './views/ManufacturerCollabHub';
import { DepartmentPostProblem } from './views/DepartmentPostProblem';
import { SandboxPilotScorecard } from './views/SandboxPilotScorecard';
import { ScaleRegistry } from './views/ScaleRegistry';
import { StandardTemplatesVault } from './views/StandardTemplatesVault';
import { StartupDiscoveryHub } from './views/StartupDiscoveryHub';
import { CivicShortsFeed } from './views/CivicShortsFeed';
import { 
  INITIAL_PROBLEMS, 
  MANUFACTURERS, 
  CURRENT_STARTUP, 
  INITIAL_COLLABORATIONS,
  INITIAL_PILOTS,
  INITIAL_PROCUREMENTS,
  INITIAL_SCALE_ADOPTIONS 
} from './data/mockData';
import { Problem, Collaboration, Pilot, Procurement, ScaleAdoption, UserRole, AuthUser } from './types';
import { ShieldCheck, CheckCircle2, Award, Heart } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('problems');
  const [userRole, setUserRole] = useState<UserRole>('startup');

  // Authentication State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: 'user-default',
    name: 'Aarav Deshmukh',
    email: 'aarav@drishtiedge.in',
    role: 'startup',
    isVerified: true,
    verificationBadge: 'DPIIT Certified Startup (DIPP-MH-98442)',
    dpiitNo: 'DIPP-MH-2023-98442'
  });

  // Core Application State
  const [problems, setProblems] = useState<Problem[]>(INITIAL_PROBLEMS);
  const [collaborations, setCollaborations] = useState<Collaboration[]>(INITIAL_COLLABORATIONS);
  const [pilots, setPilots] = useState<Pilot[]>(INITIAL_PILOTS);
  const [procurements, setProcurements] = useState<Procurement[]>(INITIAL_PROCUREMENTS);
  const [scaleAdoptions, setScaleAdoptions] = useState<ScaleAdoption[]>(INITIAL_SCALE_ADOPTIONS);
  
  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setUserRole(user.role);
    showToast(`Welcome ${user.name}! Verified as ${user.verificationBadge}`);
  };

  // Handlers
  const handleAddNewCollaboration = (newCollab: Collaboration) => {
    setCollaborations([newCollab, ...collaborations]);
    showToast(`Consortium formed with ${newCollab.manufacturerName}! Mutual NDA executed.`);
  };

  const handleProblemCreated = (newProblem: Problem) => {
    setProblems([newProblem, ...problems]);
    showToast(`Challenge "${newProblem.title.slice(0, 30)}..." published!`);
  };

  const handleSubmitApplication = (
    problemId: string, 
    isCollab: boolean, 
    bidAmount: number, 
    summary: string
  ) => {
    const targetProb = problems.find(p => p.id === problemId);
    if (!targetProb) return;

    // Create a new pilot entry for this application
    const newPilot: Pilot = {
      id: `pilot-${Date.now()}`,
      applicationId: `app-${Date.now()}`,
      problemTitle: targetProb.title,
      applicantName: isCollab 
        ? `${CURRENT_STARTUP.companyName} + Sahyadri Electronics (Consortium)`
        : `${CURRENT_STARTUP.companyName} (Solo)`,
      isCollab,
      sandboxEnvironment: `${targetProb.deptName} - Testbed Sector Alpha`,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-10-30',
      aggregateScore: isCollab ? 91 : 85,
      status: 'RUNNING',
      evaluatorRemarks: isCollab 
        ? 'Consortium application backed by verified manufacturer GST turnover and valid DPIIT certificate.'
        : 'Solo startup application under DPIIT relaxation framework.',
      scorecards: targetProb.kpiBenchmarks.map(k => ({
        metric: k.metric,
        target: k.minTarget,
        achieved: 'In Progress (Active Sandbox)',
        score: isCollab ? 92 : 86,
        passed: true
      }))
    };

    setPilots([newPilot, ...pilots]);
    showToast(isCollab ? 'Joint Consortium Application Submitted!' : 'Solo Application Submitted!');
  };

  const handleGeneratePO = (pilotId: string, poValue: number) => {
    const targetPilot = pilots.find(p => p.id === pilotId);
    if (!targetPilot) return;

    const newPO: Procurement = {
      id: `proc-${Date.now()}`,
      pilotId: pilotId,
      problemTitle: targetPilot.problemTitle,
      vendorName: targetPilot.applicantName,
      poNumber: `MAHA-GOV-PO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      finalPoValue: poValue,
      gfrRuleReference: 'GFR-2017 Rule 149 / Maharashtra Startup Policy Sec 4.2',
      deliveryTimelineWeeks: 6,
      issuedAt: new Date().toISOString().split('T')[0],
      adoptionsCount: 0
    };

    setProcurements([newPO, ...procurements]);
    showToast(`Purchase Order ${newPO.poNumber} issued to ${targetPilot.applicantName}!`);
  };

  const handleAdoptSolution = (newAdoption: ScaleAdoption) => {
    setScaleAdoptions([newAdoption, ...scaleAdoptions]);
    showToast(`Solution replicated for ${newAdoption.adoptingDeptName}!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Inter',sans-serif]">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        activeCollabCount={collaborations.length}
        currentUser={currentUser}
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 text-xs animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'problems' && (
          <ProblemDashboard
            problems={problems}
            collaborations={collaborations}
            currentStartup={CURRENT_STARTUP}
            onOpenCollabHub={(problem) => {
              setActiveTab('collab');
            }}
            onSubmitApplication={handleSubmitApplication}
          />
        )}

        {activeTab === 'feed' && (
          <CivicShortsFeed
            userRole={userRole}
            currentUserName={currentUser?.name || 'Anonymous Citizen'}
            onNavigateToTenders={() => setActiveTab('problems')}
          />
        )}

        {activeTab === 'discovery' && (
          <StartupDiscoveryHub
            currentStartup={CURRENT_STARTUP}
            problems={problems}
            userRole={userRole}
          />
        )}

        {activeTab === 'collab' && (
          <ManufacturerCollabHub
            manufacturers={MANUFACTURERS}
            problems={problems}
            startup={CURRENT_STARTUP}
            collaborations={collaborations}
            onAddNewCollaboration={handleAddNewCollaboration}
          />
        )}

        {activeTab === 'dept-upload' && (
          <DepartmentPostProblem
            onProblemCreated={handleProblemCreated}
            onNavigateToDirectory={() => setActiveTab('problems')}
          />
        )}

        {activeTab === 'pilots' && (
          <SandboxPilotScorecard
            pilots={pilots}
            procurements={procurements}
            onGeneratePO={handleGeneratePO}
            userRole={userRole}
          />
        )}

        {activeTab === 'scale' && (
          <ScaleRegistry
            procurements={procurements}
            scaleAdoptions={scaleAdoptions}
            onAdoptSolution={handleAdoptSolution}
            userRole={userRole}
          />
        )}

        {activeTab === 'templates' && (
          <StandardTemplatesVault
            userRole={userRole}
          />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialRole={userRole}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 font-bold border border-slate-700">
              MS
            </div>
            <div>
              <div className="text-white font-bold text-sm">
                MahaSetu (महासेतू) Public Procurement Architecture
              </div>
              <p className="text-slate-500 text-[11px]">
                Built for Smart India Hackathon | Problem Code: SIH-136 (Government of Maharashtra)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <span>DPIIT Startup India Aligned</span>
            <span>•</span>
            <span>GFR 2017 Rule 149 / 173</span>
            <span>•</span>
            <span>Consortium M-NDA Framework</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;


