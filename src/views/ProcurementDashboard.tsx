import React, { useMemo, useState } from 'react';
import { ChevronDown, FileCheck2, Search } from 'lucide-react';
import { Application, Pilot, Problem, Procurement, ProcurementStatus, ScaleAdoption, UserRole } from '../types';
import { calculateStartupTier, TIER_DEFINITIONS } from '../utils/tierProgress';
import { ProcurementDetails } from '../components/procurement/ProcurementDetails';
import { ProcurementRow, ProcurementTable } from '../components/procurement/ProcurementTable';
import { ProcurementSummaryCards } from '../components/procurement/ProcurementSummaryCards';
import { ProcurementCreationForm, ProcurementDraft } from '../components/procurement/ProcurementCreationForm';

interface ProcurementDashboardProps {
  problems: Problem[];
  applications: Application[];
  pilots: Pilot[];
  procurements: Procurement[];
  scaleAdoptions: ScaleAdoption[];
  userRole: UserRole;
  onCreateProcurement: (draft: ProcurementDraft) => void;
  onUpdateProcurementStatus: (procurementId: string, status: ProcurementStatus) => void;
}

type SortBy = 'value' | 'date' | 'adoptions';

export const ProcurementDashboard: React.FC<ProcurementDashboardProps> = ({ problems, applications, pilots, procurements, scaleAdoptions, userRole, onCreateProcurement, onUpdateProcurementStatus }) => {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | ProcurementStatus>('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [tierFilter, setTierFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [selectedId, setSelectedId] = useState<string | undefined>(procurements[0]?.id);

  const rows = useMemo<ProcurementRow[]>(() => procurements.map(procurement => {
    const pilot = pilots.find(item => item.id === procurement.pilotId);
    const application = pilot ? applications.find(item => item.id === pilot.applicationId) : undefined;
    const problem = problems.find(item => item.title === procurement.problemTitle);
    const adoptions = scaleAdoptions.filter(item => item.procurementId === procurement.id);
    const status = procurement.status || (adoptions.length > 0 ? 'COMPLETED' : 'ACTIVE');
    const tier = calculateStartupTier(application, pilot, procurement, adoptions);
    return { procurement, department: problem?.deptName || 'Department not linked', sector: problem?.sector || 'Sector not linked', status, tier: tier.currentTier, adoptionCount: adoptions.length || procurement.adoptionsCount };
  }), [applications, pilots, procurements, problems, scaleAdoptions]);

  const filteredRows = useMemo(() => rows.filter(row => {
    const searchText = `${row.procurement.id} ${row.procurement.poNumber} ${row.procurement.vendorName} ${row.procurement.problemTitle}`.toLowerCase();
    const tierLevel = TIER_DEFINITIONS.find(definition => definition.tier === row.tier)?.level.toString();
    return searchText.includes(query.toLowerCase()) && (statusFilter === 'ALL' || row.status === statusFilter) && (departmentFilter === 'ALL' || row.department === departmentFilter) && (sectorFilter === 'ALL' || row.sector === sectorFilter) && (tierFilter === 'ALL' || tierLevel === tierFilter);
  }).sort((left, right) => {
    if (sortBy === 'value') return right.procurement.finalPoValue - left.procurement.finalPoValue;
    if (sortBy === 'adoptions') return right.adoptionCount - left.adoptionCount;
    return right.procurement.issuedAt.localeCompare(left.procurement.issuedAt);
  }), [departmentFilter, query, rows, sectorFilter, sortBy, statusFilter, tierFilter]);

  const selectedRow = rows.find(row => row.procurement.id === selectedId) || filteredRows[0];
  const selectedPilot = selectedRow ? pilots.find(item => item.id === selectedRow.procurement.pilotId) : undefined;
  const selectedApplication = selectedPilot ? applications.find(item => item.id === selectedPilot.applicationId) : undefined;
  const selectedAdoptions = selectedRow ? scaleAdoptions.filter(item => item.procurementId === selectedRow.procurement.id) : [];
  const selectedTierStatus = selectedRow ? calculateStartupTier(selectedApplication, selectedPilot, selectedRow.procurement, selectedAdoptions) : null;

  const departments = Array.from(new Set(rows.map(row => row.department)));
  const sectors = Array.from(new Set(rows.map(row => row.sector)));
  const totalValue = rows.reduce((sum, row) => sum + row.procurement.finalPoValue, 0);
  const activeOrders = rows.filter(row => row.status === 'ACTIVE' || row.status === 'PENDING_DELIVERY').length;
  const completedOrders = rows.filter(row => row.status === 'COMPLETED').length;
  const adoptedSolutions = rows.filter(row => row.adoptionCount > 0).length;
  const eligiblePilots = pilots.filter(pilot => pilot.status === 'PASSED' && pilot.aggregateScore >= 80);

  return (
    <div className="mx-auto max-w-7xl space-y-8 font-body">
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-slate-950 via-govblue-950 to-emerald-950 p-7 text-white shadow-[0_20px_60px_rgba(11,37,69,0.2)] sm:p-10"><div className="relative z-10 max-w-3xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-emerald-200"><FileCheck2 className="h-3.5 w-3.5" /> Public procurement command center</div><h2 className="max-w-2xl text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl">Every PO, one clear lifecycle.</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">Review sanctioned value, vendor delivery commitments, pilot evidence, and cross-department adoption from one government-ready workspace.</p></div></section>

      <ProcurementSummaryCards totalOrders={rows.length} totalValue={totalValue} activeOrders={activeOrders} completedOrders={completedOrders} adoptedSolutions={adoptedSolutions} />

      {userRole === 'dept' && <ProcurementCreationForm eligiblePilots={eligiblePilots} existingProcurementPilotIds={procurements.map(procurement => procurement.pilotId)} onCreate={onCreateProcurement} />}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="grid gap-3 md:grid-cols-[1.5fr_repeat(4,1fr)]"><div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search PO, vendor, problem, or procurement ID" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-govblue-500 focus:ring-2 focus:ring-govblue-100" /></div><FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter} options={['ALL', 'ACTIVE', 'COMPLETED', 'PENDING_DELIVERY']} /><FilterSelect label="Department" value={departmentFilter} onChange={setDepartmentFilter} options={['ALL', ...departments]} /><FilterSelect label="Sector" value={sectorFilter} onChange={setSectorFilter} options={['ALL', ...sectors]} /><FilterSelect label="Tier" value={tierFilter} onChange={setTierFilter} options={['ALL', ...TIER_DEFINITIONS.map(definition => `${definition.level}`)]} /></div><div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3"><span className="text-xs font-bold text-slate-500">Showing {filteredRows.length} of {rows.length} procurement orders</span><label className="inline-flex items-center gap-2 text-xs font-bold text-slate-600">Sort by<select value={sortBy} onChange={event => setSortBy(event.target.value as SortBy)} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs"><option value="date">Issue date</option><option value="value">PO value</option><option value="adoptions">Adoption count</option></select></label></div></section>

      {filteredRows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <FileCheck2 className="mx-auto h-9 w-9 text-slate-300" />
          <h3 className="mt-3 font-bold text-slate-800">No procurement orders found</h3>
          <p className="mt-1 text-xs text-slate-500">Try clearing a filter or search term to see more lifecycle records.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <ProcurementTable rows={filteredRows} selectedId={selectedRow?.procurement.id} onSelect={row => setSelectedId(row.procurement.id)} sortBy={sortBy} onSort={setSortBy} />
          </div>
          {selectedRow && selectedTierStatus && (
            <div className="xl:col-span-5">
              <ProcurementDetails procurement={selectedRow.procurement} pilot={selectedPilot} application={selectedApplication} adoptions={selectedAdoptions} tierStatus={selectedTierStatus} department={selectedRow.department} sector={selectedRow.sector} status={selectedRow.status} userRole={userRole} onUpdateStatus={onUpdateProcurementStatus} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const FilterSelect = ({ label, value, onChange, options }: { label: string; value: string; onChange: (value: any) => void; options: string[] }) => <label className="relative block"><span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</span><select value={value} onChange={event => onChange(event.target.value)} className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-8 text-xs font-bold text-slate-700 outline-none focus:border-govblue-500"><option value="ALL">All {label.toLowerCase()}s</option>{options.filter(option => option !== 'ALL').map(option => <option key={option} value={option}>{label === 'Tier' ? `Tier ${option}` : option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2.5 top-7 h-3.5 w-3.5 text-slate-400" /></label>;