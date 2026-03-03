import { defineStore } from "pinia";

const API_URL = "http://localhost:3000/tasks";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.length,
    countPending: (state) => state.todos.filter(t => !t.completedAt).length,
  },
  actions: {
    async fetchTodos() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        this.todos = data;
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },

    async removeTodo(id) {
      try {
        await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        this.todos = this.todos.filter((t) => t.id != id);
      } catch (error) {
        console.error("Error removing task:", error);
      }
    },

    async toggleStatus(id) {
      const todo = this.todos.find((t) => t.id === id);
      if (!todo) return;
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completedAt: todo.completedAt ? null : new Date().toISOString(),
          }),
        });
        const updatedTodo = await res.json();
        this.todos = this.todos.map((t) => (t.id === id ? updatedTodo : t));
        // console.log("Toggled status for task with id:", id);
        // console.log("Updated task:", updatedTodo);
      } catch (error) {
        console.error("Error toggling status:", error);
      }
    },

    async addTodo(todo) {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: todo,
          description: "description",
        }),
      });
      const newTodo = await res.json();
      this.todos.push(newTodo);
    },

    async clearAll() {
      await fetch(`${API_URL}`, {
        method: "DELETE",
      });
      this.todos = [];
    },
  },
});
