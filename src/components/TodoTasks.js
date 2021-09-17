import { useState } from "react/cjs/react.development";
import { TaskItem } from "./TaskItem";

import { Button } from "./Button";
import style from "./TodoTasks.module.css";
import { useEffect, useRef } from "react";

export const TodoTasks = function (props) {
  const cancelButton = useRef(null);
  const [chosenList, setChosenList] = useState(null);
  const [newTask, setNewTask] = useState({ isDone: false, name: "" });
  const [todoLists, setTodoLists] = useState({
    currentLists: props.todoLists,
    removedLists: [],
  });

  // console.log(
  //   props.isAddNewTask,
  //   chosenList,
  //   newTask,
  //   cancelButton.current,
  //   todoLists,
  //   todoListssss
  // );

  const fetchNewTaskState = async function (method, id, isAddNewTask, newdata) {
    const body = method === "DELETE" ? "" : JSON.stringify(newdata);
    let endPoint = isAddNewTask
      ? `https://recruitment.ultimate.systems/to-do-lists`
      : `https://recruitment.ultimate.systems/to-do-lists/${id}`;

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
      props.setTriggerAction((prev) => {
        return {
          ...prev,
          triggerFetch: !prev.triggerFetch,
        };
      }); // this triggers fetch for updated lists in TodoList.js component
    } catch (err) {
      console.log(err);
    }
  };

  const onClickHandler = function (event) {
    console.log(event.target.textContent);
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
    }
    if (event.target.textContent === "SAVE") {
      const requestMethod = props.isAddNewTask ? "POST" : "PUT";
      fetchNewTaskState(
        requestMethod,
        chosenList.id,
        props.isAddNewTask,
        chosenList
      );
      // are there any removed lists ?
      if (todoLists.removedLists.length > 0) {
        if (window.confirm("Do you reallly want to delte list ?")) {
          todoLists.removedLists.forEach((listId) =>
            fetchNewTaskState("DELETE", listId)
          );
        }
      }
      props.setTriggerAction((prev) => {
        return {
          ...prev,
          triggerProgressState: true,
        };
      });
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
  const onChangeNewTaskInputValue = function (event) {
    console.log(event.target.id, chosenList);
    const hasTargetId = event.target.id;
    const inputName = event.target.name;
    setNewTask((prev) => {
      return {
        ...prev,
        [inputName]:
          inputName === "name" ? event.target.value : event.target.checked,
      };
    });
    console.log(inputName, hasTargetId);
    if (inputName === "isDone" && hasTargetId) {
      const taskIndex = chosenList.task.findIndex(
        (task) => task.id === +hasTargetId
      );
      const newTasks = chosenList.task.map((el) => {
        return { ...el };
      });
      newTasks[`${taskIndex}`].isDone = event.target.checked;
      setChosenList((prev) => {
        return {
          ...prev,
          task: newTasks,
        };
      });
    }
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

  ////// <SELECT> ELEMENT SERVICE //////
  const onChangeHandler = function (event) {
    console.log(event.target.value);
    const id = event.target.value;
    const findedTodoList = todoLists.currentLists.find(
      (list) => list.id === +id
    );

    setChosenList(findedTodoList);
  };
  //// change tasks-list content after todo-list removed
  useEffect(() => {
    if (!chosenList) return;
    setChosenList(todoLists.currentLists[0]);
  }, [todoLists.currentLists]);
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
  /////////////// END ///////////////////////

  //// CLEAR CHOSEN LEAST AFTER MODAL CLOSED
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
            <TaskItem
              key={task.id}
              name={task.name}
              isDone={task.isDone}
              taskId={task.id}
              onChangeHandler={onChangeNewTaskInputValue}
            />
          ))}
        </div>
        <form onSubmit={onSubmitHandler}>
          <TaskItem
            isActive={true}
            onChangeHandler={onChangeNewTaskInputValue}
          />
          <div className={style[`buttons-container`]}>
            <Button size="small">Add</Button>
            {!props.isAddNewTask && (
              <Button color="secondary" size="small">
                Remove List
              </Button>
            )}
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
