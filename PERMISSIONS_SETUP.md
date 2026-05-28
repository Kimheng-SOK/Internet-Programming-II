# Permission Switching Guide

## Hasura Setup

### Step 1: Create Two Roles in Hasura

In **Hasura Console → Data → Manage → Roles**, create/verify two roles:
- `anonymous` (read-only)
- `teacher` (read+write)

### Step 2: Configure Anonymous Role (Read-Only)

1. Go to **Permissions → todos → anonymous**
2. Set permissions:
   - **SELECT** ✅ All rows, All columns
   - **INSERT** ❌ Not allowed
   - **UPDATE** ❌ Not allowed
   - **DELETE** ❌ Not allowed

### Step 3: Configure Teacher Role (Read+Write)

1. Go to **Permissions → todos → teacher**
2. Set permissions:
   - **SELECT** ✅ All rows, All columns
   - **INSERT** ✅ title, is_done
   - **UPDATE** ✅ title, is_done
   - **DELETE** ✅ Allowed

### Step 4: Update Your `.env` File

```env
VITE_HASURA_HTTP=https://your-hasura.hasura.app/v1/graphql
VITE_HASURA_WS=wss://your-hasura.hasura.app/v1/graphql
VITE_HASURA_ROLE=anonymous  # Start with anonymous (read-only)
```

## Frontend Role Switching

### Option A: Fixed Role via Environment Variable

If you want `anonymous` (read-only) by default, keep `.env` as:
```env
VITE_HASURA_ROLE=anonymous
```

To test teacher role, update `.env` to:
```env
VITE_HASURA_ROLE=teacher
```

Then restart `npm run dev`.

### Option B: Dynamic Role Switching (Advanced)

To toggle between roles at runtime, you can use the `useRoleStore()`:

```typescript
// In your Vue component
import { useRoleStore } from '@/stores/role.store'

const roleStore = useRoleStore()

// Switch to teacher
roleStore.setRole('teacher')

// Switch back to anonymous
roleStore.setRole('anonymous')
```

Create `src/stores/role.store.ts`:

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRoleStore = defineStore('role', () => {
  const currentRole = ref<'anonymous' | 'teacher'>(
    (import.meta.env.VITE_HASURA_ROLE as 'anonymous' | 'teacher') || 'anonymous'
  )

  function setRole(role: 'anonymous' | 'teacher') {
    currentRole.value = role
    // Reload page to apply new role (simplest approach)
    location.reload()
  }

  return { currentRole, setRole }
})
```

## Testing

### Test Anonymous (Read-Only)
1. Set `.env` to `VITE_HASURA_ROLE=anonymous`
2. Run `npm run dev`
3. Verify:
   - ✅ Can see todos list
   - ❌ Add button should fail (no write permission)
   - ❌ Delete should fail
   - ❌ Toggle should fail

### Test Teacher (Read+Write)
1. Set `.env` to `VITE_HASURA_ROLE=teacher`
2. Run `npm run dev`
3. Verify:
   - ✅ Can see todos
   - ✅ Add todo works
   - ✅ Delete works
   - ✅ Toggle done status works

## Error Handling

When a user with insufficient permissions tries an operation, they'll see:
- Network error in console
- `error` ref in the Pinia store will contain the error message
- UI should display: `error.value` if available

The error will look like:
```
GraphQL error: permission denied
```

## Reference

- [Hasura Permissions Docs](https://hasura.io/docs/latest/auth/authorization/permissions/index/)
- [Hasura Roles](https://hasura.io/docs/latest/auth/authorization/roles-permissions/#roles-and-permissions)
