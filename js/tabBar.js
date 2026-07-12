import { el } from './utils.js';

const TABS = [
  { key: 'home', label: 'Home', go: 'goHome', icon: (c) => `<path d="M4 11.5L12 4.5L20 11.5" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10V19.5H18V10" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 19.5V14.5H14V19.5" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` },
  { key: 'activities', label: 'Activities', go: 'goActivities', icon: (c) => `<path d="M12 20V11" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/><path d="M12 11C12 7 15.5 5 19 5C19 9 16 12 12 11Z" stroke="${c}" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 14C12 11 9.2 9 6 9C6 12 8.3 14.3 12 14Z" stroke="${c}" stroke-width="1.8" stroke-linejoin="round"/>` },
  { key: 'planner', label: 'Plan', go: 'goPlanner', icon: (c) => `<rect x="4" y="5.5" width="16" height="15" rx="2.5" stroke="${c}" stroke-width="1.8"/><path d="M4 9.5h16" stroke="${c}" stroke-width="1.8"/><path d="M8 3.5v3M16 3.5v3" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/>` },
  { key: 'scrapbook', label: 'Scrapbook', go: 'goScrapbook', icon: (c) => `<rect x="4" y="5.5" width="16" height="13" rx="2.5" stroke="${c}" stroke-width="1.8"/><circle cx="9" cy="10" r="1.4" stroke="${c}" stroke-width="1.8"/><path d="M5 16.5L9.5 12L13 15L15.5 12.5L19 16" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` },
  { key: 'progress', label: 'Progress', go: 'goProgress', icon: (c) => `<path d="M5.5 19V14.5" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/><path d="M12 19V9" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/><path d="M18.5 19V5" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/><circle cx="18.5" cy="5" r="1.6" stroke="${c}" stroke-width="1.8"/>` },
  { key: 'profile', label: 'Profile', go: 'goProfile', icon: (c) => `<circle cx="12" cy="8.3" r="3.3" stroke="${c}" stroke-width="1.8"/><path d="M5.5 19.5C5.5 15.6 8.4 13.5 12 13.5C15.6 13.5 18.5 15.6 18.5 19.5" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/>` },
];

export function renderTabBar(vals, actions) {
  const bar = el('div', { class: 'tab-bar' });
  const activeKey = vals.screen === 'scrapbook' ? 'scrapbook' : vals.screen;
  for (const tab of TABS) {
    const active = activeKey === tab.key;
    const color = active ? '#43414B' : '#B0A693';
    const item = el('button', {
      class: 'tab-item',
      style: { background: active ? '#EAF1E3' : 'transparent' },
      onClick: () => actions[tab.go](),
    }, [
      (() => { const wrap = el('div', { html: `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" style="display:block;margin:0 auto">${tab.icon(color)}</svg>` }); return wrap; })(),
      el('div', { class: 'tab-label', style: { color } }, tab.label),
    ]);
    bar.appendChild(item);
  }
  return bar;
}
