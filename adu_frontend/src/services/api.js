const API_ROOT = `http://localhost:3001/api`
const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

const login = data => {
  return fetch(`${API_ROOT}/auth/`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data)
  }).then(resp => resp.json())
}

const create = data => {
  return fetch(`${API_ROOT}/users/`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data)
  }).then(resp => resp.json())
}

const suggest = query => {
  return fetch(`${API_ROOT}/suggest/`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ query })
  }).then(resp => resp.json())
}

const query = (id, request) => {
  return fetch(`${API_ROOT}/query/`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ id, request })
  }).then(resp => resp.json())
}

const getWithToken = url => {
  const token = localStorage.getItem("token")
  return fetch(url, {
    headers: { Authorization: token }
  }).then(resp => resp.json())
}

const getCurrentUser = () => {
  return getWithToken(`${API_ROOT}/current_user`)
}

export default {
  auth: {
    login,
    getCurrentUser
  },
  users: {
    create
  },
  portland: {
    suggest,
    query
  }
}
