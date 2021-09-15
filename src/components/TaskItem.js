import style from "./TaskItem.module.css";

export const TaskItem = function () {
  return (
    <div className={style.container}>
      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
      <p className={style.task}>
        <span> Task number 1 </span>
      </p>
    </div>
  );
};
