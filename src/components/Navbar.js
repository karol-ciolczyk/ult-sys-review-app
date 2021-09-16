import style from "./Navbar.module.css";
import "./materialIcons.css";

export const Navbar = function () {
  return (
    <div className={style.navbar}>
      <div className={style.logo}>ToDo - List</div>
      <div>
        <span className="material-icons">logout</span>
      </div>
    </div>
  );
};
