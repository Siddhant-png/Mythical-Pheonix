import React from 'react';
import { 
  Building2, 
  Handshake, 
  PlusCircle, 
  FlaskConical, 
  Repeat, 
  ShieldCheck, 
  ChevronDown,
  Sparkles,
  FileCheck,
  SearchCheck,
  Scale,
  Flame,
  UserCheck,
  LogIn,
  User
} from 'lucide-react';
import { UserRole, AuthUser } from '../types';

export type NavTab = 'problems' | 'feed' | 'discovery' | 'collab' | 'dept-upload' | 'pilots' | 'scale' | 'templates';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeCollabCount: number;
  currentUser: AuthUser | null;
  onOpenAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  activeCollabCount,
  currentUser,
  onOpenAuthModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-brand-panel border-b border-brand-border shadow-sm font-body">
      {/* Top MahaGov Saffron-White-Green Tricolor Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF7722] via-white to-[#138808]"></div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('problems')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-govblue-900 to-govblue-700 text-white flex items-center justify-center shadow-md border border-govblue-500/20">
              <ShieldCheck className="w-6 h-6 text-saffron-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold tracking-tight text-brand-text font-heading">
                  Maha<span className="text-saffron-600">Setu</span>
                </h1>
                <span className="text-[11px] bg-saffron-100 text-saffron-800 font-bold px-2 py-0.5 rounded-full border border-saffron-300">
                  महासेतू
                </span>
              </div>
              <p className="text-xs text-brand-textMuted font-medium">
                Public Innovation & Accelerated Procurement Portal
              </p>
            </div>
          </div>

          {/* User Persona & Authentication Bar */}
          <div className="flex items-center space-x-3 flex-wrap gap-y-2">
            {/* Role Switcher */}
            <div className="flex items-center space-x-1 bg-neutral-100 p-1 rounded-xl border border-brand-border">
              <button
                onClick={() => setUserRole('dept')}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                  userRole === 'dept'
                    ? 'bg-white text-govblue-800 shadow-sm font-semibold border border-govblue-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🏛️ Govt Officer
              </button>
              <button
                onClick={() => setUserRole('startup')}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                  userRole === 'startup'
                    ? 'bg-white text-saffron-700 shadow-sm font-semibold border border-saffron-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🚀 Startup
              </button>
              <button
                onClick={() => setUserRole('citizen')}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                  userRole === 'citizen'
                    ? 'bg-white text-emerald-700 shadow-sm font-semibold border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                👥 Citizen
              </button>
              <button
                onClick={() => setUserRole('manufacturer')}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                  userRole === 'manufacturer'
                    ? 'bg-white text-slate-800 shadow-sm font-semibold border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🏭 Manufacturer
              </button>
            </div>

            {/* Auth Sign In / Verified Badge Button */}
            <button
              onClick={onOpenAuthModal}
              className="inline-flex items-center space-x-1.5 bg-govblue-900 hover:bg-govblue-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow transition-all duration-200 hover:-translate-y-0.5 shrink-0"
            >
              {currentUser?.isVerified ? (
                <>
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span className="truncate max-w-[120px]">{currentUser.name.split(' ')[0]}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-amber-300" />
                  <span>Verify / Log In</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Tabs Bar */}
        <nav className="flex space-x-1 mt-4 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('problems')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 shrink-0 ${
              activeTab === 'problems'
                ? 'bg-govblue-900 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Problem Directory</span>
          </button>

          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${
              activeTab === 'feed'
                ? 'bg-govblue-900 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Civic Shorts & Upvote Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('discovery')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${
              activeTab === 'discovery'
                ? 'bg-govblue-900 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <SearchCheck className="w-4 h-4 text-emerald-400" />
            <span>Discovery & DPIIT Panel</span>
          </button>

          <button
            onClick={() => setActiveTab('collab')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all shrink-0 relative ${
              activeTab === 'collab'
                ? 'bg-govblue-900 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Handshake className="w-4 h-4 text-amber-400" />
            <span>Manufacturer Alliances & NDA</span>
            {activeCollabCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded-full bg-amber-500 text-white font-bold">
                {activeCollabCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('dept-upload')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${
              activeTab === 'dept-upload'
                ? 'bg-govblue-900 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Post Problem (Structured Intake)</span>
          </button>

          <button
            onClick={() => setActiveTab('pilots')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${
              activeTab === 'pilots'
                ? 'bg-govblue-900 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-purple-400" />
            <span>Sandbox Pilots & Scorecards</span>
          </button>

          <button
            onClick={() => setActiveTab('scale')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${
              activeTab === 'scale'
                ? 'bg-govblue-900 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Repeat className="w-4 h-4 text-sky-400" />
            <span>Cross-Dept Scale Registry</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${
              activeTab === 'templates'
                ? 'bg-govblue-900 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4 text-amber-300" />
            <span>Standard Templates & Legal Vault</span>
          </button>
        </nav>
      </div>
    </header>
  );
};


