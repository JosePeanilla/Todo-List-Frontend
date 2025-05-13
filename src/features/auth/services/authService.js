// src/features/auth/services/authService.js
import todoApi from "../../../api/todoApi";

export const registerUser = (userData) => todoApi.post("/user", userData);
export const loginUser = (credentials) => todoApi.post("/user/login", credentials);
