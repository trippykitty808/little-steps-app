import { el } from '../utils.js';
import { renderPhotoPicker } from '../photoPicker.js';

export function renderLogActivity(vals, actions) {
  const a = vals.selectedActivity;
  return el('div', { 'data-screen-label': 'Log Activity', class: 'screen', style: { padding: '26px 24px 26px' } }, [
    el('button', { class: 'back-link', onClick: () => actions.goActivityDetailFromLog() }, '← Back'),
    el('div', { style: { font: "700 24px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '16px' } }, `Log ${a.name}`),
    el('div', { style: { font: "400 14px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '6px' } }, `A note and a photo of ${vals.childName}'s creation both help family see how it went — both optional.`),

    el('div', { style: { marginTop: '20px' } }, [
      el('div', { class: 'field-label' }, 'Photo (optional)'),
      renderPhotoPicker({
        shape: 'rounded', previewUrl: vals.logPhoto.previewUrl, uploading: vals.logPhoto.uploading,
        placeholder: 'Add a photo of their creation', style: { width: '100%', aspectRatio: '1.3' },
        onFile: (file) => actions.onLogPhotoFile(file),
      }),
    ]),

    el('div', { style: { marginTop: '18px' } }, [
      el('div', { class: 'field-label' }, 'Note (optional)'),
      el('textarea', { class: 'text-area', placeholder: 'How did it go?', onInput: (e) => actions.onLogNoteChange(e) }, vals.logNoteText),
    ]),

    el('div', { class: 'btn-primary', style: { marginTop: 'auto', paddingTop: '24px' }, onClick: () => actions.saveActivityLog() }, "Save to today's log"),
  ]);
}
