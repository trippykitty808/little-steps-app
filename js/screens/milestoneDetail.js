import { el } from '../utils.js';

export function renderMilestoneDetail(vals, actions) {
  const m = vals.selectedMilestone;
  return el('div', { 'data-screen-label': 'Milestone Detail', class: 'screen', style: { padding: '26px 24px' } }, [
    el('button', { class: 'back-link', onClick: () => actions.milestoneBackHandler() }, `← ${vals.milestoneBackLabel}`),
    el('div', { style: { marginTop: '18px', display: 'flex', alignItems: 'center', gap: '8px' } }, [
      el('div', { style: { width: '8px', height: '8px', borderRadius: '50%', background: m.color } }),
      el('div', { style: { font: "600 12px 'Nunito', sans-serif", letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted-3)' } }, m.domain),
    ]),
    el('div', { style: { font: "700 24px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '8px' } }, m.title),
    el('div', { style: { marginTop: '10px', display: 'inline-block', font: "600 12px 'Nunito', sans-serif", padding: '5px 12px', borderRadius: '100px', background: m.badgeBg, color: m.badgeFg, width: 'fit-content' } }, m.statusLabel),

    el('div', { class: 'card', style: { marginTop: '18px', borderRadius: '18px', padding: '16px' } }, [
      el('div', { class: 'section-label', style: { marginBottom: '10px' } }, 'Update status'),
      el('div', { style: { display: 'flex', gap: '8px' } },
        m.statusOptions.map((op) => el('div', {
          style: { flex: '1', textAlign: 'center', padding: '10px 6px', borderRadius: '12px', cursor: 'pointer', font: "600 12.5px 'Quicksand', sans-serif", background: op.bg, color: op.fg, border: `1.5px solid ${op.active ? op.bg : 'var(--card-border)'}` },
          onClick: () => actions.setMilestoneStatus(m.key, op.key),
        }, op.label))),
    ]),

    el('div', { class: 'card', style: { marginTop: '22px', borderRadius: '18px', padding: '18px' } }, [
      el('div', { class: 'section-label' }, 'Notes'),
      el('textarea', {
        class: 'text-area', style: { marginTop: '8px', background: 'var(--input-bg)', minHeight: '70px' },
        placeholder: 'What have you noticed?',
        onInput: (e) => actions.onMilestoneNoteInput(m.key, e.target.value),
        onBlur: (e) => actions.onMilestoneNoteBlur(m.key, e.target.value),
      }, m.note || ''),
    ]),

    el('div', { style: { marginTop: '14px', background: '#F6F1E4', borderRadius: '18px', padding: '18px' } }, [
      el('div', { class: 'section-label' }, 'Why this matters'),
      el('div', { style: { font: "400 14px/1.55 'Nunito', sans-serif", color: 'var(--text-body)', marginTop: '8px' } }, m.rationale),
    ]),

    el('div', { class: 'card', style: { marginTop: '14px', borderRadius: '18px', padding: '18px' } }, [
      el('div', { class: 'section-label' }, 'How we tell the difference'),
      el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' } },
        m.criteriaRows.map((c) => el('div', { style: { display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px', borderRadius: '12px', background: c.rowBg } }, [
          el('div', { style: { flex: 'none', font: "700 10.5px 'Nunito', sans-serif", letterSpacing: '.04em', textTransform: 'uppercase', color: c.labelColor, width: '66px', paddingTop: '1px' } }, c.label),
          el('div', { style: { font: "400 13px/1.5 'Nunito', sans-serif", color: 'var(--text-body)' } }, c.text),
        ]))),
    ]),

    m.isEmergingOrLater ? el('div', { class: 'card', style: { marginTop: '14px', borderRadius: '18px', padding: '18px' } }, [
      el('div', { class: 'section-label' }, 'Emerging since'),
      el('input', {
        class: 'text-input', style: { marginTop: '8px', background: 'var(--input-bg)', font: "600 15px 'Quicksand', sans-serif" },
        value: m.emergingDate || '', placeholder: 'e.g. June 1',
        onInput: (e) => actions.onMilestoneEmergingDateInput(m.key, e.target.value),
        onBlur: (e) => actions.onMilestoneEmergingDateBlur(m.key, e.target.value),
      }),
    ]) : null,

    m.isAchieved ? el('div', { class: 'card', style: { marginTop: '14px', borderRadius: '18px', padding: '18px' } }, [
      el('div', { class: 'section-label' }, 'Date achieved'),
      el('input', {
        class: 'text-input', style: { marginTop: '8px', background: 'var(--input-bg)', font: "600 15px 'Quicksand', sans-serif" },
        value: m.achievedDate || '', placeholder: 'e.g. June 12',
        onInput: (e) => actions.onMilestoneAchievedDateInput(m.key, e.target.value),
        onBlur: (e) => actions.onMilestoneAchievedDateBlur(m.key, e.target.value),
      }),
    ]) : null,

    el('div', {
      style: { marginTop: '14px', width: '100%', background: '#fff', border: '1.5px solid var(--sage)', color: '#4B6B3F', font: "600 15px 'Quicksand', sans-serif", textAlign: 'center', padding: '13px', borderRadius: '14px', cursor: 'pointer' },
      onClick: () => actions.shareMilestoneInNote(m.key),
    }, 'Share in a handoff note'),

    el('div', {
      style: { marginTop: '16px', width: '100%', color: 'var(--text-muted-1)', font: "600 14px 'Quicksand', sans-serif", textAlign: 'center', paddingBottom: '8px', cursor: 'pointer' },
      onClick: () => actions.milestoneBackHandler(),
    }, 'Done'),
  ]);
}
