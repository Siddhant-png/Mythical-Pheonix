import React, { useState } from 'react';
import { 
  FlaskConical, 
  CheckCircle2, 
  Award, 
  FileText, 
  Printer, 
  Clock, 
  ShieldCheck, 
  Sliders, 
  Check, 
  Sparkles,
  ArrowUpRight,
  CircleDot
} from 'lucide-react';
import { Pilot, Procurement, UserRole } from '../types';
import { formatINRMoney } from '../utils/format';

interface SandboxPilotScorecardProps {
  pilots: Pilot[];
  procurements: Procurement[];
  onGeneratePO: (pilotId: string, poValue: number) => void;
  userRole: UserRole;
}

export const SandboxPilotScorecard: React.FC<SandboxPilotScorecardProps> = ({
  pilots,
  procurements,
  onGeneratePO,
  userRole
}) => {
  const [selectedPilot, setSelectedPilot] = useState<Pilot>(pilots[0]);
  const [scores, setScores] = useState<Record<number, number>>({
    0: 94,
    1: 90,
    2: 88
  });
  const [evaluatorNotes, setEvaluatorNotes] = useState(
    'Field results satisfy both environmental resilience and latency benchmarks. Recommend immediate direct PO award under Maharashtra Startup Policy Sec 4.2.'
  );
  const [poGenerated, setPoGenerated] = useState<Procurement | null>(null);

  const calculateTotalScore = () => {
    const values = Object.values(scores);
    if (values.length === 0) return 0;
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  const currentScore = calculateTotalScore();
  const isPassed = currentScore >= 80;

  const existingPO = procurements.find(p => p.pilotId === selectedPilot.id);

  const handleIssuePO = () => {
    const poVal = 3800000;
    onGeneratePO(selectedPilot.id, poVal);
    const mockPO: Procurement = {
      id: `proc-${Date.now()}`,
      pilotId: selectedPilot.id,
      problemTitle: selectedPilot.problemTitle,
      vendorName: selectedPilot.applicantName,
      poNumber: `MAHA-GOV-PO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      finalPoValue: poVal,
      gfrRuleReference: 'GFR-2017 Rule 149 / Maharashtra Startup Policy Sec 4.2 (Prior Experience & Turnover Waived)',
      deliveryTimelineWeeks: 6,
      issuedAt: new Date().toISOString().split('T')[0],
      adoptionsCount: 1
    };
    setPoGenerated(mockPO);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 font-body">
      <div className="bg-gradient-to-r from-govblue-900 via-govblue-800 to-slate-950 text-white rounded-[28px] p-7 sm:p-10 shadow-[0_20px_60px_rgba(11,37,69,0.2)] relative overflow-hidden border border-govblue-700/80">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full text-[11px] font-bold text-violet-200 mb-4 border border-white/10">
            <FlaskConical className="w-3.5 h-3.5 text-violet-300" />
            <span>De-risking public procurement</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] font-heading leading-[1.05] max-w-2xl">
            Sandbox trials & automated KPI scorecards.
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            Instead of risky upfront multi-crore tenders, finalists prove performance in a monitored live sandbox corridor. A verified score of 80%+ automatically triggers a simplified direct purchase order and faster deployment.
          </p>
        </div>
      </div>

      {/* Grid: Pilot Selector & Live Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Pilots List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">Active Sandbox Trials</h3>
          <div className="space-y-2.5">
            {pilots.map((pilot) => {
              const hasPO = procurements.some(p => p.pilotId === pilot.id);
              const isSelected = selectedPilot.id === pilot.id;

              return (
                <div
                  key={pilot.id}
                  onClick={() => {
                    setSelectedPilot(pilot);
                    setPoGenerated(null);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-govblue-900 text-white border-govblue-800 shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-govblue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      hasPO 
                        ? (isSelected ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-800')
                        : (isSelected ? 'bg-purple-400 text-slate-900' : 'bg-purple-100 text-purple-800')
                    }`}>
                      <CircleDot className="w-2.5 h-2.5 fill-current" />
                      {hasPO ? 'PROCURED (PO ISSUED)' : (pilot.status === 'RUNNING' ? 'TRIAL IN PROGRESS' : 'PASSED')}
                    </span>
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-amber-300' : 'text-slate-600'}`}>
                      Score: {pilot.aggregateScore}/100
                    </span>
                  </div>

                  <div className="font-bold text-xs leading-snug line-clamp-2">
                    {pilot.problemTitle}
                  </div>

                  <div className={`text-[11px] mt-2 font-medium ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    Vendor: {pilot.applicantName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Scorecard Inspector & Auto-PO Generator */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            {/* Header of Selected Pilot */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Sandbox Testbed Corridor</span>
                <h3 className="text-base font-bold text-slate-900">{selectedPilot.sandboxEnvironment}</h3>
                <div className="text-xs text-slate-500 mt-1">
                  Applicant: <span className="font-semibold text-slate-800">{selectedPilot.applicantName}</span>
                </div>
              </div>

              {/* Score Dial Badge */}
              <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 p-3 rounded-2xl shrink-0">
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">Aggregate Score</span>
                  <span className={`text-2xl font-black ${isPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {currentScore}/100
                  </span>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                  isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {isPassed ? <Check className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                </div>
              </div>
            </div>

            {/* Individual KPI Sliders / Scorecard rows */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-govblue-800" />
                  Nodal Officer KPI Evaluation Breakdown
                </h4>
                <span className="text-[11px] text-slate-400">Target Benchmark ≥ 80% for auto-procurement</span>
              </div>

              <div className="space-y-3">
                {selectedPilot.scorecards.map((card, idx) => {
                  const currentMetricScore = scores[idx] ?? card.score;
                  const barColor = currentMetricScore >= 80 ? 'from-success-500 to-success-600' : 'from-warning-500 to-warning-600';
                  const barText = currentMetricScore >= 80 ? 'text-success-700' : 'text-warning-700';

                  return (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <span className="font-bold text-slate-800 text-xs block">{card.metric}</span>
                          <span className="text-[11px] text-slate-500">
                            Min Requirement: <strong className="text-slate-700">{card.target}</strong> | Field Result: <strong className="text-govblue-800">{card.achieved}</strong>
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className={`text-xs font-extrabold ${barText}`}>{currentMetricScore} / 100</span>
                        </div>
                      </div>

                      <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
                          style={{ width: `${Math.min(currentMetricScore, 100)}%` }}
                        />
                      </div>

                      {userRole === 'dept' && (
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={currentMetricScore}
                          onChange={(e) => setScores({ ...scores, [idx]: Number(e.target.value) })}
                          className="w-full accent-govblue-900 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Evaluator Remarks */}
            <div>
              <label className="font-bold text-slate-800 text-xs block mb-1">
                Nodal Officer Field Assessment Notes
              </label>
              <textarea
                rows={2}
                disabled={userRole !== 'dept'}
                value={evaluatorNotes}
                onChange={(e) => setEvaluatorNotes(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-govblue-800/20"
              />
            </div>

            {/* Auto-PO Procurement Trigger Box */}
            <div className="border-t border-slate-100 pt-5">
              {(existingPO || poGenerated) ? (
                <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-5 rounded-2xl space-y-3 shadow-lg border border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="w-6 h-6 text-amber-400" />
                      <span className="font-bold text-sm">Official Government Purchase Order Sanctioned</span>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 font-mono text-xs px-2 py-0.5 rounded border border-emerald-400/30">
                      Auto-PO Issued
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white/5 p-3 rounded-xl text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">PO NUMBER</span>
                      <span className="text-amber-300 font-bold">
                        {(existingPO || poGenerated)?.poNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">SANCTION VALUE</span>
                      <span className="text-white font-bold">
                        {formatINRMoney(((existingPO || poGenerated)?.finalPoValue || 0))}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">RULE CLAUSE</span>
                      <span className="text-slate-300 text-[10px]">GFR Rule 149 (Startup Fast-Track)</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300">
                    Vendor is now cataloged in the <strong>MahaSetu Cross-Department Scale Registry</strong>. Other state departments can procure this solution without repetitive tendering.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <div className="font-bold text-slate-900 text-xs">
                      {isPassed ? 'Threshold Reached (Score ≥ 80)' : 'Awaiting Benchmark Threshold'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {isPassed 
                        ? 'Eligible for instant direct procurement under Maharashtra Startup Policy'
                        : 'Increase scores to meet minimum threshold of 80 to unlock auto-PO'}
                    </div>
                  </div>

                  <button
                    disabled={!isPassed}
                    onClick={handleIssuePO}
                    className={`flex items-center space-x-2 text-xs font-bold px-5 py-2.5 rounded-xl shadow transition ${
                      isPassed
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Approve & Issue Auto-PO</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
