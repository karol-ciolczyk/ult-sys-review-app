import style from "./Navbar.module.css";
import "./materialIcons.css";

export const Navbar = function (props) {
  const onLogOutHandler = function () {
    props.setJwt(null);
    localStorage.removeItem("jwt");
  };

  return (
    <div className={style.navbar}>
      <div className={style.logo}>ToDo - List</div>
      <div>
        <span onClick={onLogOutHandler} className="material-icons">
          logout
        </span>
      </div>
    </div>
  );
};
