import { el } from '../utils.js';

export function renderSetupFocus(vals, actions) {
  return el('div', { 'data-screen-label': 'Setup — Focus', class: 'screen', style: { padding: '28px 26px 26px' } }, [
    el('button', { class: 'back-link', onClick: () => actions.goSetupCaregiver() }, '← Back'),
    el('div', { style: { font: "700 26px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '16px' } }, 'Which skill areas matter most right now?'),
    el('div', { style: { font: "400 14px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '6px' } }, "Pick a few developmental areas — we'll surface activities for these first."),

    el('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '22px' } },
      vals.draftFocusOptions.map((f) => el('div', {
        class: `pill${f.selected ? ' selected' : ''}`,
        style: { padding: '11px 18px', font: "600 14px 'Quicksand', sans-serif" },
        onClick: () => actions.toggleDraftFocus(f.label),
      }, f.label))),

    el('div', { class: 'btn-primary', style: { marginTop: 'auto', paddingTop: '28px' }, onClick: () => actions.finishSetup() }, 'Finish setup'),
  ]);
}
