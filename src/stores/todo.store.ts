import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apolloClient } from '@/apollo/client'
import { GET_TODOS, ADD_TODO, TOGGLE_TODO, DELETE_TODO, TODOS_SUB } from '@/graphql/todos'
import type { Todo } from '../types/todos.type'

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function updateCacheAfterAdd(newTodo: Todo) {
  const cache = apolloClient.cache
  cache.modify({
    fields: {
      todos(existingTodos: Todo[] = []) {
        return [newTodo, ...existingTodos]
      },
    },
  })
}

function updateCacheAfterDelete(todoId: string) {
  const cache = apolloClient.cache
  cache.modify({
    fields: {
      todos(existingTodos: Todo[] = [], { READ }) {
        return existingTodos.filter((todo) => READ(todo).id !== todoId)
      },
    },
  })
}

function updateCacheAfterToggle(todoId: string, isDone: boolean) {
  const cache = apolloClient.cache
  cache.modify({
    fields: {
      todos(existingTodos: Todo[] = [], { READ }) {
        return existingTodos.map((todo) => {
          if (READ(todo).id === todoId) {
            return { ...todo, is_done: isDone }
          }
          return todo
        })
      },
    },
  })
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchTodos() {
    loading.value = true
    error.value = null
    try {
      const { data } = await apolloClient.query<{ todos: Todo[] }>({
        query: GET_TODOS,
        fetchPolicy: 'network-only', // keep it simple for students
      })
      todos.value = data.todos
    } catch (e: any) {
      error.value = e.message ?? 'Failed to load todos'
    } finally {
      loading.value = false
    }
  }

  async function addTodo(title: string) {
    const clean = title.trim()
    if (!clean) return

    const todoId = generateUUID()
    const optimisticTodo: Todo = {
      id: todoId,
      title: clean,
      is_done: false,
      created_at: new Date().toISOString(),
    }

    todos.value.unshift(optimisticTodo)

    try {
      const { data } = await apolloClient.mutate<{ insert_todos_one: Todo }>({
        mutation: ADD_TODO,
        variables: { title: clean },
      })

      if (data?.insert_todos_one) {
        const index = todos.value.findIndex((t) => t.id === optimisticTodo.id)
        if (index !== -1) {
          todos.value[index] = data.insert_todos_one
          updateCacheAfterAdd(data.insert_todos_one)
        }
      }
    } catch (e: any) {
      const index = todos.value.findIndex((t) => t.id === optimisticTodo.id)
      if (index !== -1) {
        todos.value.splice(index, 1)
      }
      error.value = e.message ?? 'Failed to add todo'
    }
  }

  async function toggleTodo(todo: Todo) {
    const originalValue = todo.is_done
    const newValue = !originalValue

    const index = todos.value.findIndex((t) => t.id === todo.id)
    if (index !== -1) {
      todos.value[index].is_done = newValue
    }

    try {
      await apolloClient.mutate({
        mutation: TOGGLE_TODO,
        variables: { id: todo.id, done: newValue },
      })
      updateCacheAfterToggle(todo.id, newValue)
    } catch (e: any) {
      if (index !== -1) {
        todos.value[index].is_done = originalValue
      }
      error.value = e.message ?? 'Failed to toggle todo'
    }
  }

  async function deleteTodo(id: string) {
    const index = todos.value.findIndex((t) => t.id === id)
    const backup = index !== -1 ? todos.value[index] : null

    if (index !== -1) {
      todos.value.splice(index, 1)
    }

    try {
      await apolloClient.mutate({
        mutation: DELETE_TODO,
        variables: { id },
      })
      updateCacheAfterDelete(id)
    } catch (e: any) {
      if (backup && index !== -1) {
        todos.value.splice(index, 0, backup)
      }
      error.value = e.message ?? 'Failed to delete todo'
    }
  }

  async function clearAll() {
    await Promise.all(todos.value.map((t) => deleteTodo(t.id)))
  }

  // Optional: realtime updates (subscription)
  function startRealtime() {
    const obs = apolloClient.subscribe<{ todos: Todo[] }>({
      query: TODOS_SUB,
    })

    const sub = obs.subscribe({
      next: ({ data }) => {
        if (data?.todos) todos.value = data.todos
      },
      error: (e) => {
        // keep app running even if WS fails
        console.error('Subscription error', e)
      },
    })

    return () => sub.unsubscribe()
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    startRealtime,
    clearAll,
  }
})
