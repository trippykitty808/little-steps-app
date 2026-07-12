import { el } from '../utils.js';

function ageLabel(r) {
  const f = (m) => (m < 12 ? `${m} months` : `${(m / 12) % 1 === 0 ? m / 12 : (m / 12).toFixed(1)} years`);
  return `From ${f(r.ageMin)}`;
}

export function renderRecipeDetail(vals, actions) {
  const r = vals.selectedRecipe;
  return el('div', { 'data-screen-label': 'Recipe Detail', class: 'screen' }, [
    el('div', { style: { height: '150px', background: r.color, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '68px' } }, r.emoji),
    el('div', { style: { padding: '24px', marginTop: '-16px' } }, [
      el('div', { style: { display: 'inline-block', font: "600 13.5px 'Nunito', sans-serif", color: 'var(--text-primary)', background: 'rgba(255,255,255,.6)', padding: '7px 14px', borderRadius: '100px', cursor: 'pointer', marginBottom: '8px' }, onClick: () => actions.backFromRecipe() }, '← Recipes'),
      el('div', { class: 'card', style: { borderRadius: '20px', padding: '22px', boxShadow: '0 12px 30px -20px rgba(60,50,30,.3)' } }, [
        el('div', { style: { font: "600 11px 'Nunito', sans-serif", letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted-3)' } }, `${r.mealType} · ${ageLabel(r)}`),
        el('div', { style: { font: "700 24px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '6px', lineHeight: '1.25' } }, r.name),
        el('div', { style: { font: "600 13px 'Nunito', sans-serif", color: 'var(--sage)', marginTop: '6px' } }, `${r.time} · makes ${r.servings}`),

        // nutrient tags
        el('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' } },
          r.keyNutrients.map((n) => el('div', { style: { font: "600 10.5px 'Nunito', sans-serif", color: 'var(--sage-tint-fg)', background: 'var(--sage-tint-bg)', padding: '4px 10px', borderRadius: '100px' } }, n))),

        // nutrition note
        el('div', { style: { marginTop: '14px', background: 'var(--sage-row)', borderRadius: '14px', padding: '14px' } }, [
          el('div', { style: { font: "700 11px 'Nunito', sans-serif", letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--sage-tint-fg)', marginBottom: '5px' } }, 'Why it’s good'),
          el('div', { style: { font: "400 13px/1.55 'Nunito', sans-serif", color: 'var(--text-body)' } }, r.nutritionNote),
        ]),

        // allergens
        r.allergens.length ? el('div', { style: { marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' } }, [
          el('div', { style: { font: "700 11px 'Nunito', sans-serif", letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--tough-fg)' } }, 'Contains'),
          ...r.allergens.map((a) => el('div', { style: { font: "600 11px 'Nunito', sans-serif", color: 'var(--tough-fg)', background: 'var(--tough-bg)', padding: '4px 10px', borderRadius: '100px' } }, a)),
        ]) : null,

        el('div', { class: 'section-label', style: { marginTop: '20px' } }, 'Ingredients'),
        el('div', { style: { marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' } },
          r.ingredients.map((ing) => el('div', { style: { display: 'flex', gap: '10px', alignItems: 'flex-start' } }, [
            el('div', { style: { width: '6px', height: '6px', borderRadius: '50%', background: 'var(--sage)', flex: 'none', marginTop: '8px' } }),
            el('div', { style: { font: "400 14px/1.5 'Nunito', sans-serif", color: 'var(--text-body)' } }, ing),
          ]))),

        el('div', { class: 'section-label', style: { marginTop: '20px' } }, 'Steps'),
        el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '12px' } },
          r.steps.map((text, i) => el('div', { style: { display: 'flex', gap: '12px' } }, [
            el('div', { style: { width: '24px', height: '24px', flex: 'none', borderRadius: '8px', background: 'var(--divider)', color: 'var(--text-muted-1)', font: "700 12px 'Nunito', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center' } }, String(i + 1)),
            el('div', { style: { font: "400 14px/1.5 'Nunito', sans-serif", color: 'var(--text-body)' } }, text),
          ]))),

        // safety note
        el('div', { style: { marginTop: '20px', background: 'var(--tough-bg)', borderRadius: '14px', padding: '14px' } }, [
          el('div', { style: { font: "700 11px 'Nunito', sans-serif", letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--tough-fg)', marginBottom: '5px' } }, 'Safety & prep'),
          el('div', { style: { font: "400 13px/1.55 'Nunito', sans-serif", color: 'var(--text-body)' } }, r.safetyNote),
        ]),

        el('div', { style: { marginTop: '16px', font: "400 11px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-5)' } }, 'A recipe idea, not medical advice. Introduce new foods and allergens per your pediatrician’s guidance, and always supervise eating.'),
      ]),
    ]),
  ]);
}
