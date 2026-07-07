import { el } from '../utils.js';

export function renderPrintPreview(vals, actions) {
  return el('div', { 'data-screen-label': 'Print Preview', class: 'screen', style: { padding: '26px 24px' } }, [
    el('button', { class: 'back-link', onClick: () => actions.backFromPrint() }, '← Back'),
    el('div', { 'data-print-area': true, style: { marginTop: '16px' } }, [
      el('div', { style: { font: "700 22px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, vals.printTitle),
      el('div', { style: { marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' } },
        vals.printItems.map((p) => el('div', { style: { borderBottom: '1px solid var(--card-border)', paddingBottom: '12px' } }, [
          el('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '10px' } }, [
            el('div', { style: { font: "600 15px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, p.title),
            el('div', { style: { font: "400 12px 'Nunito', sans-serif", color: 'var(--text-muted-2)', flex: 'none' } }, p.meta),
          ]),
          p.sub ? el('div', { style: { font: "400 13.5px/1.5 'Nunito', sans-serif", color: 'var(--text-body)', marginTop: '4px' } }, p.sub) : null,
        ]))),
    ]),
    el('div', { class: 'btn-primary', style: { marginTop: '24px' }, onClick: () => actions.doPrint() }, 'Print'),
  ]);
}
