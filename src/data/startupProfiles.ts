import { StartupProfileData } from '../types';

export const STARTUP_PROFILES: StartupProfileData[] = [
  {
    id: 'drishti-edge',
    companyName: 'Drishti Edge Technologies Pvt Ltd',
    handle: '@drishtiedge',
    tagline: 'Pothole intelligence for public roads, powered by edge AI.',
    bio: 'We build computer vision systems that turn road inspections, maintenance planning, and public infrastructure monitoring into real-time operational intelligence for Indian cities.',
    location: 'Pune, Maharashtra',
    foundedYear: 2022,
    dpiitCertNo: 'DIPP-MH-2023-98442',
    isDpiitVerified: true,
    bannerTheme: 'govblue',
    avatarInitials: 'DE',
    website: 'https://drishtiedge.in',
    linkedin: 'https://linkedin.com/company/drishtiedge',
    twitter: 'https://x.com/drishtiedge',
    email: 'aarav@drishtiedge.in',
    techDomains: ['Computer Vision', 'Edge AI', 'IoT', 'GIS', 'Deep Learning'],
    stats: {
      activePilots: 2,
      consortiums: 4,
      poWins: 3,
      scaleAdoptions: 6,
      readinessScore: 94
    },
    highlights: [
      { id: 'd1', label: 'DPIIT Verified', type: 'DPIIT' },
      { id: 'd2', label: 'Pilot Passed', type: 'PILOT_PASSED' },
      { id: 'd3', label: 'PO Won', type: 'PO_WON' },
      { id: 'd4', label: 'Consortium Ready', type: 'CONSORTIUM' }
    ],
    pinnedWins: [
      {
        id: 'w1',
        title: 'NH-66 Road Defect Monitoring Pilot',
        subtitle: 'PWD Maharashtra',
        category: 'PILOT',
        statLabel: 'Avg. recall',
        statValue: '94.2%',
        deptName: 'Public Works Department',
        date: '2026-09-12',
        accentColor: 'emerald'
      },
      {
        id: 'w2',
        title: 'Mumbai Metropolitan Road Safety PO',
        subtitle: 'Procurement automation',
        category: 'PROCUREMENT',
        statLabel: 'PO value',
        statValue: '₹38L',
        deptName: 'Maharashtra State Road Development',
        date: '2026-08-28',
        accentColor: 'amber'
      },
      {
        id: 'w3',
        title: 'Urban Mobility Scale-Out',
        subtitle: 'Nagpur city adoption',
        category: 'SCALE_ADOPTION',
        statLabel: 'Deployments',
        statValue: '12 Corridors',
        deptName: 'Nagpur Smart City',
        date: '2026-08-10',
        accentColor: 'sky'
      }
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-09-01',
        title: 'Field trial launched on NH-66',
        description: 'Completed 50 km pilot corridor deployment with 94.2% defect detection accuracy.',
        category: 'PILOT'
      },
      {
        id: 't2',
        date: '2026-08-18',
        title: 'Consortium with Sahyadri Electronics',
        description: 'Joint innovation model signed to prepare a larger tender-ready manufacturing stack.',
        category: 'CONSORTIUM'
      },
      {
        id: 't3',
        date: '2026-07-20',
        title: 'DPIIT verification approved',
        description: 'Startup recognition confirmed for public-sector innovation procurement eligibility.',
        category: 'CERT'
      },
      {
        id: 't4',
        date: '2026-06-06',
        title: 'Scale adoption in Nagpur',
        description: 'Machine vision platform expanded to municipal road asset analytics across 12 routes.',
        category: 'MILESTONE'
      }
    ],
    projects: [
      { id: 'dp1', title: 'RoadSight Edge', description: 'Edge AI platform that turns dashcam footage into geotagged road defect intelligence for public works teams.', technologies: ['Computer Vision', 'Jetson', 'GIS'], status: 'LIVE', demoUrl: 'https://drishtiedge.in', githubUrl: 'https://github.com/drishtiedge', isPinned: true },
      { id: 'dp2', title: 'Pothole Benchmark Lab', description: 'A reproducible evaluation workspace for comparing road-quality models across Maharashtra field conditions.', technologies: ['Python', 'Deep Learning', 'MLOps'], status: 'IN PILOT', githubUrl: 'https://github.com/drishtiedge', isPinned: true },
      { id: 'dp3', title: 'Corridor Command', description: 'Operations dashboard for prioritising maintenance actions across city road networks.', technologies: ['React', 'TypeScript', 'PostGIS'], status: 'IN DEVELOPMENT', isPinned: false }
    ],
    alliances: [
      {
        id: 'a1',
        partnerName: 'Sahyadri Precision Electronics',
        partnerType: 'Manufacturer',
        roleSplit: 'AI model + field analytics / Hardware stack & assembly',
        status: 'ACTIVE',
        since: '2026-08-20'
      },
      {
        id: 'a2',
        partnerName: 'Maharashtra Urban Data Lab',
        partnerType: 'Department',
        roleSplit: 'Public data feeds / Dashboard integration',
        status: 'NDA_PENDING',
        since: '2026-07-11'
      },
      {
        id: 'a3',
        partnerName: 'NexaGrid Systems',
        partnerType: 'Startup',
        roleSplit: 'Sensor calibration / Fleet analytics',
        status: 'COMPLETED',
        since: '2025-12-03'
      }
    ]
  },
  {
    id: 'aquapulse',
    companyName: 'AquaPulse Sensing Technologies',
    handle: '@aquapulse',
    tagline: 'Acoustic pipeline intelligence for water sustainability.',
    bio: 'We deploy smart acoustic sensing and LoRa networks to help civic departments detect hidden leaks, reduce non-revenue water, and prioritize resilient infrastructure upgrades.',
    location: 'Mumbai, Maharashtra',
    foundedYear: 2021,
    dpiitCertNo: 'DIPP-MH-2022-42115',
    isDpiitVerified: true,
    bannerTheme: 'emerald',
    avatarInitials: 'AQ',
    website: 'https://aquapulse.tech',
    linkedin: 'https://linkedin.com/company/aquapulse',
    twitter: 'https://x.com/aquapulse',
    email: 'hello@aquapulse.tech',
    techDomains: ['WaterTech', 'LoRaWAN', 'Acoustic Sensing', 'IoT', 'GIS'],
    stats: {
      activePilots: 3,
      consortiums: 2,
      poWins: 2,
      scaleAdoptions: 4,
      readinessScore: 91
    },
    highlights: [
      { id: 'a1', label: 'DPIIT Verified', type: 'DPIIT' },
      { id: 'a2', label: 'Leak Accuracy 0.8m', type: 'PILOT_PASSED' },
      { id: 'a3', label: 'Procurement Won', type: 'PO_WON' },
      { id: 'a4', label: 'Scale Replicated', type: 'SCALE' }
    ],
    pinnedWins: [
      {
        id: 'aw1',
        title: 'Nashik Water Loss Mapping',
        subtitle: 'Municipal pilot',
        category: 'PILOT',
        statLabel: 'Leak savings',
        statValue: '18%',
        deptName: 'Nashik Municipal Corporation',
        date: '2026-09-04',
        accentColor: 'sky'
      },
      {
        id: 'aw2',
        title: 'Maharashtra Smart Utility PO',
        subtitle: 'Procurement order',
        category: 'PROCUREMENT',
        statLabel: 'PO value',
        statValue: '₹36.5L',
        deptName: 'Water Resources Dept',
        date: '2026-09-02',
        accentColor: 'emerald'
      },
      {
        id: 'aw3',
        title: 'Nagpur City Expansion',
        subtitle: 'Scale adoption',
        category: 'SCALE_ADOPTION',
        statLabel: 'Zones',
        statValue: '7',
        deptName: 'Nagpur Municipal Corporation',
        date: '2026-08-29',
        accentColor: 'purple'
      }
    ],
    timeline: [
      {
        id: 'at1',
        date: '2026-09-05',
        title: 'Citywide scale deployment',
        description: 'Expanded monitoring to 7 municipal zones with autonomous leak alerts.',
        category: 'MILESTONE'
      },
      {
        id: 'at2',
        date: '2026-08-23',
        title: 'Procurement order approved',
        description: 'Signed direct procurement under Maharashtra startup policy provisions.',
        category: 'PROCUREMENT'
      },
      {
        id: 'at3',
        date: '2026-07-13',
        title: 'Pilot surpassed benchmark',
        description: 'Leak localization achieved 0.8m precision and 98% battery endurance across field trials.',
        category: 'PILOT'
      },
      {
        id: 'at4',
        date: '2026-05-07',
        title: 'DPIIT status confirmed',
        description: 'Recognition approved for start-up procurement readiness and GeM catalogs.',
        category: 'CERT'
      }
    ],
    projects: [
      { id: 'ap1', title: 'AquaWatch', description: 'Acoustic sensing network that locates hidden pipeline leaks and helps utilities reduce non-revenue water.', technologies: ['LoRaWAN', 'IoT', 'Acoustic Sensing'], status: 'LIVE', demoUrl: 'https://aquapulse.tech', isPinned: true },
      { id: 'ap2', title: 'Utility Twin', description: 'GIS workspace that combines sensor alerts, pipe age, and service zones for smarter renewal planning.', technologies: ['GIS', 'React', 'Data Analytics'], status: 'COMPLETED', githubUrl: 'https://github.com/aquapulse', isPinned: true }
    ],
    alliances: [
      {
        id: 'aa1',
        partnerName: 'Western IoT Instrumentation Works',
        partnerType: 'Manufacturer',
        roleSplit: 'Sensor packaging / hardware manufacturing',
        status: 'ACTIVE',
        since: '2026-06-10'
      },
      {
        id: 'aa2',
        partnerName: 'Pune Water Innovation Cell',
        partnerType: 'Department',
        roleSplit: 'Pilot access / public utility data',
        status: 'ACTIVE',
        since: '2026-03-19'
      }
    ]
  },
  {
    id: 'greenroute',
    companyName: 'GreenRoute Mobility',
    handle: '@greenroute',
    tagline: 'EV routing intelligence for resilient city mobility.',
    bio: 'We design fleet orchestration tools that improve EV charging, optimize route planning, and help municipal operators decarbonize public transportation systems.',
    location: 'Nashik, Maharashtra',
    foundedYear: 2020,
    dpiitCertNo: 'DIPP-MH-2020-87612',
    isDpiitVerified: true,
    bannerTheme: 'saffron',
    avatarInitials: 'GR',
    website: 'https://greenroute.in',
    linkedin: 'https://linkedin.com/company/greenroute',
    twitter: 'https://x.com/greenroute',
    email: 'contact@greenroute.in',
    techDomains: ['EV Fleet Ops', 'Optimization', 'Mobility AI', 'Telematics', 'Charging Intelligence'],
    stats: {
      activePilots: 2,
      consortiums: 3,
      poWins: 1,
      scaleAdoptions: 2,
      readinessScore: 88
    },
    highlights: [
      { id: 'g1', label: 'DPIIT Verified', type: 'DPIIT' },
      { id: 'g2', label: 'Fleet AI Platform', type: 'SCALE' },
      { id: 'g3', label: 'Consortium Lead', type: 'CONSORTIUM' },
      { id: 'g4', label: 'Pilot Passed', type: 'PILOT_PASSED' }
    ],
    pinnedWins: [
      {
        id: 'gw1',
        title: 'EV Bus Route Optimization',
        subtitle: 'Nashik municipal fleet',
        category: 'PILOT',
        statLabel: 'Energy saved',
        statValue: '21%',
        deptName: 'Nashik Transport Department',
        date: '2026-08-15',
        accentColor: 'amber'
      },
      {
        id: 'gw2',
        title: 'Green Mobility Consortium',
        subtitle: 'Multi-vendor network',
        category: 'CONSORTIUM',
        statLabel: 'Partners',
        statValue: '5',
        deptName: 'State EV Mission',
        date: '2026-07-08',
        accentColor: 'purple'
      },
      {
        id: 'gw3',
        title: 'Smart Charging Scale Trial',
        subtitle: 'District adoption',
        category: 'SCALE_ADOPTION',
        statLabel: 'Stations',
        statValue: '24',
        deptName: 'Maharashtra EV Cell',
        date: '2026-06-30',
        accentColor: 'emerald'
      }
    ],
    timeline: [
      {
        id: 'gt1',
        date: '2026-08-18',
        title: 'Fleet optimization pilot live',
        description: 'Optimized 28 bus routes and reduced charging time variability by 23%.',
        category: 'PILOT'
      },
      {
        id: 'gt2',
        date: '2026-07-04',
        title: 'Consortium signed with EV hardware partners',
        description: 'Built a multi-vendor public mobility stack for district-level deployment.',
        category: 'CONSORTIUM'
      },
      {
        id: 'gt3',
        date: '2026-05-11',
        title: 'DPIIT recognition renewed',
        description: 'Expanded eligibility for clean mobility pilots and state procurement pathways.',
        category: 'CERT'
      },
      {
        id: 'gt4',
        date: '2026-02-18',
        title: 'Pilot funded under green mobility mission',
        description: 'Received innovation funding to validate route optimization models in fleet operations.',
        category: 'FUNDING'
      }
    ],
    projects: [
      { id: 'gp1', title: 'RoutePilot EV', description: 'Fleet intelligence suite that coordinates EV routes, charging windows, and energy-aware dispatch.', technologies: ['Optimization', 'EV Fleet Ops', 'Telematics'], status: 'IN PILOT', demoUrl: 'https://greenroute.in', isPinned: true },
      { id: 'gp2', title: 'ChargeMap Maharashtra', description: 'Charging availability map for public mobility operators and district transport planners.', technologies: ['Mobility AI', 'Maps', 'TypeScript'], status: 'LIVE', isPinned: false }
    ],
    alliances: [
      {
        id: 'ga1',
        partnerName: 'VoltCore Battery Systems',
        partnerType: 'Manufacturer',
        roleSplit: 'Battery telemetry / charging controllers',
        status: 'ACTIVE',
        since: '2026-06-01'
      },
      {
        id: 'ga2',
        partnerName: 'Pune Electric Mobility Lab',
        partnerType: 'Department',
        roleSplit: 'Test lane access / regulatory validation',
        status: 'ACTIVE',
        since: '2026-04-18'
      },
      {
        id: 'ga3',
        partnerName: 'RouteGrid Analytics',
        partnerType: 'Startup',
        roleSplit: 'Route optimization / digital twin',
        status: 'COMPLETED',
        since: '2025-11-29'
      }
    ]
  }
];

export const DEFAULT_STARTUP_PROFILE = STARTUP_PROFILES[0];
