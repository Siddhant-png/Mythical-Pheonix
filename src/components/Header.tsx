import React from 'react';
import { 
  Building2, 
  Handshake, 
  PlusCircle, 
  FlaskConical, 
  Repeat, 
  ShieldCheck, 
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'problems' | 'collab' | 'dept-upload' | 'pilots' | 'scale';
  setActiveTab: (tab: 'problems' | 'collab' | 'dept-upload' | 'pilots' | 'scale') => void;
  userRole: 'startup' | 'dept' | 'manufacturer';
  setUserRole: (role: 'startup' | 'dept' | 'manufacturer') => void;
  activeCollabCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  activeCollabCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top MahaGov Saffron-White-Green Tricolor Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF7722] via-white to-[#138808]"></div>

      {/* Official Government Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-white tracking-wide">महाराष्ट्र शासन | Government of Maharashtra</span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-amber-400 font-medium">Smart India Hackathon Problem Code: SIH-136</span>
        </div>
        <div className="flex items-center space-x-4 text-slate-400">
          <span className="hidden sm:inline">DPIIT & GFR-149 Procurement Relaxation Enabled</span>
          <div className="flex items-center space-x-1.5 bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-medium">Sandbox v2.4 Live</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('problems')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-govblue-900 to-govblue-700 text-white flex items-center justify-center shadow-md border border-govblue-500/20">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
                  Maha<span className="text-saffron-600">Setu</span>
                </h1>
                <span className="text-[11px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-300">
                  महासेतू
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Public Innovation & Accelerated Procurement Portal
              </p>
            </div>
          </div>

          {/* Persona / Role Selector Badge */}
          <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <span className="text-xs font-medium text-slate-500 px-2 hidden lg:inline">Viewing as:</span>
            <button
              onClick={() => setUserRole('startup')}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                userRole === 'startup'
                  ? 'bg-white text-saffron-700 shadow-sm font-semibold border border-saffron-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🚀 Startup (Drishti Edge)
            </button>
            <button
              onClick={() => setUserRole('dept')}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                userRole === 'dept'
                  ? 'bg-white text-govblue-800 shadow-sm font-semibold border border-govblue-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏛️ Dept Officer (PWD)
            </button>
            <button
              onClick={() => setUserRole('manufacturer')}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                userRole === 'manufacturer'
                  ? 'bg-white text-emerald-700 shadow-sm font-semibold border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏭 Manufacturer (Sahyadri)
            </button>
          </div>
        </div>

        {/* Action Tabs Bar */}
        <nav className="flex space-x-1 mt-4 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('problems')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${
              activeTab === 'problems'
                ? 'bg-govblue-900 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Problem Directory</span>
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
        </nav>
      </div>
    </header>
  );
};
