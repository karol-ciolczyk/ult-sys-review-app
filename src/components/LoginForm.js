import { useState, useEffect } from "react";
import { Button } from "./Button";

import style from "./LoginForm.module.css";

export const Loginform = function () {
  return (
    <div className={style.loginForm}>
      <h1 className={style.header}> Login </h1>
      <form>
        <input type="text" placeholder="Email or username" />
        <input type="text" placeholder="Password" />
        <Button> Login </Button>
      </form>
      <div className={style.textContainer}>
        <p>
          <span> or </span>
        </p>
        <a href="#" className={style.link}>
          <span> create an account </span>
        </a>
      </div>
    </div>
  );
};
