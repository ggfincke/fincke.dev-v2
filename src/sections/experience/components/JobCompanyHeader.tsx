// src/sections/experience/components/JobCompanyHeader.tsx
// company name & date range header

// props for company header
interface JobCompanyHeaderProps {
  company: string;
  dateRange: string;
}

// company name & date range header
export function JobCompanyHeader({
  company,
  dateRange,
}: JobCompanyHeaderProps) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-2">
      <h3 className="text-sm font-medium text-[var(--white)]">{company}</h3>
      <span className="text-xs text-[var(--muted)]">{dateRange}</span>
    </div>
  );
}
