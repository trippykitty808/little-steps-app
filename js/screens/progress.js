import { el } from '../utils.js';

export function renderProgress(vals, actions) {
  return el('div', { 'data-screen-label': 'Progress', class: 'screen', style: { padding: '26px 24px 10px' } }, [
    el('div', { style: { font: "700 26px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, 'Progress'),
    el('div', { style: { font: "400 14px 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '4px' } }, 'Milestones across every domain'),

    el('div', { style: { display: 'flex', flexDirection: 'column', gap: '22px', marginTop: '20px' } },
      vals.domains.map((d) => el('div', {}, [
        el('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          el('div', { style: { width: '8px', height: '8px', borderRadius: '50%', background: d.color } }),
          el('div', { style: { font: "700 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, d.domain),
        ]),
        el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' } },
          d.items.map((m) => el('div', {
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', background: '#fff', border: '1px solid var(--card-border)', borderRadius: '14px', padding: '13px 16px', cursor: 'pointer' },
            onClick: () => actions.openMilestone(m.key, 'progress'),
          }, [
            el('div', { style: { font: "500 14px 'Nunito', sans-serif", color: 'var(--text-primary)' } }, m.title),
            el('div', { style: { font: "600 11px 'Nunito', sans-serif", letterSpacing: '.04em', textTransform: 'uppercase', flex: 'none', padding: '4px 10px', borderRadius: '100px', background: m.badgeBg, color: m.badgeFg } }, m.statusLabel),
          ]))),
      ]))),

    el('div', {
      style: { marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', background: 'var(--lavender-tint)', borderRadius: '16px', padding: '16px', cursor: 'pointer' },
      onClick: () => actions.goGuide(),
    }, [
      el('div', {}, [
        el('div', { style: { font: "600 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, 'Not sure what "Emerging" means?'),
        el('div', { style: { font: "400 12.5px 'Nunito', sans-serif", color: 'var(--waldorf-fg)', marginTop: '2px' } }, 'Read our approaches guide'),
      ]),
      el('div', { style: { font: "700 16px 'Nunito', sans-serif", color: 'var(--waldorf-fg)' } }, '→'),
    ]),
    el('div', { style: { height: '16px' } }),
  ]);
}
