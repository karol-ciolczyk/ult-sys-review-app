import style from "./Modal.module.css";

export const Modal = function (props) {
  const onClickHandler = function () {
    props.onClickHandler();
  };

  return (
    <div className={style.modal} onClick={onClickHandler}>
      {props.children}
    </div>
  );
};
