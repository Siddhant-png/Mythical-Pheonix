import React from 'react';
import { StartupTier } from '../../types';
import { TIER_DEFINITIONS } from '../../utils/tierProgress';

interface TierBadgeProps {
  tier: StartupTier | null;
  compact?: boolean;
}

export const TierBadge: React.FC<TierBadgeProps> = ({ tier, compact = false }) => {
  const definition = TIER_DEFINITIONS.find(item => item.tier === tier);

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-800">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] text-white">
        {definition?.level || 0}
      </span>
      {compact ? `Tier ${definition?.level || 0}` : definition?.label || 'Not started'}
    </span>
  );
};