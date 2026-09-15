import React, { useState } from 'react';
import { 
  Search, 
  Factory, 
  Building, 
  HeartPulse, 
  Cpu, 
  Sprout, 
  FlaskConical, 
  Radio, 
  Truck, 
  Microscope, 
  Droplets, 
  ShieldCheck, 
  Car, 
  Laptop, 
  Briefcase, 
  Recycle, 
  Users, 
  Compass, 
  ArrowRight,
  Sparkles,
  LayoutGrid,
  ChevronRight
} from 'lucide-react';

export interface CategoryItem {
  id: string;
  title: string;
  sectorName: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  subcategories: string[];
  activeOpportunities: number;
}

export const MAIN_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-machinery',
    title: 'Industrial Plants, Machinery & Equipment',
    sectorName: 'Smart Automation & AI',
    icon: Factory,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-100',
    subcategories: ['CNC Machining', 'SMT Assembly Lines', 'IP67 Metal Enclosures', 'Industrial Sensors'],
    activeOpportunities: 14
  },
  {
    id: 'cat-construction',
    title: 'Building Construction Material, Civil Engineering & Real Estate',
    sectorName: 'Smart Automation & AI',
    icon: Building,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    subcategories: ['Road Quality Indexing', 'Asphalt Quality Sensors', 'Pre-cast Concrete', 'Smart Scaffolding'],
    activeOpportunities: 18
  },
  {
    id: 'cat-medtech',
    title: 'Medical, Pharma, Surgical & Healthcare',
    sectorName: 'MedTech & Public Health',
    icon: HeartPulse,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-100',
    subcategories: ['Diabetic Retinopathy Screener', 'Portable ICU Units', 'ASHA Diagnostic Kits', 'CDSCO Approved MedTech'],
    activeOpportunities: 11
  },
  {
    id: 'cat-electronics',
    title: 'Electronics Components, Edge AI & Supplies',
    sectorName: 'Smart Automation & AI',
    icon: Cpu,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-100',
    subcategories: ['Jetson Orin Compute Modules', 'Vehicular Dashcams', 'Thermal Cameras', 'Embedded IoT Boards'],
    activeOpportunities: 15
  },
  {
    id: 'cat-agri',
    title: 'Fertilizers, Seeds, Agro Machines & Drone Payload Systems',
    sectorName: 'Agriculture & Allied',
    icon: Sprout,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    subcategories: ['DGCA Bio-Pesticide Drones', 'Multispectral Pest Detectors', 'Soil Telemetry IoT', 'Vidarbha Micro-Misters'],
    activeOpportunities: 8
  },
  {
    id: 'cat-chemicals',
    title: 'Chemicals, Dyes, Bio-Pesticides & Allied Products',
    sectorName: 'Agriculture & Allied',
    icon: FlaskConical,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
    subcategories: ['Organic Bio-Misting Solvents', 'Water Purification Reagents', 'Industrial Surfactants'],
    activeOpportunities: 6
  },
  {
    id: 'cat-telecom',
    title: 'Telecom Products, LoRaWAN Equipment & Wireless Supplies',
    sectorName: 'Clean Energy & Water',
    icon: Radio,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-100',
    subcategories: ['LoRaWAN Gateways', 'Subterranean Acoustic Sensors', '5G Edge Radios', 'NB-IoT Telemetry'],
    activeOpportunities: 9
  },
  {
    id: 'cat-logistics',
    title: 'Packers & Logistics, Clearing Agents & Transport Services',
    sectorName: 'Smart Mobility & Logistics',
    icon: Truck,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-100',
    subcategories: ['State Transport Fleet Retrofit', 'EV Battery Swapping', 'Highway Cargo Logistics'],
    activeOpportunities: 7
  },
  {
    id: 'cat-research',
    title: 'Research, Development, Testing & Laboratory Services',
    sectorName: 'Smart Automation & AI',
    icon: Microscope,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-100',
    subcategories: ['ISO-13485 Cleanroom Audits', 'AIS-140 Automotive Testing', 'Computer Vision Benchmark Labs'],
    activeOpportunities: 12
  },
  {
    id: 'cat-water',
    title: 'Clean Energy, Smart Water & Environmental Management',
    sectorName: 'Clean Energy & Water',
    icon: Droplets,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-100',
    subcategories: ['Non-Revenue Water Loss Detection', 'Solar Microgrids', 'Acoustic Pipe Leak Location'],
    activeOpportunities: 6
  },
  {
    id: 'cat-security',
    title: 'Security Devices, Safety Systems & Defense Supplies',
    sectorName: 'Disaster Management',
    icon: ShieldCheck,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-100',
    subcategories: ['Early Flood Warning Systems', 'Seismograph IoT Telemetry', 'Emergency Broadcast Radios'],
    activeOpportunities: 5
  },
  {
    id: 'cat-automotive',
    title: 'Automobiles, EV Fleet, Driver Cabin Safety & Spares',
    sectorName: 'Smart Mobility & Logistics',
    icon: Car,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-100',
    subcategories: ['Infrared Microsleep Warning', 'MSRTC Bus Safety Units', 'AIS-140 Fleet Telemetry'],
    activeOpportunities: 9
  },
  {
    id: 'cat-it',
    title: 'Computers, Software, IT Support & Cloud AI Solutions',
    sectorName: 'Smart Automation & AI',
    icon: Laptop,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    subcategories: ['GIS Highway Mapping Portals', 'GFR-149 Automated Procurement Engines', 'SHA-256 Legal Vaults'],
    activeOpportunities: 16
  },
  {
    id: 'cat-advisory',
    title: 'Financial, Legal & Business Advisory Services',
    sectorName: 'Smart Automation & AI',
    icon: Briefcase,
    color: 'text-slate-700',
    bgColor: 'bg-slate-100',
    borderColor: 'border-slate-200',
    subcategories: ['DPIIT Startup Exemption Filing', 'GFR Rule 149 Audit Advisory', 'Consortium M-NDA Legal Structure'],
    activeOpportunities: 10
  },
  {
    id: 'cat-architectural',
    title: 'Architectural & Designing Services',
    sectorName: 'Smart Automation & AI',
    icon: Compass,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-100',
    subcategories: ['Smart City Testbed Design', 'Urban Water Network Blueprinting', 'Highway Telemetry Layouts'],
    activeOpportunities: 4
  },
  {
    id: 'cat-hr',
    title: 'HR Consultants & Technical Placement Agencies',
    sectorName: 'Smart Automation & AI',
    icon: Users,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-100',
    subcategories: ['AI Engineers Sourcing', 'ASHA Health Worker Trainers', 'Drone Pilot Certification Training'],
    activeOpportunities: 5
  }
];

interface CategoryExplorerProps {
  onSelectCategory: (sectorName: string, searchQuery?: string) => void;
}

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({ onSelectCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = MAIN_CATEGORIES.filter((cat) => {
    const matchesTitle = cat.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = cat.sectorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSub = cat.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTitle || matchesSector || matchesSub;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-body pb-10">
      {/* Top Banner & Search Header (IndiaMART Style) */}
      <div className="bg-gradient-to-r from-govblue-950 via-slate-900 to-emerald-950 rounded-[24px] p-6 sm:p-8 text-white shadow-lg border border-govblue-700/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-saffron-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-saffron-300">
            <LayoutGrid className="w-3.5 h-3.5 text-saffron-400" />
            <span>IndiaMART-Inspired Master Category Index</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight text-white">
            Explore All Procurement & Industry Categories
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Browse verified industrial equipment, technology products, healthcare devices, and specialized services across Maharashtra government tenders and startup solutions.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl pt-2">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for Products, Services, Machinery, or Specs (e.g., Drone, AI, LoRaWAN)..."
                className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-semibold rounded-2xl border-2 border-white/30 shadow-lg focus:outline-none focus:ring-4 focus:ring-saffron-400/30 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 font-heading tracking-tight flex items-center space-x-2">
              <span>All Product & Service Sectors</span>
              <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                {filteredCategories.length} Categories
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any category card to view active government tenders & startup solutions
            </p>
          </div>
        </div>

        {/* 3-Column / 4-Column Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.sectorName, cat.title)}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-govblue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Category Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${cat.bgColor} ${cat.borderColor} border flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}>
                      <Icon className={`w-6 h-6 ${cat.color}`} />
                    </div>

                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-govblue-900 group-hover:text-white transition-colors duration-150">
                      {cat.activeOpportunities} Tenders
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-govblue-800 transition-colors line-clamp-2">
                      {cat.title}
                    </h4>
                    <span className="text-[10px] font-extrabold text-saffron-600 block mt-1 uppercase tracking-wider">
                      {cat.sectorName}
                    </span>
                  </div>

                  {/* Subcategories tags */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1">
                      {cat.subcategories.slice(0, 3).map((sub, i) => (
                        <span key={i} className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 font-medium px-2 py-0.5 rounded-md truncate max-w-full">
                          {sub}
                        </span>
                      ))}
                      {cat.subcategories.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-bold px-1 self-center">
                          +{cat.subcategories.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Explore Link */}
                <div className="mt-4 pt-2 flex items-center justify-between text-xs font-bold text-govblue-700 group-hover:text-govblue-900">
                  <span>Explore Opportunities</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
            <LayoutGrid className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-800 text-sm mt-3">No categories match your search term</h4>
            <p className="text-xs text-slate-500 mt-1">Try searching for keywords like "Drone", "AI", "Water", or "Pharma".</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-xs font-bold bg-govblue-900 text-white px-4 py-2 rounded-xl"
            >
              Clear Search Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
