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
  Star,
  ChevronDown,
  ChevronUp,
  Plus,
  Zap,
  Filter,
  Search,
  RotateCcw,
  MessageCircle,
  LayoutGrid
} from 'lucide-react';
import { NavTab } from './Header';
import { MASTER_INTERESTS } from '../data/mockData';

const ICON_MAP: Record<string, any> = {
  Bot,
  Sprout,
  HeartPulse,
  Droplets,
  Truck,
  ShieldAlert
};

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
  selectedInterestIds?: string[];
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
  onResetFilters,
  selectedInterestIds = ['ai-vision', 'agri-drones', 'medtech', 'clean-water']
}) => {
  // Collapsible section states
  const [isInterestsOpen, setIsInterestsOpen] = useState(true);
  const [isStartupsOpen, setIsStartupsOpen] = useState(true);
  const [isInnovationsOpen, setIsInnovationsOpen] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);

  const topNavItems = [
    { id: 'problems', label: 'Home / Directory', icon: Building2, activeTabTarget: 'problems' as NavTab },
    { id: 'categories', label: 'All Categories', icon: LayoutGrid, activeTabTarget: 'categories' as NavTab },
    { id: 'feed', label: 'Civic Shorts Feed', icon: Flame, activeTabTarget: 'feed' as NavTab },
    { id: 'discovery', label: 'Startup Discovery', icon: SearchCheck, activeTabTarget: 'discovery' as NavTab },
    { id: 'profiles', label: 'Startup Profiles', icon: Rocket, activeTabTarget: 'profiles' as NavTab },
    { id: 'messages', label: 'Messages', icon: MessageCircle, activeTabTarget: 'messages' as NavTab },
  ];

  const activeInterests = MASTER_INTERESTS.filter(item => selectedInterestIds.includes(item.id));

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
      
      {/* Brand Header Banner Card */}
      <div className="p-3 mb-2 bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#6d28d9] rounded-2xl text-white shadow-sm flex items-center space-x-3 border border-indigo-400/30">
        <div className="w-9 h-9 rounded-xl bg-[#dce5f2] p-1 shrink-0 flex items-center justify-center shadow-xs">
          <img src="/logo.png" alt="Converge" className="w-full h-full object-contain" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-black tracking-wide truncate">CONVERGE PORTAL</div>
          <div className="text-[10px] text-indigo-100 truncate font-medium">Govt Innovation Sandbox</div>
        </div>
      </div>

      {/* Top Nav Buttons (Reddit Sidebar Style with Brand Theme) */}
      <div className="space-y-1">
        {topNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.activeTabTarget;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.activeTabTarget);
              }}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'border-2 border-[#1e3a8a] rounded-2xl bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-white text-[#1e3a8a] shadow-xs font-extrabold ring-1 ring-purple-300/40'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#6d28d9]' : 'text-slate-600'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        {/* Action Button: Post Challenge / RFP */}
        <button
          onClick={() => setActiveTab('dept-upload')}
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all duration-150"
        >
          <Plus className="w-4 h-4 text-slate-600 shrink-0" />
          <span className="truncate">Post Challenge / RFP</span>
        </button>
      </div>

      {/* Divider */}
      <hr className="border-t border-slate-200/90 my-2.5" />

      {/* Section 1: YOUR INTERESTS (Collapsible) */}
      <div className="space-y-1.5">
        <div 
          onClick={() => setIsInterestsOpen(!isInterestsOpen)}
          className="flex items-center justify-between px-2 py-1 cursor-pointer group text-[11px] font-bold tracking-wider text-slate-500 hover:text-slate-800 uppercase"
        >
          <span>Your Interests</span>
          {isInterestsOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
          )}
        </div>

        {isInterestsOpen && (
          <div className="space-y-1">
            {activeInterests.length === 0 ? (
              <div 
                onClick={() => setActiveTab('account')}
                className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center cursor-pointer hover:bg-slate-100 transition space-y-1"
              >
                <p className="text-[11px] font-bold text-slate-700">No interests selected</p>
                <p className="text-[10px] text-slate-500">Choose interests in Account Profile →</p>
              </div>
            ) : (
              activeInterests.map((item) => {
                const Icon = ICON_MAP[item.iconName] || Bot;
                const isSelected = selectedInterest === item.id || selectedSector === item.sectorName;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedInterest(null);
                        setSelectedSector?.('');
                      } else {
                        setSelectedInterest(item.id);
                        setSelectedSector?.(item.sectorName);
                      }
                      setActiveTab('problems');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white font-bold'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div className={`w-5 h-5 rounded-md ${item.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </div>
                    <Star className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-saffron-400 fill-saffron-400' : 'text-slate-300 hover:text-amber-500'}`} />
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Divider */}
      <hr className="border-t border-slate-200 my-2.5" />

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
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0 ml-1" />
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
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <hr className="border-t border-slate-200 my-2.5" />

      {/* Section 4: FILTER CHALLENGES (Placed at bottom of Left Nav Bar) */}
      <div className="space-y-2 pt-1">
        <div 
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center justify-between px-2 py-1 cursor-pointer group text-[11px] font-bold tracking-wider text-slate-500 hover:text-slate-800 uppercase"
        >
          <div className="flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5 text-govblue-700" />
            <span>Filter Challenges</span>
          </div>
          {isFiltersOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
          )}
        </div>

        {isFiltersOpen && (
          <div className="p-3 bg-white border border-slate-200/90 rounded-2xl space-y-3 text-xs shadow-xs">
            {/* Search Input */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Search Keywords</label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery?.(e.target.value)}
                  placeholder="AI, PWD, Agri..."
                  className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                />
              </div>
            </div>

            {/* Sector / Domain Select */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Sector / Domain</label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector?.(e.target.value)}
                className="w-full p-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold focus:outline-none"
              >
                <option value="">All Sectors</option>
                <option value="Smart Automation & AI">Smart Automation & AI</option>
                <option value="Agriculture & Allied">Agriculture & Allied</option>
                <option value="MedTech & Public Health">MedTech & Public Health</option>
                <option value="Clean Energy & Water">Clean Energy & Water</option>
                <option value="Smart Mobility & Logistics">Smart Mobility & Logistics</option>
                <option value="Disaster Management">Disaster Management</option>
              </select>
            </div>

            {/* Budget Ceiling Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-slate-700">Max Budget</label>
                <span className="text-[11px] font-black text-govblue-900">
                  ₹{(maxBudget / 100000).toFixed(0)} L
                </span>
              </div>
              <input
                type="range"
                min="1000000"
                max="10000000"
                step="500000"
                value={maxBudget}
                onChange={(e) => setMaxBudget?.(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
              />
            </div>

            {/* Procurement Stage Buttons */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Procurement Stage</label>
              <div className="grid grid-cols-2 gap-1 text-[10px]">
                {['', 'OPEN', 'PILOTING', 'PROCURED'].map((st) => (
                  <button
                    key={st || 'ALL'}
                    onClick={() => setSelectedStatus?.(st)}
                    className={`py-1 px-1.5 rounded-lg font-bold border text-center transition ${
                      selectedStatus === st
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {st || 'All Stages'}
                  </button>
                ))}
              </div>
            </div>

            {/* Consortium Toggle */}
            <div className="pt-1.5 border-t border-slate-100">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={collabOnly}
                  onChange={(e) => setCollabOnly?.(e.target.checked)}
                  className="w-3.5 h-3.5 text-slate-900 rounded border-slate-300"
                />
                <span className="text-[11px] font-medium text-slate-700 leading-tight">
                  Consortium / Joint Bidding only
                </span>
              </label>
            </div>

            {/* Reset Button */}
            {onResetFilters && (
              <button
                onClick={onResetFilters}
                className="w-full py-1.5 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center space-x-1 transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        )}
      </div>

    </aside>
  );
};
