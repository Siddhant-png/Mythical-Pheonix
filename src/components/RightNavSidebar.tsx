import React from 'react';
import { NavTab } from './Header';
import { UserRole } from '../types';

interface RightNavSidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  activeCollabCount: number;
  userRole?: UserRole;
}

export const RightNavSidebar: React.FC<RightNavSidebarProps> = ({ activeTab, setActiveTab, userRole }) => {
  const isGovernmentView = userRole === 'dept';

  return (
    <aside className="w-full font-body sticky top-[72px] space-y-3">
      <div className="bg-white rounded-xl border border-slate-200 p-3 space-y-2">
        <div className="flex items-center text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2 px-1">
          <span>Actions</span>
        </div>

        <nav className="flex flex-col space-y-1">
          <button
            onClick={() => setActiveTab('dept-upload')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-xs font-semibold ${
              activeTab === 'dept-upload'
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span className="truncate">Post Challenge / RFP</span>
          </button>

          <button
            onClick={() => setActiveTab('discovery')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-xs font-semibold ${
              activeTab === 'discovery'
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span className="truncate">Explore Startups</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-xs font-semibold ${
              activeTab === 'categories'
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span className="truncate">Browse Categories</span>
          </button>

          {isGovernmentView && (
            <button
              onClick={() => setActiveTab('proposals')}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-xs font-semibold ${
                activeTab === 'proposals'
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="truncate">Proposed Solutions</span>
            </button>
          )}
        </nav>
      </div>
    </aside>
  );
};
