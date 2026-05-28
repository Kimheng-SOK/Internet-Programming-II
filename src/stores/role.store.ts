import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRoleStore = defineStore('role', () => {
  const currentRole = ref<'anonymous' | 'teacher'>(
    (import.meta.env.VITE_HASURA_ROLE as 'anonymous' | 'teacher') || 'anonymous'
  )

  function setRole(role: 'anonymous' | 'teacher') {
    currentRole.value = role
    // Reload to apply new role headers
    location.reload()
  }

  return { currentRole, setRole }
})
