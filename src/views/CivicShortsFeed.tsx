import React, { useState } from 'react';
import { SolutionOutcome, UserRole } from '../types';

interface CivicShortsFeedProps {
  userRole: UserRole;
  currentUserName: string;
  onNavigateToTenders?: () => void;
  outcomes?: SolutionOutcome[];
}

interface SolutionCard {
  id: string;
  creatorName: string;
  username: string;
  title: string;
  description: string;
  problemTitle?: string;
  likes: number;
  dislikes: number;
  demoUrl?: string;
  videoName?: string;
}

const existingSolutions: SolutionCard[] = [
  { id: 'short-1', creatorName: 'Drishti Edge Tech', username: '@drishti_edge', title: 'AI Traffic Management reducing congestion by 40%', description: 'Our computer vision system processes 10,000 vehicles/hr at major intersections across Mumbai.', likes: 2400, dislikes: 0 },
  { id: 'short-2', creatorName: 'AquaPulse Sensing', username: '@aquapulse', title: 'Soil moisture sensors saving 60% water in Maharashtra farms', description: 'IoT-based precision irrigation deployed across 500 acres in Nashik district pilot.', likes: 1800, dislikes: 0 },
  { id: 'short-3', creatorName: 'GreenRoute Mobility', username: '@greenroute', title: 'EV charging corridors across Pune-Mumbai highway', description: '15 fast-charging stations deployed, 800+ EVs served monthly.', likes: 3100, dislikes: 0 },
  { id: 'short-4', creatorName: 'MedBridge Diagnostics', username: '@medbridge', title: 'AI diagnostics reaching rural Maharashtra villages', description: 'Mobile diagnostic units detecting TB and anaemia with 94% accuracy.', likes: 4200, dislikes: 0 },
  { id: 'short-5', creatorName: 'Rajesh Patil', username: '@citizen_raj', title: 'Pothole crisis on SH-4 needs urgent attention', description: 'Over 200 potholes reported between Pune and Ahmednagar. Upvote!', likes: 5700, dislikes: 0 },
  { id: 'short-6', creatorName: 'Procurement Cell', username: '@govprocure', title: 'Drone surveillance RFP now open for startups', description: 'Maharashtra invites proposals for border surveillance drones under GFR 149.', likes: 987, dislikes: 0 },
  { id: 'short-7', creatorName: 'AutomateMH', username: '@automate_mh', title: 'Robotic waste sorting plant cuts landfill by 35%', description: 'Automated segregation processes 200 tons of waste daily in Navi Mumbai.', likes: 2200, dislikes: 0 },
  { id: 'short-8', creatorName: 'WaterWatch Collective', username: '@waterwatch', title: 'Water supply disruption in Thane Ward 7 - Day 12', description: '8,000 citizens affected. Needs nodal officer action urgently.', likes: 9300, dislikes: 0 }
];

const formatCount = (count: number) => count < 1000 ? `${count}` : `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}k`;

export const CivicShortsFeed: React.FC<CivicShortsFeedProps> = ({ outcomes = [] }) => {
  const submittedSolutions: SolutionCard[] = outcomes.map(outcome => ({
    id: outcome.id,
    creatorName: outcome.creatorName,
    username: `@${outcome.creatorName.toLowerCase().replace(/ /g, '_')}`,
    title: outcome.title,
    description: outcome.description,
    problemTitle: outcome.problemTitle,
    likes: outcome.likes,
    dislikes: outcome.dislikes,
    demoUrl: outcome.demoUrl,
    videoName: outcome.videoName
  }));
  const solutions = [...submittedSolutions, ...existingSolutions];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userVotes, setUserVotes] = useState<Record<string, 'like' | 'dislike'>>({});
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const currentSolution = solutions[currentIndex];

  if (!currentSolution) return null;

  const userVote = userVotes[currentSolution.id];
  const likes = currentSolution.likes + (userVote === 'like' ? 1 : 0);
  const dislikes = currentSolution.dislikes + (userVote === 'dislike' ? 1 : 0);

  const vote = (type: 'like' | 'dislike') => {
    setUserVotes(previous => {
      const next = { ...previous };
      if (next[currentSolution.id] === type) delete next[currentSolution.id];
      else next[currentSolution.id] = type;
      return next;
    });
  };

  const submitPost = (event: React.FormEvent) => {
    event.preventDefault();
    setPostModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const openDemo = () => {
    if (currentSolution.demoUrl) window.open(currentSolution.demoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5 px-1 py-2 font-body">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Solution Outcomes</h1>
          <p className="mt-1 text-sm text-slate-500">Community demos connected to government problems.</p>
        </div>
        <button type="button" onClick={() => setPostModalOpen(true)} className="rounded-lg bg-govblue-900 px-4 py-2 text-sm font-bold text-white hover:bg-govblue-800">Post Outcome</button>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between text-sm font-semibold text-slate-500">
          <span>Solution {currentIndex + 1} of {solutions.length}</span>
          <span>{currentSolution.username}</span>
        </div>
        <div className="flex aspect-video items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-500">
          {currentSolution.videoName || currentSolution.demoUrl ? (
            <button type="button" onClick={openDemo} className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">Play video</button>
          ) : (
            <span className="text-3xl" aria-label="Video preview">&#9654;</span>
          )}
        </div>
        <div className="mt-5 space-y-3">
          <div>
            <p className="text-sm font-semibold text-slate-600">{currentSolution.creatorName}</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-900">{currentSolution.title}</h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-700">{currentSolution.description}</p>
          {currentSolution.problemTitle && <p className="border-l-4 border-govblue-200 pl-3 text-sm leading-relaxed text-slate-600"><strong className="text-slate-900">Problem:</strong> {currentSolution.problemTitle}</p>}
          {currentSolution.videoName && <p className="text-xs text-slate-500">Video: {currentSolution.videoName}</p>}
          <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
            <button type="button" onClick={() => vote('like')} className={`rounded-lg border px-3 py-2 text-sm font-semibold ${userVote === 'like' ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>Like {formatCount(likes)}</button>
            <button type="button" onClick={() => vote('dislike')} className={`rounded-lg border px-3 py-2 text-sm font-semibold ${userVote === 'dislike' ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>Dislike {formatCount(dislikes)}</button>
            {currentSolution.demoUrl && <button type="button" onClick={openDemo} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">View Outcome</button>}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex(index => index - 1)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
        <span className="text-sm font-bold text-slate-500">{currentIndex + 1} / {solutions.length}</span>
        <button type="button" disabled={currentIndex === solutions.length - 1} onClick={() => setCurrentIndex(index => index + 1)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
      </div>

      {postModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"><div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"><div className="flex items-center justify-between"><h2 className="text-lg font-extrabold text-slate-900">Post Outcome</h2><button type="button" onClick={() => setPostModalOpen(false)} className="text-sm font-semibold text-slate-500">Close</button></div><form onSubmit={submitPost} className="mt-5 space-y-4"><label className="block text-sm font-semibold text-slate-700">Title<input value={title} onChange={event => setTitle(event.target.value)} required className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5" /></label><label className="block text-sm font-semibold text-slate-700">Description<textarea value={description} onChange={event => setDescription(event.target.value)} required rows={4} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5" /></label><div className="flex justify-end gap-2"><button type="button" onClick={() => setPostModalOpen(false)} className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600">Cancel</button><button type="submit" className="rounded-lg bg-govblue-900 px-4 py-2 text-sm font-bold text-white">Post Outcome</button></div></form></div></div>}
    </div>
  );
};
