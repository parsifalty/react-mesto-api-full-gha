import React from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main(props) {
  const UserContext = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__avatar-area">
          <img
            src={UserContext.avatar}
            className="profile__avatar"
            alt="аватар-профиля"
          />
          <button
            className="profile__avatar-area-button"
            onClick={props.onEditAvatar}
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__info-box">
            <h1 className="profile__info-fullname">{UserContext.name}</h1>
            <button
              className="profile__info-button"
              onClick={props.onEditProfile}
              type="button"
            ></button>
          </div>
          <p className="profile__info-occupation">{UserContext.about}</p>
        </div>
        <button
          className="profile__button"
          onClick={props.onAddPlace}
          type="button"
        ></button>
      </section>
      <section className="grid-net" aria-label="грид-сетка">
        {props.cards.map((item, i) => (
          <Card
            card={item}
            onDelete={props.onDelete}
            onCardLike={props.onCardLike}
            key={item._id}
            onCardClick={props.handleCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
