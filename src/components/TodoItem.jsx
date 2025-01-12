import { BsTrash3Fill } from "react-icons/bs";
import TodoUpdate from "./TodoUpdate";
import PropTypes from "prop-types";

const TodoItem = ({ todo, handleUpdateTodo, handleDeleteTodo, handleCompleteTodo }) => {
    const handleCompleteClick = () => handleCompleteTodo(todo.id);

    return (
        <li className={todo.status === "DONE" ? "completed" : ""}>
            <span onClick={handleCompleteClick}>
                <label
                    className={`container-done ${todo.status === "DONE" ? "active" : ""}`}
                ></label>
            </span>
            <TodoUpdate todo={todo} handleUpdateTodo={handleUpdateTodo} />
            <button className="btn-delete" onClick={() => handleDeleteTodo(todo.id)}>
                <BsTrash3Fill />
            </button>
        </li>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        status: PropTypes.string,
        done: PropTypes.bool,
    }).isRequired,
    handleUpdateTodo: PropTypes.func.isRequired,
    handleDeleteTodo: PropTypes.func.isRequired,
    handleCompleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
