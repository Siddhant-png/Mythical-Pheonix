import React, { useState } from 'react';
import { FilePlus2, ShieldCheck } from 'lucide-react';
import { Pilot, Procurement } from '../../types';
import { formatINRMoney } from '../../utils/format';

export type ProcurementDraft = Pick<Procurement, 'pilotId' | 'problemTitle' | 'vendorName' | 'poNumber' | 'finalPoValue' | 'gfrRuleReference' | 'deliveryTimelineWeeks' | 'issuedAt' | 'adoptionsCount'>;

interface ProcurementCreationFormProps {
  eligiblePilots: Pilot[];
  existingProcurementPilotIds: string[];
  onCreate: (draft: ProcurementDraft) => void;
}

export const ProcurementCreationForm: React.FC<ProcurementCreationFormProps> = ({ eligiblePilots, existingProcurementPilotIds, onCreate }) => {
  const availablePilots = eligiblePilots.filter(pilot => !existingProcurementPilotIds.includes(pilot.id));
  const [selectedPilotId, setSelectedPilotId] = useState(availablePilots[0]?.id || '');
  const [poNumber, setPoNumber] = useState('');
  const [finalPoValue, setFinalPoValue] = useState(3800000);
  const [gfrRuleReference, setGfrRuleReference] = useState('GFR-2017 Rule 149 / Maharashtra Startup Policy Sec 4.2');
  const [deliveryTimelineWeeks, setDeliveryTimelineWeeks] = useState(6);
  const [issuedAt, setIssuedAt] = useState(new Date().toISOString().split('T')[0]);
  const selectedPilot = availablePilots.find(pilot => pilot.id === selectedPilotId);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedPilot || !poNumber.trim() || finalPoValue <= 0 || deliveryTimelineWeeks <= 0) return;
    onCreate({ pilotId: selectedPilot.id, problemTitle: selectedPilot.problemTitle, vendorName: selectedPilot.applicantName, poNumber: poNumber.trim(), finalPoValue, gfrRuleReference: gfrRuleReference.trim(), deliveryTimelineWeeks, issuedAt, adoptionsCount: 0 });
    setPoNumber('');
  };

  return <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-sm"><div className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white"><FilePlus2 className="h-5 w-5" /></div><div><h3 className="text-sm font-black text-emerald-950">Issue a procurement order</h3><p className="mt-1 text-xs leading-5 text-emerald-800">Authorized mock users can create a PO only after a pilot is marked PASSED and scores at least 80/100.</p></div></div>{availablePilots.length === 0 ? <div className="mt-4 rounded-xl border border-emerald-200 bg-white p-3 text-xs text-emerald-800"><ShieldCheck className="mr-1 inline h-4 w-4" />No pilot-validated solutions are waiting for procurement.</div> : <form onSubmit={handleSubmit} className="mt-5 grid gap-3 md:grid-cols-2"><label className="text-xs font-bold text-slate-700 md:col-span-2">Validated pilot<select value={selectedPilotId} onChange={event => setSelectedPilotId(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs">{availablePilots.map(pilot => <option key={pilot.id} value={pilot.id}>{pilot.problemTitle} · {pilot.applicantName}</option>)}</select></label><label className="text-xs font-bold text-slate-700">PO number<input required value={poNumber} onChange={event => setPoNumber(event.target.value)} placeholder="MAHA-GOV-PO-2026-00401" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs" /></label><label className="text-xs font-bold text-slate-700">Final PO value (INR)<input required type="number" min="1" value={finalPoValue} onChange={event => setFinalPoValue(Number(event.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs" /><span className="mt-1 block text-[10px] text-slate-500">Preview: {formatINRMoney(finalPoValue)}</span></label><label className="text-xs font-bold text-slate-700">GFR rule reference<input required value={gfrRuleReference} onChange={event => setGfrRuleReference(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs" /></label><label className="text-xs font-bold text-slate-700">Delivery timeline (weeks)<input required type="number" min="1" value={deliveryTimelineWeeks} onChange={event => setDeliveryTimelineWeeks(Number(event.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs" /></label><label className="text-xs font-bold text-slate-700">Issue date<input required type="date" value={issuedAt} onChange={event => setIssuedAt(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs" /></label><div className="flex items-end md:justify-end"><button type="submit" className="w-full rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-black text-white shadow-sm hover:bg-emerald-800 md:w-auto">Create procurement order</button></div></form>}</section>;
};