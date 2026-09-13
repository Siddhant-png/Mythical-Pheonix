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
import { StartupProfile } from './views/StartupProfile';
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

import {
  Problem,
  Collaboration,
  Pilot,
  Procurement,
  ScaleAdoption,
  UserRole,
  AuthUser
} from './types';

import { CheckCircle2 } from 'lucide-react';

type ProfileMode = 'my' | 'public';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('problems');

  const [userRole, setUserRole] = useState<UserRole>('startup');
  const [startupProfiles, setStartupProfiles] = useState(STARTUP_PROFILES);
  const [selectedProfileId, setSelectedProfileId] = useState<string>(DEFAULT_STARTUP_PROFILE.id);
  const [myProfileId, setMyProfileId] = useState<string>(DEFAULT_STARTUP_PROFILE.id);
  const [profileMode, setProfileMode] = useState<ProfileMode>('public');

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

  // Startup profile state
  const [selectedStartupId, setSelectedStartupId] = useState<string | null>(
    null
  );

  // Core Application State
  const [problems, setProblems] = useState<Problem[]>(INITIAL_PROBLEMS);

  const [collaborations, setCollaborations] = useState<Collaboration[]>(
    INITIAL_COLLABORATIONS
  );

  const [pilots, setPilots] = useState<Pilot[]>(INITIAL_PILOTS);

  const [procurements, setProcurements] = useState<Procurement[]>(
    INITIAL_PROCUREMENTS
  );

  const [scaleAdoptions, setScaleAdoptions] = useState<ScaleAdoption[]>(
    INITIAL_SCALE_ADOPTIONS
  );

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setUserRole(user.role);

    showToast(`Welcome ${user.name}! Verified as ${user.verificationBadge}`);
  };

  // Collaboration handler
  const handleAddNewCollaboration = (newCollab: Collaboration) => {
    setCollaborations(previousCollaborations => [
      newCollab,
      ...previousCollaborations
    ]);

    showToast(
      `Consortium formed with ${newCollab.manufacturerName}! Mutual NDA executed.`
    );
  };

  // Problem creation handler
  const handleProblemCreated = (newProblem: Problem) => {
    setProblems(previousProblems => [newProblem, ...previousProblems]);

    showToast(
      `Challenge "${newProblem.title.slice(0, 30)}..." published!`
    );
  };

  // Application submission handler
  const handleSubmitApplication = (
    problemId: string,
    isCollab: boolean,
    bidAmount: number,
    summary: string
  ) => {
    const targetProblem = problems.find(problem => problem.id === problemId);

    if (!targetProblem) {
      return;
    }

    const newPilot: Pilot = {
      id: `pilot-${Date.now()}`,
      applicationId: `app-${Date.now()}`,
      problemTitle: targetProblem.title,

      applicantName: isCollab
        ? `${CURRENT_STARTUP.companyName} + Sahyadri Electronics (Consortium)`
        : `${CURRENT_STARTUP.companyName} (Solo)`,

      isCollab,

      sandboxEnvironment: `${targetProblem.deptName} - Testbed Sector Alpha`,

      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-10-30',

      aggregateScore: isCollab ? 91 : 85,

      status: 'RUNNING',

      evaluatorRemarks: isCollab
        ? 'Consortium application backed by verified manufacturer GST turnover and valid DPIIT certificate.'
        : 'Solo startup application under DPIIT relaxation framework.',

      scorecards: targetProblem.kpiBenchmarks.map(kpi => ({
        metric: kpi.metric,
        target: kpi.minTarget,
        achieved: 'In Progress (Active Sandbox)',
        score: isCollab ? 92 : 86,
        passed: true
      }))
    };

    setPilots(previousPilots => [newPilot, ...previousPilots]);

    showToast(
      isCollab
        ? 'Joint Consortium Application Submitted!'
        : 'Solo Application Submitted!'
    );
  };

  // Purchase order handler
  const handleGeneratePO = (pilotId: string, poValue: number) => {
    const targetPilot = pilots.find(pilot => pilot.id === pilotId);

    if (!targetPilot) {
      return;
    }

    const newPO: Procurement = {
      id: `proc-${Date.now()}`,
      pilotId,
      problemTitle: targetPilot.problemTitle,
      vendorName: targetPilot.applicantName,

      poNumber: `MAHA-GOV-PO-2026-${Math.floor(
        1000 + Math.random() * 9000
      )}`,

      finalPoValue: poValue,

      gfrRuleReference:
        'GFR-2017 Rule 149 / Maharashtra Startup Policy Sec 4.2',

      deliveryTimelineWeeks: 6,

      issuedAt: new Date().toISOString().split('T')[0],

      adoptionsCount: 0
    };

    setProcurements(previousProcurements => [
      newPO,
      ...previousProcurements
    ]);

    showToast(
      `Purchase Order ${newPO.poNumber} issued to ${targetPilot.applicantName}!`
    );
  };

  // Scale adoption handler
  const handleAdoptSolution = (newAdoption: ScaleAdoption) => {
    setScaleAdoptions(previousAdoptions => [
      newAdoption,
      ...previousAdoptions
    ]);

    showToast(
      `Solution replicated for ${newAdoption.adoptingDeptName}!`
    );
  };

  // Open startup profile
  const handleOpenStartupProfile = (startupId: string) => {
    setSelectedStartupId(startupId);
  };

  // Close startup profile
  const handleCloseStartupProfile = () => {
    setSelectedStartupId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text font-body">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={tab => {
          setActiveTab(tab);

          // Close startup profile when changing main navigation
          setSelectedStartupId(null);
        }}
        userRole={userRole}
        setUserRole={setUserRole}
        activeCollabCount={collaborations.length}
        currentUser={currentUser}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onOpenMyProfile={handleOpenMyProfile}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs text-white shadow-2xl animate-bounce">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />

          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Startup Profile Page */}
        {activeTab === 'discovery' && selectedStartupId ? (
          <StartupProfile
            startupId={selectedStartupId}
            onBack={handleCloseStartupProfile}
          />
        ) : null}

        {/* Problem Dashboard */}
        {activeTab === 'problems' && (
          <ProblemDashboard
            problems={problems}
            collaborations={collaborations}
            currentStartup={CURRENT_STARTUP}
            onOpenCollabHub={() => {
              setActiveTab('collab');
            }}
            onSubmitApplication={handleSubmitApplication}
          />
        )}

        {/* Civic Feed */}
        {activeTab === 'feed' && (
          <CivicShortsFeed
            userRole={userRole}
            currentUserName={currentUser?.name || 'Anonymous Citizen'}
            onNavigateToTenders={() => setActiveTab('problems')}
          />
        )}

        {/* Startup Discovery */}
        {activeTab === 'discovery' && !selectedStartupId && (
          <StartupDiscoveryHub
            currentStartup={CURRENT_STARTUP}
            problems={problems}
            userRole={userRole}
            onOpenStartupProfile={handleOpenStartupProfile}
          />
        )}

        {/* Manufacturer Collaboration */}
        {activeTab === 'collab' && (
          <ManufacturerCollabHub
            manufacturers={MANUFACTURERS}
            problems={problems}
            startup={CURRENT_STARTUP}
            collaborations={collaborations}
            onAddNewCollaboration={handleAddNewCollaboration}
          />
        )}

        {/* Department Problem Upload */}
        {activeTab === 'dept-upload' && (
          <DepartmentPostProblem
            onProblemCreated={handleProblemCreated}
            onNavigateToDirectory={() => setActiveTab('problems')}
          />
        )}

        {/* Sandbox Pilots */}
        {activeTab === 'pilots' && (
          <SandboxPilotScorecard
            pilots={pilots}
            procurements={procurements}
            onGeneratePO={handleGeneratePO}
            userRole={userRole}
          />
        )}

        {/* Scale Registry */}
        {activeTab === 'scale' && (
          <ScaleRegistry
            procurements={procurements}
            scaleAdoptions={scaleAdoptions}
            onAdoptSolution={handleAdoptSolution}
            userRole={userRole}
          />
        )}

        {/* Standard Templates */}
        {activeTab === 'templates' && (
          <StandardTemplatesVault userRole={userRole} />
        )}
      </main>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialRole={userRole}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-8 text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 font-bold text-amber-400">
              MS
            </div>

            <div>
              <div className="text-sm font-bold text-white">
                MahaSetu (महासेतू) Public Procurement Architecture
              </div>

              <p className="text-[11px] text-slate-500">
                Accelerated Innovation Procurement Mechanism | Government of
                Maharashtra
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] md:gap-6">
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


