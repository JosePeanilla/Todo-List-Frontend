import { useState, useRef } from "react";
import { GrEdit } from "react-icons/gr";
import PropTypes from "prop-types";
import useForm from "../hooks/useForm";

const TodoUpdate = ({ todo, handleUpdateTodo, children }) => {
  const { title, description, dueDate, onInputChange } = useForm({
    title: todo.title,
    description: todo.description || "",
    dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().slice(0, 10) : "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef();

  const handleEditClick = (e) => {
    if (!isEditing) {
      e.preventDefault();
      setIsEditing(true);
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTodo = {
      id: todo.id,
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      status: todo.status,
      user: todo.user,
    };

    handleUpdateTodo(todo.id, updatedTodo);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className={`input-update ${isEditing ? "editing" : ""}`}
        name="title"
        value={title}
        onChange={onInputChange}
        placeholder="Título de la tarea"
        readOnly={!isEditing}
        ref={inputRef}
      />
      <textarea
        className={`input-update ${isEditing ? "editing" : ""}`}
        name="description"
        value={description}
        onChange={onInputChange}
        placeholder="Descripción"
        readOnly={!isEditing}
      />
      <input
        type="date"
        className="input-update"
        name="dueDate"
        value={dueDate}
        onChange={onInputChange}
        readOnly={!isEditing}
      />

      <div className="todo-actions">
        <button
          className="btn-edit"
          type={isEditing ? "submit" : "button"}
          onClick={handleEditClick}
        >
          <GrEdit />
        </button>
        {children}
      </div>
    </form>
  );
};

TodoUpdate.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    status: PropTypes.string,
    user: PropTypes.string,
  }).isRequired,
  handleUpdateTodo: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default TodoUpdate;
