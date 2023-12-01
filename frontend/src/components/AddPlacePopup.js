import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      name,
      link,
    });
  }

  function handleNameCard(e) {
    setName(e.target.value);
  }

  function handleLinkCard(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setLink("");
    setName("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleAddPlaceSubmit}
      name={`create-card`}
      title={`Новое место`}
      button={`Сохранить`}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_place-name"
          id="name"
          value={name}
          name="name"
          type="text"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          onChange={handleNameCard}
        />
        <span className="name-error popup__input-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_link"
          value={link}
          id="link"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          onChange={handleLinkCard}
        />
        <span className="link-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
