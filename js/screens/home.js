import { el } from '../utils.js';
import { parseKey, dayShort, monthShort } from '../planner.js';

export function renderHome(vals, actions) {
  const s = vals.suggestedActivity;
  return el('div', { 'data-screen-label': 'Home', class: 'screen', style: { padding: '26px 24px 10px' } }, [
    el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }, [
      el('div', {}, [
        el('div', { style: { font: "400 13px 'Nunito', sans-serif", color: 'var(--text-muted-2)' } }, `Good afternoon, ${vals.caregiverName}`),
        el('div', { style: { font: "700 24px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '2px' } }, `${vals.childName}'s Day`),
      ]),
      el('div', {
        style: { width: '48px', height: '48px', borderRadius: '50%', background: vals.activeChildSwatch, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 18px 'Quicksand', sans-serif", color: 'var(--text-primary)', cursor: 'pointer', overflow: 'hidden' },
        onClick: () => actions.openSwitcher(),
      }, vals.activeChildPhotoURL ? [el('img', { src: vals.activeChildPhotoURL, style: { width: '100%', height: '100%', objectFit: 'cover' } })] : vals.activeChildInitial),
    ]),

    el('div', { style: { marginTop: '20px', background: 'var(--sage-light)', borderRadius: '20px', padding: '20px' } }, [
      el('div', { style: { font: "600 12px 'Nunito', sans-serif", letterSpacing: '.08em', textTransform: 'uppercase', color: '#4B6B3F' } }, 'Today so far'),
      el('div', { style: { display: 'flex', gap: '18px', marginTop: '12px' } }, [
        el('div', {}, [
          el('div', { style: { font: "700 22px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, String(vals.logEntries.filter((l) => l.type === 'activity').length)),
          el('div', { style: { font: "400 12px 'Nunito', sans-serif", color: '#4B6B3F' } }, 'activities'),
        ]),
      ]),
    ]),

    el('div', { style: { display: 'flex', gap: '12px', marginTop: '16px' } }, [
      el('div', { class: 'btn-secondary', onClick: () => actions.goActivities() }, 'Log an activity'),
      el('div', { class: 'btn-secondary', onClick: () => actions.goNotes() }, 'Add a note'),
    ]),

    el('div', { class: 'section-label', style: { marginTop: '22px' } }, 'Suggested next'),
    s ? el('div', {
      style: { marginTop: '10px', display: 'flex', gap: '14px', alignItems: 'center', background: '#fff', border: '1px solid var(--card-border)', borderRadius: '18px', padding: '14px', cursor: 'pointer' },
      onClick: () => actions.openActivity(s.id),
    }, [
      el('div', { style: { width: '56px', height: '56px', flex: 'none', borderRadius: '14px', background: s.color, position: 'relative' }, html: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" style="position:absolute;bottom:5px;right:5px">${s.iconHtml}</svg>` }),
      el('div', {}, [
        el('div', { style: { font: "600 15px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, s.name),
        el('div', { style: { font: "400 12.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)', marginTop: '2px' } }, `${s.category} · ${s.duration}`),
      ]),
    ]) : null,

    el('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '22px' } }, [
      el('div', { class: 'section-label' }, 'Coming up'),
      el('div', { style: { font: "600 12px 'Nunito', sans-serif", color: 'var(--sage)', cursor: 'pointer' }, onClick: () => actions.goPlanner() }, 'Open planner'),
    ]),
    vals.upcomingPlans.length
      ? el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' } }, vals.upcomingPlans.map((p) => {
          const d = parseKey(p.dateKey);
          const isToday = p.dateKey === vals.planTodayKey;
          return el('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: '1px solid var(--card-border)', borderRadius: '14px', padding: '10px 12px', cursor: 'pointer' }, onClick: () => actions.openActivity(p.activity.id) }, [
            el('div', { style: { width: '42px', flex: 'none', textAlign: 'center' } }, [
              el('div', { style: { font: "700 12px 'Quicksand', sans-serif", color: isToday ? 'var(--sage)' : 'var(--text-primary)' } }, isToday ? 'Today' : dayShort(d.getDay())),
              el('div', { style: { font: "400 11px 'Nunito', sans-serif", color: 'var(--text-muted-5)' } }, `${monthShort(d.getMonth())} ${d.getDate()}`),
            ]),
            el('div', { style: { width: '36px', height: '36px', flex: 'none', borderRadius: '10px', background: p.activity.color, position: 'relative' }, html: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">${p.activity.iconHtml}</svg>` }),
            el('div', { style: { flex: '1' } }, [
              el('div', { style: { font: "600 13.5px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, p.activity.name),
              el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)', marginTop: '1px' } }, p.activity.category),
            ]),
          ]);
        }))
      : el('div', { style: { marginTop: '10px', background: '#fff', border: '1px dashed var(--card-border)', borderRadius: '14px', padding: '14px', textAlign: 'center', cursor: 'pointer' }, onClick: () => actions.goPlanner() }, [
          el('div', { style: { font: "600 13px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, 'Nothing planned yet'),
          el('div', { style: { font: "400 12px 'Nunito', sans-serif", color: 'var(--text-muted-2)', marginTop: '2px' } }, 'Tap to plan a few activities ahead'),
        ]),

    el('div', { class: 'section-label', style: { marginTop: '22px' } }, 'Daily log'),
    el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column' } },
      vals.logEntries.length
        ? vals.logEntries.map((eItem) => el('div', { style: { display: 'flex', gap: '14px', padding: '12px 0', borderBottom: '1px solid var(--divider)' } }, [
            el('div', { style: { width: '64px', flex: 'none', font: "600 12px 'Nunito', sans-serif", color: 'var(--text-muted-5)', paddingTop: '1px' } }, eItem.time),
            el('div', {}, [
              el('div', { style: { font: "600 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, eItem.label),
              el('div', { style: { font: "400 13px/1.4 'Nunito', sans-serif", color: 'var(--text-muted-4)', marginTop: '2px' } }, eItem.note),
            ]),
          ]))
        : [el('div', { style: { font: "400 13.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)', padding: '8px 0' } }, 'Nothing logged yet today.')]),
    el('div', { style: { height: '16px' } }),
  ]);
}
