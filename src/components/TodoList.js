import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { TodoItem } from "./TodoItem";
import { TodoTasks } from "./TodoTasks";

import style from "./TodoList.module.css";

export const TodoList = function () {
  const [todoLists, setTodoLists] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [findedList, setFindedList] = useState([]);

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
    setIsModal(!isModal);
    if (listId) {
      const findedList = todoLists.find((list) => list.id === listId);
      // console.log(findedList);
      setFindedList(findedList);
      //  setListId(listId);
    }
  };

  // console.log(findedList);

  return (
    <>
      <div className={style.container}>
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
      {isModal && (
        <Modal onClickHandler={onClickHandler}>
          <TodoTasks todoList={findedList} todoLists={todoLists} />
        </Modal>
      )}
    </>
  );
};
