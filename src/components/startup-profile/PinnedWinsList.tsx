import React from 'react';
import { ArrowUpRight, BadgeCheck, Trophy } from 'lucide-react';
import { PinnedWin } from '../../types';

const accentMap = {
  emerald: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  sky: 'bg-sky-50 text-sky-700',
  purple: 'bg-violet-50 text-violet-700',
  saffron: 'bg-orange-50 text-orange-700'
} as const;

export const PinnedWinsList: React.FC<{ wins: PinnedWin[] }> = ({ wins }) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {wins.map((win) => (
        <article key={win.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className={`inline-flex rounded-xl px-2 py-1 text-[10px] font-bold ${accentMap[win.accentColor]}`}>
              {win.category}
            </div>
            <Trophy className="h-4 w-4 text-slate-400" />
          </div>

          <h4 className="mt-4 text-base font-extrabold text-slate-900">{win.title}</h4>
          <p className="mt-1 text-xs text-slate-500">{win.subtitle}</p>

          <div className="mt-4 flex items-end justify-between gap-3 rounded-xl bg-white p-3 shadow-sm">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{win.statLabel}</div>
              <div className="mt-1 text-xl font-black text-slate-900">{win.statValue}</div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-emerald-600" />
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600">
            <span>{win.deptName}</span>
            <span className="inline-flex items-center gap-1"><BadgeCheck className="h-3.5 w-3.5 text-emerald-600" /> {win.date}</span>
          </div>
        </article>
      ))}
    </div>
  );
};
