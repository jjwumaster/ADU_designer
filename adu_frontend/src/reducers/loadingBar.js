export default (state = { loading: 1, progress: 0 }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { loading: 2, ...state }
    case "DONE_LOADING":
      return { loading: 3, progress: 100 }
    case "RESET_LOADING_BAR":
      return { loading: 1, progress: 0 }
    case "INCREMENT":
      return { ...state.loading, progress: state.progress + action.amount }
    default:
      return state
  }
}
