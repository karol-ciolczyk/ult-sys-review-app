import style from "./Navbar.module.css";

export const Navbar = function () {
  return (
    <div className={style.navbar}>
      <div>LOGO</div>
      <div>
        <button>log out </button>
      </div>
    </div>
  );
};
