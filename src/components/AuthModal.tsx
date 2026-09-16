import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { UserRole, AuthUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRole = 'citizen'
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dpiitId, setDpiitId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setIsRegisterMode(false);
      setName('');
      setEmail('');
      setPassword('');
      setDpiitId('');
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedDpiitId = dpiitId.trim().toUpperCase();
    const storedAccount = localStorage.getItem('converge-auth-account');

    if (isRegisterMode) {
      localStorage.setItem('converge-auth-account', JSON.stringify({
        name: name.trim(),
        email: normalizedEmail,
        password,
        dpiitId: normalizedDpiitId
      }));
    } else {
      let account: { email: string; password: string; dpiitId: string } | null = null;

      try {
        account = storedAccount ? JSON.parse(storedAccount) : null;
      } catch {
        account = null;
      }

      if (
        !account ||
        account.email !== normalizedEmail ||
        account.password !== password ||
        account.dpiitId !== normalizedDpiitId
      ) {
      setErrorMessage('Email, password, or DPIIT ID is incorrect.');
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
      role: initialRole,
      isVerified: true,
      verificationBadge: 'DPIIT ID Verified',
      dpiitNo: normalizedDpiitId
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
      <div className="min-h-screen w-full bg-slate-50">
        <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-5 py-12 sm:px-8">
          <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-700">Converge</p>
            <h2 id="auth-title" className="text-3xl font-bold text-slate-900">
              {isRegisterMode ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {isRegisterMode ? 'Register to access the innovation portal.' : 'Log in to continue to the innovation portal.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close authentication form"
          >
            <X className="h-5 w-5" />
          </button>
          </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {isRegisterMode && (
            <div>
              <label htmlFor="auth-name" className="mb-1.5 block text-sm font-medium text-slate-700">Name</label>
              <input
                id="auth-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label htmlFor="auth-password" className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              minLength={6}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label htmlFor="auth-dpiit" className="mb-1.5 block text-sm font-medium text-slate-700">DPIIT ID</label>
            <input
              id="auth-dpiit"
              type="text"
              value={dpiitId}
              onChange={(event) => setDpiitId(event.target.value)}
              placeholder="DIPP-MH-2023-98442"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm uppercase outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600" role="alert">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
          >
            {isRegisterMode ? 'Create account' : 'Log in'}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-slate-500">
          {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsRegisterMode((currentMode) => !currentMode)}
            className="font-semibold text-blue-700 hover:text-blue-800"
          >
            {isRegisterMode ? 'Log in' : 'Register'}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};
