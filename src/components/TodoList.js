import { useContext, useEffect, useState } from "react";
import { UserSessionContext } from "../context/UserSesionContext";
import { Modal } from "./Modal";
import { TodoItem } from "./TodoItem";
import { TodoTasks } from "./TodoTasks";

import style from "./TodoList.module.css";

export const TodoList = function (props) {
  const ctx = useContext(UserSessionContext);
  const [todoLists, setTodoLists] = useState({
    todoLists: [],
    beenSearched: [],
  });
  const [modal, setModal] = useState({
    isOpen: false,
    isAddNewTask: false,
  });
  const [foundList, setFoundList] = useState([]);
  const [triggerAction, setTriggerAction] = useState({
    triggerFetch: false,
    triggerProgressState: false,
  });

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          "https://recruitment.ultimate.systems/to-do-lists",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ctx.token}`,
            },
          }
        );
        const data = await response.json();
        setTriggerAction((prev) => {
          return {
            ...prev,
            triggerProgressState: false,
          };
        });
        setTodoLists((prev) => {
          return {
            ...prev,
            todoLists: data,
            beenSearched: data,
          };
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [triggerAction.triggerFetch, ctx.token]);

  const onClickHandler = function (listId) {
    // setIsModal(!isModal);
    props.setIsBlur((prev) => !prev);
    setModal((prev) => {
      return {
        ...prev,
        isOpen: !prev.isOpen,
        isAddNewTask: false,
      };
    });
    if (listId) {
      const foundList = todoLists.todoLists.find((list) => list.id === listId);
      setFoundList(foundList);
    }
  };
  const onAddListHandler = function (event) {
    props.setIsBlur((prev) => !prev);
    setModal((prev) => {
      return {
        ...prev,
        isOpen: !prev.isOpen,
        isAddNewTask: true,
      };
    });
  };

  const onSearchInputValueHandler = function (event) {
    const searchingValue = event.target.value;
    const beenSearched = todoLists.todoLists.filter((list) =>
      list.name.includes(searchingValue)
    );
    setTodoLists((prev) => {
      return {
        ...prev,
        beenSearched,
      };
    });
  };
  const onSortSelectHandler = function (event) {
    const value = event.target.value;

    if (value.includes("date")) {
      const sortedList = todoLists.beenSearched.sort((list1, list2) => {
        return value === "date-up"
          ? list1.created_at > list2.created_at
            ? 1
            : -1
          : list1.created_at < list2.created_at
          ? 1
          : -1;
      });
      setTodoLists((prev) => {
        return {
          ...prev,
          beenSearched: sortedList,
        };
      });
    }
    if (value.includes("name")) {
      const sortedList = todoLists.beenSearched.sort((list1, list2) => {
        return value === "name-up"
          ? list1.name > list2.name
            ? 1
            : -1
          : list1.name < list2.name
          ? 1
          : -1;
      });
      setTodoLists((prev) => {
        return {
          ...prev,
          beenSearched: sortedList,
        };
      });
    }
  };

  return (
    <>
      <div
        className={style.container}
        style={{ filter: `${modal.isOpen ? "blur(6px)" : "blur(0px)"}` }}
      >
        <div className={style.addIcon} onClick={onAddListHandler}>
          <span className="material-icons">post_add</span>
        </div>
        <div className={style.inputsContainer}>
          <input
            type="text"
            placeholder="find list"
            onChange={onSearchInputValueHandler}
          />
          <select onChange={onSortSelectHandler}>
            <option style={{ color: "grey" }}>sort by</option>
            <option value="date-up">by date descending </option>
            <option value="date-down">by date ascending</option>
            <option value="name-up">by name descending </option>
            <option value="name-down">by name ascending</option>
          </select>
        </div>
        {triggerAction.triggerProgressState && (
          <h1 style={{ color: "white", marginTop: "10rem" }}>
            ... wait for fetch new data
          </h1>
        )}
        {!triggerAction.triggerProgressState &&
          todoLists.beenSearched.map((list) => (
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
            todoLists={todoLists.beenSearched}
            isAddNewTask={modal.isAddNewTask}
            setTriggerAction={setTriggerAction}
          />
        </Modal>
      )}
    </>
  );
};
