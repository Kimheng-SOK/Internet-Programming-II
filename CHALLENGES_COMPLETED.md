# Part H Challenges — Implementation Summary

All 4 challenges have been successfully implemented! 🎉

---

## Challenge 1: Filtering (All / Active / Done) ✅

**What changed:**
- Added 3 filter tabs in `App.vue`: All, Active (pending), Done (completed)
- Each tab shows the count of todos in that category
- Computed properties: `activeTodos`, `doneTodos`, `displayedTodos`
- Simplified `TodoList.vue` to accept todos as a prop instead of managing filtering internally

**Files modified:**
- `src/App.vue` — Added filter state, tabs UI, and styled tabs
- `src/components/TodoList.vue` — Simplified to receive todos as prop

**How to use:**
- Click "All" to see all todos
- Click "Active" to see only pending tasks
- Click "Done" to see only completed tasks

---

## Challenge 2: Optimistic UI ✅

**What changed:**
- Updated local state **immediately** when user performs actions
- If mutation fails, rollback changes with error message
- Removed `fetchTodos()` calls after mutations (faster UX)

**Implementation:**
- `addTodo()` — Creates optimistic todo with temp ID, replaces it when server confirms
- `toggleTodo()` — Toggles local state immediately, reverts on error
- `deleteTodo()` — Removes from local list immediately, restores on error

**Benefits:**
- ✅ Instant UI feedback (no waiting for network)
- ✅ Graceful error recovery
- ✅ Better user experience

**Files modified:**
- `src/stores/todo.store.ts` — Updated all mutation functions

---

## Challenge 3: Better Apollo Cache ✅

**What changed:**
- Added cache update functions instead of refetching after mutations
- Uses Apollo's `cache.modify()` to update the GET_TODOS query directly
- Three helper functions:
  - `updateCacheAfterAdd()` — Prepends new todo to cached list
  - `updateCacheAfterToggle()` — Updates is_done in cache
  - `updateCacheAfterDelete()` — Removes todo from cache

**Benefits:**
- ✅ No redundant network requests
- ✅ Cache stays in sync with local state
- ✅ Smoother performance

**Files modified:**
- `src/stores/todo.store.ts` — Added cache helper functions and integrated them into mutations

---

## Challenge 4: Permission Switching ✅

**What changed:**
- Created two roles: `anonymous` (read-only) and `teacher` (read+write)
- Added `RoleSelector` component to easily switch between roles
- Created `role.store.ts` to manage current role
- Added comprehensive `PERMISSIONS_SETUP.md` guide

**Components added:**
- `src/components/RoleSelector.vue` — UI buttons to switch roles (Anonymous ↔ Teacher)
- `src/stores/role.store.ts` — Role state management

**Hasura Setup (documented in PERMISSIONS_SETUP.md):**
- **Anonymous role:** SELECT only (no write permissions)
- **Teacher role:** SELECT, INSERT, UPDATE, DELETE (full permissions)

**How to test:**
1. Read `PERMISSIONS_SETUP.md` for Hasura configuration steps
2. Click "Anonymous (Read-Only)" or "Teacher (Read+Write)" in the UI
3. Try adding/deleting todos in each role:
   - **Anonymous:** Should fail with permission error
   - **Teacher:** Should work

**Files added:**
- `src/components/RoleSelector.vue`
- `src/stores/role.store.ts`
- `PERMISSIONS_SETUP.md` (detailed setup guide)

**Files modified:**
- `src/App.vue` — Added RoleSelector component at the top

---

## Testing Checklist

- [ ] **Filtering:** Click tabs and verify correct todos display
- [ ] **Optimistic UI:** Add/toggle/delete a todo and verify instant UI update
- [ ] **Apollo Cache:** Open DevTools → check no extra network calls after mutations
- [ ] **Permissions:**
  - [ ] Set anonymous role, verify add/delete fails
  - [ ] Set teacher role, verify add/delete succeeds

---

## Files Modified/Created

### Modified
- `src/App.vue` — Added filters, tabs, RoleSelector
- `src/components/TodoList.vue` — Simplified to accept todos prop
- `src/stores/todo.store.ts` — Added optimistic updates, cache helpers

### Created
- `src/components/RoleSelector.vue` — Role switching UI
- `src/stores/role.store.ts` — Role management
- `PERMISSIONS_SETUP.md` — Setup guide

---

## Next Steps (Optional Improvements)

1. **Persist filter preference** — Save selected filter to localStorage
2. **Add animations** — Fade/slide animations when todos are added/removed
3. **Sort options** — Sort by date, alphabetically, priority
4. **Batch operations** — Delete multiple todos at once
5. **Search** — Filter todos by title keyword
