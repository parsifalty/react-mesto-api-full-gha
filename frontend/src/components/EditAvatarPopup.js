import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleAvatarSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={`profile-avatar`}
      title={`Обновить аватар`}
      button={`Сохранить`}
      container={"type-avatar"}
      isAvatarContainer={true}
      onSubmit={handleAvatarSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_avatar"
          name="avatar"
          id="avatar"
          minLength="5"
          maxLength="200"
          type="url"
          required
          placeholder="Ссылка"
          ref={avatarRef}
        />
        <span className="avatar-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
