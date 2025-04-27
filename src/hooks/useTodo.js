import { useEffect, useReducer, useCallback } from "react";
import todoReducer from "../todoReducer";

// 🔥 Importante: Detectar si estamos en local o en producción
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const useTodo = () => {
    const initialState = [];

    const fetchTodos = async () => {
        try {
            const response = await fetch(`${API_URL}/tasks/all`);
            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }
            const data = await response.json();
            return Array.isArray(data)
                ? data.map(todo => ({
                    ...todo,
                    id: todo.id || todo._id || Math.random().toString(36).substr(2, 9), 
                }))
                : [];
        } catch (error) {
            console.error("Error fetching tasks:", error);
            return [];
        }
    };

    const [todos, dispatch] = useReducer(todoReducer, initialState);

    const init = useCallback(async () => {
        const todosFromBackend = await fetchTodos();
        return todosFromBackend || [];
    }, []);

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const initialTodos = await init();
                dispatch({ type: "SET_TODOS", payload: initialTodos });
            } catch (error) {
                console.error("Error loading todos:", error);
            }
        };
        loadTodos();
    }, [init]);

    const handleNewTodo = async (todo) => {
        console.log("Tarea enviada al backend:", todo);
        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todo),
            });

            if (!response.ok) {
                throw new Error("Error al guardar la tarea.");
            }

            const { task } = await response.json();
            dispatch({ type: "Add Todo", payload: { ...task, id: task.id || task._id } });
        } catch (error) {
            console.error("Error al añadir tarea:", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await fetch(`${API_URL}/tasks/${id}`, {
                method: "DELETE",
            });
            dispatch({ type: "Delete Todo", payload: id });
        } catch (error) {
            console.error("Error al eliminar tarea:", error);
        }
    };

    const handleCompleteTodo = async (id) => {
        try {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: "PATCH",
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("Error from backend:", errorDetails);
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const { task: updatedTask } = await response.json();
            console.log("Updated Task:", updatedTask);

            dispatch({
                type: "Complete Todo",
                payload: updatedTask,
            });
        } catch (error) {
            console.error("Error toggling todo status:", error);
        }
    };

    const handleUpdateTodo = async (id, updatedTodo) => {
        try {
            console.log("Intentando enviar datos al backend:", updatedTodo);

            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTodo),
            });

            if (!response.ok) {
                throw new Error(`Error al actualizar la tarea: ${response.status}`);
            }

            const { task } = await response.json();

            console.log("Respuesta recibida del backend:", task);

            dispatch({
                type: "Update Todo",
                payload: {
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    dueDate: task.dueDate,
                },
            });
        } catch (error) {
            console.error("Error al conectar con el backend:", error);
        }
    };

    return {
        todos,
        todosCount: Array.isArray(todos) ? todos.length : 0,
        pendingTodosCount: Array.isArray(todos) ? todos.filter((todo) => todo.status !== "DONE").length : 0,
        handleNewTodo,
        handleDeleteTodo,
        handleCompleteTodo,
        handleUpdateTodo,
    };
};

export default useTodo;
