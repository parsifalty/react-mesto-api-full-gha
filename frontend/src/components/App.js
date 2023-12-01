import React from "react";
import "../App.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = React.useState({});

  const [isInfoTooltip, setInfoToolTipPopup] = React.useState(false);

  const [isSuccessInfoTooltipStatus, setSuccessInfoTooltipStatus] =
    React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [cardToDelete, setCardToDelete] = React.useState(null);

  function handleToolTipOpen() {
    setInfoToolTipPopup(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAppPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCard(card) {
    setCardToDelete(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
    setInfoToolTipPopup(false);
  }
  console.log(localStorage.jwt);

  React.useEffect(() => {
    if (!loggedIn) return;
    Promise.all([
      api.getUserFromServer(localStorage.jwt),
      api.getInitialCards(localStorage.jwt),
    ])
      .then(([user, cardsList]) => {
        setCurrentUser(user);
        setCards(cardsList);
        console.log(loggedIn);
        console.log(user);
      })

      .catch((err) => console.error(err));
  }, [loggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            console.log(data);
            setUserEmail({ email: data.data.email });
            console.log(userEmail);
            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  console.log(currentUser);

  function registerSubmit(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setSuccessInfoTooltipStatus(true);
        handleToolTipOpen();
        navigate("/singin");
      })
      .catch((err) => {
        console.error(err);
        setSuccessInfoTooltipStatus(false);
        handleToolTipOpen();
      });
  }

  function loginSubmit(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setSuccessInfoTooltipStatus(true);
        setUserEmail({ email: email });
        navigate("/");
        handleToolTipOpen();
      })
      .catch((err) => {
        console.error(err);
        setSuccessInfoTooltipStatus(false);
        handleToolTipOpen();
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, localStorage.jwt)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id, localStorage.jwt)
      .then((card) => {
        setCards((cards) => cards.filter((c) => c._id !== id));
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleSubmitUserForm(obj) {
    api
      .setNewUserInfo(obj, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    navigate("/singin");
    setLoggedIn(false);
  }

  function handleAvatarUserForm(avatar) {
    api
      .setNewAvatar(avatar, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card, localStorage.jwt)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header
          email={userEmail.email}
          signOut={handleSignOut}
          loggedIn={loggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                logged={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAppPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                handleCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onDelete={handleDeleteCard}
              />
            }
          />
          <Route
            path="/signup"
            element={<Register onSubmit={registerSubmit} />}
          />
          <Route path="/singin" element={<Login onSubmit={loginSubmit} />} />
          <Route path="/*" element={<Navigate to="/singin" replace />} />
        </Routes>
        {loggedIn ? <Footer /> : ""}
        <EditProfilePopup
          onSubmit={handleSubmitUserForm}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          onSubmit={handleAvatarUserForm}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          onSubmit={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <DeletePopup
          onClose={closeAllPopups}
          card={cardToDelete}
          onDelete={handleCardDelete}
        />
        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          isSuccess={isSuccessInfoTooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
