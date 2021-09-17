import { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";

import style from "./LoginForm.module.css";

export const Loginform = function (props) {
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

    (async function () {
      try {
        const response = await fetch(
          "https://recruitment.ultimate.systems/auth/local",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw TypeError(data.message[0].messages[0].message);
        }
        // console.log(response, data.jwt);
        props.setJwt(data.jwt);
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
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <a href="#" className={style.link}>
            <span> create an account </span>
          </a>
        </Link>
      </div>
    </div>
  );
};
