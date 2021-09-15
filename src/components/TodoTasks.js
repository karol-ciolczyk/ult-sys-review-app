import { TaskItem } from "./TaskItem";

import { Button } from "./Button";
import style from "./TodoTasks.module.css";

export const TodoTasks = function () {
  return (
    <div className={style.TasksContainer}>
      <div>
        <select className={style.selectElement}>
          <option value="todolist1"> Todolist 1</option>
          <option value="todolist2"> Todolist 2</option>
          <option value="todolist3"> Todolist 3</option>
          <option value="todolist4"> Todolist 4</option>
          <option value="todolist5"> Todolist 5</option>
        </select>
        <hr className={style.breakLine} />
        <div className={style.tasksList}>
          <TaskItem />
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
