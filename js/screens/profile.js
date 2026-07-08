import { el } from '../utils.js';

export function renderProfile(vals, actions) {
  return el('div', { 'data-screen-label': 'Profile', class: 'screen', style: { padding: '26px 24px 10px' } }, [
    el('div', { style: { font: "700 26px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, 'Profile'),

    el('div', { style: { marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' } }, [
      el('div', { style: { width: '88px', height: '88px', borderRadius: '50%', background: vals.activeChildSwatch, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 28px 'Quicksand', sans-serif", color: 'var(--text-primary)' } },
        vals.activeChildPhotoURL ? [el('img', { src: vals.activeChildPhotoURL, style: { width: '100%', height: '100%', objectFit: 'cover' } })] : vals.activeChildInitial),
      el('div', { style: { textAlign: 'center' } }, [
        el('div', { style: { font: "700 20px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, vals.childName),
      ]),
      el('div', { style: { font: "600 13px 'Nunito', sans-serif", color: 'var(--sage)', cursor: 'pointer' }, onClick: () => actions.openSwitcher() }, 'Switch child ⌄'),
      el('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: '1px solid var(--card-border)', borderRadius: '14px', padding: '8px 10px', marginTop: '4px' } }, [
        el('div', { style: { width: '28px', height: '28px', flex: 'none', borderRadius: '9px', background: '#F6F1E4', color: 'var(--text-primary)', font: "700 15px 'Nunito', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }, onClick: () => actions.ageMinus() }, '–'),
        el('div', { style: { textAlign: 'center', minWidth: '130px' } }, [
          el('div', { style: { font: "600 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, vals.childAgeLabel),
          el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--sage)' } }, vals.childAgeStage),
        ]),
        el('div', { style: { width: '28px', height: '28px', flex: 'none', borderRadius: '9px', background: '#F6F1E4', color: 'var(--text-primary)', font: "700 15px 'Nunito', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }, onClick: () => actions.agePlus() }, '+'),
      ]),
    ]),

    el('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '24px' } }, [
      el('div', { class: 'section-label' }, 'Focus areas'),
      el('div', { style: { font: "600 12px 'Nunito', sans-serif", color: 'var(--sage)' } }, 'Tap to edit'),
    ]),
    el('div', { style: { font: "400 12.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)', marginTop: '2px' } }, "We'll surface activities for whichever areas you select."),
    el('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' } },
      vals.focusOptions.map((f) => el('div', {
        class: `pill${f.selected ? ' selected' : ''}`,
        style: { padding: '9px 16px', font: "600 13px 'Quicksand', sans-serif" },
        onClick: () => actions.toggleFocusArea(f.label),
      }, f.label))),

    el('div', { class: 'section-label', style: { marginTop: '24px' } }, 'Caregiver'),
    el('div', {
      style: { marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '14px', cursor: 'pointer' },
      onClick: () => actions.goEditCaregiver(),
    }, [
      el('div', { style: { width: '40px', height: '40px', borderRadius: '50%', background: 'var(--waldorf-2)', flex: 'none', overflow: 'hidden' } },
        vals.caregiverPhotoURL ? [el('img', { src: vals.caregiverPhotoURL, style: { width: '100%', height: '100%', objectFit: 'cover' } })] : null),
      el('div', { style: { flex: '1' } }, [
        el('div', { style: { font: "600 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, vals.caregiverName),
        el('div', { style: { font: "400 12px 'Nunito', sans-serif", color: 'var(--text-muted-2)' } }, `${vals.caregiverRole} · caregiver`),
      ]),
      el('div', { style: { font: "700 16px 'Nunito', sans-serif", color: 'var(--text-muted-5)' } }, '→'),
    ]),

    el('div', { class: 'section-label', style: { marginTop: '24px' } }, 'More'),
    el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' } }, [
      el('div', { class: 'card', style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '16px', padding: '14px 16px', cursor: 'pointer' }, onClick: () => actions.goNotes() }, [
        el('div', { style: { font: "600 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, 'Send a handoff note'),
        el('div', { style: { font: "700 16px 'Nunito', sans-serif", color: 'var(--text-muted-5)' } }, '→'),
      ]),
      el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--lavender-tint)', borderRadius: '16px', padding: '14px 16px', cursor: 'pointer' }, onClick: () => actions.goGuide() }, [
        el('div', {}, [
          el('div', { style: { font: "600 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, 'Montessori & Waldorf Guide'),
          el('div', { style: { font: "400 12px 'Nunito', sans-serif", color: 'var(--waldorf-fg)', marginTop: '2px' } }, 'Both methods explained, plus trusted resources'),
        ]),
        el('div', { style: { font: "700 16px 'Nunito', sans-serif", color: 'var(--waldorf-fg)' } }, '→'),
      ]),
    ]),
    el('div', { style: { marginTop: '28px', textAlign: 'center', font: "400 10.5px 'Nunito', sans-serif", color: 'var(--text-muted-5)' } }, [
      `© ${new Date().getFullYear()} Tin Roof Tek, LLC · `,
      el('a', { href: 'https://creativecommons.org/licenses/by-nc-sa/4.0/', target: '_blank', rel: 'noopener', style: { color: 'inherit' } }, 'CC BY-NC-SA 4.0'),
    ]),
    el('div', { style: { height: '16px' } }),
  ]);
}
