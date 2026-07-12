import { el } from '../utils.js';

function renderMediaItem(m, single) {
  const common = { width: '100%', display: 'block', background: '#F8F4EA' };
  if (m.type === 'video') {
    return el('video', {
      src: m.url, controls: true, playsinline: true, preload: 'metadata',
      style: Object.assign({}, common, single ? { maxHeight: '70vh' } : { width: '86vw', maxWidth: '360px', borderRadius: '16px', scrollSnapAlign: 'center' }),
    });
  }
  return el('img', {
    src: m.url, alt: '',
    style: Object.assign({}, common, single ? { objectFit: 'cover' } : { width: '86vw', maxWidth: '360px', aspectRatio: '1', objectFit: 'cover', borderRadius: '16px', scrollSnapAlign: 'center' }),
  });
}

export function renderMemoryDetail(vals, actions) {
  const m = vals.selectedMemory;
  const media = (m && m.media) || [];
  const single = media.length === 1;

  let mediaArea;
  if (media.length === 0) {
    mediaArea = el('div', { style: { width: '100%', aspectRatio: '1.1', background: '#F8F4EA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted-2)' } }, '📷 No photo or video yet');
  } else if (single) {
    mediaArea = renderMediaItem(media[0], true);
  } else {
    mediaArea = el('div', {
      style: { display: 'flex', gap: '10px', overflowX: 'auto', scrollSnapType: 'x mandatory', padding: '0 24px', WebkitOverflowScrolling: 'touch' },
    }, media.map((mi) => renderMediaItem(mi, false)));
  }

  return el('div', { 'data-screen-label': 'Memory Detail', class: 'screen' }, [
    // Full-bleed for a single item; padded carousel for multiple
    single || media.length === 0
      ? el('div', { style: { flex: 'none' } }, [mediaArea])
      : el('div', { style: { flex: 'none', paddingTop: '16px' } }, [mediaArea]),

    el('div', { style: { padding: '20px 24px 24px' } }, [
      el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' } }, [
        el('button', { class: 'back-link', onClick: () => actions.goScrapbookMemories() }, '← Scrapbook'),
        el('div', { style: { font: "600 13.5px 'Quicksand', sans-serif", color: 'var(--sage)', cursor: 'pointer' }, onClick: () => actions.editMemory(m.id) }, 'Edit'),
      ]),
      media.length > 1 ? el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-5)', marginBottom: '10px' } }, `${media.length} photos & videos — swipe to see them all`) : null,
      el('div', { style: { font: "600 20px 'Quicksand', sans-serif", color: 'var(--text-primary)', lineHeight: '1.35' } }, m.caption),
      el('div', { style: { font: "400 13px 'Nunito', sans-serif", color: 'var(--text-muted-2)', marginTop: '8px' } }, m.date),
      m.tag ? el('div', { style: { display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '14px', font: "600 12px 'Nunito', sans-serif", background: 'var(--lavender-tint)', color: 'var(--waldorf-fg)', padding: '6px 14px', borderRadius: '100px' }, html: m.hasIcon ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none">${m.iconHtmlDark}</svg><span>${m.tag}</span>` : `<span>${m.tag}</span>` }) : null,
      m.hasIcon ? el('div', { class: 'section-label', style: { marginTop: '22px' } }, 'Learn more') : null,
      m.hasIcon ? el('div', { style: { marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' } },
        m.resources.map((r) => el('a', { href: r.url, target: '_blank', rel: 'noopener', style: { display: 'block', background: '#F6F1E4', borderRadius: '12px', padding: '11px 14px' } }, [
          el('div', { style: { font: "600 13px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, r.name),
          el('div', { style: { font: "400 12px 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '2px' } }, r.desc),
        ]))) : null,
    ]),
  ]);
}
