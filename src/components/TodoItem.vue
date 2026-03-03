<template>
  <li class="list pending" @click="toggleStatus(todo.id)">
    <input type="checkbox" :checked="todo.completedAt != null" />
    <span class="task">{{ todo.name }}</span>
    <i class="nf" :class="icon" style="color: red;" @click="removeTodo(todo.id)"></i>
  </li>
</template>
<script>
import { useTodoStore } from "../stores/todo";
export default {
  setup() {
    const todoStore = useTodoStore();
    return { todoStore };
  },
  props: ["todo", "icon"],
  methods: {
    toggleStatus(todoId) {
      this.todoStore.toggleStatus(todoId);
    },

    removeTodo(todoId) {
      this.todoStore.removeTodo(todoId);
      console.log("remove todo with id: ", todoId);
    },
  },
};
</script>
