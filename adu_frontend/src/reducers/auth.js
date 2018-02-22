const auth = (state = { currentUser: {}, error: null }, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { currentUser: action.user } // just id and email
    case "LOGIN_ERROR":
      return { error: action.error }
    case "LOGOUT":
      return { currentUser: {} }
    default:
      return state
  }
}

export default auth
