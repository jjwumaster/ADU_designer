import React from "react"
import GoogleMap from "google-map-react"

class Map extends React.Component {
  static defaultProps = {
    center: { lat: 45.5231, lng: -122.6765 },
    zoom: 13
  }

  constructor() {
    super()
    this.state = {}
  }

  render() {
    console.log("this is state", this.state)
    return (
      <React.Fragment>
        <GoogleMap
          center={this.props.center}
          zoom={this.props.zoom}
          bootstrapURLKeys={{ key: "AIzaSyAgPInxBQf-p63Pj_HBtuS2j_uoIYDK5WI" }}
          onGoogleApiLoaded={({ map, maps }) => {
            this.setState({ map: map, maps: maps, mapLoaded: true })
          }}
          yesIWantToUseGoogleMapApiInternals
        >
          <div>lat: 45.5231, lng: -122.6765</div>
        </GoogleMap>
        {this.state.mapLoaded ? (
          <Draw map={this.state.map} maps={this.state.maps} />
        ) : null}
      </React.Fragment>
    )
  }
}

class Draw extends React.PureComponent {
  render() {
    const DrawingManager = this.props.maps.DrawingManager
    console.log("drawing manager", DrawingManager)
    return null
  }
}

export default Map
