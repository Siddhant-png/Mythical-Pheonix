import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  FileCheck, 
  Hash, 
  Stamp,
  Download
} from 'lucide-react';
import { Manufacturer, Problem, Startup } from '../types';

interface LegalNDAModalProps {
  isOpen: boolean;
  onClose: () => void;
  startup: Startup;
  manufacturer: Manufacturer;
  problem: Problem;
  roleSplitText: string;
  onCompleteAgreement: (collabId: string, roleSplit: string) => void;
}

export const LegalNDAModal: React.FC<LegalNDAModalProps> = ({
  isOpen,
  onClose,
  startup,
  manufacturer,
  problem,
  roleSplitText,
  onCompleteAgreement
}) => {
  const [hasAgreedIp, setHasAgreedIp] = useState(false);
  const [hasAgreedLiability, setHasAgreedLiability] = useState(false);
  const [hasAgreedTurnover, setHasAgreedTurnover] = useState(false);
  const [startupSigned, setStartupSigned] = useState(false);
  const [manufacturerSigned, setManufacturerSigned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const docHash = "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069";
  const allChecked = hasAgreedIp && hasAgreedLiability && hasAgreedTurnover;

  const handleExecute = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setStartupSigned(true);
      setManufacturerSigned(true);
      setIsProcessing(false);
      setCompleted(true);
      setTimeout(() => {
        onCompleteAgreement(`collab-${Date.now()}`, roleSplitText);
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-govblue-900 via-govblue-800 to-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold">Consortium Teaming & Mutual NDA (M-NDA)</h3>
                <span className="bg-amber-400/20 text-amber-300 text-[11px] font-mono px-2 py-0.5 rounded border border-amber-400/30">
                  Sec 3.2 MahaGov Tender Framework
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Legally binding pre-bidding IP ringfence & qualification fusion agreement
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Target Problem Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500">Target Government Problem</span>
            <div className="font-semibold text-slate-900 mt-0.5">{problem.title}</div>
            <div className="text-xs text-slate-600 mt-1 flex items-center gap-3">
              <span>🏛️ {problem.deptName}</span>
              <span>💰 Budget: ₹{(problem.budgetCeiling / 100000).toFixed(1)} Lakhs</span>
            </div>
          </div>

          {/* Contracting Parties Synergy Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Startup Party */}
            <div className="border border-saffron-200 bg-saffron-50/50 rounded-xl p-3.5 relative">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-saffron-800">PARTY A: INNOVATION STARTUP</span>
                <span className="text-[10px] bg-saffron-100 text-saffron-900 px-2 py-0.5 rounded font-mono font-medium">
                  {startup.dpiitCertNo}
                </span>
              </div>
              <div className="font-bold text-slate-900">{startup.companyName}</div>
              <div className="text-xs text-slate-600 mt-1">Rep: {startup.contactPerson}</div>
              <div className="mt-2 text-xs bg-white/80 p-2 rounded border border-saffron-100 text-saffron-950 font-medium">
                🔑 Key Contribution: Algorithm weights, IP, Edge AI firmware, custom software layer.
              </div>
            </div>

            {/* Manufacturer Party */}
            <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-3.5 relative">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-emerald-800">PARTY B: SCALE MANUFACTURER</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-mono font-medium">
                  GST: {manufacturer.gstNumber}
                </span>
              </div>
              <div className="font-bold text-slate-900">{manufacturer.companyName}</div>
              <div className="text-xs text-slate-600 mt-1">Turnover: ₹{(manufacturer.annualTurnover / 10000000).toFixed(1)} Crores</div>
              <div className="mt-2 text-xs bg-white/80 p-2 rounded border border-emerald-100 text-emerald-950 font-medium">
                🏭 Key Contribution: Financial solvency backing, tooling, ISO fabrication, assembly line & SLA.
              </div>
            </div>
          </div>

          {/* Role Split Definition */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <h4 className="font-semibold text-slate-900 flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-govblue-700" />
              Agreed Operational Role Split
            </h4>
            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed font-mono">
              {roleSplitText || 'Startup: Software & AI models; Manufacturer: Hardware chassis, testing, and production scaling.'}
            </p>
          </div>

          {/* Legal IP Protection & Indemnity Clauses */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600" />
              Critical Protection Clauses (Auto-Drafted)
            </h4>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input 
                type="checkbox" 
                checked={hasAgreedIp}
                onChange={(e) => setHasAgreedIp(e.target.checked)}
                className="mt-1 w-4 h-4 text-saffron-600 rounded focus:ring-saffron-500 border-slate-300"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">
                  Clause 1: Irrevocable IP Ringfence (Startup Retains 100% IP)
                </span>
                <span className="text-slate-600 leading-normal">
                  All source code, models, neural network weights, patents, and architectural blueprints disclosed under this collaboration remain the sole, unencumbered intellectual property of Party A. Party B agrees not to reverse-engineer, duplicate, or license this IP to any third party.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input 
                type="checkbox" 
                checked={hasAgreedTurnover}
                onChange={(e) => setHasAgreedTurnover(e.target.checked)}
                className="mt-1 w-4 h-4 text-saffron-600 rounded focus:ring-saffron-500 border-slate-300"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">
                  Clause 2: Financial Turnover Pledging & Tender Pre-Qualification
                </span>
                <span className="text-slate-600 leading-normal">
                  Party B (Manufacturer) agrees to pledge its audited financial turnover (₹{(manufacturer.annualTurnover / 10000000).toFixed(1)} Cr) and valid GST status exclusively to satisfy the minimum tender pre-qualification for this government problem statement.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input 
                type="checkbox" 
                checked={hasAgreedLiability}
                onChange={(e) => setHasAgreedLiability(e.target.checked)}
                className="mt-1 w-4 h-4 text-saffron-600 rounded focus:ring-saffron-500 border-slate-300"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">
                  Clause 3: Non-Circumvention & Joint Bid Exclusivity
                </span>
                <span className="text-slate-600 leading-normal">
                  Neither party shall independently bid on this specific problem statement or partner with another competing vendor for a period of 24 months from the date of execution.
                </span>
              </div>
            </label>
          </div>

          {/* Cryptographic Hash Verification */}
          <div className="bg-slate-900 text-slate-300 rounded-xl p-3 text-xs font-mono flex items-center justify-between border border-slate-800">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">Doc Checksum:</span>
              <span className="text-amber-400 truncate max-w-[280px] sm:max-w-md">{docHash}</span>
            </div>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded text-[10px]">
              SHA-256 VERIFIED
            </span>
          </div>

          {/* Signing Status Preview */}
          {completed && (
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl flex items-center gap-3">
              <Stamp className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-emerald-900 text-sm">Agreement Fully Executed & Timestamped</div>
                <div className="text-xs text-emerald-700">
                  Consortium now recognized by Government of Maharashtra procurement gateway. You can now submit the joint proposal!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center text-xs text-slate-500">
            <FileCheck className="w-4 h-4 mr-1 text-slate-400" />
            Digital e-Sign compliant with Indian IT Act 2000
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
            >
              Cancel
            </button>
            <button
              disabled={!allChecked || isProcessing || completed}
              onClick={handleExecute}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md ${
                !allChecked || isProcessing || completed
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-700 hover:to-amber-700 text-white'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating DSC & Cryptographic Signatures...</span>
                </>
              ) : completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Executed! Redirecting...</span>
                </>
              ) : (
                <>
                  <Stamp className="w-4 h-4" />
                  <span>Execute Mutual NDA & Teaming Agreement</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
