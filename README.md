# K-Quant phone app

A small installable web app (PWA) that shows your bot's status, daily report and
alerts. It reads straight from the GitHub API, so Gmail is no longer involved,
and it needs no changes to your workflows.

What it shows:
- **Health strip**: your last 24 workflow runs, coloured by result.
- **Daily report**: the latest comment (or issue body) on the issue titled
  "K-Quant daily report", rendered by GitHub. Swipe back through older ones.
- **Needs attention**: open issues (like "research (shadow B) run failed") and
  failed runs from the last 3 days.
- **Workflows**: the latest result of each workflow.

It also keeps the last data on your phone, so it still opens offline.

## 1. Make a read-only GitHub token (2 min)

GitHub → Settings → Developer settings → Personal access tokens →
**Fine-grained tokens** → Generate new token.

- Repository access: **Only select repositories** → `kratveer/kquant`
- Permissions (all **Read-only**): Actions, Issues, Metadata
- Expiry: your choice (when it expires, the app tells you to add a new one)

This token can only read that one repo. It cannot trade, push code or see
your other repos. It is saved only on your phone.

### Optional: GitHub notifications bell

GitHub's notifications API does not accept fine-grained tokens. To use the
bell, create a **classic** personal access token with only the `notifications`
scope, then add it in the app's Settings under “Notifications token”. This
scope reads your GitHub notification inbox; the app does not mark notifications
as read or change them. Keep your fine-grained repository token for the rest of
the app.

## 2. Host it for free on GitHub Pages (5 min)

The app files contain no data or secrets, so they can safely live in a
**public** repo (GitHub Pages is free for public repos). Your bot repo can stay
private.

1. Create a new public repo, e.g. `kquant-app`.
2. Upload all files from this folder (index.html, manifest.json, sw.js, the
   three icon PNGs).
3. Repo → Settings → Pages → Source: **Deploy from a branch** → `main` → `/ (root)` → Save.
4. After about a minute it's live at `https://kratveer.github.io/kquant-app/`.

(Cloudflare Pages or Netlify also work the same way, free.)

## 3. Install it on Android

1. Open that link in **Chrome** on your phone.
2. Enter your token in the settings screen that appears, then tap **Save and load**.
3. Chrome menu (⋮) → **Add to Home screen** → **Install**.

It now has its own icon and opens full screen like a normal app.

**Want a real APK instead?** Go to pwabuilder.com, paste your Pages link, choose
Android → download the package, and install the APK on your phone. Free.

## Updating

Edit the files in the `kquant-app` repo. The app picks up changes the next
time it opens with internet.

## If something looks wrong

- "No report found": check the exact title of the issue your workflow posts
  reports to and set it in the app's settings.
- "Can't open kratveer/kquant": the token is missing access to that repo, or
  the repo name is different.
