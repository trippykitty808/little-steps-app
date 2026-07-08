import { el } from '../utils.js';
import { renderPhotoPicker } from '../photoPicker.js';

export function renderSetupCaregiver(vals, actions) {
  const draft = vals.caregiverDraft;
  const isEdit = vals.caregiverFlowFrom === 'profile';
  return el('div', { 'data-screen-label': 'Setup — Caregiver', class: 'screen', style: { padding: '28px 26px 26px' } }, [
    el('button', { class: 'back-link', onClick: () => actions.backFromSetupCaregiver() }, '← Back'),
    el('div', { style: { font: "700 26px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '16px' } }, 'And a little about you'),
    el('div', { style: { font: "400 14px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '6px' } }, "So the family knows who's sharing updates."),

    el('div', { style: { display: 'flex', justifyContent: 'center', marginTop: '24px' } }, [
      renderPhotoPicker({
        shape: 'circle', previewUrl: draft.previewUrl, uploading: draft.uploading, placeholder: 'Add photo',
        style: { width: '96px', height: '96px' },
        onFile: (file) => actions.onCaregiverDraftPhotoFile(file),
      }),
    ]),

    el('div', { style: { marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' } }, [
      el('div', {}, [
        el('div', { class: 'field-label' }, 'Your name'),
        el('input', { class: 'text-input', value: draft.name, onInput: (e) => actions.onCaregiverDraftNameChange(e) }),
      ]),
      el('div', {}, [
        el('div', { class: 'field-label' }, 'Your relationship'),
        el('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '10px' } },
          vals.roleOptions.map((label) => el('div', {
            class: `pill${draft.role === label ? ' selected' : ''}`,
            onClick: () => actions.setCaregiverDraftRole(label),
          }, label))),
        draft.role === 'Other' ? el('input', {
          class: 'text-input', style: { marginTop: '10px' },
          placeholder: 'e.g. Aunt, family friend, godparent',
          value: draft.customRole || '',
          onInput: (e) => actions.onCaregiverCustomRoleChange(e),
        }) : null,
      ]),
    ]),

    el('div', { class: 'btn-primary', style: { marginTop: 'auto', paddingTop: '28px' }, onClick: () => actions.continueFromSetupCaregiver() }, isEdit ? 'Save' : 'Continue'),
  ]);
}
