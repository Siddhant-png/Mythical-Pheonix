import React, { useState } from 'react';
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
  CircleDot
} from 'lucide-react';
import { Manufacturer, Problem, Startup, Collaboration, AllianceProposal } from '../types';
import { LegalNDAModal } from '../components/LegalNDAModal';

interface ManufacturerCollabHubProps {
  manufacturers: Manufacturer[];
  problems: Problem[];
  startup: Startup;
  collaborations: Collaboration[];
  onAddNewCollaboration: (collab: Collaboration) => void;
  proposals: AllianceProposal[];
  onAcceptProposal: (proposalId: string) => void;
  onDeclineProposal: (proposalId: string) => void;
  onSendProposal: (proposal: AllianceProposal) => void;
  preSelectedProblem?: Problem | null;
}

export const ManufacturerCollabHub: React.FC<ManufacturerCollabHubProps> = ({
  manufacturers,
  problems,
  startup,
  collaborations,
  onAddNewCollaboration,
  proposals,
  onAcceptProposal,
  onDeclineProposal,
  onSendProposal,
  preSelectedProblem
}) => {
  const [selectedMfr, setSelectedMfr] = useState<Manufacturer | null>(null);
  const [targetProblem, setTargetProblem] = useState<Problem>(
    preSelectedProblem || problems[0]
  );
  const [roleSplitInput, setRoleSplitInput] = useState(
    'Startup: Vision AI algorithms, inference engine & cloud telemetry. Manufacturer: Ruggedized IP67 housing, SMT PCB fabrication, ISO batch testing & warranty.'
  );
  const [ndaModalOpen, setNdaModalOpen] = useState(false);
  const [mfrFilter, setMfrFilter] = useState('');

  const filteredMfrs = manufacturers.filter(m => 
    m.companyName.toLowerCase().includes(mfrFilter.toLowerCase()) ||
    m.facilitiesSectors.some(s => s.toLowerCase().includes(mfrFilter.toLowerCase()))
  );

  const handleStartCollab = (mfr: Manufacturer) => {
    setSelectedMfr(mfr);
    setNdaModalOpen(true);
  };

  const handleSendProposal = (mfr: Manufacturer) => {
    onSendProposal({
      id: `prop-${Date.now()}`,
      senderId: startup.id,
      senderName: startup.companyName,
      senderRole: 'startup',
      recipientId: mfr.id,
      recipientName: mfr.companyName,
      problemId: targetProblem.id,
      problemTitle: targetProblem.title,
      proposedRoleSplit: roleSplitInput,
      proposedStartupShare: 60,
      proposedPartnerShare: 40,
      turnoverPledged: mfr.annualTurnover,
      status: 'PENDING',
      sentAt: new Date().toISOString(),
      note: `Requesting a consortium alliance for ${targetProblem.title}.`
    });
  };

  const handleNDASigned = (collabId: string, roleSplit: string) => {
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
      ndaContract: {
        id: `nda-${Date.now()}`,
        collaborationId: collabId,
        ipProtectionClauses: 'Startup retains exclusive 100% intellectual property ownership of all AI algorithms, source code, and training pipelines.',
        commercialTerms: `Turnover backing pledged: ₹${(selectedMfr.annualTurnover / 10000000).toFixed(1)} Cr. Revenue split: 60% Startup, 40% Manufacturer.`,
        documentHash: '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
        startupSignedAt: new Date().toISOString(),
        manufacturerSignedAt: new Date().toISOString(),
        legalStatus: 'EXECUTED'
      }
    };
    onAddNewCollaboration(newCollab);
    setNdaModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 font-body">
      <div className="bg-gradient-to-r from-govblue-900 via-govblue-800 to-slate-950 text-white rounded-[28px] p-7 sm:p-10 shadow-[0_20px_60px_rgba(11,37,69,0.2)] relative overflow-hidden border border-govblue-700/80">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full text-[11px] font-bold text-sky-100 mb-4 backdrop-blur-sm border border-white/10">
            <Handshake className="w-4 h-4 text-saffron-300" />
            <span>Turnover & credibility unlock module</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] font-heading leading-[1.05] max-w-2xl">
            Startup innovation, manufacturer scale, one compliant path to market.
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            Government tenders traditionally require high turnover and prior deployment records. By forming a legally bound consortium on Converge under an auto-drafted mutual NDA, the manufacturer provides the financial solvency and production capacity while your startup leads technology.
          </p>
        </div>
      </div>

      {proposals.length > 0 && (
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">Teaming proposals</h3>
            <span className="text-xs font-bold text-slate-500">{proposals.filter(proposal => proposal.status === 'PENDING').length} awaiting response</span>
          </div>
          <div className="space-y-3">
            {proposals.map(proposal => (
              <div key={proposal.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-bold text-slate-900">{proposal.senderName} → {proposal.recipientName}</div>
                    <div className="mt-1 text-slate-600">{proposal.problemTitle}</div>
                    <div className="mt-1 text-slate-500">{proposal.proposedStartupShare}% startup / {proposal.proposedPartnerShare}% partner · {proposal.status}</div>
                  </div>
                  {proposal.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button onClick={() => onAcceptProposal(proposal.id)} className="rounded-lg bg-emerald-600 px-3 py-2 font-bold text-white">Accept</button>
                      <button onClick={() => onDeclineProposal(proposal.id)} className="rounded-lg border border-slate-300 px-3 py-2 font-bold text-slate-700">Decline</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Active Consortiums Panel */}
      {collaborations.length > 0 && (
        <div className="bg-brand-panel rounded-2xl border border-brand-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Stamp className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-base">Your Active Consortiums & Executed NDAs</h3>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
              {collaborations.length} Legally Bound
            </span>
          </div>

          <div className="space-y-3">
            {collaborations.map((collab) => (
              <div 
                key={collab.id} 
                className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">{collab.manufacturerName}</span>
                    <span className="text-[11px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold">
                      M-NDA EXECUTED
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 font-medium">
                    🎯 Target Challenge: <span className="font-semibold">{collab.problemTitle}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono bg-white/80 p-1.5 rounded border border-emerald-100 max-w-2xl">
                    ⚡ {collab.roleSplit}
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <div className="text-right text-xs">
                    <div className="font-bold text-emerald-800 flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>IP Protected</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Hash: {collab.ndaContract?.documentHash.slice(0, 10)}...
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manufacturer Directory */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Verified Manufacturers Directory (Maharashtra)</h3>
            <p className="text-xs text-slate-500">
              Contract manufacturers and fabrication facilities open for joint public bidding
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={mfrFilter}
              onChange={(e) => setMfrFilter(e.target.value)}
              placeholder="Filter by capability, SMT, tooling..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {filteredMfrs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-sm">
            <Factory className="w-9 h-9 text-slate-300 mx-auto mb-3" />
            <div className="font-bold text-slate-700">No manufacturers match that filter</div>
            <p className="text-xs text-slate-500 mt-1">Try a different capability search keyword or clear the current filters.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredMfrs.map((mfr) => {
            const isAlreadyTeamed = collaborations.some(
              c => c.manufacturerId === mfr.id && c.problemId === targetProblem.id
            );

            return (
              <div 
                key={mfr.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                        <Factory className="w-5 h-5 text-govblue-800" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">{mfr.companyName}</h4>
                        <div className="text-[11px] text-slate-500 font-mono">GST: {mfr.gstNumber}</div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      mfr.openToCollaborate 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      <CircleDot className="w-2.5 h-2.5 fill-current" />
                      {mfr.openToCollaborate ? 'Open to Partner' : 'At Capacity'}
                    </span>
                  </div>

                  {/* Financial Solvency & Manufacturing Specs */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Audited Turnover</span>
                      <span className="font-extrabold text-slate-900">
                        ₹{(mfr.annualTurnover / 10000000).toFixed(1)} Crores
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Annual Capacity</span>
                      <span className="font-bold text-slate-800">
                        {mfr.manufacturingCapacityUnits.toLocaleString()} units/yr
                      </span>
                    </div>
                  </div>

                  {/* Facilities / Badges */}
                  <div className="mb-4">
                    <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                      Tooling & Plant Capabilities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {mfr.facilitiesSectors.map((fac, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {fac}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    Rep: <span className="font-semibold text-slate-700">{mfr.contactPerson}</span>
                  </div>

                  {isAlreadyTeamed ? (
                    <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Consortium Active</span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button disabled={!mfr.openToCollaborate} onClick={() => handleSendProposal(mfr)} className="rounded-xl border border-amber-300 px-3 py-2 text-xs font-bold text-amber-800 disabled:cursor-not-allowed disabled:opacity-50">Send proposal</button>
                      <button disabled={!mfr.openToCollaborate} onClick={() => handleStartCollab(mfr)} className={`flex items-center space-x-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition ${mfr.openToCollaborate ? 'bg-amber-600 hover:bg-amber-700 text-white shadow' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Team Up & Sign M-NDA</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>

      {/* Render Legal NDA Modal */}
      {selectedMfr && (
        <LegalNDAModal
          isOpen={ndaModalOpen}
          onClose={() => setNdaModalOpen(false)}
          startup={startup}
          manufacturer={selectedMfr}
          problem={targetProblem}
          roleSplitText={roleSplitInput}
          onCompleteAgreement={handleNDASigned}
        />
      )}
    </div>
  );
};
