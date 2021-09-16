import style from "./TaskItem.module.css";

export const TaskItem = function (props) {
  let { name, isDone } = props;

  return (
    <div className={style.container}>
      {isDone && (
        <input
          type="checkbox"
          id="vehicle1"
          name="vehicle1"
          value="Bike"
          checked
        />
      )}
      {!isDone && (
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
      )}
      <p className={style.task}>
        <span>
          {isDone && <strike> {name} </strike>}
          {!isDone && name}
        </span>
      </p>
    </div>
  );
};
