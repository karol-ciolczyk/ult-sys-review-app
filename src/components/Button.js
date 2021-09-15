import React from "react";

import style from "./Button.module.css";

export const Button = function (props) {
  const buttonSize = props.size === `small` ? `button--small` : `button--large`;

  const buttonColor =
    props.color === "secondary" ? "button--secondary" : "button--primary";

  return (
    <button
      type="submit"
      className={`${style.button} ${style[`${buttonSize}`]} ${
        style[`${buttonColor}`]
      }`}
    >
      <span>{props.children}</span>
    </button>
  );
};
