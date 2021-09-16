import { useState } from "react";
import { Button } from "./Button";

import style from "./LoginForm.module.css";

export const Loginform = function () {
  const [loginData, setLoginData] = useState();

  const onInputChangeValueHandler = function (event) {
    setLoginData((previous) => {
      return {
        ...previous,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onSubmitHandler = function (event) {
    event.preventDefault();
    console.log(loginData);

    (async function () {
      try {
        const response = await fetch(
          "https://recruitment.ultimate.systems/auth/local",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(loginData),
          }
        );
        const data = await response.json();
        console.log(response, data);
        if (!response.ok) {
          throw TypeError(data.message[0].messages[0].message);
        }
        console.log(response, data.jwt);

        const response2 = await fetch(
          "https://recruitment.ultimate.systems/to-do-lists",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.jwt}`,
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        console.log(response2);
        const data2 = await response2.json();
        console.log(data2);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <div>
      <h1 className={style.header}> Login </h1>
      <form className={style.form} onSubmit={onSubmitHandler}>
        <input
          name="identifier"
          type="text"
          placeholder="Username or Email"
          onChange={onInputChangeValueHandler}
        />
        <input
          name="password"
          type="text"
          placeholder="Password"
          onChange={onInputChangeValueHandler}
        />
        <Button> Login </Button>
      </form>
      <div className={style.textContainer}>
        <p>
          <span className={style.text}> or </span>
        </p>
        <a href="#" className={style.link}>
          <span> create an account </span>
        </a>
      </div>
    </div>
  );
};
