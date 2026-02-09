// src/sections/projects-archive/utils/projectSort.ts
// project sorting utilities

// extract first year from date range string as display text
export const extractFirstYear = (dateRange: string): string =>
  dateRange.match(/\d{4}/)?.[0] ?? 'TBD';

// extract latest year from date range string
export const extractLatestYear = (dateRange: string): number => {
  const years = dateRange.match(/\d{4}/g);
  if (!years) {
    return 0;
  }
  return Math.max(...years.map(year => Number.parseInt(year, 10)));
};

// extract latest month from date range string
// strategy: find month closest to latest year in string
// proximity check (<50 chars) handles Sep 2024 - Present cases
// also prefer later month when multiple matches sit near that year
export const extractLatestMonth = (dateRange: string): number => {
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];
  const lower = dateRange.toLowerCase();
  const matches = lower.match(
    /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*/g
  );

  if (!matches) {
    return 0;
  }

  const latestYear = extractLatestYear(dateRange);
  let latestMonth = 0;

  for (const match of matches) {
    const monthIndex = months.findIndex(month => match.startsWith(month));
    if (monthIndex === -1) {
      continue;
    }

    const monthPos = lower.indexOf(match);
    const yearPos = lower.indexOf(String(latestYear));

    // keep this month when no year found, month sits near latest year, or month outranks current pick
    if (
      latestYear === 0 ||
      Math.abs(monthPos - yearPos) < 50 ||
      monthIndex > latestMonth
    ) {
      latestMonth = monthIndex;
    }
  }

  return latestMonth;
};
