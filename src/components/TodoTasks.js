import { useState } from "react/cjs/react.development";
import { TaskItem } from "./TaskItem";

import { Button } from "./Button";
import style from "./TodoTasks.module.css";
import { useEffect, useRef } from "react";

const fetchNewTaskState = async function (method, id, isAddNewTask, newdata) {
  const body = method === "DELETE" ? "" : JSON.stringify(newdata);
  let endPoint = isAddNewTask
    ? `https://recruitment.ultimate.systems/to-do-lists`
    : `https://recruitment.ultimate.systems/to-do-lists/${id}`;

  console.log(endPoint, method);

  try {
    const response = await fetch(`${endPoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE3LCJpYXQiOjE2MzE3ODQxMzIsImV4cCI6MTYzNDM3NjEzMn0.mm0cUlTSZEhA1oHSMC-y0ttb1iUlUgkxNqeEbz9jDjQ`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    const data = await response.json();
    console.log(response);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export const TodoTasks = function (props) {
  const cancelButton = useRef(null);
  const [chosenList, setChosenList] = useState(null);
  const [newTask, setNewTask] = useState({ isDone: false, name: "" });
  const [todoLists, setTodoLists] = useState({
    currentLists: props.todoLists,
    removedLists: [],
  });
  // const { todoLists } = props;

  // console.log(
  //   props.isAddNewTask,
  //   chosenList,
  //   newTask,
  //   cancelButton.current,
  //   todoLists,
  //   todoListssss
  // );
  console.log(todoLists);

  const onClickHandler = function (event) {
    if (event.target.textContent !== "CANCEL") event.stopPropagation();

    if (event.target.textContent === "Remove List") {
      const listId = chosenList.id;
      let current = [...todoLists.currentLists];
      const indexToRemove = current.findIndex((list) => list.id === listId);
      console.log(chosenList, todoLists, todoLists, indexToRemove);
      const removedItem = current.splice(indexToRemove, 1); // remove item and return this item
      console.log(current);

      setTodoLists((prev) => {
        return {
          ...prev,
          currentLists: current,
          removedLists: [...prev.removedLists, removedItem[0].id],
        };
      });

      // if (window.confirm("Do you reallly want to delte list ?"))
      //   fetchNewTaskState("DELETE", chosenList.id);
    }
    if (event.target.textContent === "SAVE") {
      if (todoLists.removedLists.length > 0) {
        todoLists.removedLists.forEach((listId) =>
          fetchNewTaskState("DELETE", listId)
        );
      }
      const requestMethod = props.isAddNewTask ? "POST" : "PUT";
      fetchNewTaskState(
        requestMethod,
        chosenList.id,
        props.isAddNewTask,
        chosenList
      );
      cancelButton.current.click(); // to close modal
    }
    if (event.target.textContent === "Add" && newTask.name) {
      setChosenList((prev) => {
        const prevTasks = chosenList?.task ? chosenList.task : [];
        return {
          ...prev,
          task: [...prevTasks, newTask],
        };
      });
      setNewTask({ isDone: false, name: "" });
    }
  };
  const onChangeHandler = function (event) {
    const id = event.target.value;
    const findedTodoList = todoLists.currentLists.find(
      (list) => list.id === +id
    );

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
  const newListNameHandler = function (event) {
    setChosenList((prev) => {
      return {
        ...prev,
        name: event.target.value,
      };
    });
  };

  //// create option elements based on an obtained data
  const getOptionElements = function () {
    const optionElements = todoLists.currentLists.map((list) => {
      const isSelected = chosenList?.id === list.id;
      return (
        <option key={list.id} value={list.id} selected={isSelected}>
          {list.name}
        </option>
      );
    });
    return optionElements;
  };

  useEffect(() => {
    if (props.isAddNewTask) return;
    setChosenList(props.todoList);
    return () => {
      setChosenList(null); // clear after modal closed
    };
  }, [props.todoList, props.isAddNewTask]);

  return (
    <div className={style.TasksContainer} onClick={onClickHandler}>
      <div>
        {!props.isAddNewTask && (
          <select className={style.selectElement} onChange={onChangeHandler}>
            {getOptionElements()}
          </select>
        )}
        {props.isAddNewTask && (
          <>
            <h2> Create New List </h2>
            <input
              type="text"
              placeholder="new list name"
              onChange={newListNameHandler}
            />
          </>
        )}
        <hr className={style.breakLine} />
        <div className={style.tasksList}>
          {chosenList?.task?.map((task) => (
            <TaskItem key={task.id} name={task.name} isDone={task.isDone} />
          ))}
        </div>
        <form onSubmit={onSubmitHandler}>
          <TaskItem
            isActive={true}
            onChangeHandler={onChangeNewTaskInputValue}
          />
          <div className={style[`buttons-container`]}>
            {!props.isAddNewTask && (
              <Button color="secondary" size="small">
                Remove List
              </Button>
            )}
            <Button size="small">Add</Button>
          </div>
        </form>
      </div>
      <div>
        <div className={style[`buttons-bottom`]}>
          <a ref={cancelButton} href="#">
            CANCEL
          </a>
          <Button onClick={onClickHandler}>SAVE</Button>
        </div>
      </div>
    </div>
  );
};
