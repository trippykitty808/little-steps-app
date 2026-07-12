// Firebase wiring — loaded straight from Google's CDN as ES modules, so there's
// no npm install / build step. Everything here is plain browser JavaScript.
import { firebaseConfig } from './firebase-config.js';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
  setPersistence, browserLocalPersistence,
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import {
  initializeFirestore, persistentLocalCache, persistentSingleTabManager,
  doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, addDoc, query, orderBy, limit,
  writeBatch, serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js';
import { MILESTONES, defaultMilestoneState } from './data/milestones.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch(() => {});

let db;
try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentSingleTabManager() }),
  });
} catch (_) {
  // Falls back to the default (memory-only) cache — e.g. private browsing,
  // or a second tab already holding the persistent cache lock.
  const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js');
  db = getFirestore(app);
}
const storage = getStorage(app);

// ---------- Auth ----------
export function onAuthChange(cb) { return onAuthStateChanged(auth, cb); }
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}
export async function signOutUser() { await signOut(auth); }

// ---------- User profile ----------
export async function fetchUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}
export async function saveUserProfile(uid, patch) {
  await setDoc(doc(db, 'users', uid), patch, { merge: true });
}

// ---------- Children ----------
export async function fetchChildren(uid) {
  const snap = await getDocs(collection(db, 'users', uid, 'children'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createChild(uid, data) {
  const childRef = doc(collection(db, 'users', uid, 'children'));
  const batch = writeBatch(db);
  batch.set(childRef, { ...data, createdAt: serverTimestamp() });
  const defaults = defaultMilestoneState();
  for (const m of MILESTONES) {
    batch.set(doc(db, 'users', uid, 'children', childRef.id, 'milestones', encodeKey(m.key)), defaults[m.key]);
  }
  await batch.commit();
  return childRef.id;
}

export async function updateChild(uid, childId, patch) {
  await updateDoc(doc(db, 'users', uid, 'children', childId), patch);
}

// ---------- Daily log ----------
export async function fetchLogs(uid, childId) {
  const q = query(collection(db, 'users', uid, 'children', childId, 'logs'), orderBy('createdAt', 'desc'), limit(100));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addLog(uid, childId, entry) {
  const ref = await addDoc(collection(db, 'users', uid, 'children', childId, 'logs'), {
    ...entry, createdAt: serverTimestamp(),
  });
  return ref.id;
}

// ---------- Milestones ----------
// Firestore doc IDs can't contain "/"; our catalog keys only use "|" so this
// is mostly a safety net if that ever changes.
function encodeKey(key) { return key.replace(/\//g, '__'); }

export async function fetchMilestoneState(uid, childId) {
  const snap = await getDocs(collection(db, 'users', uid, 'children', childId, 'milestones'));
  const out = defaultMilestoneState();
  snap.docs.forEach((d) => { out[d.id.replace(/__/g, '/')] = d.data(); });
  return out;
}

export async function updateMilestone(uid, childId, key, patch) {
  await setDoc(doc(db, 'users', uid, 'children', childId, 'milestones', encodeKey(key)), patch, { merge: true });
}

// ---------- Memories ----------
export async function fetchMemories(uid, childId) {
  const q = query(collection(db, 'users', uid, 'children', childId, 'memories'), orderBy('createdAt', 'desc'), limit(200));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addMemory(uid, childId, memory) {
  const ref = await addDoc(collection(db, 'users', uid, 'children', childId, 'memories'), {
    ...memory, createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateMemory(uid, childId, memoryId, patch) {
  await updateDoc(doc(db, 'users', uid, 'children', childId, 'memories', memoryId), patch);
}

// ---------- Planner (scheduled activities) ----------
export async function fetchPlans(uid, childId) {
  const snap = await getDocs(collection(db, 'users', uid, 'children', childId, 'plans'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addPlan(uid, childId, plan) {
  const ref = await addDoc(collection(db, 'users', uid, 'children', childId, 'plans'), {
    ...plan, createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function removePlanEntry(uid, childId, planId) {
  await deleteDoc(doc(db, 'users', uid, 'children', childId, 'plans', planId));
}

// ---------- Meal plan (scheduled recipes) ----------
export async function fetchMeals(uid, childId) {
  const snap = await getDocs(collection(db, 'users', uid, 'children', childId, 'meals'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addMeal(uid, childId, meal) {
  const ref = await addDoc(collection(db, 'users', uid, 'children', childId, 'meals'), {
    ...meal, createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function removeMealEntry(uid, childId, mealId) {
  await deleteDoc(doc(db, 'users', uid, 'children', childId, 'meals', mealId));
}

// ---------- Handoff notes ----------
export async function fetchNotes(uid, childId) {
  const q = query(collection(db, 'users', uid, 'children', childId, 'notes'), orderBy('createdAt', 'desc'), limit(100));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addNote(uid, childId, note) {
  const ref = await addDoc(collection(db, 'users', uid, 'children', childId, 'notes'), {
    ...note, createdAt: serverTimestamp(),
  });
  return ref.id;
}

// ---------- Media uploads (photos & video) ----------
// Replaces the design prototype's design-tool-only <image-slot> placeholder
// with a real upload to Firebase Storage. Works for any file (image or video);
// returns a public download URL.
export async function uploadPhoto(uid, pathParts, file) {
  const path = ['users', uid, ...pathParts].join('/');
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
export const uploadMedia = uploadPhoto; // clearer name for video-or-photo callers

export { auth };
