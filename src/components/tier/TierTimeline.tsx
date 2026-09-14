import React from 'react';
import { Check, Circle, LockKeyhole } from 'lucide-react';
import { StartupTierStatus } from '../../types';
import { TIER_DEFINITIONS } from '../../utils/tierProgress';

interface TierTimelineProps {
  status: StartupTierStatus;
}

export const TierTimeline: React.FC<TierTimelineProps> = ({ status }) => (
  <div className="space-y-3">
    {TIER_DEFINITIONS.map(definition => {
      const state = status.stateByTier[definition.tier];
      return (
        <div key={definition.tier} className={`flex gap-3 rounded-2xl border p-4 ${state === 'CURRENT' ? 'border-slate-900 bg-slate-900 text-white shadow-md' : state === 'COMPLETED' ? 'border-emerald-200 bg-emerald-50/60' : 'border-slate-200 bg-white'}`}>
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${state === 'CURRENT' ? 'bg-amber-400 text-slate-900' : state === 'COMPLETED' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
            {state === 'COMPLETED' ? <Check className="h-4 w-4" /> : state === 'CURRENT' ? <Circle className="h-4 w-4 fill-current" /> : <LockKeyhole className="h-4 w-4" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className={`text-sm font-black ${state === 'CURRENT' ? 'text-white' : 'text-slate-900'}`}>Tier {definition.level} · {definition.label}</h4>
              <span className={`text-[10px] font-black uppercase tracking-wider ${state === 'CURRENT' ? 'text-amber-300' : state === 'COMPLETED' ? 'text-emerald-700' : 'text-slate-400'}`}>{state}</span>
            </div>
            <p className={`mt-1 text-xs leading-5 ${state === 'CURRENT' ? 'text-slate-300' : 'text-slate-500'}`}>{definition.description}</p>
            <p className={`mt-2 text-[11px] font-bold ${state === 'CURRENT' ? 'text-amber-200' : 'text-slate-600'}`}>Evidence: {definition.requirement}</p>
          </div>
        </div>
      );
    })}
  </div>
);