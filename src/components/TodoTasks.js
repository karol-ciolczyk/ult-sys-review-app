import { useState } from "react/cjs/react.development";
import { TaskItem } from "./TaskItem";

import { Button } from "./Button";
import style from "./TodoTasks.module.css";

const fetchNewTaskState = async function (id, newdata) {
  try {
    const response = await fetch(
      `https://recruitment.ultimate.systems/to-do-lists/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE3LCJpYXQiOjE2MzE3ODQxMzIsImV4cCI6MTYzNDM3NjEzMn0.mm0cUlTSZEhA1oHSMC-y0ttb1iUlUgkxNqeEbz9jDjQ`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(newdata),
      }
    );
    const data = await response.json();
    console.log(response);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export const TodoTasks = function (props) {
  const [chosenList, setChosenList] = useState(props.todoList);
  const [newTask, setNewTask] = useState({ isDone: false, name: "" });
  const { todoLists } = props;

  const onClickHandler = function (event) {
    if (event.target.textContent !== "CANCEL") event.stopPropagation();

    if (event.target.textContent === "SAVE") {
      fetchNewTaskState(chosenList.id, chosenList);
    }
    if (event.target.textContent === "Add" && newTask.name) {
      setChosenList((prev) => {
        return {
          ...prev,
          task: [...chosenList.task, newTask],
        };
      });
      setNewTask({ isDone: false, name: "" });
    }
  };
  const onChangeHandler = function (event) {
    const id = event.target.value;
    const findedTodoList = todoLists.find((list) => list.id === +id);

    setChosenList(findedTodoList);
  };
  const onChangeNewTaskInputValue = function (event) {
    const inputName = event.target.name;
    setNewTask((prev) => {
      return {
        ...prev,
        [inputName]:
          inputName === "name" ? event.target.value : event.target.checked,
      };
    });
  };
  const onSubmitHandler = function (event) {
    event.preventDefault();
    event.target.reset();
  };

  //// create option elements based on an obtained data
  const getOptionElements = function () {
    const optionElements = todoLists.map((list) => {
      const isSelected = chosenList.id === list.id;
      return (
        <option key={list.id} value={list.id} selected={isSelected}>
          {list.name}
        </option>
      );
    });
    return optionElements;
  };

  // console.log(chosenList);

  return (
    <div className={style.TasksContainer} onClick={onClickHandler}>
      <div>
        <select className={style.selectElement} onChange={onChangeHandler}>
          {getOptionElements()}
        </select>
        <hr className={style.breakLine} />
        <div className={style.tasksList}>
          {chosenList.task.map((task) => (
            <TaskItem key={task.id} name={task.name} isDone={task.isDone} />
          ))}
        </div>
        <form onSubmit={onSubmitHandler}>
          <TaskItem
            isActive={true}
            onChangeHandler={onChangeNewTaskInputValue}
          />
          <div className={style[`buttons-container`]}>
            <Button color="secondary" size="small">
              Cancel
            </Button>
            <Button size="small" onClick={onClickHandler}>
              Add
            </Button>
          </div>
        </form>
      </div>
      <div>
        <div className={style[`buttons-bottom`]}>
          <a href="#">CANCEL</a>
          <Button onClick={onClickHandler}>SAVE</Button>
        </div>
      </div>
    </div>
  );
};
