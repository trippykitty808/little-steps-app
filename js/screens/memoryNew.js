import { el } from '../utils.js';

// Renders one already-added media thumbnail (photo or video), with a remove
// button, an uploading overlay, and a small "video" marker.
function renderMediaThumb(m, actions) {
  const inner = [];
  if (m.type === 'video') {
    inner.push(el('video', { src: m.previewUrl, muted: true, playsinline: true, preload: 'metadata', style: { width: '100%', height: '100%', objectFit: 'cover' } }));
    inner.push(el('div', { style: { position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }, html: '<div style="width:26px;height:26px;border-radius:50%;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center"><svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></div>' }));
  } else {
    inner.push(el('img', { src: m.previewUrl, alt: '', style: { width: '100%', height: '100%', objectFit: 'cover' } }));
  }
  if (m.uploading) {
    inner.push(el('div', { style: { position: 'absolute', inset: '0', background: 'rgba(255,255,255,.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 10px 'Nunito', sans-serif", color: 'var(--text-primary)' } }, 'Uploading…'));
  }
  if (m.error) {
    inner.push(el('div', { style: { position: 'absolute', inset: '0', background: 'rgba(156,90,69,.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 10px 'Nunito', sans-serif", color: '#fff' } }, 'Failed'));
  }
  inner.push(el('div', {
    style: { position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(67,65,75,.8)', color: '#fff', font: "700 12px 'Nunito', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', lineHeight: '1' },
    onClick: (e) => { e.stopPropagation(); actions.removeNewMemoryMedia(m.localId); },
  }, '×'));
  return el('div', { style: { position: 'relative', aspectRatio: '1', borderRadius: '12px', overflow: 'hidden', background: '#F8F4EA', border: '1px solid var(--card-border)' } }, inner);
}

export function renderMemoryNew(vals, actions) {
  const editing = vals.memoryEditing;
  const back = () => {
    if (editing && vals.selectedMemory) actions.openMemory(vals.selectedMemory.id);
    else actions.goScrapbookMemories();
  };

  const mediaTiles = vals.newMemoryMedia.map((m) => renderMediaThumb(m, actions));

  // The "add" tile (hidden once the max is reached)
  if (!vals.memoryMediaFull) {
    const addTile = el('div', { class: 'photo-slot rounded', style: { position: 'relative', aspectRatio: '1' } }, [
      el('div', {}, [
        el('div', { style: { fontSize: '20px', marginBottom: '2px' } }, '＋'),
        el('div', { style: { font: "500 11px 'Nunito', sans-serif" } }, 'Photo or video'),
      ]),
    ]);
    addTile.appendChild(el('input', {
      type: 'file', accept: 'image/*,video/*',
      onChange: (e) => { const f = e.target.files && e.target.files[0]; if (f) actions.addNewMemoryMediaFile(f); e.target.value = ''; },
    }));
    mediaTiles.push(addTile);
  }

  return el('div', { 'data-screen-label': 'Memory New', class: 'screen', style: { padding: '26px 24px' } }, [
    el('button', { class: 'back-link', onClick: back }, '← Back'),
    el('div', { style: { font: "700 26px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '16px' } }, editing ? 'Edit memory' : 'Add a memory'),
    el('div', { style: { font: "400 14px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '6px' } }, 'Add as many photos and short videos as you like, a date, and a few words about the moment.'),

    el('div', { class: 'field-label', style: { marginTop: '20px' } }, 'Photos & videos'),
    el('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '8px' } }, mediaTiles),
    vals.mediaError ? el('div', { style: { font: "500 12px/1.5 'Nunito', sans-serif", color: '#9C5A45', marginTop: '8px' } }, vals.mediaError) : null,
    el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-5)', marginTop: '8px' } }, 'Videos up to 60 seconds. Tap a tile’s × to remove it.'),

    el('div', { class: 'field-label', style: { marginTop: '20px' } }, 'Date'),
    el('input', {
      type: 'date', class: 'text-input', style: { font: "600 15px 'Quicksand', sans-serif" },
      value: vals.newMemoryDate || '',
      onChange: (e) => actions.onNewMemoryDateChange(e),
    }),

    el('div', { class: 'field-label', style: { marginTop: '18px' } }, 'What happened'),
    el('textarea', { class: 'text-area', placeholder: 'Théo noticed the first snail of spring...', onInput: (e) => actions.onNewMemoryCaptionChange(e) }, vals.newMemoryCaption),

    el('div', {
      class: 'btn-primary',
      style: Object.assign({ marginTop: 'auto', paddingTop: '24px' }, vals.newMemoryUploading ? { opacity: '.55', pointerEvents: 'none' } : {}),
      onClick: () => { if (!vals.newMemoryUploading) actions.saveMemory(); },
    }, vals.newMemoryUploading ? 'Waiting for uploads…' : (editing ? 'Save changes' : 'Save to scrapbook')),
  ]);
}
