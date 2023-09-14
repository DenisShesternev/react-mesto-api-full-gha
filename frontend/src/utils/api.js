class Api {
    constructor(options) {
        this._url = options.url
        this._headers = options.headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    getUserInfo() {
        const token = localStorage.getItem("jwt");
        return this._request(this._url + '/users/me', {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            }
        })
    }

    getInitialCards() {
        const token = localStorage.getItem("jwt");
        return this._request(this._url + '/cards', {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
    }

    setUserInfoApi(userData) {
        const token = localStorage.getItem("jwt");
        return this._request(this._url + '/users/me', {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
    }

    addUserCard(data) {
        const token = localStorage.getItem("jwt");
        return this._request(this._url + '/cards', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
    }

    changeLikeCardStatus(id, isLiked) {
        const token = localStorage.getItem("jwt");
        return this._request(this._url + `/cards/${id}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
    }

    delete(id) {
        const token = localStorage.getItem("jwt");
        return this._request(this._url + `/cards/${id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
    }

    handleUserAvatar(data) {
        const token = localStorage.getItem("jwt");
        return this._request(this._url + '/users/me/avatar', {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
    }

    getAllNeededData() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }
}

export const api = new Api({
    url: 'http://localhost:3005',
})