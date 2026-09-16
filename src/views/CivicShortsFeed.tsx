import React, { useEffect, useRef, useState } from 'react';
import {
  Plus,
  ThumbsDown,
  ThumbsUp,
  X
} from 'lucide-react';
import { UserRole } from '../types';

interface CivicShortsFeedProps {
  userRole: UserRole;
  currentUserName: string;
  onNavigateToTenders?: () => void;
}

interface CivicShort {
  id: string;
  category: string;
  username: string;
  displayName: string;
  title: string;
  description: string;
  hashtags: string[];
  gradient: string;
  icon: string;
  likes: number;
  comments: number;
}

const civicShorts: CivicShort[] = [
  {
    id: 'short-1',
    category: 'SMART MOBILITY',
    username: '@drishti_edge',
    displayName: 'Drishti Edge Tech',
    title: 'AI Traffic Management reducing congestion by 40%',
    description: 'Our computer vision system processes 10,000 vehicles/hr at major intersections across Mumbai.',
    hashtags: ['#SmartMobility', '#AITraffic', '#GovTech'],
    gradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    icon: '🚦',
    likes: 2400,
    comments: 186
  },
  {
    id: 'short-2',
    category: 'AGRITECH',
    username: '@aquapulse',
    displayName: 'AquaPulse Sensing',
    title: 'Soil moisture sensors saving 60% water in Maharashtra farms',
    description: 'IoT-based precision irrigation deployed across 500 acres in Nashik district pilot.',
    hashtags: ['#AgriTech', '#Irrigation', '#Maharashtra'],
    gradient: 'linear-gradient(135deg, #134e5e, #71b280)',
    icon: '🌱',
    likes: 1800,
    comments: 94
  },
  {
    id: 'short-3',
    category: 'CLEAN ENERGY',
    username: '@greenroute',
    displayName: 'GreenRoute Mobility',
    title: 'EV charging corridors across Pune-Mumbai highway',
    description: '15 fast-charging stations deployed, 800+ EVs served monthly.',
    hashtags: ['#CleanEnergy', '#EVCharging', '#Sustainability'],
    gradient: 'linear-gradient(135deg, #f46b45, #eea849)',
    icon: '⚡',
    likes: 3100,
    comments: 241
  },
  {
    id: 'short-4',
    category: 'MEDTECH',
    username: '@medbridge',
    displayName: 'MedBridge Diagnostics',
    title: 'AI diagnostics reaching rural Maharashtra villages',
    description: 'Mobile diagnostic units detecting TB and anaemia with 94% accuracy.',
    hashtags: ['#MedTech', '#RuralHealth', '#AI'],
    gradient: 'linear-gradient(135deg, #8e0e00, #1f1c18)',
    icon: '🏥',
    likes: 4200,
    comments: 312
  },
  {
    id: 'short-5',
    category: 'CIVIC ISSUE',
    username: '@citizen_raj',
    displayName: 'Rajesh Patil',
    title: 'Pothole crisis on SH-4 needs urgent attention',
    description: 'Over 200 potholes reported between Pune and Ahmednagar. Upvote!',
    hashtags: ['#CivicIssue', '#Roads', '#Maharashtra'],
    gradient: 'linear-gradient(135deg, #232526, #414345)',
    icon: '🛣️',
    likes: 5700,
    comments: 891
  },
  {
    id: 'short-6',
    category: 'PROCUREMENT',
    username: '@govprocure',
    displayName: 'Procurement Cell',
    title: 'Drone surveillance RFP now open for startups',
    description: 'Maharashtra invites proposals for border surveillance drones under GFR 149.',
    hashtags: ['#Procurement', '#Drones', '#Startup'],
    gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    icon: '🚁',
    likes: 987,
    comments: 43
  },
  {
    id: 'short-7',
    category: 'SMART AUTOMATION',
    username: '@automate_mh',
    displayName: 'AutomateMH',
    title: 'Robotic waste sorting plant cuts landfill by 35%',
    description: 'Automated segregation processes 200 tons of waste daily in Navi Mumbai.',
    hashtags: ['#SmartAutomation', '#WasteManagement', '#CleanCity'],
    gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
    icon: '♻️',
    likes: 2200,
    comments: 156
  },
  {
    id: 'short-8',
    category: 'CIVIC ISSUE',
    username: '@waterwatch',
    displayName: 'WaterWatch Collective',
    title: 'Water supply disruption in Thane Ward 7 - Day 12',
    description: '8,000 citizens affected. Needs nodal officer action urgently.',
    hashtags: ['#WaterCrisis', '#Thane', '#CivicVoice'],
    gradient: 'linear-gradient(135deg, #005c97, #363795)',
    icon: '💧',
    likes: 9300,
    comments: 1200
  }
];

const formatCount = (count: number) => {
  if (count < 1000) return count.toString();
  return `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}k`;
};

const getInitials = (name: string) => name
  .split(' ')
  .map(word => word[0])
  .slice(0, 2)
  .join('')
  .toUpperCase();

export const CivicShortsFeed: React.FC<CivicShortsFeedProps> = ({
  userRole: _userRole,
  currentUserName: _currentUserName,
  onNavigateToTenders: _onNavigateToTenders
}) => {
  const [activeShortIndex, setActiveShortIndex] = useState(0);
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down'>>({});
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('SMART MOBILITY');
  const [hashtags, setHashtags] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleVote = (shortId: string, direction: 'up' | 'down') => {
    setUserVotes(current => {
      const activeVote = current[shortId];
      if (activeVote === direction) {
        const next = { ...current };
        delete next[shortId];
        return next;
      }
      return { ...current, [shortId]: direction };
    });
  };

  const scrollToShort = (index: number) => {
    const nextIndex = Math.max(0, Math.min(civicShorts.length - 1, index));
    scrollContainerRef.current?.querySelector<HTMLElement>(`[data-short-index="${nextIndex}"]`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const observer = new IntersectionObserver((entries) => {
      const visibleEntry = entries.find(entry => entry.isIntersecting);
      if (visibleEntry) {
        setActiveShortIndex(Number((visibleEntry.target as HTMLElement).dataset.shortIndex));
      }
    }, {
      root: scrollContainer,
      threshold: 0.75
    });

    scrollContainer.querySelectorAll<HTMLElement>('[data-short-index]').forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyboardNavigation = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
      event.preventDefault();
      scrollToShort(activeShortIndex + (event.key === 'ArrowDown' ? 1 : -1));
    };

    window.addEventListener('keydown', handleKeyboardNavigation);
    return () => window.removeEventListener('keydown', handleKeyboardNavigation);
  }, [activeShortIndex]);

  const submitPost = (event: React.FormEvent) => {
    event.preventDefault();
    setPostModalOpen(false);
    setTitle('');
    setDescription('');
    setHashtags('');
  };

  return (
    <div style={{ height: 'calc(100vh - 72px)' }} className="relative -mx-3 -my-6 min-h-[620px] overflow-hidden bg-slate-950 font-body sm:-mx-4 lg:-mx-6">
      <style>{`
        @keyframes civic-card-gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes civic-emoji-pulse {
          0%, 100% { transform: scale(1); opacity: 0.34; }
          50% { transform: scale(1.12); opacity: 0.6; }
        }

        @keyframes civic-progress {
          from { width: 0%; }
          to { width: 100%; }
        }

        .civic-shorts-scroll {
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          height: calc(100vh - 72px);
          scrollbar-width: none;
        }

        .civic-shorts-scroll::-webkit-scrollbar {
          display: none;
        }

        .civic-short-card {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          flex: 0 0 100%;
          height: 100%;
          min-height: 100%;
        }

        .civic-short-card > article {
          position: relative;
          height: 100%;
          width: min(420px, calc(56.25vh - 40.5px));
          min-width: 280px;
          isolation: isolate;
        }

        .civic-short-card > article::before {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          content: '';
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E");
          mix-blend-mode: screen;
        }

        .civic-upload-button {
          position: absolute;
          top: 50%;
          left: calc(50% + 234px);
          transform: translateY(-50%);
        }

        @media (max-width: 1100px) {
          .civic-upload-button {
            left: 24px;
            right: auto;
          }
        }
      `}</style>

      <div
        ref={scrollContainerRef}
        className="civic-shorts-scroll"
        onScroll={event => console.log('[CivicShortsFeed] scroll', event.currentTarget.scrollTop)}
      >
        {civicShorts.map((short, index) => {
          const userVote = userVotes[short.id];
          const score = short.likes + (userVote === 'up' ? 1 : userVote === 'down' ? -1 : 0);

          return (
            <section
              key={short.id}
              data-short-index={index}
              className="civic-short-card flex items-center justify-center px-3 sm:px-6"
            >
              <article
                className="relative h-full w-full max-w-[420px] overflow-hidden rounded-[16px] border border-white/10 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                style={{
                  backgroundImage: short.gradient,
                  backgroundSize: '220% 220%',
                  animation: 'civic-card-gradient-shift 14s ease-in-out infinite'
                }}
              >
                <div className="absolute left-0 right-0 top-0 z-30 h-[3px] overflow-hidden bg-white/30">
                  <div
                    key={`${short.id}-${activeShortIndex}`}
                    className="h-full rounded-full bg-white"
                    style={{
                      width: activeShortIndex === index ? undefined : index < activeShortIndex ? '100%' : '0%',
                      animation: activeShortIndex === index ? 'civic-progress 8s linear infinite' : 'none',
                      boxShadow: '0 0 8px white'
                    }}
                  />
                </div>

                <div className="absolute inset-0 z-[1] bg-black/10" />
                <div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,transparent_100%)]" />

                <div className="absolute left-4 right-4 top-5 z-20 flex items-center justify-between">
                  <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-black tracking-[0.12em] text-white shadow-sm backdrop-blur-[8px]">
                    {short.category}
                  </span>
                  <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 font-mono text-[11px] font-bold text-white shadow-sm backdrop-blur-[8px]">
                    {index + 1} of {civicShorts.length}
                  </span>
                </div>

                <div className="absolute left-1/2 top-[35%] z-[2] -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-[4rem] leading-none drop-shadow-2xl">{short.icon}</div>
                  <div className="mx-auto mt-5 h-4 w-32 rounded-full bg-white/35 blur-xl" style={{ animation: 'civic-emoji-pulse 3s ease-in-out infinite' }} />
                </div>

                <div className="absolute bottom-7 left-4 z-20 w-[calc(65%-1rem)] max-w-[65%] space-y-2 pr-20 sm:left-6">
                  <div className="flex items-center gap-2">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-orange-500 to-govblue-900 text-xs font-black text-white shadow-lg">
                      {getInitials(short.displayName)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold">{short.username}</p>
                      <p className="truncate text-[11px] text-white/70">{short.displayName}</p>
                    </div>
                  </div>
                  <h2 className="font-heading text-lg font-extrabold leading-tight drop-shadow-md sm:text-xl">{short.title}</h2>
                  <p className="line-clamp-2 overflow-hidden text-ellipsis text-xs leading-relaxed text-white/75">{short.description}</p>
                  <div className="flex flex-nowrap gap-x-2 overflow-hidden whitespace-nowrap pt-1">
                    {short.hashtags.map(hashtag => (
                      <span key={hashtag} className="shrink-0 text-[12px] font-bold text-white/90">{hashtag}</span>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-[80px] right-[-4px] z-30 flex w-20 flex-col items-center justify-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <button
                      type="button"
                      aria-label="Upvote short"
                      onClick={() => handleVote(short.id, 'up')}
                      className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white shadow-lg backdrop-blur-[8px] active:scale-95 ${
                        userVote === 'up' ? 'border-emerald-400 bg-emerald-500/40 text-emerald-300' : 'hover:bg-white/25'
                      }`}
                    >
                      <ThumbsUp className={`h-5 w-5 ${userVote === 'up' ? 'fill-current' : ''}`} />
                    </button>
                    <span className="text-[12px] font-extrabold drop-shadow-md">{formatCount(score)}</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <button
                      type="button"
                      aria-label="Downvote short"
                      onClick={() => handleVote(short.id, 'down')}
                      className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white shadow-lg backdrop-blur-[8px] active:scale-95 ${
                        userVote === 'down' ? 'border-rose-400 bg-rose-500/40 text-rose-300' : 'hover:bg-white/25'
                      }`}
                    >
                      <ThumbsDown className={`h-5 w-5 ${userVote === 'down' ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </article>
            </section>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Post a Solution Short"
        title="Post a Solution Short"
        onClick={() => setPostModalOpen(true)}
        className="civic-upload-button z-40 flex items-center gap-2 whitespace-nowrap rounded-full bg-amber-400 px-4 py-3 text-xs font-black text-slate-950 shadow-[0_0_24px_rgba(251,191,36,0.45)] hover:bg-amber-300"
      >
        <Plus className="h-5 w-5" />
        <span>Upload Solution Short</span>
      </button>

      {postModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-3 backdrop-blur-sm sm:p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-govblue-900 p-5 text-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Solution Shorts</span>
                <h3 className="mt-0.5 text-base font-bold">Post a Solution Short</h3>
              </div>
              <button type="button" aria-label="Close post form" onClick={() => setPostModalOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={submitPost} className="space-y-4 p-5 text-xs">
              <div>
                <label className="mb-1 block font-bold text-slate-800" htmlFor="short-title">Title</label>
                <input id="short-title" value={title} onChange={event => setTitle(event.target.value)} placeholder="Give your solution short a title" className="w-full rounded-xl border border-slate-200 p-2.5 font-bold" required />
              </div>
              <div>
                <label className="mb-1 block font-bold text-slate-800" htmlFor="short-description">Description</label>
                <textarea id="short-description" value={description} onChange={event => setDescription(event.target.value)} rows={3} placeholder="What should the civic community know?" className="w-full rounded-xl border border-slate-200 p-2.5" required />
              </div>
              <div>
                <label className="mb-1 block font-bold text-slate-800" htmlFor="short-category">Category</label>
                <select id="short-category" value={category} onChange={event => setCategory(event.target.value)} className="w-full rounded-xl border border-slate-200 p-2.5">
                  <option>SMART MOBILITY</option>
                  <option>AGRITECH</option>
                  <option>CLEAN ENERGY</option>
                  <option>MEDTECH</option>
                  <option>CIVIC ISSUE</option>
                  <option>PROCUREMENT</option>
                  <option>SMART AUTOMATION</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block font-bold text-slate-800" htmlFor="short-hashtags">Hashtags</label>
                <input id="short-hashtags" value={hashtags} onChange={event => setHashtags(event.target.value)} placeholder="#GovTech #CivicVoice" className="w-full rounded-xl border border-slate-200 p-2.5 font-mono" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setPostModalOpen(false)} className="px-4 py-2 font-semibold text-slate-600">Close</button>
                <button type="submit" className="rounded-xl bg-govblue-900 px-5 py-2.5 font-bold text-white shadow">Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};