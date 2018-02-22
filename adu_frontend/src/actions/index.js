import api from "../services/api"

export const setUser = (data, history) => dispatch => {
  api.auth.login(data).then(user => {
    if (user.error) {
      dispatch({ type: "LOGIN_ERROR", error: user.error })
    } else {
      localStorage.setItem("token", user.jwt)
      dispatch({ type: "SET_CURRENT_USER", user })
      history.push("/")
    }
  })
}

export const fetchUser = () => dispatch => {
  api.auth.getCurrentUser().then(user => {
    dispatch({ type: "SET_CURRENT_USER", user })
  })
}

export const logOut = () => dispatch => {
  localStorage.removeItem("token")
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

export const resetLoadingBar = () => dispatch => {
  dispatch({ type: "RESET_LOADING_BAR" })
}

export const increment = amount => dispatch => {
  dispatch({ type: "INCREMENT", amount })
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

export const clearAduArea = () => dispatch => {
  dispatch({
    type: "CLEAR_ADU_AREA"
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

export const saveProperty = () => dispatch => {
  dispatch({
    type: "SAVE_PROPERTY"
  })
}

export const deleteProperty = () => dispatch => {
  dispatch({
    type: "DELETE_PROPERTY"
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
