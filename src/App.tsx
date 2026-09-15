import React, { useState, useEffect } from 'react';

import { Header, NavTab } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { LeftNavSidebar } from './components/LeftNavSidebar';
import { RightNavSidebar } from './components/RightNavSidebar';

import { ProblemDashboard } from './views/ProblemDashboard';
import { ManufacturerCollabHub } from './views/ManufacturerCollabHub';
import { DepartmentPostProblem } from './views/DepartmentPostProblem';
import { SandboxPilotScorecard } from './views/SandboxPilotScorecard';
import { ScaleRegistry } from './views/ScaleRegistry';
import { TierRegistry } from './views/TierRegistry';
import { ProcurementDashboard } from './views/ProcurementDashboard';
import { StandardTemplatesVault } from './views/StandardTemplatesVault';
import { StartupDiscoveryHub } from './views/StartupDiscoveryHub';
import { StartupProfile } from './views/StartupProfile';
import { CivicShortsFeed } from './views/CivicShortsFeed';
import { Messages } from './views/Messages';
import { SelfAccountProfile } from './views/SelfAccountProfile';
import { Settings } from './views/Settings';

import {
  fetchUserInterestsFromApi,
  saveUserInterestsToApi,
  fetchProblemsFromApi
} from './services/api';
import { ProcurementDraft } from './components/procurement/ProcurementCreationForm';

import {
  INITIAL_PROBLEMS,
  MANUFACTURERS,
  CURRENT_STARTUP,
  INITIAL_COLLABORATIONS,
  INITIAL_PILOTS,
  INITIAL_APPLICATIONS,
  INITIAL_PROCUREMENTS,
  INITIAL_SCALE_ADOPTIONS,
  INITIAL_ALLIANCE_PROPOSALS
} from './data/mockData';

import {
  STARTUP_PROFILES,
  DEFAULT_STARTUP_PROFILE
} from './data/startupProfiles';

import {
  Problem,
  Collaboration,
  Pilot,
  Procurement,
  ScaleAdoption,
  Application,
  ProcurementStatus,
  AllianceProposal,
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

  // Global Filter State for Problems
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [maxBudget, setMaxBudget] = useState(10000000);
  const [collabOnly, setCollabOnly] = useState(false);

  // User Selected Domain Interests State
  const [selectedInterestIds, setSelectedInterestIds] = useState<string[]>([
    'ai-vision',
    'agri-drones',
    'medtech',
    'clean-water'
  ]);

  // Load backend data on mount
  useEffect(() => {
    async function initBackendData() {
      const interests = await fetchUserInterestsFromApi();
      setSelectedInterestIds(interests);

      const loadedProblems = await fetchProblemsFromApi();
      if (loadedProblems.length > 0) {
        setProblems(loadedProblems);
      }
    }
    initBackendData();
  }, []);

  const handleToggleInterest = (id: string) => {
    setSelectedInterestIds(prev => {
      const isSelected = prev.includes(id);
      const next = isSelected ? prev.filter(item => item !== id) : [...prev, id];
      saveUserInterestsToApi(next);
      showToast(
        isSelected
          ? 'Interest removed from Left Navigation Bar.'
          : 'Interest added to Left Navigation Bar!'
      );
      return next;
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSector('');
    setSelectedStatus('');
    setMaxBudget(10000000);
    setCollabOnly(false);
  };

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

  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);

  const [procurements, setProcurements] = useState<Procurement[]>(
    INITIAL_PROCUREMENTS
  );

  const [scaleAdoptions, setScaleAdoptions] = useState<ScaleAdoption[]>(
    INITIAL_SCALE_ADOPTIONS
  );

  const [proposals, setProposals] = useState<AllianceProposal[]>(INITIAL_ALLIANCE_PROPOSALS);

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

  const handleAcceptProposal = (proposalId: string) => {
    setProposals(previous => previous.map(proposal => proposal.id === proposalId
      ? { ...proposal, status: 'ACCEPTED', respondedAt: new Date().toISOString() }
      : proposal));
    showToast('Teaming proposal accepted. You can now execute the mutual NDA.');
  };

  const handleDeclineProposal = (proposalId: string) => {
    setProposals(previous => previous.map(proposal => proposal.id === proposalId
      ? { ...proposal, status: 'DECLINED', respondedAt: new Date().toISOString() }
      : proposal));
    showToast('Teaming proposal declined.');
  };

  const handleSendProposal = (proposal: AllianceProposal) => {
    setProposals(previous => [proposal, ...previous]);
    showToast(`Consortium proposal sent to ${proposal.recipientName}.`);
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

    const applicationId = `app-${Date.now()}`;
    const pilotId = `pilot-${Date.now()}`;
    const newApplication: Application = {
      id: applicationId,
      problemId,
      type: isCollab ? 'COLLABORATION' : 'SOLO',
      startupId: CURRENT_STARTUP.id,
      applicantName: isCollab
        ? `${CURRENT_STARTUP.companyName} + Sahyadri Electronics`
        : CURRENT_STARTUP.companyName,
      proposalSummary: summary,
      bidAmount,
      status: 'PILOT_APPROVED',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    const newPilot: Pilot = {
      id: pilotId,
      applicationId,
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
    setApplications(previousApplications => [newApplication, ...previousApplications]);

    showToast(
      isCollab
        ? 'Joint Consortium Application Submitted!'
        : 'Solo Application Submitted!'
    );
  };

  // Purchase order handler
  const handleGeneratePO = (pilotId: string, poValue: number) => {
    const targetPilot = pilots.find(pilot => pilot.id === pilotId);

    if (!targetPilot || targetPilot.status !== 'PASSED' || targetPilot.aggregateScore < 80) {
      showToast('Procurement is blocked until pilot validation is PASSED with a score of 80 or higher.');
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

      adoptionsCount: 0,
      status: 'PENDING_DELIVERY'
    };

    setProcurements(previousProcurements => [
      newPO,
      ...previousProcurements
    ]);

    showToast(
      `Purchase Order ${newPO.poNumber} issued to ${targetPilot.applicantName}!`
    );
  };

  const handleCreateProcurement = (draft: ProcurementDraft) => {
    const targetPilot = pilots.find(pilot => pilot.id === draft.pilotId);
    if (!targetPilot || targetPilot.status !== 'PASSED' || targetPilot.aggregateScore < 80 || procurements.some(procurement => procurement.pilotId === draft.pilotId)) {
      showToast('This solution is not eligible for a new procurement order.');
      return;
    }

    const newProcurement: Procurement = {
      id: `proc-${Date.now()}`,
      ...draft,
      status: 'PENDING_DELIVERY'
    };
    setProcurements(previousProcurements => [newProcurement, ...previousProcurements]);
    showToast(`Procurement order ${newProcurement.poNumber} created successfully.`);
  };

  const handleUpdateProcurementStatus = (procurementId: string, status: ProcurementStatus) => {
    setProcurements(previousProcurements => previousProcurements.map(procurement => procurement.id === procurementId ? { ...procurement, status } : procurement));
    showToast(`Procurement status updated to ${status.replace('_', ' ').toLowerCase()}.`);
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

  // Open my startup profile
  const handleOpenMyProfile = () => {
    setSelectedStartupId(null);
    setActiveTab('account');
  };

  const handleOpenSettings = () => {
    setSelectedStartupId(null);
    setActiveTab('settings');
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
        onOpenSettings={handleOpenSettings}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs text-white shadow-2xl animate-bounce">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />

          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area: Reddit-Style 3-Column Layout */}
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-3 py-6 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Navigation Bar (Thin Sidebar - Exploring Feeds & Filters) */}
          <div className="hidden lg:block lg:col-span-2 xl:col-span-2">
            <LeftNavSidebar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setSelectedStartupId(null);
              }}
              onOpenStartupProfile={handleOpenStartupProfile}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedSector={selectedSector}
              setSelectedSector={setSelectedSector}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              maxBudget={maxBudget}
              setMaxBudget={setMaxBudget}
              collabOnly={collabOnly}
              setCollabOnly={setCollabOnly}
              onResetFilters={handleResetFilters}
              selectedInterestIds={selectedInterestIds}
            />
          </div>

          {/* Center Column (Content Exploration & Problems) */}
          <div className={`${['procurement', 'account', 'tiers', 'settings'].includes(activeTab) ? 'lg:col-span-10 xl:col-span-10' : 'lg:col-span-8 xl:col-span-8'} min-w-0 space-y-6`}>
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
                searchQuery={searchQuery}
                selectedSector={selectedSector}
                selectedStatus={selectedStatus}
                maxBudget={maxBudget}
                collabOnly={collabOnly}
                onResetFilters={handleResetFilters}
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

            {/* Startup Profiles & Discovery Hub */}
            {(activeTab === 'discovery' || activeTab === 'profiles') && (
              selectedStartupId ? (
                <StartupProfile
                  startupId={selectedStartupId}
                  onBack={handleCloseStartupProfile}
                />
              ) : (
                <StartupDiscoveryHub
                  currentStartup={CURRENT_STARTUP}
                  problems={problems}
                  userRole={userRole}
                  onOpenStartupProfile={handleOpenStartupProfile}
                />
              )
            )}

            {/* Manufacturer Collaboration */}
            {activeTab === 'collab' && (
              <ManufacturerCollabHub
                manufacturers={MANUFACTURERS}
                problems={problems}
                startup={CURRENT_STARTUP}
                collaborations={collaborations}
                onAddNewCollaboration={handleAddNewCollaboration}
                proposals={proposals}
                onAcceptProposal={handleAcceptProposal}
                onDeclineProposal={handleDeclineProposal}
                onSendProposal={handleSendProposal}
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
            {/* Messages */}
            {activeTab === 'messages' && <Messages />}

            {/* Tiers */}
            {activeTab === 'tiers' && (
              <TierRegistry
                applications={applications}
                pilots={pilots}
                procurements={procurements}
                scaleAdoptions={scaleAdoptions}
              />
            )}

            {activeTab === 'procurement' && (
              <ProcurementDashboard
                problems={problems}
                applications={applications}
                pilots={pilots}
                procurements={procurements}
                scaleAdoptions={scaleAdoptions}
                userRole={userRole}
                onCreateProcurement={handleCreateProcurement}
                onUpdateProcurementStatus={handleUpdateProcurementStatus}
              />
            )}

            {/* Standard Templates */}
            {activeTab === 'templates' && (
              <StandardTemplatesVault userRole={userRole} />
            )}

            {/* Self Account & Detailed Profile Page */}
            {activeTab === 'account' && (
              <SelfAccountProfile
                currentUser={currentUser}
                currentStartup={CURRENT_STARTUP}
                problems={problems}
                collaborations={collaborations}
                pilots={pilots}
                procurements={procurements}
                userRole={userRole}
                setUserRole={setUserRole}
                onNavigate={(tab) => {
                  setActiveTab(tab);
                  setSelectedStartupId(null);
                }}
                selectedInterestIds={selectedInterestIds}
                onToggleInterest={handleToggleInterest}
              />
            )}
            {activeTab === 'settings' && currentUser && (
              <Settings
                currentUser={currentUser}
                onResetPassword={() => {
                  setAuthModalOpen(true);
                }}
                onShowToast={showToast}
                onLogout={() => {
                  setCurrentUser(null);
                  setSelectedStartupId(null);
                  setActiveTab('problems');
                  showToast('You have been logged out securely.');
                }}
              />
            )}
          </div>

          {/* Right Navigation Bar (Thin Sidebar - Actions & Alliances) */}
          {!['procurement', 'account', 'tiers', 'settings'].includes(activeTab) && (
            <div className="hidden lg:block lg:col-span-2 xl:col-span-2">
              <RightNavSidebar
                activeTab={activeTab}
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setSelectedStartupId(null);
                }}
                activeCollabCount={collaborations.length}
              />
            </div>
          )}
        </div>
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
            <div className="w-9 h-9 shrink-0 flex items-center justify-center">
              <img src="/logo-transparent.png" alt="Converge Logo" className="w-full h-full object-contain filter drop-shadow-md brightness-120" />
            </div>

            <div>
              <div className="text-sm font-black text-white bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                Converge (कन्व्हर्ज) Public Procurement Architecture
              </div>

              <p className="text-[11px] text-slate-400">
                Accelerated Innovation Procurement Mechanism | Government of Maharashtra
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
