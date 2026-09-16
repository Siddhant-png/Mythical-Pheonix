import React from 'react';
import { NavTab } from './Header';

interface RightNavSidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  activeCollabCount: number;
}

export const RightNavSidebar: React.FC<RightNavSidebarProps> = ({ activeTab, setActiveTab, activeCollabCount }) => {
  return (
    <aside className="w-full translate-x-4 font-body sticky top-[72px] h-[calc(100vh-80px)] overflow-y-auto pr-1.5 pb-8 space-y-3 scrollbar-none">
      <div className="bg-white/95 rounded-2xl border border-[#E6E1F4] p-3 shadow-[0_8px_24px_rgba(111,103,133,0.06)] space-y-2">
        <div className="flex items-center text-[11px] font-black uppercase tracking-wider text-[#6F6785] border-b border-[#E6E1F4] pb-2 px-1">
          <span>Actions</span>
        </div>

        <nav className="flex flex-col space-y-1">
          <button
            onClick={() => setActiveTab('collab')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'collab'
                ? 'bg-[#312B41] text-white shadow-md border-l-4 border-[#CAB9E3]'
                : 'text-[#6F6785] hover:text-[#312B41] hover:bg-[#E6E1F4]/50'
            }`}
          >
            <span className="truncate">Manufacturer NDA</span>
            {activeCollabCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-[#CAB9E3] text-[#312B41] font-extrabold shrink-0">
                {activeCollabCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('dept-upload')}
            className={`w-full flex items-center px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'dept-upload'
                ? 'bg-[#312B41] text-white shadow-md border-l-4 border-[#CAB9E3]'
                : 'text-[#6F6785] hover:text-[#312B41] hover:bg-[#E6E1F4]/50'
            }`}
          >
            <span className="truncate">Post Problem</span>
          </button>

          <button
            onClick={() => setActiveTab('pilots')}
            className={`w-full flex items-center px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'pilots'
                ? 'bg-[#312B41] text-white shadow-md border-l-4 border-[#CAB9E3]'
                : 'text-[#6F6785] hover:text-[#312B41] hover:bg-[#E6E1F4]/50'
            }`}
          >
            <span className="truncate">Sandbox Scorecard</span>
          </button>

          <button
            onClick={() => setActiveTab('scale')}
            className={`w-full flex items-center px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'scale'
                ? 'bg-[#312B41] text-white shadow-md border-l-4 border-[#CAB9E3]'
                : 'text-[#6F6785] hover:text-[#312B41] hover:bg-[#E6E1F4]/50'
            }`}
          >
            <span className="truncate">Scale Registry</span>
          </button>

          <button
            onClick={() => setActiveTab('tiers')}
            className={`w-full flex items-center px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'tiers'
                ? 'bg-[#312B41] text-white shadow-md border-l-4 border-[#CAB9E3]'
                : 'text-[#6F6785] hover:text-[#312B41] hover:bg-[#E6E1F4]/50'
            }`}
          >
            <span className="truncate">Tier Progress</span>
          </button>

          <button
            onClick={() => setActiveTab('procurement')}
            className={`w-full flex items-center px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'procurement'
                ? 'bg-[#312B41] text-white shadow-md border-l-4 border-[#CAB9E3]'
                : 'text-[#6F6785] hover:text-[#312B41] hover:bg-[#E6E1F4]/50'
            }`}
          >
            <span className="truncate">Procurement Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`w-full flex items-center px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'templates'
                ? 'bg-[#312B41] text-white shadow-md border-l-4 border-[#CAB9E3]'
                : 'text-[#6F6785] hover:text-[#312B41] hover:bg-[#E6E1F4]/50'
            }`}
          >
            <span className="truncate">Standard Templates</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};
