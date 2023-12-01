import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const userContext = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === userContext._id;
  const isLiked = props.card.likes.some((i) => i === userContext._id);
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLike() {
    props.onCardLike(props.card);
  }

  function handleDeleteCard() {
    props.onDelete(props.card);
  }

  return (
    <article className="grid-net__item">
      <div className="grid-net__item-image-box">
        <img
          src={props.card.link}
          className="grid-net__item-image"
          alt={props.card.name}
          onClick={handleClick}
        />
      </div>
      {isOwn && (
        <button
          className="grid-net__item-button-delete"
          onClick={handleDeleteCard}
          type="delete"
        ></button>
      )}
      <div className="grid-net__item-box">
        <h2 className="grid-net__item-title">{props.card.name}</h2>
        <div className="grid-net__item-user-box">
          <button
            className={`grid-net__item-button ${
              isLiked && `grid-net__item-button_active`
            }`}
            onClick={handleLike}
          ></button>
          <span className="grid-net__item-number">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </article>
  );
}

export default Card;
