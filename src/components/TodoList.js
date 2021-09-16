import { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";

import style from "./TodoList.module.css";

export const TodoList = function () {
  const [todoLists, setTodoLists] = useState([]);

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

  return (
    <div className={style.container}>
      {todoLists.map((list) => (
        <TodoItem
          key={list.id}
          name={list.name}
          date={list.created_at}
          tasks={list.task}
        />
      ))}
    </div>
  );
};
