export default (state = {}, action) => {
  switch (action.type) {
    case "SET_PROPERTY":
      console.log("setting property with action", action)
      console.log("this is the current state", state)
      return {
        ...state,
        [action.dataName]: action.data
      }
    case "SAVE_PROPERTY":
      return {
        ...state,
        saved: true
      }
    case "DELETE_PROPERTY":
      return {
        ...state,
        saved: false
      }
    case "SET_METRICS":
      return {
        ...state,
        metrics: {
          zone: action.metrics.zone,
          propertyType: action.metrics.propertyType,
          lotSize: action.metrics.lotSize,
          livingArea: action.metrics.livingArea,
          detachedCoverage: action.metrics.detachedCoverage,
          totalCoverage: action.metrics.totalCoverage,
          mainCoverage: action.metrics.mainCoverage
        }
      }
    default:
      return state
  }
}
