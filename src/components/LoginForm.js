import { useState, useEffect } from "react";

import style from "./LoginForm.module.css";

export const Loginform = function () {
  return (
    <div className={style.signForm}>
      <h1> Login </h1>
      <form>
        <input type="text" placeholder="Email or username" />
        <input type="text" placeholder="Password" />
        <button type="submit"> Login </button>
      </form>
      <div>
        <p>
          <span> or </span>
        </p>
        <a href="#">
          <span> create an account </span>
        </a>
      </div>
    </div>
  );
};
