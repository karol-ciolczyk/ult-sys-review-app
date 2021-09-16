import style from "./TodoItem.module.css";

export const TodoItem = function (props) {
  const { name, tasks, date } = props;

  const allTasks = tasks.length;
  const completed = tasks.filter((task) => task.isDone).length;
  const unCompleted = tasks.filter((task) => !task.isDone).length;
  const time = date.slice(0, 10);

  const onClickHannlder = function (event) {
    props.onClickHandler(props.id);
  };
  return (
    <div className={style.todoItem} onClick={onClickHannlder}>
      <div className={style.todoItem__item}>
        <span>{name}</span>
      </div>
      <div className={style.todoItem__item}>
        <span>{`created at: ${time}`}</span>
      </div>
      <div className={style.todoItem__item}>
        <span>{`Completed: ${completed}, Uncompleted: ${unCompleted}, All: ${allTasks}`}</span>
      </div>
    </div>
  );
};
