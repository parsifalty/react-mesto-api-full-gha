import React from "react";
import Header from "./Header";
import UserForm from "./UserForm";

export default function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function HandleSubmit(e) {
    e.preventDefault();
    props.onSubmit(email, password);
  }

  return (
    <>
      <UserForm
        title={"Регистрация"}
        button={"Зарегестрироваться"}
        path={"/singin"}
        onSubmit={HandleSubmit}
        register
      >
        <input
          className="userForm__input userForm__input_type_username"
          id="userEmail"
          name="userEmail"
          type="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          value={email || ""}
          onChange={handleEmail}
        />
        <input
          className="userForm__input userForm__input_type_password"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="200"
          onChange={handlePassword}
          value={password || ""}
        />
      </UserForm>
    </>
  );
}
