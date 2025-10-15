export function getISOWeek(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() === 0 ? 7 : d.getUTCDay();
  d.setUTCDate(d.getUTCDate() + (4 - dayNum));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  const isoYear = d.getUTCFullYear();
  return { week, year: isoYear };
}
export function isoWeeksInYear(year) {
  const { week } = getISOWeek(new Date(Date.UTC(year, 11, 28)));
  return week;
}
