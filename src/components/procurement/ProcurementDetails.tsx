import React from 'react';
import { CalendarDays, CheckCircle2, FileText, Landmark, MapPin, Milestone, PackageCheck, ShieldCheck } from 'lucide-react';
import { Application, Pilot, Procurement, ProcurementStatus, ScaleAdoption, StartupTierStatus, UserRole } from '../../types';
import { formatINRMoney } from '../../utils/format';
import { TierBadge } from '../tier/TierBadge';
import { TierProgress } from '../tier/TierProgress';
import { TierTimeline } from '../tier/TierTimeline';
import { ProcurementStatusBadge } from './ProcurementStatusBadge';
import { TIER_DEFINITIONS } from '../../utils/tierProgress';

interface ProcurementDetailsProps {
  procurement: Procurement;
  pilot?: Pilot;
  application?: Application;
  adoptions: ScaleAdoption[];
  tierStatus: StartupTierStatus;
  department: string;
  sector: string;
  status: ProcurementStatus;
  userRole: UserRole;
  onUpdateStatus: (procurementId: string, status: ProcurementStatus) => void;
}

export const ProcurementDetails: React.FC<ProcurementDetailsProps> = ({ procurement, pilot, application, adoptions, tierStatus, department, sector, status, userRole, onUpdateStatus }) => {
  const timeline = [
    { label: 'Pilot evidence', date: pilot?.startDate, detail: pilot ? `${pilot.status} · score ${pilot.aggregateScore}/100` : 'Not linked' },
    { label: 'Purchase order issued', date: procurement.issuedAt, detail: procurement.poNumber },
    ...adoptions.map(adoption => ({ label: 'Department adoption', date: adoption.adoptedOn, detail: adoption.adoptingDeptName }))
  ];
  const currentTierDefinition = TIER_DEFINITIONS.find(definition => definition.tier === tierStatus.currentTier);
  const nextTier = TIER_DEFINITIONS.find(definition => tierStatus.upcomingTiers.includes(definition.tier));

  return (
    <aside className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:self-start">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Procurement details</span>
          <h2 className="mt-1 text-lg font-black text-slate-900">{procurement.poNumber}</h2>
        </div>
        <div className="flex flex-col items-end gap-2">
          <ProcurementStatusBadge status={status} />
          {userRole === 'dept' && <select aria-label="Update procurement status" value={status} onChange={event => onUpdateStatus(procurement.id, event.target.value as ProcurementStatus)} className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-700"><option value="PENDING_DELIVERY">Pending delivery</option><option value="ACTIVE">Active</option><option value="COMPLETED">Completed</option></select>}
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        <div className="rounded-2xl bg-slate-50 p-3"><span className="text-[10px] font-bold uppercase text-slate-400">Associated problem</span><p className="mt-1 text-xs font-bold text-slate-800">{procurement.problemTitle}</p><p className="mt-1 text-[11px] text-slate-500">{department} · {sector}</p></div>
        <div className="rounded-2xl bg-slate-50 p-3"><span className="text-[10px] font-bold uppercase text-slate-400">Startup / vendor</span><p className="mt-1 text-xs font-bold text-slate-800">{procurement.vendorName}</p><p className="mt-1 text-[11px] text-slate-500">{application?.type || 'Procurement vendor'}</p></div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3"><span className="text-sm font-black text-emerald-700">₹</span><span className="mt-1 block text-[10px] font-bold uppercase text-emerald-700">Final amount</span><strong className="text-sm text-emerald-900">{formatINRMoney(procurement.finalPoValue)}</strong></div>
        <div className="rounded-2xl border border-sky-100 bg-sky-50 p-3"><CalendarDays className="h-4 w-4 text-sky-700" /><span className="mt-1 block text-[10px] font-bold uppercase text-sky-700">Issued</span><strong className="text-xs text-sky-900">{procurement.issuedAt}</strong></div>
      </div>

      <div className="space-y-2 text-xs">
        <InfoRow icon={<FileText />} label="Procurement ID" value={procurement.id} />
        <InfoRow icon={<ShieldCheck />} label="GFR rule" value={procurement.gfrRuleReference} />
        <InfoRow icon={<PackageCheck />} label="Delivery timeline" value={`${procurement.deliveryTimelineWeeks} weeks`} />
        <InfoRow icon={<Milestone />} label="Pilot" value={pilot ? `${pilot.status} · ${pilot.aggregateScore}/100` : 'Not linked'} />
      </div>

      <div className="space-y-4 rounded-2xl border border-amber-200 bg-amber-50 p-4"><div className="flex items-center justify-between gap-2"><span className="text-xs font-black text-amber-900">Current startup tier</span><TierBadge tier={tierStatus.currentTier} compact /></div><p className="text-[11px] leading-5 text-amber-800">{currentTierDefinition?.description || 'No lifecycle evidence has been linked yet.'} The tier is derived from completed mock workflow records.</p><div className="rounded-xl border border-amber-200 bg-white/70 p-3"><span className="text-[10px] font-black uppercase tracking-wider text-amber-700">Why this tier</span><p className="mt-1 text-xs font-bold text-amber-950">{currentTierDefinition?.requirement || 'Submit an application to begin.'}</p>{nextTier && <p className="mt-2 text-[11px] text-amber-800">Next: {nextTier.label} requires {nextTier.requirement.toLowerCase()}.</p>}</div><TierProgress status={tierStatus} /></div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4"><h3 className="mb-3 text-xs font-black text-slate-900">Lifecycle progression</h3><TierTimeline status={tierStatus} /></div>

      <div>
        <h3 className="mb-3 flex items-center gap-2 text-xs font-black text-slate-900"><Milestone className="h-4 w-4 text-govblue-700" /> Procurement timeline</h3>
        <div className="space-y-3 border-l-2 border-slate-200 pl-4">{timeline.map((event, index) => <div key={`${event.label}-${event.date}-${index}`} className="relative"><span className="absolute -left-[22px] top-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-600 ring-1 ring-emerald-200" /><span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">{event.label}</span><span className="mt-0.5 block text-xs font-bold text-slate-800">{event.detail}</span><span className="mt-0.5 block text-[10px] text-slate-500">{event.date || 'Date pending'}</span></div>)}</div>
      </div>

      <div><h3 className="mb-3 flex items-center gap-2 text-xs font-black text-slate-900"><Landmark className="h-4 w-4 text-govblue-700" /> Adoption details</h3>{adoptions.length === 0 ? <p className="rounded-xl bg-slate-50 p-3 text-xs text-slate-500">No additional departments have adopted this solution yet.</p> : <div className="space-y-2">{adoptions.map(adoption => <div key={adoption.id} className="rounded-xl border border-slate-200 p-3"><div className="flex items-start justify-between gap-2"><span className="text-xs font-bold text-slate-800">{adoption.adoptingDeptName}</span><CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /></div><span className="mt-1 flex items-center gap-1 text-[11px] text-slate-500"><MapPin className="h-3 w-3" />{adoption.deploymentLocation}</span><span className="mt-1 block text-[10px] font-bold text-slate-400">Adopted {adoption.adoptedOn}</span></div>)}</div>}</div>
    </aside>
  );
};

const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => <div className="flex items-start gap-2"><span className="mt-0.5 text-slate-400">{React.cloneElement(icon as React.ReactElement, { className: 'h-3.5 w-3.5' })}</span><span className="w-28 shrink-0 font-bold text-slate-500">{label}</span><span className="text-slate-700">{value}</span></div>;