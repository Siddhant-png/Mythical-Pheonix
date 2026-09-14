import React from 'react';
import { Filter, RotateCcw, Search, Check } from 'lucide-react';
import { ProblemSector } from '../types';

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  maxBudget: number;
  setMaxBudget: (budget: number) => void;
  collabOnly: boolean;
  setCollabOnly: (val: boolean) => void;
  onReset: () => void;
}

const SECTORS: ProblemSector[] = [
  'Smart Automation & AI',
  'Agriculture & Allied',
  'MedTech & Public Health',
  'Clean Energy & Water',
  'Smart Mobility & Logistics',
  'Disaster Management'
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedSector,
  setSelectedSector,
  selectedStatus,
  setSelectedStatus,
  maxBudget,
  setMaxBudget,
  collabOnly,
  setCollabOnly,
  onReset
}) => {
  return (
    <aside className="bg-white/90 rounded-2xl border border-slate-200/80 p-6 shadow-[0_12px_28px_rgba(15,23,42,0.06)] space-y-6 font-body">
      {/* Title & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-brand-border">
        <div className="flex items-center space-x-2 font-bold text-brand-text text-sm">
          <Filter className="w-4 h-4 text-govblue-700" />
          <span>Filter Challenges</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-brand-textMuted hover:text-brand-text flex items-center space-x-1 hover:underline"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="text-xs font-semibold text-brand-textMuted block mb-1.5">
          Keyword Search
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI, drones, sensors, PWD..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-govblue-700/20 focus:border-govblue-700"
          />
        </div>
      </div>

      {/* Sector Category Filters (SIH Themes) */}
      <div>
        <label className="text-xs font-semibold text-slate-700 block mb-2">
          Sector / Domain (SIH Themes)
        </label>
        <div className="space-y-1.5">
          <button
            onClick={() => setSelectedSector('')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
              selectedSector === ''
                ? 'bg-govblue-50 text-govblue-900 font-bold border border-govblue-200'
                : 'text-brand-textMuted hover:bg-neutral-50'
            }`}
          >
            <span>All Sectors</span>
            {selectedSector === '' && <Check className="w-3.5 h-3.5 text-govblue-700" />}
          </button>
          {SECTORS.map((sector) => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector === selectedSector ? '' : sector)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                selectedSector === sector
                  ? 'bg-govblue-50 text-govblue-900 font-bold border border-govblue-200'
                  : 'text-brand-textMuted hover:bg-neutral-50'
              }`}
            >
              <span className="truncate">{sector}</span>
              {selectedSector === sector && <Check className="w-3.5 h-3.5 text-govblue-700" />}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Ceiling Slider */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-slate-700">Budget Ceiling</label>
          <span className="text-xs font-bold text-govblue-900">
            Up to ₹{(maxBudget / 100000).toFixed(0)} L
          </span>
        </div>
        <input
          type="range"
          min="1000000"
          max="10000000"
          step="500000"
          value={maxBudget}
          onChange={(e) => setMaxBudget(Number(e.target.value))}
          className="w-full accent-govblue-800 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹10 L</span>
          <span>₹50 L</span>
          <span>₹1 Cr</span>
        </div>
      </div>

      {/* Pipeline Stage */}
      <div>
        <label className="text-xs font-semibold text-slate-700 block mb-2">
          Procurement Stage
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {['', 'OPEN', 'PILOTING', 'PROCURED'].map((st) => (
            <button
              key={st || 'ALL'}
              onClick={() => setSelectedStatus(st)}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border text-center transition ${
                selectedStatus === st
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st || 'All Stages'}
            </button>
          ))}
        </div>
      </div>

      {/* Collaboration Toggle */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-center space-x-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={collabOnly}
            onChange={(e) => setCollabOnly(e.target.checked)}
            className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 border-slate-300"
          />
          <span className="text-xs text-slate-700 font-medium leading-tight">
            Show Consortium & Joint Bidding challenges only
          </span>
        </label>
      </div>
    </aside>
  );
};
