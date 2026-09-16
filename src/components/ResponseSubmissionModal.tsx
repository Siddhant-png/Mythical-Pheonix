import React, { useState } from 'react';
import { FileText, Upload, Video, X } from 'lucide-react';
import { Problem, SolutionOutcome, SolutionProposal } from '../types';

interface ResponseSubmissionModalProps {
  mode: 'outcome' | 'proposal';
  problem: Problem;
  onClose: () => void;
  onSubmitOutcome: (outcome: SolutionOutcome) => void;
  onSubmitProposal: (proposal: SolutionProposal) => void;
}

export const ResponseSubmissionModal: React.FC<ResponseSubmissionModalProps> = ({ mode, problem, onClose, onSubmitOutcome, onSubmitProposal }) => {
  const [outcomeTitle, setOutcomeTitle] = useState('');
  const [outcomeDescription, setOutcomeDescription] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [videoName, setVideoName] = useState('');
  const [proposalTitle, setProposalTitle] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [executiveSummary, setExecutiveSummary] = useState('');
  const [problemUnderstanding, setProblemUnderstanding] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [implementationApproach, setImplementationApproach] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [timeline, setTimeline] = useState('');
  const [proposalDemoLink, setProposalDemoLink] = useState('');
  const [supportingDocuments, setSupportingDocuments] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (mode === 'outcome') {
      onSubmitOutcome({
        id: `outcome-${Date.now()}`,
        problemId: problem.id,
        problemTitle: problem.title,
        title: outcomeTitle,
        description: outcomeDescription,
        creatorName: 'Aarav Deshmukh',
        demoUrl,
        videoName,
        likes: 0,
        dislikes: 0,
        createdAt: new Date().toISOString()
      });
      return;
    }

    onSubmitProposal({
      id: `proposal-${Date.now()}`,
      problemId: problem.id,
      problemTitle: problem.title,
      proposalTitle,
      organizationName,
      executiveSummary,
      problemUnderstanding,
      proposedSolution,
      implementationApproach,
      expectedOutcome,
      timeline,
      demoLink: proposalDemoLink,
      supportingDocuments,
      status: 'SUBMITTED',
      submittedAt: new Date().toISOString().split('T')[0]
    });
  };

  const inputClass = 'w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-govblue-500 focus:ring-2 focus:ring-govblue-100';
  const textAreaClass = `${inputClass} resize-y`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-3 backdrop-blur-sm sm:p-6">
      <div className="my-4 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between bg-slate-900 p-5 text-white">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">{mode === 'outcome' ? 'Community discovery' : 'Government review'}</span>
            <h2 className="mt-1 text-xl font-extrabold">{mode === 'outcome' ? 'Post Your Outcome' : 'Submit Solution Proposal'}</h2>
            <p className="mt-1 max-w-xl text-xs text-slate-300">For: {problem.title}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close form" className="text-slate-400 transition hover:text-white"><X className="h-5 w-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[78vh] space-y-4 overflow-y-auto p-5 sm:p-6">
          {mode === 'outcome' ? (
            <>
              <Field label="Outcome Title" value={outcomeTitle} onChange={setOutcomeTitle} placeholder="Smart Pothole Detection" required inputClass={inputClass} />
              <label className="block text-sm font-bold text-slate-800">Short Description<textarea required rows={3} value={outcomeDescription} onChange={event => setOutcomeDescription(event.target.value)} placeholder="Our prototype detects potholes from road footage and generates location-based reports." className={`${textAreaClass} mt-1.5`} /></label>
              <label className="block text-sm font-bold text-slate-800">Demo Video<div className="mt-1.5 flex items-center gap-3 rounded-xl border border-dashed border-slate-300 p-3"><Video className="h-5 w-5 text-govblue-700" /><input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={event => setVideoName(event.target.files?.[0]?.name || '')} className="min-w-0 flex-1 text-xs text-slate-500" />{videoName && <span className="truncate text-xs font-semibold text-slate-700">{videoName}</span>}</div></label>
              <Field label="Optional Demo / GitHub Link" value={demoUrl} onChange={setDemoUrl} placeholder="https://github.com/..." inputClass={inputClass} />
            </>
          ) : (
            <>
              <Field label="Proposal Title" value={proposalTitle} onChange={setProposalTitle} placeholder="SmartRoad Vision" required inputClass={inputClass} />
              <Field label="Organization / Startup Name" value={organizationName} onChange={setOrganizationName} placeholder="Drishti Edge Tech" required inputClass={inputClass} />
              <TextField label="Executive Summary" value={executiveSummary} onChange={setExecutiveSummary} placeholder="Briefly explain your proposed solution." inputClass={textAreaClass} />
              <TextField label="Problem Understanding" value={problemUnderstanding} onChange={setProblemUnderstanding} placeholder="What problem are you solving and how do you understand the current challenge?" inputClass={textAreaClass} />
              <TextField label="Proposed Solution" value={proposedSolution} onChange={setProposedSolution} placeholder="Describe your proposed solution in detail and how it addresses the government problem." rows={6} inputClass={textAreaClass} />
              <TextField label="Implementation Approach" value={implementationApproach} onChange={setImplementationApproach} placeholder="How would you implement or deploy this solution?" inputClass={textAreaClass} />
              <TextField label="Expected Outcome" value={expectedOutcome} onChange={setExpectedOutcome} placeholder="What result or improvement do you expect?" inputClass={textAreaClass} />
              <Field label="Proposed Pilot / Implementation Timeline" value={timeline} onChange={setTimeline} placeholder="6 weeks" inputClass={inputClass} />
              <Field label="Demo / Prototype Link" value={proposalDemoLink} onChange={setProposalDemoLink} placeholder="https://..." inputClass={inputClass} />
              <label className="block text-sm font-bold text-slate-800">Supporting Documents<div className="mt-1.5 flex items-center gap-3 rounded-xl border border-dashed border-slate-300 p-3"><Upload className="h-5 w-5 text-govblue-700" /><input type="file" multiple onChange={event => setSupportingDocuments(Array.from(event.target.files || []).map(file => file.name))} className="min-w-0 flex-1 text-xs text-slate-500" />{supportingDocuments.length > 0 && <span className="text-xs font-semibold text-slate-700">{supportingDocuments.length} selected</span>}</div></label>
            </>
          )}
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-3"><button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900">Cancel</button><button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-govblue-900 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-govblue-800"><FileText className="h-4 w-4" />{mode === 'outcome' ? 'Post Outcome' : 'Submit Proposal'}</button></div>
        </form>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, placeholder, required, inputClass }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; required?: boolean; inputClass: string }) => <label className="block text-sm font-bold text-slate-800">{label}<input required={required} value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder} className={`${inputClass} mt-1.5`} /></label>;

const TextField = ({ label, value, onChange, placeholder, rows = 3, inputClass }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; rows?: number; inputClass: string }) => <label className="block text-sm font-bold text-slate-800">{label}<textarea required value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder} rows={rows} className={`${inputClass} mt-1.5`} /></label>;