import * as state from './state.js';
import { renderTabBar } from './tabBar.js';
import { renderChildSwitcher } from './childSwitcher.js';
import { renderAuthScreen } from './authScreen.js';
import { renderWelcome } from './screens/welcome.js';
import { renderSetupChild } from './screens/setupChild.js';
import { renderSetupCaregiver } from './screens/setupCaregiver.js';
import { renderSetupFocus } from './screens/setupFocus.js';
import { renderHome } from './screens/home.js';
import { renderActivities } from './screens/activities.js';
import { renderActivityDetail } from './screens/activityDetail.js';
import { renderLogActivity } from './screens/logActivity.js';
import { renderProgress } from './screens/progress.js';
import { renderMilestoneDetail } from './screens/milestoneDetail.js';
import { renderGuide } from './screens/guide.js';
import { renderProfile } from './screens/profile.js';
import { renderScrapbook } from './screens/scrapbook.js';
import { renderMemoryNew } from './screens/memoryNew.js';
import { renderMemoryDetail } from './screens/memoryDetail.js';
import { renderPrintPreview } from './screens/printPreview.js';
import { renderPlanner, renderDayPickOverlay, renderPlanActivityOverlay } from './screens/planner.js';
import { renderNutrition } from './screens/nutrition.js';
import { renderRecipeDetail } from './screens/recipeDetail.js';
import { el } from './utils.js';

const root = document.getElementById('app-root');

const SCREEN_RENDERERS = {
  'welcome': renderWelcome,
  'setup-child': renderSetupChild,
  'setup-caregiver': renderSetupCaregiver,
  'setup-focus': renderSetupFocus,
  'home': renderHome,
  'activities': renderActivities,
  'activity-detail': renderActivityDetail,
  'log-activity': renderLogActivity,
  'progress': renderProgress,
  'milestone-detail': renderMilestoneDetail,
  'guide': renderGuide,
  'profile': renderProfile,
  'scrapbook': renderScrapbook,
  'memory-new': renderMemoryNew,
  'memory-detail': renderMemoryDetail,
  'print-preview': renderPrintPreview,
  'planner': renderPlanner,
  'nutrition': renderNutrition,
  'recipe-detail': renderRecipeDetail,
};

function renderLoading() {
  return el('div', { class: 'screen', style: { alignItems: 'center', justifyContent: 'center' } }, [
    el('div', { style: { font: "600 15px 'Quicksand', sans-serif", color: 'var(--text-muted-2)' } }, 'Loading Little Steps…'),
  ]);
}

function render() {
  const vals = state.getViewState();
  root.innerHTML = '';

  if (vals.screen === 'loading') {
    root.appendChild(renderLoading());
    return;
  }
  if (vals.screen === 'auth') {
    root.appendChild(renderAuthScreen(vals, state.actions, state.signIn));
    return;
  }

  const renderer = SCREEN_RENDERERS[vals.screen];
  const screenEl = renderer ? renderer(vals, state.actions) : renderLoading();
  root.appendChild(screenEl);

  if (vals.showChildSwitcher) {
    root.appendChild(renderChildSwitcher(vals, state.actions));
  }
  if (vals.planPickDate) {
    root.appendChild(renderDayPickOverlay(vals, state.actions));
  }
  if (vals.planningActivityId) {
    root.appendChild(renderPlanActivityOverlay(vals, state.actions));
  }

  if (vals.showTabBar) {
    root.appendChild(renderTabBar(vals, state.actions));
  }
}

state.onChange(render);
state.init();
render();
