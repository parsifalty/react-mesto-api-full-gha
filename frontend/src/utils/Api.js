class Api {
  constructor(config) {
    this._link = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status} ${res.statusText}`);
  }

  getInitialCards(token) {
    return fetch(`${this._link}/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  getUserFromServer(token) {
    return fetch(`${this._link}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  setNewUserInfo(data, token) {
    return fetch(`${this._link}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._link}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  addCard(data, token) {
    return fetch(`${this._link}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  setNewAvatar(data, token) {
    return fetch(`${this._link}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
});

export default api;
