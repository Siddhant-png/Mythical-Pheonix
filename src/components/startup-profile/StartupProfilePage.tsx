import React, { useState } from 'react';
import { Award, ExternalLink, Flame, Globe, Rocket, TrendingUp } from 'lucide-react';
import { StartupProfileData } from '../../types';
import { ProfileSection } from './ProfileSection';
import { ProfileSummaryCard } from './ProfileSummaryCard';
import { StatCard } from './StatCard';
import { PinnedWinsList } from './PinnedWinsList';
import { ProfileTimeline } from './ProfileTimeline';
import { AllianceList } from './AllianceList';
import { EditProfileModal } from './EditProfileModal';
import { ProjectShowcase } from './ProjectShowcase';

interface StartupProfilePageProps {
  profile: StartupProfileData;
  mode?: 'my' | 'public';
  onSaveProfile?: (profile: StartupProfileData) => void;
}

export const StartupProfilePage: React.FC<StartupProfilePageProps> = ({ profile, mode = 'public', onSaveProfile }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'overview' | 'projects'>('overview');
  const statsCards = [
    {
      label: 'Active Pilots',
      value: `${profile.stats.activePilots}`,
      subtext: 'Live evaluation streams',
      tone: 'emerald' as const
    },
    {
      label: 'Consortiums',
      value: `${profile.stats.consortiums}`,
      subtext: 'Cross-org collaborations',
      tone: 'purple' as const
    },
    {
      label: 'PO Wins',
      value: `${profile.stats.poWins}`,
      subtext: 'Public procurement wins',
      tone: 'amber' as const
    },
    {
      label: 'Scale Adoptions',
      value: `${profile.stats.scaleAdoptions}`,
      subtext: 'Replicated deployments',
      tone: 'sky' as const
    },
    {
      label: 'Readiness',
      value: `${profile.stats.readinessScore}/100`,
      subtext: 'Public sector readiness',
      tone: 'slate' as const
    }
  ];

  return (
    <div className="space-y-6">
      <ProfileSummaryCard
        profile={profile}
        mode={mode}
        onEditProfile={mode === 'my' ? () => setIsEditModalOpen(true) : undefined}
      />

      {mode === 'my' && onSaveProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedProfile) => {
            onSaveProfile(updatedProfile);
            setIsEditModalOpen(false);
          }}
        />
      )}

      <div role="tablist" aria-label="Startup profile sections" className="flex gap-2 border-b border-slate-200">
        {([{ id: 'overview', label: 'Overview' }, { id: 'projects', label: 'Projects' }] as const).map((tab) => (
          <button key={tab.id} id={`${tab.id}-tab`} type="button" onClick={() => setActiveProfileTab(tab.id)} aria-controls={`${tab.id}-panel`} aria-selected={activeProfileTab === tab.id} role="tab" className={`border-b-2 px-3 py-2.5 text-sm font-bold transition ${activeProfileTab === tab.id ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeProfileTab === 'projects' && <div id="projects-panel" role="tabpanel" aria-labelledby="projects-tab"><ProjectShowcase projects={profile.projects} /></div>}

      {activeProfileTab === 'overview' && <div id="overview-panel" role="tabpanel" aria-labelledby="overview-tab"><>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {statsCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <ProfileSection title="Highlights" subtitle="What makes this startup stand out in public procurement and scale-readiness.">
            <div className="grid gap-3 sm:grid-cols-2">
              {profile.highlights.map((highlight) => (
                <div key={highlight.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                      <Award className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">{highlight.label}</span>
                  </div>
                  <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-bold uppercase text-slate-700">
                    {highlight.type}
                  </span>
                </div>
              ))}
            </div>
          </ProfileSection>

          <ProfileSection title="Pinned wins" subtitle="The most visible wins that signal traction, trust, and scalable impact.">
            <PinnedWinsList wins={profile.pinnedWins} />
          </ProfileSection>

          <ProfileSection title="Activity timeline" subtitle="Major milestones from pilot launches to public-sector expansion.">
            <ProfileTimeline events={profile.timeline} />
          </ProfileSection>
        </div>

        <div className="space-y-6">
          <ProfileSection title="Alliances" subtitle="Strategic partners and ecosystem supporters.">
            <AllianceList alliances={profile.alliances} />
          </ProfileSection>

          <ProfileSection
            title="Quick signals"
            subtitle="Signals useful to departments, manufacturers, and partners."
            action={<span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">Live</span>}
          >
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <span className="font-semibold">Public readiness</span>
                <span className="font-black text-emerald-700">{profile.stats.readinessScore}/100</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <span className="font-semibold">Innovation stack</span>
                <span className="font-bold text-slate-900">{profile.techDomains.length} domains</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <span className="font-semibold">Last milestone</span>
                <span className="font-bold text-slate-900">{profile.timeline[0]?.date}</span>
              </div>
            </div>
          </ProfileSection>

          <ProfileSection title="Connect" subtitle="Open channels for procurement and collaboration.">
            <div className="space-y-3 text-sm">
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 hover:border-slate-300">
                  <span className="inline-flex items-center gap-2"><Globe className="h-4 w-4 text-sky-600" /> Website</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 hover:border-slate-300">
                  <span className="inline-flex items-center gap-2"><Rocket className="h-4 w-4 text-violet-600" /> LinkedIn</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {profile.twitter && (
                <a href={profile.twitter} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 hover:border-slate-300">
                  <span className="inline-flex items-center gap-2"><Flame className="h-4 w-4 text-amber-500" /> X / Twitter</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <div className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700">
                <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-emerald-600" /> <span className="font-semibold">Readiness score</span></div>
                <div className="mt-2 text-2xl font-black text-slate-900">{profile.stats.readinessScore}/100</div>
              </div>
            </div>
          </ProfileSection>
        </div>
      </div>
      </></div>}
    </div>
  );
};
