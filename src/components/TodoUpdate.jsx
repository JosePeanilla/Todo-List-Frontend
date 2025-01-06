import { useState, useRef } from "react";
import { GrEdit } from "react-icons/gr";
import PropTypes from "prop-types";
import useForm from "../hooks/useForm";

const TodoUpdate = ({ todo, handleUpdateTodo }) => {
    const { title, onInputChange } = useForm({
        title: todo.title,
    });

    const [disabled, setDisabled] = useState(true);
    const focusInputRef = useRef();

    const onSubmitUpdate = (e) => {
        e.preventDefault();

        const id = todo.id;
        const updatedTitle = title;

        handleUpdateTodo(id, updatedTitle);
        setDisabled(!disabled);
        focusInputRef.current.focus();
        
    };

    return (
        <form onSubmit={onSubmitUpdate}>
            <input
                type="text"
                className={`input-update ${todo.status === "DONE" ? "text-decoration-dashed" : ""} ${!disabled ? "editing" : ""}`}
                name="title"
                value={title}
                onChange={onInputChange}
                placeholder="¿Qué quieres hacer?"
                readOnly={disabled}
                ref={focusInputRef}
            />
            <button className="btn-edit" type="button" onClick={() => setDisabled(!disabled)}>
                <GrEdit />
            </button>
        </form>
    );
};

TodoUpdate.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        done: PropTypes.bool, 
        status: PropTypes.string
    }).isRequired,
    handleUpdateTodo: PropTypes.func.isRequired,
    
};

export default TodoUpdate;
