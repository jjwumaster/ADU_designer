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

export const startLoading = () => dispatch => {
  dispatch({ type: "START_LOADING" })
}

export const doneLoading = () => dispatch => {
  dispatch({ type: "DONE_LOADING" })
}

export const setMetrics = metrics => dispatch => {
  dispatch({
    type: "SET_METRICS",
    metrics
  })
}

export const setAduArea = area => dispatch => {
  dispatch({
    type: "SET_ADU_AREA",
    area
  })
}

export const drawingControlOff = () => dispatch => {
  dispatch({
    type: "DRAWING_CONTROL_OFF"
  })
}

export const drawingControlOn = () => dispatch => {
  dispatch({
    type: "DRAWING_CONTROL_ON"
  })
}

export const setPolygon = polygon => dispatch => {
  dispatch({
    type: "SET_POLYGON",
    polygon
  })
}

export const removePolygon = () => dispatch => {
  dispatch({
    type: "REMOVE_POLYGON"
  })
}

// link: https://www.portlandoregon.gov/bds/index.cfm?a=68689

// setback rules: https://www.portlandoregon.gov/bps/index.cfm?&a=64609&c=36238
// ADU rules: https://www.portlandoregon.gov/bds/article/648618

// zone,
// propertyType,
// lotSize,
// livingArea,
// detachedCoverage,
// totalCoverage
