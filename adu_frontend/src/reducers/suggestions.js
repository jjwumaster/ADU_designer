export default (state = { isLoading: false, list: [] }, action) => {
  function proper(str) {
    let dir = ["NE", "SE", "NW", "SW"]
    return str.replace(/\w\S*/g, function(txt) {
      return dir.includes(txt)
        ? txt
        : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  switch (action.type) {
    case "SET_SUGGESTIONS":
      let suggestions = []
      if (action.suggestions) {
        suggestions = action.suggestions.map(suggestion => ({
          title: proper(suggestion.address),
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
