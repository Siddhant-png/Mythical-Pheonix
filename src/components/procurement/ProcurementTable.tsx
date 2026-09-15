import React from 'react';
import { ArrowDownUp, Building2, CalendarDays, IndianRupee } from 'lucide-react';
import { Procurement, ProcurementStatus, StartupTier } from '../../types';
import { formatINRMoney } from '../../utils/format';
import { ProcurementStatusBadge } from './ProcurementStatusBadge';

export interface ProcurementRow {
  procurement: Procurement;
  department: string;
  sector: string;
  status: ProcurementStatus;
  tier: StartupTier | null;
  adoptionCount: number;
}

interface ProcurementTableProps {
  rows: ProcurementRow[];
  selectedId?: string;
  onSelect: (row: ProcurementRow) => void;
  sortBy: 'value' | 'date' | 'adoptions';
  onSort: (sortBy: 'value' | 'date' | 'adoptions') => void;
}

export const ProcurementTable: React.FC<ProcurementTableProps> = ({ rows, selectedId, onSelect, sortBy, onSort }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full text-left">
        <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-3 py-3">Procurement</th>
            <th className="px-3 py-3">Vendor / Problem</th>
            <th className="px-3 py-3">
              <button type="button" onClick={() => onSort('value')} className="inline-flex items-center gap-1 hover:text-slate-900">
                PO Value <ArrowDownUp className="h-3 w-3" />
              </button>
            </th>
            <th className="px-3 py-3">GFR / Timeline</th>
            <th className="px-3 py-3">
              <button type="button" onClick={() => onSort('date')} className="inline-flex items-center gap-1 hover:text-slate-900">
                Issued <ArrowDownUp className="h-3 w-3" />
              </button>
            </th>
            <th className="px-3 py-3 text-center">
              <button type="button" onClick={() => onSort('adoptions')} className="inline-flex items-center gap-1 hover:text-slate-900">
                Adoptions <ArrowDownUp className="h-3 w-3" />
              </button>
            </th>
            <th className="px-3 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map(row => (
            <tr
              key={row.procurement.id}
              onClick={() => onSelect(row)}
              className={`cursor-pointer transition hover:bg-slate-50/80 ${selectedId === row.procurement.id ? 'bg-govblue-50/80 font-semibold' : ''}`}
            >
              <td className="px-3 py-3">
                <span className="font-mono text-xs font-black text-slate-900">{row.procurement.id}</span>
                <span className="mt-0.5 block text-[10px] text-slate-500 font-medium">{row.procurement.poNumber}</span>
              </td>
              <td className="max-w-[200px] px-3 py-3">
                <span className="block truncate text-xs font-bold text-slate-900">{row.procurement.vendorName}</span>
                <span className="mt-0.5 block truncate text-[11px] text-slate-500">{row.procurement.problemTitle}</span>
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-xs font-black text-slate-900">
                {formatINRMoney(row.procurement.finalPoValue)}
              </td>
              <td className="max-w-[140px] px-3 py-3">
                <span className="block truncate text-[11px] text-slate-600 font-medium">{row.procurement.gfrRuleReference}</span>
                <span className="mt-0.5 block text-[10px] font-bold text-slate-500">{row.procurement.deliveryTimelineWeeks} wks</span>
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-xs text-slate-600">{row.procurement.issuedAt}</td>
              <td className="px-3 py-3 text-xs font-black text-slate-900 text-center">{row.adoptionCount}</td>
              <td className="px-3 py-3"><ProcurementStatusBadge status={row.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="divide-y divide-slate-100 md:hidden">
      {rows.map(row => (
        <button
          key={row.procurement.id}
          type="button"
          onClick={() => onSelect(row)}
          className={`w-full p-4 text-left ${selectedId === row.procurement.id ? 'bg-govblue-50/80' : 'bg-white'}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="font-mono text-xs font-black text-slate-900">{row.procurement.id}</span>
              <span className="mt-1 block text-[10px] text-slate-500">PO {row.procurement.poNumber}</span>
            </div>
            <ProcurementStatusBadge status={row.status} />
          </div>
          <p className="mt-3 text-xs font-black text-slate-900">{row.procurement.problemTitle}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1"><Building2 className="h-3 w-3" />{row.procurement.vendorName}</span>
            <span className="inline-flex items-center gap-1"><IndianRupee className="h-3 w-3" />{formatINRMoney(row.procurement.finalPoValue)}</span>
            <span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" />{row.procurement.issuedAt}</span>
            <span className="font-bold text-slate-700">{row.adoptionCount} adoption(s)</span>
          </div>
        </button>
      ))}
    </div>
  </div>
);