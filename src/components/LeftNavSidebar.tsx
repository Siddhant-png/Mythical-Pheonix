import React, { useState } from 'react';
import { 
  Building2, 
  SearchCheck, 
  ChevronDown,
  ChevronUp,
  LayoutGrid
} from 'lucide-react';
import { NavTab } from './Header';

interface LeftNavSidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenStartupProfile?: (startupId: string) => void;
  searchQuery?: string;
  setSearchQuery?: any;
  selectedSector?: string;
  setSelectedSector?: any;
  selectedStatus?: string;
  setSelectedStatus?: any;
  maxBudget?: number;
  setMaxBudget?: any;
  collabOnly?: boolean;
  setCollabOnly?: any;
  onResetFilters?: () => void;
}

export const LeftNavSidebar: React.FC<LeftNavSidebarProps> = ({ 
  activeTab, 
  setActiveTab,
  onOpenStartupProfile
}) => {
  const [isStartupsOpen, setIsStartupsOpen] = useState(true);
  const [isInnovationsOpen, setIsInnovationsOpen] = useState(true);

  const topNavItems = [
    { id: 'problems', label: 'Home', icon: Building2, activeTabTarget: 'problems' as NavTab },
    { id: 'categories', label: 'All Categories', icon: LayoutGrid, activeTabTarget: 'categories' as NavTab },
    { id: 'discovery', label: 'Startup Discovery', icon: SearchCheck, activeTabTarget: 'discovery' as NavTab },
  ];

  const followedStartups = [
    { id: 'startup-1', name: 'Drishti Edge Tech', sector: 'Edge AI', initials: 'DE' },
    { id: 'startup-2', name: 'AquaPulse Sensing', sector: 'Water IoT', initials: 'AP' },
    { id: 'startup-4', name: 'GreenRoute Mobility', sector: 'EV Mobility', initials: 'GM' }
  ];

  const followedInnovations = [
    { id: 'prob-101', title: 'AI Pothole & Road Quality', dept: 'PWD Maharashtra' },
    { id: 'prob-102', title: 'Bio-Pesticide Micro-Drone', dept: 'Agri Dept' },
    { id: 'prob-103', title: 'Portable Non-Invasive Screener', dept: 'Public Health' }
  ];

  return (
    <aside className="w-full font-body sticky top-[72px] space-y-3 select-none">
      {/* Top Nav Links */}
      <nav className="space-y-1">
        {topNavItems.map((item) => {
          const isActive = activeTab === item.activeTabTarget;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.activeTabTarget)}
              className={`w-full flex items-center px-3 py-2 rounded-md text-xs font-semibold ${
                isActive
                  ? 'bg-slate-200 text-slate-900 font-bold'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        <button
          onClick={() => setActiveTab('dept-upload')}
          className={`w-full flex items-center px-3 py-2 rounded-md text-xs font-semibold ${
            activeTab === 'dept-upload'
              ? 'bg-slate-200 text-slate-900 font-bold'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <span className="truncate">Post Challenge / RFP</span>
        </button>
      </nav>

      <hr className="border-t border-slate-200" />

      {/* Followed Startups */}
      <div className="space-y-1">
        <div 
          onClick={() => setIsStartupsOpen(!isStartupsOpen)}
          className="flex items-center justify-between px-2 py-1 cursor-pointer text-[10px] font-bold text-slate-500 uppercase tracking-wider"
        >
          <span>Startups You Follow</span>
          {isStartupsOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </div>

        {isStartupsOpen && (
          <div className="space-y-0.5">
            {followedStartups.map((st) => (
              <div
                key={st.id}
                onClick={() => {
                  onOpenStartupProfile?.(st.id);
                }}
                className="w-full flex items-center px-2 py-1.5 rounded text-xs text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <div className="truncate font-medium text-[11px]">{st.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <hr className="border-t border-slate-200" />

      {/* Followed Innovations */}
      <div className="space-y-1">
        <div 
          onClick={() => setIsInnovationsOpen(!isInnovationsOpen)}
          className="flex items-center justify-between px-2 py-1 cursor-pointer text-[10px] font-bold text-slate-500 uppercase tracking-wider"
        >
          <span>Innovations You Follow</span>
          {isInnovationsOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </div>

        {isInnovationsOpen && (
          <div className="space-y-0.5">
            {followedInnovations.map((inv) => (
              <div
                key={inv.id}
                onClick={() => setActiveTab('problems')}
                className="w-full flex items-center px-2 py-1.5 rounded text-xs text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <div className="truncate font-medium text-[11px]">{inv.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
