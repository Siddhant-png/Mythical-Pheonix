import React from 'react';
import { 
  Building2, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Cpu,
  Leaf,
  BriefcaseMedical,
  BatteryCharging,
  Truck,
  ShieldAlert,
  Sparkles,
  CircleDot
} from 'lucide-react';
import { Problem } from '../types';
import { formatINRMoney } from '../utils/format';

interface ProblemCardProps {
  problem: Problem;
  onSelectProblem: (problem: Problem) => void;
  onInitiateCollab: (problem: Problem) => void;
  hasActiveCollab: boolean;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  onSelectProblem,
  onInitiateCollab,
  hasActiveCollab
}) => {
  const getSectorMeta = (sector: string) => {
    switch (sector) {
      case 'Smart Automation & AI': return { bg: 'bg-category1', text: 'text-category1text', border: 'border-category1border', accent: '#8b5cf6', icon: Cpu };
      case 'Agriculture & Allied': return { bg: 'bg-category2', text: 'text-category2text', border: 'border-category2border', accent: '#16a34a', icon: Leaf };
      case 'MedTech & Public Health': return { bg: 'bg-category3', text: 'text-category3text', border: 'border-category3border', accent: '#ef4444', icon: BriefcaseMedical };
      case 'Clean Energy & Water': return { bg: 'bg-category4', text: 'text-category4text', border: 'border-category4border', accent: '#0ea5e9', icon: BatteryCharging };
      case 'Smart Mobility & Logistics': return { bg: 'bg-category5', text: 'text-category5text', border: 'border-category5border', accent: '#f59e0b', icon: Truck };
      default: return { bg: 'bg-category6', text: 'text-category6text', border: 'border-category6border', accent: '#64748b', icon: ShieldAlert };
    }
  };

  const sectorMeta = getSectorMeta(problem.sector);
  const SectorIcon = sectorMeta.icon;
  const formattedBudget = formatINRMoney(problem.budgetCeiling);

  return (
    <div
      className="bg-white/90 rounded-2xl border border-slate-200/80 shadow-[0_12px_30px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(15,23,42,0.08)] transition-all duration-200 p-5 sm:p-6 flex flex-col justify-between group font-body border-l-4"
      style={{ borderLeftColor: sectorMeta.accent }}
    >
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${sectorMeta.bg} ${sectorMeta.text} ${sectorMeta.border}`}>
            <SectorIcon className="w-3.5 h-3.5" />
            {problem.sector}
          </span>
          <div className="flex items-center space-x-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Deadline: {problem.deadline}</span>
          </div>
        </div>

        {/* Department Name */}
        <div className="flex items-center space-x-1.5 text-xs text-brand-textMuted font-medium mb-1.5">
          <Building2 className="w-3.5 h-3.5 text-govblue-700 shrink-0" />
          <span className="truncate">{problem.deptName}</span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelectProblem(problem)}
          className="text-base font-bold text-slate-900 group-hover:text-govblue-800 transition cursor-pointer line-clamp-2 leading-snug mb-2 font-heading"
        >
          {problem.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {problem.description}
        </p>

        {/* Key Metrics / Highlights */}
        <div className="grid grid-cols-2 gap-2 p-2.5 bg-brand-panelAlt rounded-xl border border-brand-border mb-4">
          <div>
            <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">Budget Ceiling</span>
            <div className="text-sm font-extrabold text-slate-900 flex items-center">
              <span>{formattedBudget}</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">Tender Path</span>
            <span className={`text-[11px] font-bold ${
              problem.preferredMode === 'COLLABORATION_RECOMMENDED' 
                ? 'text-amber-700' 
                : 'text-govblue-800'
            }`}>
              {problem.preferredMode === 'COLLABORATION_RECOMMENDED' ? '🤝 Collab Advised' : '🚀 Solo / Collab'}
            </span>
          </div>
        </div>

        {/* Collaboration Status indicator if active */}
        {hasActiveCollab && (
          <div className="mb-4 bg-success-50 border border-success-200 rounded-lg p-2 text-xs flex items-center justify-between text-success-800">
            <div className="flex items-center space-x-1.5 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-success-600" />
              <span>Consortium Formed & NDA Executed</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] bg-success-200 text-success-900 px-1.5 py-0.5 rounded font-bold">
              <CircleDot className="w-2.5 h-2.5 fill-current" />
              Ready to Bid
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelectProblem(problem)}
          className="text-xs font-semibold text-brand-textMuted hover:text-brand-text px-3 py-2 rounded-lg hover:bg-neutral-100 transition"
        >
          View Specs & KPIs
        </button>

        <div className="flex items-center space-x-2">
          {!hasActiveCollab && (
            <button
              onClick={() => onInitiateCollab(problem)}
              className="flex items-center space-x-1 text-xs font-bold text-saffron-700 bg-saffron-50 hover:bg-saffron-100 px-3 py-2 rounded-lg border border-saffron-200 transition"
              title="Pair with a manufacturer to unlock turnover eligibility"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Team Up</span>
            </button>
          )}

          <button
            onClick={() => onSelectProblem(problem)}
            className="flex items-center space-x-1 text-xs font-bold text-white bg-govblue-900 hover:bg-govblue-800 px-3.5 py-2 rounded-lg shadow-sm transition"
          >
            <span>{hasActiveCollab ? 'Submit Joint Bid' : 'Apply'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
