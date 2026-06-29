# Git2Page — Runde 3: Verbleibende Probleme

Nach zwei Runden von Verbesserungen habe ich den gesamten Code noch einmal sehr gründlich analysiert. Die kritischen Bugs und offensichtlichen Probleme sind jetzt alle behoben. Was noch bleibt sind **subtile, aber echte Probleme** auf einer tieferen Ebene.

---

## 1. Echte Bugs die noch existieren

### 1.1 `OrganizationItem` nutzt noch `rel="noreferrer"` statt `rel="noopener noreferrer"`
- **Datei:** `src/components/details-card/index.tsx:127`
- **Problem:** Die interne `<a>` in `OrganizationItem.renderValue()` hat `rel="noreferrer"` — dasselbe Problem wie bei PublicationCard, das wir schon gefixt haben. Inkonsistent.
- **Fix:** `rel="noopener noreferrer"`

### 1.2 `getFormattedMastodonValue`— falsche `split('@')` Logik
- **Datei:** `src/components/details-card/index.tsx:51`
- **Code:** `const [username, server] = mastodonValue.split('@');`
- **Problem:** Der Mastodon-Wert hat das Format `username@server` (z.B. `alice@mastodon.social`). `split('@')` gibt `['alice', 'mastodon.social']` → `[username, server]` = `['alice', 'mastodon.social']`. Die Funktion baut dann den Link: `https://mastodon.social/@alice` — das ist **korrekt** für 2 Teile.
  **ABER:** Manche Mastodon-Formate sind `@username@server` (mit führendem @). Dann gibt split 3 Teile: `['', 'username', 'server']` → `[username, server]` = `['', 'username']` → Link wird `https://username/@` — **komplett kaputt**.
- **Fix:** Führendes `@` entfernen bevor split, oder split-Logik robuster machen.

### 1.3 `PublicationCard` rendert `<a href={item.link}>` auch wenn `link` undefined ist
- **Datei:** `src/components/publication-card/index.tsx:82`
- **Problem:** `item.link` ist `string | undefined` im Interface. Wenn `link` fehlt, wird `<a href="undefined">` gerendert — ungültiges HTML, kaputter Link.
- **Fix:** Nur `<a>` rendern wenn `link` existent, sonst nur Inhalt.

### 1.4 `AvatarCard` resume-link hat `rel="noreferrer"` statt `rel="noopener noreferrer"`
- **Datei:** `src/components/avatar-card/index.tsx:90`
- **Problem:** Inkonsistent mit den anderen externen Links die wir auf `noopener noreferrer` geändert haben.

---

## 2. Logikfehler / Edge Cases

### 2.1 `loadData` setzt `loading` auf `false` im `finally` auch wenn abortiert
- **Datei:** `src/components/gitprofile.tsx:146-148`
- **Problem:** Wenn der Request abortiert wird (StrictMode double-mount), wird `setLoading(false)` im `finally` ausgeführt. Aber der zweite (neue) Request läuft noch → Loading wird fälschlicherweise `false` während noch geladen wird.
- **Fix:** Im `finally`-Block prüfen ob der aktuelle Request der aktive ist (z.B. via AbortController-Ref).

### 2.2 `sanitizedConfig` wird nie aktualisiert wenn `config` sich ändert
- **Datei:** `src/components/gitprofile.tsx:33-35`
- **Problem:** `useState(() => getSanitizedConfig(config))` wird nur beim ersten Render ausgewertet. Wenn `config` prop sich ändert (z.B. bei HMR/Hot-Reload), bleibt `sanitizedConfig` veraltet. Der `useEffect` dep auf `[sanitizedConfig]` triggert dann nicht.
- **Fix:** `useMemo(() => getSanitizedConfig(config), [config])` statt `useState` — Config ist derived state, nicht independently mutable state.

---

## 3. UX-Probleme

### 3.1 Kein Retry-Button bei API-Fehlern
- **Problem:** Wenn die GitHub API fehlschlägt (Rate Limit, Netzwerkfehler), zeigt die ErrorPage dauerhaft den Fehler. Es gibt keine Möglichkeit es nochmal zu versuchen ohne die Seite neu zu laden.
- **Fix:** ErrorPage um "Try Again"-Button erweitern der `loadData()` erneut aufruft. Dafür muss ErrorPage eine `onRetry`-Callback-prop bekommen.

### 3.2 ErrorPage nutzt hardcoded `text-gray-800` und `text-gray-600`
- **Datei:** `src/components/error-page/index.tsx:12-14`
- **Problem:** DaisyUI-Themes definieren ihre eigenen Textfarben via `text-base-content`. Die ErrorPage nutzt feste `text-gray-800`/`text-gray-600` — in dunklen Themes wird der Text unsichtbar (grau auf dunklem Hintergrund).
- **Fix:** Ersetzen durch `text-base-content` mit passender Opazität.

---

## 4. Dependency-Probleme

### 4.1 `@arifszn/blog-js` in devDependencies statt dependencies
- **Datei:** `package.json:29`
- **Problem:** `@arifszn/blog-js` wird zur Laufzeit in `blog-card/index.tsx` importiert (nicht nur beim Build). Es sollte in `dependencies` stehen, nicht `devDependencies`. Sonst fehlt es in Production.
- **Dasselbe gilt für:** `axios`, `date-fns`, `react-hotjar`, `react-icons` — alle in `devDependencies` obwohl sie runtime benötigt werden. Das sind **Production-Bugs** die nur auftreten wenn man `npm install --production` macht.

### 4.2 `vail` in devDependencies — unnötig?
- **Datei:** `package.json:50`
- **Problem:** `vail` wird nur in `docker-compose.yml` referenziert (als Docker-Image-Quelle). Es ist kein direktes Build/Runtime-Dependency. Wenn nicht verwendet, sollte es entfernt werden.

---

## 5. Security / Best Practices

### 5.1 `PWA manifest.icons` hat nur einen Eintrag ohne `purpose`
- **Datei:** `vite.config.ts:43-48`
- **Problem:** PWA-Manifest should separate `any` and `maskable` icons. Aktuell gibt es nur einen Eintrag mit ungewöhnlichen `sizes`-String `"64x64 32x32 24x24 16x16 192x192 512x512"`. Browser verstehen kommaseparierte Sizes, abermaskable Icons fehlen → PWA-Install-Prompt könnte fehlschlagen auf Android.
- **Fix:** Mindestens zwei Icon-Einträge: einen für `purpose: "any"` und einen für `purpose: "maskable"`.

---

## Priorisierung

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| 🔴 Bug | 1.2 Mastodon split mit führendem @ | Klein | Kaputte Links |
| 🔴 Bug | 1.3 PublicationCard a ohne href | Klein | Invalides HTML |
| 🔴 Bug | 2.2 sanitizedConfig nie aktualisiert | Klein | Config-Hot-Reload kaputt |
| 🔴 Bug | 4.1 Runtime deps in devDependencies | Mittel | Prod-Build bricht |
| 🟡 Bug | 1.1 OrganizationItem rel inkonsistent | Klein | Inkonsistent |
| 🟡 Bug | 1.4 AvatarCard rel inkonsistent | Klein | Inkonsistent |
| 🟡 Bug | 2.1 loading false bei abort | Klein | Flaky UI |
| 🟡 UX | 3.2 ErrorPage hardcoded Grau | Klein | Unsichtbar in Dark-Theme |
| 🟠 UX | 3.1 Retry-Button | Mittel | Bessere UX |
| 🟠 PWA | 5.1 PWA manifest icons | Mittel | PWA broken auf Android |
