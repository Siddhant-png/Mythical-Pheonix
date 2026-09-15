import React, { useState } from 'react';
import { Bell, Check, ChevronRight, KeyRound, LockKeyhole, LogOut, Mail, ShieldCheck, Smartphone } from 'lucide-react';
import { AuthUser } from '../types';

interface SettingsProps {
  currentUser: AuthUser;
  onResetPassword: () => void;
  onShowToast: (message: string) => void;
  onLogout: () => void;
}

const SettingToggle: React.FC<{ label: string; description: string; defaultOn?: boolean }> = ({ label, description, defaultOn = true }) => {
  const [enabled, setEnabled] = useState(defaultOn);
  return <div className="flex items-center justify-between gap-4 py-4">
    <div><p className="text-sm font-bold text-slate-800">{label}</p><p className="mt-0.5 text-xs leading-5 text-slate-500">{description}</p></div>
    <button onClick={() => setEnabled(!enabled)} aria-label={`${enabled ? 'Disable' : 'Enable'} ${label}`} className={`relative h-7 w-12 shrink-0 rounded-full transition ${enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}>
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${enabled ? 'left-6' : 'left-1'}`} />
    </button>
  </div>;
};

export const Settings: React.FC<SettingsProps> = ({ currentUser, onResetPassword, onShowToast, onLogout }) => {
  return <section className="mx-auto max-w-4xl space-y-6 pb-12">
    <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-[#0b3470] to-teal-700 p-7 text-white shadow-xl sm:p-9">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold"><ShieldCheck className="h-4 w-4 text-amber-300" /> ACCOUNT SETTINGS</div>
      <h2 className="mt-4 text-3xl font-black tracking-tight">Control your Converge account</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-sky-100">Manage security, alerts and privacy for {currentUser.email}.</p>
    </div>

    <div className="grid gap-5 lg:grid-cols-2">
      <div className="gov-card p-5 sm:p-6"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-100 text-sky-800"><KeyRound className="h-5 w-5" /></span><div><h3 className="font-black text-slate-900">Security</h3><p className="text-xs text-slate-500">Keep access to your account protected.</p></div></div>
        <div className="mt-4 divide-y divide-slate-100 border-y border-slate-100"><button onClick={onResetPassword} className="flex w-full items-center justify-between gap-3 py-4 text-left"><span><span className="block text-sm font-bold text-slate-800">Reset password</span><span className="mt-0.5 block text-xs text-slate-500">Send a reset code to your email address.</span></span><ChevronRight className="h-5 w-5 text-slate-400" /></button><button onClick={() => onShowToast('Two-step verification setup is ready for your account.')} className="flex w-full items-center justify-between gap-3 py-4 text-left"><span className="flex items-center gap-3"><Smartphone className="h-4 w-4 text-slate-500" /><span><span className="block text-sm font-bold text-slate-800">Two-step verification</span><span className="mt-0.5 block text-xs text-slate-500">Add an extra layer of security.</span></span></span><ChevronRight className="h-5 w-5 text-slate-400" /></button></div>
      </div>

      <div className="gov-card p-5 sm:p-6"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800"><Bell className="h-5 w-5" /></span><div><h3 className="font-black text-slate-900">Notifications</h3><p className="text-xs text-slate-500">Choose how Converge keeps you updated.</p></div></div><div className="mt-4 divide-y divide-slate-100 border-y border-slate-100"><SettingToggle label="Account and security alerts" description="Get notified about sign-ins and account changes." /><SettingToggle label="Opportunity updates" description="Receive relevant challenges, pilots and procurement updates." defaultOn={false} /></div></div>
    </div>

    <div className="gov-card p-5 sm:p-6"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-800"><LockKeyhole className="h-5 w-5" /></span><div><h3 className="font-black text-slate-900">Privacy and contact</h3><p className="text-xs text-slate-500">Your verified identity remains protected.</p></div></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs font-bold text-slate-500"><Mail className="h-4 w-4" /> EMAIL ADDRESS</div><p className="mt-2 text-sm font-bold text-slate-800">{currentUser.email}</p><button onClick={() => onShowToast('Contact-email changes require identity verification.')} className="mt-3 text-xs font-bold text-sky-700 hover:text-sky-900">Request email change</button></div><div className="rounded-2xl bg-emerald-50 p-4"><div className="flex items-center gap-2 text-xs font-bold text-emerald-700"><Check className="h-4 w-4" /> IDENTITY STATUS</div><p className="mt-2 text-sm font-bold text-slate-800">{currentUser.verificationBadge}</p><p className="mt-3 text-xs text-emerald-700">Verified account information is visible only where required.</p></div></div></div>

    <div className="flex justify-end border-t border-slate-200 pt-6"><button onClick={onLogout} className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-xs font-bold text-rose-700 shadow-sm transition hover:bg-rose-50"><LogOut className="h-4 w-4" /> Log out</button></div>
  </section>;
};
