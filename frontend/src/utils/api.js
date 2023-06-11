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
        return this._handleFetch(fetch(`${this._url}/${this._cohortID}/users/me`, {
            headers: this._headers
        }));
    }

    getInitialCards() {
        return this._handleFetch(fetch(`${this._url}/${this._cohortID}/cards`, {
            headers: this._headers
        }));
    }

    patchUserData(name, about) {
        return this._handleFetch(fetch(`${this._url}/${this._cohortID}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name, about })
        }));
    }

    patchAvatar(avatar) {
        return this._handleFetch(fetch(`${this._url}/${this._cohortID}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ avatar })
        }));
    }

    postNewCard(name, link) {
        return this._handleFetch(fetch(`${this._url}/${this._cohortID}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ name, link })
        }));
    }

    deteteCard(cardID) {
        return this._handleFetch(fetch(`${this._url}/${this._cohortID}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers
        }));
    }

    incrementLikesCount(cardID) {
        return this._handleFetch(fetch(`${this._url}/${this._cohortID}/cards/${cardID}/likes`, {
            method: 'PUT',
            headers: this._headers
        }));
    }

    decrementLikesCount(cardID) {
        return this._handleFetch(fetch(`${this._url}/${this._cohortID}/cards/${cardID}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }));
    }

    changeLikeCardStatus(cardID, isLiked) {
        return this._handleFetch(fetch(`${this._url}/${this._cohortID}/cards/${cardID}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers
        }));
    }

}

const api = new Api(apiOptions);
export default api;
