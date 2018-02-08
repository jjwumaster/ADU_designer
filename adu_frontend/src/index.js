import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { createStore, applyMiddleware } from "redux"
import registerServiceWorker from "./registerServiceWorker"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Provider } from "react-redux"
import reduxThunk from "redux-thunk"
import reducers from "./reducers/index"
import "semantic-ui-css/semantic.min.css"

const rootReducer = reducers
const store = createStore(rootReducer, applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
)
registerServiceWorker()
