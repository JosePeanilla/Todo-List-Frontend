import { useState } from "react";

export const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm);
    
    const onInputChange = (e) => {
        const { name, value } = e.target;
        console.log("Input actualizado:", name, value);
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    return{
        ...formState,
        formState,
        onInputChange,
        onResetForm
    };
};

export default useForm
