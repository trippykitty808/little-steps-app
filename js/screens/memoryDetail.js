import { el } from '../utils.js';

export function renderMemoryDetail(vals, actions) {
  const m = vals.selectedMemory;
  return el('div', { 'data-screen-label': 'Memory Detail', class: 'screen' }, [
    el('div', { style: { width: '100%', aspectRatio: '1.1', background: '#F8F4EA', flex: 'none' } },
      m.photoURL ? [el('img', { src: m.photoURL, style: { width: '100%', height: '100%', objectFit: 'cover' } })] : [el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted-2)' } }, '📷 No photo')]),
    el('div', { style: { padding: '24px' } }, [
      el('button', { class: 'back-link', style: { marginBottom: '14px' }, onClick: () => actions.goScrapbookMemories() }, '← Scrapbook'),
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
