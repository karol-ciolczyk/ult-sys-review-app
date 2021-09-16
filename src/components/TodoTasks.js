import { useState } from "react/cjs/react.development";
import { TaskItem } from "./TaskItem";

import { Button } from "./Button";
import style from "./TodoTasks.module.css";

export const TodoTasks = function (props) {
  const [tasks, setTasks] = useState(props.todoList.task);
  const { todoList, todoLists } = props;

  const onClickHandler = function (event) {
    if (event.target.textContent !== "CANCEL") event.stopPropagation();
  };
  const onChangeHandler = function (event) {
    const id = event.target.value;
    const findedTodoList = todoLists.find((list) => list.id === +id);
    const newListOfTasks = findedTodoList.task;

    setTasks(newListOfTasks);
  };

  //// create option elements based on an obtained data
  const getOptionElements = function () {
    const optionElements = todoLists.map((list) => {
      const isSelected = todoList.id === list.id;
      return (
        <option key={list.id} value={list.id} selected={isSelected}>
          {list.name}
        </option>
      );
    });
    return optionElements;
  };

  return (
    <div className={style.TasksContainer} onClick={onClickHandler}>
      <div>
        <select className={style.selectElement} onChange={onChangeHandler}>
          {getOptionElements()}
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
