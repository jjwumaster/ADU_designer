import React from "react"
import { Segment } from "semantic-ui-react"
import Zoning from "./Zoning"
import helpers from "../helpers/helpers"

export default props => {
  let { proper, formatNum, ownerParse } = helpers.format
  let { a, d } = props

  let general = a.general
  let owner = a.owner

  console.log("Lat:", general.latitude, "Long:", general.longitude)
  console.log(general)

  return (
    <div>
      <Segment.Group horizontal compact>
        <Segment>
          <h2>{proper(general.address)}</h2>
          <br />
          {proper(general.address2)}
        </Segment>
        <Segment>
          Living Area: NEED TO ADD UP IMPROVEMENTS Sq. Ft.
          <br />
          Land Area: {formatNum(general.total_land_area_acres)} /{" "}
          {formatNum(general.total_land_area_sqft)}
        </Segment>
        <Segment>
          Owners:
          {ownerParse(owner.name).map((owner, i) => {
            return owner.join(", ")
          })}
        </Segment>
        <Segment>
          <Zoning d={d} />
        </Segment>
      </Segment.Group>
    </div>
  )
}
