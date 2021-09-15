import style from "./TodoItem.module.css";

export const TodoItem = function () {
  return (
    <div className={style.todoItem}>
      <div className={style.todoItem__item}>
        <span>List name</span>
      </div>
      <div className={style.todoItem__item}>
        <span>List data create</span>
      </div>
      <div className={style.todoItem__item}>
        <span>list content: tasks</span>
      </div>
    </div>
  );
};
