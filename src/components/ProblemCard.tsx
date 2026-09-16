import React from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { Problem } from '../types';
import { formatINRMoney } from '../utils/format';

interface ProblemCardProps {
  problem: Problem;
  onSelectProblem?: (problem: Problem) => void;
  onViewDetails?: (problem: Problem) => void;
  onApply?: (problem: Problem) => void;
  onInitiateCollab?: (problem: Problem) => void;
  hasActiveCollab?: boolean;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  onSelectProblem,
  onViewDetails
}) => {
  const formattedBudget = formatINRMoney(problem.budgetCeiling);

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(problem);
    } else if (onSelectProblem) {
      onSelectProblem(problem);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative cursor-pointer rounded-xl border border-slate-200/80 bg-white p-4 sm:p-5 transition hover:border-slate-400 font-body"
    >
      {/* Meta Header */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-2 gap-2">
        <span className="truncate flex items-center gap-1.5 text-slate-600">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{problem.deptName}</span>
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1e3a8a] transition line-clamp-2 leading-snug mb-1.5 font-heading">
        {problem.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
        {problem.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
        <span className="text-[11px] text-slate-400">
          Budget: <span className="font-bold text-slate-700">{formattedBudget}</span>
        </span>

        <span className="font-semibold text-slate-700 group-hover:text-slate-950 transition flex items-center gap-1 text-[11px]">
          View Details
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900" />
        </span>
      </div>
    </div>
  );
};
