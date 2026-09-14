import React from 'react';
import { ProcurementStatus } from '../../types';

interface ProcurementStatusBadgeProps {
  status: ProcurementStatus;
}

const styles: Record<ProcurementStatus, string> = {
  ACTIVE: 'bg-emerald-100 text-emerald-700',
  COMPLETED: 'bg-sky-100 text-sky-700',
  PENDING_DELIVERY: 'bg-amber-100 text-amber-700'
};

export const ProcurementStatusBadge: React.FC<ProcurementStatusBadgeProps> = ({ status }) => (
  <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wide ${styles[status]}`}>
    {status.replace('_', ' ')}
  </span>
);