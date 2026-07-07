# Little Steps

A mobile-first PWA (installable web app) for grandparents, nannies, and sitters caring for a young child raised with Montessori and/or Waldorf methods. Log the day, run age-appropriate activities, track milestones, save memory photos, and hand off a summary to the parents.

Built from the design handoff in `design_handoff_caregiver_app/` — plain HTML/CSS/JavaScript, **no Node, no npm, no build step**. Every file in this folder is exactly what runs in the browser. You can open `index.html` in a live server or upload this whole folder to GitHub as-is.

## Is my data safe across app updates, reinstalls, and new phones?

**Yes — by design.** Everything a caregiver types or photographs (child profiles, daily logs, milestones, memories, handoff notes, photos) is saved to **Firestore and Firebase Storage** — Google's cloud database, tied to the caregiver's Google account. None of it lives only on one phone or in one browser.

That means:
- **Reinstalling the app, clearing the browser, or switching phones doesn't lose anything.** Sign in with the same Google account and everything reloads from the cloud.
- **Updating the app's code (new features, bug fixes) never touches the data.** The app's files (HTML/CSS/JS) and the data (Firestore/Storage) are completely separate systems. You can replace every file in this repo and nobody's logged data changes.
- **Adding new features later is safe.** Firestore documents don't have a fixed schema — you can add new fields to `js/state.js` / `js/firebase.js` any time without a migration step. The one rule: don't rename or remove a field that old records depend on without updating the code that reads it (the app already reads most fields with a fallback default, e.g. a milestone with no saved status just reads as "not yet").
- The only thing that's local-only is the **offline cache** (so the app keeps working with no signal) — that's just a mirror of the cloud data for speed; the cloud copy is always the source of truth and re-syncs automatically once back online.

## Set up your free Firebase project

Firebase is Google's backend service — this is what stores everyone's data securely and makes it sync across devices. It has a generous free tier ("Spark plan") for an app this size. Do this once, before your first deploy.

1. Go to **[console.firebase.google.com](https://console.firebase.google.com)** and sign in with your Google account.
2. Click **Add project**. Name it (e.g. "Little Steps"), you can turn off Google Analytics (not needed), then **Create project**.
3. On the project overview page, click the **`</>`  (Web)** icon to register a new web app. Give it any nickname, and you do **not** need to check "set up Firebase Hosting."
4. Firebase shows you a `firebaseConfig` object that looks like:
   ```js
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "...",
   };
   ```
   Copy those values into [js/firebase-config.js](js/firebase-config.js) in this folder, replacing the placeholders.
5. In the left sidebar, go to **Build → Authentication → Get started**. Under "Sign-in method," enable **Google**, pick a support email, and **Save**.
6. Go to **Build → Firestore Database → Create database**. Choose **Production mode** and pick a location close to you, then **Enable**.
7. Click the **Rules** tab in Firestore and replace the contents with:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId}/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```
   Click **Publish**. This makes sure each caregiver can only ever read or write their own data.
8. Go to **Build → Storage → Get started** (this stores the actual photos). Choose **Production mode** and the same location, **Done**.
   - Google now requires the **Blaze (pay-as-you-go) plan** to turn on Storage at all, even for tiny personal usage. Blaze has the *same* free monthly allowance as before (5GB stored, 1GB/day downloaded) — you just need a card on file as a backstop. A single family's photos should realistically cost **$0.00/month** forever.
   - **To upgrade:** bottom-left corner of the Firebase Console, click **Spark plan** → **Modify plan** → **Blaze** → link or create a billing account (add a card) → confirm.
   - **To protect yourself from surprise charges:** go to [console.cloud.google.com](https://console.cloud.google.com) (same project — Firebase projects are Google Cloud projects), then **Billing → Budgets & alerts → Create budget**. Set an amount like **$1** and keep the default alert thresholds. You'll get an email if usage ever approaches that — though at real-world usage for one family, you should never see it. Note this only *emails* you; Google doesn't offer a simple one-click auto-shutoff, only a more involved Cloud Functions setup that's overkill here.
9. Click the **Rules** tab in Storage and replace the contents with:
   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /users/{userId}/{allPaths=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```
   Click **Publish**.
10. Go to **Build → Authentication → Settings → Authorized domains**. Click **Add domain** and add your GitHub Pages domain (see below — it'll be something like `yourname.github.io`). Google sign-in won't work on the live site until this domain is on the list. `localhost` is already there by default, which is why sign-in works while testing locally.

That's it — the app is now fully wired to your own private Firebase project.

## Put this on GitHub and go live (GitHub Pages)

1. Create a new repository on GitHub (public or private both work).
2. Upload this entire `little-steps-app` folder's contents to the repository (drag-and-drop on github.com works fine, or `git push` if you're comfortable with git).
3. In the repo, go to **Settings → Pages**. Under "Build and deployment," set Source to **Deploy from a branch**, pick your main branch and the `/ (root)` folder, then **Save**.
4. GitHub gives you a URL like `https://yourname.github.io/your-repo-name/`. Wait a minute or two for the first deploy, then visit it.
5. Go back to Firebase (step 10 above) and add that exact domain (just the `yourname.github.io` part, no path) to **Authorized domains** if you haven't already.
6. On your phone, open that URL in Safari (iOS) or Chrome (Android) and use **Share → Add to Home Screen** (iOS) or the **Install app** prompt (Android/Chrome) to install it like a real app.

## Project structure

```
index.html              App shell — the only HTML file; everything else renders into it
manifest.webmanifest     PWA install metadata (name, icons, colors)
service-worker.js        Offline caching of the app's own files (never touches your data)
css/styles.css           All design tokens (colors, type, spacing) and shared component styles
icons/                   App icons (generated from scripts/gen_icons.py)
js/
  app.js                 Boots the app, renders whichever screen is active
  state.js                Central state + all navigation/data actions (the "brain")
  firebase.js             Firebase setup + all reads/writes to Firestore/Storage
  firebase-config.js       ← put your Firebase project keys here
  utils.js, photoPicker.js  Small shared helpers
  data/                   Static reference data: activities catalog, milestones catalog, guide links
  screens/                One file per screen, matching the design handoff 1:1
```

## Design fidelity

Every screen, color, font, and spacing value was ported directly from the design handoff's tokens and prototype (`design_handoff_caregiver_app/README.md` and `Caregiver App.dc.html`) — Quicksand for headings, Nunito for body text, the same sage/peach/lavender palette, same corner radii and spacing scale.

A few things were adapted from the click-through prototype to a real production app:
- **Photos**: the prototype's drag-and-drop photo placeholders are replaced with a real `<input type="file">` picker (opens the camera or photo library on a phone) that uploads to Firebase Storage.
- **Sign-in**: added a Google sign-in screen before Welcome, since real accounts are needed to keep data private and synced (the prototype had no auth — it was a single in-memory demo).
- **Starting state**: the app starts completely empty (no demo child, no seeded logs) — real onboarding creates the first child.
- **"Today so far" stats**: only activity count is shown, since logging meals/naps directly isn't part of any of the 18 designed screens (only activity logging is). Nap/meal logging would be a good next feature to design.
- **Focus area filter on Activities**: added a filter row (all 8 developmental categories) beyond the tradition/best-fit filters in the original design, per request.

## Adding features later

- New Firestore fields: just start reading/writing them in `js/firebase.js` and `js/state.js` — no migration needed, old documents simply won't have the field until touched.
- New screens: add a file in `js/screens/`, register it in `SCREEN_RENDERERS` in `js/app.js`, and add navigation actions in `js/state.js`.
- Keep using the CSS variables in `css/styles.css` for any new UI so it stays visually consistent.

## License

© 2026 Tin Roof Tek, LLC — licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). See [LICENSE.md](LICENSE.md) for full terms.
