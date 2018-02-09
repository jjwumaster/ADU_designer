import { combineReducers } from "redux"
import auth from "./auth"
import property from "./property"
import suggestions from "./suggestions"

const reducers = combineReducers({
  auth,
  property,
  suggestions
})

export default reducers
