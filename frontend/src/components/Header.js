import React from "react";
import logo from "../images/Vector.svg";
import { Link, Routes, Route } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип" />
      <Routes>
        <Route
          path={"/singin"}
          element={
            <Link className="header__link" to={"/signup"}>
              Регистрация
            </Link>
          }
        />
        <Route
          path={"/signup"}
          element={
            <Link className="header__link" to={"/singin"}>
              Войти
            </Link>
          }
        />
        <Route
          path={"/"}
          element={
            <div className={`header__box`}>
              <p className={`header__email`}>{props.email}</p>
              <button className={`header__button`} onClick={props.signOut}>
                Выйти
              </button>
            </div>
          }
        ></Route>
      </Routes>
    </header>
  );
}

export default Header;
