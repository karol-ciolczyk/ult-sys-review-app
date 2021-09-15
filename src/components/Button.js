import React from "react";

import style from "./Button.module.css";

export const Button = function (props) {
  return (
    <button type="submit" className={style.button}>
      <span>{props.children}</span>
    </button>
  );
};
