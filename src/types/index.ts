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

export interface ProblemBeneficiary {
  title: string;
  desc: string;
}

export interface PublicImpactMetric {
  label: string;
  value: string;
  subtext: string;
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
  heroImage?: string;
  galleryImages?: string[];
  videoExplainerUrl?: string;
  videoDuration?: string;
  videoTitle?: string;
  targetBeneficiaries?: ProblemBeneficiary[];
  whyNeeded?: string;
  urgencyLevel?: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  urgencyReason?: string;
  severityScore?: number;
  publicImpactMetrics?: PublicImpactMetric[];
  keywords?: string[];
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

export type PartnerCategory = 
  | 'MANUFACTURER' 
  | 'SYSTEM_INTEGRATOR' 
  | 'TESTING_LAB' 
  | 'STARTUP_CO_BIDDER';

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
  category?: PartnerCategory;
  headquarters?: string;
  certifications?: string[];
  establishedYear?: number;
  verifiedStatus?: string;
}

export type CollabStatus = 'REQUESTED' | 'NDA_PENDING' | 'ACTIVE' | 'REJECTED';

export type ProposalStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'UNDER_REVIEW';

export interface AllianceProposal {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  recipientName: string;
  problemId: string;
  problemTitle: string;
  proposedRoleSplit: string;
  proposedStartupShare: number; // e.g. 60
  proposedPartnerShare: number; // e.g. 40
  turnoverPledged: number;
  status: ProposalStatus;
  sentAt: string;
  respondedAt?: string;
  note?: string;
}

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
  partnerCategory?: PartnerCategory;
  revenueSplitStartup?: number;
  revenueSplitPartner?: number;
  turnoverPledged?: number;
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

/* ---------------------------------------------------------------------- */
/* Startup Profile System (Part 5) — "Instagram × GitHub" showoff profile */
/* ---------------------------------------------------------------------- */

export type ProfileBannerTheme = 'saffron' | 'emerald' | 'govblue' | 'purple' | 'sunset';

export type ProfileHighlightType = 'DPIIT' | 'PILOT_PASSED' | 'PO_WON' | 'CONSORTIUM' | 'SCALE' | 'AWARD';

export interface ProfileHighlight {
  id: string;
  label: string;
  type: ProfileHighlightType;
}

export type PinnedWinCategory = 'PILOT' | 'PROCUREMENT' | 'SCALE_ADOPTION' | 'CONSORTIUM';

export interface PinnedWin {
  id: string;
  title: string;
  subtitle: string;
  category: PinnedWinCategory;
  statLabel: string;
  statValue: string;
  deptName: string;
  date: string;
  accentColor: 'emerald' | 'amber' | 'sky' | 'purple' | 'saffron';
}

export type ProfileTimelineCategory = 'MILESTONE' | 'PILOT' | 'PROCUREMENT' | 'CONSORTIUM' | 'CERT' | 'FUNDING';

export interface ProfileTimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: ProfileTimelineCategory;
}

export interface AllianceEntry {
  id: string;
  partnerName: string;
  partnerType: 'Manufacturer' | 'Startup' | 'Department';
  roleSplit: string;
  status: 'ACTIVE' | 'NDA_PENDING' | 'COMPLETED';
  since: string;
}

export type StartupProjectStatus = 'LIVE' | 'IN PILOT' | 'COMPLETED' | 'IN DEVELOPMENT';

export interface StartupProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: StartupProjectStatus;
  demoUrl?: string;
  githubUrl?: string;
  isPinned: boolean;
}

export interface StartupProfileStats {
  activePilots: number;
  consortiums: number;
  poWins: number;
  scaleAdoptions: number;
  readinessScore: number;
}

export interface StartupProfileData {
  id: string;
  companyName: string;
  handle: string;
  tagline: string;
  bio: string;
  location: string;
  foundedYear: number;
  dpiitCertNo: string;
  isDpiitVerified: boolean;
  bannerTheme: ProfileBannerTheme;
  avatarInitials: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  email: string;
  techDomains: string[];
  stats: StartupProfileStats;
  highlights: ProfileHighlight[];
  pinnedWins: PinnedWin[];
  timeline: ProfileTimelineEvent[];
  alliances: AllianceEntry[];
  projects?: StartupProject[];
}

