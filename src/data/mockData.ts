import { Problem, Startup, Manufacturer, Collaboration, Application, Pilot, Procurement, ScaleAdoption } from '../types';

export interface UserInterest {
  id: string;
  label: string;
  count: number;
  iconName: string;
  color: string;
  bg: string;
  sectorName: string;
  desc: string;
}

export const MASTER_INTERESTS: UserInterest[] = [
  { id: 'ai-vision', label: 'Smart Automation & Edge AI', count: 14, iconName: 'Bot', color: 'text-purple-600', bg: 'bg-purple-100', sectorName: 'Smart Automation & AI', desc: 'Edge AI, Computer Vision, Jetson Orin & Automated Indexing' },
  { id: 'agri-drones', label: 'AgriTech & Drone Systems', count: 8, iconName: 'Sprout', color: 'text-emerald-600', bg: 'bg-emerald-100', sectorName: 'Agriculture & Allied', desc: 'Precision spraying, Micro-drones, Bio-pesticides & Soil Sensors' },
  { id: 'medtech', label: 'MedTech & Public Health', count: 11, iconName: 'HeartPulse', color: 'text-red-600', bg: 'bg-red-100', sectorName: 'MedTech & Public Health', desc: 'Non-invasive screeners, Portable ICU, Diagnostic IoT & Telemedicine' },
  { id: 'clean-water', label: 'Clean Energy & Smart Water', count: 6, iconName: 'Droplets', color: 'text-sky-600', bg: 'bg-sky-100', sectorName: 'Clean Energy & Water', desc: 'Acoustic leak detection, LoRaWAN water meters & Solar Microgrids' },
  { id: 'mobility', label: 'Smart Mobility & EV Logistics', count: 9, iconName: 'Truck', color: 'text-amber-600', bg: 'bg-amber-100', sectorName: 'Smart Mobility & Logistics', desc: 'EV fleet management, Battery swapping & Traffic AI telemetry' },
  { id: 'disaster', label: 'Disaster Response & Resilience', count: 5, iconName: 'ShieldAlert', color: 'text-indigo-600', bg: 'bg-indigo-100', sectorName: 'Disaster Management', desc: 'Early flood warning, Seismograph IoT & Emergency Broadcasts' }
];

export const INITIAL_PROBLEMS: Problem[] = [
  {
    id: 'prob-101',
    deptId: 'dept-maha-pwd',
    deptName: 'Public Works Department (PWD), Govt of Maharashtra',
    title: 'AI-Powered Computer Vision for Automated Pothole & Road Quality Indexing',
    description: 'Development of an edge-computing vehicular camera system that automatically maps, classifies, and estimates asphalt deterioration and potholes along state highways in real-time with GPS coordinates.',
    sector: 'Smart Automation & AI',
    budgetCeiling: 4500000, // ₹45 Lakhs
    deadline: '2026-10-15',
    status: 'OPEN',
    eligibilityCriteria: 'DPIIT recognized startups with proven computer vision models OR joint consortium with OEM dashcam/sensor manufacturers with ISO-9001 certification.',
    preferredMode: 'COLLABORATION_RECOMMENDED',
    postedDate: '2026-08-20',
    heroImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df515122519?w=600&auto=format&fit=crop&q=80'
    ],
    videoDuration: '03:45 mins',
    videoTitle: 'PWD Technical Explainer: Automated Highway Quality Audit & Edge AI Vision',
    targetBeneficiaries: [
      { title: 'Highway Commuters & Drivers', desc: 'Prevents vehicular damage, fatal monsoon accidents, and severe traffic delays.' },
      { title: 'PWD District Engineers', desc: 'Eliminates manual physical inspection contractors and subjective quality bias.' },
      { title: 'State Transport (MSRTC)', desc: 'Protects public bus suspension fleets and maintains schedule punctuality.' }
    ],
    whyNeeded: 'Manual road quality audits cover less than 12% of Maharashtra’s 3,00,000 km road network per year. Delayed pothole repairs during monsoon months lead to over 3,400 fatal accidents annually and severe state budget leakage.',
    urgencyLevel: 'CRITICAL',
    urgencyReason: 'Monsoon season deterioration requires automated continuous telemetry before major highway resurfacing tenders are finalized.',
    severityScore: 9.6,
    publicImpactMetrics: [
      { label: 'Accident Reduction', value: '45%', subtext: 'Target reduction in pothole-related monsoon fatalities' },
      { label: 'Audit Speedup', value: '18x Faster', subtext: 'Continuous coverage vs manual walking surveys' },
      { label: 'Public Budget Savings', value: '₹34 Cr', subtext: 'Annual savings in reactive road repair claims' }
    ],
    keywords: ['#ComputerVision', '#EdgeAI', '#PotholeDetection', '#SmartHighways', '#PWDTelemetry', '#GFRRule149', '#DPIITStartup'],
    kpiBenchmarks: [
      { metric: 'Detection Accuracy (mAP@0.5)', minTarget: '>= 92%', weightage: 35 },
      { metric: 'Inference Latency at 60 km/h', minTarget: '< 45 ms', weightage: 35 },
      { metric: 'Ruggedized Ingress Protection', minTarget: 'IP67 Rated', weightage: 30 }
    ]
  },
  {
    id: 'prob-102',
    deptId: 'dept-maha-agri',
    deptName: 'Department of Agriculture & Farmer Welfare, Maharashtra',
    title: 'Precision Micro-Drone Payload for Targeted Bio-Pesticide Spraying in Vidarbha',
    description: 'Autonomous micro-UAV system with multispectral pest detection to perform hyper-localized bio-pesticide misting on cotton and soybean crops, reducing chemical runoff and farmer intoxication.',
    sector: 'Agriculture & Allied',
    budgetCeiling: 7500000, // ₹75 Lakhs
    deadline: '2026-11-05',
    status: 'OPEN',
    eligibilityCriteria: 'DGCA type certified UAV frames OR joint venture between AgriTech software/AI startup and a DGCA-licensed drone manufacturer.',
    preferredMode: 'COLLABORATION_RECOMMENDED',
    postedDate: '2026-09-01',
    heroImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&auto=format&fit=crop&q=80'
    ],
    videoDuration: '04:12 mins',
    videoTitle: 'Agri Dept Challenge: Targeted Bio-Pesticide Payload & Drone Telemetry',
    targetBeneficiaries: [
      { title: 'Vidarbha & Marathwada Cotton Farmers', desc: 'Prevents chemical toxicity poisoning during manual knapsack spraying.' },
      { title: 'Gram Panchayat Agri Collectives', desc: 'Enables custom hiring service centers (CHC) with shared drone fleets.' },
      { title: 'Department Soil & Water Officers', desc: 'Reduces toxic chemical runoff into local drinking water reservoirs.' }
    ],
    whyNeeded: 'Traditional manual backpack spraying exposes over 4,00,000 smallholder farmers in Vidarbha to toxic organophosphate poisoning annually while wasting 65% of pesticides through indiscriminate overspray.',
    urgencyLevel: 'CRITICAL',
    urgencyReason: 'Seasonal Pink Bollworm infestations require precision localized misting within 48 hours of detection.',
    severityScore: 9.4,
    publicImpactMetrics: [
      { label: 'Pesticide Reduction', value: '70%', subtext: 'Target reduction in chemical volume through precision spot-misting' },
      { label: 'Crop Yield Increase', value: '+22%', subtext: 'Saved cotton bolls through early multispectral detection' },
      { label: 'Farmer Health Safety', value: 'Zero Exposure', subtext: '100% remote operator stand-off distance' }
    ],
    keywords: ['#AgriTech', '#DGCADrone', '#PrecisionSpraying', '#CottonFarming', '#VidarbhaAgri', '#BioPesticide', '#MultispectralAI'],
    kpiBenchmarks: [
      { metric: 'Flight Endurance with 10kg Payload', minTarget: '>= 25 mins', weightage: 40 },
      { metric: 'Spray Drift Reduction Efficiency', minTarget: '>= 80%', weightage: 35 },
      { metric: 'Auto-RTL on Low Battery/Signal Loss', minTarget: '100% Fail-safe', weightage: 25 }
    ]
  },
  {
    id: 'prob-103',
    deptId: 'dept-maha-health',
    deptName: 'Public Health Department, Maharashtra',
    title: 'Portable Non-Invasive HbA1c & Diabetic Retinopathy Screener for Rural PHCs',
    description: 'Affordable, battery-operated diagnostic device capable of rapid diabetes screening and retinal imaging at sub-district Primary Health Centres without requiring dilated pupil eye drops.',
    sector: 'MedTech & Public Health',
    budgetCeiling: 6000000, // ₹60 Lakhs
    deadline: '2026-10-30',
    status: 'OPEN',
    eligibilityCriteria: 'CDSCO compliant prototype. Solo startups with clinical trial data or consortium with medical hardware contract manufacturers.',
    preferredMode: 'SOLO_OR_COLLAB',
    postedDate: '2026-08-15',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80'
    ],
    videoDuration: '02:50 mins',
    videoTitle: 'Public Health Field Brief: Non-Invasive Diabetic Screener in Primary Health Centres',
    targetBeneficiaries: [
      { title: 'Rural Primary Health Patients', desc: 'Allows early diabetes & vision loss screening right in remote villages.' },
      { title: 'ASHA Workers & PHC Doctors', desc: 'Simple 1-tap operation requiring under 15 minutes of training.' },
      { title: 'State Non-Communicable Disease Cell', desc: 'Centralized registry mapping diabetic risk hotspots across 36 districts.' }
    ],
    whyNeeded: 'Over 68% of diabetic retinopathy cases in rural Maharashtra go undiagnosed until irreversible vision loss occurs, primarily due to lack of trained ophthalmologists and expensive diagnostic equipment at local PHCs.',
    urgencyLevel: 'HIGH',
    urgencyReason: 'Rapid rise in non-communicable diseases (NCD) in tribal and sub-district blocks requires immediate point-of-care screening.',
    severityScore: 9.1,
    publicImpactMetrics: [
      { label: 'Screening Cost', value: '₹40/Patient', subtext: 'Vs ₹1,200 at urban private diagnostic labs' },
      { label: 'Early Detection Rate', value: '4x Higher', subtext: 'Identifies asymptomatic retinopathy stage 1 & 2' },
      { label: 'PHC Coverage Target', value: '1,800 PHCs', subtext: 'Turnkey deployment across rural health centers' }
    ],
    keywords: ['#MedTech', '#DiabeticRetinopathy', '#NonInvasiveDiagnostics', '#CDSCOApproved', '#RuralPHC', '#ASHAWorkers', '#PublicHealthAI'],
    kpiBenchmarks: [
      { metric: 'Clinical Sensitivity & Specificity', minTarget: '>= 95%', weightage: 50 },
      { metric: 'Test Duration per Patient', minTarget: '< 3 minutes', weightage: 30 },
      { metric: 'Battery Standby on Single Charge', minTarget: '>= 8 hours', weightage: 20 }
    ]
  },
  {
    id: 'prob-104',
    deptId: 'dept-maha-water',
    deptName: 'Water Resources & Sanitation Dept, Govt of Maharashtra',
    title: 'LoRaWAN Smart Acoustic Sensor for Drinking Water Pipeline Leakage Localization',
    description: 'Non-destructive acoustic listening sensors placed along municipal water supply lines to identify underground pinhole fractures and non-revenue water (NRW) losses.',
    sector: 'Clean Energy & Water',
    budgetCeiling: 3800000, // ₹38 Lakhs
    deadline: '2026-09-28',
    status: 'PILOTING',
    eligibilityCriteria: 'Open to eligible startups. Hardware must have BIS/CE certification.',
    preferredMode: 'SOLO_OR_COLLAB',
    postedDate: '2026-07-10',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?w=600&auto=format&fit=crop&q=80'
    ],
    videoDuration: '03:15 mins',
    videoTitle: 'Water Resources Dept: Acoustic Pipeline Leak Detection & NRW Loss Mitigation',
    targetBeneficiaries: [
      { title: 'Municipal Water Corporations', desc: 'Recovers up to 38% non-revenue water lost to hidden underground leaks.' },
      { title: 'Urban & Peri-Urban Citizens', desc: 'Ensures consistent water pressure and prevents sewage contamination into pipelines.' },
      { title: 'State Jal Jeevan Mission', desc: 'Protects last-mile clean drinking water infrastructure.' }
    ],
    whyNeeded: 'Major cities in Maharashtra lose between 30% to 42% of treated potable drinking water through unregistered underground pipe bursts and pinhole fractures before reaching household taps.',
    urgencyLevel: 'HIGH',
    urgencyReason: 'Summer water scarcity and reservoir depletion demand instant pinpointing of NRW distribution losses.',
    severityScore: 8.8,
    publicImpactMetrics: [
      { label: 'Water Saved', value: '45 Million Liters/Day', subtext: 'Target recovery across pilot municipal zones' },
      { label: 'Leak Pinpoint Precision', value: '< 1.5 Meters', subtext: 'Eliminates digging up entire road stretches' },
      { label: 'Battery Lifespan', value: '5+ Years', subtext: 'Maintenance-free subterranean sensors' }
    ],
    keywords: ['#LoRaWAN', '#SmartWaterGrid', '#AcousticSensors', '#NRWLoss', '#JalJeevanMission', '#IoTTelemetry'],
    kpiBenchmarks: [
      { metric: 'Leak Localization Accuracy', minTarget: '<= 1.5 meters', weightage: 40 },
      { metric: 'LoRa Transmission Range in Dense Urban Area', minTarget: '>= 4 km', weightage: 35 },
      { metric: 'Sensor Battery Lifespan', minTarget: '>= 5 years', weightage: 25 }
    ]
  },
  {
    id: 'prob-105',
    deptId: 'dept-maha-transport',
    deptName: 'Maharashtra State Road Transport Corporation (MSRTC)',
    title: 'Driver Drowsiness & Blind-Spot Warning System for State Intercity Buses',
    description: 'Dual-camera cabin safety unit featuring infrared eye-tracking, head-nod detection, and real-time auditory warnings to eliminate night-time fatigue collisions on state expressways.',
    sector: 'Smart Mobility & Logistics',
    budgetCeiling: 9000000, // ₹90 Lakhs
    deadline: '2026-12-01',
    status: 'OPEN',
    eligibilityCriteria: 'AIS-140 compliance capability. High manufacturing capacity required (5,000+ units/year). Collaboration strongly recommended.',
    preferredMode: 'COLLABORATION_RECOMMENDED',
    postedDate: '2026-09-05',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&auto=format&fit=crop&q=80'
    ],
    videoDuration: '05:00 mins',
    videoTitle: 'MSRTC Safety Challenge: Infrared Eye-Tracking & Blind Spot Collision Avoidance',
    targetBeneficiaries: [
      { title: 'MSRTC Bus Passengers', desc: 'Protects millions of night-time intercity bus passengers traveling across Maharashtra.' },
      { title: 'Long-Distance State Drivers', desc: 'Provides instant haptic and acoustic alerts during microsleep episodes.' },
      { title: 'Depot Fleet Control Managers', desc: 'Telemetry dashboard flagging high-risk fatigue drivers for mandatory rest schedules.' }
    ],
    whyNeeded: 'Over 62% of major night-time accidents involving state transport buses on the Mumbai-Nagpur Samruddhi Expressway and NH-48 stem from driver fatigue and microsleep between 2:00 AM and 5:00 AM.',
    urgencyLevel: 'CRITICAL',
    urgencyReason: 'High express highway speeds require zero-delay cabin safety intervention.',
    severityScore: 9.8,
    publicImpactMetrics: [
      { label: 'Fatigue Collision Reduction', value: '85%', subtext: 'Prevented night-time highway crashes' },
      { label: 'Alert Trigger Speed', value: '< 1.2 Seconds', subtext: 'Instant acoustic & seat vibration warning' },
      { label: 'MSRTC Fleet Target', value: '16,000 Buses', subtext: 'Full state transport fleet retrofit' }
    ],
    keywords: ['#AIS140', '#DriverSafety', '#InfraredEyeTracking', '#MicrosleepAlert', '#MSRTCFleet', '#SamruddhiExpressway'],
    kpiBenchmarks: [
      { metric: 'Microsleep Detection Rate (<1.2s closure)', minTarget: '>= 98%', weightage: 45 },
      { metric: 'False Positive Trigger Rate', minTarget: '< 2 per 500 km', weightage: 30 },
      { metric: 'AIS-140 Automotive Spec Compliance', minTarget: '100%', weightage: 25 }
    ]
  }
];

export const CURRENT_STARTUP: Startup = {
  id: 'startup-drishti',
  companyName: 'Drishti Edge Technologies Pvt Ltd',
  dpiitCertNo: 'DIPP-MH-2023-98442',
  annualTurnover: 3500000, // ₹35 Lakhs (too small for solo standard tender, but ideal for collab!)
  foundingYear: 2022,
  techDomains: ['Computer Vision', 'Deep Learning', 'Edge AI', 'IoT Telemetry'],
  contactPerson: 'Aarav Deshmukh (Founder & CTO)',
  contactEmail: 'aarav@drishtiedge.in',
  activePilotsCount: 2
};

export const MANUFACTURERS: Manufacturer[] = [
  {
    id: 'mfr-godrej-eng',
    companyName: 'Sahyadri Precision Electronics & Assemblies Ltd',
    gstNumber: '27AABCS1429B1Z4',
    annualTurnover: 680000000, // ₹68 Crores (Clears any Govt tender turnover bar easily)
    manufacturingCapacityUnits: 50000,
    openToCollaborate: true,
    facilitiesSectors: ['Automotive Electronics', 'Embedded Edge Hardware', 'SMT Assembly', 'IP67 Enclosures'],
    contactPerson: 'Rajesh Kulkarni (VP Government Alliances)',
    contactEmail: 'alliances@sahyadripres.com',
    activeConsortiumsCount: 4,
    rating: 4.9
  },
  {
    id: 'mfr-mahindra-aero',
    companyName: 'Bharat Drone Systems & Composite Fab',
    gstNumber: '27AAECB9981K1ZP',
    annualTurnover: 420000000, // ₹42 Crores
    manufacturingCapacityUnits: 12000,
    openToCollaborate: true,
    facilitiesSectors: ['Carbon Fiber Fabrication', 'DGCA Drone Airframes', 'Agricultural Payloads'],
    contactPerson: 'Sunil Patil (Head of Production)',
    contactEmail: 'spatil@bharatdronesys.com',
    activeConsortiumsCount: 2,
    rating: 4.8
  },
  {
    id: 'mfr-pune-optics',
    companyName: 'Pratham MedTech Devices Corp',
    gstNumber: '27AACCP7721N1ZM',
    annualTurnover: 280000000, // ₹28 Crores
    manufacturingCapacityUnits: 25000,
    openToCollaborate: true,
    facilitiesSectors: ['Optical Sensors', 'ISO-13485 Cleanroom', 'Medical Diagnostics Assembly'],
    contactPerson: 'Dr. Meera Joshi (Compliance Director)',
    contactEmail: 'meera.joshi@pratham-med.com',
    activeConsortiumsCount: 3,
    rating: 4.7
  },
  {
    id: 'mfr-tata-telecom',
    companyName: 'Western IoT Instrumentation Works',
    gstNumber: '27AABCT3312Q1ZX',
    annualTurnover: 190000000, // ₹19 Crores
    manufacturingCapacityUnits: 80000,
    openToCollaborate: false, // Currently at capacity
    facilitiesSectors: ['LoRa & NB-IoT Gateways', 'Acoustic Transducers', 'Water Metering'],
    contactPerson: 'Vikas Shinde',
    contactEmail: 'vikas@westerniot.in',
    activeConsortiumsCount: 1,
    rating: 4.5
  }
];

export const INITIAL_COLLABORATIONS: Collaboration[] = [
  {
    id: 'collab-201',
    startupId: 'startup-drishti',
    startupName: 'Drishti Edge Technologies Pvt Ltd',
    manufacturerId: 'mfr-godrej-eng',
    manufacturerName: 'Sahyadri Precision Electronics & Assemblies Ltd',
    problemId: 'prob-101',
    problemTitle: 'AI-Powered Computer Vision for Automated Pothole & Road Quality Indexing',
    roleSplit: 'Startup: Neural network models, edge inference firmware & GIS mapping portal. Manufacturer: Automotive-grade IP67 camera housing, vibration damping mounts, SMT board assembly & field warranty.',
    status: 'ACTIVE',
    agreedAt: '2026-08-25T14:30:00Z',
    ndaContract: {
      id: 'nda-881',
      collaborationId: 'collab-201',
      ipProtectionClauses: 'Startup retains exclusive 100% ownership of AI computer vision algorithm weights, training datasets, and web dashboard IP. Manufacturer receives non-exclusive right to manufacture housing and hardware modules for public sector tenders.',
      commercialTerms: 'Turnover qualification leveraged: ₹68 Cr (Sahyadri). Revenue split: 60% Startup (Software & IP licensing), 40% Manufacturer (Hardware production & maintenance).',
      documentHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      startupSignedAt: '2026-08-25T15:00:00Z',
      manufacturerSignedAt: '2026-08-25T16:15:00Z',
      legalStatus: 'EXECUTED'
    }
  }
];

export const INITIAL_PILOTS: Pilot[] = [
  {
    id: 'pilot-301',
    applicationId: 'app-901',
    problemTitle: 'LoRaWAN Smart Acoustic Sensor for Drinking Water Pipeline Leakage Localization',
    applicantName: 'AquaPulse Sensing Technologies (Solo Startup)',
    isCollab: false,
    sandboxEnvironment: 'Pune Municipal Corporation - Baner Ward Sector 4 Feeder Network',
    startDate: '2026-07-20',
    endDate: '2026-08-30',
    aggregateScore: 94,
    status: 'PASSED',
    evaluatorRemarks: 'Exceeded leak detection precision expectations. Detected 3 hairline fractures under concrete roadway with 0.8m accuracy. Recommended for direct GFR-149 auto-procurement.',
    scorecards: [
      { metric: 'Leak Localization Accuracy', target: '<= 1.5 meters', achieved: '0.8 meters', score: 98, passed: true },
      { metric: 'LoRa Transmission Range', target: '>= 4 km', achieved: '4.8 km in dense city', score: 92, passed: true },
      { metric: 'False Alarm Rate', target: '< 5%', achieved: '1.2%', score: 95, passed: true }
    ]
  },
  {
    id: 'pilot-302',
    applicationId: 'app-902',
    problemTitle: 'AI-Powered Computer Vision for Automated Pothole & Road Quality Indexing',
    applicantName: 'Drishti Edge Technologies + Sahyadri Electronics (Consortium)',
    isCollab: true,
    sandboxEnvironment: 'PWD Maharashtra - Mumbai-Goa Highway (NH-66) Trial Corridor (50 km)',
    startDate: '2026-09-01',
    endDate: '2026-09-25',
    aggregateScore: 89,
    status: 'RUNNING',
    evaluatorRemarks: 'Camera housing sustained heavy monsoon downpours without condensation. Neural net successfully logged 1,420 road surface defects with centimeter GPS precision.',
    scorecards: [
      { metric: 'Detection Accuracy (mAP)', target: '>= 92%', achieved: '94.2%', score: 94, passed: true },
      { metric: 'Inference Latency at 60 km/h', target: '< 45 ms', achieved: '38 ms on Jetson Orin', score: 90, passed: true },
      { metric: 'IP67 Environmental Seal Under Heavy Rain', target: 'Zero ingress', achieved: 'Passed 100%', score: 85, passed: true }
    ]
  },
  {
    id: 'pilot-303',
    applicationId: 'app-903',
    problemTitle: 'Portable Non-Invasive HbA1c & Diabetic Retinopathy Screener for Rural PHCs',
    applicantName: 'CivicGrid Analytics',
    isCollab: false,
    sandboxEnvironment: 'Public Health Department - Satara Rural PHC Network',
    startDate: '2026-08-04',
    endDate: '2026-09-10',
    aggregateScore: 86,
    status: 'PASSED',
    evaluatorRemarks: 'Completed supervised field evaluation with consistent screening accuracy and acceptable per-patient test duration. Awaiting procurement order.',
    scorecards: [
      { metric: 'Clinical Sensitivity & Specificity', target: '>= 95%', achieved: '96.1%', score: 88, passed: true },
      { metric: 'Test Duration per Patient', target: '< 3 minutes', achieved: '2.4 minutes', score: 84, passed: true },
      { metric: 'Battery Standby on Single Charge', target: '>= 8 hours', achieved: '9.2 hours', score: 86, passed: true }
    ]
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-901',
    problemId: 'prob-104',
    type: 'SOLO',
    startupId: 'startup-aquapulse',
    applicantName: 'AquaPulse Sensing Technologies',
    proposalSummary: 'Acoustic sensing and LoRaWAN network for precision leak localization.',
    bidAmount: 3650000,
    status: 'PILOT_APPROVED',
    submittedAt: '2026-07-12'
  },
  {
    id: 'app-902',
    problemId: 'prob-101',
    type: 'COLLABORATION',
    startupId: 'startup-drishti',
    applicantName: 'Drishti Edge Technologies + Sahyadri Electronics',
    proposalSummary: 'Edge vision stack with ruggedized hardware for road defect indexing.',
    bidAmount: 3800000,
    status: 'PILOT_APPROVED',
    submittedAt: '2026-08-26'
  },
  {
    id: 'app-903',
    problemId: 'prob-103',
    type: 'SOLO',
    startupId: 'startup-civicgrid',
    applicantName: 'CivicGrid Analytics',
    proposalSummary: 'Portable screening workflow for rural primary health centres.',
    bidAmount: 5200000,
    status: 'PILOT_APPROVED',
    submittedAt: '2026-07-28'
  }
];

export const INITIAL_PROCUREMENTS: Procurement[] = [
  {
    id: 'proc-401',
    pilotId: 'pilot-301',
    problemTitle: 'LoRaWAN Smart Acoustic Sensor for Drinking Water Pipeline Leakage Localization',
    vendorName: 'AquaPulse Sensing Technologies',
    poNumber: 'MAHA-GOV-PO-2026-00389',
    finalPoValue: 3650000, // ₹36.5 Lakhs
    gfrRuleReference: 'GFR-2017 Rule 149 / Maharashtra State Startup Policy Sec 4.2 (Prior Experience & Turnover Waived)',
    deliveryTimelineWeeks: 6,
    issuedAt: '2026-09-02',
    adoptionsCount: 3,
    status: 'COMPLETED'
  }
];

export const INITIAL_SCALE_ADOPTIONS: ScaleAdoption[] = [
  {
    id: 'scale-501',
    procurementId: 'proc-401',
    originalDeptName: 'Water Resources & Sanitation Dept, Govt of Maharashtra',
    solutionTitle: 'LoRaWAN Smart Acoustic Pipeline Leakage System',
    vendorName: 'AquaPulse Sensing Technologies',
    adoptingDeptName: 'Nagpur Municipal Corporation (Water Distribution Dept)',
    adoptedOn: '2026-09-05',
    addonContractValue: 2800000, // ₹28 Lakhs
    deploymentLocation: 'Nagpur East Feeder Zone 2'
  },
  {
    id: 'scale-502',
    procurementId: 'proc-401',
    originalDeptName: 'Water Resources & Sanitation Dept, Govt of Maharashtra',
    solutionTitle: 'LoRaWAN Smart Acoustic Pipeline Leakage System',
    vendorName: 'AquaPulse Sensing Technologies',
    adoptingDeptName: 'Nashik Smart City Development Corp (NMSCDCL)',
    adoptedOn: '2026-09-07',
    addonContractValue: 3100000, // ₹31 Lakhs
    deploymentLocation: 'Godavari Riverbank Municipal Supply Pipeline'
  }
];
