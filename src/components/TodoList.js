import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { TodoItem } from "./TodoItem";
import { TodoTasks } from "./TodoTasks";

import style from "./TodoList.module.css";

export const TodoList = function () {
  const [todoLists, setTodoLists] = useState([]);
  // const [isModal, setIsModal] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    isAddNewTask: false,
  });
  // const [isAddNewTask, setIsAddNewTask] = useState(false);
  const [foundList, setFoundList] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          "https://recruitment.ultimate.systems/to-do-lists",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE3LCJpYXQiOjE2MzE3ODQxMzIsImV4cCI6MTYzNDM3NjEzMn0.mm0cUlTSZEhA1oHSMC-y0ttb1iUlUgkxNqeEbz9jDjQ`,
            },
          }
        );
        const data = await response.json();
        setTodoLists(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const onClickHandler = function (listId) {
    // setIsModal(!isModal);
    setModal((prev) => {
      return {
        ...prev,
        isOpen: !prev.isOpen,
        isAddNewTask: false,
      };
    });
    if (listId) {
      const findedList = todoLists.find((list) => list.id === listId);
      setFoundList(findedList);
    }
  };
  const onAddListHandler = function (event) {
    setModal((prev) => {
      return {
        ...prev,
        isOpen: !prev.isOpen,
        isAddNewTask: true,
      };
    });
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.addIcon} onClick={onAddListHandler}>
          <span className="material-icons">add_circle_outline</span>
        </div>
        {todoLists.map((list) => (
          <TodoItem
            key={list.id}
            name={list.name}
            date={list.created_at}
            tasks={list.task}
            onClickHandler={onClickHandler}
            id={list.id}
          />
        ))}
      </div>
      {modal.isOpen && (
        <Modal onClickHandler={onClickHandler}>
          <TodoTasks
            todoList={foundList}
            todoLists={todoLists}
            isAddNewTask={modal.isAddNewTask}
          />
        </Modal>
      )}
    </>
  );
};
