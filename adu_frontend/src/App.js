import React from "react"
import Login from "./Login"
import Signup from "./Signup"
import { Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
import Navbar from "./Navbar"
import Results from "./Results"
// import ArcMap from "./ArcMap"
import MapContainer from "./MapContainer"
import { Progress } from "semantic-ui-react"
import Home from "./Home"
import Saved from "./Saved"

const App = props => {
  return (
    <div className="App">
      <Navbar />
      <div className="ui container" id="content">
        <Progress
          percent={props.loadingBar.loading ? 5 : 100}
          autoSuccess
          size="tiny"
        />
        <Switch>
          <Route
            exact
            path="/"
            render={routerProps => {
              return <Home {...routerProps} />
            }}
          />
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
            path="/saved"
            render={routerProps => {
              return <Saved />
            }}
          />
          <Route
            path="/map"
            render={routerProps => {
              return (
                <div style={{ width: "100%", height: "400px" }}>
                  <MapContainer />
                </div>
              )
            }}
          />
        </Switch>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth,
    loadingBar: state.loadingBar
  }
}

export default connect(mapStateToProps, null)(App)
