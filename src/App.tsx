import React, { useState, useEffect } from 'react';

import { Header, NavTab } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { LeftNavSidebar } from './components/LeftNavSidebar';
import { RightNavSidebar } from './components/RightNavSidebar';

import { ProblemDashboard } from './views/ProblemDashboard';
import { DepartmentPostProblem } from './views/DepartmentPostProblem';
import { StartupDiscoveryHub } from './views/StartupDiscoveryHub';
import { StartupProfile } from './views/StartupProfile';
import { CivicShortsFeed } from './views/CivicShortsFeed';
import { SelfAccountProfile } from './views/SelfAccountProfile';
import { CategoryExplorer } from './views/CategoryExplorer';

import {
  fetchProblemsFromApi
} from './services/api';

import {
  INITIAL_PROBLEMS,
  CURRENT_STARTUP,
  INITIAL_COLLABORATIONS,
  INITIAL_PILOTS,
  INITIAL_APPLICATIONS,
  INITIAL_PROCUREMENTS
} from './data/mockData';

import {
  Problem,
  Collaboration,
  Pilot,
  Procurement,
  Application,
  UserRole,
  AuthUser,
  SolutionOutcome,
  SolutionProposal
} from './types';

import { CheckCircle2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('problems');

  const [userRole, setUserRole] = useState<UserRole>('startup');

  // Global Filter State for Problems
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [maxBudget, setMaxBudget] = useState(10000000);
  const [collabOnly, setCollabOnly] = useState(false);

  // Load backend data on mount
  useEffect(() => {
    async function initBackendData() {
      const loadedProblems = await fetchProblemsFromApi();
      if (loadedProblems.length > 0) {
        setProblems(loadedProblems);
      }
    }
    initBackendData();
  }, []);

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
  const [outcomes, setOutcomes] = useState<SolutionOutcome[]>([]);
  const [proposals, setProposals] = useState<SolutionProposal[]>([]);

  const [procurements, setProcurements] = useState<Procurement[]>(
    INITIAL_PROCUREMENTS
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

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthModalOpen(true);
    showToast('You have been logged out.');
  };

  // Problem creation handler
  const handleProblemCreated = (newProblem: Problem) => {
    setProblems(previousProblems => [newProblem, ...previousProblems]);

    showToast(
      `Challenge "${newProblem.title.slice(0, 30)}..." published!`
    );
  };

  const handleSubmitOutcome = (outcome: SolutionOutcome) => {
    setOutcomes(previousOutcomes => [outcome, ...previousOutcomes]);
    showToast('Outcome posted to Solution Outcomes.');
  };

  const handleSubmitProposal = (proposal: SolutionProposal) => {
    setProposals(previousProposals => [proposal, ...previousProposals]);
    showToast('Proposal submitted for government review.');
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

  // Open startup profile
  const handleOpenStartupProfile = (startupId: string) => {
    setSelectedStartupId(startupId);
    setActiveTab('profiles');
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

  // Category Selection Handler (IndiaMART Explorer -> Problems Filter)
  const handleSelectCategory = (sectorName: string) => {
    setSelectedSector(sectorName);
    setActiveTab('problems');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        currentUser={currentUser}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenMyProfile={handleOpenMyProfile}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs text-white shadow-2xl">
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
            />
          </div>

          {/* Center Column (Content Exploration & Problems) */}
          <div className={`${['procurement', 'account', 'tiers', 'categories'].includes(activeTab) ? 'lg:col-span-10 xl:col-span-10' : 'lg:col-span-8 xl:col-span-8'} min-w-0 space-y-6`}>
            {/* All Categories Explorer (IndiaMART Style) */}
            {activeTab === 'categories' && (
              <CategoryExplorer onSelectCategory={handleSelectCategory} />
            )}

            {/* Problem Dashboard */}
            {activeTab === 'problems' && (
              <ProblemDashboard
                problems={problems}
                collaborations={collaborations}
                currentStartup={CURRENT_STARTUP}
                onOpenCollabHub={() => {
                  setActiveTab('dept-upload');
                }}
                onSubmitApplication={handleSubmitApplication}
                onSubmitOutcome={handleSubmitOutcome}
                onSubmitProposal={handleSubmitProposal}
                searchQuery={searchQuery}
                selectedSector={selectedSector}
                selectedStatus={selectedStatus}
                maxBudget={maxBudget}
                collabOnly={collabOnly}
                onResetFilters={handleResetFilters}
              />
            )}

            {activeTab === 'feed' && (
              <CivicShortsFeed
                userRole={userRole}
                currentUserName={currentUser?.name || 'Anonymous Citizen'}
                outcomes={outcomes}
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
                  onOpenStartupProfile={handleOpenStartupProfile}
                />
              )
            )}

            {/* Department Problem Upload */}
            {activeTab === 'dept-upload' && (
              <DepartmentPostProblem
                onProblemCreated={handleProblemCreated}
                onNavigateToDirectory={() => setActiveTab('problems')}
              />
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
              />
            )}
          </div>

          {/* Right Navigation Bar (Thin Sidebar - Actions & Alliances) */}
          {!['procurement', 'account', 'tiers', 'categories'].includes(activeTab) && (
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
                Converge Public Procurement Architecture
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


