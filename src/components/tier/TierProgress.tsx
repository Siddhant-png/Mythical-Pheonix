import React from 'react';
import { Check, Circle } from 'lucide-react';
import { StartupTierStatus } from '../../types';
import { TIER_DEFINITIONS } from '../../utils/tierProgress';

interface TierProgressProps {
  status: StartupTierStatus;
}

export const TierProgress: React.FC<TierProgressProps> = ({ status }) => (
  <div className="space-y-3 font-body">
    <div className="flex items-center justify-between text-xs font-bold text-slate-500">
      <span>Upvote Tier Ranking (5 Parts)</span>
      <span>Rank {status.currentTier ? status.currentTier.replace('RANK_', '') : 5} of 5</span>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div className="h-full rounded-full bg-gradient-to-r from-amber-500 via-emerald-500 to-indigo-600 transition-all" style={{ width: `${(status.completedTiers.length / TIER_DEFINITIONS.length) * 100}%` }} />
    </div>
    <div className="grid grid-cols-5 gap-1">
      {TIER_DEFINITIONS.map(definition => {
        const state = status.stateByTier[definition.tier];
        return (
          <div key={definition.tier} className="flex flex-col items-center gap-1 text-center">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black ${state === 'CURRENT' ? 'bg-slate-900 text-white ring-4 ring-slate-200' : state === 'COMPLETED' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
              {state === 'COMPLETED' ? <Check className="h-3.5 w-3.5" /> : state === 'CURRENT' ? definition.level : <Circle className="h-3 w-3" />}
            </span>
            <span className="hidden text-[9px] font-bold leading-tight text-slate-500 sm:block">R{definition.level}</span>
          </div>
        );
      })}
    </div>
  </div>
);