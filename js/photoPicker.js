// Real photo picker — replaces the design prototype's design-tool-only
// <image-slot> placeholder. Renders a tappable slot that opens the phone's
// camera/photo library, shows an instant local preview, and reports the
// chosen File back to the caller (which uploads it to Firebase Storage).
import { el } from './utils.js';

export function renderPhotoPicker({ shape = 'rounded', previewUrl, uploading, placeholder = 'Add photo', onFile, style = {} }) {
  const slot = el('div', {
    class: `photo-slot ${shape}`,
    style: { position: 'relative', ...style },
  });

  if (previewUrl) {
    slot.appendChild(el('img', { src: previewUrl, alt: '' }));
  } else {
    slot.appendChild(el('div', {}, [
      el('div', { style: { fontSize: '22px', marginBottom: '4px' } }, '📷'),
      el('div', {}, placeholder),
    ]));
  }

  if (uploading) {
    slot.appendChild(el('div', { class: 'photo-slot-uploading' }, 'Uploading…'));
  }

  const input = el('input', {
    type: 'file',
    accept: 'image/*',
    capture: 'environment',
    onChange: (e) => {
      const file = e.target.files && e.target.files[0];
      if (file && onFile) onFile(file);
    },
  });
  slot.appendChild(input);

  return slot;
}
