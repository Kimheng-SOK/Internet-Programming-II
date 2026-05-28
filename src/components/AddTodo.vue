<template>
  <div class="input-field">
    <textarea
      @keyup.enter.prevent="addTodo"
      ref="input"
      placeholder="Enter your new todo"
    ></textarea>
    <i class="uil uil-notes note-icon"></i>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['added'])

const addTodo = (e: Event) => {
  const target = e.target as HTMLTextAreaElement
  emit('added', target.value)
  target.value = ''
}
</script>
