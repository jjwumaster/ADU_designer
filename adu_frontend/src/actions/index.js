// import { api } from "../services"

export const setUser = user => dispatch => {
  dispatch({ type: "SET_CURRENT_USER", user })
}

export const logOut = () => dispatch => {
  dispatch({ type: "LOGOUT" })
}

export const setProperty = (dataName, data) => dispatch => {
  dispatch({ type: "SET_PROPERTY", dataName, data })
}

export const setSuggestions = suggestions => dispatch => {
  dispatch({ type: "SET_SUGGESTIONS", suggestions })
}

export const loadingSuggestions = () => dispatch => {
  dispatch({ type: "LOADING_SUGGESTIONS" })
}

// NOT YET IN USE
export const setMetrics = (
  zone,
  propertySize,
  livingArea,
  detachedCoverage,
  totalCoverage
) => dispatch => {
  dispatch({
    type: "SET_METRICS",
    propertySize,
    livingArea,
    detachedCoverage,
    totalCoverage
  })
}

// zone, total property area, total living area, area of all detached structures, area of all structures

// 75% of living area or 800 sq. ft., whichever is less
// link: https://www.portlandoregon.gov/bds/index.cfm?a=68689

// combined detached accessory structures may not exceed 15% building coverage
// detached structure may not have more coverage than existing structure
// all structures may not exceed ____% (based on below logic)

// <3,000 = 50% coverage
// <5,000 = 1,500 + 37.5% * (a - 1,500)
// <20,000 = 2,250 + 15.0% * (a - 2,250)
// 20,000+ = 4,500 + 7.5% * (a - 4,500)

// setback rules: https://www.portlandoregon.gov/bps/index.cfm?&a=64609&c=36238
// ADU rules: https://www.portlandoregon.gov/bds/article/648618
