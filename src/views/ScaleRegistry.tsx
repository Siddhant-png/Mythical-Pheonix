import React, { useState } from 'react';
import { 
  Repeat, 
  Building2, 
  CheckCircle2, 
  Plus, 
  Layers, 
  FileCheck, 
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';
import { Procurement, ScaleAdoption } from '../types';

interface ScaleRegistryProps {
  procurements: Procurement[];
  scaleAdoptions: ScaleAdoption[];
  onAdoptSolution: (adoption: ScaleAdoption) => void;
  userRole: 'startup' | 'dept' | 'manufacturer';
}

export const ScaleRegistry: React.FC<ScaleRegistryProps> = ({
  procurements,
  scaleAdoptions,
  onAdoptSolution,
  userRole
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProcurement, setSelectedProcurement] = useState<Procurement | null>(null);
  const [adoptingDept, setAdoptingDept] = useState('Chhatrapati Sambhajinagar Smart City Development Corp');
  const [location, setLocation] = useState('Waluj Industrial Area Distribution Zone');
  const [contractVal, setContractVal] = useState<number>(2500000);
  const [successNotice, setSuccessNotice] = useState(false);

  const handleOpenAdopt = (proc: Procurement) => {
    setSelectedProcurement(proc);
    setModalOpen(true);
  };

  const handleConfirmAdoption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProcurement) return;

    const newAdoption: ScaleAdoption = {
      id: `scale-${Date.now()}`,
      procurementId: selectedProcurement.id,
      originalDeptName: 'Water Resources & Sanitation Dept, Govt of Maharashtra',
      solutionTitle: selectedProcurement.problemTitle,
      vendorName: selectedProcurement.vendorName,
      adoptingDeptName: adoptingDept,
      adoptedOn: new Date().toISOString().split('T')[0],
      addonContractValue: contractVal,
      deploymentLocation: location
    };

    onAdoptSolution(newAdoption);
    setSuccessNotice(true);
    setTimeout(() => {
      setSuccessNotice(false);
      setModalOpen(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Hero Strip */}
      <div className="bg-gradient-to-r from-govblue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-govblue-800">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-sky-400/30">
            <Repeat className="w-3.5 h-3.5 text-sky-400" />
            <span>Scale Across Maharashtra</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans']">
            "Procure Once, Deploy Anywhere" Scale Registry
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            The biggest waste in public administration is running identical 6-month tenders in every municipality. On MahaSetu, when a solution completes a successful pilot in one department, it receives <strong>State-Wide Verified Vendor Status</strong>, allowing any other Maharashtra department, municipal corporation, or Zilla Parishad to adopt it via add-on purchase orders.
          </p>
        </div>
      </div>

      {/* Verified Solutions Available for Direct Adoption */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Verified & Proven Government Solutions</h3>
            <p className="text-xs text-slate-500">Solutions with completed sandbox scorecards & active state POs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {procurements.map((proc) => {
            const adoptions = scaleAdoptions.filter(s => s.procurementId === proc.id);

            return (
              <div 
                key={proc.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>STATE VERIFIED VENDOR</span>
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-bold">
                      PO: {proc.poNumber}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 leading-snug">
                    {proc.problemTitle}
                  </h4>

                  <div className="text-xs text-slate-600 mt-1">
                    Primary Vendor: <span className="font-semibold text-slate-800">{proc.vendorName}</span>
                  </div>

                  <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Primary Sanction:</span>
                      <span className="font-bold text-slate-900">₹{(proc.finalPoValue / 100000).toFixed(1)} Lakhs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Adoptions Across Maharashtra:</span>
                      <span className="font-extrabold text-govblue-800">{adoptions.length} Departments</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Rule 149 Re-use Eligible
                  </span>

                  <button
                    onClick={() => handleOpenAdopt(proc)}
                    className="flex items-center space-x-1.5 text-xs font-bold bg-govblue-900 hover:bg-govblue-800 text-white px-4 py-2 rounded-xl shadow-sm transition"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-300" />
                    <span>Replicate / Adopt for My Dept</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live State-Wide Adoption Feed */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-govblue-800" />
            <h3 className="font-bold text-slate-900 text-sm">State-Wide Rollout Ledger (`SCALE_ADOPTION`)</h3>
          </div>
          <span className="text-xs font-bold text-govblue-900 bg-govblue-50 px-3 py-1 rounded-full border border-govblue-200">
            {scaleAdoptions.length} Active Cross-Deployments
          </span>
        </div>

        <div className="space-y-3">
          {scaleAdoptions.map((item) => (
            <div 
              key={item.id}
              className="border border-slate-200 bg-slate-50/70 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">{item.adoptingDeptName}</span>
                  <span className="text-[10px] bg-sky-100 text-sky-800 font-semibold px-2 py-0.5 rounded">
                    Adopted on {item.adoptedOn}
                  </span>
                </div>
                <div className="text-slate-600">
                  Solution: <span className="font-medium text-slate-800">{item.solutionTitle}</span> ({item.vendorName})
                </div>
                <div className="flex items-center text-slate-500 gap-1 text-[11px]">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>{item.deploymentLocation}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Add-on Contract Value</span>
                <span className="font-extrabold text-sm text-slate-900">
                  ₹{(item.addonContractValue / 100000).toFixed(1)} Lakhs
                </span>
                <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                  ✓ Tender Cycle Saved: ~4 Months
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Adoption Modal */}
      {modalOpen && selectedProcurement && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden text-xs">
            <div className="p-5 bg-govblue-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Fast-Track Requisition</span>
                <h3 className="text-base font-bold mt-0.5">Adopt Proven Solution for Your Department</h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleConfirmAdoption} className="p-5 space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Selected Verified Solution:</span>
                <div className="font-bold text-slate-900 mt-0.5">{selectedProcurement.problemTitle}</div>
                <div className="text-slate-600 mt-1">Vendor: {selectedProcurement.vendorName}</div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Your Department / Municipal Body</label>
                <input 
                  type="text"
                  value={adoptingDept}
                  onChange={(e) => setAdoptingDept(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Deployment Location / Jurisdiction</label>
                <input 
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Add-on Contract Requisition Value (INR)</label>
                <input 
                  type="number"
                  value={contractVal}
                  onChange={(e) => setContractVal(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border border-slate-200 font-bold"
                  required
                />
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                By clicking confirm, an add-on Purchase Order schedule is initiated citing Maharashtra Public Procurement Exemption Rule 149. No separate Request for Proposal (RFP) required.
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-govblue-900 hover:bg-govblue-800 text-white font-bold px-4 py-2 rounded-xl"
                >
                  {successNotice ? 'Adoption Sanctioned!' : 'Confirm Scale Requisition'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
