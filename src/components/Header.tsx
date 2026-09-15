import React from 'react';
import {
  ShieldCheck,
  LogIn,
  Flame,
  FlaskConical,
  Repeat,
  Scale,
  MessageCircle
} from 'lucide-react';
import { UserRole, AuthUser } from '../types';

export type NavTab = 'problems' | 'feed' | 'discovery' | 'profiles' | 'collab' | 'dept-upload' | 'pilots' | 'scale' | 'tiers' | 'procurement' | 'templates' | 'messages' | 'account';

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
  const userInitials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'AD';

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
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 ${userRole === 'dept'
                    ? 'bg-white text-govblue-800 shadow-sm font-semibold border border-govblue-200'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                🏛️ Govt Officer
              </button>
              <button
                onClick={() => setUserRole('startup')}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 ${userRole === 'startup'
                    ? 'bg-white text-saffron-700 shadow-sm font-semibold border border-saffron-200'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                🚀 Startup
              </button>
              <button
                onClick={() => setUserRole('citizen')}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 ${userRole === 'citizen'
                    ? 'bg-white text-emerald-700 shadow-sm font-semibold border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                👥 Citizen
              </button>
              <button
                onClick={() => setUserRole('manufacturer')}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 ${userRole === 'manufacturer'
                    ? 'bg-white text-slate-800 shadow-sm font-semibold border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                🏭 Manufacturer
              </button>
            </div>

            {/* Auth Modal Trigger */}
            <button
              onClick={onOpenAuthModal}
              className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl border border-slate-200 transition shrink-0"
              title="Verify DPIIT Credentials / Log In"
            >
              <LogIn className="w-3.5 h-3.5 text-govblue-800" />
              <span className="hidden sm:inline">Verify / Auth</span>
            </button>

            {/* Circular Profile Button (Self Account Page) */}
            <button
              onClick={onOpenMyProfile}
              title="Open My Full Account Profile"
              className={`relative w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all duration-200 shadow-md ${activeTab === 'account'
                  ? 'bg-slate-900 text-white ring-4 ring-saffron-400 ring-offset-2 scale-105'
                  : 'bg-gradient-to-br from-govblue-900 via-slate-900 to-govblue-800 text-white hover:ring-2 hover:ring-saffron-400 hover:scale-105'
                }`}
            >
              <span>{userInitials}</span>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" title="Verified Session Active" />
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
            onClick={() => setActiveTab('tiers')}
            className={`px-3 py-1.5 rounded-lg font-bold shrink-0 ${activeTab === 'tiers' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Tiers
          </button>
          <button
            onClick={() => setActiveTab('procurement')}
            className={`px-3 py-1.5 rounded-lg font-bold shrink-0 ${activeTab === 'procurement' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Procurement
          </button>
          <button
            onClick={() => setActiveTab('dept-upload')}
            className={`px-3 py-1.5 rounded-lg font-bold shrink-0 ${activeTab === 'dept-upload' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Post Problem
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
          <button
  onClick={() => setActiveTab('messages')}
  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${
    activeTab === 'messages'
      ? 'bg-govblue-900 text-white shadow'
      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
  }`}
>
  <MessageCircle className="w-4 h-4 text-emerald-400" />
  <span>Messages</span>
</button>
          <button
            onClick={() => setActiveTab('tiers')}
            className={`px-3 py-1.5 rounded-lg font-bold shrink-0 ${activeTab === 'tiers' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Tiers
          </button>
          <button
            onClick={() => setActiveTab('procurement')}
            className={`px-3 py-1.5 rounded-lg font-bold shrink-0 ${activeTab === 'procurement' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Procurement
          </button>
        </div>
      </div>
    </header>
  );
};
