import { combineReducers } from "redux"
import auth from "./auth"
import property from "./property"
import suggestions from "./suggestions"
import loadingBar from "./loadingBar"
import adu from "./adu"

const reducers = combineReducers({
  auth,
  property,
  suggestions,
  loadingBar,
  adu
})

export default reducers
