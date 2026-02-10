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

// months lookup for date parsing
const MONTHS = [
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

// extract latest month from date range string
// splits on range separator and checks the last segment first
// returns month index (0 = Jan), 12 for "Present", -1 if not found
export const extractLatestMonth = (dateRange: string): number => {
  const lower = dateRange.toLowerCase();

  // "Present" means ongoing — sort above any named month
  if (lower.includes('present')) return 12;

  // split on range separators (hyphen, en-dash, em-dash)
  const segments = lower.split(/\s*[-–—]\s*/);

  for (let i = segments.length - 1; i >= 0; i--) {
    for (let m = 0; m < MONTHS.length; m++) {
      if (segments[i].includes(MONTHS[m])) return m;
    }
  }

  return -1;
};
