import { el } from '../utils.js';

export function renderShoppingList(vals, actions) {
  const items = vals.shoppingItems;
  const remaining = items.filter((i) => !i.checked).length;

  return el('div', { 'data-screen-label': 'Shopping List', class: 'screen', style: { padding: '26px 24px 10px' } }, [
    el('button', { class: 'back-link', onClick: () => actions.backFromShopping() }, '← Meal plan'),
    el('div', { style: { font: "700 26px 'Quicksand', sans-serif", color: 'var(--text-primary)', marginTop: '14px' } }, 'Shopping list'),
    el('div', { style: { font: "400 14px 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '4px' } }, vals.mealWeekLabel),

    items.length
      ? el('div', {}, [
          el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px' } }, [
            el('div', { style: { font: "400 12.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)' } }, `${vals.shoppingMealCount} meals · ${vals.shoppingRecipeCount} recipes · ${remaining} to buy`),
            el('div', { style: { font: "600 13px 'Quicksand', sans-serif", color: 'var(--sage)', cursor: 'pointer' }, onClick: () => actions.shareShoppingList(items, vals.mealWeekLabel) }, 'Share'),
          ]),

          el('div', { class: 'card', style: { marginTop: '12px', borderRadius: '18px', padding: '4px 16px' } },
            items.map((it, i) => el('div', {
              style: { display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', borderBottom: i < items.length - 1 ? '1px solid var(--divider)' : 'none', cursor: 'pointer' },
              onClick: () => actions.toggleShopItem(it.text),
            }, [
              el('div', { style: { width: '22px', height: '22px', flex: 'none', borderRadius: '7px', marginTop: '1px', border: `1.5px solid ${it.checked ? 'var(--sage)' : 'var(--card-border)'}`, background: it.checked ? 'var(--sage)' : '#fff', color: '#fff', font: "700 13px 'Nunito', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center' } }, it.checked ? '✓' : ''),
              el('div', { style: { flex: '1' } }, [
                el('div', { style: { font: "500 14px/1.4 'Nunito', sans-serif", color: it.checked ? 'var(--text-muted-5)' : 'var(--text-primary)', textDecoration: it.checked ? 'line-through' : 'none' } }, `${it.text}${it.count > 1 ? ` (×${it.count})` : ''}`),
                it.count > 1 ? el('div', { style: { font: "400 11px 'Nunito', sans-serif", color: 'var(--text-muted-5)', marginTop: '2px' } }, `For: ${it.recipes.join(', ')}`) : null,
              ]),
            ]))),

          el('div', { style: { marginTop: '14px', font: "400 11.5px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-5)', textAlign: 'center' } }, 'Amounts are listed per recipe — double-check quantities when a food is needed for more than one meal.'),
        ])
      : el('div', { style: { marginTop: '30px', textAlign: 'center' } }, [
          el('div', { style: { font: "600 15px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, 'Nothing planned this week yet'),
          el('div', { style: { font: "400 13px 'Nunito', sans-serif", color: 'var(--text-muted-2)', marginTop: '4px' } }, 'Add some meals in the planner and they’ll turn into a shopping list here.'),
          el('div', { class: 'btn-primary', style: { marginTop: '20px', maxWidth: '240px', margin: '20px auto 0' }, onClick: () => actions.backFromShopping() }, 'Back to meal plan'),
        ]),
    el('div', { style: { height: '16px' } }),
  ]);
}
