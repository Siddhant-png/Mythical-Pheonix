import React, { useMemo, useState } from 'react';
import { CheckCircle2, Milestone, Search } from 'lucide-react';
import { Application, Pilot, Procurement, ScaleAdoption } from '../types';
import { calculateStartupTier, TIER_DEFINITIONS } from '../utils/tierProgress';
import { TierBadge } from '../components/tier/TierBadge';
import { TierDetailsCard } from '../components/tier/TierDetailsCard';
import { TierProgress } from '../components/tier/TierProgress';
import { TierTimeline } from '../components/tier/TierTimeline';

interface TierRegistryProps {
  applications: Application[];
  pilots: Pilot[];
  procurements: Procurement[];
  scaleAdoptions: ScaleAdoption[];
}

export const TierRegistry: React.FC<TierRegistryProps> = ({ applications, pilots, procurements, scaleAdoptions }) => {
  const [selectedPilotId, setSelectedPilotId] = useState(pilots[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  const records = useMemo(() => pilots.map(pilot => {
    const application = applications.find(item => item.id === pilot.applicationId);
    const procurement = procurements.find(item => item.pilotId === pilot.id);
    const adoptions = procurement ? scaleAdoptions.filter(item => item.procurementId === procurement.id) : [];
    return {
      pilot,
      application,
      procurement,
      adoptions,
      status: calculateStartupTier(application, pilot, procurement, adoptions)
    };
  }), [applications, pilots, procurements, scaleAdoptions]);

  const filteredRecords = records.filter(record => `${record.pilot.problemTitle} ${record.pilot.applicantName}`.toLowerCase().includes(searchQuery.toLowerCase()));
  const selectedRecord = records.find(record => record.pilot.id === selectedPilotId) || filteredRecords[0];

  return (
    <div className="mx-auto max-w-7xl space-y-8 font-body">
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-slate-950 via-govblue-950 to-emerald-950 p-7 text-white shadow-[0_20px_60px_rgba(11,37,69,0.2)] sm:p-10">
        <div className="relative z-10 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-amber-200"><Milestone className="h-3.5 w-3.5" /> Startup innovation lifecycle</div>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl">Make progress visible. Earn the next tier.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">Track every solution from problem-solving through pilot validation, procurement, and cross-department adoption using verifiable workflow evidence.</p>
        </div>
      </section>

      {records.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm"><Milestone className="mx-auto h-9 w-9 text-slate-300" /><h3 className="mt-3 font-bold text-slate-800">No tier records yet</h3><p className="mt-1 text-xs text-slate-500">Submit a solution to begin tracking its procurement lifecycle.</p></div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="space-y-4">
            <div className="flex items-end justify-between gap-3"><div><h3 className="text-base font-black text-slate-900">Tracked solutions</h3><p className="mt-1 text-xs text-slate-500">Each tier is calculated from linked records.</p></div><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black text-emerald-700">{records.length} records</span></div>
            <div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" /><input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="Search solution or startup" className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-govblue-500 focus:ring-2 focus:ring-govblue-100" /></div>
            <div className="space-y-2.5">
              {filteredRecords.map(record => <button key={record.pilot.id} type="button" onClick={() => setSelectedPilotId(record.pilot.id)} className={`w-full rounded-2xl border p-4 text-left transition ${selectedRecord?.pilot.id === record.pilot.id ? 'border-govblue-800 bg-govblue-950 text-white shadow-md' : 'border-slate-200 bg-white hover:border-govblue-300'}`}><div className="flex items-start justify-between gap-3"><span className={`text-xs font-black leading-5 ${selectedRecord?.pilot.id === record.pilot.id ? 'text-white' : 'text-slate-900'}`}>{record.pilot.problemTitle}</span><TierBadge tier={record.status.currentTier} compact /></div><span className={`mt-2 block text-[11px] ${selectedRecord?.pilot.id === record.pilot.id ? 'text-slate-300' : 'text-slate-500'}`}>{record.pilot.applicantName}</span></button>)}
            </div>
          </section>

          {selectedRecord && <section className="space-y-5"><TierDetailsCard status={selectedRecord.status} solutionName={selectedRecord.pilot.problemTitle} /><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><TierProgress status={selectedRecord.status} /></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><h3 className="text-sm font-black text-slate-900">Tier progression</h3></div><TierTimeline status={selectedRecord.status} /></div></section>}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">{TIER_DEFINITIONS.slice(0, 3).map(definition => <div key={definition.tier} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Tier {definition.level}</span><h4 className="mt-1 text-sm font-black text-slate-900">{definition.label}</h4><p className="mt-1 text-xs leading-5 text-slate-500">{definition.requirement}</p></div>)}</div>
    </div>
  );
};