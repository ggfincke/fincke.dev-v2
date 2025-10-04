// src/sections/experience/components/JobCompanyHeader.tsx
// company name & date range header

interface JobCompanyHeaderProps {
  company: string;
  dateRange: string;
}

// company header component
export function JobCompanyHeader({
  company,
  dateRange,
}: JobCompanyHeaderProps) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-2">
      <h3 className="text-sm font-medium text-[var(--fg)]">{company}</h3>
      <span className="text-xs text-[var(--muted)]">{dateRange}</span>
    </div>
  );
}
