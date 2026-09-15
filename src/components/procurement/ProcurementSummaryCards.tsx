import React from 'react';
import { CheckCircle2, FileCheck2, IndianRupee, Layers3, Timer } from 'lucide-react';
import { formatINRCompact } from '../../utils/format';

interface ProcurementSummaryCardsProps {
  totalOrders: number;
  totalValue: number;
  activeOrders: number;
  completedOrders: number;
  adoptedSolutions: number;
}

export const ProcurementSummaryCards: React.FC<ProcurementSummaryCardsProps> = ({ totalOrders, totalValue, activeOrders, completedOrders, adoptedSolutions }) => {
  const cards = [
    { label: 'Total orders', value: totalOrders, icon: FileCheck2, tone: 'text-govblue-700 bg-govblue-50' },
    { label: 'Total value', value: formatINRCompact(totalValue), icon: IndianRupee, tone: 'text-emerald-700 bg-emerald-50' },
    { label: 'Active orders', value: activeOrders, icon: Timer, tone: 'text-amber-700 bg-amber-50' },
    { label: 'Completed', value: completedOrders, icon: CheckCircle2, tone: 'text-sky-700 bg-sky-50' },
    { label: 'Adopted solutions', value: adoptedSolutions, icon: Layers3, tone: 'text-violet-700 bg-violet-50' }
  ];

  return <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{cards.map(card => { const Icon = card.icon; return <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-slate-500">{card.label}</span><span className={`flex h-8 w-8 items-center justify-center rounded-xl ${card.tone}`}><Icon className="h-4 w-4" /></span></div><div className="mt-3 text-2xl font-black text-slate-900">{card.value}</div></div>; })}</div>;
};