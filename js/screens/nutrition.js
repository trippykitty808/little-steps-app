import { el } from '../utils.js';

export function renderNutrition(vals, actions) {
  const c = vals.nutritionContent;

  return el('div', { 'data-screen-label': 'Nutrition', class: 'screen', style: { padding: '26px 24px 10px' } }, [
    el('button', { class: 'back-link', onClick: () => actions.goProfile() }, '← Profile'),
    el('div', { style: { font: "700 26px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '14px' } }, 'Nutrition'),
    el('div', { style: { font: "400 14px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '6px' } }, `What ${vals.childName}'s brain and body need at each stage — a whole-food, plant-based lens.`),

    // Prominent educational-not-medical disclaimer
    el('div', { style: { marginTop: '16px', background: 'var(--montessori)', borderRadius: '16px', padding: '14px 16px' } }, [
      el('div', { style: { font: "700 11px 'Nunito', sans-serif", letterSpacing: '.06em', textTransform: 'uppercase', color: '#9C5A45', marginBottom: '5px' } }, 'Please read'),
      el('div', { style: { font: "400 12.5px/1.55 'Nunito', sans-serif", color: 'var(--text-body)' } }, vals.nutritionDisclaimer),
    ]),

    // Stage picker
    el('div', { class: 'section-label', style: { marginTop: '22px' } }, 'Developmental stage'),
    el('div', { style: { display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' } },
      vals.nutritionStageOptions.map((o) => el('div', {
        class: `pill${o.active ? ' selected' : ''}`,
        style: { padding: '8px 15px', font: "600 12.5px 'Quicksand', sans-serif" },
        onClick: () => actions.setNutritionStage(o.key),
      }, o.isChildStage ? `${o.key} ★` : o.key))),
    el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-5)', marginTop: '6px' } }, `★ marks ${vals.childName}'s current stage.`),

    // Stage content
    c ? el('div', { style: { marginTop: '18px' } }, [
      el('div', { class: 'card', style: { borderRadius: '18px', padding: '18px' } }, [
        el('div', { style: { font: "600 11px 'Nunito', sans-serif", letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted-3)' } }, `${c.stage} · ${c.ageLabel}`),
        el('div', { style: { font: "700 19px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '6px', lineHeight: '1.3' } }, c.headline),
        el('div', { style: { font: "400 14px/1.6 'Nunito', sans-serif", color: 'var(--text-body)', marginTop: '10px' } }, c.brainBody),
      ]),

      el('div', { class: 'section-label', style: { marginTop: '20px' } }, 'Key nutrients now'),
      el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' } },
        c.keyNutrients.map((n) => el('div', { class: 'card', style: { borderRadius: '14px', padding: '14px' } }, [
          el('div', { style: { font: "700 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, n.name),
          el('div', { style: { font: "400 13px/1.5 'Nunito', sans-serif", color: 'var(--text-body)', marginTop: '4px' } }, n.why),
          el('div', { style: { font: "600 12.5px/1.5 'Nunito', sans-serif", color: 'var(--sage-tint-fg)', marginTop: '6px' } }, `Plant sources: ${n.plantSources}`),
        ]))),

      el('div', { style: { marginTop: '16px', background: 'var(--lavender-tint)', borderRadius: '16px', padding: '16px' } }, [
        el('div', { style: { font: "700 12px 'Nunito', sans-serif", letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--waldorf-fg)', marginBottom: '6px' } }, 'Plant-based note'),
        el('div', { style: { font: "400 13px/1.6 'Nunito', sans-serif", color: 'var(--text-body)' } }, c.plantBasedNote),
      ]),

      el('div', { class: 'section-label', style: { marginTop: '20px' } }, 'Food ideas'),
      el('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' } },
        c.foodIdeas.map((f) => el('div', { style: { background: '#F6F1E4', color: 'var(--text-muted-4)', font: "500 13px 'Nunito', sans-serif", padding: '8px 12px', borderRadius: '14px' } }, f))),

      el('div', { style: { marginTop: '16px', background: 'var(--tough-bg)', borderRadius: '16px', padding: '16px' } }, [
        el('div', { style: { font: "700 12px 'Nunito', sans-serif", letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--tough-fg)', marginBottom: '6px' } }, 'Safety at this stage'),
        el('div', { style: { font: "400 13px/1.6 'Nunito', sans-serif", color: 'var(--text-body)' } }, c.safety),
      ]),
    ]) : null,

    // Plant-based essentials reference
    el('div', { class: 'section-label', style: { marginTop: '24px' } }, 'Plant-based essentials to watch'),
    el('div', { style: { font: "400 12.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)', marginTop: '2px' } }, 'The nutrients worth keeping an eye on at every stage.'),
    el('div', { class: 'card', style: { marginTop: '10px', borderRadius: '18px', padding: '6px 16px' } },
      vals.nutritionEssentials.map((n, i) => el('div', { style: { padding: '12px 0', borderBottom: i < vals.nutritionEssentials.length - 1 ? '1px solid var(--divider)' : 'none' } }, [
        el('div', { style: { font: "700 13.5px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, n.name),
        el('div', { style: { font: "400 12.5px/1.5 'Nunito', sans-serif", color: 'var(--text-body)', marginTop: '3px' } }, n.note),
      ]))),

    // Sources
    el('div', { class: 'section-label', style: { marginTop: '24px' } }, 'Trusted sources'),
    el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' } },
      vals.nutritionSources.map((r) => el('a', { href: r.url, target: '_blank', rel: 'noopener', class: 'card', style: { display: 'block', borderRadius: '14px', padding: '13px 16px' } }, [
        el('div', { style: { font: "600 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, r.name),
        el('div', { style: { font: "400 12.5px 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '2px' } }, r.desc),
      ]))),

    el('div', { style: { font: "400 11.5px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-5)', marginTop: '16px', textAlign: 'center' } }, 'Educational content, pending review by a registered pediatric dietitian.'),
    el('div', { style: { height: '16px' } }),
  ]);
}
