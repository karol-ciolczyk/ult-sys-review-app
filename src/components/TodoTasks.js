import { TaskItem } from "./TaskItem";

import { Button } from "./Button";
import style from "./TodoTasks.module.css";

export const TodoTasks = function (props) {
  const { todoLists, tasks } = props;

  const onClickHandler = function (event) {
    if (event.target.textContent !== "CANCEL") event.stopPropagation();
  };

  return (
    <div className={style.TasksContainer} onClick={onClickHandler}>
      <div>
        <select className={style.selectElement}>
          {todoLists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.name}
            </option>
          ))}
        </select>
        <hr className={style.breakLine} />
        <div className={style.tasksList}>
          {tasks.map((task) => (
            <TaskItem key={task.id} name={task.name} isDone={task.isDone} />
          ))}
        </div>
        <div className={style[`buttons-container`]}>
          <Button color="secondary" size="small">
            Cancel
          </Button>
          <Button size="small"> Add </Button>
        </div>
      </div>
      <div>
        <div className={style[`buttons-bottom`]}>
          <a href="#">CANCEL</a>
          <Button>SAVE</Button>
        </div>
      </div>
    </div>
  );
};
