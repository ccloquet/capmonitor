# BE-Alert Zone Monitor — PWA

Polls https://publicalerts.be every 60 seconds.
Sounds an alarm if your GPS position falls inside any active alert polygon.

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | The full app (all logic inline) |
| `manifest.json` | PWA metadata (name, icon, colors) |
| `sw.js` | Service worker (enables "Add to Home Screen") |

---

## Deploy for free in 2 minutes — GitHub Pages

1. Create a new **public** repo on GitHub (e.g. `bealert-monitor`)
2. Upload the three files to the repo root
3. Go to **Settings → Pages → Branch: main → / (root) → Save**
4. Your app will be live at `https://<yourname>.github.io/bealert-monitor/`
5. Open that URL on your phone and tap **"Add to Home Screen"**

That's it. No backend, no server, no cost.

---

## How to use

1. Open the app on your phone
2. Tap **▶ Start Monitoring**
3. Grant GPS permission when asked
4. Leave the screen on (it uses Wake Lock — screen won't turn off automatically)

The app will:
- Poll the BE-Alert feed every 60 seconds
- Show all active alerts in Belgium
- Sound a repeating alarm + highlight the card if your position is inside a zone
- Tap **Silence alarm** to stop the sound (it will re-trigger if a *new* alert appears)

---

## CORS note

The app first tries to fetch the feed directly.
If the browser blocks it (CORS), it automatically retries via a free proxy (allorigins.win).
You'll see "Using CORS proxy" in the log if this happens — it's normal.

---

## Platform notes

### Android (Chrome) ✅ Best
- Wake Lock supported: screen stays on
- Works fully as installed PWA

### iOS (Safari 16.4+) ⚠️ Partial
- Wake Lock NOT supported on iOS — go to **Settings → Display & Brightness → Auto-Lock → Never** while using the app
- Audio requires the app to be in the foreground
- Must be installed ("Add to Home Screen") for best behaviour
- Tap **Test alarm** after opening to confirm audio works

---

## Alarm behaviour

- Uses the Web Audio API (no audio file needed)
- Plays a two-tone emergency siren pattern
- Repeats every 4 seconds until silenced
- Each distinct alert GUID triggers the alarm only once per session
  (unless you reload the page)
- Expired alerts are automatically removed and won't re-trigger
