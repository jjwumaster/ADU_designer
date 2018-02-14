export default (state = {}, action) => {
  switch (action.type) {
    case "SET_PROPERTY":
      return {
        ...state,
        [action.dataName]: action.data
      }
    case "SAVE_PROPERTY":
      return null
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
