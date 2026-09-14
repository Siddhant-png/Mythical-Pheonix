import React, { useState, useMemo } from 'react';
import { 
  Building, 
  Handshake, 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck2, 
  Factory, 
  Search, 
  ArrowRight, 
  Check, 
  Lock, 
  Stamp, 
  ExternalLink,
  Calculator,
  Mail,
  Send,
  PlusCircle,
  Award,
  AlertTriangle,
  FileText,
  Sliders,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  XCircle,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { Manufacturer, Problem, Startup, Collaboration, AllianceProposal, UserRole, PartnerCategory } from '../types';
import { LegalNDAModal } from '../components/LegalNDAModal';

export type AllianceSubTab = 'partners' | 'calculator' | 'consortiums' | 'proposals';

interface ManufacturerCollabHubProps {
  manufacturers: Manufacturer[];
  problems: Problem[];
  startup: Startup;
  collaborations: Collaboration[];
  proposals?: AllianceProposal[];
  userRole?: UserRole;
  onAddNewCollaboration: (collab: Collaboration) => void;
  onAcceptProposal?: (proposalId: string) => void;
  onDeclineProposal?: (proposalId: string) => void;
  onSendProposal?: (newProposal: AllianceProposal) => void;
  onNavigateToProblem?: (problemId: string) => void;
  preSelectedProblem?: Problem | null;
}

export const ManufacturerCollabHub: React.FC<ManufacturerCollabHubProps> = ({
  manufacturers,
  problems,
  startup,
  collaborations,
  proposals = [],
  userRole = 'startup',
  onAddNewCollaboration,
  onAcceptProposal,
  onDeclineProposal,
  onSendProposal,
  onNavigateToProblem,
  preSelectedProblem
}) => {
  // Navigation
  const [activeSubTab, setActiveSubTab] = useState<AllianceSubTab>('partners');

  // Selected for NDA execution
  const [selectedMfr, setSelectedMfr] = useState<Manufacturer | null>(null);
  const [targetProblem, setTargetProblem] = useState<Problem>(
    preSelectedProblem || problems[0]
  );
  const [ndaModalOpen, setNdaModalOpen] = useState(false);

  // Filters for Partner Directory
  const [mfrFilter, setMfrFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [cityFilter, setCityFilter] = useState<string>('ALL');
  const [minTurnoverCr, setMinTurnoverCr] = useState<number>(0);

  // Teaming Proposal Form Modal
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [proposalTargetPartner, setProposalTargetPartner] = useState<Manufacturer | null>(null);
  const [proposalProblemId, setProposalProblemId] = useState<string>(problems[0]?.id || '');
  const [proposalStartupShare, setProposalStartupShare] = useState<number>(60);
  const [proposalRoleText, setProposalRoleText] = useState<string>('');
  const [proposalNote, setProposalNote] = useState<string>('');

  // Eligibility Calculator State
  const [calcProblemId, setCalcProblemId] = useState<string>(problems[0]?.id || '');
  const [calcPartnerId, setCalcPartnerId] = useState<string>(manufacturers[0]?.id || '');

  // Selected Problem for Calculator
  const calcProblem = useMemo(() => {
    return problems.find(p => p.id === calcProblemId) || problems[0];
  }, [problems, calcProblemId]);

  // Selected Partner for Calculator
  const calcPartner = useMemo(() => {
    return manufacturers.find(m => m.id === calcPartnerId) || manufacturers[0];
  }, [manufacturers, calcPartnerId]);

  // Filtered partners list
  const filteredMfrs = useMemo(() => {
    return manufacturers.filter(m => {
      const search = mfrFilter.toLowerCase();
      const matchesSearch = 
        m.companyName.toLowerCase().includes(search) ||
        m.facilitiesSectors.some(s => s.toLowerCase().includes(search)) ||
        (m.headquarters && m.headquarters.toLowerCase().includes(search)) ||
        (m.certifications && m.certifications.some(c => c.toLowerCase().includes(search)));

      const matchesCat = categoryFilter === 'ALL' || m.category === categoryFilter;
      const matchesCity = cityFilter === 'ALL' || (m.headquarters && m.headquarters.toLowerCase().includes(cityFilter.toLowerCase()));
      const turnoverInCr = m.annualTurnover / 10000000;
      const matchesTurnover = turnoverInCr >= minTurnoverCr;

      return matchesSearch && matchesCat && matchesCity && matchesTurnover;
    });
  }, [manufacturers, mfrFilter, categoryFilter, cityFilter, minTurnoverCr]);

  // Compatibility Score Calculator
  const getCompatibilityScore = (partner: Manufacturer, problem: Problem) => {
    let score = 70; // baseline
    // Turnover contribution
    if (partner.annualTurnover >= 500000000) score += 15; // 50Cr+
    else if (partner.annualTurnover >= 200000000) score += 10;
    
    // Sector alignment
    if (problem.sector.includes('AI') && partner.facilitiesSectors.some(s => s.includes('Edge') || s.includes('Electronics') || s.includes('SMT'))) {
      score += 10;
    }
    if (problem.sector.includes('Agri') && partner.facilitiesSectors.some(s => s.includes('Drone') || s.includes('Payload'))) {
      score += 10;
    }
    if (problem.sector.includes('Health') && partner.facilitiesSectors.some(s => s.includes('Cleanroom') || s.includes('Medical'))) {
      score += 10;
    }
    if (problem.sector.includes('Water') && partner.facilitiesSectors.some(s => s.includes('LoRa') || s.includes('Transducers') || s.includes('Water'))) {
      score += 10;
    }
    return Math.min(score, 98);
  };

  const handleStartCollab = (mfr: Manufacturer, prob?: Problem) => {
    setSelectedMfr(mfr);
    if (prob) setTargetProblem(prob);
    setNdaModalOpen(true);
  };

  const handleOpenProposalModal = (mfr: Manufacturer) => {
    setProposalTargetPartner(mfr);
    setProposalProblemId(targetProblem.id);
    setProposalStartupShare(60);
    setProposalRoleText(`Startup Scope: Deep-tech algorithm, AI model training & cloud software. Partner Scope: ${mfr.facilitiesSectors.slice(0, 2).join(', ')} & audited turnover backing.`);
    setProposalNote(`Requesting consortium alliance for ${targetProblem.title}. Your facilities in ${mfr.headquarters || 'Maharashtra'} fulfill the tender requirements.`);
    setProposalModalOpen(true);
  };

  const handleSendProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalTargetPartner) return;
    const chosenProblem = problems.find(p => p.id === proposalProblemId) || targetProblem;

    const newProp: AllianceProposal = {
      id: `prop-${Date.now()}`,
      senderId: startup.id,
      senderName: startup.companyName,
      senderRole: 'startup',
      recipientId: proposalTargetPartner.id,
      recipientName: proposalTargetPartner.companyName,
      problemId: chosenProblem.id,
      problemTitle: chosenProblem.title,
      proposedRoleSplit: proposalRoleText,
      proposedStartupShare: proposalStartupShare,
      proposedPartnerShare: 100 - proposalStartupShare,
      turnoverPledged: proposalTargetPartner.annualTurnover,
      status: 'PENDING',
      sentAt: new Date().toISOString(),
      note: proposalNote
    };

    if (onSendProposal) {
      onSendProposal(newProp);
    }
    setProposalModalOpen(false);
  };

  const handleNDASigned = (
    collabId: string, 
    roleSplit: string,
    startupShare = 60,
    partnerShare = 40,
    turnoverPledged = 680000000
  ) => {
    if (!selectedMfr) return;
    const newCollab: Collaboration = {
      id: collabId,
      startupId: startup.id,
      startupName: startup.companyName,
      manufacturerId: selectedMfr.id,
      manufacturerName: selectedMfr.companyName,
      problemId: targetProblem.id,
      problemTitle: targetProblem.title,
      roleSplit: roleSplit,
      status: 'ACTIVE',
      agreedAt: new Date().toISOString(),
      partnerCategory: selectedMfr.category || 'MANUFACTURER',
      revenueSplitStartup: startupShare,
      revenueSplitPartner: partnerShare,
      turnoverPledged: selectedMfr.annualTurnover,
      ndaContract: {
        id: `nda-${Date.now()}`,
        collaborationId: collabId,
        ipProtectionClauses: 'Party A (Startup) retains 100% irrevocable exclusive intellectual property ownership of all source code, neural network model weights, and custom software. Party B receives limited non-exclusive production license strictly bound to this tender.',
        commercialTerms: `Turnover backing pledged: ₹${(selectedMfr.annualTurnover / 10000000).toFixed(1)} Cr. Revenue split: ${startupShare}% Startup, ${partnerShare}% Partner.`,
        documentHash: '0x8f7d19a4b2c7e114d59a68e30129bc774d01b4e9f73',
        startupSignedAt: new Date().toISOString(),
        manufacturerSignedAt: new Date().toISOString(),
        legalStatus: 'EXECUTED'
      }
    };
    onAddNewCollaboration(newCollab);
    setNdaModalOpen(false);
    setActiveSubTab('consortiums');
  };

  const pendingProposalsCount = proposals.filter(p => p.status === 'PENDING').length;

  return (
    <div className="space-y-6 font-body">
      {/* Top Banner explaining the Alliances Framework */}
      <div className="bg-gradient-to-r from-govblue-950 via-govblue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-govblue-800/80">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center space-x-2 bg-saffron-500/20 border border-saffron-400/30 px-3 py-1 rounded-full text-xs font-bold text-saffron-300 mb-3 backdrop-blur-md">
            <Handshake className="w-4 h-4 text-saffron-400" />
            <span>Consortium & Alliances Ecosystem • MahaGov Public Procurement</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-white">
            Startup Innovation + Strategic Industry Scale
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
            Government tenders traditionally require ₹5Cr+ annual audited turnover and prior deployment track records. By forming an official <strong className="text-white">Consortium Alliance</strong> under an auto-drafted <strong className="text-white">Mutual NDA & Teaming Agreement</strong>, your startup leverages the partner's balance sheet while maintaining <strong className="text-amber-400">100% intellectual property ownership</strong>.
          </p>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-saffron-500/10 to-transparent pointer-events-none"></div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200/80 pb-3">
        <button
          onClick={() => setActiveSubTab('partners')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold font-heading transition-all ${
            activeSubTab === 'partners'
              ? 'bg-govblue-900 text-white shadow-[0_4px_12px_rgba(11,37,69,0.18)]'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80'
          }`}
        >
          <Factory className={`w-4 h-4 ${activeSubTab === 'partners' ? 'text-amber-400' : 'text-slate-500'}`} />
          <span>Verified Partner Directory</span>
          <span className="ml-1 text-[10px] bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded-full font-bold">
            {manufacturers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('calculator')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold font-heading transition-all ${
            activeSubTab === 'calculator'
              ? 'bg-govblue-900 text-white shadow-[0_4px_12px_rgba(11,37,69,0.18)]'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80'
          }`}
        >
          <Calculator className={`w-4 h-4 ${activeSubTab === 'calculator' ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span>Synergy & Eligibility Calculator</span>
          <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-bold">
            Live
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('consortiums')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold font-heading transition-all relative ${
            activeSubTab === 'consortiums'
              ? 'bg-govblue-900 text-white shadow-[0_4px_12px_rgba(11,37,69,0.18)]'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80'
          }`}
        >
          <Stamp className={`w-4 h-4 ${activeSubTab === 'consortiums' ? 'text-amber-400' : 'text-slate-500'}`} />
          <span>Active Consortiums & M-NDAs</span>
          {collaborations.length > 0 && (
            <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full font-bold">
              {collaborations.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('proposals')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold font-heading transition-all ${
            activeSubTab === 'proposals'
              ? 'bg-govblue-900 text-white shadow-[0_4px_12px_rgba(11,37,69,0.18)]'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80'
          }`}
        >
          <Mail className={`w-4 h-4 ${activeSubTab === 'proposals' ? 'text-sky-400' : 'text-slate-500'}`} />
          <span>Teaming Proposals & Inbox</span>
          {pendingProposalsCount > 0 && (
            <span className="text-[10px] bg-saffron-500 text-white px-1.5 py-0.5 rounded-full font-bold">
              {pendingProposalsCount}
            </span>
          )}
        </button>
      </div>

      {/* SUB-TAB 1: VERIFIED PARTNER DIRECTORY & MATCHMAKER */}
      {activeSubTab === 'partners' && (
        <div className="space-y-5">
          {/* Target Tender Selection Strip */}
          <div className="gov-panel p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg shrink-0">
                🎯
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-heading">
                  Prequalifying for Tender
                </span>
                <div className="font-extrabold text-slate-900 text-sm font-heading">{targetProblem.title}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <select
                value={targetProblem.id}
                onChange={(e) => {
                  const prob = problems.find(p => p.id === e.target.value);
                  if (prob) setTargetProblem(prob);
                }}
                className="text-xs rounded-xl border border-slate-200/80 px-3 py-2 text-slate-700 focus:ring-2 focus:ring-govblue-800 bg-white shadow-sm font-medium"
              >
                {problems.map(p => (
                  <option key={p.id} value={p.id}>{p.deptName.split(',')[0]} - {p.title.slice(0, 35)}...</option>
                ))}
              </select>
            </div>
          </div>

          {/* Faceted Filter Controls */}
          <div className="gov-card p-4 sm:p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={mfrFilter}
                  onChange={(e) => setMfrFilter(e.target.value)}
                  placeholder="Search name, tooling, SMT..."
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-govblue-800 bg-white"
                />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs rounded-xl border border-slate-200/80 px-3 py-2.5 text-slate-700 focus:ring-2 focus:ring-govblue-800 bg-white font-medium"
              >
                <option value="ALL">All Partner Categories</option>
                <option value="MANUFACTURER">🏭 Hardware & Contract OEMs</option>
                <option value="SYSTEM_INTEGRATOR">🌐 System Integrators & EPC</option>
                <option value="TESTING_LAB">🧪 Testing & Calibration Labs</option>
                <option value="STARTUP_CO_BIDDER">🤝 DeepTech Co-Bidders</option>
              </select>

              {/* City / District Filter */}
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="text-xs rounded-xl border border-slate-200/80 px-3 py-2.5 text-slate-700 focus:ring-2 focus:ring-govblue-800 bg-white font-medium"
              >
                <option value="ALL">All Maharashtra Districts</option>
                <option value="Pune">Pune & Bhosari MIDC</option>
                <option value="Nagpur">Nagpur & MIHAN SEZ</option>
                <option value="Mumbai">Mumbai & SEEPZ</option>
                <option value="Navi Mumbai">Navi Mumbai</option>
                <option value="Aurangabad">Chhatrapati Sambhaji Nagar</option>
                <option value="Nashik">Nashik MIDC</option>
              </select>

              {/* Min Turnover Slider */}
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80 text-xs">
                <div className="flex justify-between font-semibold text-[11px] text-slate-600 mb-1">
                  <span>Min Turnover:</span>
                  <span className="text-govblue-900 font-bold font-heading">₹{minTurnoverCr} Cr+</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={10}
                  value={minTurnoverCr}
                  onChange={(e) => setMinTurnoverCr(Number(e.target.value))}
                  className="w-full accent-govblue-900 cursor-pointer h-1.5"
                />
              </div>
            </div>
          </div>

          {/* Partner Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filteredMfrs.map((mfr) => {
              const isAlreadyTeamed = collaborations.some(
                c => c.manufacturerId === mfr.id && c.problemId === targetProblem.id
              );
              const compatibilityScore = getCompatibilityScore(mfr, targetProblem);

              return (
                <div 
                  key={mfr.id}
                  className="gov-card p-5 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                          {mfr.category === 'SYSTEM_INTEGRATOR' ? (
                            <Layers className="w-5 h-5 text-sky-700" />
                          ) : mfr.category === 'TESTING_LAB' ? (
                            <Award className="w-5 h-5 text-purple-700" />
                          ) : (
                            <Factory className="w-5 h-5 text-govblue-800" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-extrabold font-heading text-slate-900 text-sm leading-snug">{mfr.companyName}</h4>
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {mfr.headquarters || 'Maharashtra, India'}
                            </span>
                            <span>•</span>
                            <span className="font-mono text-[10px]">GST: {mfr.gstNumber}</span>
                          </div>
                        </div>
                      </div>

                      {/* Compatibility Badge */}
                      <div className="text-right shrink-0">
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full border border-emerald-300 font-heading">
                          {compatibilityScore}% Match
                        </span>
                      </div>
                    </div>

                    {/* Financial Solvency & Manufacturing Specs */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs mb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-heading font-semibold">Audited Turnover</span>
                        <span className="font-extrabold text-govblue-900 text-sm font-heading">
                          ₹{(mfr.annualTurnover / 10000000).toFixed(1)} Crores
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-heading font-semibold">Annual Capacity</span>
                        <span className="font-bold text-slate-800">
                          {mfr.manufacturingCapacityUnits.toLocaleString()} units/yr
                        </span>
                      </div>
                    </div>

                    {/* Tooling & Plant Capabilities */}
                    <div className="mb-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 font-heading">
                        Tooling & Capabilities:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {mfr.facilitiesSectors.map((fac, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            {fac}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    {mfr.certifications && (
                      <div className="mb-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 font-heading">
                          Statutory Certifications:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {mfr.certifications.map((cert, idx) => (
                            <span key={idx} className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-mono font-bold">
                              ✓ {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Action Footer */}
                  <div className="border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-500">
                      Rep: <span className="font-semibold text-slate-700">{mfr.contactPerson}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenProposalModal(mfr)}
                        className="gov-button-secondary py-2 px-3 text-xs"
                      >
                        Propose Terms
                      </button>

                      {isAlreadyTeamed ? (
                        <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Consortium Active</span>
                        </div>
                      ) : (
                        <button
                          disabled={!mfr.openToCollaborate}
                          onClick={() => handleStartCollab(mfr, targetProblem)}
                          className={`flex items-center space-x-1.5 text-xs font-bold font-heading px-3.5 py-2 rounded-xl transition shadow-sm ${
                            mfr.openToCollaborate
                              ? 'bg-govblue-900 hover:bg-govblue-800 text-white'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Sign M-NDA</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CONSORTIUM SYNERGY & ELIGIBILITY CALCULATOR */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6">
          <div className="gov-card p-6 space-y-6">
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block font-heading">
                Live Pre-Bidding Qualification Engine
              </span>
              <h3 className="text-xl font-extrabold font-heading text-slate-900">
                Consortium Synergy & Tender Eligibility Calculator
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Simulate how combining your startup's deep-tech IP with a verified partner unlocks GFR Rule 149 relaxation and clears tender financial thresholds.
              </p>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gov-panel p-4">
              <div>
                <label className="text-xs font-bold font-heading text-slate-700 block mb-1">
                  1. Select Target State Tender / Challenge:
                </label>
                <select
                  value={calcProblemId}
                  onChange={(e) => setCalcProblemId(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white font-medium text-slate-800 focus:ring-2 focus:ring-govblue-800"
                >
                  {problems.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.deptName.split(',')[0]} - {p.title} (₹{(p.budgetCeiling / 100000).toFixed(0)}L)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold font-heading text-slate-700 block mb-1">
                  2. Select Potential Alliance Partner:
                </label>
                <select
                  value={calcPartnerId}
                  onChange={(e) => setCalcPartnerId(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white font-medium text-slate-800 focus:ring-2 focus:ring-govblue-800"
                >
                  {manufacturers.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.companyName} (Turnover: ₹{(m.annualTurnover / 10000000).toFixed(0)} Cr)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Solo Startup Status */}
              <div className="border border-rose-200 bg-rose-50/40 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-rose-800 uppercase tracking-wider font-heading">
                    Solo Startup Bidding Profile
                  </span>
                  <span className="text-[11px] bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full font-bold">
                    Disqualified Solo ❌
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-rose-100">
                    <span className="text-slate-600">Startup Turnover:</span>
                    <span className="font-bold text-rose-700">₹{(startup.annualTurnover / 100000).toFixed(1)} Lakhs (Below ₹5Cr Bar)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-rose-100">
                    <span className="text-slate-600">Manufacturing Assembly:</span>
                    <span className="font-bold text-rose-700">0 Units/Year (R&D Prototype Only)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-rose-100">
                    <span className="text-slate-600">Required ISO & Ingress Rating:</span>
                    <span className="font-bold text-rose-700">Pending Third-Party Certification</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-rose-100">
                    <span className="text-slate-600">EMD Bank Guarantee Capacity:</span>
                    <span className="font-bold text-rose-700">High Collateral Burden on Founders</span>
                  </div>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-rose-200 text-[11px] text-rose-900 leading-relaxed">
                  ⚠️ <strong>Tender Failure Risk:</strong> 87% of deep-tech startups get disqualified at Technical & Financial Envelope A evaluation due to balance sheet criteria.
                </div>
              </div>

              {/* Joint Consortium Status */}
              <div className="border border-emerald-300 bg-emerald-50/50 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider font-heading">
                    Consortium Alliance Bidding Profile
                  </span>
                  <span className="text-[11px] bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full font-extrabold">
                    100% Prequalified ✅
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-emerald-100">
                    <span className="text-slate-600">Combined Audited Turnover:</span>
                    <span className="font-extrabold text-emerald-800 font-heading">
                      ₹{((startup.annualTurnover + calcPartner.annualTurnover) / 10000000).toFixed(2)} Crores (Exceeds Bar)
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-emerald-100">
                    <span className="text-slate-600">Manufacturing Capacity:</span>
                    <span className="font-bold text-emerald-800">
                      {calcPartner.manufacturingCapacityUnits.toLocaleString()} Units/Year
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-emerald-100">
                    <span className="text-slate-600">Certifications & Standards:</span>
                    <span className="font-bold text-emerald-800">
                      {calcPartner.certifications?.slice(0, 3).join(', ') || 'ISO-9001 Compliant'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-emerald-100">
                    <span className="text-slate-600">IP Ringfence Protection:</span>
                    <span className="font-extrabold text-emerald-800">100% Startup Property (M-NDA Protected)</span>
                  </div>
                </div>

                <div className="bg-white/90 p-3 rounded-xl border border-emerald-300 text-[11px] text-emerald-950 leading-relaxed">
                  🚀 <strong>Procurement Advantage:</strong> Maharashtra State Startup Policy Section 4.2 formally recognizes dual consortiums with pledged turnover for accelerated pilot trials.
                </div>
              </div>
            </div>

            {/* Action Call to Action */}
            <div className="bg-govblue-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-extrabold font-heading text-sm sm:text-base">
                  Ready to form a Consortium with {calcPartner.companyName}?
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Execute the auto-drafted M-NDA & Teaming Agreement with 100% IP ringfencing.
                </div>
              </div>
              <button
                onClick={() => handleStartCollab(calcPartner, calcProblem)}
                className="bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-slate-950 font-extrabold font-heading text-xs px-5 py-3 rounded-xl shadow-lg transition shrink-0 flex items-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Execute M-NDA for this Pairing</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ACTIVE CONSORTIUMS & EXECUTED M-NDAs */}
      {activeSubTab === 'consortiums' && (
        <div className="space-y-6">
          <div className="gov-card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-extrabold font-heading text-slate-900">Active Consortiums & Executed NDAs</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Legally binding teaming agreements recognized by the Government of Maharashtra
                </p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full border border-emerald-300 font-heading">
                {collaborations.length} Legally Bound
              </span>
            </div>

            {collaborations.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No active consortiums formed yet. Explore the Partner Directory to team up on a state challenge.
              </div>
            ) : (
              <div className="space-y-4">
                {collaborations.map((collab) => (
                  <div 
                    key={collab.id} 
                    className="border border-emerald-200 bg-emerald-50/30 rounded-2xl p-5 hover:border-emerald-300 transition space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <span className="font-extrabold font-heading text-slate-900 text-base">{collab.manufacturerName}</span>
                          <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold">
                            M-NDA EXECUTED
                          </span>
                          <span className="text-[10px] bg-white border border-emerald-300 text-emerald-800 px-2 py-0.5 rounded font-bold">
                            Turnover Pledged: ₹{collab.turnoverPledged ? (collab.turnoverPledged / 10000000).toFixed(1) : '68.0'} Cr
                          </span>
                        </div>
                        <div className="text-xs text-slate-700 font-medium">
                          🎯 Target State Tender: <strong className="font-bold text-slate-900">{collab.problemTitle}</strong>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        {onNavigateToProblem && (
                          <button
                            onClick={() => onNavigateToProblem(collab.problemId)}
                            className="gov-button-primary py-2 px-3.5 text-xs flex items-center space-x-1.5"
                          >
                            <span>Submit Joint Bid</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Revenue Share & Scope Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-3.5 rounded-xl border border-emerald-100 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase font-heading">Agreed Commercial Split</span>
                        <span className="font-extrabold text-govblue-900 font-heading">
                          {collab.revenueSplitStartup || 60}% Startup / {collab.revenueSplitPartner || 40}% Partner
                        </span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase font-heading">Operational Role Matrix</span>
                        <span className="text-slate-700 font-mono text-[11px] line-clamp-2">
                          ⚡ {collab.roleSplit}
                        </span>
                      </div>
                    </div>

                    {/* Cryptographic Proof Footer */}
                    <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-emerald-100 gap-2">
                      <div className="flex items-center space-x-2 font-mono">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>SHA-256 Digest: {collab.ndaContract?.documentHash.slice(0, 18)}...</span>
                      </div>
                      <div className="text-emerald-700 font-semibold">
                        Dual e-Sign Audited & Registered under Indian IT Act
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: TEAMING PROPOSALS & INBOX */}
      {activeSubTab === 'proposals' && (
        <div className="space-y-6">
          <div className="gov-card p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block font-heading">
                  Alliance Inquiries & Proposals
                </span>
                <h3 className="text-xl font-extrabold font-heading text-slate-900">Teaming Requests & Proposals Inbox</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review and negotiate consortium proposals before formal M-NDA execution.
                </p>
              </div>
              <div className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2 font-heading">
                {proposals.length} Total Teaming Requests
              </div>
            </div>

            {proposals.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-500">
                No teaming proposals in your inbox.
              </div>
            ) : (
              <div className="space-y-4">
                {proposals.map((prop) => (
                  <div 
                    key={prop.id}
                    className="border border-slate-200/90 rounded-2xl p-5 hover:border-sky-300 transition space-y-3 bg-white"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold font-heading text-slate-900 text-sm">
                            {prop.senderName}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-heading ${
                            prop.status === 'PENDING' 
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : prop.status === 'ACCEPTED'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {prop.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          🎯 Target: <strong className="text-slate-800 font-semibold">{prop.problemTitle}</strong>
                        </div>
                      </div>

                      <div className="text-right text-xs text-slate-400">
                        <span>Proposed: {new Date(prop.sentAt).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5">
                      <div className="font-semibold text-slate-800">
                        Role Split: <span className="font-normal text-slate-600">{prop.proposedRoleSplit}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-slate-700">
                        <span>Commercial Share: <strong>{prop.proposedStartupShare}% Startup / {prop.proposedPartnerShare}% Partner</strong></span>
                        <span>Turnover Pledged: <strong>₹{(prop.turnoverPledged / 10000000).toFixed(1)} Cr</strong></span>
                      </div>
                      {prop.note && (
                        <p className="text-[11px] text-slate-500 italic mt-1 bg-white p-2 rounded border border-slate-200">
                          "{prop.note}"
                        </p>
                      )}
                    </div>

                    {/* Proposal Actions */}
                    {prop.status === 'PENDING' && (
                      <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                        {onDeclineProposal && (
                          <button
                            onClick={() => onDeclineProposal(prop.id)}
                            className="text-xs font-semibold text-slate-600 hover:text-rose-600 px-3 py-1.5 rounded-lg transition"
                          >
                            Decline
                          </button>
                        )}
                        <button
                          onClick={() => {
                            const partner = manufacturers.find(m => m.id === prop.senderId || m.id === prop.recipientId);
                            const prob = problems.find(p => p.id === prop.problemId);
                            if (partner && prob) {
                              if (onAcceptProposal) onAcceptProposal(prop.id);
                              handleStartCollab(partner, prob);
                            }
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-heading px-4 py-2 rounded-xl transition shadow-sm flex items-center space-x-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept & Sign M-NDA</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEND TEAMING PROPOSAL MODAL */}
      {proposalModalOpen && proposalTargetPartner && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 font-body">
          <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200/90 overflow-hidden">
            <div className="bg-govblue-900 text-white p-4 flex items-center justify-between border-b border-govblue-800">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-sm font-heading">Send Teaming Proposal to {proposalTargetPartner.companyName}</h4>
              </div>
              <button onClick={() => setProposalModalOpen(false)} className="text-slate-400 hover:text-white transition">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendProposalSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-bold font-heading text-slate-700 block mb-1">Target Government Challenge:</label>
                <select
                  value={proposalProblemId}
                  onChange={(e) => setProposalProblemId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 bg-slate-50 font-medium text-slate-800 focus:ring-2 focus:ring-govblue-800"
                >
                  {problems.map(p => (
                    <option key={p.id} value={p.id}>{p.deptName.split(',')[0]} - {p.title.slice(0, 40)}...</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Proposed Commercial Revenue Share:</span>
                  <span className="text-govblue-900 font-heading">{proposalStartupShare}% Startup / {100 - proposalStartupShare}% Partner</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={80}
                  step={5}
                  value={proposalStartupShare}
                  onChange={(e) => setProposalStartupShare(Number(e.target.value))}
                  className="w-full accent-govblue-900 cursor-pointer"
                />
              </div>

              <div>
                <label className="font-bold font-heading text-slate-700 block mb-1">Proposed Operational Role Split:</label>
                <textarea
                  rows={3}
                  value={proposalRoleText}
                  onChange={(e) => setProposalRoleText(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-govblue-800"
                />
              </div>

              <div>
                <label className="font-bold font-heading text-slate-700 block mb-1">Introductory Note / Message:</label>
                <textarea
                  rows={2}
                  value={proposalNote}
                  onChange={(e) => setProposalNote(e.target.value)}
                  placeholder="Explain why your startup is a strategic partner for this tender..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-govblue-800"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setProposalModalOpen(false)}
                  className="gov-button-secondary py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gov-button-primary py-2 px-4 flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Send Proposal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RENDER LEGAL NDA MODAL */}
      {selectedMfr && (
        <LegalNDAModal
          isOpen={ndaModalOpen}
          onClose={() => setNdaModalOpen(false)}
          startup={startup}
          manufacturer={selectedMfr}
          problem={targetProblem}
          onCompleteAgreement={handleNDASigned}
        />
      )}
    </div>
  );
};
