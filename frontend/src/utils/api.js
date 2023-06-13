import { apiOptions } from './constants.js';

class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
        this._token = options.token;
        this._cohortID = options.cohortID;
        this._headers = options.headers;
    }
    _getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

    _handleFetch(fetch) {
        return fetch
            .then(res => res.ok ? res.json() : Promise.reject(new Error(res.status)))
    }

    getUserData() {
        return this._handleFetch(fetch(`${this._url}/users/me`, {
            credentials: 'include',
            headers: {
                ...this._headers,
            },
        }));
    }

    getInitialCards() {
        return this._handleFetch(fetch(`${this._url}/cards`, {
            credentials: 'include',
            headers: {
                ...this._headers,
            },
        }));
    }

    patchUserData(name, about) {
        return this._handleFetch(fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                ...this._headers,
            },
            body: JSON.stringify({ name, about })
        }));
    }

    patchAvatar(avatar) {
        return this._handleFetch(fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                ...this._headers,
            },
            body: JSON.stringify({ avatar })
        }));
    }

    postNewCard(name, link) {
        return this._handleFetch(fetch(`${this._url}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                ...this._headers,
            },
            body: JSON.stringify({ name, link })
        }));
    }

    deteteCard(cardID) {
        return this._handleFetch(fetch(`${this._url}/cards/${cardID}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                ...this._headers,
            },
        }));
    }

    incrementLikesCount(cardID) {
        return this._handleFetch(fetch(`${this._url}/cards/${cardID}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                ...this._headers,
            },
        }));
    }

    decrementLikesCount(cardID) {
        return this._handleFetch(fetch(`${this._url}/cards/${cardID}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                ...this._headers,
            },
        }));
    }

    changeLikeCardStatus(cardID, isLiked) {
        return this._handleFetch(fetch(`${this._url}/cards/${cardID}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            credentials: 'include',
            headers: {
                ...this._headers,
            },
        }));
    }

}

const api = new Api(apiOptions);
export default api;
