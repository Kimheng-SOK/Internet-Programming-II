<template>
  <ul class="todoLists">
    <template v-if="status == 'completed'">
      <TodoItem v-for="todo of completedTasks" :key="todo.id" icon="nf-fa-remove" :todo="todo" />
    </template>
    <template v-else>
      <TodoItem v-for="todo of pendingTasks" :key="todo.id" icon="nf-fa-remove" :todo="todo" />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '../stores/todo.store'

const props = defineProps<{ status: string }>()

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)

onMounted(async () => {
  await todoStore.fetchTodos()
})

const completedTasks = computed(() => todos.value?.filter((todo) => todo.is_done) ?? [])

const pendingTasks = computed(() => todos.value?.filter((todo) => !todo.is_done) ?? [])
</script>
