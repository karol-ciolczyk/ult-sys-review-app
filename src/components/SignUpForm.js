import React from "react";
import { Button } from "./Button";

import style from "./SignUpForm.module.css";

export const SignUpForm = function () {
  return (
    <div className={style.SignUpForm}>
      <button className={style.buttonBack}> back </button>
      <h1 className={style.header}> Create an new account </h1>
      <form className={style.form}>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <input type="text" placeholder="Repeat Password" />
        <Button> Create </Button>
      </form>
    </div>
  );
};
