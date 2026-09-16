import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { UserRole, AuthUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  initialRole?: UserRole;
}

type AuthType = 'user' | 'government';

const getRoleVerificationBadge = (role: UserRole) => {
  switch (role) {
    case 'dept':
      return 'Government Officer Verified';
    case 'manufacturer':
      return 'Manufacturer Verified';
    case 'citizen':
      return 'Citizen Verified';
    default:
      return 'User Verified';
  }
};

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRole = 'citizen'
}) => {
  const [authType, setAuthType] = useState<AuthType>('user');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [memberId, setMemberId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setAuthType(initialRole === 'dept' ? 'government' : 'user');
      setIsRegisterMode(false);
      setName('');
      setEmail('');
      setPassword('');
      setMemberId('');
      setErrorMessage('');
    }
  }, [isOpen, initialRole]);

  if (!isOpen) return null;

  const isGovernmentFlow = authType === 'government';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedMemberId = memberId.trim();
    const storedAccount = localStorage.getItem('converge-auth-account');

    if (isGovernmentFlow) {
      if (!normalizedEmail || !password || !normalizedMemberId) {
        setErrorMessage('Government email, password, and government ID are required.');
        return;
      }

      const user: AuthUser = {
        id: `gov-${Date.now()}`,
        name: 'Government Officer',
        email: normalizedEmail,
        role: 'dept',
        isVerified: true,
        verificationBadge: getRoleVerificationBadge('dept'),
        departmentCode: normalizedMemberId,
      };

      setErrorMessage('');
      onLoginSuccess(user);
      onClose();
      return;
    }

    if (isRegisterMode) {
      localStorage.setItem('converge-auth-account', JSON.stringify({
        name: name.trim(),
        email: normalizedEmail,
        password,
        memberId: normalizedMemberId,
      }));
    } else {
      let account: { email: string; password: string; memberId: string } | null = null;

      try {
        account = storedAccount ? JSON.parse(storedAccount) : null;
      } catch {
        account = null;
      }

      if (
        !account ||
        account.email !== normalizedEmail ||
        account.password !== password ||
        account.memberId !== normalizedMemberId
      ) {
        setErrorMessage('Email, password, or ID is incorrect.');
        return;
      }
    }

    setErrorMessage('');

    const displayName = isRegisterMode && name.trim()
      ? name.trim()
      : normalizedEmail.split('@')[0];

    const user: AuthUser = {
      id: `user-${Date.now()}`,
      name: displayName,
      email: normalizedEmail,
      role: initialRole === 'dept' ? 'citizen' : initialRole,
      isVerified: true,
      verificationBadge: getRoleVerificationBadge(initialRole === 'dept' ? 'citizen' : initialRole),
      dpiitNo: normalizedMemberId,
    };

    onLoginSuccess(user);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-white font-body"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
    >
      <div className="min-h-screen w-full bg-white">
        <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-5 py-8 sm:px-8">
          <div className="mb-0 flex items-start justify-between">
            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-blue-700">Converge</p>
              <h2 id="auth-title" className="text-3xl font-bold text-slate-900 leading-none">
                {isGovernmentFlow ? 'Government login' : isRegisterMode ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {isGovernmentFlow
                  ? 'Secure government access using your official credentials.'
                  : isRegisterMode
                    ? 'Register to access the innovation portal.'
                    : 'Log in to continue to the innovation portal.'}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close authentication form"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-0 bg-white p-0">
            <div className="grid grid-cols-2 gap-0">
              {(['user', 'government'] as AuthType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setAuthType(type);
                    setErrorMessage('');
                    setIsRegisterMode(false);
                  }}
                  className={`border border-slate-200 px-2 py-2 text-xs font-semibold transition ${
                    authType === type
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-slate-100 text-slate-700'
                  }`}
                >
                  {type === 'government' ? 'Government' : 'User'}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-0 border border-slate-200 bg-white p-0">
            {!isGovernmentFlow && isRegisterMode && (
              <div className="border-t border-slate-200 p-3">
                <label htmlFor="auth-name" className="mb-1.5 block text-sm font-medium text-slate-700">Name</label>
                <input
                  id="auth-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="w-full border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900"
                  required
                />
              </div>
            )}

            <div className="border-t border-slate-200 p-3">
              <label htmlFor="auth-email" className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={isGovernmentFlow ? 'gov.officer@example.gov.in' : 'you@example.com'}
                className="w-full border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900"
                required
              />
            </div>

            <div className="border-t border-slate-200 p-3">
              <label htmlFor="auth-password" className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={isGovernmentFlow ? 'Official access password' : 'Enter your password'}
                minLength={6}
                className="w-full border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900"
                required
              />
            </div>

            <div className="border-t border-slate-200 p-3">
              <label htmlFor="auth-member-id" className="mb-1.5 block text-sm font-medium text-slate-700">
                {isGovernmentFlow ? 'Government ID' : 'User ID'}
              </label>
              <input
                id="auth-member-id"
                type="text"
                value={memberId}
                onChange={(event) => setMemberId(event.target.value)}
                placeholder={isGovernmentFlow ? 'PWD-2024-1182' : 'DIPP-MH-2023-98442'}
                className="w-full border border-slate-300 px-3 py-2.5 text-sm uppercase outline-none focus:border-slate-900"
                required
              />
            </div>

            {errorMessage && (
              <p className="border-t border-slate-200 px-3 py-2 text-sm text-red-600" role="alert">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full border-t border-slate-200 bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              {isGovernmentFlow ? 'Log in' : isRegisterMode ? 'Create account' : 'Log in'}
            </button>
          </form>

          {!isGovernmentFlow && (
            <div className="mt-0 border border-t-0 border-slate-200 bg-slate-100 px-3 py-2 text-center text-sm text-slate-500">
              {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsRegisterMode((currentMode) => !currentMode)}
                className="font-semibold text-slate-900 hover:text-slate-700"
              >
                {isRegisterMode ? 'Log in' : 'Register'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
