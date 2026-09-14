import React, { useState } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share2, 
  Sparkles, 
  Flame, 
  Award, 
  Play, 
  Pause, 
  Volume2, 
  Plus, 
  CheckCircle2, 
  X, 
  Send, 
  TrendingUp, 
  LayoutGrid, 
  Film, 
  UserCheck, 
  AlertTriangle,
  Building2
} from 'lucide-react';
import { CivicIdeaPost, CivicComment, UserRole, ProblemSector } from '../types';

interface CivicShortsFeedProps {
  userRole: UserRole;
  currentUserName: string;
  onNavigateToTenders?: () => void;
}

export const CivicShortsFeed: React.FC<CivicShortsFeedProps> = ({
  userRole,
  currentUserName,
  onNavigateToTenders
}) => {
  const [feedMode, setFeedMode] = useState<'shorts' | 'reddit'>('shorts');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [activeShortIndex, setActiveShortIndex] = useState(0);
  const [isNewIdeaModalOpen, setIsNewIdeaModalOpen] = useState(false);
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');

  // Sample Posts Data
  const [posts, setPosts] = useState<CivicIdeaPost[]>([
    {
      id: 'post-101',
      title: 'Edge AI Camera Sensor for Expressway Fog Collision Prevention',
      authorName: 'Drishti Edge Technologies',
      authorRole: 'startup',
      authorBadge: '🚀 DPIIT Startup Pitch',
      category: 'Smart Mobility & Logistics',
      content: 'Our dual thermal camera units detect vehicle slowdowns 500m ahead in zero-visibility fog and trigger instant LED strobe warnings. Tested on Mumbai-Pune Expressway.',
      mediaType: 'video',
      mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-highway-at-night-42866-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      upvotes: 2840,
      downvotes: 12,
      userVote: null,
      tags: ['#ExpresswaySafety', '#AI', '#ZeroCollisions'],
      urgency: 'CRITICAL',
      deptEndorsed: true,
      targetDept: 'Public Works Department (PWD)',
      createdAt: '2 hours ago',
      comments: [
        { id: 'c1', authorName: 'Prakash Patil (PWD Nodal Officer)', authorRole: 'dept', text: 'Excellent field demonstration. Scheduling sandbox testbed review for NH-66 corridor.', timestamp: '1 hour ago', upvotes: 45 },
        { id: 'c2', authorName: 'Dr. Sameer Joshi', authorRole: 'citizen', text: 'This is urgently needed during winter fog on Samruddhi Mahamarg!', timestamp: '45 mins ago', upvotes: 18 }
      ]
    },
    {
      id: 'post-102',
      title: 'Smart Acoustic Sensor for Pinhole Water Pipeline Leakage in Baner',
      authorName: 'AquaPulse Sensing',
      authorRole: 'startup',
      authorBadge: '🚀 Pilot Demo Pitch',
      category: 'Clean Energy & Water',
      content: 'Non-invasive acoustic sensors placed along municipal water mains identify underground leaks before roads collapse. Saves 40% non-revenue water loss.',
      mediaType: 'video',
      mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-water-flowing-from-a-pipe-42867-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      upvotes: 1950,
      downvotes: 8,
      userVote: null,
      tags: ['#WaterConservation', '#SmartCity', '#PuneMunicipality'],
      urgency: 'HIGH',
      deptEndorsed: true,
      targetDept: 'Water Resources & Sanitation Dept',
      createdAt: '4 hours ago',
      comments: [
        { id: 'c3', authorName: 'PMC Ward Engineer', authorRole: 'dept', text: 'Verified 0.8m accuracy in Ward 4 feeder testbed. Recommended for scale PO.', timestamp: '2 hours ago', upvotes: 29 }
      ]
    },
    {
      id: 'post-103',
      title: 'Civic Demand: Autonomous Solar Weed Mower for Canal Embankments',
      authorName: 'Ramesh Kale (Farmer Leader, Nashik)',
      authorRole: 'citizen',
      authorBadge: '👥 Citizen Proposal',
      category: 'Agriculture & Allied',
      content: 'Overgrown weeds choke irrigation canals every monsoon, causing flooding. We request startups to build low-cost autonomous solar mowers for Zilla Parishad canals.',
      mediaType: 'image',
      thumbnailUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6928e146?auto=format&fit=crop&w=800&q=80',
      upvotes: 3120,
      downvotes: 19,
      userVote: null,
      tags: ['#CanalMaintenance', '#AgriTech', '#NashikFarmers'],
      urgency: 'HIGH',
      deptEndorsed: false,
      targetDept: 'Irrigation & Agriculture Dept',
      createdAt: '1 day ago',
      comments: [
        { id: 'c4', authorName: 'Bharat Drones Ltd', authorRole: 'manufacturer', text: 'We have a solar-tracked rover frame ready for partnership with software startups.', timestamp: '12 hours ago', upvotes: 62 }
      ]
    }
  ]);

  // Form State for New Idea
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProblemSector>('Smart Automation & AI');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('#Innovation #MaharashtraGov');

  const currentShort = posts[activeShortIndex] || posts[0];

  const handleVote = (postId: string, direction: 'UP' | 'DOWN') => {
    setPosts(posts.map(p => {
      if (p.id !== postId) return p;
      let upDelta = 0;
      let downDelta = 0;
      let newVote: 'UP' | 'DOWN' | null = direction;

      if (p.userVote === direction) {
        // Toggle off
        newVote = null;
        if (direction === 'UP') upDelta = -1;
        if (direction === 'DOWN') downDelta = -1;
      } else {
        if (p.userVote === 'UP') upDelta = -1;
        if (p.userVote === 'DOWN') downDelta = -1;
        if (direction === 'UP') upDelta = 1;
        if (direction === 'DOWN') downDelta = 1;
      }

      return {
        ...p,
        upvotes: p.upvotes + upDelta,
        downvotes: p.downvotes + downDelta,
        userVote: newVote
      };
    }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: CivicComment = {
      id: `c-${Date.now()}`,
      authorName: currentUserName,
      authorRole: userRole,
      text: newCommentText,
      timestamp: 'Just now',
      upvotes: 1
    };

    setPosts(posts.map(p => {
      if (p.id !== currentShort.id) return p;
      return {
        ...p,
        comments: [...p.comments, newComment]
      };
    }));

    setNewCommentText('');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: CivicIdeaPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      authorName: currentUserName,
      authorRole: userRole,
      authorBadge: userRole === 'citizen' ? '👥 Citizen Proposal' : (userRole === 'startup' ? '🚀 Startup Pitch' : '🏛️ Govt Demand'),
      category: newCategory,
      content: newContent,
      mediaType: 'text',
      upvotes: 1,
      downvotes: 0,
      userVote: 'UP',
      comments: [],
      tags: newTags.split(' ').filter(t => t.startsWith('#')),
      urgency: 'HIGH',
      deptEndorsed: false,
      createdAt: 'Just now'
    };

    setPosts([newPost, ...posts]);
    setIsNewIdeaModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 font-body">
      <div className="bg-gradient-to-r from-govblue-900 via-govblue-800 to-slate-950 text-white rounded-[28px] p-7 sm:p-10 shadow-[0_20px_60px_rgba(11,37,69,0.22)] relative overflow-hidden border border-govblue-700/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full text-[11px] font-bold text-violet-100 mb-4 border border-white/10">
              <Flame className="w-3.5 h-3.5 text-saffron-300" />
              <span>Public civic voice and idea upvote system</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] font-heading leading-[1.05] max-w-2xl">
              Civic pulse shorts and issue upvotes.
            </h2>
            <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
              Democratising public procurement. Citizens and startups pitch urgent civic needs and innovative solutions. High upvotes boost issue priority directly onto government nodal officers’ agendas.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setIsNewIdeaModalOpen(true)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-saffron-600 hover:from-amber-600 hover:to-saffron-700 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Idea or Civic Request</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feed Mode Controls & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        {/* Shorts vs Reddit Toggle */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setFeedMode('shorts')}
            className={`flex items-center space-x-2 text-xs font-bold px-4 py-2 rounded-lg transition ${
              feedMode === 'shorts'
                ? 'bg-govblue-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Film className="w-4 h-4 text-amber-400" />
            <span>🎬 Civic Shorts Reel</span>
          </button>
          <button
            onClick={() => setFeedMode('reddit')}
            className={`flex items-center space-x-2 text-xs font-bold px-4 py-2 rounded-lg transition ${
              feedMode === 'reddit'
                ? 'bg-govblue-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-emerald-400" />
            <span>📜 Reddit Upvote Board</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto text-xs font-medium pb-1 sm:pb-0 scrollbar-none">
          {['ALL', 'Smart Mobility & Logistics', 'Clean Energy & Water', 'Agriculture & Allied', 'MedTech & Public Health'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                filterCategory === cat
                  ? 'bg-slate-900 text-amber-400 font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? '🔥 All Trending' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* MODE 1: SHORTS VIDEO REEL VIEW */}
      {feedMode === 'shorts' && (
        <div className="max-w-md mx-auto relative bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 min-h-[640px] flex flex-col justify-between text-white">
          {/* Top Short Info Bar */}
          <div className="p-4 bg-gradient-to-b from-slate-950/90 to-transparent relative z-20 flex items-center justify-between">
            <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {currentShort.category}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded font-mono">
                Short {activeShortIndex + 1} of {posts.length}
              </span>
            </div>
          </div>

          {/* Media Background Preview Container */}
          <div className="absolute inset-0 z-0 bg-slate-900 flex items-center justify-center overflow-hidden">
            {currentShort.thumbnailUrl ? (
              <img 
                src={currentShort.thumbnailUrl} 
                alt={currentShort.title} 
                className="w-full h-full object-cover opacity-65 scale-105 transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-govblue-900 to-slate-950 flex items-center justify-center text-slate-600 font-mono text-xs">
                Visual Pitch Media Frame
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          </div>

          {/* Right Action Floating Bar (Shorts Style) */}
          <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-5 text-center">
            {/* Upvote Button */}
            <button
              onClick={() => handleVote(currentShort.id, 'UP')}
              className={`w-12 h-12 rounded-full flex flex-col items-center justify-center shadow-lg transition backdrop-blur-md ${
                currentShort.userVote === 'UP'
                  ? 'bg-amber-400 text-slate-950 font-bold scale-110'
                  : 'bg-black/50 text-white hover:bg-amber-400 hover:text-slate-950 border border-white/20'
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
            </button>
            <span className="text-xs font-black drop-shadow">{currentShort.upvotes.toLocaleString()}</span>

            {/* Downvote */}
            <button
              onClick={() => handleVote(currentShort.id, 'DOWN')}
              className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition ${
                currentShort.userVote === 'DOWN'
                  ? 'bg-rose-600 text-white'
                  : 'bg-black/50 text-white hover:bg-slate-800 border border-white/20'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
            </button>

            {/* Comments Drawer Button */}
            <button
              onClick={() => setCommentDrawerOpen(true)}
              className="w-12 h-12 rounded-full bg-black/50 hover:bg-slate-800 text-white flex flex-col items-center justify-center shadow-lg border border-white/20 transition"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <span className="text-[11px] font-bold drop-shadow">{currentShort.comments.length}</span>
          </div>

          {/* Bottom Pitch Details Overlay */}
          <div className="p-6 relative z-20 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-400/30">
                {currentShort.authorBadge}
              </span>
              <span className="text-xs text-slate-300 font-medium">by {currentShort.authorName}</span>
            </div>

            <h3 className="text-lg font-extrabold leading-snug font-heading drop-shadow-md">
              {currentShort.title}
            </h3>

            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed drop-shadow">
              {currentShort.content}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentShort.tags.map((t, idx) => (
                <span key={idx} className="text-[10px] bg-white/10 text-amber-300 px-2 py-0.5 rounded font-mono">
                  {t}
                </span>
              ))}
            </div>

            {/* Next / Prev Shorts Controls */}
            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <button
                disabled={activeShortIndex === 0}
                onClick={() => setActiveShortIndex(prev => Math.max(0, prev - 1))}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                  activeShortIndex === 0 ? 'text-slate-600 border-slate-800' : 'text-white border-white/20 hover:bg-white/10'
                }`}
              >
                ▲ Previous Pitch
              </button>

              <button
                disabled={activeShortIndex === posts.length - 1}
                onClick={() => setActiveShortIndex(prev => Math.min(posts.length - 1, prev + 1))}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                  activeShortIndex === posts.length - 1 ? 'text-slate-600 border-slate-800' : 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                }`}
              >
                Next Pitch Shorts ▼
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: REDDIT THREADED BOARD VIEW */}
      {feedMode === 'reddit' && (
        <div className="space-y-4">
          {posts
            .filter(p => filterCategory === 'ALL' || p.category === filterCategory)
            .map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4"
              >
                {/* Left Reddit Upvote Counter Pillar */}
                <div className="flex sm:flex-col items-center justify-center bg-slate-50 border border-slate-200 p-2.5 rounded-2xl shrink-0 space-y-1">
                  <button
                    onClick={() => handleVote(post.id, 'UP')}
                    className={`p-2 rounded-xl transition ${
                      post.userVote === 'UP'
                        ? 'bg-amber-400 text-slate-950 font-bold shadow'
                        : 'text-slate-500 hover:bg-amber-100 hover:text-amber-700'
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5" />
                  </button>

                  <span className="text-sm font-black text-slate-900 font-mono px-2">
                    {post.upvotes.toLocaleString()}
                  </span>

                  <button
                    onClick={() => handleVote(post.id, 'DOWN')}
                    className={`p-2 rounded-xl transition ${
                      post.userVote === 'DOWN'
                        ? 'bg-rose-500 text-white font-bold'
                        : 'text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Right Post Body Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] bg-govblue-100 text-govblue-900 font-bold px-2.5 py-0.5 rounded font-mono">
                        {post.authorBadge}
                      </span>
                      <span className="text-xs text-slate-600 font-medium">{post.authorName}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-400">{post.createdAt}</span>
                    </div>

                    {post.deptEndorsed && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>GOVT NODAL ENDORSED</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {post.content}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-4 text-slate-500 font-medium">
                      <button 
                        onClick={() => {
                          setActiveShortIndex(posts.findIndex(p => p.id === post.id));
                          setCommentDrawerOpen(true);
                        }}
                        className="flex items-center space-x-1 hover:text-govblue-800"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments.length} Comments</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* COMMENTS DRAWER MODAL */}
      {commentDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden text-xs">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Public Civic Discussion</span>
                <h3 className="text-sm font-bold truncate max-w-xs">{currentShort.title}</h3>
              </div>
              <button onClick={() => setCommentDrawerOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
              {currentShort.comments.length === 0 ? (
                <div className="text-center py-6 text-slate-400">
                  No public comments yet. Be the first to start the civic discussion!
                </div>
              ) : (
                currentShort.comments.map((c) => (
                  <div key={c.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-900">{c.authorName}</span>
                      <span className="text-slate-400 text-[10px]">{c.timestamp}</span>
                    </div>
                    <p className="text-slate-700 text-xs">{c.text}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleAddComment} className="p-3 bg-slate-100 border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Write constructive civic feedback..."
                className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-govblue-800"
                required
              />
              <button
                type="submit"
                className="bg-govblue-900 text-white font-bold px-4 rounded-xl flex items-center justify-center hover:bg-govblue-800"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW IDEA MODAL */}
      {isNewIdeaModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden text-xs">
            <div className="p-5 bg-govblue-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Public Submission Portal</span>
                <h3 className="text-base font-bold mt-0.5">Post an Innovation Pitch or Civic Challenge</h3>
              </div>
              <button onClick={() => setIsNewIdeaModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-5 space-y-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Title / Headline</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. AI Flood Early Warning System for Kolhapur District"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Sector Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ProblemSector)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                >
                  <option value="Smart Automation & AI">Smart Automation & AI</option>
                  <option value="Agriculture & Allied">Agriculture & Allied</option>
                  <option value="MedTech & Public Health">MedTech & Public Health</option>
                  <option value="Clean Energy & Water">Clean Energy & Water</option>
                  <option value="Smart Mobility & Logistics">Smart Mobility & Logistics</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Detailed Description & Civic Impact</label>
                <textarea
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Explain why this problem or solution is urgent for public deployment..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Hashtags / Keywords</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  placeholder="#FloodWarning #Kolhapur #AI"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewIdeaModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-govblue-900 hover:bg-govblue-800 text-white font-bold px-5 py-2.5 rounded-xl shadow"
                >
                  Publish to Public Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
