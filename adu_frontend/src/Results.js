import React from "react"
import { connect } from "react-redux"
import { Button, Grid, Icon, Menu } from "semantic-ui-react"
import Overview from "./components/Overview"
// import Improvements from "./components/Improvements"
import Dashboard from "./components/Dashboard"
import MapContainer from "./MapContainer"
import * as actions from "./actions"
import withAuth from "./hocs/withAuth"
import { withRouter } from "react-router-dom"

const Results = props => {
  const d = props.property.detail
  const a = props.property.assessor
  const m = props.metrics

  let shouldIRender = () => {
    if (d && a && m) {
      return true
    } else {
      return false
    }
  }

  // console.log("detail", d)
  // console.log("assessor", a)
  // console.log(props.metrics)

  // <Improvements /> // could be implemented as a pop-up

  const handleClick = (e, { name }) => {
    switch (name) {
      case "back":
        // has to take you back to the last page
        break
      case "design":
        props.history.push("/design")
        break
      default:
        return null
    }
  }

  return (
    <div>
      {shouldIRender() ? (
        <div>
          <Overview />
          <Menu secondary>
            <Menu.Item style={{ paddingLeft: "0px" }}>
              <Button name="back" onClick={handleClick}>
                <Icon name="arrow left" />
              </Button>
            </Menu.Item>

            <Menu.Item position="right" style={{ paddingRight: "0px" }}>
              <Button name="design" onClick={handleClick}>
                Design Your ADU
                <Icon name="arrow right" />
              </Button>
            </Menu.Item>
          </Menu>
          <Grid columns={2}>
            <Grid.Column>
              <MapContainer />
            </Grid.Column>

            <Grid.Column>
              <Dashboard />
            </Grid.Column>
          </Grid>
        </div>
      ) : null}
    </div>
  )
}

const mapStateToProps = state => ({
  property: state.property,
  metrics: state.property.metrics
})

export default withAuth(withRouter(connect(mapStateToProps, actions)(Results)))
