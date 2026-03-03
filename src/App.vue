<template>
  <div class="container">
    <AddTodo @added="handleAddTodo" />
    <h3 v-if="nbOfPending > 0">Pending Tasks:</h3>
    <TodoLists status="pending" />

    <h3 v-if="nbOfTodo - nbOfPending > 0">Completed Tasks:</h3>
    <TodoLists status="completed" />
    <div class="pending-tasks">
      <span
        >You have <span class="pending-num"> {{ nbOfPending }} </span> tasks
        pending.</span
      >
      <button class="clear-button" @click="clearAllTodos()">Clear All</button>
    </div>
  </div>
</template>
<script>
import { mapState } from "pinia";
import AddTodo from "./components/AddTodo.vue";
import TodoLists from "./components/TodoList.vue";

import { useTodoStore } from "./stores/todo";
export default {
  name: "App",
  setup() {
    const store = useTodoStore();
    return {
      store,
    };
  },
  components: {
    AddTodo,
    TodoLists,
  },
  computed: {
    ...mapState(useTodoStore, {
      nbOfTodo: "countTodos",
      nbOfPending: "countPending",
    }),
  },
  methods: {
    handleAddTodo(todo) {
      this.store.addTodo(todo);
    },

    clearAllTodos() {
      console.log("clear");
      this.store.clearAll();
    },
  },
};
</script>
<style>
@import "https://www.nerdfonts.com/assets/css/webfont.css";
@import "https://unicons.iconscout.com/release/v4.0.0/css/line.css";
</style>
