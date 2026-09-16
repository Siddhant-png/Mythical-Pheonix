import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  CheckCircle2, 
  X, 
  KeyRound, 
  Mail, 
  Building, 
  Sparkles, 
  Lock, 
  ArrowRight,
  User,
  Phone,
  FileBadge,
  Check
} from 'lucide-react';
import { UserRole, AuthUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRole = 'citizen'
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [step, setStep] = useState<'credentials' | 'otp' | 'success'>('credentials');

  // Form Fields State
  const [email, setEmail] = useState('officer.pwd@maharashtra.gov.in');
  const [name, setName] = useState('Rajesh Sharma (Superintending Engineer)');
  const [deptCode, setDeptCode] = useState('MH-PWD-EXEC-782');
  const [dpiitNo, setDpiitNo] = useState('DIPP-MH-2023-98442');
  const [citizenId, setCitizenId] = useState('MH-CITIZEN-99412');
  const [gstNumber, setGstNumber] = useState('27AABCS1429B1Z4');
  const [otpCode, setOtpCode] = useState('784912');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'dept') {
      setEmail('officer.pwd@maharashtra.gov.in');
      setName('Rajesh Sharma (Nodal Officer)');
    } else if (role === 'startup') {
      setEmail('aarav@drishtiedge.in');
      setName('Aarav Deshmukh (Founder)');
    } else if (role === 'citizen') {
      setEmail('priya.pune@gmail.com');
      setName('Priya Kulkarni (Citizen)');
    } else {
      setEmail('alliances@sahyadripres.com');
      setName('Rajesh Kulkarni (VP)');
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('otp');
    }, 700);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('success');

      let badge = 'Aadhaar Verified Citizen';
      if (selectedRole === 'dept') badge = 'Govt Officer Verified (PWD Maharashtra)';
      if (selectedRole === 'startup') badge = 'DPIIT Certified Startup (DIPP-MH-98442)';
      if (selectedRole === 'manufacturer') badge = 'GST Audited Manufacturer (Sahyadri)';

      const user: AuthUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: selectedRole,
        isVerified: true,
        verificationBadge: badge,
        departmentCode: selectedRole === 'dept' ? deptCode : undefined,
        dpiitNo: selectedRole === 'startup' ? dpiitNo : undefined,
        citizenId: selectedRole === 'citizen' ? citizenId : undefined,
        gstNumber: selectedRole === 'manufacturer' ? gstNumber : undefined
      };

      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
        setStep('credentials');
      }, 1000);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 font-body">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden text-xs relative font-body">
        {/* Top Decorative Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-govblue-900 via-amber-500 to-emerald-600"></div>

        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#6d28d9] text-white flex items-center justify-between border-b border-indigo-400/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#dce5f2] p-1 flex items-center justify-center border border-white/20 shrink-0 shadow-md">
              <img src="/logo.png" alt="Converge Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">
                {step === 'success' ? 'Verification Complete!' : 'Authentication & DPIIT Portal Gate'}
              </h2>
              <p className="text-[11px] text-indigo-100 font-medium">
                Converge Govt Innovation Sandbox • Role Verification
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona Selector Tabs */}
        {step === 'credentials' && (
          <div className="p-4 bg-slate-100 border-b border-slate-200 grid grid-cols-4 gap-1.5 text-center font-bold text-[11px]">
            <button
              type="button"
              onClick={() => handleRoleChange('dept')}
              className={`py-2 px-1 rounded-xl transition ${
                selectedRole === 'dept'
                  ? 'bg-govblue-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              🏛️ Govt Officer
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('startup')}
              className={`py-2 px-1 rounded-xl transition ${
                selectedRole === 'startup'
                  ? 'bg-saffron-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              🚀 Startup
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('citizen')}
              className={`py-2 px-1 rounded-xl transition ${
                selectedRole === 'citizen'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              👥 Citizen
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('manufacturer')}
              className={`py-2 px-1 rounded-xl transition ${
                selectedRole === 'manufacturer'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              🏭 Manufacturer
            </button>
          </div>
        )}

        {/* Step 1: Input Credentials */}
        {step === 'credentials' && (
          <form onSubmit={handleSendOtp} className="p-6 space-y-4">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">SELECTED AUTHENTICATION PATH:</span>
              <span className="font-bold text-slate-900 text-xs mt-0.5 block">
                {selectedRole === 'dept' && '🏛️ Government Officer / Nodal Evaluator Portal'}
                {selectedRole === 'startup' && '🚀 DPIIT Recognized Startup Founder Portal'}
                {selectedRole === 'citizen' && '👥 Public Citizen Civic Voice & Upvote Portal'}
                {selectedRole === 'manufacturer' && '🏭 Verified Equipment Manufacturer Portal'}
              </span>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-govblue-800/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Official Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-govblue-800/20"
                  required
                />
              </div>
            </div>

            {/* Role Specific Verification Inputs */}
            {selectedRole === 'dept' && (
              <div>
                <label className="font-bold text-slate-800 block mb-1">Government Department Code</label>
                <div className="relative">
                  <FileBadge className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={deptCode}
                    onChange={(e) => setDeptCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 font-mono font-bold"
                    placeholder="e.g. MH-PWD-EXEC-782"
                    required
                  />
                </div>
              </div>
            )}

            {selectedRole === 'startup' && (
              <div>
                <label className="font-bold text-slate-800 block mb-1">DPIIT Recognition Number</label>
                <div className="relative">
                  <FileBadge className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={dpiitNo}
                    onChange={(e) => setDpiitNo(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 font-mono font-bold"
                    placeholder="e.g. DIPP-MH-2023-98442"
                    required
                  />
                </div>
              </div>
            )}

            {selectedRole === 'citizen' && (
              <div>
                <label className="font-bold text-slate-800 block mb-1">Citizen ID / Aadhaar Virtual ID</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={citizenId}
                    onChange={(e) => setCitizenId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 font-mono font-bold"
                    placeholder="e.g. MH-CITIZEN-99412"
                    required
                  />
                </div>
              </div>
            )}

            {selectedRole === 'manufacturer' && (
              <div>
                <label className="font-bold text-slate-800 block mb-1">GSTIN Registration Number</label>
                <div className="relative">
                  <FileBadge className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 font-mono font-bold"
                    placeholder="e.g. 27AABCS1429B1Z4"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-govblue-900 hover:bg-govblue-800 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center space-x-2 text-xs"
            >
              {isVerifying ? (
                <span>Generating Verification OTP...</span>
              ) : (
                <>
                  <span>Send Verification Code & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 2: Verification OTP */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm">Enter 6-Digit Verification OTP</h3>
              <p className="text-xs text-slate-500 mt-1">
                A 6-digit security code was sent to <strong className="text-slate-800">{email}</strong>
              </p>
            </div>

            <div className="max-w-xs mx-auto">
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={6}
                className="w-full text-center tracking-[0.5em] text-lg font-mono font-bold py-2.5 border-2 border-slate-300 rounded-xl focus:border-govblue-800"
                required
              />
            </div>

            <div className="text-[11px] text-emerald-700 font-semibold flex items-center justify-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Simulated State Portal Verification Ready</span>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl shadow-md transition text-xs"
            >
              {isVerifying ? 'Verifying Credentials...' : 'Verify OTP & Log In'}
            </button>
          </form>
        )}

        {/* Step 3: Success Granted */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-3 bg-emerald-50">
            <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-emerald-900">Identity Verified & Session Active!</h3>
            <p className="text-xs text-emerald-700">
              Welcome back, <strong>{name}</strong>. Accessing Converge Innovation Portal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
