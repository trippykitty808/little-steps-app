// Central app state + view-model derivation. This mirrors the design
// prototype's single Component with a `state` object and a `renderVals()`
// method — adapted so the durable data (caregiver/child/logs/milestones/
// memories/notes) lives in Firestore instead of in-memory, while transient
// UI state (current screen, filters, drafts, selection mode) stays local.
import * as fb from './firebase.js';
import { ACTIVITIES, TRADITION_RESOURCES, categoryIconSvg, fmtAgeRange } from './data/activities.js';
import { MILESTONES, DOMAIN_ORDER, DOMAIN_COLORS, statusStyle } from './data/milestones.js';
import { GUIDE_RESOURCES, GUIDE_MEDIA } from './data/guideResources.js';
import { monthsToLabel, stageForMonths, shareText } from './utils.js';

const FOCUS_LIST = ['Practical Life', 'Sensorial', 'Language', 'Movement', 'Nature & Outdoors', 'Rhythm & Ritual', 'Handwork', 'Creative Arts'];
const ROLE_OPTIONS = ['Grandparent', 'Parent', 'Nanny/Sitter', 'Other'];
const SWATCH_PALETTE = ['#C9DDB6', '#D8C7E6', '#F4D9C6', '#B9C7DE'];

let listeners = [];
export function onChange(cb) { listeners.push(cb); }
function notify() { listeners.forEach((cb) => cb()); }

export const ui = {
  screen: 'loading', // loading | auth | welcome | setup-child | setup-caregiver | setup-focus | home | activities | activity-detail | log-activity | progress | milestone-detail | guide | profile | scrapbook | memory-detail | memory-new | print-preview
  authError: '',
  scrapbookTab: 'memories',
  traditionFilter: 'all',
  focusAreaFilter: 'all',
  ageFitOnly: false,
  caregiverFlowFrom: 'onboarding', // or 'profile'
  milestoneBackTarget: 'progress', // or 'scrapbook-milestones'
  selectedActivityId: null,
  selectedMilestoneKey: null,
  selectedMemoryId: null,
  showChildSwitcher: false,
  memorySelectMode: false,
  selectedMemoryIds: [],
  noteSelectMode: false,
  selectedNoteIds: [],
  shareToast: '',
  printType: null,

  draftChild: null, // { name, ageMonths, focusAreas, photoFile, previewUrl, uploading }
  caregiverDraft: null, // { name, role, previewUrl, uploading }

  logNoteText: '',
  logPhoto: { previewUrl: null, url: null, uploading: false },
  newMemoryCaption: '',
  newMemoryPhoto: { previewUrl: null, url: null, uploading: false },
  noteMood: null,
  noteMessage: '',
};

export const data = {
  uid: null,
  caregiverName: '',
  caregiverRole: '',
  caregiverPhotoURL: null,
  onboardingComplete: false,
  children: [],
  activeChildId: null,
  logs: [],
  milestones: {},
  memories: [],
  notes: [],
  childDataLoading: false,
};

function setUI(patch) { Object.assign(ui, patch); notify(); }
function setData(patch) { Object.assign(data, patch); notify(); }

// ---------- Bootstrapping ----------
export function init() {
  fb.onAuthChange(async (user) => {
    if (!user) {
      setData({ uid: null });
      setUI({ screen: 'auth', authError: '' });
      return;
    }
    setData({ uid: user.uid });
    setUI({ screen: 'loading' });
    try {
      const profile = await fb.fetchUserProfile(user.uid);
      const children = await fb.fetchChildren(user.uid);
      if (!profile || !profile.onboardingComplete || children.length === 0) {
        setData({
          caregiverName: profile?.caregiverName || '',
          caregiverRole: profile?.caregiverRole || '',
          caregiverPhotoURL: profile?.caregiverPhotoURL || null,
          onboardingComplete: false,
          children,
        });
        setUI({ screen: 'welcome' });
        return;
      }
      const activeChildId = children.some((c) => c.id === profile.activeChildId) ? profile.activeChildId : children[0].id;
      setData({
        caregiverName: profile.caregiverName || '',
        caregiverRole: profile.caregiverRole || '',
        caregiverPhotoURL: profile.caregiverPhotoURL || null,
        onboardingComplete: true,
        children,
        activeChildId,
      });
      await loadActiveChildData();
      setUI({ screen: 'home' });
    } catch (err) {
      console.error('Failed to load account', err);
      setUI({ screen: 'welcome' });
    }
  });
}

export async function signIn() {
  setUI({ authError: '' });
  try {
    await fb.signInWithGoogle();
  } catch (err) {
    setUI({ authError: 'Sign-in didn’t go through. Please try again.' });
  }
}
export async function signOut() { await fb.signOutUser(); }

async function loadActiveChildData() {
  const { uid, activeChildId } = data;
  if (!uid || !activeChildId) return;
  setData({ childDataLoading: true });
  const [logs, milestones, memories, notes] = await Promise.all([
    fb.fetchLogs(uid, activeChildId),
    fb.fetchMilestoneState(uid, activeChildId),
    fb.fetchMemories(uid, activeChildId),
    fb.fetchNotes(uid, activeChildId),
  ]);
  setData({ logs, milestones, memories, notes, childDataLoading: false });
}

function activeChild() {
  return data.children.find((c) => c.id === data.activeChildId) || data.children[0];
}

function updateActiveChildLocal(patch) {
  const id = data.activeChildId;
  setData({ children: data.children.map((c) => (c.id === id ? { ...c, ...patch } : c)) });
  fb.updateChild(data.uid, id, patch).catch((e) => console.error(e));
}

function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}
function todayTimeLabel(d = new Date()) {
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}
function todayShortLabel(d = new Date()) {
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

// ---------- Navigation ----------
function go(screen) { setUI({ screen }); }

export const actions = {
  goSetupChild() {
    setUI({ screen: 'setup-child', draftChild: data.draftChild || { name: '', ageMonths: 24, focusAreas: [], photoFile: null, previewUrl: null, uploading: false } });
  },
  backFromSetupChild() { setUI({ screen: data.children.length === 0 ? 'welcome' : 'home', draftChild: null }); },
  goSetupCaregiver() {
    setUI({
      caregiverFlowFrom: 'onboarding', screen: 'setup-caregiver',
      caregiverDraft: { name: data.caregiverName, role: data.caregiverRole, previewUrl: data.caregiverPhotoURL, url: data.caregiverPhotoURL, uploading: false, photoFile: null },
    });
  },
  goEditCaregiver() {
    setUI({
      caregiverFlowFrom: 'profile', screen: 'setup-caregiver',
      caregiverDraft: { name: data.caregiverName, role: data.caregiverRole, previewUrl: data.caregiverPhotoURL, url: data.caregiverPhotoURL, uploading: false, photoFile: null },
    });
  },
  backFromSetupCaregiver() { setUI({ screen: ui.caregiverFlowFrom === 'profile' ? 'profile' : 'setup-child' }); },
  async continueFromSetupCaregiver() {
    const d = ui.caregiverDraft;
    setData({ caregiverName: (d.name || '').trim() || 'Caregiver', caregiverRole: d.role || 'Grandparent', caregiverPhotoURL: d.url || null });
    fb.saveUserProfile(data.uid, { caregiverName: data.caregiverName, caregiverRole: data.caregiverRole, caregiverPhotoURL: data.caregiverPhotoURL }).catch((e) => console.error(e));
    if (ui.caregiverFlowFrom === 'profile') { setUI({ screen: 'profile', caregiverDraft: null }); return; }
    setUI({ screen: 'setup-focus', caregiverDraft: null });
  },
  // Plain-text fields mutate their draft object silently (no re-render) so
  // typing never steals focus from the input. The value is only read (and
  // persisted) when the user taps an explicit Continue/Save/Send button.
  onCaregiverDraftNameChange(e) { ui.caregiverDraft.name = e.target.value; },
  setCaregiverDraftRole(role) { setUI({ caregiverDraft: { ...ui.caregiverDraft, role } }); },
  onCaregiverDraftPhotoFile(file) { handlePhotoDraftUpload('caregiverDraft', ['caregiver-profile.jpg'], file); },

  onDraftChildNameChange(e) { ui.draftChild.name = e.target.value; },
  draftAgeMinus() { setUI({ draftChild: { ...ui.draftChild, ageMonths: Math.max(3, ui.draftChild.ageMonths - 1) } }); },
  draftAgePlus() { setUI({ draftChild: { ...ui.draftChild, ageMonths: Math.min(72, ui.draftChild.ageMonths + 1) } }); },
  toggleDraftFocus(label) {
    const cur = ui.draftChild.focusAreas;
    setUI({ draftChild: { ...ui.draftChild, focusAreas: cur.includes(label) ? cur.filter((f) => f !== label) : [...cur, label] } });
  },
  onDraftChildPhotoFile(file) { handlePhotoDraftUpload('draftChild', ['child-setup-photo.jpg'], file); },
  goSetupFocus() { go('setup-focus'); },

  async finishSetup() {
    const d = ui.draftChild || { name: '', ageMonths: 24, focusAreas: [] };
    const swatch = SWATCH_PALETTE[data.children.length % SWATCH_PALETTE.length];
    const childData = { name: (d.name || 'Little one').trim() || 'Little one', ageMonths: d.ageMonths, focusAreas: d.focusAreas, photoURL: d.url || null, swatch };
    const id = await fb.createChild(data.uid, childData);
    await fb.saveUserProfile(data.uid, { onboardingComplete: true, activeChildId: id, caregiverName: data.caregiverName, caregiverRole: data.caregiverRole });
    setData({ children: [...data.children, { id, ...childData }], activeChildId: id, onboardingComplete: true, draftChild: null });
    setUI({ draftChild: null });
    await loadActiveChildData();
    go('home');
  },

  goHome() { go('home'); },
  goActivities() { go('activities'); },
  goProgress() { go('progress'); },
  goGuide() { go('guide'); },
  goProfile() { go('profile'); },
  goScrapbook() { setUI({ screen: 'scrapbook', scrapbookTab: 'memories' }); },
  goScrapbookMemories() { setUI({ screen: 'scrapbook', scrapbookTab: 'memories' }); },
  goScrapbookNotes() { setUI({ screen: 'scrapbook', scrapbookTab: 'notes' }); },
  goScrapbookMilestones() { setUI({ screen: 'scrapbook', scrapbookTab: 'milestones' }); },
  goNotes() { setUI({ screen: 'scrapbook', scrapbookTab: 'notes' }); },

  openActivity(id) { setUI({ selectedActivityId: id, screen: 'activity-detail' }); },
  goLogActivity() {
    setUI({ screen: 'log-activity', logNoteText: '', logPhoto: { previewUrl: null, url: null, uploading: false } });
  },
  goActivityDetailFromLog() { setUI({ screen: 'activity-detail' }); },
  onLogNoteChange(e) { ui.logNoteText = e.target.value; },
  onLogPhotoFile(file) { handlePhotoDraftUpload('logPhoto', ['children', data.activeChildId, 'logs', 'log-' + Date.now() + '.jpg'], file); },
  async saveActivityLog() {
    const a = ACTIVITIES.find((x) => x.id === ui.selectedActivityId) || ACTIVITIES[0];
    const noteText = (ui.logNoteText || '').trim();
    const photoURL = ui.logPhoto.url;
    const now = new Date();
    const entry = { time: todayTimeLabel(now), label: a.name, note: noteText || 'Completed today.', dateKey: todayKey(now), type: 'activity' };
    const logId = await fb.addLog(data.uid, data.activeChildId, entry);
    const newLogs = [{ id: logId, ...entry }, ...data.logs];
    let newMemories = data.memories;
    if (noteText || photoURL) {
      const memory = { caption: noteText || (a.name + ' — done today.'), date: todayShortLabel(now), tag: a.name, photoURL: photoURL || null };
      const memId = await fb.addMemory(data.uid, data.activeChildId, memory);
      newMemories = [{ id: memId, ...memory }, ...data.memories];
    }
    setData({ logs: newLogs, memories: newMemories });
    setUI({ screen: 'home', logNoteText: '', logPhoto: { previewUrl: null, url: null, uploading: false } });
  },

  toggleAgeFit() { setUI({ ageFitOnly: !ui.ageFitOnly }); },
  setTraditionFilter(key) { setUI({ traditionFilter: key }); },
  setFocusAreaFilter(key) { setUI({ focusAreaFilter: key }); },

  ageMinus() { updateActiveChildLocal({ ageMonths: Math.max(3, activeChild().ageMonths - 1) }); },
  agePlus() { updateActiveChildLocal({ ageMonths: Math.min(72, activeChild().ageMonths + 1) }); },
  toggleFocusArea(label) {
    const c = activeChild();
    const has = c.focusAreas.includes(label);
    updateActiveChildLocal({ focusAreas: has ? c.focusAreas.filter((f) => f !== label) : [...c.focusAreas, label] });
  },

  openMilestone(key, backTarget) { setUI({ selectedMilestoneKey: key, screen: 'milestone-detail', milestoneBackTarget: backTarget || 'progress' }); },
  milestoneBackHandler() {
    const toScrapbook = ui.milestoneBackTarget === 'scrapbook-milestones';
    setUI({ screen: toScrapbook ? 'scrapbook' : 'progress', scrapbookTab: toScrapbook ? 'milestones' : ui.scrapbookTab });
  },
  setMilestoneStatus(key, newStatus) {
    const cur = data.milestones[key] || { status: 'not yet', emergingDate: null, achievedDate: null, note: '' };
    const patch = { status: newStatus };
    if (newStatus === 'emerging' && !cur.emergingDate) patch.emergingDate = todayShortLabel();
    if (newStatus === 'achieved') {
      if (!cur.emergingDate) patch.emergingDate = todayShortLabel();
      if (!cur.achievedDate) patch.achievedDate = todayShortLabel();
    }
    const next = { ...cur, ...patch };
    setData({ milestones: { ...data.milestones, [key]: next } });
    fb.updateMilestone(data.uid, data.activeChildId, key, patch).catch((e) => console.error(e));
  },
  // Silent while typing (keeps focus); committed to Firestore on blur.
  onMilestoneEmergingDateInput(key, value) { if (data.milestones[key]) data.milestones[key].emergingDate = value; },
  onMilestoneEmergingDateBlur(key, value) {
    if (data.milestones[key]) data.milestones[key].emergingDate = value;
    fb.updateMilestone(data.uid, data.activeChildId, key, { emergingDate: value }).catch((e) => console.error(e));
    notify();
  },
  onMilestoneAchievedDateInput(key, value) { if (data.milestones[key]) data.milestones[key].achievedDate = value; },
  onMilestoneAchievedDateBlur(key, value) {
    if (data.milestones[key]) data.milestones[key].achievedDate = value;
    fb.updateMilestone(data.uid, data.activeChildId, key, { achievedDate: value }).catch((e) => console.error(e));
    notify();
  },
  onMilestoneNoteInput(key, value) { if (data.milestones[key]) data.milestones[key].note = value; },
  onMilestoneNoteBlur(key, value) {
    if (data.milestones[key]) data.milestones[key].note = value;
    fb.updateMilestone(data.uid, data.activeChildId, key, { note: value }).catch((e) => console.error(e));
    notify();
  },
  shareMilestoneInNote(key) {
    const def = MILESTONES.find((m) => m.key === key);
    const inst = data.milestones[key];
    const dateBit = inst.achievedDate ? ' on ' + inst.achievedDate : '';
    setUI({
      screen: 'scrapbook', scrapbookTab: 'notes', noteMood: 'smooth',
      noteMessage: '"' + def.title + '"' + (inst.status === 'achieved' ? ' — achieved' + dateBit + '! So proud.' : ' — coming along nicely, wanted to share.'),
    });
  },

  goMemoryNew() { setUI({ newMemoryCaption: '', newMemoryPhoto: { previewUrl: null, url: null, uploading: false }, screen: 'memory-new' }); },
  onNewMemoryCaptionChange(e) { ui.newMemoryCaption = e.target.value; },
  onNewMemoryPhotoFile(file) { handlePhotoDraftUpload('newMemoryPhoto', ['children', data.activeChildId, 'memories', 'mem-' + Date.now() + '.jpg'], file); },
  async saveMemory() {
    const caption = (ui.newMemoryCaption || '').trim() || 'A little moment worth remembering.';
    const memory = { caption, date: todayShortLabel(), tag: null, photoURL: ui.newMemoryPhoto.url || null };
    const id = await fb.addMemory(data.uid, data.activeChildId, memory);
    setData({ memories: [{ id, ...memory }, ...data.memories] });
    setUI({ selectedMemoryId: id, screen: 'scrapbook', scrapbookTab: 'memories' });
  },
  openMemory(id) { setUI({ selectedMemoryId: id, screen: 'memory-detail' }); },

  toggleMemorySelectMode() { setUI({ memorySelectMode: !ui.memorySelectMode, selectedMemoryIds: [] }); },
  toggleMemorySelect(id) {
    const has = ui.selectedMemoryIds.includes(id);
    setUI({ selectedMemoryIds: has ? ui.selectedMemoryIds.filter((x) => x !== id) : [...ui.selectedMemoryIds, id] });
  },
  shareMemories() {
    const list = data.memories.filter((m) => ui.selectedMemoryIds.includes(m.id));
    shareText(activeChild().name + "'s memories", list.map((m) => m.caption + ' (' + m.date + ')'), (t) => setUI({ shareToast: t }));
  },
  printMemories() { setUI({ screen: 'print-preview', printType: 'memories' }); },

  toggleNoteSelectMode() { setUI({ noteSelectMode: !ui.noteSelectMode, selectedNoteIds: [] }); },
  toggleNoteSelect(id) {
    const has = ui.selectedNoteIds.includes(id);
    setUI({ selectedNoteIds: has ? ui.selectedNoteIds.filter((x) => x !== id) : [...ui.selectedNoteIds, id] });
  },
  shareNotes() {
    const list = data.notes.filter((n) => ui.selectedNoteIds.includes(n.id));
    shareText(activeChild().name + "'s handoff notes", list.map((n) => n.mood + ' (' + n.date + '): ' + n.message), (t) => setUI({ shareToast: t }));
  },
  printNotes() { setUI({ screen: 'print-preview', printType: 'notes' }); },

  setNoteMood(key) { setUI({ noteMood: key }); },
  onNoteMessageChange(e) { ui.noteMessage = e.target.value; },
  async sendNote() {
    if (!ui.noteMood && !(ui.noteMessage || '').trim()) return;
    const moodKey = ui.noteMood || 'smooth';
    const message = (ui.noteMessage || '').trim() || moodLabel(moodKey) + ' — nothing else to add.';
    const note = { mood: moodKey, message, date: 'Today, ' + todayTimeLabel() };
    const id = await fb.addNote(data.uid, data.activeChildId, note);
    setData({ notes: [{ id, ...note }, ...data.notes] });
    setUI({ noteMood: null, noteMessage: '' });
  },

  backFromPrint() { setUI({ screen: 'scrapbook', scrapbookTab: ui.printType === 'notes' ? 'notes' : 'memories' }); },
  doPrint() { window.print(); },

  openSwitcher() { setUI({ showChildSwitcher: true }); },
  closeSwitcher() { setUI({ showChildSwitcher: false }); },
  async switchChild(id) {
    setData({ activeChildId: id });
    fb.saveUserProfile(data.uid, { activeChildId: id }).catch((e) => console.error(e));
    setUI({ showChildSwitcher: false });
    await loadActiveChildData();
  },
  addChild() {
    setUI({ showChildSwitcher: false, draftChild: { name: '', ageMonths: 24, focusAreas: [], photoFile: null, previewUrl: null, uploading: false }, screen: 'setup-child' });
  },
};

function handlePhotoDraftUpload(uiKey, pathParts, file) {
  const previewUrl = URL.createObjectURL(file);
  setUI({ [uiKey]: { ...ui[uiKey], previewUrl, uploading: true } });
  fb.uploadPhoto(data.uid, pathParts, file).then((url) => {
    setUI({ [uiKey]: { ...ui[uiKey], previewUrl: url, url, uploading: false } });
  }).catch((err) => {
    console.error('Photo upload failed', err);
    setUI({ [uiKey]: { ...ui[uiKey], uploading: false } });
  });
}

const MOOD_META = {
  smooth: { label: 'Smooth day', bg: '#E4EFDA', fg: '#4F7A52' },
  mixed: { label: 'Mixed day', bg: '#FBEFDA', fg: '#A9803F' },
  tough: { label: 'Tough day', bg: '#F5E1DA', fg: '#9C5A45' },
};
function moodLabel(key) { return MOOD_META[key]?.label || 'Smooth day'; }

// ---------- View-state derivation (mirrors the prototype's renderVals()) ----------
export function getViewState() {
  const s = ui;
  const child = activeChild();

  if (!child) {
    // Still in onboarding / no children yet.
    return { screen: s.screen, ...onboardingOnlyVals() };
  }

  const focusMatch = (category) => child.focusAreas.length === 0 || child.focusAreas.includes(category);
  const activities = ACTIVITIES.map((a) => {
    const ageOk = child.ageMonths >= a.ageMin && child.ageMonths <= a.ageMax;
    return {
      ...a,
      ageLabel: fmtAgeRange(a.ageMin, a.ageMax),
      isAgeOk: ageOk,
      isGoodFit: ageOk && focusMatch(a.category),
      steps: a.steps.map((text, i) => ({ n: i + 1, text })),
      iconHtml: categoryIconSvg(a.category, 'rgba(255,255,255,.9)'),
      resources: TRADITION_RESOURCES[a.tradition] || [],
    };
  });
  const selectedActivity = activities.find((a) => a.id === s.selectedActivityId) || activities[0];
  const suggestedActivity = activities.find((a) => a.isGoodFit) || activities.find((a) => a.isAgeOk) || activities[0];

  const traditionFilters = ['all', 'Montessori', 'Waldorf'].map((key) => ({
    key, label: key === 'all' ? 'All' : key, active: s.traditionFilter === key,
  }));
  const focusAreaFilters = ['all', ...FOCUS_LIST].map((key) => ({
    key, label: key === 'all' ? 'All areas' : key, active: s.focusAreaFilter === key,
  }));
  let visibleActivities = s.traditionFilter === 'all' ? activities : activities.filter((a) => a.tradition === s.traditionFilter);
  if (s.focusAreaFilter !== 'all') visibleActivities = visibleActivities.filter((a) => a.category === s.focusAreaFilter);
  if (s.ageFitOnly) visibleActivities = visibleActivities.filter((a) => a.isGoodFit);

  const milestonesDisplay = MILESTONES.map((m) => {
    const inst = data.milestones[m.key] || { status: 'not yet', emergingDate: null, achievedDate: null, note: '' };
    const st = statusStyle(inst.status);
    const rowStyle = (rowKey) => ({
      rowBg: rowKey === inst.status ? '#F6F1E4' : 'transparent',
      labelColor: rowKey === 'achieved' ? '#4F7A52' : rowKey === 'emerging' ? '#A9803F' : '#7A5FA0',
    });
    const statusOptions = [
      { key: 'not yet', label: 'Not yet' },
      { key: 'emerging', label: 'Emerging' },
      { key: 'achieved', label: 'Achieved' },
    ].map((op) => {
      const active = op.key === inst.status;
      const opSt = statusStyle(op.key);
      return { ...op, active, bg: active ? opSt.badgeBg : '#fff', fg: active ? opSt.badgeFg : '#43414B' };
    });
    return {
      ...m, ...inst, ...st,
      color: DOMAIN_COLORS[m.domain],
      isAchieved: inst.status === 'achieved',
      isEmergingOrLater: inst.status === 'emerging' || inst.status === 'achieved',
      statusOptions,
      criteriaRows: [
        { label: 'Not yet', text: m.criteria.notYet, ...rowStyle('not yet') },
        { label: 'Emerging', text: m.criteria.emerging, ...rowStyle('emerging') },
        { label: 'Achieved', text: m.criteria.achieved, ...rowStyle('achieved') },
      ],
    };
  });
  const domains = DOMAIN_ORDER.map((domain) => ({
    domain, color: DOMAIN_COLORS[domain], items: milestonesDisplay.filter((m) => m.domain === domain),
  }));
  const domainsForScrapbook = domains; // same data; Milestones tab also shows emerging/achieved dates per row
  const selectedMilestone = milestonesDisplay.find((m) => m.key === s.selectedMilestoneKey) || milestonesDisplay[0];

  const focusOptions = FOCUS_LIST.map((label) => ({ label, selected: child.focusAreas.includes(label) }));
  const draft = s.draftChild || { name: '', ageMonths: 24, focusAreas: [] };
  const draftFocusOptions = FOCUS_LIST.map((label) => ({ label, selected: draft.focusAreas.includes(label) }));

  const activityCategoryByName = {};
  ACTIVITIES.forEach((a) => { activityCategoryByName[a.name] = { category: a.category, tradition: a.tradition }; });

  const memories = data.memories.map((m) => {
    const catInfo = m.tag ? activityCategoryByName[m.tag] : null;
    return {
      ...m,
      hasIcon: !!catInfo,
      iconHtml: catInfo ? categoryIconSvg(catInfo.category, '#fff') : '',
      iconHtmlDark: catInfo ? categoryIconSvg(catInfo.category, '#7A5FA0') : '',
      resources: catInfo ? (TRADITION_RESOURCES[catInfo.tradition] || []) : [],
      isSelected: s.selectedMemoryIds.includes(m.id),
    };
  });
  const selectedMemory = memories.find((m) => m.id === s.selectedMemoryId) || memories[0];

  const todayLogs = data.logs.filter((l) => l.dateKey === todayKey());
  const activityCount = todayLogs.filter((l) => l.type === 'activity').length;
  const todaySummaryLine = activityCount > 0
    ? `Based on today's log: ${activityCount} ${activityCount === 1 ? 'activity' : 'activities'} logged.`
    : 'Nothing logged yet today.';

  const notesWithMeta = data.notes.map((n) => ({ ...n, ...MOOD_META[n.mood], isSelected: s.selectedNoteIds.includes(n.id) }));

  const switcherChildren = data.children.map((c) => ({
    ...c, initial: c.name[0], ageLabel: monthsToLabel(c.ageMonths), isActive: c.id === data.activeChildId,
  }));

  return {
    screen: s.screen,
    caregiverName: data.caregiverName,
    caregiverRole: data.caregiverRole,
    caregiverPhotoURL: data.caregiverPhotoURL,
    childName: child.name,
    childAgeLabel: monthsToLabel(child.ageMonths),
    childAgeStage: stageForMonths(child.ageMonths),
    activeChildInitial: child.name[0],
    activeChildSwatch: child.swatch,
    activeChildPhotoURL: child.photoURL,

    activities, visibleActivities, traditionFilters, focusAreaFilters, selectedActivity, suggestedActivity,
    ageFitOnly: s.ageFitOnly,

    domains, domainsForScrapbook, selectedMilestone,
    milestoneBackLabel: s.milestoneBackTarget === 'scrapbook-milestones' ? 'Scrapbook' : 'Progress',

    focusOptions, roleOptions: ROLE_OPTIONS,
    draftChild: draft, draftFocusOptions,
    caregiverDraft: s.caregiverDraft,
    caregiverFlowFrom: s.caregiverFlowFrom,

    logEntries: todayLogs,
    logNoteText: s.logNoteText, logPhoto: s.logPhoto,

    guideResources: GUIDE_RESOURCES, guideMedia: GUIDE_MEDIA,

    scrapbookTab: s.scrapbookTab,
    memories, selectedMemory,
    memorySelectMode: s.memorySelectMode, memorySelectionCount: s.selectedMemoryIds.length,
    newMemoryCaption: s.newMemoryCaption, newMemoryPhoto: s.newMemoryPhoto,

    moodOptions: ['smooth', 'mixed', 'tough'].map((key) => ({ key, ...MOOD_META[key], active: s.noteMood === key })),
    notesWithMeta, noteSelectMode: s.noteSelectMode, noteSelectionCount: s.selectedNoteIds.length,
    noteMood: s.noteMood, noteMessage: s.noteMessage, todaySummaryLine,

    printType: s.printType,
    printTitle: s.printType === 'memories' ? child.name + "'s Memories" : child.name + "'s Handoff Notes",
    printItems: s.printType === 'memories'
      ? memories.filter((m) => s.selectedMemoryIds.includes(m.id)).map((m) => ({ title: m.caption, meta: m.date, sub: m.tag || '' }))
      : s.printType === 'notes'
        ? notesWithMeta.filter((n) => s.selectedNoteIds.includes(n.id)).map((n) => ({ title: n.label, meta: n.date, sub: n.message }))
        : [],

    shareToast: s.shareToast,
    showChildSwitcher: s.showChildSwitcher, switcherChildren,

    showTabBar: ['home', 'activities', 'scrapbook', 'progress', 'profile'].includes(s.screen),
    childDataLoading: data.childDataLoading,
    authError: s.authError,
  };
}

function onboardingOnlyVals() {
  return {
    caregiverName: data.caregiverName,
    caregiverRole: data.caregiverRole,
    caregiverDraft: ui.caregiverDraft,
    caregiverFlowFrom: ui.caregiverFlowFrom,
    draftChild: ui.draftChild || { name: '', ageMonths: 24, focusAreas: [] },
    draftFocusOptions: FOCUS_LIST.map((label) => ({ label, selected: (ui.draftChild?.focusAreas || []).includes(label) })),
    roleOptions: ROLE_OPTIONS,
    showTabBar: false,
    authError: ui.authError,
  };
}

export { FOCUS_LIST, ROLE_OPTIONS };
