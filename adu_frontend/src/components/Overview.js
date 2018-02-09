import React from "react"
import { Header, Segment } from "semantic-ui-react"
import Zoning from "./Zoning"

export default props => {
  let { a, d } = props

  function proper(str) {
    let dir = [
      "NE",
      "SE",
      "NW",
      "SW",
      "AK",
      "AL",
      "AR",
      "AS",
      "AZ",
      "CA",
      "CO",
      "CT",
      "DC",
      "DE",
      "FL",
      "GA",
      "GU",
      "HI",
      "IA",
      "ID",
      "IL",
      "IN",
      "KS",
      "KY",
      "LA",
      "MA",
      "MD",
      "ME",
      "MI",
      "MN",
      "MO",
      "MS",
      "MT",
      "NC",
      "ND",
      "NE",
      "NH",
      "NJ",
      "NM",
      "NV",
      "NY",
      "OH",
      "OK",
      "OR",
      "PA",
      "PR",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VA",
      "VI",
      "VT",
      "WA",
      "WI",
      "WV",
      "WY"
    ]

    return str.replace(/\w\S*/g, function(txt) {
      return dir.includes(txt)
        ? txt
        : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  function formatNum(num) {
    return Intl.NumberFormat("en-USA").format(num)
  }

  function ownerParse(str) {
    let owners = str.split("&")
    return owners.map(owner => {
      let fullNameBackwards = owner.split(",")
      return fullNameBackwards.map(name => {
        return proper(name)
      })
    })
  }

  let general = a.general
  let owner = a.owner

  // {general.latitude}
  // {general.longitude}

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
