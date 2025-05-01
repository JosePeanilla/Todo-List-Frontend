import { useReducer, useEffect, useCallback } from "react";
import todoReducer from "../reducer/todoReducer";
import {
    getAllTodos,
    createTodo,
    deleteTodo,
    updateTodo,
    toggleTodo,
} from "../services/todoService";

const useTodo = () => {
    const initialState = [];
    const [todos, dispatch] = useReducer(todoReducer, initialState);

    const init = useCallback(async () => {
        try {
            const { data } = await getAllTodos();
            const formatted = Array.isArray(data)
                ? data.map(todo => ({
                      ...todo,
                      id: todo.id || todo._id || crypto.randomUUID(),
                  }))
                : [];
            dispatch({ type: "SET_TODOS", payload: formatted });
        } catch (error) {
            console.error("Error loading todos:", error);
        }
    }, []);

    useEffect(() => {
        init();
    }, [init]);

    const handleNewTodo = async (todo) => {
        try {
            const { data } = await createTodo(todo);
            const task = data.task;
            dispatch({ type: "Add Todo", payload: { ...task, id: task.id || task._id } });
        } catch (error) {
            console.error("Error al añadir tarea:", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
            dispatch({ type: "Delete Todo", payload: id });
        } catch (error) {
            console.error("Error al eliminar tarea:", error);
        }
    };

    const handleCompleteTodo = async (id) => {
        try {
            const { data } = await toggleTodo(id);
            dispatch({ type: "Complete Todo", payload: data.task });
        } catch (error) {
            console.error("Error al marcar como completada:", error);
        }
    };

    const handleUpdateTodo = async (id, updatedTodo) => {
        try {
            const { data } = await updateTodo(id, updatedTodo);
            const task = data.task;
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
            console.error("Error al actualizar la tarea:", error);
        }
    };

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => todo.status !== "DONE").length,
        handleNewTodo,
        handleDeleteTodo,
        handleCompleteTodo,
        handleUpdateTodo,
    };
};

export default useTodo;
