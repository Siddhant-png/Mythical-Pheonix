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
  ExternalLink
} from 'lucide-react';
import { Manufacturer, Problem, Startup, Collaboration } from '../types';
import { LegalNDAModal } from '../components/LegalNDAModal';

interface ManufacturerCollabHubProps {
  manufacturers: Manufacturer[];
  problems: Problem[];
  startup: Startup;
  collaborations: Collaboration[];
  onAddNewCollaboration: (collab: Collaboration) => void;
  preSelectedProblem?: Problem | null;
}

export const ManufacturerCollabHub: React.FC<ManufacturerCollabHubProps> = ({
  manufacturers,
  problems,
  startup,
  collaborations,
  onAddNewCollaboration,
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
    <div className="space-y-8">
      {/* Top Banner explaining the Unlocking of Eligibility */}
      <div className="bg-gradient-to-r from-amber-600 via-saffron-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold text-amber-100 mb-3 backdrop-blur-md">
            <Handshake className="w-4 h-4 text-amber-200" />
            <span>Turnover & Credibility Unlock Module</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans']">
            Startup Innovation + Manufacturer Scale
          </h2>
          <p className="mt-2 text-sm text-amber-100 leading-relaxed">
            Government tenders traditionally require ₹5Cr+ annual audited turnover and prior deployment track records. By forming a legally bound Consortium on MahaSetu under an auto-drafted <strong>Mutual NDA</strong>, the manufacturer provides the financial solvency and production capacity, while your startup leads the technical innovation.
          </p>
        </div>
      </div>

      {/* Active Consortiums Panel */}
      {collaborations.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
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
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      mfr.openToCollaborate 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {mfr.openToCollaborate ? '● Open to Partner' : 'At Capacity'}
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
                    <button
                      disabled={!mfr.openToCollaborate}
                      onClick={() => handleStartCollab(mfr)}
                      className={`flex items-center space-x-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition ${
                        mfr.openToCollaborate
                          ? 'bg-amber-600 hover:bg-amber-700 text-white shadow'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Team Up & Sign M-NDA</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
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
