# Git2Page Verbesserungsvorschläge

## Übersicht

Nach Analyse des gesamten Codebasics wurden folgende Verbesserungsmöglichkeiten identifiziert. Der Code ist insgesamt gut strukturiert, hat aber einige Bereiche mit suboptimaler DX, potenziellen Bugs und veralteten Patterns.

---

## 1. Kritische Bugs / Inkonsistenzen

### 1.1 `GithubProject` Interface — `stargazers_count` und `forks_count` sind `string` statt `number`
- **Datei:** `src/interfaces/github-project.tsx:5-6`
- **Problem:** Die GitHub API gibt diese Werte als Zahlen zurück, aber das Interface typisiert sie als `string`. In `github-project-card/index.tsx:110-114` werden sie ohne Umwandlung in JSX gerendert — funktioniert zwar, ist aber typisch inkonsistent und fehleranfällig.
- **Fix:** Typen auf `number` ändern.

### 1.2 `BlogCard` — `loading || !articles` prüft nicht auf `undefined`
- **Datei:** `src/components/blog-card/index.tsx:205`
- **Problem:** `articles` ist initial `[]` (leeres Array), nicht `undefined`. Die Bedingung `!articles` ist bei `[]` immer `false`, also technisch korrekt, aber irreführend. Sollte explizit `articles.length === 0` prüfen oder initial `null` sein.

### 1.3 `Footer` — `content` kann `null` sein, aber `dangerouslySetInnerHTML` erwartet `string`
- **Datei:** `src/components/footer/index.tsx:7`
- **Problem:** Der Typ `string | null` ist inkonsistent mit der Verwendung. Die Komponente gibt `null` zurück wenn `content` falsy ist, aber der Typ sollte `string` sein (da ohnehin geprüft).

---

## 2. React 19 / Modernisierung

### 2.1 `React.FC` ist deprecated
- **Betroffen:** Fast alle Komponenten (`gitprofile.tsx`, `avatar-card`, `theme-changer`, `blog-card`, `details-card`, `skill-card`, `experience-card`, `education-card`, `certification-card`, `publication-card`, `error-page`, `lazy-image`)
- **Problem:** `React.FC` wird seit React 18.2+ nicht mehr empfohlen und ist in React 19 offiziell deprecated. Es gibt keinen Typ-Check auf `children` und veraltete Semantik.
- **Fix:** Durch normale Funktionssignaturen ersetzen: `({ props }: Props): JSX.Element => ...`

### 2.2 `React.JSX.Element` vs `JSX.Element` vs `React.ReactNode`
- **Betroffen:** `gitprofile.tsx:36`, `avatar-card/index.tsx:26`, `utils/index.tsx:175`
- **Problem:** Inkonsistenter Rückgabetyp. `React.JSX.Element` ist der moderne Typ, `JSX.Element` der legacy. Besser vereinheitlichen.

### 2.3 `MouseEvent` Import aus React
- **Datei:** `src/components/theme-changer/index.tsx:5`
- **Problem:** `MouseEvent` wird aus `react` importiert, was in React 19 noch funktioniert, aber `React.MouseEvent` ist der korrekte Typ. Besser direkt als `React.MouseEvent<HTMLAnchorElement>` verwenden.

---

## 3. Code-Qualität / DX

### 3.1 `getSanitizedConfig` — massives Objekt in einer Funktion
- **Datei:** `src/utils/index.tsx:27-135`
- **Problem:** 100+ Zeilen manuelles Mapping. Sehr fehleranfällig bei Schema-Änderungen. Kein Runtime-Validation.
- **Fix:** Entweder Zod oder zumindest eine Helper-Funktion für Default-Werte verwenden. Alternative: `structuredClone` mit Defaults mergen.

### 3.2 `isDarkishTheme` — hardcoded Liste
- **Datei:** `src/utils/index.tsx:13-17`
- **Problem:** Hardcoded Liste von "dunklen" Themen. Wird aber nirgendwo im Code verwendet (Grep hat keine weiteren Referenzen gefunden). **Toter Code.**
- **Fix:** Entfernen oder verwenden.

### 3.3 `skeleton` Funktion — `style` Parameter mit leerem Objekt als Default
- **Datei:** `src/utils/index.tsx:163-188`
- **Problem:** `style = {} as React.CSSProperties` — wird bei jedem Aufruf ein neues Objekt erstellt, obwohl es meist nicht gebraucht wird. Zudem `null`-Checks für `widthCls`/`heightCls` die implizit `null` in den ClassName-String wandeln (`"null"`).

### 3.4 `details-card` — `ListItem` und `OrganizationItem` als interne Komponenten
- **Datei:** `src/components/details-card/index.tsx:60-142`
- **Problem:** Beide Komponenten sind innerhalb der Datei definiert, aber `ListItem` wird bei jedem Render von `DetailsCard` neu erstellt. Sollten ausgelagert oder mit `React.memo` wrapped werden.

### 3.5 `experience-card`, `education-card`, `certification-card` — nahezu identische `ListItem`-Komponenten
- **Problem:** Dieselbe `ListItem`-Struktur (mit Timeline-Punkt) ist in 3 Dateien dupliziert.
- **Fix:** Gemeinsame `TimelineItem`-Komponente in `src/components/timeline-item/` extrahieren.

---

## 4. Accessibility (a11y)

### 4.1 `theme-changer` — Dropdown ohne Keyboard-Support
- **Datei:** `src/components/theme-changer/index.tsx:73-105`
- **Problem:** `div` mit `tabIndex={0}` statt semantisches `<select>` oder ARIA-pattern. Dropdown wird nicht mit Keyboard bedienbar.
- **Fix:** Native `<select>`-Element oder ARIA-compliant Dropdown-Pattern verwenden.

### 4.2 `github-project-card`, `external-project-card`, `blog-card` — `<a>` mit `e.preventDefault()` und `window.open`
- **Problem:** Links werden als `<a href>` gerendert, dann aber mit `preventDefault()` blockiert und via `window.open` geöffnet. Das bricht Middle-Click, Rechtsklick, Screenreader.
- **Fix:** Entweder `<a href target="_blank" rel="noopener noreferrer"` direkt verwenden, oder `<button>` wenn es keine echten Links sind.

### 4.3 `lazy-image` — kein `loading="lazy"` Attribut
- **Datei:** `src/components/lazy-image/index.tsx:33`
- **Problem:** Die Komponente heißt "LazyImage" aber implementiert nur einen Loading-State. Das `<img>` bekommt kein natives `loading="lazy"`.
- **Fix:** `loading="lazy"` zum `<img>` hinzufügen oder IntersectionObserver verwenden.

---

## 5. Performance

### 5.1 `getGithubProjects` — `useCallback` mit vielen Dependencies
- **Datei:** `src/components/gitprofile.tsx:48-96`
- **Problem:** 7 Dependencies, darunter Arrays und Objekte. Wird bei jedem Render neu erstellt wenn sich Referenzen ändern.
- **Fix:** `useRef` für Config-Werte oder Aufruf direkt in `loadData` integrieren.

### 5.2 `LazyImage` — neues `Image()` Objekt bei jedem Render
- **Datei:** `src/components/lazy-image/index.tsx:22-29`
- **Problem:** `useEffect` ohne Cleanup. Wenn `src` sich schnell ändert, können Race Conditions entstehen.
- **Fix:** Cleanup-Funktion mit `AbortController` oder `onload = null` im Cleanup.

---

## 6. TypeScript / Typ-Sicherheit

### 6.1 `Config` Interface in `global.d.ts` — JSDoc statt TypeScript
- **Datei:** `global.d.ts`
- **Problem:** JSDoc-Kommentare statt nativer TS-Syntax. Schwer lesbar, keine Autocomplete für Config-User.
- **Fix:** In reine TypeScript-Interfaces umwandeln (bereits teilweise in `sanitized-config.tsx` geschehen — könnte konsolidiert werden).

### 6.2 `vite.config.ts` — `CONFIG` via `define` injected
- **Datei:** `vite.config.ts:55-57`
- **Problem:** `define: { CONFIG: CONFIG }` — das gesamte Config-Objekt wird in den Bundle injected. Das ist unnötig groß und potenziell unsicher (API-Keys etc.).
- **Fix:** Nur die benötigten Werte injecten oder über Umgebungsvariablen arbeiten.

---

## 7. Dateistruktur

### 7.1 `.tsx` für nicht-React-Dateien
- **Betroffen:** `src/utils/index.tsx`, `src/constants/*.tsx`, `src/interfaces/*.tsx`, `src/data/colors.json`
- **Problem:** `.tsx` wird für Dateien verwendet, die kein JSX enthalten (Interfaces, Utils, Constants). Das ist verwirrend und kann Build-Konfiguration komplizierter machen.
- **Fix:** In `.ts` umbenennen (kein JSX = `.ts`).

### 7.2 `src/data/colors.json` — 34KB JSON im Bundle
- **Problem:** Die gesamte GitHub-Sprachfarben-Datei wird in den Bundle gebundelt. Für ~37 Themes × Farben.
- **Fix:** Nur die tatsächlich verwendeten Sprachen laden oder lazy laden.

---

## Empfohlene Priorisierung

| Priorität | Punkt | Aufwand | Impact |
|-----------|-------|---------|--------|
| 🔴 Hoch | 1.1 GithubProject Typen | Klein | Bug-Potenzial |
| 🔴 Hoch | 4.2 Links mit preventDefault | Mittel | a11y, UX |
| 🟡 Mittel | 2.1 React.FC entfernen | Mittel | Zukunftssicherheit |
| 🟡 Mittel | 3.5 Timeline-Komponente extrahieren | Mittel | DRY |
| 🟡 Mittel | 4.3 LazyImage natives loading | Klein | Performance |
| 🟡 Mittel | 5.2 LazyImage Race Condition | Klein | Bug-Potenzial |
| 🟢 Niedrig | 3.2 isDarkishTheme entfernen | Klein | Dead Code |
| 🟢 Niedrig | 7.1 .tsx → .ts | Klein | Konsistenz |
| 🟢 Niedrig | 3.1 getSanitizedConfig refactoren | Groß | Wartbarkeit |
