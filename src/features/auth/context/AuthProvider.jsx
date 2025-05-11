// src/features/auth/context/AuthProvider.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext"; // <--- ahora se importa

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
