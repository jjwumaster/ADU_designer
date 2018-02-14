import React from "react"
import { Segment, Rating } from "semantic-ui-react"
import Zoning from "./Zoning"
import helpers from "../helpers/helpers"
import { connect } from "react-redux"

const Overview = props => {
  let { proper, formatNum, ownerParse } = helpers.format

  const d = props.property.detail
  const a = props.property.assessor
  const ll = props.property.latlong
  // const m = props.metrics

  let general = a.general
  let owner = a.owner

  console.log("Lat:", ll.results[0].latitude, "Long", ll.results[0].longitude)

  return (
    <div>
      <Segment.Group horizontal compact>
        <Segment>
          <Rating
            icon="heart"
            size="massive"
            style={{ paddingTop: "15px", paddingLeft: "20px" }}
          />
        </Segment>
        <Segment>
          <h2>{proper(general.address)}</h2>
          {proper(general.address2)}
        </Segment>
        <Segment>
          <h3>Living Area</h3> {formatNum(props.livingArea)} sq. ft.
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

const mapStateToProps = state => ({
  livingArea: state.property.metrics.livingArea,
  property: state.property
})

export default connect(mapStateToProps, null)(Overview)
