import { useEffect, useReducer, useCallback } from "react";
import todoReducer from "../todoReducer";

const useTodo = () => {
    const initialState = [];

    const fetchTodos = async () => {
        try {
            const response = await fetch("http://localhost:3000/tasks/all");
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
            const response = await fetch("http://localhost:3000/tasks", {
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
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
        });
        dispatch({ type: "Delete Todo", payload: id });
    };

    const handleCompleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
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
    
    const handleUpdateTodo = async (id, title) => {
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                title, 
                description: "",
                dueDate: null,
                status: "TODO",
                user: null
            }),
        });
        dispatch({ type: "Update Todo", payload: { id, title } });
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
