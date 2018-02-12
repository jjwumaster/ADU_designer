import { combineReducers } from "redux"
import auth from "./auth"
import property from "./property"
import suggestions from "./suggestions"
import loadingBar from "./loadingBar"

const reducers = combineReducers({
  auth,
  property,
  suggestions,
  loadingBar
})

export default reducers
