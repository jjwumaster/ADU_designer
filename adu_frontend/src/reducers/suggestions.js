import helpers from "../helpers/helpers"

export default (state = { isLoading: false, list: [] }, action) => {
  switch (action.type) {
    case "SET_SUGGESTIONS":
      let suggestions = []
      if (action.suggestions) {
        suggestions = action.suggestions.map(suggestion => ({
          title: helpers.format.proper(suggestion.address),
          id: suggestion.attributes.property_id,
          description: suggestion.attributes.type
        }))
      }
      return { isLoading: false, list: suggestions }
    case "LOADING_SUGGESTIONS":
      return { isLoading: true, list: state.list }
    default:
      return state
  }
}
