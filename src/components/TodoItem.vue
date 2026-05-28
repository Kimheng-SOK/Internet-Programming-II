<template>
  <li class="list pending" @click="toggleStatus(todo)">
    <input type="checkbox" :checked="todo.is_done" />
    <span class="task">{{ todo.title }}</span>
    <i class="nf" :class="icon" style="color: red" @click="removeTodo(todo.id)"></i>
  </li>
</template>

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
