import { apiAuthOptions } from './constants.js';

class ApiAuth {
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

    signup(email, password) {
        return this._handleFetch(fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
        }));
    }

    signin(email, password) {
        return this._handleFetch(fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
        }));
    }

    signout() {
        return this._handleFetch(fetch(`${this._url}/signout`, {
            method: 'GET',
            headers: this._headers,
        }));
    }

    tokenValidityCheck(JWT) {
        return this._handleFetch(fetch(`${this._url}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                ...this._headers,
            },
        }));
    }


}

const apiAuth = new ApiAuth(apiAuthOptions);
export default apiAuth;
