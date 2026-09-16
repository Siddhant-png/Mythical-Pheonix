import React, { useMemo, useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

interface StartupDiscoveryHubProps {
  onOpenStartupProfile?: (startupId: string) => void;
}

export const StartupDiscoveryHub: React.FC<StartupDiscoveryHubProps> = ({
  onOpenStartupProfile
}) => {
  // Startup Discovery search & filter state
  const [discoverySearch, setDiscoverySearch] = useState('');
  const [discoverySector, setDiscoverySector] = useState('all');
  const [discoveryStage, setDiscoveryStage] = useState('all');
  const [selectedStartup, setSelectedStartup] = useState<any | null>(null);

  // Local demo data for the Startup Discovery panel.
  const [discoveryStartups] = useState([
    { id: 'startup-1', name: 'Drishti Edge Technologies Pvt Ltd', sector: 'AI & Computer Vision', stage: 'Growth', location: 'Pune, Maharashtra', dpiitVerified: true, description: 'Edge AI and computer vision solutions for infrastructure inspection and public-sector deployments.', upvotes: 1250, tags: ['Edge AI', 'Computer Vision', 'IoT'] },
    { id: 'startup-2', name: 'AquaPulse Sensing Technologies', sector: 'CleanTech', stage: 'Early', location: 'Mumbai, Maharashtra', dpiitVerified: true, description: 'Smart acoustic sensing and LoRaWAN technology for detecting water pipeline leakage.', upvotes: 840, tags: ['LoRaWAN', 'Smart Sensors', 'Water'] },
    { id: 'startup-3', name: 'CivicGrid Analytics', sector: 'GovTech', stage: 'Growth', location: 'Nagpur, Maharashtra', dpiitVerified: false, description: 'Data analytics and citizen feedback tools for improving municipal service delivery.', upvotes: 420, tags: ['Analytics', 'CivicTech', 'Dashboards'] },
    { id: 'startup-4', name: 'GreenRoute Mobility', sector: 'CleanTech', stage: 'Early', location: 'Nashik, Maharashtra', dpiitVerified: true, description: 'Fleet optimization and charging intelligence for electric public transportation.', upvotes: 180, tags: ['EV', 'Mobility', 'Optimization'] }
  ]);

  const filteredStartups = useMemo(() => discoveryStartups.filter((startup) => {
    const search = discoverySearch.toLowerCase();
    const matchesSearch = !search || `${startup.name} ${startup.sector} ${startup.location} ${startup.tags.join(' ')}`.toLowerCase().includes(search);
    const matchesSector = discoverySector === 'all' || startup.sector === discoverySector;
    const matchesStage = discoveryStage === 'all' || startup.stage === discoveryStage;
    return matchesSearch && matchesSector && matchesStage;
  }), [discoverySearch, discoverySector, discoveryStage, discoveryStartups]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 font-body pb-12 select-none">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Startup directory</span>
            <h3 className="text-xl font-extrabold text-slate-900">Discover & Screen Startups</h3>
            <p className="text-xs text-slate-500 mt-1">Search verified and emerging startups by sector and stage.</p>
          </div>
          <div className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">{filteredStartups.length} startups found</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input value={discoverySearch} onChange={(e) => setDiscoverySearch(e.target.value)} placeholder="Search startups, sectors..." className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-slate-400" />
          </div>
          <select value={discoverySector} onChange={(e) => setDiscoverySector(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs">
            <option value="all">All sectors</option>
            <option value="AI & Computer Vision">AI & Computer Vision</option>
            <option value="CleanTech">CleanTech</option>
            <option value="GovTech">GovTech</option>
          </select>
          <select value={discoveryStage} onChange={(e) => setDiscoveryStage(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs">
            <option value="all">All stages</option>
            <option value="Early">Early stage</option>
            <option value="Growth">Growth stage</option>
          </select>
        </div>

        {filteredStartups.length === 0 ? (
          <div className="text-center py-12 text-sm text-slate-500">No startups match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStartups.map((startup) => {
              return (
                <div
                  key={startup.id}
                  onClick={() => onOpenStartupProfile?.(startup.id)}
                  className="group relative cursor-pointer rounded-xl border border-slate-200 bg-white p-4 sm:p-5 font-body hover:border-slate-400"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <span className="truncate font-bold text-sm text-slate-900 group-hover:text-slate-950">
                      {startup.name}
                    </span>
                    <span className="shrink-0 text-[10px] text-slate-500 font-mono">
                      {startup.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {startup.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span className="text-[11px] text-slate-400">
                      {startup.dpiitVerified ? 'DPIIT Verified' : 'Standard'} · {startup.stage}
                    </span>

                    <span className="font-semibold text-slate-700 group-hover:text-slate-950 flex items-center gap-1 text-[11px]">
                      View Profile
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedStartup && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Startup profile</span>
              <h3 className="text-xl font-extrabold mt-1">{selectedStartup.name}</h3>
            </div>
            <button onClick={() => setSelectedStartup(null)} aria-label="Close profile">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-slate-300 mt-3">{selectedStartup.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {[
              ['Sector', selectedStartup.sector], 
              ['Stage', selectedStartup.stage], 
              ['Location', selectedStartup.location], 
              ['Upvotes', `${selectedStartup.upvotes}`]
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-white/10 p-3">
                <span className="block text-[10px] text-slate-400 uppercase font-bold">{label}</span>
                <span className="block text-xs font-bold mt-1">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
