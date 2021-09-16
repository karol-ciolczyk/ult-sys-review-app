import style from "./Modal.module.css";

export const Modal = function (props) {
  return <div className={style.modal}>{props.children}</div>;
};
