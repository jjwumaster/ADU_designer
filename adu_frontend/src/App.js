import React from "react"
import Login from "./Login"
import Signup from "./Signup"
import { Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
import Navbar from "./Navbar"
import Results from "./Results"
import ArcMap from "./ArcMap"

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="ui container" id="content">
        <Switch>
          <Route
            path="/login"
            render={routerProps => {
              return <Login {...routerProps} />
            }}
          />
          <Route
            path="/signup"
            render={routerProps => {
              return <Signup />
            }}
          />
          <Route
            path="/results"
            render={routerProps => {
              return <Results />
            }}
          />
          <Route
            path="/map"
            render={routerProps => {
              return <ArcMap />
            }}
          />
        </Switch>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth
  }
}

export default connect(mapStateToProps, null)(App)
