import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeletePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDelete(props.card._id);
  }

  return (
    <PopupWithForm
      name={"delete-card"}
      isOpen={props.card}
      title={"Вы уверены?"}
      button={"Да"}
      container={"delete"}
      onClose={props.onClose}
      buttonConfirm={"confirm"}
      popupTitle={"_delete-card"}
      onSubmit={handleSubmit}
      delete
    />
  );
}
