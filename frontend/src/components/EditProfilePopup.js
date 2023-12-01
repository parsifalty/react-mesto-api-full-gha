import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);

  const [about, setAbout] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameInput(e) {
    setName(e.target.value);
  }

  function handleOccupationChange(e) {
    setAbout(e.target.value);
  }

  function handleSubmitForm(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onSubmit({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      name={`profile`}
      title={`Редактировать профиль`}
      button={`Сохранить`}
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmitForm}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_username"
          id="username"
          name="username"
          type="text"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleNameInput}
          value={name || ""}
        />
        <span className="username-error popup__input-error"></span>
      </label>
      <label className="popup__field">
        <input
          value={about || ""}
          className="popup__input popup__input_type_occupation"
          id="occupation"
          name="occupation"
          type="text"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          onChange={handleOccupationChange}
        />
        <span className="occupation-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
