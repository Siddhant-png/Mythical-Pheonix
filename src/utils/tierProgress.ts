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
  { tier: 'IDEA', level: 1, label: 'Idea / Problem Solving', description: 'A solution has been submitted against a government problem.', requirement: 'Submitted application' },
  { tier: 'PILOT_READY', level: 2, label: 'Pilot Ready', description: 'The solution has been selected for a monitored sandbox pilot.', requirement: 'Pilot approved or running' },
  { tier: 'PILOT_VALIDATED', level: 3, label: 'Pilot Validated', description: 'The pilot has completed evaluation successfully.', requirement: 'Pilot status is PASSED' },
  { tier: 'PROCUREMENT_READY', level: 4, label: 'Procurement Ready', description: 'The validated solution meets the direct procurement threshold.', requirement: 'Passed pilot with score of 80 or higher' },
  { tier: 'PROCURRED', level: 5, label: 'Procured', description: 'A government purchase order has been issued.', requirement: 'Linked procurement order' },
  { tier: 'SCALED', level: 6, label: 'Scaled / Adopted', description: 'Additional departments or locations have adopted the solution.', requirement: 'At least one scale adoption' }
];

export const calculateStartupTier = (
  application: Application | undefined,
  pilot: Pilot | undefined,
  procurement: Procurement | undefined,
  adoptions: ScaleAdoption[]
): StartupTierStatus => {
  const completed: StartupTier[] = [];

  if (application) completed.push('IDEA');

  const pilotReady = Boolean(pilot && (
    application?.status === 'PILOT_APPROVED' ||
    pilot.status === 'RUNNING' ||
    pilot.status === 'EVALUATION_PENDING' ||
    pilot.status === 'PASSED'
  ));
  if (pilotReady) completed.push('PILOT_READY');

  const pilotValidated = pilot?.status === 'PASSED';
  if (pilotValidated) completed.push('PILOT_VALIDATED');

  const procurementReady = Boolean(pilotValidated && (pilot?.aggregateScore || 0) >= 80);
  if (procurementReady) completed.push('PROCUREMENT_READY');

  if (procurement) completed.push('PROCURRED');
  if (adoptions.length > 0) completed.push('SCALED');

  const currentTier = completed.length > 0 ? completed[completed.length - 1] : null;
  const completedSet = new Set(completed);
  const stateByTier = TIER_DEFINITIONS.reduce<Record<StartupTier, 'COMPLETED' | 'CURRENT' | 'UPCOMING'>>((states, definition) => {
    states[definition.tier] = completedSet.has(definition.tier) ? 'COMPLETED' : 'UPCOMING';
    return states;
  }, {} as Record<StartupTier, 'COMPLETED' | 'CURRENT' | 'UPCOMING'>);

  if (currentTier) stateByTier[currentTier] = 'CURRENT';

  return {
    currentTier,
    completedTiers: completed,
    upcomingTiers: TIER_DEFINITIONS.map(definition => definition.tier).filter(tier => !completedSet.has(tier)),
    stateByTier,
    evidence: {
      applicationId: application?.id,
      pilotId: pilot?.id,
      procurementId: procurement?.id,
      scaleAdoptionIds: adoptions.map(adoption => adoption.id)
    }
  };
};