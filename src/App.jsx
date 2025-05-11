// src/App.jsx
import { useState } from "react";
import './App.css';
import TodoAdd from './features/todos/components/TodoAdd';
import TodoList from './features/todos/components/TodoList';
import useTodo from './features/todos/hooks/useTodo';
import useAuth from './features/auth/hooks/useAuth';
import LoginForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm';

function App() {
  const { user, logout } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    todos,
    todosCount,
    pendingTodosCount,
    handleNewTodo,
    handleDeleteTodo,
    handleCompleteTodo,
    handleUpdateTodo
  } = useTodo();

  if (!user) {
    return (
      <div className="card-todo">
        <h1>{isRegistering ? "Registro" : "Iniciar sesión"}</h1>
        {isRegistering ? <RegisterForm /> : <LoginForm />}
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="btn-add"
          style={{ marginTop: '2rem' }}
        >
          {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </button>
      </div>
    );
  }

  return (
    <div className="card-todo">
      <h1>Lista de tareas</h1>

      <div className="counter-todos">
        <h3>Nº de tareas: <span>{todosCount}</span></h3>
        <h3>Pendientes: <span>{pendingTodosCount}</span></h3>
      </div>

      <div className="add-todo">
        <h3>Añadir nueva tarea</h3>
        <TodoAdd handleNewTodo={handleNewTodo} />
      </div>

      <TodoList
        todos={todos}
        handleUpdateTodo={handleUpdateTodo}
        handleDeleteTodo={handleDeleteTodo}
        handleCompleteTodo={handleCompleteTodo}
      />

      <button onClick={logout} className="btn-add btn-logout" style={{ marginTop: '2rem' }}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default App;
