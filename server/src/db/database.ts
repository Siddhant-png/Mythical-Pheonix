import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';

const dbDir = path.resolve(process.cwd(), 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbFilePath = path.join(dbDir, 'converge_db.json');

export interface DBStore {
  problems: any[];
  userInterests: Record<string, string[]>;
  pilots: any[];
  procurements: any[];
  scaleAdoptions: any[];
  civicIdeas: any[];
  users: StoredUser[];
}

interface StoredUser { id: string; name: string; email: string; role: string; passwordHash: string; verificationBadge: string; resetCodeHash?: string; resetExpiresAt?: string; }

let store: DBStore = {
  problems: [],
  userInterests: { default_user: ['ai-vision', 'agri-drones', 'medtech', 'clean-water'] },
  pilots: [],
  procurements: [],
  scaleAdoptions: [],
  civicIdeas: [], users: []
};

const hashPassword = (password: string, salt = crypto.randomBytes(16).toString('hex')) => `${salt}:${crypto.scryptSync(password, salt, 64).toString('hex')}`;
const passwordsMatch = (password: string, stored: string) => { const [salt, storedHash] = stored.split(':'); return Boolean(salt && storedHash) && crypto.timingSafeEqual(Buffer.from(crypto.scryptSync(password, salt, 64).toString('hex'), 'hex'), Buffer.from(storedHash, 'hex')); };

function saveToDisk() {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Database] Failed to write database file:', err);
  }
}

function loadFromDisk() {
  if (fs.existsSync(dbFilePath)) {
    try {
      const data = fs.readFileSync(dbFilePath, 'utf-8');
      store = JSON.parse(data);
    } catch (err) {
      console.warn('[Database] Failed reading db file, re-initializing:', err);
    }
  }
}

export function initDatabase() {
  console.log('[Database] Initializing Converge JSON File Database...');
  loadFromDisk();

  if (!store.problems || store.problems.length === 0) {
    console.log('[Database] Seeding initial problems...');
    store.problems = [
      {
        id: 'prob-101',
        deptId: 'dept-maha-pwd',
        deptName: 'Public Works Department (PWD), Govt of Maharashtra',
        title: 'AI-Powered Computer Vision for Automated Pothole & Road Quality Indexing',
        description: 'Development of an edge-computing vehicular camera system that automatically maps, classifies, and estimates asphalt deterioration and potholes along state highways in real-time with GPS coordinates.',
        sector: 'Smart Automation & AI',
        budgetCeiling: 4500000,
        deadline: '2026-10-15',
        status: 'OPEN',
        eligibilityCriteria: 'DPIIT recognized startups with proven computer vision models OR joint consortium with OEM dashcam/sensor manufacturers.',
        kpiBenchmarks: [
          { metric: 'Detection Accuracy (mAP@0.5)', minTarget: '>= 92%', weightage: 35 },
          { metric: 'Inference Latency at 60 km/h', minTarget: '< 45 ms', weightage: 35 },
          { metric: 'Ruggedized Ingress Protection', minTarget: 'IP67 Rated', weightage: 30 }
        ],
        preferredMode: 'COLLABORATION_RECOMMENDED',
        postedDate: '2026-08-20',
        heroImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1200&auto=format&fit=crop&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80'
        ],
        videoDuration: '03:45 mins',
        videoTitle: 'PWD Technical Explainer: Automated Highway Quality Audit',
        targetBeneficiaries: [
          { title: 'Highway Commuters & Drivers', desc: 'Prevents vehicular damage and fatal accidents.' },
          { title: 'PWD District Engineers', desc: 'Eliminates manual physical inspection bias.' }
        ],
        whyNeeded: 'Manual road quality audits cover less than 12% of Maharashtra road network per year.',
        urgencyLevel: 'CRITICAL',
        urgencyReason: 'Monsoon season deterioration requires automated continuous telemetry.',
        severityScore: 9.6,
        publicImpactMetrics: [
          { label: 'Accident Reduction', value: '45%', subtext: 'Target reduction in monsoon fatalities' },
          { label: 'Audit Speedup', value: '18x Faster', subtext: 'Continuous coverage vs manual walking surveys' }
        ],
        keywords: ['#ComputerVision', '#EdgeAI', '#PotholeDetection', '#SmartHighways']
      },
      {
        id: 'prob-102',
        deptId: 'dept-maha-agri',
        deptName: 'Department of Agriculture & Farmer Welfare, Maharashtra',
        title: 'Precision Micro-Drone Payload for Targeted Bio-Pesticide Spraying in Vidarbha',
        description: 'Autonomous micro-UAV system with multispectral pest detection to perform hyper-localized bio-pesticide misting on cotton and soybean crops.',
        sector: 'Agriculture & Allied',
        budgetCeiling: 7500000,
        deadline: '2026-11-05',
        status: 'OPEN',
        eligibilityCriteria: 'DGCA type certified UAV frames OR joint venture with licensed drone manufacturer.',
        kpiBenchmarks: [
          { metric: 'Flight Endurance with 10kg Payload', minTarget: '>= 25 mins', weightage: 40 },
          { metric: 'Spray Drift Reduction Efficiency', minTarget: '>= 80%', weightage: 35 }
        ],
        preferredMode: 'COLLABORATION_RECOMMENDED',
        postedDate: '2026-09-01',
        heroImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&auto=format&fit=crop&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80'
        ],
        videoDuration: '04:12 mins',
        videoTitle: 'Agri Dept Challenge: Targeted Bio-Pesticide Payload',
        targetBeneficiaries: [
          { title: 'Vidarbha Farmers', desc: 'Prevents chemical toxicity poisoning.' }
        ],
        whyNeeded: 'Traditional backpack spraying exposes over 4,00,000 smallholder farmers to chemical toxicity.',
        urgencyLevel: 'CRITICAL',
        urgencyReason: 'Seasonal Pink Bollworm infestations require precision localized misting.',
        severityScore: 9.4,
        publicImpactMetrics: [
          { label: 'Pesticide Reduction', value: '70%', subtext: 'Target reduction in chemical volume' }
        ],
        keywords: ['#AgriTech', '#DGCADrone', '#PrecisionSpraying']
      }
    ];
  }

  if (!store.userInterests || !store.userInterests.default_user) {
    store.userInterests = { default_user: ['ai-vision', 'agri-drones', 'medtech', 'clean-water'] };
  }
  if (!Array.isArray(store.users)) store.users = [];

  saveToDisk();
}

export function getProblems(sector?: string, status?: string) {
  let list = store.problems;
  if (sector) list = list.filter(p => p.sector === sector);
  if (status) list = list.filter(p => p.status === status);
  return list;
}

export function getProblemById(id: string) {
  return store.problems.find(p => p.id === id);
}

export function getUserInterests(userId = 'default_user') {
  return store.userInterests[userId] || ['ai-vision', 'agri-drones', 'medtech', 'clean-water'];
}

export function updateUserInterests(userId = 'default_user', interestIds: string[]) {
  store.userInterests[userId] = interestIds;
  saveToDisk();
  return store.userInterests[userId];
}

export function getPilots() {
  return store.pilots || [];
}

const publicUser = (user: StoredUser) => ({ id: user.id, name: user.name, email: user.email, role: user.role, isVerified: true, verificationBadge: user.verificationBadge });
export function registerUser(input: { name: string; email: string; password: string; role: string }) { const email = input.email.trim().toLowerCase(); if (store.users.some(user => user.email === email)) throw new Error('An account with this email already exists.'); const user: StoredUser = { id: `user-${Date.now()}`, name: input.name.trim(), email, role: input.role, passwordHash: hashPassword(input.password), verificationBadge: `${input.role === 'dept' ? 'Government' : input.role === 'startup' ? 'Startup' : input.role === 'manufacturer' ? 'Manufacturer' : 'Citizen'} Account` }; store.users.push(user); saveToDisk(); return publicUser(user); }
export function authenticateUser(emailInput: string, password: string) { const user = store.users.find(item => item.email === emailInput.trim().toLowerCase()); return user && passwordsMatch(password, user.passwordHash) ? publicUser(user) : null; }
export function createPasswordReset(emailInput: string) { const user = store.users.find(item => item.email === emailInput.trim().toLowerCase()); if (!user) return false; user.resetCodeHash = hashPassword('123456'); user.resetExpiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); saveToDisk(); return true; }
export function resetPassword(emailInput: string, code: string, password: string) { const user = store.users.find(item => item.email === emailInput.trim().toLowerCase()); if (!user || !user.resetCodeHash || !user.resetExpiresAt || new Date(user.resetExpiresAt) < new Date() || !passwordsMatch(code, user.resetCodeHash)) throw new Error('The reset code is invalid or has expired.'); user.passwordHash = hashPassword(password); delete user.resetCodeHash; delete user.resetExpiresAt; saveToDisk(); return publicUser(user); }
