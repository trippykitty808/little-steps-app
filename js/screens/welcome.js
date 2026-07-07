import { el } from '../utils.js';

export function renderWelcome(vals, actions) {
  return el('div', { 'data-screen-label': 'Welcome', class: 'screen', style: { alignItems: 'center', justifyContent: 'center', padding: '48px 36px', textAlign: 'center', gap: '18px' } }, [
    el('div', { style: { width: '88px', height: '88px', borderRadius: '26px', background: 'var(--sage-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 34px 'Quicksand', sans-serif", color: 'var(--text-primary)', margin: '0 auto' } }, 'LS'),
    el('div', { style: { font: "700 34px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '18px' } }, 'Little Steps'),
    el('div', { style: { font: "400 16px/1.55 'Nunito', sans-serif", color: 'var(--text-muted-4)', maxWidth: '320px', margin: '10px auto 0' } }, 'A gentle daily companion for grandparents, caregivers, and sitters following the Montessori and Waldorf ways.'),
    el('div', { class: 'btn-primary', style: { marginTop: '18px' }, onClick: () => actions.goSetupChild() }, 'Get started'),
  ]);
}
