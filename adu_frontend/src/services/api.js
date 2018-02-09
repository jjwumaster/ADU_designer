const API_ROOT = `http://localhost:3001/api`
const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

const login = (email, password) => {
  return fetch(`${API_ROOT}/auth/`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ email, password })
  }).then(resp => resp.json())
}

const create = (email, password) => {
  return fetch(`${API_ROOT}/users/`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ email, password })
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

export default {
  auth: {
    login
  },
  users: {
    create
  },
  portland: {
    suggest,
    query
  }
}
