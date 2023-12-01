import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image-overlay ${
        props.card ? "popup_active" : ""
      }`}
    >
      <div className="popup__overlay-holder">
        <img
          className="popup__image"
          alt={`${props.card ? props.card.name : ""}`}
          src={`${props.card ? props.card.link : ""}`}
        />
        <p className="popup__span">{`${props.card ? props.card.name : ""}`}</p>
        <button
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
