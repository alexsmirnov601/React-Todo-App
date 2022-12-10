// в этом комопненете мы отображаем добавленные задачи в интерфейсе
// мы выполняем итерацию по массиву строк

import Todo from './Todo'
import styles from './TodoList.module.css'

// todos - это массив, который мы получаем через св-во
function TodoList({
  todos,
  deleteTodo,
  toggleTodo,
  editTodo,
  editHandler,
  mainEditHandler,
}) {
  return (
    <div className={styles.todoListContainer}>
      {!todos.length && <h2>Todo list is empty</h2>}
      {todos.map((todo) => (
        <Todo
          mainEditHandler={mainEditHandler}
          editHandler={editHandler}
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo} // передаем функцию дальше в комопнент Todo
        />
      ))}
    </div>
  )
}

export default TodoList
