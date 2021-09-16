import style from "./TaskItem.module.css";

export const TaskItem = function (props) {
  let { name, isDone } = props;

  return (
    <div className={style.container}>
      <input
        type="checkbox"
        id="vehicle1"
        name="vehicle1"
        value="Bike"
        defaultChecked={isDone}
      />
      <p className={style.task}>
        <span>
          {isDone && <strike> {name} </strike>}
          {!isDone && name}
        </span>
      </p>
    </div>
  );
};
