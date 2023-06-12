import { apiOptions } from './constants.js';

class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
        this._token = options.token;
        this._cohortID = options.cohortID;
        this._headers = options.headers;
    }

    _handleFetch(fetch) {
        return fetch
            .then(res => res.ok ? res.json() : Promise.reject(new Error(res.status)))
    }

    getUserData() {
        return this._handleFetch(fetch(`${this._url}/users/me`, {
            headers: {
                ...this._headers,
                "Cookie": `jwt=${localStorage.getItem("token")}`
            },
        }));
    }

    getInitialCards() {
        return this._handleFetch(fetch(`${this._url}/cards`, {
            headers: {
                ...this._headers,
                "Cookie": `jwt=${localStorage.getItem("token")}`
            },
        }));
    }

    patchUserData(name, about) {
        return this._handleFetch(fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                ...this._headers,
                "Cookie": `jwt=${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ name, about })
        }));
    }

    patchAvatar(avatar) {
        return this._handleFetch(fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                ...this._headers,
                "Cookie": `jwt=${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ avatar })
        }));
    }

    postNewCard(name, link) {
        return this._handleFetch(fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                ...this._headers,
                "Cookie": `jwt=${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ name, link })
        }));
    }

    deteteCard(cardID) {
        return this._handleFetch(fetch(`${this._url}/cards/${cardID}`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                "Cookie": `jwt=${localStorage.getItem("token")}`
            },
        }));
    }

    incrementLikesCount(cardID) {
        return this._handleFetch(fetch(`${this._url}/cards/${cardID}/likes`, {
            method: 'PUT',
            headers: {
                ...this._headers,
                "Cookie": `jwt=${localStorage.getItem("token")}`
            },
        }));
    }

    decrementLikesCount(cardID) {
        return this._handleFetch(fetch(`${this._url}/cards/${cardID}/likes`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                "Cookie": `jwt=${localStorage.getItem("token")}`
            },
        }));
    }

    changeLikeCardStatus(cardID, isLiked) {
        return this._handleFetch(fetch(`${this._url}/cards/${cardID}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: {
                ...this._headers,
                "Cookie": `jwt=${localStorage.getItem("token")}`
            },
        }));
    }

}

const api = new Api(apiOptions);
export default api;
