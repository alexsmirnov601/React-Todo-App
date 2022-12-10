// В этом компоненте мы добавляем новые задачи

import { useState } from 'react'
import styles from './TodoForm.module.css'
import Button from '../UI/Button'

function TodoForm({ addTodo }) {
  // делаем форму контролируемой
  const [text, setText] = useState([''])

  function handleFormSubmit(event) {
    event.preventDefault()

    // функция отключает возможность добавления пустого Todo
    // if (text.length === 0) {
    //   return null
    // }

    /*  вместо функции выше, можно просто добавить это св-во в Button disabled={!text.length} */

    addTodo(text) // для изменения состояния в компоненте  App, добавив новую задачу в массив задач
    setText('') // отчищаем поле ввода после submit`
    // вызывая функцию addTodo, мы вызываем функцию addTodoHandler из компонента App
  }

  // e.target.value - это значение из инпута
  /* каждый раз, когда пользователь меняет форму, мы меняем состояние этого комопнента,  передаем
  значение из формы в вызове функции setText, но а значение в этом инпуте мы получаем из состояния 
  этого комопонента, путем передачи text как значение св-ва value. И кроме этого теперь мы передаем
  массив задач в качестве св-ва todos в компонент TodoList 
  */
  return (
    <div className={styles.todoFormContainer}>
      <form onSubmit={handleFormSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter new todo"
        />
        <Button disabled={!text.length} type="submit" title="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default TodoForm
