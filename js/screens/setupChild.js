import { el, monthsToLabel, stageForMonths } from '../utils.js';
import { renderPhotoPicker } from '../photoPicker.js';

export function renderSetupChild(vals, actions) {
  const draft = vals.draftChild;
  return el('div', { 'data-screen-label': 'Setup — Child', class: 'screen', style: { padding: '28px 26px 26px' } }, [
    el('button', { class: 'back-link', onClick: () => actions.backFromSetupChild() }, '← Back'),
    el('div', { style: { font: "700 26px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '16px' } }, 'Tell us about your little one'),
    el('div', { style: { font: "400 14px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '6px' } }, "We'll tailor activities and milestones to their age."),

    el('div', { style: { display: 'flex', justifyContent: 'center', marginTop: '24px' } }, [
      renderPhotoPicker({
        shape: 'circle', previewUrl: draft.previewUrl, uploading: draft.uploading, placeholder: 'Add photo',
        style: { width: '96px', height: '96px' },
        onFile: (file) => actions.onDraftChildPhotoFile(file),
      }),
    ]),

    el('div', { style: { marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' } }, [
      el('div', {}, [
        el('div', { class: 'field-label' }, "Child's name"),
        el('input', { class: 'text-input', value: draft.name, onInput: (e) => actions.onDraftChildNameChange(e) }),
      ]),
      el('div', {}, [
        el('div', { class: 'field-label' }, 'Age'),
        el('div', { style: { display: 'flex', alignItems: 'center', gap: '14px', background: '#fff', border: '1px solid var(--card-border)', borderRadius: '14px', padding: '10px 14px' } }, [
          el('div', { style: { width: '34px', height: '34px', flex: 'none', borderRadius: '10px', background: '#F6F1E4', color: 'var(--text-primary)', font: "700 18px 'Nunito', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }, onClick: () => actions.draftAgeMinus() }, '–'),
          el('div', { style: { flex: '1', textAlign: 'center' } }, [
            el('div', { style: { font: "600 16px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, monthsToLabel(draft.ageMonths)),
            el('div', { style: { font: "400 12px 'Nunito', sans-serif", color: 'var(--sage)', marginTop: '1px' } }, stageForMonths(draft.ageMonths)),
          ]),
          el('div', { style: { width: '34px', height: '34px', flex: 'none', borderRadius: '10px', background: '#F6F1E4', color: 'var(--text-primary)', font: "700 18px 'Nunito', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }, onClick: () => actions.draftAgePlus() }, '+'),
        ]),
      ]),
    ]),

    el('div', { class: 'btn-primary', style: { marginTop: 'auto', paddingTop: '28px' }, onClick: () => actions.goSetupCaregiver() }, 'Continue'),
  ]);
}
