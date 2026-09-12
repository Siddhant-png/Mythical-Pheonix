import React from 'react';
import { 
  Building2, 
  Clock, 
  IndianRupee, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Tag,
  ShieldAlert
} from 'lucide-react';
import { Problem } from '../types';

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
  const getSectorColor = (sector: string) => {
    switch (sector) {
      case 'Smart Automation & AI': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Agriculture & Allied': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'MedTech & Public Health': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Clean Energy & Water': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Smart Mobility & Logistics': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const formattedBudget = problem.budgetCeiling >= 10000000 
    ? `₹${(problem.budgetCeiling / 10000000).toFixed(2)} Cr`
    : `₹${(problem.budgetCeiling / 100000).toFixed(1)} Lakhs`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-200 p-5 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${getSectorColor(problem.sector)}`}>
            {problem.sector}
          </span>
          <div className="flex items-center space-x-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Deadline: {problem.deadline}</span>
          </div>
        </div>

        {/* Department Name */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium mb-1.5">
          <Building2 className="w-3.5 h-3.5 text-govblue-700 shrink-0" />
          <span className="truncate">{problem.deptName}</span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelectProblem(problem)}
          className="text-base font-bold text-slate-900 group-hover:text-govblue-800 transition cursor-pointer line-clamp-2 leading-snug mb-2"
        >
          {problem.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {problem.description}
        </p>

        {/* Key Metrics / Highlights */}
        <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 mb-4">
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
          <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-xs flex items-center justify-between text-emerald-800">
            <div className="flex items-center space-x-1.5 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Consortium Formed & NDA Executed</span>
            </div>
            <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-bold">
              Ready to Bid
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelectProblem(problem)}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
        >
          View Specs & KPIs
        </button>

        <div className="flex items-center space-x-2">
          {!hasActiveCollab && (
            <button
              onClick={() => onInitiateCollab(problem)}
              className="flex items-center space-x-1 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-2 rounded-lg border border-amber-200 transition"
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
