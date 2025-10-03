// js/utils/week.js

/**
 * ISO-8601 uke:
 * - Uken starter på mandag (1).
 * - Uke 1 er uken som inneholder årets første torsdag (evt. 4. januar).
 * - Vi bruker UTC for å unngå avvik ved tidssone/DST.
 */
export function getISOWeek(date = new Date()) {
  // Lag en kopi i UTC
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

  // ukedag 1..7 (mandag=1, søndag=7)
  const dayNum = d.getUTCDay() === 0 ? 7 : d.getUTCDay();

  // Flytt til torsdag i samme uke
  d.setUTCDate(d.getUTCDate() + (4 - dayNum));

  // Første dag i året (UTC)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

  // Ukenummer
  const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

  // ISO-uken kan tilhøre år N-1 eller N+1; returnér også isoYear
  const isoYear = d.getUTCFullYear();
  return { week, year: isoYear };
}

/**
 * Hvor mange ISO-uker er det i et gitt år (52 eller 53)?
 * Triks: 28. desember er alltid i årets siste ISO-uke.
 */
export function isoWeeksInYear(year) {
  const { week } = getISOWeek(new Date(Date.UTC(year, 11, 28)));
  return week; // 52 eller 53
}
