import {
  Application,
  Pilot,
  Procurement,
  ScaleAdoption,
  StartupTier,
  StartupTierStatus,
  TierDefinition
} from '../types';

export const TIER_DEFINITIONS: TierDefinition[] = [
  { tier: 'RANK_1', level: 1, label: 'Rank 1 (Top Tier)', description: 'Highest community upvoted solution in the platform.', requirement: '>= 1,000 Upvotes' },
  { tier: 'RANK_2', level: 2, label: 'Rank 2 (High Tier)', description: 'High community endorsement and active support.', requirement: '500 - 999 Upvotes' },
  { tier: 'RANK_3', level: 3, label: 'Rank 3 (Mid Tier)', description: 'Moderate community upvotes and field traction.', requirement: '250 - 499 Upvotes' },
  { tier: 'RANK_4', level: 4, label: 'Rank 4 (Growing)', description: 'Growing community interest and pilot entries.', requirement: '100 - 249 Upvotes' },
  { tier: 'RANK_5', level: 5, label: 'Rank 5 (Emerging)', description: 'Initial community upvotes and entry stage.', requirement: '< 100 Upvotes' }
];

export function getRankFromUpvotes(upvotes: number = 0): StartupTier {
  if (upvotes >= 1000) return 'RANK_1';
  if (upvotes >= 500) return 'RANK_2';
  if (upvotes >= 250) return 'RANK_3';
  if (upvotes >= 100) return 'RANK_4';
  return 'RANK_5';
}

export const calculateStartupTier = (
  application: Application | undefined,
  pilot: Pilot | undefined,
  procurement: Procurement | undefined,
  adoptions: ScaleAdoption[],
  upvotes: number = 750
): StartupTierStatus => {
  const currentTier = getRankFromUpvotes(upvotes);

  const levelMap: Record<StartupTier, number> = {
    RANK_1: 1,
    RANK_2: 2,
    RANK_3: 3,
    RANK_4: 4,
    RANK_5: 5
  };

  const currentLevel = levelMap[currentTier];

  const completed: StartupTier[] = TIER_DEFINITIONS
    .filter(d => d.level >= currentLevel)
    .map(d => d.tier);

  const stateByTier = TIER_DEFINITIONS.reduce<Record<StartupTier, 'COMPLETED' | 'CURRENT' | 'UPCOMING'>>((states, definition) => {
    if (definition.tier === currentTier) {
      states[definition.tier] = 'CURRENT';
    } else if (definition.level > currentLevel) {
      states[definition.tier] = 'COMPLETED';
    } else {
      states[definition.tier] = 'UPCOMING';
    }
    return states;
  }, {} as Record<StartupTier, 'COMPLETED' | 'CURRENT' | 'UPCOMING'>);

  return {
    currentTier,
    completedTiers: completed,
    upcomingTiers: TIER_DEFINITIONS.map(d => d.tier).filter(t => t !== currentTier),
    stateByTier,
    evidence: {
      applicationId: application?.id,
      pilotId: pilot?.id,
      procurementId: procurement?.id,
      scaleAdoptionIds: adoptions.map(adoption => adoption.id)
    }
  };
};