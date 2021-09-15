import { Button } from "./Button";

import style from "./LoginForm.module.css";

export const Loginform = function () {
  return (
    <div>
      <h1 className={style.header}> Login </h1>
      <form className={style.form}>
        <input type="text" placeholder="Email or username" />
        <input type="text" placeholder="Password" />
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
