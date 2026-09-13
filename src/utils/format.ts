export const formatINRCompact = (value: number): string => {
  const abs = Math.abs(value);

  if (abs >= 10000000) {
    const crore = value / 10000000;
    return `₹${crore.toLocaleString('en-IN', { maximumFractionDigits: 2 })}Cr`;
  }

  if (abs >= 100000) {
    const lakh = value / 100000;
    return `₹${lakh.toLocaleString('en-IN', { maximumFractionDigits: 2 })}L`;
  }

  if (abs >= 1000) {
    return `₹${(value / 1000).toLocaleString('en-IN', { maximumFractionDigits: 2 })}K`;
  }

  return `₹${value.toLocaleString('en-IN')}`;
};

export const formatINRMoney = (value: number): string => {
  const abs = Math.abs(value);

  if (abs >= 10000000) {
    const crore = value / 10000000;
    return `₹${crore.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Cr`;
  }

  if (abs >= 100000) {
    const lakh = value / 100000;
    return `₹${lakh.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L`;
  }

  return `₹${value.toLocaleString('en-IN')}`;
};
