import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  tone?: 'emerald' | 'amber' | 'sky' | 'purple' | 'slate';
}

const toneClasses: Record<NonNullable<StatCardProps['tone']>, string> = {
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  sky: 'bg-sky-50 text-sky-700 border-sky-200',
  purple: 'bg-violet-50 text-violet-700 border-violet-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200'
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  tone = 'slate'
}) => {
  return (
    <div className={`rounded-2xl border p-4 ${toneClasses[tone]}`}>
      <div className="text-[10px] uppercase tracking-[0.18em] font-bold opacity-75">{label}</div>
      <div className="mt-2 text-2xl font-black leading-none">{value}</div>
      <div className="mt-1 text-[11px] font-medium opacity-80">{subtext}</div>
    </div>
  );
};
