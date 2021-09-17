import style from "./TaskItem.module.css";

export const TaskItem = function (props) {
  let { name, isDone, isActive } = props;

  return (
    <div className={style.container}>
      <input
        className={style.checkbox}
        type="checkbox"
        id={props.taskId}
        name="isDone"
        defaultChecked={isDone}
        onChange={props.onChangeHandler}
      />
      <p className={style.task}>
        <span>
          {!isActive && isDone && <strike> {name} </strike>}
          {!isActive && !isDone && name}
          {isActive && (
            <input
              type="text"
              name="name"
              placeholder="add new task"
              className={style.input}
              onChange={props.onChangeHandler}
            />
          )}
        </span>
      </p>
    </div>
  );
};
