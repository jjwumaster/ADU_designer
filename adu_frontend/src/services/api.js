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

const createProperty = data => {
  return fetch(`${API_ROOT}/properties`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data)
  })
}

const getProperty = id => {
  return fetch(`${API_ROOT}/get_property`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ id })
  })
}

const saveProperty = data => {
  return fetch(`${API_ROOT}/save_property`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data)
  })
}

const deleteProperty = data => {
  return fetch(`${API_ROOT}/delete_property`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data)
  })
}

const getUserProperties = userId => {
  return fetch(`${API_ROOT}/users/${userId}`)
}

const isPropertySaved = data => {
  return fetch(`${API_ROOT}/is_property_saved`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data)
  })
}

export default {
  auth: {
    login,
    getCurrentUser
  },
  users: {
    create
  },
  createProperty,
  saveProperty,
  deleteProperty,
  getUserProperties,
  getProperty,
  isPropertySaved,
  portland: {
    suggest,
    query
  }
}
