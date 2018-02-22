/* eslint-disable no-undef */

import React from "react"
import { connect } from "react-redux"
import * as actions from "./actions"
import helpers from "./helpers/helpers"

const { compose, withProps } = require("recompose")
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polygon
} = require("react-google-maps")
const {
  DrawingManager
} = require("react-google-maps/lib/components/drawing/DrawingManager")
const {
  MarkerWithLabel
} = require("react-google-maps/lib/components/addons/MarkerWithLabel")

const ReactGoogleMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAgPInxBQf-p63Pj_HBtuS2j_uoIYDK5WI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const handlePolygonComplete = polygon => {
    polygon.setMap(null)
    let computeArea = google.maps.geometry.spherical.computeArea
    props.setAduArea(computeArea(polygon.getPaths().getArray()[0].b)) // this is super hacky
    props.setPolygon(polygon.getPaths().getArray())
  }

  const handleClick = e => {
    props.clearAduArea()
    props.setPolygon([])
    props.drawingControlOn()
  }

  return (
    <GoogleMap
      defaultZoom={19}
      center={new google.maps.LatLng(props.latitude, props.longitude)}
    >
      {props.drawingControl && ( // explain this logic
        <DrawingManager
          defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
          options={{
            drawingControl: props.drawingControl,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [google.maps.drawing.OverlayType.POLYGON]
            },
            polygonOptions: {
              clickable: true,
              editable: false // can change to true with listeners on pathing
            }
          }}
          onPolygonComplete={polygon => {
            props.drawingControlOff()
            handlePolygonComplete(polygon)
          }}
        />
      )}
      {props.polygon ? (
        <Polygon
          paths={props.polygon}
          onMouseOver={() => console.log("mousing over, click to delete")}
          onClick={handleClick}
        />
      ) : null}
      <MarkerWithLabel
        position={{ lat: props.latitude, lng: props.longitude }}
        labelAnchor={new google.maps.Point(0, 20)}
        labelStyle={{
          fontSize: "16px",
          padding: "16px"
        }}
        animation={google.maps.Animation.DROP}
      >
        <div>
          {helpers.format.proper(props.property.assessor.general.address)}
        </div>
      </MarkerWithLabel>
    </GoogleMap>
  )
})

const mapStateToProps = state => {
  return {
    latitude: state.property.latlong.results[0].latitude,
    longitude: state.property.latlong.results[0].longitude,
    property: state.property
  }
}

export default connect(mapStateToProps, actions)(ReactGoogleMap)
