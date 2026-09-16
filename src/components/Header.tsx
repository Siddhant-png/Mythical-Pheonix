import React from 'react';
import { LogIn } from 'lucide-react';
import { UserRole, AuthUser } from '../types';

export type NavTab = 
  | 'problems' 
  | 'categories'
  | 'feed'
  | 'discovery' 
  | 'profiles' 
  | 'dept-upload' 
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
  currentUser,
  onOpenAuthModal,
  onLogout,
  onOpenMyProfile
}) => {
  const userInitials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'AD';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('problems')}>
            <img 
              src="/logo-transparent.png" 
              alt="Converge" 
              className="h-8 w-auto object-contain" 
            />
            <h1 className="text-lg font-bold font-heading text-slate-900 tracking-tight">
              Converge
            </h1>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Circular Profile Button (Self Account Page) */}
            <button
              onClick={onOpenMyProfile}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                activeTab === 'account'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-200 text-slate-700'
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
      </div>
    </header>
  );
};
