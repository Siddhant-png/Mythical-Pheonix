import { Problem, Startup, Manufacturer, Collaboration, Pilot, Procurement, ScaleAdoption } from '../types';

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
    adoptionsCount: 3
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
