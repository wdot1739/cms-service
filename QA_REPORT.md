# FlowCMS v3 — QA Audit Report

Date: 2026-03-18
Auditor: QA Lead
Scope: Full codebase audit of all 27 key files


## CRITICAL Bugs (Will Cause Crashes / Build Failures)

### CRIT-1: Route ordering bug — `editor/:pageId` swallows `editor/new`
- File: `src/App.tsx:31-32`
- The route `<Route path="editor/:pageId" ...>` is declared BEFORE `<Route path="editor/new" ...>`. React Router v7 matches routes in order. The `:pageId` param route will match the literal string "new" as a pageId before the `editor/new` route is ever reached.
- Impact: The `editor/new` route is unreachable as a separate match; the page only works because `EditorPage.tsx:30` explicitly checks `pageId === 'new'`. This is fragile but currently functional — however it means the `editor/new` route declaration is dead code. Not a runtime crash, but a correctness issue if anyone changes the EditorPage logic.
- Severity: CRITICAL (route architecture)

### CRIT-2: Editor "Publish" button does nothing
- File: `src/pages/dashboard/EditorPage.tsx:123`
- The publish button in the top bar has `onClick={() => {}}` — an empty handler. The `handlePublish` function exists but is never connected to this button.
- Impact: Users cannot publish pages from the editor top-bar button. The only way to publish is through Puck's internal `onPublish` callback.
- Severity: CRITICAL (core feature broken)

### CRIT-3: Login register flow calls `login()` instead of `register()`
- File: `src/pages/LoginPage.tsx:32-33`
- The `handleSubmit` function always calls `login(email, password)` regardless of whether the user is on the "register" tab. The `register(name, email, password)` function from authStore is never imported or called.
- Impact: Registration does not actually use the register function. The name field entered during registration is ignored.
- Severity: CRITICAL (feature broken)


## MAJOR Bugs (Feature Doesn't Work Correctly)

### MAJ-1: PreviewPage is outside PrivateRoute — unauthenticated access
- File: `src/App.tsx:25`
- `<Route path="/preview/:pageId" element={<PreviewPage />} />` is placed outside the PrivateRoute wrapper. This means anyone can access page previews without authentication, including draft pages.
- Impact: Draft/unpublished content is accessible to anyone who knows or guesses the URL.
- Severity: MAJOR (security/privacy)

### MAJ-2: Dark mode toggle does not propagate to content area styles
- File: `src/pages/dashboard/DashboardLayout.tsx:34,58`
- Dark mode adds the `dark` class to `document.documentElement` AND applies `dark` class on the wrapper div. However, the content pages (DashboardHome, PagesListPage, etc.) all use hardcoded light-mode classes like `bg-white`, `text-gray-900`, `bg-gray-50`. None of them have `dark:` variants.
- Impact: Toggling dark mode has no visible effect on dashboard content. Only the wrapper gets the class but inner content ignores it.
- Severity: MAJOR (feature non-functional)

### MAJ-3: `ColumnsBlock` declared in Puck types but never registered
- File: `src/types/puck.ts:12` declares `ColumnsBlock` in `PuckBlockType`
- File: `src/lib/puckConfig.tsx` — no `ColumnsBlock` import or registration
- Impact: If any saved Puck data references `ColumnsBlock`, the Puck renderer will fail to find the component. The type allows it but the config doesn't support it.
- Severity: MAJOR (potential runtime error)

### MAJ-4: `handleSave` in EditorPage has stale closure issue
- File: `src/pages/dashboard/EditorPage.tsx:40-66`
- `handleSave` is wrapped in `useCallback` but depends on `isNew` — however `isNew` is derived from `pageId` param which is captured once. After a new page is created and the URL changes via `navigate(..., { replace: true })`, the component re-renders but the `isNew` check uses the URL param. This means subsequent saves may still see `isNew === false` if `currentPageId` was updated, but there's a race condition if the `pageId` from useParams hasn't updated yet.
- Additionally, `handlePublish` calls `handleSave` and then immediately checks `currentPageId`, but `handleSave` sets `currentPageId` via state which is async — so on first publish of a new page, `currentPageId` may still be null.
- Severity: MAJOR (data loss risk on new page publish)

### MAJ-5: Navigation anchor links on landing page don't work (SPA routing)
- File: `src/components/landing/LandingNav.tsx:37-38`
- Navigation uses `href="#features"`, `href="#how-it-works"` etc. The LandingPage sections have `id="features"` and `id="how-it-works"`. However `replace(' ', '-')` only replaces the first space — "How It Works" becomes "how-it-works" but "How It Works".toLowerCase().replace(' ', '-') = "how-it-works" (correct). Actually the replace only replaces the FIRST space, so `"How It Works"` → `"how-it-works"` is wrong — it becomes `"how-it-works"` which is actually correct since `replace(' ', '-')` with String.replace only replaces the first occurrence: `"how it works"` → `"how-it-works"`. Wait — there are TWO spaces. `"how it works".replace(' ', '-')` = `"how-it works"`. The section has `id="how-it-works"`, so the anchor `#how-it-works` won't match because the generated href is `#how-it-works` (only first space replaced).
- Actually: the nav generates `"How It Works".toLowerCase().replace(' ', '-')` = `"how-it-works"` is wrong. Step by step: `"How It Works".toLowerCase()` = `"how it works"`, then `.replace(' ', '-')` = `"how-it works"` (only first space replaced). The section id is `"how-it-works"`. So the link `#how-it-works` does NOT match section id `how-it-works` — the generated href is `#how-it-works`. Wait, I need to be more careful: the generated result is `"how-it works"` which means the link is `#how-it works` (with space). This won't scroll to `id="how-it-works"`.
- Impact: "How It Works" navigation link doesn't scroll to the correct section.
- Severity: MAJOR (broken navigation)

### MAJ-6: Settings profile "Save" button doesn't actually update the user
- File: `src/pages/dashboard/SettingsPage.tsx:81-89`
- The profile save button only shows a "saved" animation but doesn't actually call any store function to update the user's name. `profileName` state is local only.
- Impact: Profile name changes are lost on page refresh.
- Severity: MAJOR (feature non-functional)


## MINOR Bugs (UX Issues / Polish)

### MIN-1: PagesListPage search from dashboard doesn't auto-focus
- File: `src/pages/dashboard/PagesListPage.tsx:31`
- The search param `q` is read and sets the initial search state, but the results are correct. No auto-focus or highlight of the search term.
- Severity: MINOR (UX)

### MIN-2: `page.icon` used as emoji AND as Lucide icon name inconsistently
- File: `src/pages/dashboard/PreviewPage.tsx:134` — renders `page.icon` as text content in a `div`: `<div className="text-6xl mb-6">{page.icon || '📄'}</div>`
- File: `src/store/cmsStore.ts` — some pages use `'Home'`, `'BookOpen'`, `'Rocket'` (Lucide icon names), while `TemplatesPage.tsx:84` uses `'📄'` (emoji)
- File: `src/components/editor/IconPicker.tsx:48` — `PageIcon` correctly handles both formats, but PreviewPage renders the raw string instead of using PageIcon
- Impact: In PreviewPage, icon names like "Home" or "Rocket" render as text "Home" or "Rocket" instead of the actual icon.
- Severity: MINOR (visual bug)

### MIN-3: `date-fns` used without checking for invalid dates
- Multiple files use `formatDistanceToNow(new Date(page.updatedAt), ...)` — if `updatedAt` is somehow undefined or invalid, this throws.
- Severity: MINOR (defensive coding)

### MIN-4: EditorPage title state not synced when navigating between pages
- File: `src/pages/dashboard/EditorPage.tsx:33`
- `useState(existingPage?.title || '')` — initial state is set once on mount. If the user navigates from one editor page to another (e.g., `/dashboard/editor/page-1` to `/dashboard/editor/page-2`), React may reuse the component and the title state won't update.
- Impact: Editor may show wrong title when navigating between pages without full remount.
- Severity: MINOR (stale state)

### MIN-5: Footer shows "2025" copyright year
- File: `src/components/landing/LandingFooter.tsx:43`
- Hardcoded `© 2025 FlowCMS` instead of using dynamic year.
- Severity: MINOR (cosmetic)

### MIN-6: `LoginPage` doesn't reset `loading` state after submit
- File: `src/pages/LoginPage.tsx:25-33`
- `setLoading(true)` is called but never set back to `false`. After the first login attempt, if the user navigates back, the button stays disabled.
- Severity: MINOR (since navigation happens immediately, but could be an issue)

### MIN-7: `Tabs` component value for columns uses number but select uses number
- File: `src/components/blocks/TestimonialsBlock.tsx:83-87`
- The `columns` select field uses `{ value: 3, label: '3열' }` with numeric values. Puck select fields typically use string values. This may cause type mismatch depending on Puck version.
- Severity: MINOR (potential Puck compatibility issue)


## Recommendations

1. Fix route order: Move `editor/new` BEFORE `editor/:pageId` in App.tsx
2. Wire up the publish button in EditorPage to `handlePublish`
3. Fix LoginPage to call `register()` when on register tab
4. Add `dark:` Tailwind variants to all dashboard content pages, or remove the dark mode toggle
5. Register a `ColumnsBlock` component or remove it from the PuckBlockType union
6. Fix the nav anchor link generation to use `.replaceAll(' ', '-')` instead of `.replace(' ', '-')`
7. Wire up profile save to actually update the authStore user
8. Use `PageIcon` component in PreviewPage instead of raw text rendering
9. Add a `key={pageId}` on EditorPage to force remount when navigating between pages
10. Consider adding auth guard to the PreviewPage route for draft pages
