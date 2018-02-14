import React from "react"
import { Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
import { Progress, Container } from "semantic-ui-react"
// import ArcMap from "./ArcMap"
import Navbar from "./Navbar"
import Results from "./Results"
import MapContainer from "./MapContainer"
import Login from "./Login"
import Signup from "./Signup"
import Home from "./Home"
import Saved from "./Saved"
import Design from "./Design"

const App = props => {
  return (
    <div className="App">
      <Navbar />

      <Progress
        percent={props.loadingBar.loading ? 5 : 100}
        autoSuccess
        size="tiny"
      />

      <Route
        exact
        path="/"
        render={routerProps => {
          return <Home {...routerProps} />
        }}
      />

      <Switch>
        <Container>
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
            path="/design"
            render={routerProps => {
              return <Design />
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
        </Container>
      </Switch>
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
