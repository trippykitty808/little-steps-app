import { el } from '../utils.js';

export function renderGuide(vals, actions) {
  return el('div', { 'data-screen-label': 'Guide', class: 'screen', style: { padding: '26px 24px 10px' } }, [
    el('button', { class: 'back-link', onClick: () => actions.goProfile() }, '← Profile'),
    el('div', { style: { font: "700 26px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '14px' } }, 'Approaches Guide'),
    el('div', { style: { font: "400 14px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '6px' } }, 'Three gentle philosophies, and how we use them here — for caregivers new to any of them.'),

    el('div', { style: { marginTop: '20px', background: 'var(--montessori)', borderRadius: '18px', padding: '18px' } }, [
      el('div', { style: { font: "700 16px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, 'Montessori'),
      el('div', { style: { font: "400 13.5px/1.6 'Nunito', sans-serif", color: 'var(--text-body)', marginTop: '8px' } }, 'Founded by Dr. Maria Montessori, this approach trusts children to lead their own learning inside a "prepared environment" — real, child-sized tools they can use with growing independence. Practical life tasks (pouring, dressing, cleaning) and hands-on sensorial materials build concentration, coordination, and confidence at the child\'s own pace.'),
    ]),

    el('div', { style: { marginTop: '14px', background: 'var(--waldorf-2)', borderRadius: '18px', padding: '18px' } }, [
      el('div', { style: { font: "700 16px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, 'Waldorf'),
      el('div', { style: { font: "400 13.5px/1.6 'Nunito', sans-serif", color: 'var(--text-body)', marginTop: '8px' } }, 'Founded by Rudolf Steiner, Waldorf education leans on rhythm, imagination, nature, and art rather than early academics. Predictable daily and seasonal rituals — a nature table, a circle-time verse, a seasonal walk — give young children a sense of security, while storytelling, handwork, and outdoor play nourish imagination before formal instruction begins.'),
    ]),

    el('div', { style: { marginTop: '14px', background: '#DDE7CE', borderRadius: '18px', padding: '18px' } }, [
      el('div', { style: { font: "700 16px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, 'Forest School'),
      el('div', { style: { font: "400 13.5px/1.6 'Nunito', sans-serif", color: 'var(--text-body)', marginTop: '8px' } }, 'Rooted in Scandinavian outdoor traditions, Forest School gives children regular, all-weather time in a natural space to explore in their own way. Learning follows the child and the seasons — building dens, mixing mud, hunting for minibeasts — and gently includes manageable risk, like balancing on a log, to build confidence, resilience, and a lifelong bond with nature.'),
    ]),

    el('div', { class: 'section-label', style: { marginTop: '22px' } }, 'How we label milestones'),
    el('div', { class: 'card', style: { marginTop: '10px', borderRadius: '18px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' } }, [
      el('div', {}, [
        el('div', { style: { font: "700 11px 'Nunito', sans-serif", letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--waldorf-fg)' } }, 'Not yet'),
        el('div', { style: { font: "400 13px/1.5 'Nunito', sans-serif", color: 'var(--text-body)', marginTop: '3px' } }, "The skill hasn't shown up consistently — completely normal, especially before the typical age window."),
      ]),
      el('div', {}, [
        el('div', { style: { font: "700 11px 'Nunito', sans-serif", letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--amber-fg)' } }, 'Emerging'),
        el('div', { style: { font: "400 13px/1.5 'Nunito', sans-serif", color: 'var(--text-body)', marginTop: '3px' } }, "Your child is starting to show the skill, but it's inconsistent or needs support — a good one to practice together."),
      ]),
      el('div', {}, [
        el('div', { style: { font: "700 11px 'Nunito', sans-serif", letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--sage-tint-fg)' } }, 'Achieved'),
        el('div', { style: { font: "400 13px/1.5 'Nunito', sans-serif", color: 'var(--text-body)', marginTop: '3px' } }, 'The skill shows up reliably and independently, most of the time.'),
      ]),
      el('div', { style: { font: "400 12.5px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-2)', borderTop: '1px solid var(--divider)', paddingTop: '10px' } }, "Ranges are guides, not deadlines — children vary widely. If you have concerns about your child's development, talk with their pediatrician."),
    ]),

    el('div', { class: 'section-label', style: { marginTop: '22px' } }, 'Trusted resources'),
    el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' } },
      vals.guideResources.map((r) => el('a', { href: r.url, target: '_blank', rel: 'noopener', class: 'card', style: { display: 'block', borderRadius: '14px', padding: '13px 16px' } }, [
        el('div', { style: { font: "600 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, r.name),
        el('div', { style: { font: "400 12.5px 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '2px' } }, r.desc),
      ]))),

    el('div', { class: 'section-label', style: { marginTop: '22px' } }, 'Keep learning'),
    el('div', { style: { font: "400 12.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)', marginTop: '2px' } }, 'Podcasts, blogs, and channels caregivers often turn to.'),
    el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' } },
      vals.guideMedia.map((r) => el('a', { href: r.url, target: '_blank', rel: 'noopener', class: 'card', style: { display: 'block', borderRadius: '14px', padding: '13px 16px' } }, [
        el('div', { style: { font: "600 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, r.name),
        el('div', { style: { font: "400 12.5px 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '2px' } }, r.desc),
      ]))),
    el('div', { style: { height: '16px' } }),
  ]);
}
