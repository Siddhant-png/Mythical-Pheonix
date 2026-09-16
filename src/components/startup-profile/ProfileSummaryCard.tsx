import React, { useEffect, useState } from 'react';
import { ExternalLink, Globe, MapPin, Calendar, ShieldCheck, Linkedin, Twitter, Mail, Sparkles } from 'lucide-react';
import { StartupProfileData } from '../../types';

const bannerStyles = {
  saffron: 'from-[#ffedd5] via-[#f59e0b] to-[#7c2d12]',
  emerald: 'from-[#d1fae5] via-[#10b981] to-[#064e3b]',
  govblue: 'from-[#dbeafe] via-[#2563eb] to-[#0f172a]',
  purple: 'from-[#f3e8ff] via-[#8b5cf6] to-[#3b0764]',
  sunset: 'from-[#ffedd5] via-[#fb7185] to-[#7c2d12]'
} as const;

export const ProfileSummaryCard: React.FC<{
  profile: StartupProfileData;
  mode?: 'my' | 'public';
  onEditProfile?: () => void;
}> = ({ profile, mode = 'public', onEditProfile }) => {
  const isMyProfile = mode === 'my';
  const [isConnected, setIsConnected] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsConnected(false);
    setIsFollowing(false);
  }, [profile.id]);

  return (
    <div className="relative overflow-visible rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className={`h-40 sm:h-48 bg-gradient-to-r ${bannerStyles[profile.bannerTheme]} relative overflow-visible`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_42%)]" />
      </div>

      <div className="relative z-20 px-4 pb-6 sm:px-6">
        <div className="-mt-12 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex min-w-0 items-end gap-4 pr-2">
            <div className="relative z-30 flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border-4 border-white bg-slate-900 text-xl font-black text-white shadow-lg sm:h-24 sm:w-24 sm:text-2xl">
              {profile.avatarInitials}
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="max-w-full text-xl font-black leading-tight text-slate-900 sm:text-2xl">
                  {profile.companyName}
                </h2>
                {profile.isDpiitVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">
                    <ShieldCheck className="h-3 w-3" />
                    DPIIT Verified
                  </span>
                )}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <span>{profile.handle}</span>
                <span>•</span>
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 xl:justify-end">
            {isMyProfile ? (
              <button
                type="button"
                onClick={onEditProfile}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-[11px] font-bold text-white shadow-sm hover:bg-slate-800"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsConnected((connected) => !connected)}
                  aria-pressed={isConnected}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-[11px] font-bold text-white shadow-sm hover:bg-slate-800"
                >
                  {isConnected ? 'Connected' : 'Connect'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFollowing((following) => !following)}
                  aria-pressed={isFollowing}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-700 shadow-sm hover:border-slate-300"
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </>
            )}
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-700 shadow-sm hover:border-slate-300">
                <Globe className="h-3.5 w-3.5" />
                Website
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-700 shadow-sm hover:border-slate-300">
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
            )}
            {profile.twitter && (
              <a href={profile.twitter} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-700 shadow-sm hover:border-slate-300">
                <Twitter className="h-3.5 w-3.5" />
                X / Twitter
              </a>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <div className="inline-flex items-center gap-1.5">
            <span className="font-semibold">{profile.tagline}</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-emerald-600" />
            <span>{profile.location}</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-sky-600" />
            <span>Founded {profile.foundedYear}</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-violet-600" />
            <span>{profile.email}</span>
          </div>
        </div>

        <div className="mt-5 max-w-3xl rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
          {profile.bio}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {profile.techDomains.map((domain) => (
            <span
              key={domain}
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-700"
            >
              {domain}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
          <span className="rounded-full bg-slate-100 px-2 py-1">DPIIT No. {profile.dpiitCertNo}</span>
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">Verification Active</span>
        </div>
      </div>
    </div>
  );
};
