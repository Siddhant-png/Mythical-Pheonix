export type ProblemSector = 
  | 'Smart Automation & AI'
  | 'Agriculture & Allied'
  | 'MedTech & Public Health'
  | 'Clean Energy & Water'
  | 'Smart Mobility & Logistics'
  | 'Disaster Management';

export type ProblemStatus = 'OPEN' | 'EVALUATION' | 'PILOTING' | 'PROCURED' | 'CLOSED';

export type UserRole = 'startup' | 'dept' | 'manufacturer' | 'citizen';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  verificationBadge: string; // e.g. "Govt Officer Verified (PWD)", "DPIIT Certified Startup", "Aadhaar Verified Citizen"
  departmentCode?: string;
  dpiitNo?: string;
  citizenId?: string;
  gstNumber?: string;
  avatarUrl?: string;
}

export interface CivicComment {
  id: string;
  authorName: string;
  authorRole: UserRole;
  text: string;
  timestamp: string;
  upvotes: number;
}

export interface CivicIdeaPost {
  id: string;
  title: string;
  authorName: string;
  authorRole: UserRole;
  authorBadge: string;
  category: ProblemSector | 'Civic Improvement' | 'Public Safety';
  content: string;
  mediaType: 'video' | 'image' | 'text';
  mediaUrl?: string;
  thumbnailUrl?: string;
  upvotes: number;
  downvotes: number;
  userVote: 'UP' | 'DOWN' | null;
  comments: CivicComment[];
  tags: string[];
  urgency: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  deptEndorsed: boolean;
  targetDept?: string;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  departmentCode: string;
  nodalOfficerName: string;
  nodalOfficerEmail: string;
  sector: string;
}

export interface KPIBenchmark {
  metric: string;
  minTarget: string;
  weightage: number; // Percentage
}

export interface Problem {
  id: string;
  deptId: string;
  deptName: string;
  title: string;
  description: string;
  sector: ProblemSector;
  budgetCeiling: number; // in INR (e.g. 50,00,000 = ₹50 Lakhs)
  deadline: string; // ISO Date
  status: ProblemStatus;
  eligibilityCriteria: string;
  kpiBenchmarks: KPIBenchmark[];
  preferredMode: 'SOLO_OR_COLLAB' | 'COLLABORATION_RECOMMENDED' | 'SOLO_ONLY';
  postedDate: string;
}

export interface Startup {
  id: string;
  companyName: string;
  dpiitCertNo: string;
  annualTurnover: number;
  foundingYear: number;
  techDomains: string[];
  contactPerson: string;
  contactEmail: string;
  activePilotsCount: number;
}

export interface Manufacturer {
  id: string;
  companyName: string;
  gstNumber: string;
  annualTurnover: number; // in INR (e.g. ₹45 Crores)
  manufacturingCapacityUnits: number;
  openToCollaborate: boolean;
  facilitiesSectors: string[];
  contactPerson: string;
  contactEmail: string;
  activeConsortiumsCount: number;
  rating: number;
}

export type CollabStatus = 'REQUESTED' | 'NDA_PENDING' | 'ACTIVE' | 'REJECTED';

export interface NDAContract {
  id: string;
  collaborationId: string;
  ipProtectionClauses: string;
  commercialTerms: string;
  documentHash: string;
  startupSignedAt: string | null;
  manufacturerSignedAt: string | null;
  legalStatus: 'DRAFT' | 'PARTIALLY_SIGNED' | 'EXECUTED';
}

export interface Collaboration {
  id: string;
  startupId: string;
  startupName: string;
  manufacturerId: string;
  manufacturerName: string;
  problemId: string;
  problemTitle: string;
  roleSplit: string;
  status: CollabStatus;
  agreedAt: string | null;
  ndaContract?: NDAContract;
}

export type ApplicationType = 'SOLO' | 'COLLABORATION';

export interface Application {
  id: string;
  problemId: string;
  type: ApplicationType;
  startupId?: string;
  collabId?: string;
  applicantName: string;
  proposalSummary: string;
  bidAmount: number;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'PILOT_APPROVED' | 'REJECTED';
  submittedAt: string;
}

export interface PilotScorecard {
  metric: string;
  target: string;
  achieved: string;
  score: number; // 0 - 100
  passed: boolean;
}

export interface Pilot {
  id: string;
  applicationId: string;
  problemTitle: string;
  applicantName: string;
  isCollab: boolean;
  sandboxEnvironment: string;
  startDate: string;
  endDate: string;
  aggregateScore: number; // 0 - 100
  scorecards: PilotScorecard[];
  status: 'RUNNING' | 'EVALUATION_PENDING' | 'PASSED' | 'FAILED';
  evaluatorRemarks: string;
}

export interface Procurement {
  id: string;
  pilotId: string;
  problemTitle: string;
  vendorName: string;
  poNumber: string;
  finalPoValue: number;
  gfrRuleReference: string;
  deliveryTimelineWeeks: number;
  issuedAt: string;
  adoptionsCount: number;
}

export interface ScaleAdoption {
  id: string;
  procurementId: string;
  originalDeptName: string;
  solutionTitle: string;
  vendorName: string;
  adoptingDeptName: string;
  adoptedOn: string;
  addonContractValue: number;
  deploymentLocation: string;
}

