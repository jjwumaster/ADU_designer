const auth = (state = { currentUser: {} }, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { currentUser: action.user } // just id and email
    case "LOGOUT":
      return { currentUser: {} }
    default:
      return state
  }
}

export default auth
