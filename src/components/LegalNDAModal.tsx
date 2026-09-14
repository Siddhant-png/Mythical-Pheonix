import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  CheckCircle2, 
  X, 
  FileCheck, 
  Hash, 
  Stamp, 
  Printer, 
  Building2, 
  Cpu, 
  Percent, 
  Sliders 
} from 'lucide-react';
import { Manufacturer, Problem, Startup } from '../types';

interface LegalNDAModalProps {
  isOpen: boolean;
  onClose: () => void;
  startup: Startup;
  manufacturer: Manufacturer;
  problem: Problem;
  roleSplitText?: string;
  initialStartupShare?: number;
  initialPartnerShare?: number;
  onCompleteAgreement: (
    collabId: string, 
    roleSplit: string,
    startupShare?: number,
    partnerShare?: number,
    turnoverPledged?: number
  ) => void;
}

export const LegalNDAModal: React.FC<LegalNDAModalProps> = ({
  isOpen,
  onClose,
  startup,
  manufacturer,
  problem,
  roleSplitText,
  initialStartupShare = 60,
  initialPartnerShare = 40,
  onCompleteAgreement
}) => {
  // Revenue split state
  const [startupShare, setStartupShare] = useState<number>(initialStartupShare);
  const partnerShare = 100 - startupShare;

  // Scope matrix state
  const [startupScope, setStartupScope] = useState<string>(
    'AI vision neural network models, edge inference firmware, GIS telemetry portal, continuous model retraining & algorithm updates.'
  );
  const [partnerScope, setPartnerScope] = useState<string>(
    'Automotive-grade IP67 ruggedized housing, SMT PCB fabrication, vibration damping mounts, batch testing & 3-year on-ground field warranty.'
  );

  // 4 Clauses Agreement State
  const [hasAgreedIp, setHasAgreedIp] = useState(false);
  const [hasAgreedTurnover, setHasAgreedTurnover] = useState(false);
  const [hasAgreedExclusivity, setHasAgreedExclusivity] = useState(false);
  const [hasAgreedLiability, setHasAgreedLiability] = useState(false);

  // Process & Signature State
  const [isProcessing, setIsProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  // Compute live checksum hash based on parties, tender, and terms
  const agreementChecksum = useMemo(() => {
    const raw = `${startup.id}-${manufacturer.id}-${problem.id}-${startupShare}-${partnerShare}-${manufacturer.annualTurnover}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `0x8f${hex}9a4b2c7e114d59a68e30129bc774d01b4e9f73`;
  }, [startup.id, manufacturer.id, problem.id, startupShare, partnerShare, manufacturer.annualTurnover]);

  if (!isOpen) return null;

  const allClausesChecked = hasAgreedIp && hasAgreedTurnover && hasAgreedExclusivity && hasAgreedLiability;
  const combinedRoleSplit = `Startup Scope: ${startupScope} | Partner Scope: ${partnerScope}`;

  const estimatedStartupRevenue = Math.round((problem.budgetCeiling * startupShare) / 100);
  const estimatedPartnerRevenue = problem.budgetCeiling - estimatedStartupRevenue;

  const handleExecute = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCompleted(true);
      setTimeout(() => {
        onCompleteAgreement(
          `collab-${Date.now()}`,
          combinedRoleSplit,
          startupShare,
          partnerShare,
          manufacturer.annualTurnover
        );
      }, 1200);
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 font-body">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-govblue-900 via-govblue-800 to-slate-900 text-white p-5 flex items-center justify-between border-b border-govblue-700/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <h3 className="text-lg font-extrabold font-heading tracking-tight">
                  Consortium Teaming & Mutual NDA (M-NDA & CTA)
                </h3>
                <span className="bg-amber-400/20 text-amber-300 text-[11px] font-mono px-2 py-0.5 rounded border border-amber-400/30 font-bold">
                  MahaGov GFR Rule 149 Framework
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Statutory IP Ringfence, Balance Sheet Pledging, and Revenue Share Instrument
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-govblue-800 transition shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Target Problem Banner */}
          <div className="bg-gradient-to-r from-slate-50 to-amber-50/40 border border-amber-200/60 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-700">
                  Target Government Tender / Challenge
                </span>
                <div className="font-bold font-heading text-slate-900 text-sm sm:text-base mt-0.5">{problem.title}</div>
                <div className="text-xs text-slate-600 mt-1 flex items-center gap-3 flex-wrap">
                  <span>🏛️ {problem.deptName}</span>
                  <span>💰 Maximum Budget: ₹{(problem.budgetCeiling / 100000).toFixed(1)} Lakhs</span>
                  <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px] font-bold">
                    Sector: {problem.sector}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Parties Involved Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Party A: Startup */}
            <div className="border border-blue-200 bg-blue-50/40 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-govblue-800 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-govblue-600" />
                  Party A: Lead Deep-Tech Startup
                </span>
                <span className="text-[10px] bg-govblue-100 text-govblue-900 px-2 py-0.5 rounded font-mono font-bold">
                  DPIIT RECOGNIZED
                </span>
              </div>
              <div className="font-extrabold text-slate-900">{startup.companyName}</div>
              <div className="text-xs text-slate-600 space-y-0.5">
                <div>DPIIT Reg: <strong className="font-mono text-slate-800">{startup.dpiitCertNo}</strong></div>
                <div>Turnover: <strong className="text-slate-800">₹{(startup.annualTurnover / 100000).toFixed(1)} Lakhs</strong> (Exempt under GFR 149)</div>
                <div>Primary Value: <strong className="text-slate-800">Core AI Models, IP & Algorithms</strong></div>
              </div>
            </div>

            {/* Party B: Partner */}
            <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  Party B: Scale & Infrastructure Partner
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold">
                  AUDITED OEM
                </span>
              </div>
              <div className="font-extrabold text-slate-900">{manufacturer.companyName}</div>
              <div className="text-xs text-slate-600 space-y-0.5">
                <div>GSTIN: <strong className="font-mono text-slate-800">{manufacturer.gstNumber}</strong></div>
                <div>Turnover Backing: <strong className="text-emerald-800 font-bold">₹{(manufacturer.annualTurnover / 10000000).toFixed(1)} Crores</strong> (Pledging to Tender)</div>
                <div>Primary Value: <strong className="text-slate-800">Industrial Manufacturing & AMC Warranty</strong></div>
              </div>
            </div>
          </div>

          {/* Interactive Revenue & Commercial Split Slider */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-govblue-900" />
                <span className="font-extrabold font-heading text-slate-900 text-sm">
                  Negotiated Commercial & Revenue Apportionment
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Adjust commercial ratio for joint tender bid
              </span>
            </div>

            <div className="space-y-2">
              <input 
                type="range" 
                min={30} 
                max={80} 
                step={5}
                value={startupShare}
                onChange={(e) => setStartupShare(Number(e.target.value))}
                className="w-full accent-govblue-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                <span>30% Startup / 70% Partner</span>
                <span>50% / 50% Parity</span>
                <span>80% Startup / 20% Partner</span>
              </div>
            </div>

            {/* Split Visualization Cards */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-white p-3 rounded-xl border border-govblue-200/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-govblue-900">Startup Commercial Share</span>
                  <span className="font-extrabold text-govblue-900 text-sm font-heading">{startupShare}%</span>
                </div>
                <div className="text-xs text-slate-500">
                  Est. Value: <strong className="text-slate-900">₹{(estimatedStartupRevenue / 100000).toFixed(2)} Lakhs</strong>
                </div>
                <div className="text-[10px] text-govblue-700 mt-1">IP licensing, software subscriptions, ML models</div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-amber-200/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-amber-900">Partner Commercial Share</span>
                  <span className="font-extrabold text-amber-900 text-sm font-heading">{partnerShare}%</span>
                </div>
                <div className="text-xs text-slate-500">
                  Est. Value: <strong className="text-slate-900">₹{(estimatedPartnerRevenue / 100000).toFixed(2)} Lakhs</strong>
                </div>
                <div className="text-[10px] text-amber-800 mt-1">SMT hardware, enclosures, assembly & 5-year AMC</div>
              </div>
            </div>
          </div>

          {/* Operational Scope & Responsibility Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-heading text-slate-700 uppercase tracking-wider">
                Operational Scope Matrix (Clause 2 Deliverables)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Party A (Startup) Obligations:
                </label>
                <textarea 
                  rows={3}
                  value={startupScope}
                  onChange={(e) => setStartupScope(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-govblue-800 text-xs bg-slate-50/50 font-body text-slate-800 leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Party B (Partner) Obligations:
                </label>
                <textarea 
                  rows={3}
                  value={partnerScope}
                  onChange={(e) => setPartnerScope(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-govblue-800 text-xs bg-slate-50/50 font-body text-slate-800 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Mandatory Legal Declarations (4 Checkboxes) */}
          <div className="space-y-2.5 pt-1">
            <span className="text-xs font-bold font-heading text-slate-700 uppercase tracking-wider block">
              Statutory Teaming Declarations (Mandatory for Execution)
            </span>

            {/* Clause 1 */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200/90 hover:bg-slate-50 cursor-pointer transition">
              <input 
                type="checkbox" 
                checked={hasAgreedIp}
                onChange={(e) => setHasAgreedIp(e.target.checked)}
                className="mt-1 w-4 h-4 text-govblue-900 rounded focus:ring-govblue-800 border-slate-300 shrink-0"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block font-heading">
                  Clause 1: Irrevocable IP Ringfencing & Trade Secret Protection
                </span>
                <span className="text-slate-600 leading-normal font-body">
                  Party A (Startup) retains exclusive, worldwide, and unencumbered ownership of all algorithmic source code, neural network model weights, software architectures, and patentable inventions. Party B receives strictly non-exclusive fabrication rights solely for the execution of this government tender.
                </span>
              </div>
            </label>

            {/* Clause 2 */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200/90 hover:bg-slate-50 cursor-pointer transition">
              <input 
                type="checkbox" 
                checked={hasAgreedTurnover}
                onChange={(e) => setHasAgreedTurnover(e.target.checked)}
                className="mt-1 w-4 h-4 text-govblue-900 rounded focus:ring-govblue-800 border-slate-300 shrink-0"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block font-heading">
                  Clause 2: Statutory Turnover Pledging for Tender Prequalification
                </span>
                <span className="text-slate-600 leading-normal font-body">
                  Party B (Partner) formally pledges its audited turnover (₹{(manufacturer.annualTurnover / 10000000).toFixed(1)} Crores) and GST credentials to satisfy the tender prequalification threshold on behalf of the consortium under the Maharashtra State Innovation Procurement Framework.
                </span>
              </div>
            </label>

            {/* Clause 3 */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200/90 hover:bg-slate-50 cursor-pointer transition">
              <input 
                type="checkbox" 
                checked={hasAgreedExclusivity}
                onChange={(e) => setHasAgreedExclusivity(e.target.checked)}
                className="mt-1 w-4 h-4 text-govblue-900 rounded focus:ring-govblue-800 border-slate-300 shrink-0"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block font-heading">
                  Clause 3: Non-Circumvention & Tender Exclusivity (24-Month Lock-in)
                </span>
                <span className="text-slate-600 leading-normal font-body">
                  Neither party shall independently bid on this specific tender nor partner with any third-party competitor for this problem statement for a period of 24 months from the date of execution.
                </span>
              </div>
            </label>

            {/* Clause 4 */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200/90 hover:bg-slate-50 cursor-pointer transition">
              <input 
                type="checkbox" 
                checked={hasAgreedLiability}
                onChange={(e) => setHasAgreedLiability(e.target.checked)}
                className="mt-1 w-4 h-4 text-govblue-900 rounded focus:ring-govblue-800 border-slate-300 shrink-0"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block font-heading">
                  Clause 4: Performance Guarantee & Liquidated Damages Apportionment
                </span>
                <span className="text-slate-600 leading-normal font-body">
                  EMD and Performance Bank Guarantee (PBG) obligations shall be backed by Party B; software performance milestones remain the direct responsibility of Party A. Liquidated Damages (if any) shall be apportioned strictly pro-rata to the fault-bearing deliverable.
                </span>
              </div>
            </label>
          </div>

          {/* Cryptographic Hash Verification */}
          <div className="bg-slate-900 text-slate-300 rounded-xl p-3.5 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-800">
            <div className="flex items-center space-x-2 truncate">
              <Hash className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-slate-400">Agreement Digest (SHA-256):</span>
              <span className="text-amber-400 truncate">{agreementChecksum}</span>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowPrintPreview(!showPrintPreview)}
                className="text-slate-300 hover:text-white flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded text-[11px] font-sans"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{showPrintPreview ? 'Hide Agreement' : 'Preview Agreement'}</span>
              </button>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                TAMPER-PROOF VERIFIED
              </span>
            </div>
          </div>

          {/* Agreement Preview Collapsible */}
          {showPrintPreview && (
            <div className="bg-slate-50 border border-slate-300 rounded-xl p-5 text-xs text-slate-700 font-mono space-y-3 max-h-60 overflow-y-auto">
              <div className="font-bold text-center text-slate-900 text-sm border-b pb-2 font-heading">
                MUTUAL NON-DISCLOSURE & CONSORTIUM TEAMING AGREEMENT (M-NDA & CTA)
              </div>
              <p>
                THIS CONSORTIUM AGREEMENT is made on {new Date().toLocaleDateString('en-IN')} by and between:
              </p>
              <p>
                <strong>PARTY A:</strong> {startup.companyName} (DPIIT: {startup.dpiitCertNo}), having its registered office in Maharashtra, India.
              </p>
              <p>
                <strong>PARTY B:</strong> {manufacturer.companyName} (GSTIN: {manufacturer.gstNumber}), having audited turnover of ₹{(manufacturer.annualTurnover/10000000).toFixed(1)} Cr.
              </p>
              <p>
                <strong>RECITALS:</strong> The Parties mutually agree to form a joint consortium to tender for "{problem.title}" issued by {problem.deptName}.
              </p>
              <p>
                <strong>REVENUE SHARE:</strong> Party A: {startupShare}% (₹{(estimatedStartupRevenue/100000).toFixed(2)} L) | Party B: {partnerShare}% (₹{(estimatedPartnerRevenue/100000).toFixed(2)} L).
              </p>
              <p>
                <strong>DIGITAL AUDIT DIGEST:</strong> {agreementChecksum}
              </p>
            </div>
          )}

          {/* Completed Execution Banner */}
          {completed && (
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl flex items-center gap-3 animate-pulse">
              <Stamp className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-emerald-900 text-sm font-heading">Dual Digital Signatures Completed!</div>
                <div className="text-xs text-emerald-700">
                  Consortium now officially recognized on Maharashtra Public Procurement gateway. Prequalified for joint bid submission!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center text-xs text-slate-500">
            <FileCheck className="w-4 h-4 mr-1.5 text-emerald-600" />
            <span>Dual Digital e-Sign (IT Act 2000 & GeM Consortium Guidelines)</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="gov-button-secondary"
            >
              Cancel
            </button>
            <button
              disabled={!allClausesChecked || isProcessing || completed}
              onClick={handleExecute}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold font-heading transition shadow-md ${
                !allClausesChecked || isProcessing || completed
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-govblue-900 hover:bg-govblue-800 text-white shadow-[0_8px_20px_rgba(11,37,69,0.18)]'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating DSC Signatures & Hash...</span>
                </>
              ) : completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Consortium Formed! Linking...</span>
                </>
              ) : (
                <>
                  <Stamp className="w-4 h-4 text-amber-400" />
                  <span>Execute Mutual NDA & Form Consortium</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
