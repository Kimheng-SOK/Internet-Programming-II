#### Mutation

```sql
mutation MyMutation {
  insert_todos_one(object: {is_done: false, title: "eat cake", id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", created_at: "2024-01-10T08:00:00.000Z"}) {
    is_done: is_done
    title: title
    id: id
    created_at: created_at
  }
}
```
