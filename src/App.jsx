// src/App.jsx
import './App.css';
import TodoAdd from './features/todos/components/TodoAdd';
import TodoList from './features/todos/components/TodoList';
import useTodo from './features/todos/hooks/useTodo';
import useAuth from './features/auth/hooks/useAuth';
import LoginForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm'; // opcional

function App() {
  const { user, logout } = useAuth();
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
        <h1>Iniciar sesión</h1>
        <LoginForm />
        {/* <RegisterForm /> <- Si quieres mostrar ambos */}
      </div>
    );
  }

  return (
    <div className="card-todo">
      <h1>Lista de tareas</h1>

      <div className="counter-todos">
        <h3>
          Nº de tareas: <span>{todosCount}</span>
        </h3>
        <h3>
          Pendientes: <span>{pendingTodosCount}</span>
        </h3>
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

      <button onClick={logout} className="btn-add" style={{ marginTop: '2rem' }}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default App;
