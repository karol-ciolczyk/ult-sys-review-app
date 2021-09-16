import React, { useState } from "react";
import { Button } from "./Button";

import style from "./SignUpForm.module.css";

export const SignUpForm = function () {
  const [signUpData, setSignUpData] = useState({});

  const inputDataHandler = function (event) {
    setSignUpData((previous) => {
      return {
        ...previous,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onSubmitHandler = function (event) {
    event.preventDefault();

    (async function () {
      try {
        const response = await fetch(
          "https://recruitment.ultimate.systems/auth/local/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(signUpData),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw TypeError(data.message[0].messages[0].message);
        }
        console.log(response, data);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <div className={style.SignUpForm}>
      <button className={style.buttonBack}> back </button>
      <h1 className={style.header}> Create an new account </h1>
      <form className={style.form} onSubmit={onSubmitHandler}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={inputDataHandler}
        />
        <input
          name="email"
          type="text"
          placeholder="Email"
          onChange={inputDataHandler}
        />
        <input
          name="password"
          type="text"
          placeholder="Password"
          onChange={inputDataHandler}
        />
        <input
          name="password-repeated"
          type="text"
          placeholder="Repeat Password"
          // onChange={inputDataHandler}
        />
        <Button> Create </Button>
      </form>
    </div>
  );
};
