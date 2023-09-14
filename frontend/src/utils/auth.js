export const BASE_URL = 'http://localhost:3005'

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
};
export const checkToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    }
  })
  .then(checkResponse)
}

function checkResponse(res) {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}