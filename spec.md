# BSSPL - Bhanoba Security Service

## Current State
The app is a single-page company website with an embedded admin panel. The admin panel is accessed by clicking "Admin Login" in the footer, which toggles the `view` state in `App.tsx` between `"site"` and `"admin"`. There is no separate URL route for the admin panel — it is rendered as an in-app view switch, not a real separate page.

## Requested Changes (Diff)

### Add
- Client-side routing using React Router (`react-router-dom`) so the admin panel is accessible at `/admin`
- A dedicated `/admin` route that renders the `AdminPanel` component full-page
- The main website renders at `/`

### Modify
- `App.tsx`: Replace the manual `view` state toggle with React Router `Routes`/`Route` setup. The main site renders at `/`. The admin panel renders at `/admin`.
- `Footer`: Replace the `onAdminClick` button with a React Router `<Link to="/admin">` (or `window.location.href = "/admin"` navigate call) so clicking "Admin Login" navigates to `/admin`.
- `AdminPanel`: Replace the `onExit` prop callback (which previously toggled view back to "site") with `useNavigate()` to navigate back to `/`.
- `main.tsx`: Wrap the app in `<BrowserRouter>` (or use `HashRouter` for ICP static hosting compatibility).

### Remove
- The manual `view` state (`"site" | "admin"`) from `App.tsx`
- The `onAdminClick` prop from the `Footer` component
- The `onExit` prop from `AdminPanel` (replaced with internal navigation)

## Implementation Plan
1. Install `react-router-dom` if not already available (check package.json first).
2. Update `main.tsx` to wrap app with `HashRouter` (ICP apps use hash-based routing for static hosting).
3. Refactor `App.tsx` to define two routes: `/` for the main site, `/admin` for the admin panel.
4. Update `Footer` to use `useNavigate` or a plain `<a href="#/admin">` link instead of an `onAdminClick` callback prop.
5. Update `AdminPanel` to use `useNavigate` internally to go back to `"/"` instead of calling `onExit`.
6. Validate (typecheck + build).
