import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

const TodoList = ({ todos, handleUpdateTodo, handleDeleteTodo, handleCompleteTodo }) => {
    if (!todos || todos.length === 0) {
        return <p className="no-todos">No hay tareas disponibles.</p>;
    }

    return (
        <ul>
            {todos.map(todo => (
                <TodoItem
                key={`${todo.id}-${todo.status}`} 
                todo={todo}
                handleUpdateTodo={handleUpdateTodo}
                handleDeleteTodo={handleDeleteTodo}
                handleCompleteTodo={handleCompleteTodo}
            />
            ))}
        </ul>
    );
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string, 
            done: PropTypes.bool, 
        })
    ).isRequired,
    handleUpdateTodo: PropTypes.func.isRequired,
    handleDeleteTodo: PropTypes.func.isRequired,
    handleCompleteTodo: PropTypes.func.isRequired,
};

export default TodoList;