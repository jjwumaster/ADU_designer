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
import api from "./services/api"
import rules from "./helpers/rules"

class Results extends React.Component {
  constructor() {
    super()
  }

  componentWillMount() {
    let propertyId = this.props.location.pathname.split("/")[2]
    api
      .getProperty(propertyId)
      .then(resp => resp.json())
      .then(json => {
        if (json.status === 404) {
          this.props.history.push("/404")
        } else {
          this.getData(propertyId)
          this.props.startLoading()
        }
      })
  }

  getData = id => {
    this.props.setProperty("id", id)
    Promise.all([
      api.portland.query(id, "detail"),
      api.portland.query(id, "assessor"),
      api.portland.query(id, "latlong")
    ]).then(values => {
      this.props.setProperty("detail", values[0])
      this.props.setProperty("assessor", values[1])
      this.props.setProperty("latlong", values[2])
      this.setMetrics(this.props.property.detail, this.props.property.assessor)
      this.props.doneLoading()
    })
  }

  setMetrics = (d, a) => {
    let detachedCoverage = rules.detachedCoverage(a.improvements.details)
    let totalCoverage = rules.totalCoverage(a.improvements.details)
    let livingArea = rules.livingArea(a.improvements.details)
    let lotSize = a.general.total_land_area_sqft
    let propertyType = a.improvements.improvement_type
    let mainCoverage = rules.mainCoverage(a.improvements.details)
    let zone = d.zoning[0].code // iterate??

    let metrics = {
      zone,
      propertyType,
      lotSize,
      livingArea,
      detachedCoverage,
      totalCoverage,
      mainCoverage
    }

    this.props.setMetrics(metrics)
  }

  handleClick = (e, { name }) => {
    switch (name) {
      case "back":
        this.props.history.push("/")
        break
      case "design":
        let propertyId = this.props.location.pathname.split("/")[2]
        this.props.history.push(`/design/${this.props.property.id}`)
        break
      default:
        return null
    }
  }

  render() {
    const d = this.props.property.detail
    const a = this.props.property.assessor
    const m = this.props.metrics

    let shouldIRender = () => {
      return d && a && m ? true : false
    }

    // <Improvements /> // could be implemented as a pop-up

    return (
      <div>
        {shouldIRender() ? (
          <div>
            <Overview />
            <Menu secondary>
              <Menu.Item style={{ paddingLeft: "0px" }}>
                <Button name="back" onClick={this.handleClick}>
                  <Icon name="arrow left" />
                </Button>
              </Menu.Item>

              <Menu.Item position="right" style={{ paddingRight: "0px" }}>
                <Button name="design" onClick={this.handleClick}>
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
}

const mapStateToProps = state => ({
  property: state.property,
  metrics: state.property.metrics
})

export default withAuth(withRouter(connect(mapStateToProps, actions)(Results)))
