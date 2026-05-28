<template>
  <li class="list pending" @click="toggleStatus(todo)">
    <input type="checkbox" :checked="todo.is_done" />
    <span class="task">{{ todo.title }}</span>
    <button class="delete-button" @click.stop="removeTodo(todo.id)">
      <i class="nf" :class="icon" style="color: red"></i>
    </button>
  </li>
</template>

<style scoped>
.list {
  position: relative;
}

.list:hover .delete-button {
  opacity: 1;
}

.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  margin-left: auto;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.delete-button:hover i {
  color: darkred;
}
</style>

<script setup lang="ts">
import { useTodoStore } from '../stores/todo.store'
import type { Todo } from '../types/todos.type'

const props = defineProps<{
  todo: Todo
  icon: string
}>()

const todoStore = useTodoStore()

function toggleStatus(todo: Todo) {
  todoStore.toggleTodo(todo)
}

function removeTodo(id: string) {
  todoStore.deleteTodo(id)
  console.log('remove todo with id: ', id)
}
</script>
