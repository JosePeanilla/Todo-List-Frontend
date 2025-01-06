import useForm from "../hooks/useForm";
import PropTypes from "prop-types";

const TodoAdd = ({handleNewTodo}) => { 

    const {title, onInputChange, onResetForm} = useForm({
        title: "",
    });
    
    const onFormSubmit = (e) => {
         e.preventDefault();

         console.log("Título antes de enviar:", title);

         if (title.trim().length <= 1) return;

         let newTodo = {
            id: new Date().getTime(),
            title: title.trim(),
            description: title.trim(),
            status: "TODO",
            duedate: null,
            user: null
        };
        
         handleNewTodo(newTodo);
         onResetForm();

        };

    return (
    <form onSubmit={onFormSubmit}>
        <input 
            type="text" 
            className="input-add" 
            name="title" 
            value={title}
            onChange={onInputChange}
            placeholder="¿Qué quieres hacer?" 
        />
        <button className="btn-add" type="submit">Añadir</button>
    </form>
    );
};

TodoAdd.propTypes = {
    handleNewTodo: PropTypes.func.isRequired,
};

export default TodoAdd;