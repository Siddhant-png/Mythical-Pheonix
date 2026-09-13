import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ProfileBannerTheme, StartupProfileData } from '../../types';

interface EditProfileModalProps {
  isOpen: boolean;
  profile: StartupProfileData;
  onClose: () => void;
  onSave: (profile: StartupProfileData) => void;
}

type EditableProfile = Pick<
  StartupProfileData,
  'companyName' | 'handle' | 'tagline' | 'bio' | 'location' | 'foundedYear' | 'website' | 'linkedin' | 'twitter' | 'email' | 'techDomains' | 'bannerTheme'
>;

const bannerThemes: ProfileBannerTheme[] = ['govblue', 'emerald', 'saffron', 'purple', 'sunset'];

const inputClassName = 'mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200';

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, profile, onClose, onSave }) => {
  const [form, setForm] = useState<EditableProfile>(profile);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setForm(profile);
      setErrors({});
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const updateField = <Field extends keyof EditableProfile>(field: Field, value: EditableProfile[Field]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    const requiredFields: Array<keyof EditableProfile> = ['companyName', 'handle', 'tagline', 'bio', 'location', 'email'];

    requiredFields.forEach((field) => {
      const value = form[field];
      if (typeof value === 'string' && !value.trim()) {
        nextErrors[field] = 'This field is required.';
      }
    });

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!/^@?[a-zA-Z0-9._-]+$/.test(form.handle.trim())) {
      nextErrors.handle = 'Use letters, numbers, dots, underscores, or hyphens.';
    }
    if (form.foundedYear < 1900 || form.foundedYear > new Date().getFullYear()) {
      nextErrors.foundedYear = 'Enter a valid founding year.';
    }
    if (form.techDomains.length === 0 || form.techDomains.every((domain) => !domain.trim())) {
      nextErrors.techDomains = 'Add at least one technology domain.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    onSave({
      ...profile,
      ...form,
      companyName: form.companyName.trim(),
      handle: form.handle.trim().startsWith('@') ? form.handle.trim() : `@${form.handle.trim()}`,
      tagline: form.tagline.trim(),
      bio: form.bio.trim(),
      location: form.location.trim(),
      website: form.website?.trim() || undefined,
      linkedin: form.linkedin?.trim() || undefined,
      twitter: form.twitter?.trim() || undefined,
      email: form.email.trim(),
      techDomains: form.techDomains.map((domain) => domain.trim()).filter(Boolean)
    });
  };

  const fieldError = (field: keyof EditableProfile) => errors[field] && <p className="mt-1 text-xs font-semibold text-rose-600">{errors[field]}</p>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-3 backdrop-blur-sm sm:p-6">
      <div role="dialog" aria-modal="true" aria-labelledby="edit-profile-title" className="my-4 max-h-[calc(100vh-2rem)] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">My Profile</p>
            <h2 id="edit-profile-title" className="mt-1 text-xl font-black text-slate-900">Edit startup profile</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close edit profile modal" className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-bold text-slate-700">Company name<input className={inputClassName} value={form.companyName} onChange={(event) => updateField('companyName', event.target.value)} />{fieldError('companyName')}</label>
            <label className="text-xs font-bold text-slate-700">Username / handle<input className={inputClassName} value={form.handle} onChange={(event) => updateField('handle', event.target.value)} placeholder="@yourstartup" />{fieldError('handle')}</label>
          </div>

          <label className="block text-xs font-bold text-slate-700">Tagline<input className={inputClassName} value={form.tagline} onChange={(event) => updateField('tagline', event.target.value)} />{fieldError('tagline')}</label>
          <label className="block text-xs font-bold text-slate-700">Bio<textarea className={`${inputClassName} min-h-28 resize-y`} value={form.bio} onChange={(event) => updateField('bio', event.target.value)} />{fieldError('bio')}</label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-bold text-slate-700">Location<input className={inputClassName} value={form.location} onChange={(event) => updateField('location', event.target.value)} />{fieldError('location')}</label>
            <label className="text-xs font-bold text-slate-700">Founding year<input type="number" className={inputClassName} value={form.foundedYear} onChange={(event) => updateField('foundedYear', Number(event.target.value))} />{fieldError('foundedYear')}</label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-bold text-slate-700">Email<input type="email" className={inputClassName} value={form.email} onChange={(event) => updateField('email', event.target.value)} />{fieldError('email')}</label>
            <label className="text-xs font-bold text-slate-700">Website<input className={inputClassName} value={form.website || ''} onChange={(event) => updateField('website', event.target.value)} placeholder="https://example.com" /></label>
            <label className="text-xs font-bold text-slate-700">LinkedIn<input className={inputClassName} value={form.linkedin || ''} onChange={(event) => updateField('linkedin', event.target.value)} placeholder="https://linkedin.com/company/..." /></label>
            <label className="text-xs font-bold text-slate-700">Twitter / X<input className={inputClassName} value={form.twitter || ''} onChange={(event) => updateField('twitter', event.target.value)} placeholder="https://x.com/..." /></label>
          </div>

          <label className="block text-xs font-bold text-slate-700">Technology domains<span className="mt-1 block text-[11px] font-medium text-slate-500">Separate domains with commas.</span><input className={inputClassName} value={form.techDomains.join(', ')} onChange={(event) => updateField('techDomains', event.target.value.split(','))} />{fieldError('techDomains')}</label>

          <div>
            <span className="text-xs font-bold text-slate-700">Banner theme</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {bannerThemes.map((theme) => (
                <button key={theme} type="button" onClick={() => updateField('bannerTheme', theme)} className={`rounded-full border px-3 py-2 text-xs font-bold capitalize transition ${form.bannerTheme === theme ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'}`}>
                  {theme}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">Cancel</button>
            <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-slate-800">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};