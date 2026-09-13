import React from 'react';
import { Building2, CircleCheckBig, Handshake, Landmark } from 'lucide-react';
import { AllianceEntry } from '../../types';

const partnerBadgeStyles = {
  Manufacturer: 'bg-amber-100 text-amber-700',
  Startup: 'bg-emerald-100 text-emerald-700',
  Department: 'bg-sky-100 text-sky-700'
} as const;

export const AllianceList: React.FC<{ alliances: AllianceEntry[] }> = ({ alliances }) => {
  return (
    <div className="space-y-3">
      {alliances.map((alliance) => (
        <div key={alliance.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                {alliance.partnerType === 'Manufacturer' && <Building2 className="h-4 w-4" />}
                {alliance.partnerType === 'Startup' && <Handshake className="h-4 w-4" />}
                {alliance.partnerType === 'Department' && <Landmark className="h-4 w-4" />}
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">{alliance.partnerName}</div>
                <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500">
                  <span className={`rounded-full px-2 py-0.5 font-bold ${partnerBadgeStyles[alliance.partnerType]}`}>
                    {alliance.partnerType}
                  </span>
                  <span>Since {alliance.since}</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-slate-700 shadow-sm">
              <CircleCheckBig className="h-3.5 w-3.5 text-emerald-600" />
              {alliance.status}
            </div>
          </div>

          <div className="mt-3 text-sm text-slate-600">
            <span className="font-bold text-slate-700">Role split:</span> {alliance.roleSplit}
          </div>
        </div>
      ))}
    </div>
  );
};
