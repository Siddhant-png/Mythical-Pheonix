import React, { useState } from 'react';
import { 
  Building2, 
  Flame, 
  SearchCheck, 
  Rocket, 
  Bot, 
  Sprout, 
  HeartPulse, 
  Droplets, 
  Truck,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Plus,
  Zap,
  Filter,
  Search,
  RotateCcw,
  LayoutGrid
} from 'lucide-react';
import { NavTab } from './Header';

interface LeftNavSidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenStartupProfile?: (startupId: string) => void;
  // Filter props
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  selectedSector?: string;
  setSelectedSector?: (s: string) => void;
  selectedStatus?: string;
  setSelectedStatus?: (st: string) => void;
  maxBudget?: number;
  setMaxBudget?: (b: number) => void;
  collabOnly?: boolean;
  setCollabOnly?: (val: boolean) => void;
  onResetFilters?: () => void;
}

export const LeftNavSidebar: React.FC<LeftNavSidebarProps> = ({ 
  activeTab, 
  setActiveTab,
  onOpenStartupProfile,
  searchQuery = '',
  setSearchQuery,
  selectedSector = '',
  setSelectedSector,
  selectedStatus = '',
  setSelectedStatus,
  maxBudget = 10000000,
  setMaxBudget,
  collabOnly = false,
  setCollabOnly,
  onResetFilters
}) => {
  // Collapsible section states
  const [isStartupsOpen, setIsStartupsOpen] = useState(true);
  const [isInnovationsOpen, setIsInnovationsOpen] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  const topNavItems = [
    { id: 'problems', label: 'Home', icon: Building2, activeTabTarget: 'problems' as NavTab },
    { id: 'categories', label: 'All Categories', icon: LayoutGrid, activeTabTarget: 'categories' as NavTab },
    { id: 'feed', label: 'Solution Shorts Feed', icon: Flame, activeTabTarget: 'feed' as NavTab },
    { id: 'discovery', label: 'Startup Discovery', icon: SearchCheck, activeTabTarget: 'discovery' as NavTab },
  ];

  const followedStartups = [
    { id: 'startup-1', name: 'Drishti Edge Tech', sector: 'Edge AI', initials: 'DE', color: 'bg-slate-900' },
    { id: 'startup-2', name: 'AquaPulse Sensing', sector: 'Water IoT', initials: 'AP', color: 'bg-sky-700' },
    { id: 'startup-4', name: 'GreenRoute Mobility', sector: 'EV Mobility', initials: 'GM', color: 'bg-emerald-700' }
  ];

  const followedInnovations = [
    { id: 'prob-101', title: 'AI Pothole & Road Quality', dept: 'PWD Maharashtra', category: 'Infra' },
    { id: 'prob-102', title: 'Bio-Pesticide Micro-Drone', dept: 'Agri Dept', category: 'AgriTech' },
    { id: 'prob-103', title: 'Portable Non-Invasive Screener', dept: 'Public Health', category: 'MedTech' }
  ];

  return (
    <aside className="w-full font-body sticky top-[72px] h-[calc(100vh-80px)] overflow-y-auto pr-1.5 pl-0.5 pt-2 pb-8 space-y-2 scrollbar-none select-none">
      {/* Top Nav Buttons */}
      <div className="space-y-1">
        {topNavItems.map((item) => {
          const isActive = activeTab === item.activeTabTarget;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.activeTabTarget);
              }}
              className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'border-2 border-[#1e3a8a] rounded-2xl bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-white text-[#1e3a8a] shadow-xs font-extrabold ring-1 ring-purple-300/40'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        {/* Action Button: Post Challenge / RFP */}
        <button
          onClick={() => setActiveTab('dept-upload')}
          className="w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all duration-150"
        >
          <span className="truncate">Post Challenge / RFP</span>
        </button>
      </div>

      {/* Divider */}
      <hr className="border-t border-slate-200/90 my-2.5" />

      {/* Section 2: STARTUPS YOU FOLLOW (Collapsible) */}
      <div className="space-y-1.5">
        <div 
          onClick={() => setIsStartupsOpen(!isStartupsOpen)}
          className="flex items-center justify-between px-2 py-1 cursor-pointer group text-[11px] font-bold tracking-wider text-slate-500 hover:text-slate-800 uppercase"
        >
          <span>Startups You Follow</span>
          {isStartupsOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
          )}
        </div>

        {isStartupsOpen && (
          <div className="space-y-0.5">
            {followedStartups.map((st) => (
              <div
                key={st.id}
                onClick={() => {
                  onOpenStartupProfile?.(st.id);
                  setActiveTab('profiles');
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer transition group"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className={`w-6 h-6 rounded-full ${st.color} text-white font-black text-[9px] flex items-center justify-center shrink-0 shadow-xs`}>
                    {st.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-bold text-slate-800 text-[11px] group-hover:text-slate-950">
                      {st.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <hr className="border-t border-slate-200 my-2.5" />

      {/* Section 3: INNOVATIONS YOU FOLLOW (Collapsible) */}
      <div className="space-y-1.5">
        <div 
          onClick={() => setIsInnovationsOpen(!isInnovationsOpen)}
          className="flex items-center justify-between px-2 py-1 cursor-pointer group text-[11px] font-bold tracking-wider text-slate-500 hover:text-slate-800 uppercase"
        >
          <span>Innovations You Follow</span>
          {isInnovationsOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
          )}
        </div>

        {isInnovationsOpen && (
          <div className="space-y-0.5">
            {followedInnovations.map((inv) => (
              <div
                key={inv.id}
                onClick={() => setActiveTab('problems')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer transition group"
              >
                <div className="min-w-0 pr-1">
                  <div className="truncate font-bold text-slate-800 text-[11px] group-hover:text-slate-950">
                    {inv.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {inv.dept} • {inv.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
    </aside>
  );
};
