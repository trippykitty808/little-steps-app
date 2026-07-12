import { el } from '../utils.js';
import {
  parseKey, toKey, weekDays, monthMatrix, seasonFor, yearMonths,
  monthName, monthShort, dayShort, dayFull, sameDay, plansByDate,
} from '../planner.js';

const VIEWS = [
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'season', label: 'Season' },
  { key: 'year', label: 'Year' },
];

const addBtnStyle = { flex: 'none', background: 'var(--sage-tint-bg)', color: 'var(--sage-tint-fg)', font: "600 12px 'Quicksand', sans-serif", padding: '6px 12px', borderRadius: '100px', cursor: 'pointer' };

function planChip(entry, actions) {
  return el('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid var(--card-border)', borderRadius: '10px', padding: '6px 8px 6px 6px' } }, [
    el('div', { style: { width: '24px', height: '24px', flex: 'none', borderRadius: '7px', background: entry.activity.color, position: 'relative' }, html: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">${entry.activity.iconHtml}</svg>` }),
    el('div', { style: { flex: '1', font: "500 12.5px 'Nunito', sans-serif", color: 'var(--text-primary)', lineHeight: '1.25' } }, entry.activity.name),
    el('div', { style: { flex: 'none', width: '20px', height: '20px', borderRadius: '50%', background: '#F0E9D9', color: 'var(--text-muted-1)', font: "700 12px 'Nunito', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }, onClick: (e) => { e.stopPropagation(); actions.removePlan(entry.id); } }, '×'),
  ]);
}

function periodLabel(vals) {
  const anchor = parseKey(vals.planAnchor);
  if (vals.planView === 'week') {
    const ws = weekDays(anchor)[0];
    return `Week of ${monthShort(ws.getMonth())} ${ws.getDate()}`;
  }
  if (vals.planView === 'month') return `${monthName(anchor.getMonth())} ${anchor.getFullYear()}`;
  if (vals.planView === 'season') { const s = seasonFor(anchor); return `${s.name} ${s.labelYear}`; }
  return String(anchor.getFullYear());
}

function renderWeek(vals, actions, pbd, today) {
  const anchor = parseKey(vals.planAnchor);
  return el('div', {}, weekDays(anchor).map((day) => {
    const key = toKey(day);
    const entries = pbd[key] || [];
    const isToday = sameDay(day, today);
    return el('div', { style: { background: '#fff', border: `1px solid ${isToday ? 'var(--sage)' : 'var(--card-border)'}`, borderRadius: '16px', padding: '12px 14px', marginBottom: '10px' } }, [
      el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }, [
        el('div', {}, [
          el('div', { style: { font: "700 13px 'Quicksand', sans-serif", color: isToday ? 'var(--sage)' : 'var(--text-primary)' } }, dayFull(day.getDay())),
          el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-5)', marginTop: '1px' } }, `${monthShort(day.getMonth())} ${day.getDate()}${isToday ? ' · Today' : ''}`),
        ]),
        el('div', { style: addBtnStyle, onClick: () => actions.openDayPlanner(key) }, '+ Add'),
      ]),
      entries.length
        ? el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' } }, entries.map((e) => planChip(e, actions)))
        : el('div', { style: { marginTop: '8px', font: "400 12px 'Nunito', sans-serif", color: 'var(--text-muted-2)' } }, 'Nothing planned yet'),
    ]);
  }));
}

function renderMonth(vals, actions, pbd, today) {
  const anchor = parseKey(vals.planAnchor);
  const weeks = monthMatrix(anchor);
  const selKey = vals.planSelectedDate;
  const selDate = parseKey(selKey);
  const selEntries = pbd[selKey] || [];

  const weekdayHeader = el('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px', marginBottom: '4px' } },
    [0, 1, 2, 3, 4, 5, 6].map((dow) => el('div', { style: { textAlign: 'center', font: "700 10px 'Nunito', sans-serif", letterSpacing: '.03em', textTransform: 'uppercase', color: 'var(--text-muted-5)' } }, dayShort(dow)[0])));

  const grid = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
    weeks.map((row) => el('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px' } },
      row.map((day) => {
        const inMonth = day.getMonth() === anchor.getMonth();
        const key = toKey(day);
        const entries = pbd[key] || [];
        const isToday = sameDay(day, today);
        const isSel = key === selKey;
        return el('div', {
          style: { aspectRatio: '1', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: isSel ? 'var(--sage)' : (isToday ? '#EAF1E3' : 'transparent') },
          onClick: () => actions.selectPlanDay(key),
        }, [
          el('div', { style: { font: "600 12.5px 'Quicksand', sans-serif", color: isSel ? '#fff' : (inMonth ? 'var(--text-primary)' : 'var(--text-muted-5)') } }, String(day.getDate())),
          entries.length ? el('div', { style: { width: '5px', height: '5px', borderRadius: '50%', background: isSel ? '#fff' : 'var(--sage)', marginTop: '2px' } }) : el('div', { style: { height: '7px' } }),
        ]);
      }))));

  const panel = el('div', { style: { marginTop: '16px', background: '#fff', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '14px' } }, [
    el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }, [
      el('div', { style: { font: "700 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, `${dayFull(selDate.getDay())}, ${monthShort(selDate.getMonth())} ${selDate.getDate()}`),
      el('div', { style: addBtnStyle, onClick: () => actions.openDayPlanner(selKey) }, '+ Add'),
    ]),
    selEntries.length
      ? el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' } }, selEntries.map((e) => planChip(e, actions)))
      : el('div', { style: { marginTop: '8px', font: "400 12px 'Nunito', sans-serif", color: 'var(--text-muted-2)' } }, 'Nothing planned — tap “+ Add”.'),
  ]);

  return el('div', {}, [weekdayHeader, grid, panel]);
}

function renderSeason(vals, actions, pbd) {
  const anchor = parseKey(vals.planAnchor);
  const season = seasonFor(anchor);
  return el('div', {}, [
    el('div', { style: { font: "400 12.5px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginBottom: '16px' } }, `A calmer, wider view — the whole ${season.name.toLowerCase()} rhythm at a glance.`),
    ...season.months.map(({ year, month }) => {
      const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
      const dates = Object.keys(pbd).filter((k) => k.startsWith(prefix)).sort();
      return el('div', { style: { marginBottom: '22px' } }, [
        el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' } }, [
          el('div', { style: { font: "700 15px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, `${monthName(month)} ${year}`),
          el('div', { style: { font: "600 12px 'Quicksand', sans-serif", color: 'var(--sage)', cursor: 'pointer' }, onClick: () => actions.openMonthFromYear(year, month) }, 'Open month →'),
        ]),
        dates.length
          ? el('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } }, dates.map((k) => {
              const d = parseKey(k);
              return el('div', {}, [
                el('div', { style: { font: "600 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginBottom: '5px' } }, `${dayShort(d.getDay())} · ${monthShort(month)} ${d.getDate()}`),
                el('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } }, pbd[k].map((e) => planChip(e, actions))),
              ]);
            }))
          : el('div', { style: { font: "400 12.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)' } }, 'Nothing planned this month'),
      ]);
    }),
  ]);
}

function renderYear(vals, actions, pbd) {
  const anchor = parseKey(vals.planAnchor);
  return el('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' } },
    yearMonths(anchor.getFullYear()).map(({ year, month }) => {
      const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
      const count = Object.keys(pbd).filter((k) => k.startsWith(prefix)).reduce((n, k) => n + pbd[k].length, 0);
      return el('div', {
        style: { background: '#fff', border: '1px solid var(--card-border)', borderRadius: '14px', padding: '16px 8px', cursor: 'pointer', textAlign: 'center' },
        onClick: () => actions.openMonthFromYear(year, month),
      }, [
        el('div', { style: { font: "700 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, monthShort(month)),
        el('div', { style: { font: "600 11.5px 'Nunito', sans-serif", color: count ? 'var(--sage)' : 'var(--text-muted-5)', marginTop: '5px' } }, count ? `${count} planned` : '—'),
      ]);
    }));
}

export function renderPlanner(vals, actions) {
  const pbd = plansByDate(vals.plans);
  const today = parseKey(vals.planTodayKey);

  let body;
  if (vals.planView === 'week') body = renderWeek(vals, actions, pbd, today);
  else if (vals.planView === 'month') body = renderMonth(vals, actions, pbd, today);
  else if (vals.planView === 'season') body = renderSeason(vals, actions, pbd);
  else body = renderYear(vals, actions, pbd);

  return el('div', { 'data-screen-label': 'Planner', class: 'screen', style: { padding: '26px 24px 10px' } }, [
    el('div', { style: { font: "700 26px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, 'Plan'),
    el('div', { style: { font: "400 14px 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '4px' } }, `Map out activities for ${vals.childName} — a week, month, season, or year at a time.`),

    // view toggle
    el('div', { style: { display: 'flex', gap: '6px', marginTop: '16px', background: '#F6F1E4', borderRadius: '100px', padding: '4px' } },
      VIEWS.map((v) => el('div', {
        style: { flex: '1', textAlign: 'center', padding: '9px 0', borderRadius: '100px', cursor: 'pointer', font: "600 13px 'Quicksand', sans-serif", background: vals.planView === v.key ? '#fff' : 'transparent', color: vals.planView === v.key ? 'var(--text-primary)' : 'var(--text-muted-2)' },
        onClick: () => actions.setPlanView(v.key),
      }, v.label))),

    // period nav
    el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' } }, [
      el('div', { style: { width: '34px', height: '34px', borderRadius: '10px', background: '#fff', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', font: "700 16px 'Nunito', sans-serif", color: 'var(--text-primary)' }, onClick: () => actions.planPrev() }, '‹'),
      el('div', { style: { flex: '1', textAlign: 'center' } }, [
        el('div', { style: { font: "700 16px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, periodLabel(vals)),
        el('div', { style: { font: "600 11.5px 'Quicksand', sans-serif", color: 'var(--sage)', cursor: 'pointer', marginTop: '2px' }, onClick: () => actions.planToday() }, 'Jump to today'),
      ]),
      el('div', { style: { width: '34px', height: '34px', borderRadius: '10px', background: '#fff', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', font: "700 16px 'Nunito', sans-serif", color: 'var(--text-primary)' }, onClick: () => actions.planNext() }, '›'),
    ]),

    el('div', { style: { marginTop: '18px' } }, [body]),
    vals.planToast ? el('div', { class: 'toast', style: { position: 'sticky', bottom: '10px' } }, vals.planToast) : null,
    el('div', { style: { height: '16px' } }),
  ]);
}

// Overlay: pick an activity to add to a chosen date (opened from a planner day).
export function renderDayPickOverlay(vals, actions) {
  const dateKey = vals.planPickDate;
  const d = parseKey(dateKey);
  // age-appropriate first, then the rest
  const list = [...vals.activitiesForPlanner].sort((a, b) => (a.isAgeOk === b.isAgeOk ? 0 : a.isAgeOk ? -1 : 1));
  const overlay = el('div', { class: 'overlay', onClick: () => actions.closeDayPlanner() });
  const sheet = el('div', { class: 'overlay-sheet', style: { maxHeight: '78vh', display: 'flex', flexDirection: 'column' }, onClick: (e) => e.stopPropagation() }, [
    el('div', { style: { font: "700 12px 'Nunito', sans-serif", letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted-3)', padding: '2px 6px 4px' } }, 'Add an activity'),
    el('div', { style: { font: "600 15px 'Quicksand', sans-serif", color: 'var(--text-primary)', padding: '0 6px 10px' } }, `${dayFull(d.getDay())}, ${monthName(d.getMonth())} ${d.getDate()}`),
    el('div', { style: { overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '2px' } },
      list.map((a) => el('div', {
        style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: '12px', cursor: 'pointer', background: '#fff', border: '1px solid var(--card-border)' },
        onClick: () => actions.addActivityToPlan(a.id, dateKey),
      }, [
        el('div', { style: { width: '38px', height: '38px', flex: 'none', borderRadius: '10px', background: a.color, position: 'relative' }, html: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">${a.iconHtml}</svg>` }),
        el('div', { style: { flex: '1' } }, [
          el('div', { style: { font: "600 13.5px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, a.name),
          el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)', marginTop: '1px' } }, `${a.category} · ${a.ageLabel}`),
        ]),
        a.isAgeOk ? el('div', { style: { flex: 'none', font: "600 9.5px 'Nunito', sans-serif", color: 'var(--sage-tint-fg)', background: 'var(--sage-tint-bg)', padding: '3px 8px', borderRadius: '100px' } }, 'Good age') : null,
      ]))),
  ]);
  overlay.appendChild(sheet);
  return overlay;
}

// Overlay: pick a date to schedule a specific activity (opened from Activity Detail).
export function renderPlanActivityOverlay(vals, actions) {
  const a = vals.planningActivity;
  const overlay = el('div', { class: 'overlay', onClick: () => actions.closePlanActivity() });
  const sheet = el('div', { class: 'overlay-sheet', onClick: (e) => e.stopPropagation() }, [
    el('div', { style: { font: "700 12px 'Nunito', sans-serif", letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted-3)', padding: '2px 6px 6px' } }, 'Add to plan'),
    el('div', { style: { font: "600 16px 'Quicksand', sans-serif", color: 'var(--text-primary)', padding: '0 6px 12px' } }, a ? a.name : ''),
    el('div', { class: 'field-label', style: { padding: '0 6px' } }, 'Which day?'),
    el('input', { type: 'date', class: 'text-input', style: { margin: '6px 0 0', font: "600 15px 'Quicksand', sans-serif" }, value: vals.planActivityDate || '', onChange: (e) => actions.onPlanActivityDateChange(e) }),
    el('div', { class: 'btn-primary', style: { marginTop: '16px' }, onClick: () => actions.confirmPlanActivity() }, 'Add to plan'),
    el('div', { style: { textAlign: 'center', font: "600 13px 'Quicksand', sans-serif", color: 'var(--text-muted-1)', padding: '12px 0 2px', cursor: 'pointer' }, onClick: () => actions.closePlanActivity() }, 'Cancel'),
  ]);
  overlay.appendChild(sheet);
  return overlay;
}
