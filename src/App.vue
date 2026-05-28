<template>
  <div class="container">
    <RoleSelector />
    <AddTodo @added="handleAddTodo" />

    <div class="filter-tabs">
      <button :class="['tab', { active: filter === 'all' }]" @click="filter = 'all'">
        All ({{ todos.length }})
      </button>
      <button :class="['tab', { active: filter === 'active' }]" @click="filter = 'active'">
        Active ({{ nbOfPending }})
      </button>
      <button :class="['tab', { active: filter === 'done' }]" @click="filter = 'done'">
        Done ({{ nbOfCompleted }})
      </button>
    </div>

    <TodoLists :todos="displayedTodos" :filter="filter" />

    <div class="pending-tasks">
      <span>
        You have <span class="pending-num"> {{ nbOfPending }} </span> tasks pending.
      </span>
      <button class="clear-button" @click="clearAllTodos">Clear All</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todo.store'
import AddTodo from '@/components/AddTodo.vue'
import TodoLists from '@/components/TodoList.vue'
import RoleSelector from '@/components/RoleSelector.vue'

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)
const filter = ref<'all' | 'active' | 'done'>('all')

let stopRealtime: null | (() => void) = null

// Challenge 2
onMounted(async () => {
  await todoStore.fetchTodos()
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())

const activeTodos = computed(() => todos.value?.filter((todo) => !todo.is_done) ?? [])
const doneTodos = computed(() => todos.value?.filter((todo) => todo.is_done) ?? [])

const nbOfPending = computed(() => activeTodos.value.length)
const nbOfCompleted = computed(() => doneTodos.value.length)

const displayedTodos = computed(() => {
  if (filter.value === 'active') return activeTodos.value
  if (filter.value === 'done') return doneTodos.value
  return todos.value ?? []
})

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

.filter-tabs {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  border-bottom: 2px solid #e0e0e0;
  flex-wrap: wrap;
}

.tab {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
  color: #666;
  white-space: nowrap;
}

.tab:hover {
  color: #333;
}

.tab.active {
  color: #007bff;
  border-bottom-color: #007bff;
  font-weight: 600;
}

@media screen and (max-width: 768px) {
  .filter-tabs {
    gap: 0.5rem;
    margin: 0.75rem 0;
  }

  .tab {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}

@media screen and (max-width: 480px) {
  .filter-tabs {
    gap: 0.3rem;
    margin: 0.5rem 0;
    border-bottom: 1px solid #e0e0e0;
  }

  .tab {
    padding: 0.5rem 0.7rem;
    font-size: 0.8rem;
    flex: 1;
    text-align: center;
  }
}
</style>
