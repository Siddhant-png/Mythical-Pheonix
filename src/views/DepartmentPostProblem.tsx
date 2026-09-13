import React, { useState } from 'react';
import { 
  Building2, 
  PlusCircle, 
  Sparkles, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { Problem, ProblemSector, KPIBenchmark } from '../types';

interface DepartmentPostProblemProps {
  onProblemCreated: (newProblem: Problem) => void;
  onNavigateToDirectory: () => void;
}

export const DepartmentPostProblem: React.FC<DepartmentPostProblemProps> = ({
  onProblemCreated,
  onNavigateToDirectory
}) => {
  const [title, setTitle] = useState('');
  const [deptName, setDeptName] = useState('Public Works Department (PWD), Govt of Maharashtra');
  const [sector, setSector] = useState<ProblemSector>('Smart Automation & AI');
  const [budgetLakhs, setBudgetLakhs] = useState<number>(55);
  const [deadline, setDeadline] = useState('2026-11-30');
  const [description, setDescription] = useState('');
  const [eligibilityCriteria, setEligibilityCriteria] = useState('Open to DPIIT recognized startups or joint consortium with certified hardware manufacturers.');
  const [preferredMode, setPreferredMode] = useState<'SOLO_OR_COLLAB' | 'COLLABORATION_RECOMMENDED'>('COLLABORATION_RECOMMENDED');
  
  const [kpis, setKpis] = useState<KPIBenchmark[]>([
    { metric: 'Operational Uptime Under Harsh Ambient Conditions', minTarget: '>= 99.2%', weightage: 40 },
    { metric: 'Inference/Processing Latency', minTarget: '< 50 ms', weightage: 35 },
    { metric: 'BIS/IP67 Rugged Enclosure Standard', minTarget: 'Certified', weightage: 25 }
  ]);

  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddKpi = () => {
    setKpis([...kpis, { metric: '', minTarget: '', weightage: 20 }]);
  };

  const handleRemoveKpi = (index: number) => {
    setKpis(kpis.filter((_, i) => i !== index));
  };

  const handleKpiChange = (index: number, field: keyof KPIBenchmark, value: any) => {
    const updated = [...kpis];
    updated[index] = { ...updated[index], [field]: value };
    setKpis(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProblem: Problem = {
      id: `prob-${Date.now()}`,
      deptId: 'dept-maha-pwd',
      deptName,
      title,
      description,
      sector,
      budgetCeiling: budgetLakhs * 100000,
      deadline,
      status: 'OPEN',
      eligibilityCriteria,
      preferredMode,
      postedDate: new Date().toISOString().split('T')[0],
      kpiBenchmarks: kpis.filter(k => k.metric.trim() !== '')
    };

    onProblemCreated(newProblem);
    setIsSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-body">
      <div className="bg-gradient-to-r from-govblue-50 via-white to-slate-50 rounded-[28px] border border-govblue-100/80 p-7 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-govblue-900 text-white flex items-center justify-center shadow-[0_12px_24px_rgba(11,37,69,0.24)]">
            <Building2 className="w-5 h-5 text-saffron-300" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-900 font-heading">
              Department problem upload
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Transform legacy tender PDFs into live, searchable challenges with objective sandbox KPIs and clean procurement workflow.
            </p>
          </div>
        </div>
      </div>

      {isSuccess ? (
        <div className="bg-success-50 border border-success-300 rounded-2xl p-8 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-success-600 mx-auto" />
          <h3 className="text-xl font-bold text-success-900">Challenge Successfully Published!</h3>
          <p className="text-xs text-success-700 max-w-md mx-auto">
            Your problem statement has been indexed into the searchable dashboard. Eligible DPIIT startups and verified manufacturers can now discover it and execute teaming agreements.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToDirectory}
              className="inline-flex items-center space-x-2 bg-govblue-900 hover:bg-govblue-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition"
            >
              <span>View on Public Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-brand-panel rounded-2xl border border-brand-border p-6 shadow-sm space-y-6 text-xs">
          {/* Department and Sector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Posting Department / Agency
              </label>
              <input
                type="text"
                value={deptName}
                onChange={(e) => setDeptName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-govblue-800/20"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Target Sector / Theme (SIH Taxonomy)
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value as ProblemSector)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-govblue-800/20"
              >
                <option value="Smart Automation & AI">Smart Automation & AI</option>
                <option value="Agriculture & Allied">Agriculture & Allied</option>
                <option value="MedTech & Public Health">MedTech & Public Health</option>
                <option value="Clean Energy & Water">Clean Energy & Water</option>
                <option value="Smart Mobility & Logistics">Smart Mobility & Logistics</option>
                <option value="Disaster Management">Disaster Management</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Challenge / Problem Statement Title
            </label>
            <input
              type="text"
              placeholder="e.g. Edge AI Multi-camera Sensor for Expressway Fog Accident Prevention"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-sm focus:ring-2 focus:ring-govblue-800/20"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Detailed Problem Description & Operational Context
            </label>
            <textarea
              rows={4}
              placeholder="Explain field conditions, existing bottlenecks, and the technical outcome required..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-govblue-800/20"
              required
            />
          </div>

          {/* Budget, Deadline, Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Budget Ceiling (₹ in Lakhs)
              </label>
              <input
                type="number"
                value={budgetLakhs}
                onChange={(e) => setBudgetLakhs(Number(e.target.value))}
                min={1}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-govblue-800/20"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Tender Application Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-govblue-800/20"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Bidding Path Recommended
              </label>
              <select
                value={preferredMode}
                onChange={(e) => setPreferredMode(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-govblue-800/20"
              >
                <option value="COLLABORATION_RECOMMENDED">🤝 Collab Recommended (Heavy Scale/Hardware)</option>
                <option value="SOLO_OR_COLLAB">🚀 Solo or Collab (Software / SaaS / AI)</option>
              </select>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Eligibility & Certification Requirements
            </label>
            <input
              type="text"
              value={eligibilityCriteria}
              onChange={(e) => setEligibilityCriteria(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-govblue-800/20"
              required
            />
          </div>

          {/* Sandbox Trial KPI Benchmarks */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">
                  Sandbox Trial KPI Benchmarks (Objective Scorecard)
                </span>
                <span className="text-[11px] text-slate-500">
                  Applicants that meet these measurable metrics in the sandbox automatically unlock direct PO procurement
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddKpi}
                className="text-xs bg-white text-govblue-800 font-bold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition"
              >
                + Add KPI
              </button>
            </div>

            <div className="space-y-2">
              {kpis.map((kpi, index) => (
                <div key={index} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
                  <input
                    type="text"
                    placeholder="KPI Metric (e.g. Accuracy)"
                    value={kpi.metric}
                    onChange={(e) => handleKpiChange(index, 'metric', e.target.value)}
                    className="flex-1 p-1.5 text-xs border border-slate-200 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Min Target (e.g. >= 95%)"
                    value={kpi.minTarget}
                    onChange={(e) => handleKpiChange(index, 'minTarget', e.target.value)}
                    className="w-36 p-1.5 text-xs border border-slate-200 rounded"
                    required
                  />
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      value={kpi.weightage}
                      onChange={(e) => handleKpiChange(index, 'weightage', Number(e.target.value))}
                      className="w-16 p-1.5 text-xs border border-slate-200 rounded text-center"
                      min={1}
                      max={100}
                    />
                    <span className="text-slate-400 text-xs">%</span>
                  </div>
                  {kpis.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveKpi(index)}
                      className="p-1 text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-govblue-900 hover:bg-govblue-800 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition text-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Challenge on MahaSetu Portal</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
