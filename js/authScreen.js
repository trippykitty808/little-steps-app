import { el } from './utils.js';

const GOOGLE_G = `<svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.87-3.04.87-2.34 0-4.32-1.58-5.03-3.71H.95v2.33A8.997 8.997 0 009 18z"/><path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 013.68 9c0-.6.1-1.18.29-1.72V4.95H.95A9 9 0 000 9c0 1.45.35 2.83.95 4.05l3.02-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0A8.997 8.997 0 00.95 4.95l3.02 2.33C4.68 5.16 6.66 3.58 9 3.58z"/></svg>`;

export function renderAuthScreen(vals, actions, signIn) {
  return el('div', { 'data-screen-label': 'Sign in', class: 'auth-screen' }, [
    el('div', { style: { width: '88px', height: '88px', borderRadius: '26px', background: 'var(--sage-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 34px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, 'LS'),
    el('div', { style: { font: "700 34px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '6px' } }, 'Little Steps'),
    el('div', { style: { font: "400 16px/1.55 'Nunito', sans-serif", color: 'var(--text-muted-4)', maxWidth: '320px' } }, 'A gentle daily companion for grandparents, caregivers, and sitters following the Montessori and Waldorf ways.'),
    el('button', { class: 'google-btn', style: { marginTop: '18px' }, onClick: signIn, html: GOOGLE_G + '<span style="margin-left:4px">Sign in with Google</span>' }),
    vals.authError ? el('div', { style: { color: '#9C5A45', font: "500 13px 'Nunito', sans-serif" } }, vals.authError) : null,
    el('div', { style: { font: "400 12px 'Nunito', sans-serif", color: 'var(--text-muted-5)', marginTop: '10px' } }, 'Your child\'s info stays private to your account, synced securely across your devices.'),
  ]);
}
