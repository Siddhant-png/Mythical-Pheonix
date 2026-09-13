import React from 'react';
import { Activity, CalendarRange, Circle } from 'lucide-react';
import { ProfileTimelineEvent } from '../../types';

const categoryStyles = {
  MILESTONE: 'bg-slate-100 text-slate-700',
  PILOT: 'bg-emerald-100 text-emerald-700',
  PROCUREMENT: 'bg-amber-100 text-amber-700',
  CONSORTIUM: 'bg-violet-100 text-violet-700',
  CERT: 'bg-sky-100 text-sky-700',
  FUNDING: 'bg-rose-100 text-rose-700'
} as const;

export const ProfileTimeline: React.FC<{ events: ProfileTimelineEvent[] }> = ({ events }) => {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="relative flex gap-4 pl-2">
          <div className="flex flex-col items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm">
              <Circle className="h-2.5 w-2.5 fill-current" />
            </div>
            {event.id !== events[events.length - 1].id && <div className="mt-2 h-full w-px bg-slate-200" />}
          </div>

          <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <CalendarRange className="h-4 w-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-500">{event.date}</span>
              </div>
              <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold ${categoryStyles[event.category]}`}>
                {event.category}
              </span>
            </div>

            <h4 className="mt-3 text-base font-extrabold text-slate-900">{event.title}</h4>
            <p className="mt-1 text-sm leading-6 text-slate-600">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
