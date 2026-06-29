# Git2Page — Weitere Verbesserungen (deep analysis)

Nach der ersten Runde habe ich den Code *nochmal* Zeile für Zeile durchgegangen. Hier sind die Probleme, die wirklich stören oder Bugs sind — nicht nur Style-Nitpicks.

---

## 1. Echte Bugs

### 1.1 `GithubProjectCard` gibt `undefined` zurück wenn keine Projekte
- **Datei:** `src/components/github-project-card/index.tsx:18-20`
- **Code:** `if (!loading && githubProjects.length === 0) { return; }`
- **Problem:** Die Funktion gibt `undefined` zurück. In React erzeugt das keinen Fehler, aber der umgebende `<div className="grid grid-cols-1 gap-6">` bekommt ein leeres Kind — und der Parent-Wrapper mit `col-span-1 lg:col-span-2` + Card bleibt bestehen. Das heißt: **Die komplette Card-Umrandung (Header, Shadow, Border) wird gerendert, aber ohne Inhalt** — das ergibt eine leere Box auf der Seite.
- **Fix:** Sollte `return null` zurückgeben, und der Parent sollte die ganze Section bedingt rendern (wie bei SkillCard, ExperienceCard etc. mit `.length !== 0`). Aktuell wird `GithubProjectCard` immer gerendert wenn `display === true`, egal ob Projekte existieren.

### 1.2 `getSanitizedConfig` — `||` statt `??` bei Boolean-Werten
- **Datei:** `src/utils/index.tsx:35,113,115`
- **Code:** `config?.projects?.github?.automatic?.exclude?.forks || false` und `disableSwitch: ... || false` und `respectPrefersColorScheme: ... || false`
- **Problem:** Wenn der User explizit `forks: true` setzt, klappt `||` zufällig. Aber bei `forks: false` gibt `false || false` = `false` — auch korrekt hier. **Aber:** Falls jemals ein Wert wie `0` oder `""` vorkommt, würde `||` ihn fälschlicherweise durch das Default ersetzen. Konsequenter und sicherer ist `??`, das nur `null`/`undefined` ersetzt. Die anderen Stellen in der Config nutzen bereits `??` (z.B. `displayAvatarRing` Zeile 116, `enablePWA` Zeile 120) — inkonsistent.
- **Fix:** Alle `|| false`, `|| 0`, `|| ''` bei nicht-string defaults durch `??` ersetzen.

### 1.3 `handleError` kann `NaN` an `formatDistance` übergeben
- **Datei:** `src/components/gitprofile.tsx:151-152`
- **Code:** `new Date(error.response?.headers?.['x-ratelimit-reset'] * 1000)`
- **Problem:** Wenn der Header fehlt oder `undefined` ist, wird `undefined * 1000` = `NaN` → `new Date(NaN)` = `Invalid Date`. Das wirft dann eine Exception, die vom `catch` abgefangen wird → `GENERIC_ERROR`. Das ist *zufällig* korrekt, aber verschleiert den eigentlichen Fehler. Der `catch`-Block fängt sowohl den `formatDistance`-Fehler als auch andere Fehler — man weiß nicht, was schiefging.
- **Fix:** Header-Wert vorher validieren: `const resetTimestamp = error.response?.headers?.['x-ratelimit-reset']; if (!resetTimestamp) { setError(GENERIC_ERROR); return; }`

### 1.4 `ListItem` rendert `<a>` ohne `href` für nicht-linkende Einträge
- **Datei:** `src/components/details-card/index.tsx:86-92`
- **Problem:** `ListItem` rendert *immer* ein `<a href={link}>` — auch wenn `link` `undefined` ist. Ein `<a href="undefined">` ist ein invalides HTML-Element und erzeugt in manchen Browsern einen anklickbaren Link zu "undefined".
- **Fix:** Wenn kein `link` vorhanden, nur `{value}` rendern statt `<a>`.

### 1.5 `GithubProject.description` und `language` können `null` sein
- **Datei:** `src/interfaces/github-project.ts`
- **Problem:** Die GitHub API gibt `description: null` und `language: null` zurück wenn nicht gesetzt. Das Interface typisiert sie als `string`. Wenn `item.description` null ist, rendert React nichts (ok), aber `getLanguageColor(null)` bekommt einen invaliden Typ übergeben — funktioniert zufällig weil `typeof languageColors[null]` `undefined` ist.
- **Fix:** Interface auf `string | null` ändern und im Card-Component null abfangen.

### 1.6 `PublicationCard` — `rel="noreferrer"` statt `rel="noopener noreferrer"`
- **Datei:** `src/components/publication-card/index.tsx:84`
- **Problem:** Alle anderen externen Links nutzen `rel="noopener noreferrer"`, PublicationCard nur `rel="noreferrer"`. Zwar impliziert `noreferrer` in modernen Browsern `noopener`, aber inkonsistent und in älteren Browsern ein Security-Problem.
- **Fix:** Zu `rel="noopener noreferrer"` ändern.

---

## 2. React-Lebenszyklus-Probleme

### 2.1 `loadData` Race Condition bei StrictMode
- **Datei:** `src/components/gitprofile.tsx:98-129,131-140`
- **Problem:** In `useEffect` wird `loadData()` aufgerufen. In React 18+ StrictMode (aktiviert in `main.tsx`) wird der Effect beim Mount zweimal ausgeführt (mount → unmount → mount). Da `loadData` ein `async` ist und es kein Abort-Mechanismus gibt, kann der erste Call noch laufen wenn der zweite startet. Das führt zu:
  - `setProfile` wird vom ersten (veralteten) Call überschrieben
  - `setLoading(false)` wird vom ersten Call ausgeführt obwohl der zweite noch läuft
- **Fix:** `AbortController` in `loadData` integrieren und im Effect-Cleanup abbrechen.

### 2.2 `BlogCard` — kein Error Handling bei API-Fehlern
- **Datei:** `src/components/blog-card/index.tsx:19-33`
- **Problem:** `getMediumPost`/`getDevPost` Promises haben keinen `.catch()`. Wenn die API fehlschlägt, bleibt `articles` auf `null` → Skeleton wird ewig angezeigt. Keine Fehlermeldung, kein Fallback.
- **Fix:** `.catch(() => setArticles([]))` hinzufügen, oder Error-State.

### 2.3 `BlogCard` — `articles` lädt unabhängig von `loading`
- **Datei:** `src/components/github-project-card/index.tsx:18-20` + `src/components/blog-card/index.tsx:190`
- **Problem:** `BlogCard` hat sein eigenes `articles`-Loading, aber die `loading`-Prop vom Parent steuert den Skeleton. Wenn der Parent fertig lädt (`loading=false`) aber `articles` noch `null` ist (Blog API noch nicht zurück), wird `renderArticles()` aufgerufen was "No recent post" zeigt — obwohl die Artikel vielleicht noch laden.
- **Fix:** BlogCard sollte sein eigenes internes Loading-State haben und den Parent-Loading UND den eigenen kombinieren.

---

## 3. Security

### 3.1 `dangerouslySetInnerHTML` im Footer ohne Sanitization
- **Datei:** `src/components/footer/index.tsx:17`
- **Problem:** Der `footer`-Wert aus `git2page.config.ts` wird per `dangerouslySetInnerHTML` gerendert. Da die Config eine TS-Datei ist und vom User kontrolliert wird, ist das *akzeptabel* für dieses Projekt. Aber der aktuelle Default-Footer linkt auf `https://github.com/arifszn/gitprofile` — das ist das ursprüngliche Upstream-Projekt (gitprofile), nicht Git2Page. Das ist ein **falscher Link**.
- **Fix:** URL auf `https://github.com/6jt8/Git2Page` ändern.

### 3.2 `CONFIG` komplett via Vite `define` im Client-Bundle
- **Datei:** `vite.config.ts:55-57`
- **Problem:** `define: { CONFIG: CONFIG }` injected das *gesamte* Config-Objekt als String-Replacement in den Client-Bundle. Das beinhaltet potenziell `googleAnalytics.id`, `hotjar.id`, und künftig API-Keys. Das sind Werte die zur Build-Zeit im JS-Code landen und von jedem User im Source gesehen werden können.
- **Fix:** Nur die wirklich clientseitig nötigen Werte injecten (everything except analytics IDs could be fine, but should be documented).

---

## 4. Performance

### 4.1 `getSanitizedConfig` wird bei jedem Render im `useState`-Initializier ausgewertet
- **Datei:** `src/components/gitprofile.tsx:39-41`
- **Code:** `const [sanitizedConfig] = useState<SanitizedConfig | Record<string, never>>(getSanitizedConfig(config))`
- **Problem:** `useState` nutzt den Initialwert nur beim ersten Render, aber `getSanitizedConfig(config)` wird bei *jedem* Render ausgewertet und dann verworfen (React ruft die Funktion immer auf, speichert nur den Rückgabewert beim ersten Mal). Das ist unnötiger Overhead für eine teure Funktion.
- **Fix:** Lazy-Initializer nutzen: `useState(() => getSanitizedConfig(config))`

### 4.2 `colors.json` (34KB) komplett im Bundle
- **Datei:** `src/data/colors.json`
- **Problem:** Die Datei enthält Farben für *alle* GitHub-Sprachen (~400 Einträge). Das ist ein statischer Import der den Bundle um 34KB aufbläht. Davon werden maximal 8-10 Sprachen (bzw. so viele wie Projekte angezeigt werden) jemals abgefragt.
- **Fix:** Tree-Shaking funktioniert nicht bei JSON-Imports. Optionen: (1) auf dynamischen Import umstellen, (2) direkt in `getLanguageColor` einen Lookup aus einer kleineren Map machen, (3) die Farbe als Inline-Konstante im GithubProject speichern.

---

## 5. Fehlende Features / UX-Probleme

### 5.1 Kein Retry-Mechanismus efter API-Fehler
- **Problem:** Wenn die GitHub API fehlschlägt (Rate Limit, Netzwerkfehler), zeigt die App dauerhaft die Error-Page. Es gibt keinen "Retry"-Button.
- **Fix:** Error-Page um "Try Again"-Button erweitern der `loadData()` erneut aufruft.

### 5.2 `h-screen` auf dem Haupt-Container
- **Datei:** `src/components/gitprofile.tsx:181`
- **Code:** `<div className="fade-in h-screen">`
- **Problem:** `h-screen` fixiert die Höhe auf 100vh. Wenn der Inhalt länger ist, wird abgeschnitten oder scrollt innerhalb des Divs statt im Body. Bei Footer-Inhalt wird der Footer *unterhalb* von `h-screen` gerendert — potenziell abgeschnitten auf mobilen Geräten wo 100vh nicht dem Viewport entspricht.
- **Fix:** `min-h-screen` statt `h-screen` verwenden.

---

## Priorisierung

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| 🔴 Bug | 1.1 GithubProjectCard return undefined | Klein | Leere Box im UI |
| 🔴 Bug | 1.4 ListItem <a> ohne href | Klein | Invalides HTML |
| 🔴 Bug | 1.5 GithubProject nullable fields | Klein | Runtime-Error-Potenzial |
| 🔴 Security | 3.1 Footer verlinkt auf falsches Repo | Klein | Falscher Link |
| 🟡 Bug | 1.2 `||` statt `??` in getSanitizedConfig | Klein | Inkonsistent |
| 🟡 Bug | 1.6 rel="noreferrer" inkonsistent | Klein | Security |
| 🟡 React | 2.1 loadData Race Condition | Mittel | Flaky Loading |
| 🟡 React | 2.2 BlogCard kein Error Handling | Klein | Ewiger Skeleton |
| 🟡 Perf | 4.1 useState lazy initializer | Klein | Unnöti. Overhead |
| 🟠 UX | 5.2 h-screen → min-h-screen | Klein | Footer abgeschnitten |
| 🟠 UX | 5.1 Retry-Button bei Fehlern | Mittel | Bessere UX |
