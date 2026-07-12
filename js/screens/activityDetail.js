import { el } from '../utils.js';

export function renderActivityDetail(vals, actions) {
  const a = vals.selectedActivity;
  return el('div', { 'data-screen-label': 'Activity Detail', class: 'screen' }, [
    el('div', { style: { height: '150px', background: a.color, flex: 'none', position: 'relative' }, html: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" style="position:absolute;bottom:14px;right:16px">${a.iconHtml}</svg>` }),
    el('div', { style: { padding: '24px', marginTop: '-16px' } }, [
      el('div', { style: { display: 'inline-block', font: "600 13.5px 'Nunito', sans-serif", color: 'var(--text-primary)', background: 'rgba(255,255,255,.6)', padding: '7px 14px', borderRadius: '100px', cursor: 'pointer', marginBottom: '8px' }, onClick: () => actions.goActivities() }, '← Activities'),
      el('div', { class: 'card', style: { borderRadius: '20px', padding: '22px', boxShadow: '0 12px 30px -20px rgba(60,50,30,.3)' } }, [
        el('div', { style: { font: "600 11px 'Nunito', sans-serif", letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted-3)' } }, `${a.category} · ${a.ageLabel}`),
        el('div', { style: { display: 'inline-block', marginTop: '6px', font: "700 10px 'Nunito', sans-serif", letterSpacing: '.06em', textTransform: 'uppercase', background: 'var(--lavender-tint)', color: 'var(--waldorf-fg)', padding: '3px 10px', borderRadius: '100px' } }, a.tradition),
        a.isGoodFit ? el('div', { style: { display: 'inline-block', marginTop: '6px', marginLeft: '6px', font: "700 10px 'Nunito', sans-serif", letterSpacing: '.06em', textTransform: 'uppercase', background: 'var(--sage-tint-bg)', color: 'var(--sage-tint-fg)', padding: '3px 10px', borderRadius: '100px' } }, 'Great fit') : null,
        el('div', { style: { font: "700 24px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '6px' } }, a.name),
        el('div', { style: { font: "600 13px 'Nunito', sans-serif", color: 'var(--sage)', marginTop: '6px' } }, a.duration),

        el('div', { class: 'section-label', style: { marginTop: '20px' } }, 'Materials'),
        el('div', { style: { marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px' } },
          a.materials.map((m) => el('div', { style: { background: '#F6F1E4', color: 'var(--text-muted-4)', font: "500 13px 'Nunito', sans-serif", padding: '8px 12px', borderRadius: '14px' } }, m))),

        el('div', { class: 'section-label', style: { marginTop: '20px' } }, 'Steps'),
        el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '12px' } },
          a.steps.map((st) => el('div', { style: { display: 'flex', gap: '12px' } }, [
            el('div', { style: { width: '24px', height: '24px', flex: 'none', borderRadius: '8px', background: 'var(--divider)', color: 'var(--text-muted-1)', font: "700 12px 'Nunito', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center' } }, String(st.n)),
            el('div', { style: { font: "400 14px/1.5 'Nunito', sans-serif", color: 'var(--text-body)' } }, st.text),
          ]))),

        el('div', { class: 'section-label', style: { marginTop: '20px' } }, 'Learn more'),
        el('div', { style: { marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' } },
          a.resources.map((r) => el('a', { href: r.url, target: '_blank', rel: 'noopener', style: { display: 'block', background: '#F6F1E4', borderRadius: '12px', padding: '11px 14px' } }, [
            el('div', { style: { font: "600 13px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, r.name),
            el('div', { style: { font: "400 12px 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '2px' } }, r.desc),
          ]))),

        el('div', { style: { display: 'flex', gap: '10px', marginTop: '20px' } }, [
          el('div', { style: { flex: '1', background: '#fff', border: '1.5px solid var(--sage)', color: '#4B6B3F', font: "600 15px 'Quicksand', sans-serif", textAlign: 'center', padding: '13px', borderRadius: '14px', cursor: 'pointer' }, onClick: () => actions.openPlanActivity(a.id) }, 'Add to plan'),
          el('div', { style: { flex: '1', background: 'var(--sage)', color: '#fff', font: "600 15px 'Quicksand', sans-serif", textAlign: 'center', padding: '13px', borderRadius: '14px', cursor: 'pointer' }, onClick: () => actions.goLogActivity() }, 'Log it'),
        ]),
      ]),
    ]),
  ]);
}
