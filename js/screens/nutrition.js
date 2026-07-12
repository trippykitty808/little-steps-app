import { el } from '../utils.js';

function recipeAgeLabel(r) {
  const f = (m) => (m < 12 ? `${m} mo` : `${(m / 12) % 1 === 0 ? m / 12 : (m / 12).toFixed(1)} yr`);
  return `From ${f(r.ageMin)}`;
}

// ---------- Meal plan section (weekly) ----------
function renderMealPlan(vals, actions) {
  return el('div', {}, [
    // week nav
    el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '18px' } }, [
      el('div', { style: { width: '34px', height: '34px', borderRadius: '10px', background: '#fff', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', font: "700 16px 'Nunito', sans-serif", color: 'var(--text-primary)' }, onClick: () => actions.mealPrevWeek() }, '‹'),
      el('div', { style: { flex: '1', textAlign: 'center' } }, [
        el('div', { style: { font: "700 16px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, vals.mealWeekLabel),
        el('div', { style: { font: "600 11.5px 'Quicksand', sans-serif", color: 'var(--sage)', cursor: 'pointer', marginTop: '2px' }, onClick: () => actions.mealToday() }, 'Jump to today'),
      ]),
      el('div', { style: { width: '34px', height: '34px', borderRadius: '10px', background: '#fff', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', font: "700 16px 'Nunito', sans-serif", color: 'var(--text-primary)' }, onClick: () => actions.mealNextWeek() }, '›'),
    ]),

    el('div', { style: { marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' } },
      vals.mealWeek.map((day) => el('div', { style: { background: '#fff', border: `1px solid ${day.isToday ? 'var(--sage)' : 'var(--card-border)'}`, borderRadius: '16px', padding: '12px 14px' } }, [
        el('div', { style: { font: "700 13px 'Quicksand', sans-serif", color: day.isToday ? 'var(--sage)' : 'var(--text-primary)' } }, `${day.dayFull} · ${day.dateLabel}${day.isToday ? ' · Today' : ''}`),
        el('div', { style: { marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' } },
          day.slots.map((slot) => el('div', { style: { display: 'flex', gap: '10px', alignItems: 'flex-start' } }, [
            el('div', { style: { width: '64px', flex: 'none', font: "600 11px 'Nunito', sans-serif", letterSpacing: '.02em', textTransform: 'uppercase', color: 'var(--text-muted-3)', paddingTop: '7px' } }, slot.mealType),
            el('div', { style: { flex: '1', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' } }, [
              ...slot.entries.map((e) => el('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', background: e.recipe.color, borderRadius: '100px', padding: '4px 6px 4px 10px' } }, [
                el('div', { style: { fontSize: '14px' } }, e.recipe.emoji),
                el('div', { style: { font: "600 11.5px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, e.recipe.name),
                el('div', { style: { width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(67,65,75,.18)', color: 'var(--text-primary)', font: "700 10px 'Nunito', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }, onClick: (ev) => { ev.stopPropagation(); actions.removeMeal(e.id); } }, '×'),
              ])),
              el('div', { style: { font: "600 12px 'Quicksand', sans-serif", color: 'var(--sage)', cursor: 'pointer', padding: '4px 6px' }, onClick: () => actions.openMealPick(day.key, slot.mealType) }, '+ Add'),
            ]),
          ]))),
      ]))),

    el('div', { class: 'btn-primary', style: { marginTop: '16px' }, onClick: () => actions.goShoppingList() }, '🛒  Shopping list for this week'),
  ]);
}

// Overlay: pick a recipe for a chosen day + meal slot.
export function renderMealPickOverlay(vals, actions) {
  const list = vals.mealPickRecipes;
  const overlay = el('div', { class: 'overlay', onClick: () => actions.closeMealPick() });
  const sheet = el('div', { class: 'overlay-sheet', style: { maxHeight: '78vh', display: 'flex', flexDirection: 'column' }, onClick: (e) => e.stopPropagation() }, [
    el('div', { style: { font: "700 12px 'Nunito', sans-serif", letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted-3)', padding: '2px 6px 8px' } }, `Add a ${vals.mealPick ? vals.mealPick.mealType.toLowerCase() : ''} recipe`),
    list.length
      ? el('div', { style: { overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '2px' } },
          list.map((r) => el('div', {
            style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: '12px', cursor: 'pointer', background: '#fff', border: '1px solid var(--card-border)' },
            onClick: () => actions.addMealToPlan(r.id),
          }, [
            el('div', { style: { width: '42px', height: '42px', flex: 'none', borderRadius: '10px', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' } }, r.emoji),
            el('div', { style: { flex: '1' } }, [
              el('div', { style: { font: "600 13.5px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, r.name),
              el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)', marginTop: '1px' } }, r.allergens.length ? `Contains: ${r.allergens.join(', ')}` : 'No common allergens'),
            ]),
          ])))
      : el('div', { style: { font: "400 13px 'Nunito', sans-serif", color: 'var(--text-muted-2)', padding: '16px 6px' } }, `No ${vals.mealPick ? vals.mealPick.mealType.toLowerCase() : ''} recipes fit this age yet. Browse the full library under Recipes.`),
  ]);
  overlay.appendChild(sheet);
  return overlay;
}

// ---------- Stage guide section ----------
function renderGuide(vals, actions) {
  const c = vals.nutritionContent;
  return el('div', {}, [
    el('div', { class: 'section-label', style: { marginTop: '22px' } }, 'Developmental stage'),
    el('div', { style: { display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' } },
      vals.nutritionStageOptions.map((o) => el('div', {
        class: `pill${o.active ? ' selected' : ''}`,
        style: { padding: '8px 15px', font: "600 12.5px 'Quicksand', sans-serif" },
        onClick: () => actions.setNutritionStage(o.key),
      }, o.isChildStage ? `${o.key} ★` : o.key))),
    el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-5)', marginTop: '6px' } }, `★ marks ${vals.childName}'s current stage.`),

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

    el('div', { class: 'section-label', style: { marginTop: '24px' } }, 'Plant-based essentials to watch'),
    el('div', { style: { font: "400 12.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)', marginTop: '2px' } }, 'The nutrients worth keeping an eye on at every stage.'),
    el('div', { class: 'card', style: { marginTop: '10px', borderRadius: '18px', padding: '6px 16px' } },
      vals.nutritionEssentials.map((n, i) => el('div', { style: { padding: '12px 0', borderBottom: i < vals.nutritionEssentials.length - 1 ? '1px solid var(--divider)' : 'none' } }, [
        el('div', { style: { font: "700 13.5px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, n.name),
        el('div', { style: { font: "400 12.5px/1.5 'Nunito', sans-serif", color: 'var(--text-body)', marginTop: '3px' } }, n.note),
      ]))),

    el('div', { class: 'section-label', style: { marginTop: '24px' } }, 'Trusted sources'),
    el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' } },
      vals.nutritionSources.map((r) => el('a', { href: r.url, target: '_blank', rel: 'noopener', class: 'card', style: { display: 'block', borderRadius: '14px', padding: '13px 16px' } }, [
        el('div', { style: { font: "600 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, r.name),
        el('div', { style: { font: "400 12.5px 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '2px' } }, r.desc),
      ]))),

    el('div', { style: { font: "400 11.5px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-5)', marginTop: '16px', textAlign: 'center' } }, 'Educational content, pending review by a registered pediatric dietitian.'),
  ]);
}

// ---------- Recipes section ----------
function renderRecipes(vals, actions) {
  return el('div', {}, [
    el('div', { class: 'section-label', style: { marginTop: '22px' } }, 'Meal'),
    el('div', { style: { display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' } },
      vals.recipeMealFilters.map((m) => el('div', {
        class: `pill${m.active ? ' selected' : ''}`,
        style: { padding: '8px 15px', font: "600 12.5px 'Quicksand', sans-serif" },
        onClick: () => actions.setRecipeMealFilter(m.key),
      }, m.label))),

    el('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', flexWrap: 'wrap' } }, [
      el('div', {
        class: `pill${vals.recipeAgeOnly ? ' selected' : ''}`,
        style: { padding: '8px 15px', font: "600 12.5px 'Quicksand', sans-serif" },
        onClick: () => actions.toggleRecipeAgeOnly(),
      }, `For ${vals.childName}'s age`),
      el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-5)' } }, 'Hide recipes with:'),
    ]),
    el('div', { style: { display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' } },
      vals.recipeAvoidOptions.map((a) => el('div', {
        style: { padding: '6px 13px', borderRadius: '100px', font: "600 12px 'Quicksand', sans-serif", cursor: 'pointer', border: '1.5px solid', borderColor: a.active ? 'var(--tough-fg)' : 'var(--card-border)', background: a.active ? 'var(--tough-bg)' : '#fff', color: a.active ? 'var(--tough-fg)' : 'var(--text-muted-2)' },
        onClick: () => actions.toggleRecipeAvoid(a.key),
      }, a.active ? `No ${a.key} ✕` : a.key))),

    vals.visibleRecipes.length
      ? el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '16px' } },
          vals.visibleRecipes.map((r) => el('div', {
            style: { background: '#fff', border: '1px solid var(--card-border)', borderRadius: '18px', overflow: 'hidden', cursor: 'pointer' },
            onClick: () => actions.openRecipe(r.id),
          }, [
            el('div', { style: { height: '72px', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '34px' } }, r.emoji),
            el('div', { style: { padding: '12px' } }, [
              el('div', { style: { font: "600 14px 'Quicksand', sans-serif", color: 'var(--text-primary)', lineHeight: '1.25' } }, r.name),
              el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)', marginTop: '4px' } }, `${r.mealType} · ${recipeAgeLabel(r)}`),
              r.allergens.length ? el('div', { style: { font: "600 10px 'Nunito', sans-serif", color: 'var(--tough-fg)', marginTop: '6px' } }, `Contains: ${r.allergens.join(', ')}`) : null,
            ]),
          ])))
      : el('div', { style: { font: "400 13.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)', padding: '24px 0', textAlign: 'center' } }, 'No recipes match these filters — try clearing one.'),

    el('div', { style: { marginTop: '18px', font: "400 12.5px/1.55 'Nunito', sans-serif", color: 'var(--text-body)', background: 'var(--input-bg)', borderRadius: '14px', padding: '14px 16px' } }, vals.recipeDisclaimer),

    el('div', { class: 'section-label', style: { marginTop: '22px' } }, 'More recipe collections'),
    el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' } },
      vals.moreRecipeSources.map((r) => el('a', { href: r.url, target: '_blank', rel: 'noopener', class: 'card', style: { display: 'block', borderRadius: '14px', padding: '13px 16px' } }, [
        el('div', { style: { font: "600 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, r.name),
        el('div', { style: { font: "400 12.5px 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '2px' } }, r.desc),
      ]))),
  ]);
}

export function renderNutrition(vals, actions) {
  return el('div', { 'data-screen-label': 'Nutrition', class: 'screen', style: { padding: '26px 24px 10px' } }, [
    el('button', { class: 'back-link', onClick: () => actions.goProfile() }, '← Profile'),
    el('div', { style: { font: "700 26px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '14px' } }, 'Nutrition'),
    el('div', { style: { font: "400 14px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '6px' } }, `A whole-food, plant-based lens on what ${vals.childName} needs.`),

    el('div', { style: { marginTop: '16px', background: 'var(--montessori)', borderRadius: '16px', padding: '14px 16px' } }, [
      el('div', { style: { font: "700 11px 'Nunito', sans-serif", letterSpacing: '.06em', textTransform: 'uppercase', color: '#9C5A45', marginBottom: '5px' } }, 'Please read'),
      el('div', { style: { font: "400 12.5px/1.55 'Nunito', sans-serif", color: 'var(--text-body)' } }, vals.nutritionDisclaimer),
    ]),

    // Guide / Recipes / Meal plan segmented control
    el('div', { style: { display: 'flex', gap: '6px', marginTop: '18px', background: '#F6F1E4', borderRadius: '100px', padding: '4px' } },
      [['guide', 'Guide'], ['recipes', 'Recipes'], ['meals', 'Meal plan']].map(([key, label]) => el('div', {
        style: { flex: '1', textAlign: 'center', padding: '9px 0', borderRadius: '100px', cursor: 'pointer', font: "600 12.5px 'Quicksand', sans-serif", background: vals.nutritionTab === key ? '#fff' : 'transparent', color: vals.nutritionTab === key ? 'var(--text-primary)' : 'var(--text-muted-2)' },
        onClick: () => actions.setNutritionTab(key),
      }, label))),

    vals.nutritionTab === 'recipes' ? renderRecipes(vals, actions)
      : vals.nutritionTab === 'meals' ? renderMealPlan(vals, actions)
        : renderGuide(vals, actions),
    el('div', { style: { height: '16px' } }),
  ]);
}
