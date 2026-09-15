import React from 'react';
import { Handshake, PlusCircle, FlaskConical, Repeat, Scale, Zap, ShieldCheck, Milestone, FileCheck2 } from 'lucide-react';
import { NavTab } from './Header';

interface RightNavSidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  activeCollabCount: number;
}

export const RightNavSidebar: React.FC<RightNavSidebarProps> = ({ activeTab, setActiveTab, activeCollabCount }) => {
  return (
    <aside className="w-full translate-x-4 font-body sticky top-[72px] h-[calc(100vh-80px)] overflow-y-auto pr-1.5 pb-8 space-y-3 scrollbar-none">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-[0_8px_30px_rgba(15,23,42,0.04)] space-y-2">
        <div className="flex items-center space-x-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 px-1">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Actions & Alliances</span>
        </div>

        <nav className="flex flex-col space-y-1">
          <button
            onClick={() => setActiveTab('collab')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'collab'
                ? 'bg-slate-900 text-white shadow-md border-l-4 border-amber-400'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <Handshake className={`w-4 h-4 shrink-0 ${activeTab === 'collab' ? 'text-amber-400' : 'text-amber-600'}`} />
              <span className="truncate">Manufacturer NDA</span>
            </div>
            {activeCollabCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-amber-500 text-white font-extrabold shrink-0">
                {activeCollabCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('dept-upload')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'dept-upload'
                ? 'bg-slate-900 text-white shadow-md border-l-4 border-emerald-400'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <PlusCircle className={`w-4 h-4 shrink-0 ${activeTab === 'dept-upload' ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span className="truncate">Post Problem</span>
          </button>

          <button
            onClick={() => setActiveTab('pilots')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'pilots'
                ? 'bg-slate-900 text-white shadow-md border-l-4 border-purple-400'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <FlaskConical className={`w-4 h-4 shrink-0 ${activeTab === 'pilots' ? 'text-purple-300' : 'text-purple-600'}`} />
            <span className="truncate">Sandbox Scorecard</span>
          </button>

          <button
            onClick={() => setActiveTab('scale')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'scale'
                ? 'bg-slate-900 text-white shadow-md border-l-4 border-sky-400'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Repeat className={`w-4 h-4 shrink-0 ${activeTab === 'scale' ? 'text-sky-300' : 'text-sky-600'}`} />
            <span className="truncate">Scale Registry</span>
          </button>

          <button
            onClick={() => setActiveTab('tiers')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'tiers'
                ? 'bg-slate-900 text-white shadow-md border-l-4 border-amber-400'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Milestone className={`w-4 h-4 shrink-0 ${activeTab === 'tiers' ? 'text-amber-300' : 'text-amber-600'}`} />
            <span className="truncate">Tier Progress</span>
          </button>

          <button
            onClick={() => setActiveTab('procurement')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'procurement'
                ? 'bg-slate-900 text-white shadow-md border-l-4 border-emerald-400'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <FileCheck2 className={`w-4 h-4 shrink-0 ${activeTab === 'procurement' ? 'text-emerald-300' : 'text-emerald-600'}`} />
            <span className="truncate">Procurement Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'templates'
                ? 'bg-slate-900 text-white shadow-md border-l-4 border-amber-300'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Scale className={`w-4 h-4 shrink-0 ${activeTab === 'templates' ? 'text-amber-300' : 'text-amber-600'}`} />
            <span className="truncate">Standard Templates</span>
          </button>
        </nav>
      </div>

      {/* Quick Action Widget */}
      <div className="bg-gradient-to-br from-govblue-900 via-govblue-800 to-slate-950 rounded-2xl p-3.5 text-white space-y-2.5 shadow-md border border-govblue-700/80">
        <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>DPIIT Exemption Rule</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Startups exempt from turnover rules under GFR Rule 149. Consortium M-NDA available.
        </p>
        <button
          onClick={() => setActiveTab('collab')}
          className="w-full py-1.5 bg-saffron-500 hover:bg-saffron-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-sm"
        >
          Form Consortium Now
        </button>
      </div>
    </aside>
  );
};
