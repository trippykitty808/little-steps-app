import { el } from './utils.js';

export function renderChildSwitcher(vals, actions) {
  const overlay = el('div', { class: 'overlay', onClick: () => actions.closeSwitcher() });
  const sheet = el('div', { class: 'overlay-sheet', onClick: (e) => e.stopPropagation() }, [
    el('div', { style: { font: "700 12px 'Nunito', sans-serif", letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted-3)', padding: '2px 8px 10px' } }, 'Switch child'),
  ]);

  for (const c of vals.switcherChildren) {
    const row = el('div', {
      style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 8px', borderRadius: '14px', cursor: 'pointer', background: c.isActive ? '#F3EFE2' : 'transparent' },
      onClick: () => actions.switchChild(c.id),
    }, [
      el('div', { style: { width: '40px', height: '40px', borderRadius: '50%', background: c.swatch, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 15px 'Quicksand', sans-serif", color: 'var(--text-primary)', overflow: 'hidden' } },
        c.photoURL ? [el('img', { src: c.photoURL, style: { width: '100%', height: '100%', objectFit: 'cover' } })] : c.initial),
      el('div', { style: { flex: '1' } }, [
        el('div', { style: { font: "600 15px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, c.name),
        el('div', { style: { font: "400 12px 'Nunito', sans-serif", color: 'var(--text-muted-2)' } }, c.ageLabel),
      ]),
      c.isActive ? el('div', { style: { width: '22px', height: '22px', borderRadius: '50%', background: 'var(--sage)', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', font: "700 12px 'Nunito', sans-serif" } }, '✓') : null,
    ]);
    sheet.appendChild(row);
  }

  sheet.appendChild(el('div', {
    style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 8px', marginTop: '2px', borderRadius: '14px', cursor: 'pointer' },
    onClick: () => actions.addChild(),
  }, [
    el('div', { style: { width: '40px', height: '40px', borderRadius: '50%', background: '#F0EADA', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sage)', font: "700 18px 'Nunito', sans-serif" } }, '+'),
    el('div', { style: { font: "600 14px 'Quicksand', sans-serif", color: 'var(--sage)' } }, 'Add a child'),
  ]));

  overlay.appendChild(sheet);
  return overlay;
}
