// Дочерний компонент компонента TodoList

import { useState } from 'react'
import { RiDeleteBin2Line, RiTodoFill } from 'react-icons/ri' // импортим иконки (как комопнент)
import { FaCheck } from 'react-icons/fa'
import styles from './Todo.module.css'

function Todo({
  todo,
  deleteTodo,
  toggleTodo,
  editTodo,
  editHandler,
  mainEditHandler,
}) {
  const [todoText, setTodoText] = useState([''])

  function subMainEditHandler() {
    mainEditHandler(todoText, todo.id)
    setTodoText('')
  }

  return (
    /* тут мы будем добалвтья класс completedTodo для задач, которые завершены 
    и не будем добавлять если задача не завершена*/

    // условное добавление класса в зависимости от состояния задачи (завершена или нет) класс styles.todo будет всегда

    <div
      // onClick={() => editTodo(todo.id)}
      className={`${styles.todo} ${
        todo.isCompleted ? styles.completedTodo : ''
      }`}
    >
      <RiTodoFill className={styles.todoIcon} />
      {todo.isEdit ? (
        <input
          className={styles.textInput}
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
      ) : (
        <div className={styles.todoText}>{todo.text}</div>
      )}
      {/* <div className={styles.todoText}>{todo.text}</div> */}
      <button
        className={styles.simpleButtons}
        onClick={() => editHandler(todo.id)}
      >
        edit
      </button>
      {todo.isEdit && (
        <button
          className={styles.simpleButtons}
          onClick={() => subMainEditHandler()}
        >
          done!
        </button>
      )}
      {!todo.isEdit && (
        <RiDeleteBin2Line
          disabled={todo.isEdit}
          className={styles.deleteIcon}
          onClick={() => deleteTodo(todo.id)}
        />
      )}
      {/* показываем галочку, только когда todo.isEdit === false */}
      {!todo.isEdit && (
        <FaCheck
          disabled={todo.isEdit}
          className={styles.checkIcon}
          onClick={() => toggleTodo(todo.id)}
        />
      )}
    </div>
  )
}

export default Todo
