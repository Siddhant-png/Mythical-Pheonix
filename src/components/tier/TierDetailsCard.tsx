import React from 'react';
import { FileCheck, Landmark, Rocket, ShieldCheck } from 'lucide-react';
import { StartupTierStatus } from '../../types';
import { TIER_DEFINITIONS } from '../../utils/tierProgress';
import { TierBadge } from './TierBadge';

interface TierDetailsCardProps {
  status: StartupTierStatus;
  solutionName: string;
}

export const TierDetailsCard: React.FC<TierDetailsCardProps> = ({ status, solutionName }) => {
  const currentDefinition = TIER_DEFINITIONS.find(item => item.tier === status.currentTier);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-govblue-950 via-slate-900 to-emerald-950 p-6 text-white shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">Current solution tier</span>
          <h3 className="mt-2 text-xl font-black leading-tight">{solutionName}</h3>
        </div>
        <TierBadge tier={status.currentTier} />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{currentDefinition?.description || 'Submit an application to enter the government innovation lifecycle.'}</p>
      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        <div className="rounded-2xl bg-white/10 p-3"><Rocket className="h-4 w-4 text-amber-300" /><span className="mt-2 block text-[10px] font-bold uppercase text-slate-400">Application</span><span className="text-xs font-bold">{status.evidence.applicationId ? 'Linked' : 'Pending'}</span></div>
        <div className="rounded-2xl bg-white/10 p-3"><ShieldCheck className="h-4 w-4 text-emerald-300" /><span className="mt-2 block text-[10px] font-bold uppercase text-slate-400">Pilot evidence</span><span className="text-xs font-bold">{status.evidence.pilotId ? 'Linked' : 'Pending'}</span></div>
        <div className="rounded-2xl bg-white/10 p-3"><Landmark className="h-4 w-4 text-sky-300" /><span className="mt-2 block text-[10px] font-bold uppercase text-slate-400">Scale evidence</span><span className="text-xs font-bold">{status.evidence.scaleAdoptionIds.length} adoption(s)</span></div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs font-bold text-amber-200"><FileCheck className="h-4 w-4" /> Progress is evidence-based; no tier is promoted automatically.</div>
    </div>
  );
};