import React, { useMemo, useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Building2, 
  Sliders, 
  CreditCard, 
  Zap,
  X,
  ThumbsUp,
  TrendingUp,
  Star
} from 'lucide-react';
import { Startup, Problem, UserRole } from '../types';
import { getRankFromUpvotes, TIER_DEFINITIONS } from '../utils/tierProgress';
import { TierBadge } from '../components/tier/TierBadge';

interface StartupDiscoveryHubProps {
  currentStartup: Startup;
  problems: Problem[];
  userRole: UserRole;

  onSelectProblemForApplication?: (
    problemId: string,
    isCollab: boolean,
    bidAmount: number,
    summary: string
  ) => void;

  onOpenStartupProfile?: (startupId: string) => void;
}

export const StartupDiscoveryHub: React.FC<StartupDiscoveryHubProps> = ({
  currentStartup,
  problems,
  userRole,
  onSelectProblemForApplication,
  onOpenStartupProfile
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'discovery' | 'dpiit' | 'eval-panel' | 'escrow'>('discovery');

  // Startup Discovery state
  const [discoverySearch, setDiscoverySearch] = useState('');
  const [discoverySector, setDiscoverySector] = useState('all');
  const [discoveryStage, setDiscoveryStage] = useState('all');
  const [selectedStartup, setSelectedStartup] = useState<any | null>(null);

  // Local demo data for the Startup Discovery panel.
  const [discoveryStartups, setDiscoveryStartups] = useState([
    { id: 'startup-1', name: 'Drishti Edge Technologies Pvt Ltd', sector: 'AI & Computer Vision', stage: 'Growth', location: 'Pune, Maharashtra', dpiitVerified: true, description: 'Edge AI and computer vision solutions for infrastructure inspection and public-sector deployments.', upvotes: 1250, tags: ['Edge AI', 'Computer Vision', 'IoT'] },
    { id: 'startup-2', name: 'AquaPulse Sensing Technologies', sector: 'CleanTech', stage: 'Early', location: 'Mumbai, Maharashtra', dpiitVerified: true, description: 'Smart acoustic sensing and LoRaWAN technology for detecting water pipeline leakage.', upvotes: 840, tags: ['LoRaWAN', 'Smart Sensors', 'Water'] },
    { id: 'startup-3', name: 'CivicGrid Analytics', sector: 'GovTech', stage: 'Growth', location: 'Nagpur, Maharashtra', dpiitVerified: false, description: 'Data analytics and citizen feedback tools for improving municipal service delivery.', upvotes: 420, tags: ['Analytics', 'CivicTech', 'Dashboards'] },
    { id: 'startup-4', name: 'GreenRoute Mobility', sector: 'CleanTech', stage: 'Early', location: 'Nashik, Maharashtra', dpiitVerified: true, description: 'Fleet optimization and charging intelligence for electric public transportation.', upvotes: 180, tags: ['EV', 'Mobility', 'Optimization'] }
  ]);

  const filteredStartups = useMemo(() => discoveryStartups.filter((startup) => {
    const search = discoverySearch.toLowerCase();
    const matchesSearch = !search || `${startup.name} ${startup.sector} ${startup.location} ${startup.tags.join(' ')}`.toLowerCase().includes(search);
    const matchesSector = discoverySector === 'all' || startup.sector === discoverySector;
    const matchesStage = discoveryStage === 'all' || startup.stage === discoveryStage;
    return matchesSearch && matchesSector && matchesStage;
  }), [discoverySearch, discoverySector, discoveryStage, discoveryStartups]);

  // DPIIT Verification Simulator state
  const [dpiitInput, setDpiitInput] = useState('DIPP-MH-2023-98442');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedResult, setVerifiedResult] = useState<any>({
    dpiitNo: 'DIPP-MH-2023-98442',
    companyName: 'Drishti Edge Technologies Pvt Ltd',
    incorporationDate: '2022-04-12',
    entityType: 'Private Limited Company',
    state: 'Maharashtra (Pune Hub)',
    turnoverWaived: true,
    priorExpWaived: true,
    gemFastTrackEligible: true,
    taxHolidayStatus: 'Approved (Sec 80-IAC)',
    techDomains: ['Computer Vision', 'Deep Learning', 'Edge AI', 'IoT Telemetry'],
    upvotes: 1250
  });

  // Proposal Upvote Matrix state
  const [sampleProposals, setSampleProposals] = useState([
    {
      id: 'prop-1',
      problemTitle: 'AI-Powered Computer Vision for Automated Pothole & Road Quality Indexing',
      applicantName: 'Drishti Edge Technologies + Sahyadri Electronics (Consortium)',
      bidAmount: 3800000,
      submittedDate: '2026-08-26',
      techStack: 'Edge AI, Jetson Orin Nano, IP67 Modular Enclosure',
      status: 'SHORTLISTED FOR SANDBOX',
      isCollab: true,
      upvotes: 1250
    },
    {
      id: 'prop-2',
      problemTitle: 'LoRaWAN Smart Acoustic Sensor for Drinking Water Pipeline Leakage Localization',
      applicantName: 'AquaPulse Sensing Technologies (Solo Startup)',
      bidAmount: 3650000,
      submittedDate: '2026-08-22',
      techStack: 'Acoustic Transducers, LoRaWAN Gateway, GIS Portal',
      status: 'SANDBOX APPROVED',
      isCollab: false,
      upvotes: 840
    }
  ]);

  // Escrow Disbursement Milestones
  const [escrowMilestones] = useState([
    {
      id: 'm1',
      title: 'Milestone 1: Sandbox Testbed Setup & Hardware Calibration',
      percentage: '30%',
      amount: 1140000,
      status: 'DISBURSED',
      disbursedDate: '2026-09-02',
      approver: 'Executive Engineer, PWD Highway Div',
      bankRef: 'MAHA-ESCROW-TXN-88491'
    },
    {
      id: 'm2',
      title: 'Milestone 2: Supervised Field Trial & Telemetry Log Sign-off',
      percentage: '40%',
      amount: 1520000,
      status: 'IN_REVIEW',
      disbursedDate: 'Pending Verification',
      approver: 'Nodal Officer, Innovation Cell',
      bankRef: 'Awaiting Benchmark Sign-off'
    },
    {
      id: 'm3',
      title: 'Milestone 3: Independent Evaluation & Final Auto-PO Settlement',
      percentage: '30%',
      amount: 1140000,
      status: 'SCHEDULED',
      disbursedDate: 'Upon Final Certificate',
      approver: 'Dept Financial Advisor',
      bankRef: 'Escrow Locked'
    }
  ]);

  const handleVerifyDpiit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedResult({
        dpiitNo: dpiitInput.toUpperCase(),
        companyName: dpiitInput.includes('98442') ? 'Drishti Edge Technologies Pvt Ltd' : 'Apex GreenTech Solutions Pvt Ltd',
        incorporationDate: '2022-04-12',
        entityType: 'Private Limited Company',
        state: 'Maharashtra',
        turnoverWaived: true,
        priorExpWaived: true,
        gemFastTrackEligible: true,
        taxHolidayStatus: 'Active & Verified',
        techDomains: ['Artificial Intelligence', 'Smart Sensors', 'Embedded Edge'],
        upvotes: 1250
      });
    }, 800);
  };

  const handleAddProposalUpvotes = (propId: string, count: number) => {
    setSampleProposals(prev => prev.map(p => p.id === propId ? { ...p, upvotes: p.upvotes + count } : p));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 font-body pb-12 select-none">
      {/* HEADER HERO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-govblue-950 via-slate-900 to-emerald-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>5-Tier Upvote Ranking Hub</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Startup Discovery & Rank Hierarchy
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Ranked purely into 5 tiers based on community upvotes. Explore DPIIT verified startups, upvote rankings, and milestone-backed pilot escrows.
          </p>
        </div>
      </div>

      {/* SUB-NAV TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSubTab('discovery')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'discovery'
              ? 'bg-govblue-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Search className="w-4 h-4 text-emerald-400" />
          <span>Startup Discovery</span>
        </button>

        <button
          onClick={() => setActiveSubTab('dpiit')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'dpiit'
              ? 'bg-govblue-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>DPIIT Verification & GeM Sync</span>
        </button>

        <button
          onClick={() => setActiveSubTab('eval-panel')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'eval-panel'
              ? 'bg-govblue-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4 text-amber-400" />
          <span>Upvote Ranking & Evaluation</span>
        </button>

        <button
          onClick={() => setActiveSubTab('escrow')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'escrow'
              ? 'bg-govblue-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <CreditCard className="w-4 h-4 text-sky-400" />
          <span>Milestone Escrow & Payment Tracker</span>
        </button>
      </div>

      {/* SUB TAB 0: STARTUP DISCOVERY */}
      {activeSubTab === 'discovery' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">AI-powered startup directory</span>
                <h3 className="text-xl font-extrabold text-slate-900">Discover & Screen Startups</h3>
                <p className="text-xs text-slate-500 mt-1">Search verified and emerging startups by sector, stage, upvotes, and rank.</p>
              </div>
              <div className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">{filteredStartups.length} startups found</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input value={discoverySearch} onChange={(e) => setDiscoverySearch(e.target.value)} placeholder="Search startups, sectors..." className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500" />
              </div>
              <select value={discoverySector} onChange={(e) => setDiscoverySector(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs">
                <option value="all">All sectors</option>
                <option value="AI & Computer Vision">AI & Computer Vision</option>
                <option value="CleanTech">CleanTech</option>
                <option value="GovTech">GovTech</option>
              </select>
              <select value={discoveryStage} onChange={(e) => setDiscoveryStage(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs">
                <option value="all">All stages</option>
                <option value="Early">Early stage</option>
                <option value="Growth">Growth stage</option>
              </select>
            </div>

            {filteredStartups.length === 0 ? (
              <div className="text-center py-12 text-sm text-slate-500">No startups match your filters.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStartups.map((startup) => {
                  const rankTier = getRankFromUpvotes(startup.upvotes);
                  return (
                    <div key={startup.id} className="border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 transition space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0"><Building2 className="w-5 h-5 text-emerald-700" /></div>
                          <div><h4 className="text-sm font-extrabold text-slate-900">{startup.name}</h4><p className="text-xs text-slate-500 mt-1">{startup.location}</p></div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex items-center space-x-1 justify-end text-xs font-black text-emerald-700 font-mono">
                            <ThumbsUp className="w-3.5 h-3.5 fill-emerald-100" />
                            <span>{startup.upvotes.toLocaleString()}</span>
                          </div>
                          <div className="mt-1">
                            <TierBadge tier={rankTier} compact />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{startup.description}</p>
                      <div className="flex flex-wrap gap-1.5">{startup.tags.map((tag) => <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold">{tag}</span>)}</div>
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100"><span className="text-[10px] font-bold text-slate-500">{startup.dpiitVerified ? '✓ DPIIT verified' : 'Verification pending'} · {startup.stage}</span>
                      <button
                        type="button"
                        onClick={() => onOpenStartupProfile?.(startup.id)}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
                      >
                        View profile →
                      </button></div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {selectedStartup && (
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-between gap-4"><div><span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold">Startup profile</span><h3 className="text-xl font-extrabold mt-1">{selectedStartup.name}</h3></div><button onClick={() => setSelectedStartup(null)} aria-label="Close profile"><X className="w-5 h-5" /></button></div>
              <p className="text-sm text-slate-300 mt-3">{selectedStartup.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                {[
                  ['Sector', selectedStartup.sector], 
                  ['Stage', selectedStartup.stage], 
                  ['Location', selectedStartup.location], 
                  ['Upvotes', `${selectedStartup.upvotes}`],
                  ['Rank', TIER_DEFINITIONS.find(d => d.tier === getRankFromUpvotes(selectedStartup.upvotes))?.label || 'Rank 5']
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-white/10 p-3">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">{label}</span>
                    <span className="block text-xs font-bold mt-1">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB TAB 1: DPIIT & GeM VERIFICATION SIMULATOR */}
      {activeSubTab === 'dpiit' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lookup Card */}
          <div className="lg:col-span-1 bg-brand-panel rounded-2xl border border-brand-border p-6 shadow-sm space-y-4">
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Live Government Integration</span>
              <h3 className="text-base font-bold text-slate-900">Startup India / DPIIT Lookup</h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter any DPIIT recognition number to simulate instant eligibility verification & turnover exemption check.
              </p>
            </div>

            <form onSubmit={handleVerifyDpiit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">DPIIT Certificate No.</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={dpiitInput}
                    onChange={(e) => setDpiitInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 font-mono font-bold uppercase focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. DIPP-MH-2023-98442"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl shadow transition flex items-center justify-center space-x-2"
              >
                {isVerifying ? (
                  <span>Querying Startup India Registry...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>Verify DPIIT Eligibility</span>
                  </>
                )}
              </button>
            </form>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-800 block">Automatic Waivers Granted:</span>
              <div className="space-y-1 text-[11px] text-slate-600">
                <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Prior Turnover Threshold Waived (Rule 149)</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Prior Experience Years Waived</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Earnest Money Deposit (EMD) Exempt</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Result Inspector */}
          <div className="lg:col-span-2 space-y-4">
            {verifiedResult && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded font-mono">
                        VERIFIED DPIIT STARTUP
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">{verifiedResult.companyName}</h3>
                      <span className="text-xs text-slate-500 font-mono">Cert No: {verifiedResult.dpiitNo}</span>
                    </div>
                  </div>

                  <div className="text-right bg-emerald-50 border border-emerald-200 p-3 rounded-xl shrink-0">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase block">Community Upvotes</span>
                    <div className="flex items-center justify-end space-x-1">
                      <ThumbsUp className="w-4 h-4 text-emerald-700 fill-emerald-200" />
                      <span className="text-2xl font-black text-emerald-700">{verifiedResult.upvotes.toLocaleString()}</span>
                    </div>
                    <div className="mt-1">
                      <TierBadge tier={getRankFromUpvotes(verifiedResult.upvotes)} compact />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">ENTITY TYPE</span>
                    <span className="font-bold text-slate-800">{verifiedResult.entityType}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">STATE JURISDICTION</span>
                    <span className="font-bold text-slate-800">{verifiedResult.state}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">TAX EXEMPTION</span>
                    <span className="font-bold text-emerald-700">{verifiedResult.taxHolidayStatus}</span>
                  </div>
                </div>

                {/* GeM Sync Simulation */}
                <div className="bg-gradient-to-r from-govblue-900 to-slate-900 text-white p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      <span className="font-bold text-sm">GeM (Government e-Marketplace) Direct Fast-Track Sync</span>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded border border-emerald-400/30 font-bold">
                      Catalog Ready
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Once a startup reaches <strong>Rank 1 or Rank 2 (≥500 Upvotes)</strong>, Converge automatically pushes the product passport and pre-approved PO pricing directly into the national <strong>GeM Innovation Runway Catalog</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB TAB 2: UPVOTE RANKING & EVALUATION MATRIX */}
      {activeSubTab === 'eval-panel' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Upvote-Based 5-Tier Evaluation Matrix</h3>
                <p className="text-xs text-slate-500">Startup ranking is determined strictly by community upvotes into 5 distinct ranks</p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full border border-emerald-300 flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                <span>Upvote Rank Live</span>
              </span>
            </div>

            {/* Rank Legend Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              {TIER_DEFINITIONS.map(d => (
                <div key={d.tier} className="bg-white p-2.5 rounded-xl border border-slate-200 text-center space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase block">Rank {d.level}</span>
                  <span className="text-xs font-extrabold text-slate-900 block">{d.label.split(' ')[1] || d.label}</span>
                  <span className="text-[10px] font-bold text-emerald-700 block font-mono">{d.requirement}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {sampleProposals.map((prop) => {
                const rankTier = getRankFromUpvotes(prop.upvotes);
                const rankDef = TIER_DEFINITIONS.find(d => d.tier === rankTier);

                return (
                  <div key={prop.id} className="border border-slate-200 bg-slate-50/50 rounded-2xl p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <span className="text-[10px] bg-govblue-100 text-govblue-900 font-bold px-2 py-0.5 rounded uppercase">
                          {prop.status}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">{prop.problemTitle}</h4>
                        <span className="text-xs text-slate-600 font-medium">Applicant: {prop.applicantName}</span>
                      </div>

                      <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-slate-200 shrink-0">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Community Upvotes</span>
                          <div className="flex items-center space-x-1 justify-end">
                            <ThumbsUp className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                            <span className="text-xl font-black text-emerald-700">{prop.upvotes.toLocaleString()}</span>
                          </div>
                        </div>
                        <TierBadge tier={rankTier} />
                      </div>
                    </div>

                    {/* Interactive Upvote Endorsements */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-600">
                        <span className="font-bold text-slate-800">Current Rank: </span>
                        <span className="text-emerald-700 font-bold">{rankDef?.label}</span>
                        <span className="text-slate-400 ml-2">({rankDef?.description})</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-500 mr-1">Cast Upvotes:</span>
                        <button
                          onClick={() => handleAddProposalUpvotes(prop.id, 10)}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 transition flex items-center space-x-1"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>+10</span>
                        </button>
                        <button
                          onClick={() => handleAddProposalUpvotes(prop.id, 50)}
                          className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs rounded-xl border border-emerald-300 transition flex items-center space-x-1"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>+50</span>
                        </button>
                        <button
                          onClick={() => handleAddProposalUpvotes(prop.id, 100)}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1"
                        >
                          <span>+100 Boost</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 3: MILESTONE ESCROW & PAYMENT TRACKER */}
      {activeSubTab === 'escrow' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] text-sky-600 font-bold uppercase tracking-wider">State Bank Escrow Portal</span>
                <h3 className="text-base font-bold text-slate-900">Milestone-Based Payment Disbursement Ledger</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Protects startups from cashflow delays by locking pilot budget in government escrow upfront.
                </p>
              </div>

              <div className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-mono shrink-0">
                <span className="text-slate-400 block text-[10px]">TOTAL ESCROW LOCKED</span>
                <span className="text-amber-400 font-bold text-base">₹38,00,000</span>
              </div>
            </div>

            <div className="space-y-3">
              {escrowMilestones.map((m) => (
                <div 
                  key={m.id}
                  className="border border-slate-200 bg-slate-50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                        m.status === 'DISBURSED'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : m.status === 'IN_REVIEW'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {m.status}
                      </span>
                      <span className="font-bold text-slate-900">{m.title}</span>
                    </div>

                    <div className="text-slate-600 text-[11px]">
                      Approver: <span className="font-medium text-slate-800">{m.approver}</span> | Ref: <span className="font-mono">{m.bankRef}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block font-bold">MILESTONE SHARE ({m.percentage})</span>
                    <span className="text-sm font-black text-slate-900">₹{(m.amount / 100000).toFixed(2)} Lakhs</span>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{m.disbursedDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
