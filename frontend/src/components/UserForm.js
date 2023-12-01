import React from "react";
import { Link } from "react-router-dom";

export default function UserForm(props) {
  return (
    <section className="userForm">
      <h2 className="userForm__title">{props.title}</h2>
      <form className="userForm__form" onSubmit={props.onSubmit}>
        {props.children}
        <button className="userForm__submit">{props.button}</button>
        {props.register && (
          <div className="userForm__isLogged">
            <p className="userForm__text">
              Уже Зарегестрированы ?
              <Link className="userForm__link" to={props.path}>
                Войти
              </Link>
            </p>
          </div>
        )}
      </form>
    </section>
  );
}
