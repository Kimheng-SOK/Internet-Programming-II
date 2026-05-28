<template>
  <div class="container">
    <AddTodo @added="handleAddTodo" />

    <h3 v-if="nbOfPending > 0">Pending Tasks:</h3>
    <TodoLists status="pending" />

    <h3 v-if="nbOfCompleted > 0">Completed Tasks:</h3>
    <TodoLists status="completed" />

    <div class="pending-tasks">
      <span>
        You have <span class="pending-num"> {{ nbOfPending }} </span> tasks pending.
      </span>
      <button class="clear-button" @click="clearAllTodos">Clear All</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todo.store'
import AddTodo from '@/components/AddTodo.vue'
import TodoLists from '@/components/TodoList.vue'

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)

let stopRealtime: null | (() => void) = null

onMounted(async () => {
  await todoStore.fetchTodos()
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())

const nbOfPending = computed(() => todos.value?.filter((todo) => !todo.is_done).length ?? 0)

const nbOfCompleted = computed(() => todos.value?.filter((todo) => todo.is_done).length ?? 0)

function handleAddTodo(title: string) {
  todoStore.addTodo(title)
}

function clearAllTodos() {
  todoStore.clearAll()
}
</script>

<style>
@import 'https://www.nerdfonts.com/assets/css/webfont.css';
@import 'https://unicons.iconscout.com/release/v4.0.0/css/line.css';
</style>
