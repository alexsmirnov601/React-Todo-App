import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // импорт генерации уникальных id
import './App.css';
import TodoForm from './components/Todos/TodoForm';
import TodoList from './components/Todos/TodoList';
import TodosActions from './components/Todos/TodosActions';

function App() {
  //1) todos - это массив объектов
  const [todos, setTodos] = useState([]);

  /*2) эта функция нужна для того, чтобы добавлять новые задачи в массив задач,
  эту функцию мы передаем в качестве св-ва addTodo в компонент  TodoForm, и поэтому внутри
  компонента TodoForm у нас появляется возможность вызыва функции addTodo при submit формы  
  */
  const addTodoHandler = (text) => {
    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuidv4(), // уникальный id
    };
    setTodos([...todos, newTodo]);
  };
  // удаление задач из списка
  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // изменение состояние задачи
  const toggleTodoHandler = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : { ...todo }
      )
    );
  };

  // полностью отчищаем приложение и удаляем все задачи
  const resetTodosHandler = () => {
    setTodos([]);
  };

  // удаляет только выполенные задачи
  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));
  };

  // счетчик завершенных задач
  const completedTodosCount = todos.filter((todo) => todo.isCompleted).length;

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodoHandler} />
      {todos.length > 0 && (
        <TodosActions
          completedTodosExist={!!completedTodosCount}
          resetTodos={resetTodosHandler}
          deleteCompletedTodos={deleteCompletedTodosHandler}
        />
      )}
      <TodoList
        todos={todos}
        deleteTodo={deleteTodoHandler}
        toggleTodo={toggleTodoHandler}
      />
      {completedTodosCount > 0 && (
        <h2>{`You have completed ${completedTodosCount} ${
          completedTodosCount > 1 ? 'todos' : 'todo'
        }`}</h2>
      )}
    </div>
  );
}

export default App;
