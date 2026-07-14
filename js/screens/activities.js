import { el } from '../utils.js';

export function renderActivities(vals, actions) {
  return el('div', { 'data-screen-label': 'Activities', class: 'screen', style: { padding: '26px 24px 10px' } }, [
    el('div', { style: { font: "700 26px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, 'Activities'),
    el('div', { style: { font: "400 14px 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '4px' } }, `Four gentle approaches, chosen for ${vals.childName}, ${vals.childAgeLabel}`),

    el('div', { class: 'section-label', style: { marginTop: '18px' } }, 'Age'),
    el('div', { style: { display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' } },
      vals.ageFilterOptions.map((o) => el('div', {
        class: `pill${o.active ? ' selected' : ''}`,
        style: { padding: '8px 16px', font: "600 13px 'Quicksand', sans-serif" },
        onClick: () => actions.setAgeStageFilter(o.key),
      }, o.label))),
    el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-5)', marginTop: '6px' } }, vals.ageFilterCaption),

    el('div', { class: 'section-label', style: { marginTop: '18px' } }, 'Tradition'),
    el('div', { style: { display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' } },
      vals.traditionFilters.map((t) => el('div', {
        class: `pill${t.active ? ' selected' : ''}`,
        style: { padding: '8px 16px', font: "600 13px 'Quicksand', sans-serif" },
        onClick: () => actions.setTraditionFilter(t.key),
      }, t.label))),

    el('div', { class: 'section-label', style: { marginTop: '18px' } }, 'Focus area'),
    el('div', { style: { display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' } },
      vals.focusAreaFilters.map((f) => el('div', {
        class: `pill${f.active ? ' selected' : ''}`,
        style: { padding: '8px 16px', font: "600 13px 'Quicksand', sans-serif" },
        onClick: () => actions.setFocusAreaFilter(f.key),
      }, f.label))),

    vals.visibleActivities.length
      ? el('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: '14px', marginTop: '16px' } },
          vals.visibleActivities.map((a) => el('div', {
            style: { background: '#fff', border: '1px solid var(--card-border)', borderRadius: '18px', padding: '14px', cursor: 'pointer' },
            onClick: () => actions.openActivity(a.id),
          }, [
            el('div', { style: { height: '64px', borderRadius: '12px', background: a.color, position: 'relative' } }, [
              el('div', { style: { position: 'absolute', top: '8px', left: '8px', font: "700 9.5px 'Nunito', sans-serif", letterSpacing: '.04em', textTransform: 'uppercase', background: 'rgba(255,255,255,.7)', color: 'var(--text-primary)', padding: '3px 8px', borderRadius: '100px' } }, a.tradition),
              el('div', { style: { position: 'absolute', bottom: '7px', right: '7px' }, html: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none">${a.iconHtml}</svg>` }),
            ]),
            el('div', { style: { font: "600 14px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '10px' } }, a.name),
            el('div', { style: { font: "400 12px 'Nunito', sans-serif", color: 'var(--text-muted-2)', marginTop: '2px' } }, `${a.category} · ${a.ageLabel}`),
            a.isGoodFit ? el('div', { style: { marginTop: '6px', display: 'inline-block', font: "600 10px 'Nunito', sans-serif", color: 'var(--sage-tint-fg)', background: 'var(--sage-tint-bg)', padding: '3px 9px', borderRadius: '100px' } }, 'Great fit') : null,
          ])))
      : el('div', { style: { font: "400 13.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)', padding: '24px 0', textAlign: 'center' } }, 'No activities match these filters — try clearing one.'),
    el('div', { style: { height: '16px' } }),
  ]);
}
