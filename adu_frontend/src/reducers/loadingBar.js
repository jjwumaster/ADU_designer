export default (state = { loading: false }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { loading: true }
    case "DONE_LOADING":
      return { loading: false }
    default:
      return state
  }
}
