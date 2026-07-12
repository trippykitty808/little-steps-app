// Pure date / calendar helpers for the activity planner. All dates are handled
// in local time and keyed as 'YYYY-MM-DD' (never toISOString, which shifts to
// UTC and can land on the wrong day).

export function toKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseKey(key) {
  const [y, m, d] = String(key).split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(date, n) { const d = new Date(date); d.setDate(d.getDate() + n); return d; }
export function addMonths(date, n) { const d = new Date(date.getFullYear(), date.getMonth() + n, 1); return d; }

export function startOfWeek(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - d.getDay()); // Sunday start
  return d;
}

export function weekDays(anchor) {
  const s = startOfWeek(anchor);
  return Array.from({ length: 7 }, (_, i) => addDays(s, i));
}

// A 6-row calendar matrix (weeks × 7 days) covering the anchor's month,
// including the leading/trailing days from neighbouring months.
export function monthMatrix(anchor) {
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  let cur = startOfWeek(first);
  const weeks = [];
  for (let w = 0; w < 6; w++) {
    const row = [];
    for (let i = 0; i < 7; i++) { row.push(new Date(cur)); cur = addDays(cur, 1); }
    weeks.push(row);
  }
  return weeks;
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export function monthName(m) { return MONTH_NAMES[m]; }
export function monthShort(m) { return MONTH_SHORT[m]; }
export function dayShort(dow) { return DAY_SHORT[dow]; }
export function dayFull(dow) { return DAY_FULL[dow]; }

// Meteorological seasons (Northern Hemisphere). Winter spans the year boundary
// (Dec–Feb); a winter is labelled by its starting December's year.
export function seasonFor(date) {
  const m = date.getMonth(), y = date.getFullYear();
  let name, startY, startM;
  if (m === 11) { name = 'Winter'; startY = y; startM = 11; }
  else if (m <= 1) { name = 'Winter'; startY = y - 1; startM = 11; }
  else if (m <= 4) { name = 'Spring'; startY = y; startM = 2; }
  else if (m <= 7) { name = 'Summer'; startY = y; startM = 5; }
  else { name = 'Fall'; startY = y; startM = 8; }
  const months = [0, 1, 2].map((i) => {
    const d = new Date(startY, startM + i, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  return { name, months, labelYear: startY };
}

export function nextSeasonAnchor(date) { const s = seasonFor(date); return new Date(s.months[0].year, s.months[0].month + 3, 1); }
export function prevSeasonAnchor(date) { const s = seasonFor(date); return new Date(s.months[0].year, s.months[0].month - 3, 1); }

export function yearMonths(year) {
  return Array.from({ length: 12 }, (_, m) => ({ year, month: m }));
}

export function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// Group plan entries by their dateKey → { 'YYYY-MM-DD': [entry, ...] }
export function plansByDate(plans) {
  const out = {};
  for (const p of plans) {
    if (!p.dateKey) continue;
    (out[p.dateKey] = out[p.dateKey] || []).push(p);
  }
  return out;
}
