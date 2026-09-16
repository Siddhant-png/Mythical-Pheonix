import React, { useState } from 'react';
import { 
  Building2, 
  Clock, 
  Users, 
  ArrowLeft, 
  CheckCircle2, 
  Cpu,
  Leaf,
  BriefcaseMedical,
  BatteryCharging,
  Truck,
  ShieldAlert,
  Sparkles,
  FileText,
  Target,
  Award,
  ShieldCheck,
  Download,
  Share2,
  Handshake,
  Send,
  Calendar,
  IndianRupee,
  Layers,
  HelpCircle,
  FileBadge,
  Play,
  Image as ImageIcon,
  Tag,
  AlertTriangle,
  Flame,
  Activity,
  UserCheck,
  Zap,
  Volume2,
  Maximize2,
  X,
  Star,
  ThumbsUp,
  BarChart2,
  Check
} from 'lucide-react';
import { Problem, Startup, Collaboration } from '../types';
import { formatINRMoney } from '../utils/format';

interface ProblemDetailViewProps {
  problem: Problem;
  collaborations: Collaboration[];
  currentStartup: Startup;
  onBack: () => void;
  onApply: (problem: Problem) => void;
  onOpenCollabHub: (problem: Problem) => void;
}

export const ProblemDetailView: React.FC<ProblemDetailViewProps> = ({
  problem,
  collaborations,
  currentStartup,
  onBack,
  onApply,
  onOpenCollabHub
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'kpis' | 'eligibility' | 'consortium'>('overview');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  // Fallback defaults if optional fields are missing
  const initialSeverity = problem.severityScore || 9.2;
  const heroImage = problem.heroImage || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1200&auto=format&fit=crop&q=80';
  const galleryImages = problem.galleryImages || [heroImage];
  const videoDuration = problem.videoDuration || '03:30 mins';
  const videoTitle = problem.videoTitle || `Department Technical Explainer: ${problem.title}`;
  const keywords = problem.keywords || ['#InnovationProcurement', '#GFRRule149', '#DPIITStartup', '#GovtOfMaharashtra'];
  const urgencyLevel = problem.urgencyLevel || 'CRITICAL';
  const urgencyReason = problem.urgencyReason || 'Requires immediate pilot deployment under state innovation roadmap.';

  // Interactive Urgency Voting / Validation State
  const [currentScore, setCurrentScore] = useState<number>(initialSeverity);
  const [voteCount, setVoteCount] = useState<number>(142);
  const [userRating, setUserRating] = useState<number>(9);
  const [votedRating, setVotedRating] = useState<number | null>(null);
  const [voterRole, setVoterRole] = useState<string>('DPIIT Certified Startup');
  const [voterReason, setVoterReason] = useState<string>('');
  const [urgencyModalOpen, setUrgencyModalOpen] = useState(false);
  const [voteToastMessage, setVoteToastMessage] = useState<string | null>(null);

  const getSectorMeta = (sector: string) => {
    switch (sector) {
      case 'Smart Automation & AI': return { bg: 'bg-purple-50 text-purple-700 border-purple-200', accent: '#8b5cf6', icon: Cpu };
      case 'Agriculture & Allied': return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', accent: '#16a34a', icon: Leaf };
      case 'MedTech & Public Health': return { bg: 'bg-red-50 text-red-700 border-red-200', accent: '#ef4444', icon: BriefcaseMedical };
      case 'Clean Energy & Water': return { bg: 'bg-sky-50 text-sky-700 border-sky-200', accent: '#0ea5e9', icon: BatteryCharging };
      case 'Smart Mobility & Logistics': return { bg: 'bg-amber-50 text-amber-700 border-amber-200', accent: '#f59e0b', icon: Truck };
      default: return { bg: 'bg-slate-50 text-slate-700 border-slate-200', accent: '#64748b', icon: ShieldAlert };
    }
  };

  const sectorMeta = getSectorMeta(problem.sector);
  const SectorIcon = sectorMeta.icon;
  const formattedBudget = formatINRMoney(problem.budgetCeiling);
  const activeCollab = collaborations.find(c => c.problemId === problem.id && c.status === 'ACTIVE');

  const handleUrgencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTotalVotes = voteCount + 1;
    const newAvg = Number((((currentScore * voteCount) + userRating) / newTotalVotes).toFixed(1));
    setCurrentScore(newAvg);
    setVoteCount(newTotalVotes);
    setVotedRating(userRating);
    setUrgencyModalOpen(false);
    setVoteToastMessage(`Urgency score (${userRating}/10) registered! Community Priority recalculated to ${newAvg}/10.`);
    setTimeout(() => setVoteToastMessage(null), 4500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-body animate-fadeIn pb-16 relative">
      {/* Toast Notification */}
      {voteToastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 bg-slate-900 text-white border border-amber-400/60 px-5 py-3.5 rounded-2xl shadow-2xl text-xs animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div className="font-bold text-amber-300">Urgency Score Recorded</div>
            <div className="text-slate-300 text-[11px]">{voteToastMessage}</div>
          </div>
        </div>
      )}

      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-govblue-900 bg-white border border-slate-200 hover:border-slate-300 px-4 py-2 rounded-xl shadow-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Problem Directory</span>
        </button>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => alert(`Tender document specs for ${problem.title} downloaded.`)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download Tender PDF</span>
          </button>
          <button 
            onClick={() => alert(`Share link copied for ${problem.title}`)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm transition"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Main Hero Header Section with Image & Overlay */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_16px_50px_rgba(15,23,42,0.08)] overflow-hidden">
        {/* Visual Hero Image & Badges Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img 
            src={heroImage} 
            alt={problem.title} 
            className="w-full h-full object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

          {/* Top Floating Badges */}
          <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md bg-white/90 shadow-md ${sectorMeta.bg}`}>
                <SectorIcon className="w-4 h-4" />
                {problem.sector}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-emerald-100/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Status: {problem.status}
              </span>
            </div>

            {/* Priority Score Badge */}
            <div className="inline-flex items-center space-x-1.5 bg-red-900/90 text-red-200 border border-red-700/80 px-3 py-1.5 rounded-full text-xs font-extrabold backdrop-blur-md shadow-lg">
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>Priority Score: {currentScore} / 10</span>
              <span className="text-[10px] text-red-300 font-normal">({voteCount} votes)</span>
            </div>
          </div>

          {/* Bottom Hero Overlay Info */}
          <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-2">
            <div className="flex items-center space-x-2 text-xs text-amber-400 font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{problem.deptName}</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold font-heading text-white leading-tight drop-shadow-md">
              {problem.title}
            </h1>
          </div>
        </div>

        {/* Hero Metadata Info Bar */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Keyword tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
              <Tag className="w-3.5 h-3.5" /> Domain Tags:
            </span>
            {keywords.map((tag, idx) => (
              <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/80 hover:bg-slate-200 transition">
                {tag}
              </span>
            ))}
          </div>

          {/* Key Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-5 bg-slate-50/90 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Maximum Budget Ceiling</span>
              <div className="text-lg font-extrabold text-govblue-900 flex items-center mt-0.5">
                <span>{formattedBudget}</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">100% Grant Milestone Disbursed</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Sandbox Trial Period</span>
              <div className="text-lg font-extrabold text-slate-900 mt-0.5">6 Weeks</div>
              <span className="text-[10px] text-slate-500 block mt-0.5">Rapid Field Validation</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">DPIIT Exemption</span>
              <div className="text-lg font-extrabold text-emerald-700 mt-0.5">GFR Rule 149</div>
              <span className="text-[10px] text-emerald-600 font-medium block mt-0.5">Turnover Waived for Startups</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Tender Eligibility</span>
              <div className="text-sm font-bold text-slate-900 mt-1">
                {problem.preferredMode === 'COLLABORATION_RECOMMENDED' ? (
                  <span className="text-amber-700 font-bold flex items-center gap-1">
                    <Handshake className="w-4 h-4 text-amber-600" /> Consortium Advised
                  </span>
                ) : (
                  <span className="text-govblue-800 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-govblue-700" /> Solo or Consortium
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">M-NDA Verification</span>
            </div>
          </div>

          {/* Action CTAs Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
            <div className="flex items-center space-x-2 text-xs text-slate-600">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Submission Deadline: <strong className="text-slate-900">{problem.deadline}</strong></span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => onApply(problem)}
                className="flex items-center space-x-2 text-xs font-bold text-white bg-govblue-900 hover:bg-govblue-800 px-6 py-2.5 rounded-xl shadow-md transition"
              >
                <Send className="w-4 h-4" />
                <span>Submit Tender Application</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Showcase Row: LinkedIn-Style Media Post Feed + Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LinkedIn-Style Official Department Post Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-[#CAB9E3] space-y-4">
          {/* Post Author Header */}
          <div className="flex items-center justify-between border-b border-[#E6E1F4] pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#312B41] to-[#6F6785] text-white flex items-center justify-center font-bold text-sm shadow-md">
                MH
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h4 className="font-bold text-[#312B41] text-sm">{problem.deptName}</h4>
                  <ShieldCheck className="w-4 h-4 text-[#6F6785]" />
                </div>
                <p className="text-[11px] text-[#6F6785]">
                  Official Technical Briefing • Posted {problem.postedDate} • 🌐 Public Innovation RFP
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#E6E1F4] text-[#312B41] border border-[#CAB9E3]">
              {problem.sector}
            </span>
          </div>

          {/* Post Description Text */}
          <p className="text-xs text-[#312B41] leading-relaxed">
            {problem.description}
          </p>

          {/* Video Player Card Preview (LinkedIn Media Attachment Style) */}
          <div 
            onClick={() => setVideoModalOpen(true)}
            className="relative h-56 rounded-2xl overflow-hidden bg-slate-900 border border-[#CAB9E3] group cursor-pointer shadow-lg"
          >
            <img 
              src={heroImage} 
              alt="Video Thumbnail" 
              className="w-full h-full object-cover opacity-75 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
            
            {/* Play Button Center Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#CAB9E3] text-[#312B41] flex items-center justify-center shadow-xl">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </div>

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
              <div className="flex items-center space-x-2">
                <span className="bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/20 backdrop-blur-sm font-bold text-[11px]">
                  ▶ {videoTitle}
                </span>
              </div>
              <span className="bg-[#CAB9E3] text-[#312B41] font-bold px-2 py-0.5 rounded text-[11px]">
                {videoDuration} • HD 1080p
              </span>
            </div>
          </div>

          {/* Post Engagement Bar (LinkedIn Style) */}
          <div className="pt-3 border-t border-[#E6E1F4] flex items-center justify-between text-xs font-bold text-[#6F6785]">
            <button 
              onClick={() => handleUrgencySubmit({ preventDefault: () => {} } as any)}
              className="flex items-center space-x-1.5 hover:text-[#312B41] transition px-2 py-1 rounded-lg hover:bg-[#E6E1F4]/40"
            >
              <ThumbsUp className="w-4 h-4 text-[#6F6785]" />
              <span>Upvote Priority ({voteCount})</span>
            </button>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setVideoModalOpen(true)}
                className="flex items-center space-x-1 hover:text-[#312B41] transition"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Watch Briefing</span>
              </button>

              <button 
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    setVoteToastMessage('Tender link copied to clipboard!');
                    setTimeout(() => setVoteToastMessage(null), 3000);
                  }
                }}
                className="flex items-center space-x-1 hover:text-[#312B41] transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Challenge</span>
              </button>
            </div>
          </div>
        </div>

        {/* Site & Hardware Media Gallery */}
        <div className="bg-white rounded-3xl border border-[#CAB9E3] p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[#312B41] font-bold font-heading text-base mb-1">
              <ImageIcon className="w-5 h-5 text-[#6F6785]" />
              <span>Field Media & CAD Samples</span>
            </div>
            <p className="text-xs text-[#6F6785]">
              High-resolution photo evidence of field conditions and pilot requirements.
            </p>

            <div className="grid grid-cols-2 gap-2.5 mt-4">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedGalleryImg(img)}
                  className="relative h-24 rounded-xl overflow-hidden border border-[#CAB9E3] cursor-pointer group shadow-xs"
                >
                  <img src={img} alt={`Gallery ${idx+1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition"></div>
                  <span className="absolute bottom-1 right-1 text-[10px] bg-slate-900/80 text-white px-1.5 py-0.5 rounded backdrop-blur-sm">
                    Photo #{idx+1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#E6E1F4]/40 p-3 rounded-xl border border-[#CAB9E3] text-[11px] text-[#6F6785] flex items-center space-x-2">
            <FileText className="w-4 h-4 text-[#6F6785] shrink-0" />
            <span>Full technical image dataset included in tender specifications package.</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 flex space-x-4 sm:space-x-8 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3.5 pt-1 border-b-2 transition flex items-center space-x-2 ${
            activeTab === 'overview'
              ? 'border-govblue-800 text-govblue-900 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Overview & Beneficiaries</span>
        </button>

        <button
          onClick={() => setActiveTab('kpis')}
          className={`pb-3.5 pt-1 border-b-2 transition flex items-center space-x-2 ${
            activeTab === 'kpis'
              ? 'border-govblue-800 text-govblue-900 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>KPI Benchmarks & Scorecard</span>
        </button>

        <button
          onClick={() => setActiveTab('eligibility')}
          className={`pb-3.5 pt-1 border-b-2 transition flex items-center space-x-2 ${
            activeTab === 'eligibility'
              ? 'border-govblue-800 text-govblue-900 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Eligibility & Rules</span>
        </button>

        <button
          onClick={() => setActiveTab('consortium')}
          className={`pb-3.5 pt-1 border-b-2 transition flex items-center space-x-2 ${
            activeTab === 'consortium'
              ? 'border-govblue-800 text-govblue-900 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Handshake className="w-4 h-4" />
          <span>Consortium & M-NDA</span>
        </button>
      </div>

      {/* Tab 1: Overview, Who Needs Solutions & Why It Is Important */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Main Narrative, Why Needed & Beneficiaries */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statement Description */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-3">
                Statement Description & Scope of Solution
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {problem.description}
              </p>
            </div>

            {/* Why This Solution Is Needed & Priority Score Card with Validate Urgency Option */}
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-white rounded-2xl border border-amber-200 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
                <div className="flex items-center space-x-2 text-amber-900 font-bold font-heading text-lg">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Why This Solution Is Needed & Public Criticality</span>
                </div>

                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  Public Severity Score
                </span>
              </div>
              
              <p className="text-slate-800 text-sm leading-relaxed bg-white/90 p-4 rounded-xl border border-amber-200/80 shadow-xs font-medium">
                {problem.whyNeeded || 'Without an automated technological solution, public service delivery experiences severe bottlenecks, high operational costs, and physical safety risks across state departments.'}
              </p>

              {/* Interactive Priority & Urgency Score Validation Box */}
              <div className="bg-red-50/90 border border-red-200 rounded-2xl p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black shadow-md">
                      <Flame className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-red-950 text-base">
                          {urgencyLevel} URGENCY
                        </span>
                        <span className="text-xs font-extrabold bg-red-200 text-red-900 px-2.5 py-0.5 rounded-full">
                          Score: {currentScore} / 10
                        </span>
                      </div>
                      <span className="text-xs text-red-700 font-semibold block mt-0.5">
                        {voteCount} Verified Citizen & Startup Validations
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setUrgencyModalOpen(true)}
                    className="flex items-center space-x-1.5 px-4 py-2.5 bg-red-900 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow-md transition"
                  >
                    <span>{votedRating !== null ? `Your Vote: ${votedRating}/10 ✓` : 'Validate Urgency Score'}</span>
                  </button>
                </div>

                <p className="text-xs text-red-900 leading-relaxed border-t border-red-200/80 pt-2.5">
                  <strong className="text-red-950">State Priority Reason: </strong>
                  {urgencyReason}
                </p>

                {/* Progress Consensus Indicator */}
                <div className="pt-2 border-t border-red-200/60 flex items-center justify-between text-[11px] text-red-800">
                  <div className="flex items-center space-x-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-red-700" />
                    <span>Community Consensus: <strong>96% Critical Rating</strong></span>
                  </div>
                  <span className="text-red-700 font-semibold">State Procurement Accelerated Flag</span>
                </div>
              </div>
            </div>

            {/* Who Needs The Solution (Target Beneficiaries) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center space-x-2 text-slate-900 font-bold font-heading text-lg border-b border-slate-100 pb-3">
                <UserCheck className="w-5 h-5 text-govblue-800 shrink-0" />
                <span>Who Needs This Solution (Target Stakeholders & Beneficiaries)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(problem.targetBeneficiaries || [
                  { title: 'Citizens & Local Community', desc: 'Direct end-user public safety, transparent delivery, and service quality.' },
                  { title: 'Department Nodal Officers', desc: 'Real-time telemetry monitoring and automated reporting dashboards.' },
                  { title: 'District Field Personnel', desc: 'Reduced manual labor risk and objective evaluation scorecards.' }
                ]).map((b, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-govblue-900 text-white flex items-center justify-center font-bold text-xs">
                      #{idx+1}
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs">{b.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Public Impact Metrics */}
            {problem.publicImpactMetrics && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Expected Quantified Public Impact & Societal ROI
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {problem.publicImpactMetrics.map((m, idx) => (
                    <div key={idx} className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 text-center">
                      <div className="text-2xl font-black text-emerald-800">{m.value}</div>
                      <div className="text-xs font-bold text-slate-800 mt-1">{m.label}</div>
                      <div className="text-[10px] text-slate-500 mt-1">{m.subtext}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Col: Department Contact & Document Summary */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm">
                  MH
                </div>
                <div>
                  <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Issuing Authority</div>
                  <h4 className="text-sm font-bold text-white">{problem.deptName}</h4>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Nodal Officer:</span>
                  <span className="font-semibold text-white">Shri A. K. Patil (IAS)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Division:</span>
                  <span className="font-semibold text-white">{problem.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ref Protocol:</span>
                  <span className="font-semibold text-amber-400">GFR 149 / Sandbox</span>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => onApply(problem)}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition shadow-md flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Official Tender Application</span>
                </button>
              </div>
            </div>

            {/* Documentation Checklist */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 text-xs shadow-xs">
              <div className="font-bold text-slate-800 flex items-center space-x-1.5">
                <FileBadge className="w-4 h-4 text-govblue-800" />
                <span>Required Attachment Package</span>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>DPIIT Recognition Certificate</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Technical Proposal Note (Max 5 pages)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Commercial Pilot Bid (under ceiling)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Executed M-NDA (if Consortium)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: KPIs */}
      {activeTab === 'kpis' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Sandbox KPI Benchmarks & Objective Evaluation Rules
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Pilots are evaluated on a 100-point scale based on measurable benchmarks. Reaching or exceeding target metrics guarantees Sandbox Approval and Auto-PO eligibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {problem.kpiBenchmarks.map((kpi, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl p-5 bg-gradient-to-br from-slate-50 to-white shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-govblue-800 bg-govblue-50 px-2.5 py-0.5 rounded-full border border-govblue-200">
                    KPI #{idx + 1}
                  </span>
                  <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg">
                    {kpi.weightage}% Weight
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{kpi.metric}</h4>
                  <div className="text-sm font-extrabold text-emerald-700 mt-1">
                    Minimum Target: {kpi.minTarget}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-2">
                  Verified by IoT telematics or field audit log during sandbox period.
                </p>
              </div>
            ))}
          </div>

          <div className="bg-govblue-50 border border-govblue-200 rounded-2xl p-5 flex items-start space-x-3 text-xs">
            <div>
              <div className="font-bold text-govblue-900 text-sm">Automated Scorecard Integration</div>
              <p className="text-govblue-800 mt-0.5 leading-relaxed">
                Once submitted, your sandbox trial results are automatically calculated using telemetry endpoints. If the cumulative score exceeds 80/100, the department system issues an automated Purchase Order (PO) under GFR Rule 149.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Eligibility */}
      {activeTab === 'eligibility' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Official Eligibility Criteria & Rules
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Government rules governing startup participation, turnover waivers, and consortium requirements.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3 text-xs">
            <div className="font-bold text-slate-800 text-sm">Eligibility Rule Statement:</div>
            <p className="text-slate-700 leading-relaxed text-sm bg-white p-3.5 rounded-lg border border-slate-200">
              {problem.eligibilityCriteria}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Solo Startup Path (DPIIT Route)</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                DPIIT-recognized startups are exempt from prior experience and turnover requirements under GFR Rule 173(i) and Maharashtra Innovation Procurement Policy.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                <Handshake className="w-4 h-4 text-amber-600" />
                <span>Consortium Path (Manufacturer Route)</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Startups lacking large scale balance sheets can team up with verified Maharashtra manufacturers under a Mutual NDA to fulfill eligibility jointly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Consortium */}
      {activeTab === 'consortium' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Consortium Formation & Mutual NDA Framework
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Pair your software/IP innovation with certified state manufacturers to unlock high-turnover procurement tenders.
            </p>
          </div>

          {activeCollab ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Handshake className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 text-base">Active Consortium Formed</h4>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      {currentStartup.companyName} + Sahyadri Electronics & Engineering
                    </p>
                  </div>
                </div>
                <span className="text-xs font-extrabold bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full">
                  NDA Executed
                </span>
              </div>

              <p className="text-xs text-emerald-800 leading-relaxed bg-white/80 p-3.5 rounded-xl border border-emerald-200">
                Mutual Non-Disclosure Agreement (M-NDA) is active under Maharashtra IP Protection Standard Clauses. Balance sheet turnover criteria of ₹45 Crores fulfilled jointly.
              </p>

              <div className="flex justify-end">
                <button
                  onClick={() => onApply(problem)}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Consortium Tender Bid</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-amber-700 shrink-0" />
                <div>
                  <h4 className="font-bold text-amber-900 text-base">No Active Consortium for this Problem</h4>
                  <p className="text-xs text-amber-800 mt-0.5">
                    You can bid solo under DPIIT exemption or initiate a partnership with a verified manufacturer.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  onClick={() => onOpenCollabHub(problem)}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-1.5"
                >
                  <Users className="w-4 h-4" />
                  <span>Browse Manufacturer Hub & Pair</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Interactive Validate Urgency Score Modal */}
      {urgencyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden font-body animate-scaleUp">
            <div className="p-5 bg-gradient-to-r from-red-900 via-slate-900 to-govblue-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold font-heading">Validate Urgency & Public Priority</h3>
              </div>
              <button 
                onClick={() => setUrgencyModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUrgencySubmit} className="p-6 space-y-5 text-xs">
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-800">{problem.title}</div>
                <div className="text-[11px] text-slate-500">{problem.deptName}</div>
              </div>

              {/* Score Selector (1 to 10 scale) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-900 block text-xs">
                    Rate How Urgent You Feel This Challenge Is (1 to 10 Scale):
                  </label>
                  <span className="text-sm font-black text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-lg">
                    {userRating} / 10
                  </span>
                </div>

                <div className="grid grid-cols-10 gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setUserRating(num)}
                      className={`py-2 text-xs font-extrabold rounded-xl border transition ${
                        userRating === num
                          ? 'bg-red-600 text-white border-red-700 shadow-md scale-105'
                          : num >= 8
                          ? 'bg-red-50 hover:bg-red-100 text-red-800 border-red-200'
                          : num >= 5
                          ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 px-0.5 pt-0.5">
                  <span>1 - Low Priority</span>
                  <span>5 - Medium</span>
                  <span>10 - Critical Crisis</span>
                </div>
              </div>

              {/* Voter Stakeholder Role */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block text-xs">
                  Your Stakeholder Category:
                </label>
                <select
                  value={voterRole}
                  onChange={(e) => setVoterRole(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-red-800/20"
                >
                  <option value="DPIIT Certified Startup">DPIIT Certified Startup Founder</option>
                  <option value="Affected Citizen / Commuter">Affected Citizen / Commuter</option>
                  <option value="Department Nodal Officer">Government / Department Officer</option>
                  <option value="Domain Industry Expert">Domain Industry Expert / Academician</option>
                </select>
              </div>

              {/* Reason / Endorsement Note */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block text-xs">
                  Validation Reason / Field Observation (Optional):
                </label>
                <textarea
                  rows={2}
                  value={voterReason}
                  onChange={(e) => setVoterReason(e.target.value)}
                  placeholder="e.g. Monsoon pothole damage on NH-48 has caused severe traffic bottlenecks and 3 major accidents in Nashik."
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-800/20"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setUrgencyModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl font-bold bg-red-900 hover:bg-red-800 text-white shadow-md transition"
                >
                  <Flame className="w-4 h-4 text-amber-400 fill-current" />
                  <span>Submit Urgency Score</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Explainer Showcase Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-700">
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
                <Play className="w-4 h-4 fill-current" />
                <span>{videoTitle}</span>
              </div>
              <button onClick={() => setVideoModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img src={heroImage} alt="Video Stream" className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-slate-950/40 flex flex-col items-center justify-center space-y-3">
                <div className="w-20 h-20 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl animate-pulse">
                  <Play className="w-10 h-10 fill-current ml-1" />
                </div>
                <div className="text-sm font-bold text-white bg-slate-900/80 px-4 py-1.5 rounded-full border border-white/10">
                  Simulated Video Explainer Stream ({videoDuration})
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 text-xs text-slate-300 flex items-center justify-between">
              <div>
                <span className="text-amber-400 font-bold block">Issuing Authority:</span>
                <span>{problem.deptName}</span>
              </div>
              <button 
                onClick={() => setVideoModalOpen(false)} 
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl"
              >
                Close Explainer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Photo Modal */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
            <button 
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute top-4 right-4 z-10 bg-slate-950/80 text-white p-2 rounded-full hover:bg-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedGalleryImg} alt="Enlarged Field Evidence" className="w-full h-auto max-h-[80vh] object-contain mx-auto" />
            <div className="p-4 bg-slate-950 text-xs text-slate-300 flex items-center justify-between">
              <span className="font-bold text-white">{problem.title} — Field Evidence Photo</span>
              <button onClick={() => setSelectedGalleryImg(null)} className="text-amber-400 hover:underline">
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
