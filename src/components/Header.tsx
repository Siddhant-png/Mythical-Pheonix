import React from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  LogIn,
  Building2,
  Flame,
  SearchCheck,
  Rocket,
  Handshake,
  PlusCircle,
  FlaskConical,
  Repeat,
  Scale
} from 'lucide-react';
import { UserRole, AuthUser } from '../types';

export type NavTab = 'problems' | 'feed' | 'discovery' | 'profiles' | 'collab' | 'dept-upload' | 'pilots' | 'scale' | 'templates';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeCollabCount: number;
  currentUser: AuthUser | null;
  onOpenAuthModal: () => void;
  onOpenMyProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  activeCollabCount,
  currentUser,
  onOpenAuthModal,
  onOpenMyProfile
}) => {
  return (
    <header className="sticky top-0 z-40 bg-brand-panel border-b border-brand-border shadow-sm font-body">
      {/* Top MahaGov Saffron-White-Green Tricolor Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF7722] via-white to-[#138808]"></div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('problems')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-govblue-900 to-govblue-700 text-white flex items-center justify-center shadow-md border border-govblue-500/20">
              <ShieldCheck className="w-5 h-5 text-saffron-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-extrabold tracking-tight text-brand-text font-heading">
                  Converge
                </h1>
              </div>
              <p className="text-[11px] text-brand-textMuted font-medium">
                Public Innovation & Accelerated Procurement Architecture
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

        {/* Mobile Horizontal Pill Scrollbar (Visible on small screens only) */}
        <div className="flex md:hidden space-x-1.5 mt-3 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('problems')}
            className={`px-3 py-1.5 rounded-lg font-bold shrink-0 ${activeTab === 'problems' ? 'bg-govblue-900 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Problems
          </button>
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 py-1.5 rounded-lg font-bold shrink-0 ${activeTab === 'feed' ? 'bg-govblue-900 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Civic Feed
          </button>
          <button
            onClick={() => setActiveTab('discovery')}
            className={`px-3 py-1.5 rounded-lg font-bold shrink-0 ${activeTab === 'discovery' ? 'bg-govblue-900 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Discovery
          </button>
          <button
            onClick={() => setActiveTab('collab')}
            className={`px-3 py-1.5 rounded-lg font-bold shrink-0 ${activeTab === 'collab' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Alliances
          </button>
          <button
            onClick={() => setActiveTab('dept-upload')}
            className={`px-3 py-1.5 rounded-lg font-bold shrink-0 ${activeTab === 'dept-upload' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Post Problem
          </button>
        </div>
      </div>
    </header>
  );
};
