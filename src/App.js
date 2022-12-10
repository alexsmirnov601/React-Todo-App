import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid' // импорт генерации уникальных id
import './App.css'
import TodoForm from './components/Todos/TodoForm'
import TodoList from './components/Todos/TodoList'
import TodosActions from './components/Todos/TodosActions'

function App() {
  const [todos, setTodos] = useState([])

  /* 1) в этой версии приложения, todos как массив строк нам не подойдет, потому что теперь для 
  каждой задачи todo у нас пояится своё состояние (состояние, которое указывает на то, завершена ли
    задача), следовательно информацию о том завершена задачи или нет нам следует хранить рядом с текстом 
    задачи поэтому логично преобразовать строку в объект 
  */

  const addTodoHandler = (text) => {
    const newTodo = {
      text: text,
      isCompleted: false,
      isEdit: false,
      id: uuidv4(), // уникальный id
    }
    setTodos([...todos, newTodo])
  }
  // удаление задач из списка
  // не рекомендуется использовать indx, лучше использовать отдельный сгенирированный id

  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // меняет значение isCompleted в объекте newTodo
  const toggleTodoHandler = (id) => {
    setTodos(
      todos.map(
        (todo) =>
          todo.id === id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : {
                ...todo,
              } /* по правилам реакт мы должны создавать новое состояние, каждый раз при ререндеринге компонента, поэтому лучше записать так (мы создаем новый объект) */
      )
    )
  }

  // меняет значение isEdit
  const editHandler = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEdit: !todo.isEdit } : { ...todo }
      )
    )
  }

  // добавляет отредакитированный todo и  меняет значение isEdit
  const mainEditHandler = (text, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: text, isEdit: !todo.isEdit }
          : { ...todo }
      )
    )
  }

  // полностью отчищаем приложение и удаляем все задачи
  const resetTodosHandler = () => {
    setTodos([])
  }

  // удаляет только выполенные задачи
  // мы хотим оставить все задачи, у которых isCompleted: false
  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted))
  }

  // счетчик завершенных задач
  const completedTodosCount = todos.filter((todo) => todo.isCompleted).length

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
        mainEditHandler={mainEditHandler}
        editHandler={editHandler}
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
  )
}

export default App
