import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  FileCode, 
  Scale, 
  AlertTriangle,
  FileCheck,
  Eye,
  Copy,
  Check
} from 'lucide-react';

interface StandardTemplatesVaultProps {
  userRole: 'startup' | 'dept' | 'manufacturer';
}

export const StandardTemplatesVault: React.FC<StandardTemplatesVaultProps> = ({ userRole }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('tpl-problem');
  const [copiedHash, setCopiedHash] = useState(false);

  // Customization state for live template preview
  const [deptName, setDeptName] = useState('Public Works Department (PWD), Govt of Maharashtra');
  const [startupName, setStartupName] = useState('Drishti Edge Technologies Pvt Ltd');
  const [manufacturerName, setManufacturerName] = useState('Sahyadri Precision Electronics & Assemblies Ltd');
  const [problemTitle, setProblemTitle] = useState('AI-Powered Computer Vision for Automated Pothole & Road Quality Indexing');
  const [budgetVal, setBudgetVal] = useState('₹45,00,000 (INR 45 Lakhs)');

  const templates = [
    {
      id: 'tpl-problem',
      title: '1. Outcome-Based Problem Statement Template',
      category: 'Intake & Challenge Publishing',
      badge: 'Dept Procurement Standard',
      description: 'Standardized format for converting legacy 80-page rigid tender specs into objective, outcome-focused problem statements with quantifiable KPI benchmarks and sandbox scope.',
      tags: ['Outcome-Based', 'KPI Benchmarks', 'Sandbox Specs']
    },
    {
      id: 'tpl-evaluation',
      title: '2. Multi-Criteria Expert Evaluation Matrix',
      category: 'Screening & Shortlisting',
      badge: 'Evaluation Panel Standard',
      description: 'Objective 100-point scoring scorecard evaluating innovation readiness, team capability, sandbox feasibility, cost efficiency, and DPIIT verification bonus.',
      tags: ['100-Pt Matrix', 'Expert Panel', 'DPIIT Weightage']
    },
    {
      id: 'tpl-sandbox',
      title: '3. Controlled Sandbox Pilot & Testbed Agreement',
      category: 'Pilot Execution & Contracting',
      badge: 'Sandbox Governance',
      description: 'Legal framework for 30-90 day supervised field trial, safety corridors, state data access, milestone sign-offs, and performance verification criteria.',
      tags: ['30-90 Day Sandbox', 'Field Safety', 'Testbed Guidelines']
    },
    {
      id: 'tpl-ip-nda',
      title: '4. Data & Intellectual Property (IP Ringfence & M-NDA)',
      category: 'Legal & Intellectual Property',
      badge: 'Irrevocable IP Protection',
      description: 'Mutual NDA and Consortium Teaming Agreement guaranteeing 100% startup IP retention of code and AI models, non-exclusive manufacturing scope, and state data privacy.',
      tags: ['100% Startup IP', 'M-NDA', 'Turnover Pledging']
    },
    {
      id: 'tpl-cybersecurity',
      title: '5. Cybersecurity & Risk Management Assessment',
      category: 'Security & Compliance',
      badge: 'CERT-In Compliance',
      description: 'Mandatory security evaluation checklist covering data residency in India, ISO 27001 standards, vulnerability assessment (VAPT), and operational failover protocols.',
      tags: ['CERT-In Audit', 'Data Sovereignty', 'ISO 27001']
    },
    {
      id: 'tpl-gfr-po',
      title: '6. Fast-Track GFR Procurement Order Pathway',
      category: 'Procurement & Scale-up',
      badge: 'GFR Rule 149 / 173 Relaxation',
      description: 'Single-source direct procurement order template citing Maharashtra Startup Policy Sec 4.2 & GFR 2017 relaxation for validated sandbox pilots crossing 80%+ score.',
      tags: ['GFR 149 Exemption', 'Auto-PO Generator', 'State Scaling']
    }
  ];

  const handleCopyHash = () => {
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const currentTpl = templates.find(t => t.id === selectedTemplateId) || templates[0];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-govblue-900 via-slate-900 to-govblue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-govblue-800">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-amber-400/30">
            <Scale className="w-3.5 h-3.5" />
            <span>Standardized Legal & Operational Templates</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans']">
            Innovation Procurement Framework & Legal Vault
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Eliminate legal ambiguity and long contract drafting delays. Access standardized, legally vetted templates for outcome-based challenges, mutual NDAs, sandbox pilot agreements, cybersecurity checklists, and GFR fast-track procurement orders.
          </p>
        </div>
      </div>

      {/* Grid: Template Selector Sidebar + Live Document Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Template Cards List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
            <span>Standard Mechanism Templates</span>
            <span className="text-xs bg-govblue-100 text-govblue-900 font-bold px-2 py-0.5 rounded-full">
              6 Standard Docs
            </span>
          </h3>

          <div className="space-y-2.5">
            {templates.map((tpl) => {
              const isSelected = selectedTemplateId === tpl.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-govblue-900 text-white border-govblue-800 shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-govblue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-amber-400 text-slate-950 font-extrabold' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {tpl.badge}
                    </span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                      {tpl.category}
                    </span>
                  </div>

                  <div className="font-bold text-xs leading-snug">
                    {tpl.title}
                  </div>

                  <p className={`text-[11px] mt-1.5 line-clamp-2 leading-relaxed ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {tpl.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {tpl.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          isSelected ? 'bg-white/10 text-amber-200' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Live Document Inspector */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header Toolbar */}
            <div className="bg-slate-900 text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  MahaSetu Regulatory Standard Template
                </span>
                <h3 className="text-base font-bold mt-0.5">{currentTpl.title}</h3>
                <p className="text-xs text-slate-400">{currentTpl.category}</p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center space-x-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={handleCopyHash}
                  className="inline-flex items-center space-x-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg transition"
                >
                  {copiedHash ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedHash ? 'Hash Copied!' : 'Copy SHA-256 Hash'}</span>
                </button>
              </div>
            </div>

            {/* Customization Inputs Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-0.5">Government Department Name</label>
                <input
                  type="text"
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-slate-200 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-0.5">Target Challenge Title</label>
                <input
                  type="text"
                  value={problemTitle}
                  onChange={(e) => setProblemTitle(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-slate-200 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-0.5">Startup Entity</label>
                <input
                  type="text"
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-slate-200 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-0.5">Manufacturing Partner</label>
                <input
                  type="text"
                  value={manufacturerName}
                  onChange={(e) => setManufacturerName(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-slate-200 text-xs font-semibold"
                />
              </div>
            </div>

            {/* Rendered Live Template Paper View */}
            <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-800 font-serif leading-relaxed bg-white">
              {/* Document Header Seal */}
              <div className="text-center pb-6 border-b border-slate-200 space-y-1">
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded font-sans font-bold text-[10px] uppercase tracking-wider mb-2">
                  Official Standardized Mechanism Document Template
                </div>
                <h2 className="text-lg font-bold font-sans text-slate-900 uppercase tracking-wide">
                  GOVERNMENT OF MAHARASHTRA • PUBLIC INNOVATION PROCUREMENT
                </h2>
                <div className="text-xs font-sans text-slate-500 font-medium">
                  Issued under Maharashtra Startup Procurement Policy 2026 & GFR-2017 Rule 149/173
                </div>
                <div className="text-[11px] font-mono text-emerald-700 pt-1 font-sans">
                  Document Integrity Hash: 0x9f83a21b44c92e1058f3310029b47e221
                </div>
              </div>

              {/* Dynamic Content Based on Selected Template */}
              {selectedTemplateId === 'tpl-problem' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 font-mono">
                    <div><strong>POSTING DEPARTMENT:</strong> {deptName}</div>
                    <div><strong>CHALLENGE TITLE:</strong> {problemTitle}</div>
                    <div><strong>BUDGET CEILING:</strong> {budgetVal}</div>
                    <div><strong>ELIGIBILITY RELAXATION:</strong> DPIIT Recognition Exemption Applied (Zero prior turnover required for solo startups)</div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1 font-sans">1. Operational Problem Definition & Desired Outcomes</h4>
                    <p className="text-slate-700 leading-relaxed">
                      The Department requires an outcome-focused technological solution to address operational bottlenecks. Vendors are requested to submit proposals focused on meeting quantifiable performance benchmarks rather than rigid brand/manufacturing specifications.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1 font-sans">2. Mandatory Sandbox Performance Benchmarks</h4>
                    <table className="w-full text-left border-collapse border border-slate-200 text-[11px]">
                      <thead>
                        <tr className="bg-slate-100 text-slate-800">
                          <th className="p-2 border border-slate-200 font-bold">Metric Parameter</th>
                          <th className="p-2 border border-slate-200 font-bold">Minimum Target Benchmark</th>
                          <th className="p-2 border border-slate-200 font-bold">Evaluation Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border border-slate-200">System Accuracy & Field Performance</td>
                          <td className="p-2 border border-slate-200">≥ 92.0% Verified Accuracy</td>
                          <td className="p-2 border border-slate-200">40%</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-slate-200">Inference / Telemetry Response Latency</td>
                          <td className="p-2 border border-slate-200">&lt; 45 milliseconds</td>
                          <td className="p-2 border border-slate-200">35%</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-slate-200">Environmental & Hardware Resilience</td>
                          <td className="p-2 border border-slate-200">IP67 Ingress Protection Standard</td>
                          <td className="p-2 border border-slate-200">25%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1 font-sans">3. Direct Procurement Clause</h4>
                    <p className="text-slate-700 leading-relaxed bg-amber-50 p-3 rounded-lg border border-amber-200">
                      Pursuant to Section 4.2 of the Maharashtra Innovation Policy, any applicant scoring <strong>≥ 80% aggregate</strong> during the supervised sandbox trial shall be granted direct fast-track purchase order issuance without requiring a secondary multi-tender cycle.
                    </p>
                  </div>
                </div>
              )}

              {selectedTemplateId === 'tpl-evaluation' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 font-mono">
                    <div><strong>EVALUATION PANEL:</strong> Nodal Technical Advisory Committee</div>
                    <div><strong>TARGET APPLICANTS:</strong> {startupName} &amp; {manufacturerName}</div>
                    <div><strong>MAXIMUM SCORE:</strong> 100 Points</div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1 font-sans">Standard 100-Point Expert Evaluation Breakdown</h4>
                    <div className="space-y-2 text-[11px]">
                      <div className="p-3 border rounded-lg bg-white flex justify-between items-center">
                        <div>
                          <strong className="text-slate-900 block">1. Technical Novelty & IP Superiority (30 Pts)</strong>
                          <span className="text-slate-500">Uniqueness of algorithm, patents filed, architectural superiority over legacy solutions.</span>
                        </div>
                        <span className="font-bold text-govblue-900 text-sm">30 Max</span>
                      </div>
                      <div className="p-3 border rounded-lg bg-white flex justify-between items-center">
                        <div>
                          <strong className="text-slate-900 block">2. Sandbox Pilot Feasibility & Telemetry (25 Pts)</strong>
                          <span className="text-slate-500">Readiness of field testbed, hardware ruggedness, live dashboard integration.</span>
                        </div>
                        <span className="font-bold text-govblue-900 text-sm">25 Max</span>
                      </div>
                      <div className="p-3 border rounded-lg bg-white flex justify-between items-center">
                        <div>
                          <strong className="text-slate-900 block">3. Consortium & Manufacturing Capacity (20 Pts)</strong>
                          <span className="text-slate-500">ISO certification, annual production units of partner, GST turnover backed by M-NDA.</span>
                        </div>
                        <span className="font-bold text-govblue-900 text-sm">20 Max</span>
                      </div>
                      <div className="p-3 border rounded-lg bg-white flex justify-between items-center">
                        <div>
                          <strong className="text-slate-900 block">4. Commercial Viability & Cost Efficiency (15 Pts)</strong>
                          <span className="text-slate-500">Cost savings compared to conventional vendor quotes and lifecycle maintenance cost.</span>
                        </div>
                        <span className="font-bold text-govblue-900 text-sm">15 Max</span>
                      </div>
                      <div className="p-3 border rounded-lg bg-white flex justify-between items-center">
                        <div>
                          <strong className="text-slate-900 block">5. DPIIT Startup Recognition Bonus (10 Pts)</strong>
                          <span className="text-slate-500">Verified DIPP registration certificate and startup diversity bonus points.</span>
                        </div>
                        <span className="font-bold text-emerald-700 text-sm">+10 Bonus</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTemplateId === 'tpl-sandbox' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-purple-900 font-medium">
                    ⚡ <strong>SANDBOX PILOT GOVERNANCE:</strong> Grants 60-day supervised access to Government Testbed Corridor with ₹5,00,000 sandbox grant allocation.
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm font-sans">3-Phase Sandbox Execution Schedule</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                    <div className="border border-slate-200 rounded-xl p-3 bg-white">
                      <span className="text-amber-600 font-bold uppercase block text-[10px]">Phase 1 (Days 1-15)</span>
                      <strong className="text-slate-900 block mt-1">PoC Setup & Integration</strong>
                      <p className="text-slate-500 mt-1 text-[10px]">Sensor installation, telemetry calibration, initial sensor check.</p>
                      <div className="mt-2 text-emerald-700 font-bold text-[10px]">Payout: 30% Advance</div>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-3 bg-white">
                      <span className="text-amber-600 font-bold uppercase block text-[10px]">Phase 2 (Days 16-45)</span>
                      <strong className="text-slate-900 block mt-1">Supervised Live Field Trial</strong>
                      <p className="text-slate-500 mt-1 text-[10px]">Continuous telemetry logging under harsh weather conditions.</p>
                      <div className="mt-2 text-emerald-700 font-bold text-[10px]">Payout: 40% Milestone</div>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-3 bg-white">
                      <span className="text-amber-600 font-bold uppercase block text-[10px]">Phase 3 (Days 46-60)</span>
                      <strong className="text-slate-900 block mt-1">Independent Validation</strong>
                      <p className="text-slate-500 mt-1 text-[10px]">Independent audit sign-off, score carding & auto-PO decision.</p>
                      <div className="mt-2 text-emerald-700 font-bold text-[10px]">Payout: 30% Settlement</div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTemplateId === 'tpl-ip-nda' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-emerald-900 space-y-1">
                    <div className="font-bold flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Irrevocable Intellectual Property Ringfence Clause</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-emerald-800">
                      100% of software source code, AI model weights, neural architectures, data analytics pipelines, and trade secrets remain the sole, unencumbered property of <strong>{startupName}</strong>.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1 font-sans">Manufacturing Scope & Solvency Terms</h4>
                    <p className="text-slate-700 leading-relaxed text-[11px]">
                      1. <strong>{manufacturerName}</strong> pledges its audited annual turnover to satisfy tender financial pre-qualification bars.<br />
                      2. Manufacturer receives non-exclusive fabrication and hardware assembly rights strictly bound to public tender contracts issued by {deptName}.<br />
                      3. All contracts generated on MahaSetu are bound by SHA-256 cryptographic checksums and digital e-Sign audit logs.
                    </p>
                  </div>
                </div>
              )}

              {selectedTemplateId === 'tpl-cybersecurity' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block">Mandatory Security & Risk Audit Checklist</span>
                    <div className="space-y-1 text-[11px]">
                      <div className="flex items-center space-x-2 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Data Sovereignty: 100% data hosted within MeitY empanelled Indian cloud servers.</span>
                      </div>
                      <div className="flex items-center space-x-2 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>CERT-In Empanelled Security Audit Certificate furnished before sandbox live launch.</span>
                      </div>
                      <div className="flex items-center space-x-2 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>AES-256 Encryption at rest and TLS 1.3 in transit for all telemetry streams.</span>
                      </div>
                      <div className="flex items-center space-x-2 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Fail-safe Manual Override: Hardware bypass switch for critical state infrastructure.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTemplateId === 'tpl-gfr-po' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="bg-gradient-to-r from-govblue-900 to-slate-900 text-white p-5 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300">Fast-Track Direct Purchase Order (Auto-PO)</span>
                      <span className="font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded">GFR 2017 Rule 149</span>
                    </div>
                    <div className="text-[11px] text-slate-200 leading-relaxed font-mono">
                      SANCTION ORDER NO: MAHA-GOV-PO-2026-AUTO-EXEMPT<br />
                      ISSUING AUTHORITY: {deptName}<br />
                      BENEFICIARY: {startupName} (DPIIT-MH-2023-98442)<br />
                      PROCUREMENT PATHWAY: Section 4.2 Startup Innovation Waiver (Prior Turnover &amp; Experience Waived)
                    </div>
                  </div>
                </div>
              )}

              {/* Signatures & Execution Section */}
              <div className="pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-6 font-sans text-center">
                <div className="space-y-8">
                  <div className="font-mono text-[10px] text-slate-400">DIGITALLY SIGNED VIA AADHAAR e-SIGN</div>
                  <div className="border-t border-slate-300 pt-1 text-xs font-bold text-slate-800">
                    Nodal Officer ({deptName})
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="font-mono text-[10px] text-slate-400">DIGITALLY SIGNED VIA DPIIT PORTAL</div>
                  <div className="border-t border-slate-300 pt-1 text-xs font-bold text-slate-800">
                    Founder ({startupName})
                  </div>
                </div>
                <div className="space-y-8 col-span-2 sm:col-span-1">
                  <div className="font-mono text-[10px] text-slate-400">DIGITALLY SIGNED VIA GST PORTAL</div>
                  <div className="border-t border-slate-300 pt-1 text-xs font-bold text-slate-800">
                    Director ({manufacturerName})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
