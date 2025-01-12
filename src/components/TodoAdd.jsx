import useForm from "../hooks/useForm";
import PropTypes from "prop-types";

const TodoAdd = ({ handleNewTodo }) => { 
    const { title, description, dueDate, onInputChange, onResetForm } = useForm({
        title: "",
        description: "",
        dueDate: "",
    });
    
    const onFormSubmit = (e) => {
        e.preventDefault();

        if (title.trim().length <= 1) return;

        let newTodo = {
            id: new Date().getTime(),
            title: title.trim(),
            description: description.trim(),
            dueDate: dueDate ? new Date(dueDate) : null,
            status: "TODO",
            user: null,
        };
        
        handleNewTodo(newTodo);
        onResetForm();
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div className="input-row">
            <input 
                type="text" 
                className="input-add" 
                name="title" 
                value={title}
                onChange={onInputChange}
                placeholder="¿Qué quieres hacer?" 
            />
            <input
                type="date"
                className="input-add"
                name="dueDate"
                value={dueDate}
                onChange={onInputChange}
            />
            </div>
            <textarea
                className="input-add"
                name="description"
                value={description}
                onChange={onInputChange}
                placeholder="Descripción de la tarea"
            />
            <button className="btn-add" type="submit">Añadir</button>
        </form>
    );
};

TodoAdd.propTypes = {
    handleNewTodo: PropTypes.func.isRequired,
};

export default TodoAdd;
