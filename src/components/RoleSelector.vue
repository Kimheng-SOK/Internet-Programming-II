<template>
  <div class="role-selector">
    <label for="role-select">Role:</label>
    <select
      id="role-select"
      :value="roleStore.currentRole"
      @change="setRole(($event.target as HTMLSelectElement).value as 'anonymous' | 'teacher')"
      class="role-select"
    >
      <option value="anonymous">Anonymous</option>
      <option value="teacher">Teacher</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useRoleStore } from '@/stores/role.store'

const roleStore = useRoleStore()

function setRole(role: 'anonymous' | 'teacher') {
  roleStore.setRole(role)
}
</script>

<style scoped>
.role-selector {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

label {
  font-weight: 600;
  color: #333;
}

.role-select {
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 0.85rem;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.6rem center;
  transition: border-color 0.2s;
}

.role-select:hover {
  border-color: #007bff;
}

.role-select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
}
</style>
