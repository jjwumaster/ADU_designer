import React from "react"
import { connect } from "react-redux"
import ReactGoogleMap from "./ReactGoogleMap"
import * as actions from "./actions"

class MapContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.clearAduArea()
    this.props.drawingControlOn()
  }

  render() {
    return (
      <ReactGoogleMap
        drawingControl={this.props.drawingControl}
        polygon={this.props.polygon}
      />
    )
  }
}

const mapStateToProps = state => ({
  drawingControl: state.adu.drawingControl,
  polygon: state.adu.polygon
})

export default connect(mapStateToProps, actions)(MapContainer)
