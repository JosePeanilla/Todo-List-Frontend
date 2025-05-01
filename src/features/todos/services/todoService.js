import todoApi from "../../../api/todoApi";

export const getAllTodos = () => todoApi.get("/tasks/all");
export const createTodo = (todo) => todoApi.post("/tasks", todo);
export const deleteTodo = (id) => todoApi.delete(`/tasks/${id}`);
export const updateTodo = (id, data) => todoApi.put(`/tasks/${id}`, data);
export const toggleTodo = (id) => todoApi.patch(`/tasks/${id}`);
