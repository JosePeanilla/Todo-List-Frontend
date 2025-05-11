import { useState } from "react";
import { registerUser } from "../services/authService";

const RegisterForm = () => {
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(form);
            setSuccess("Usuario creado con éxito");
        } catch (err) {
            console.error(err);
            setError("Error al crear usuario");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="firstName" onChange={handleChange} required />
            <input name="lastName" onChange={handleChange} required />
            <input name="email" onChange={handleChange} required />
            <input type="password" name="password" onChange={handleChange} required />
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default RegisterForm;
