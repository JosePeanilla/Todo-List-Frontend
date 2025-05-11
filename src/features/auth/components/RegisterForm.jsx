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
            <label htmlFor="firstName">Nombre</label>
            <input id="firstName" name="firstName" onChange={handleChange} required />

            <label htmlFor="lastName">Apellido</label>
            <input id="lastName" name="lastName" onChange={handleChange} required />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" onChange={handleChange} required />

            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" name="password" onChange={handleChange} required />

            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
            <button type="submit">Registrarse</button>
        </form>

    );
};

export default RegisterForm;
