import './App.css';
import TodoAdd from './features/todos/components/TodoAdd';
import TodoList from './features/todos/components/TodoList';
import useTodo from './features/todos/hooks/useTodo';

function App() {
  const {
    todos,
    todosCount,
    pendingTodosCount,
    handleNewTodo,
    handleDeleteTodo,
    handleCompleteTodo,
    handleUpdateTodo
  } = useTodo();

  return (
    <>
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
      </div>
    </>
  );
}

export default App;
