import { useState } from "react";
import { loginUser } from "../services/authService";
import useAuth from "../hooks/useAuth"; 
import "./LoginForm.css";

const LoginForm = () => {
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(form);
            login({ email: form.email }); // Puedes guardar más datos si el backend los devuelve
        } catch (err) {
            console.error(err); // <- usa la variable
            setError("Credenciales incorrectas");
          }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" onChange={handleChange} required />

            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" name="password" onChange={handleChange} required />

            {error && <p>{error}</p>}
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default LoginForm;
