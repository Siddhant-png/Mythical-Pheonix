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
  User,
  MessageCircle,
  Rocket,
  Milestone,
  LayoutGrid
} from 'lucide-react';
import { UserRole, AuthUser } from '../types';

export type NavTab = 
  | 'problems' 
  | 'categories'
  | 'feed' 
  | 'discovery' 
  | 'profiles' 
  | 'collab' 
  | 'dept-upload' 
  | 'pilots' 
  | 'scale' 
  | 'tiers' 
  | 'procurement' 
  | 'templates' 
  | 'account';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeCollabCount: number;
  currentUser: AuthUser | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
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
  onLogout,
  onOpenMyProfile
}) => {
  const userInitials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'AD';

  return (
    <header className="sticky top-0 z-40 bg-[#E6E1F4] border-b border-[#CAB9E3] shadow-xs font-body">
      {/* Top Bar - Misty Lavender */}
      <div className="h-1.5 w-full bg-[#CAB9E3]"></div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('problems')}>
            <div className="relative h-11 w-11 flex items-center justify-center">
              <img 
                src="/logo-transparent.png" 
                alt="Converge Brand Logo" 
                className="h-full w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(49,43,65,0.15)]" 
              />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight font-heading text-[#312B41]">
                Converge
              </h1>
            </div>
          </div>

          {/* User Persona & Authentication Bar */}
          <div className="flex items-center space-x-3 flex-wrap gap-y-2">

            {/* Circular Profile Button (Self Account Page) */}
            <button
              onClick={onOpenMyProfile}
              title="Open My Full Account Profile"
              className={`relative w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shadow-md ${activeTab === 'account'
                  ? 'bg-slate-900 text-white ring-4 ring-saffron-400 ring-offset-2'
                  : 'bg-gradient-to-br from-govblue-900 via-slate-900 to-govblue-800 text-white hover:ring-2 hover:ring-saffron-400'
                }`}
            >
              <span>{userInitials}</span>
            </button>

            <button
              onClick={currentUser ? onLogout : onOpenAuthModal}
              className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl border border-slate-200 transition shrink-0"
              title={currentUser ? 'Log out' : 'Log in'}
            >
              {!currentUser && <LogIn className="w-3.5 h-3.5 text-govblue-800" />}
              <span>{currentUser ? 'Logout' : 'Log in'}</span>
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
