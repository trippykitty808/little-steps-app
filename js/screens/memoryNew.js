import { el } from '../utils.js';
import { renderPhotoPicker } from '../photoPicker.js';

export function renderMemoryNew(vals, actions) {
  return el('div', { 'data-screen-label': 'Memory New', class: 'screen', style: { padding: '26px 24px' } }, [
    el('button', { class: 'back-link', onClick: () => actions.goScrapbookMemories() }, '← Back'),
    el('div', { style: { font: "700 26px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '16px' } }, 'Add a memory'),
    el('div', { style: { font: "400 14px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '6px' } }, "A photo and a line about what happened — that's all it takes."),

    el('div', { style: { marginTop: '20px' } }, [
      renderPhotoPicker({
        shape: 'rounded', previewUrl: vals.newMemoryPhoto.previewUrl, uploading: vals.newMemoryPhoto.uploading,
        placeholder: 'Add photo', style: { width: '100%', aspectRatio: '1.3' },
        onFile: (file) => actions.onNewMemoryPhotoFile(file),
      }),
    ]),

    el('div', { style: { marginTop: '18px' } }, [
      el('div', { class: 'field-label' }, 'What happened'),
      el('textarea', { class: 'text-area', placeholder: 'Théo noticed the first snail of spring...', onInput: (e) => actions.onNewMemoryCaptionChange(e) }, vals.newMemoryCaption),
    ]),

    el('div', { class: 'btn-primary', style: { marginTop: 'auto', paddingTop: '24px' }, onClick: () => actions.saveMemory() }, 'Save to scrapbook'),
  ]);
}
