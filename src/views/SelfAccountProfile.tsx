import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Building2, 
  Award, 
  CheckCircle2, 
  FileText, 
  Key, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Download, 
  Edit3, 
  Zap, 
  Handshake, 
  FlaskConical, 
  Check, 
  ChevronRight,
  ExternalLink,
  Lock,
  Clock,
  Sparkles,
  ArrowUpRight,
  Bot,
  Sprout,
  HeartPulse,
  Droplets,
  Truck,
  ShieldAlert
} from 'lucide-react';
import { AuthUser, Startup, Problem, Collaboration, Pilot, Procurement, UserRole } from '../types';

interface SelfAccountProfileProps {
  currentUser: AuthUser | null;
  currentStartup: Startup;
  problems: Problem[];
  collaborations: Collaboration[];
  pilots: Pilot[];
  procurements: Procurement[];
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onNavigate: (tab: any) => void;
}

export const SelfAccountProfile: React.FC<SelfAccountProfileProps> = ({
  currentUser,
  currentStartup,
  problems,
  collaborations,
  pilots,
  procurements,
  userRole,
  setUserRole,
  onNavigate
}) => {
  const [activeSection, setActiveSection] = useState<'credentials' | 'bids' | 'sandboxes' | 'ndas' | 'settings'>('credentials');
  const [copiedKey, setCopiedKey] = useState(false);

  const userInitials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'AD';

  const myBids = [
    {
      id: 'app-98101',
      problemTitle: 'AI-Powered Computer Vision for Automated Pothole & Road Quality Indexing',
      deptName: 'PWD Maharashtra (Highway Division)',
      sector: 'Smart Automation & AI',
      bidAmount: 3800000,
      budgetCeiling: 5000000,
      submittedAt: '2026-08-26',
      status: 'SHORTLISTED FOR SANDBOX',
      isCollab: true,
      partner: 'Sahyadri Electronics Ltd (Consortium)',
      score: 95
    },
    {
      id: 'app-98102',
      problemTitle: 'LoRaWAN Smart Acoustic Sensor for Drinking Water Pipeline Leakage Localization',
      deptName: 'Water Resources Dept Vidarbha',
      sector: 'Clean Energy & Water',
      bidAmount: 3650000,
      budgetCeiling: 4500000,
      submittedAt: '2026-08-22',
      status: 'SANDBOX APPROVED',
      isCollab: false,
      partner: 'Solo DPIIT Exemption Path',
      score: 89
    }
  ];

  const handleCopyApiKey = () => {
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-body pb-12 select-none">
      
      {/* Top Banner & Profile Header */}
      <div className="bg-white rounded-[28px] border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Decorative Cover Header */}
        <div className="h-44 bg-gradient-to-r from-govblue-950 via-govblue-900 to-slate-900 relative p-6 flex items-start justify-between">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10 flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs text-amber-300 font-bold border border-white/10">
            <span>Official Government Account Passport</span>
          </div>

          <div className="relative z-10 flex items-center space-x-2">
            <button
              onClick={() => alert('Exporting Official DPIIT Verification Passport PDF...')}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition border border-white/10 backdrop-blur-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Passport PDF</span>
            </button>
          </div>
        </div>

        {/* User Details & Circle Profile Avatar */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-end space-y-3 sm:space-y-0 sm:space-x-5">
              {/* Circular Self Profile Button Avatar */}
              <div className="relative group -mt-14">
                <div className="w-28 h-28 rounded-full bg-slate-900 text-white font-black text-3xl flex items-center justify-center border-4 border-white shadow-xl bg-gradient-to-br from-govblue-900 via-slate-900 to-govblue-800">
                  {userInitials}
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow" title="DPIIT & Aadhaar Active Session">
                  ✓
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                    {currentUser?.name || 'Aarav Deshmukh'}
                  </h2>
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                </div>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Founder & Principal AI Lead • {currentStartup.companyName}
                </p>
                <div className="flex items-center space-x-2 mt-2 text-[11px] font-medium text-slate-600 flex-wrap gap-y-1">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Pune, Maharashtra</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{currentUser?.email || 'aarav@drishtiedge.in'}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>+91 98230 44912</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-xs bg-emerald-100 text-emerald-900 font-extrabold px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{currentUser?.verificationBadge || 'DPIIT Certified Startup (DIPP-MH-98442)'}</span>
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">DPIIT Cert No.</span>
              <span className="font-extrabold text-slate-900 font-mono text-xs">{currentStartup.dpiitCertNo}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">GFR Rule 149 Waiver</span>
              <span className="font-extrabold text-emerald-700 text-xs">Active & Verified</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Active Sandbox Pilots</span>
              <span className="font-extrabold text-govblue-900 text-xs">{pilots.length} Running</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">State Escrow Balance</span>
              <span className="font-extrabold text-amber-700 text-xs">₹38.0 Lakhs Locked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSection('credentials')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeSection === 'credentials'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Identity & Government Credentials</span>
        </button>

        <button
          onClick={() => setActiveSection('bids')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeSection === 'bids'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>My Tender Applications ({myBids.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('sandboxes')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeSection === 'sandboxes'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FlaskConical className="w-4 h-4 text-purple-400" />
          <span>Active Testbeds & KPI Scorecards</span>
        </button>

        <button
          onClick={() => setActiveSection('ndas')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeSection === 'ndas'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Handshake className="w-4 h-4 text-sky-400" />
          <span>Consortium NDAs ({collaborations.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('settings')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeSection === 'settings'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Key className="w-4 h-4 text-slate-400" />
          <span>Security & Role Controls</span>
        </button>
      </div>

      {/* SECTION 1: IDENTITY & GOVERNMENT CREDENTIALS */}
      {activeSection === 'credentials' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Legal Entity Registration */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Legal Entity & Department Registration</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Verified on Startup India Hub & Government e-Marketplace (GeM)</p>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-900 font-extrabold px-2.5 py-1 rounded-full">
                  100% Compliant
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold">COMPANY LEGAL NAME</span>
                  <span className="font-bold text-slate-900 text-sm block mt-0.5">{currentStartup.companyName}</span>
                  <span className="text-[11px] text-slate-500">Private Limited (Inc. 2022)</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold">DPIIT RECOGNITION NO.</span>
                  <span className="font-mono font-bold text-govblue-900 text-sm block mt-0.5">{currentStartup.dpiitCertNo}</span>
                  <span className="text-[11px] text-emerald-700 font-bold">✓ Tax Exemption Approved</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold">GSTIN IDENTIFICATION</span>
                  <span className="font-mono font-bold text-slate-800 text-xs block mt-0.5">27AAACD9844F1Z3</span>
                  <span className="text-[11px] text-slate-500">State: Maharashtra (Active)</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold">STATE ESCROW BANK ACCOUNT</span>
                  <span className="font-mono font-bold text-slate-800 text-xs block mt-0.5">SBI - MAHA-ESCROW-88491</span>
                  <span className="text-[11px] text-emerald-700 font-bold">✓ Auto-Disbursement Ready</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-800 block mb-2">Registered Technical Core Domains</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentStartup.techDomains.map((domain, i) => (
                    <span key={i} className="bg-govblue-50 text-govblue-900 border border-govblue-200 font-extrabold text-xs px-3 py-1 rounded-xl">
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>



            {/* Official Exemption Passport */}
            <div className="bg-gradient-to-r from-govblue-950 via-slate-900 to-govblue-900 text-white rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-saffron-400" />
                  <span className="font-extrabold text-sm">GFR 2017 Rule 149 Exemption Passport</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 font-bold text-[10px] px-2.5 py-0.5 rounded border border-emerald-400/30">
                  Govt Seal Verified
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                As a recognized DPIIT startup, your account automatically bypasses minimum turnover and prior experience criteria across all Maharashtra State Departments under Section 4.2 of the Maharashtra Innovation Procurement Framework.
              </p>
            </div>
          </div>

          {/* Right Sidebar: Key Credentials & Vault */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Account Credentials Vault</h4>
              
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-govblue-700" />
                    <span className="font-bold text-slate-800">DPIIT Certificate PDF</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold">Verified</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-800">Aadhaar e-KYC Sign</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold">Active</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center space-x-2">
                    <Handshake className="w-4 h-4 text-purple-600" />
                    <span className="font-bold text-slate-800">Master NDA Template</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold">Executed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: MY TENDER APPLICATIONS */}
      {activeSection === 'bids' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Submitted Tender Applications & Pilot Bids</h3>
                <p className="text-xs text-slate-500">Track real-time evaluation status and proposal scorecards</p>
              </div>
              <button
                onClick={() => onNavigate('problems')}
                className="px-3.5 py-2 bg-govblue-900 text-white font-bold text-xs rounded-xl hover:bg-govblue-800 transition"
              >
                Browse Open Challenges →
              </button>
            </div>

            <div className="space-y-3">
              {myBids.map((bid) => (
                <div key={bid.id} className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] bg-govblue-100 text-govblue-900 font-extrabold px-2 py-0.5 rounded uppercase">
                          {bid.sector}
                        </span>
                        <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded uppercase">
                          {bid.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900 mt-1">{bid.problemTitle}</h4>
                      <p className="text-xs text-slate-500">{bid.deptName}</p>
                    </div>

                    <div className="text-right bg-white p-3 rounded-xl border border-slate-200 shrink-0">
                      <span className="text-[10px] text-slate-400 font-bold block">COMMERCIAL BID</span>
                      <span className="text-base font-black text-slate-900">₹{(bid.bidAmount / 100000).toFixed(1)} Lakhs</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                    <div>
                      Partner Path: <span className="font-bold text-slate-800">{bid.partner}</span>
                    </div>
                    <div>
                      Submitted: <span className="font-mono font-bold text-slate-700">{bid.submittedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: ACTIVE TESTBEDS & KPI SCORECARDS */}
      {activeSection === 'sandboxes' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Active Sandbox Testbeds & Live Scorecards</h3>
              <p className="text-xs text-slate-500">Milestone progress monitored by departmental nodal officers</p>
            </div>

            <div className="space-y-4">
              {pilots.map((pilot) => (
                <div key={pilot.id} className="border border-slate-200 rounded-2xl p-5 bg-white space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded uppercase">
                        {pilot.status}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{pilot.problemTitle}</h4>
                      <p className="text-xs text-slate-500">{pilot.sandboxEnvironment}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold block">AGGREGATE SCORE</span>
                      <span className="text-2xl font-black text-emerald-700">{pilot.aggregateScore}/100</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {pilot.scorecards.map((sc, i) => (
                      <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="font-bold text-slate-800 block text-[11px]">{sc.metric}</span>
                        <div className="text-xs text-govblue-900 font-bold mt-1">Target: {sc.target}</div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Achieved: {sc.achieved}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: CONSORTIUM NDAS */}
      {activeSection === 'ndas' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Executed Consortium NDAs & Manufacturer Partnerships</h3>
              <p className="text-xs text-slate-500">Legal IP protection agreements enabling GFR Rule 149 turnover qualification</p>
            </div>

            <div className="space-y-3">
              {collaborations.map((collab) => (
                <div key={collab.id} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">
                        {collab.status}
                      </span>
                      <span className="font-bold text-slate-900">{collab.manufacturerName}</span>
                    </div>
                    <p className="text-slate-600 mt-1">{collab.problemTitle}</p>
                    <div className="text-[11px] text-slate-500 mt-0.5">Role Split: {collab.roleSplit}</div>
                  </div>

                  <button
                    onClick={() => alert(`Viewing Executed NDA Document #${collab.ndaContract?.id || 'NDA-9812'}`)}
                    className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-100 transition shrink-0"
                  >
                    View NDA Document
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: SECURITY & ROLE CONTROLS */}
      {activeSection === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Persona Role Switcher Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Switch Active System Role / Persona</h3>
              <p className="text-xs text-slate-500 mt-0.5">Test Converge workflows as a Startup Founder, Government Officer, Manufacturer, or Citizen.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setUserRole('startup')}
                className={`p-3 rounded-xl border text-left font-bold transition ${
                  userRole === 'startup'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🚀 Startup Founder
              </button>

              <button
                onClick={() => setUserRole('dept')}
                className={`p-3 rounded-xl border text-left font-bold transition ${
                  userRole === 'dept'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🏛️ Govt Nodal Officer
              </button>

              <button
                onClick={() => setUserRole('manufacturer')}
                className={`p-3 rounded-xl border text-left font-bold transition ${
                  userRole === 'manufacturer'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🏭 Manufacturer Partner
              </button>

              <button
                onClick={() => setUserRole('citizen')}
                className={`p-3 rounded-xl border text-left font-bold transition ${
                  userRole === 'citizen'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                👥 Citizen Evaluator
              </button>
            </div>
          </div>

          {/* Sandbox API Credentials */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Sandbox API Key & Telemetry Key</h3>
              <p className="text-xs text-slate-500 mt-0.5">Use this token to send automated KPI metrics from your edge devices</p>
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 font-mono text-xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">LIVE SANDBOX API TOKEN</span>
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold truncate">cv_live_sk_98442_drishti_edge_pune</span>
                <button
                  onClick={handleCopyApiKey}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded font-sans text-[10px] font-bold transition shrink-0 ml-2"
                >
                  {copiedKey ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
