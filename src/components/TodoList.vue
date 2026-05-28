<template>
  <ul class="todoLists">
    <TodoItem v-for="todo of todos" :key="todo.id" icon="nf-fa-remove" :todo="todo" />
    <li v-if="todos.length === 0" class="empty-state">No todos yet</li>
  </ul>
</template>

<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import type { Todo } from '../types/todos.type'

defineProps<{
  todos: Todo[]
  filter?: string
}>()
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-style: italic;
}
</style>
