export default (state = {}, action) => {
  switch (action.type) {
    case "SET_PROPERTY":
      return {
        ...state,
        [action.dataName]: action.data
      }
    case "SAVE_PROPERTY":
      return null
    default:
      return state
  }
}
