import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Handshake, 
  FlaskConical, 
  CheckCircle2, 
  IndianRupee, 
  ArrowRight,
  ShieldCheck,
  Send,
  X,
  FileBadge
} from 'lucide-react';
import { Problem, Startup, Collaboration } from '../types';
import { ProblemCard } from '../components/ProblemCard';
import { FilterSidebar } from '../components/FilterSidebar';

interface ProblemDashboardProps {
  problems: Problem[];
  collaborations: Collaboration[];
  currentStartup: Startup;
  onOpenCollabHub: (problem?: Problem) => void;
  onSubmitApplication: (problemId: string, isCollab: boolean, bidAmount: number, summary: string) => void;
}

export const ProblemDashboard: React.FC<ProblemDashboardProps> = ({
  problems,
  collaborations,
  currentStartup,
  onOpenCollabHub,
  onSubmitApplication
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [maxBudget, setMaxBudget] = useState(10000000);
  const [collabOnly, setCollabOnly] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState<number>(3500000);
  const [proposalSummary, setProposalSummary] = useState('');
  const [applicationSubmittedSuccess, setApplicationSubmittedSuccess] = useState(false);

  // Filter problems
  const filteredProblems = problems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.deptName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector ? p.sector === selectedSector : true;
    const matchesStatus = selectedStatus ? p.status === selectedStatus : true;
    const matchesBudget = p.budgetCeiling <= maxBudget;
    const matchesCollab = collabOnly ? p.preferredMode === 'COLLABORATION_RECOMMENDED' : true;
    return matchesSearch && matchesSector && matchesStatus && matchesBudget && matchesCollab;
  });

  const getCollabForProblem = (problemId: string) => {
    return collaborations.find(c => c.problemId === problemId && c.status === 'ACTIVE');
  };

  const handleApplyClick = (problem: Problem) => {
    setSelectedProblem(problem);
    setBidAmount(Math.round(problem.budgetCeiling * 0.85));
    setProposalSummary(`Proposal for ${problem.title} leveraging ${currentStartup.techDomains.join(', ')} with rapid 6-week sandbox delivery.`);
    setApplicationModalOpen(true);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProblem) return;
    const activeCollab = getCollabForProblem(selectedProblem.id);
    onSubmitApplication(selectedProblem.id, !!activeCollab, bidAmount, proposalSummary);
    setApplicationSubmittedSuccess(true);
    setTimeout(() => {
      setApplicationSubmittedSuccess(false);
      setApplicationModalOpen(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 font-body">
      {/* Hero Showcase Banner */}
      <div className="bg-gradient-to-br from-govblue-900 via-govblue-800 to-slate-950 rounded-[28px] p-7 sm:p-10 text-white shadow-[0_20px_60px_rgba(11,37,69,0.26)] relative overflow-hidden border border-govblue-700/80">
        <div className="absolute top-0 right-0 w-96 h-96 bg-saffron-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] font-heading leading-[1.05] max-w-2xl">
            Bridging startups, manufacturers, and government delivery.
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            Eliminating turnover and balance-sheet barriers for DPIIT startups. Form joint consortiums under verified mutual NDAs, trial your innovations in government sandboxes, and scale across Maharashtra departments.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-saffron-300 font-bold block mb-1.5">Stage 1</span>
            <span className="font-semibold text-white block">Problem Definition</span>
            <p className="text-[11px] text-slate-400 mt-2">Departments post structured requirements without PDF friction.</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-saffron-300 font-bold block mb-1.5">Stage 2</span>
            <span className="font-semibold text-white block">Consortium & M-NDA</span>
            <p className="text-[11px] text-slate-400 mt-2">Startups pair with manufacturers to unlock eligibility.</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-saffron-300 font-bold block mb-1.5">Stage 3</span>
            <span className="font-semibold text-white block">Sandbox Trial</span>
            <p className="text-[11px] text-slate-400 mt-2">Milestone-driven testbeds and objective scorecards.</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-saffron-300 font-bold block mb-1.5">Stage 4</span>
            <span className="font-semibold text-white block">Auto-PO & Scale</span>
            <p className="text-[11px] text-slate-400 mt-2">Instant procurement PO and multi-department adoption.</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters + Problems */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Filter Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar
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
            onReset={() => {
              setSearchQuery('');
              setSelectedSector('');
              setSelectedStatus('');
              setMaxBudget(10000000);
              setCollabOnly(false);
            }}
          />
        </div>

        {/* Right Column: Problem Cards Catalog */}
        <div className="lg:col-span-3 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-brand-text font-heading">Active state tenders & challenges</h3>
              <p className="text-sm text-brand-textMuted mt-1">Showing {filteredProblems.length} available opportunities</p>
            </div>
          </div>

          {filteredProblems.length === 0 ? (
            <div className="bg-brand-panel rounded-2xl border border-brand-border p-12 text-center">
              <div className="w-14 h-14 rounded-full bg-govblue-50 border border-govblue-200 mx-auto flex items-center justify-center mb-4">
                <Building2 className="w-7 h-7 text-govblue-700" />
              </div>
              <div className="font-bold text-slate-700">No challenges match your filters</div>
              <p className="text-xs text-slate-500 mt-1">Try relaxing your budget ceiling or sector selection</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProblems.map((problem) => {
                const activeCollab = getCollabForProblem(problem.id);
                return (
                  <ProblemCard
                    key={problem.id}
                    problem={problem}
                    hasActiveCollab={!!activeCollab}
                    onSelectProblem={(p) => handleApplyClick(p)}
                    onInitiateCollab={(p) => onOpenCollabHub(p)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Application / Specs Detail Modal */}
      {applicationModalOpen && selectedProblem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                  {selectedProblem.sector}
                </span>
                <h3 className="text-lg font-bold mt-0.5">{selectedProblem.title}</h3>
                <p className="text-xs text-slate-400">{selectedProblem.deptName}</p>
              </div>
              <button 
                onClick={() => setApplicationModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFinalSubmit} className="p-6 space-y-4 text-xs">
              {/* Problem Description & Eligibility */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div>
                  <span className="font-bold text-slate-700 block">Statement Description:</span>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{selectedProblem.description}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block">Official Eligibility Rule:</span>
                  <p className="text-slate-600 mt-0.5">{selectedProblem.eligibilityCriteria}</p>
                </div>
              </div>

              {/* KPI Benchmarks for Sandbox */}
              <div>
                <span className="font-bold text-slate-900 block mb-1.5">Sandbox Evaluation KPIs:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedProblem.kpiBenchmarks.map((kpi, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-lg p-2.5 bg-white">
                      <div className="text-[11px] font-bold text-slate-800">{kpi.metric}</div>
                      <div className="text-xs text-govblue-800 font-bold mt-1">Target: {kpi.minTarget}</div>
                      <div className="text-[10px] text-slate-400">Weight: {kpi.weightage}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solo vs Collab Routing Indicator */}
              {getCollabForProblem(selectedProblem.id) ? (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Handshake className="w-5 h-5 text-emerald-700 shrink-0" />
                    <div>
                      <div className="font-bold text-emerald-900">Bidding as Active Consortium</div>
                      <div className="text-[11px] text-emerald-700">
                        {currentStartup.companyName} + Sahyadri Electronics (Mutual NDA Executed)
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded">
                    Turnover Qualified
                  </span>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-amber-900">Bidding Solo (Startup Path)</div>
                    <div className="text-[11px] text-amber-700">
                      Relying on DPIIT innovation certificate exemption under GFR Rule 149.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setApplicationModalOpen(false);
                      onOpenCollabHub(selectedProblem);
                    }}
                    className="text-[11px] bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1 rounded-lg"
                  >
                    Partner with Manufacturer
                  </button>
                </div>
              )}

              {/* Bid Amount Input */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Proposed Pilot Commercial Bid (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    max={selectedProblem.budgetCeiling}
                    className="w-full pl-7 pr-3 py-2 text-xs rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-govblue-800/20"
                    required
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Budget ceiling is ₹{(selectedProblem.budgetCeiling / 100000).toFixed(1)} Lakhs.
                </span>
              </div>

              {/* Proposal Summary */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Technical Architecture & Execution Plan
                </label>
                <textarea
                  rows={3}
                  value={proposalSummary}
                  onChange={(e) => setProposalSummary(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-govblue-800/20"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setApplicationModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl font-bold bg-govblue-900 hover:bg-govblue-800 text-white shadow-md transition"
                >
                  {applicationSubmittedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Application Lodged!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Official Tender Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
