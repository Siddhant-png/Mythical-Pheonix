import React, { useState } from 'react';
import { SolutionProposal, ProposalStatus } from '../types';

interface ProposedSolutionsViewProps {
  proposals: SolutionProposal[];
  onUpdateProposalStatus?: (proposalId: string, newStatus: ProposalStatus) => void;
}

export const ProposedSolutionsView: React.FC<ProposedSolutionsViewProps> = ({
  proposals,
  onUpdateProposalStatus
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredProposals = proposals.filter((prop) => {
    if (filterStatus === 'ALL') return true;
    return prop.status === filterStatus;
  });

  const getStatusBadge = (status: ProposalStatus) => {
    switch (status) {
      case 'APPROVED_FOR_PROCUREMENT':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">Approved for PO</span>;
      case 'SANDBOX_PILOT':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300">Sandbox Pilot</span>;
      case 'UNDER_REVIEW':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">Under Review</span>;
      case 'REJECTED':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">Rejected</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300">Submitted</span>;
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5 font-body pb-12 select-none">
      <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Government Portal</span>
            <h2 className="text-xl font-extrabold text-slate-900">Proposed Solutions</h2>
            <p className="text-xs text-slate-500 mt-0.5">Review and evaluate startup proposals submitted for published government challenges.</p>
          </div>
          <div className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 self-start sm:self-auto">
            {filteredProposals.length} Proposals
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            ['ALL', 'All Proposals'],
            ['SUBMITTED', 'Submitted'],
            ['SANDBOX_PILOT', 'Sandbox Pilot'],
            ['APPROVED_FOR_PROCUREMENT', 'Approved for PO'],
            ['REJECTED', 'Rejected']
          ].map(([status, label]) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                filterStatus === status
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Proposals List */}
        {filteredProposals.length === 0 ? (
          <div className="text-center py-12 text-xs text-slate-500 border border-dashed border-slate-200 rounded-md">
            No proposals found matching this filter.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="bg-white rounded-md border border-slate-200 p-4 sm:p-5 space-y-3"
              >
                {/* Proposal Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Challenge: {proposal.problemTitle}</span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">{proposal.proposalTitle}</h3>
                    <span className="text-xs text-slate-600 font-semibold">Submitted by: {proposal.organizationName}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400 font-mono">{proposal.submittedAt}</span>
                    {getStatusBadge(proposal.status)}
                  </div>
                </div>

                {/* Proposal Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-md border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-800 block text-[11px]">Executive Summary</span>
                    <p className="text-slate-600 leading-relaxed">{proposal.executiveSummary}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-800 block text-[11px]">Proposed Solution & Approach</span>
                    <p className="text-slate-600 leading-relaxed">{proposal.proposedSolution}</p>
                  </div>
                </div>

                {/* Details Footer & Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex flex-wrap items-center gap-4 text-slate-500 text-[11px]">
                    {proposal.timeline && <span>Timeline: <strong className="text-slate-800">{proposal.timeline}</strong></span>}
                    {proposal.demoLink && (
                      <a href={proposal.demoLink} target="_blank" rel="noreferrer" className="text-slate-900 font-bold hover:underline">
                        View Demo Link →
                      </a>
                    )}
                  </div>

                  {/* Actions for Government Officials */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => onUpdateProposalStatus?.(proposal.id, 'SANDBOX_PILOT')}
                      className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-bold text-[11px] hover:bg-blue-100"
                    >
                      Approve for Sandbox Pilot
                    </button>
                    <button
                      onClick={() => onUpdateProposalStatus?.(proposal.id, 'APPROVED_FOR_PROCUREMENT')}
                      className="px-3 py-1.5 rounded-md bg-slate-900 text-white font-bold text-[11px] hover:bg-slate-800"
                    >
                      Approve for Procurement
                    </button>
                    <button
                      onClick={() => onUpdateProposalStatus?.(proposal.id, 'REJECTED')}
                      className="px-3 py-1.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-semibold text-[11px] hover:bg-rose-100"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
