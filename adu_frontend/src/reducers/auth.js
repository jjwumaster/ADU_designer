const auth = (state = { currentUser: {} }, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { currentUser: action.user }
    case "LOGOUT":
      return { auth: { currentUser: {} } }
    default:
      return state
  }
}

export default auth
