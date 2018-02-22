import React from "react"
import { Segment, Rating } from "semantic-ui-react"
import Zoning from "./Zoning"
import helpers from "../helpers/helpers"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import api from "../services/api"
import * as actions from "../actions"

class Overview extends React.Component {
  componentWillMount() {
    api
      .isPropertySaved({
        portland_id: this.props.property.id,
        user_id: this.props.currentUser.id
      })
      .then(resp => resp.json())
      .then(json => {
        this.setSaved(json)
      })
  }

  setSaved = json => {
    if (json) {
      this.props.saveProperty()
    } else {
      this.props.deleteProperty()
    }
  }

  handleRate = (e, rating) => {
    !this.props.property.saved
      ? api
          .saveProperty({
            portland_id: this.props.property.id,
            user_id: this.props.currentUser.id
          })
          .then(this.props.saveProperty())
      : api
          .deleteProperty({
            portland_id: this.props.property.id,
            user_id: this.props.currentUser.id
          })
          .then(this.props.deleteProperty())
          .then(whatever => console.log("deleting record"))
  }

  render() {
    let { proper, formatNum, ownerParse } = helpers.format

    const d = this.props.property.detail
    const a = this.props.property.assessor
    const ll = this.props.property.latlong
    // const m = this.props.metrics

    let general = a.general
    let owner = a.owner

    // console.log("Lat:", ll.results[0].latitude, "Long", ll.results[0].longitude)

    return (
      <div>
        <Segment.Group horizontal compact>
          <Segment textAlign="center">
            <Rating
              icon="heart"
              size="massive"
              style={{ paddingTop: "15px" }}
              onRate={this.handleRate}
              rating={this.props.property.saved ? 1 : 0}
            />
          </Segment>
          <Segment>
            <h2>{proper(general.address)}</h2>
            {proper(general.address2)}
          </Segment>
          <Segment>
            <h3>Living Area</h3> {formatNum(this.props.livingArea)} sq. ft.
          </Segment>
          <Segment>
            <h3>Land Area</h3>
            {formatNum(general.total_land_area_sqft)} sq. ft.
          </Segment>
          <Segment>
            <h3>Owners</h3>{" "}
            {ownerParse(owner.name).map((owner, i) => {
              return owner.join(" ")
            })}
          </Segment>
          <Segment>
            <h3>Zoning</h3>
            <Zoning d={d} />
          </Segment>
        </Segment.Group>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  livingArea: state.property.metrics.livingArea,
  property: state.property,
  currentUser: state.auth.currentUser
})

export default withRouter(connect(mapStateToProps, actions)(Overview))
