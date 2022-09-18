import styles from './Button.module.css';

// это универсальный компонент, который мы можем использовать в других частях нашего приложения

// title - текст, который отображается при наведении на иконки
// children - это то, что будет содержаться внутри других компонентов
// onClick и title можно удалить т.к они без изменений, без них всё будет работать
// c помощью этого синтаксиса мы можем недеструкторировать все св-ва из род компонентов, так
// как тут мы применяем spread оператор {} - это код js
// св-во children дает возможность добавлять все что угодно на кнопки
function Button(props) {
  const { onClick, children, title, disabled = false } = props;
  return (
    <button
      {...props}
      className={styles.button}
      onClick={onClick}
      children={children}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
