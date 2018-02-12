// import React from "react"
// import { loadModules } from "esri-loader"
// import style from "./ArcMap.css"
//
// class ArcMap extends React.Component {
//   componentDidMount() {
//     const options = {
//       url: "https://js.arcgis.com/4.6/"
//     }
//     loadModules(
//       [
//         "esri/map",
//         "esri/views/2d/draw/Draw",
//         "esri/views/MapView",
//         "esri/Graphic",
//         "esri/geometry/Polygon",
//         "esri/geometry/geometryEngine"
//       ],
//       options
//     )
//       .then(([Map]) => {
//         // create map with the given options at a DOM node w/ id 'mapNode'
//         const map = new Map(this.mapNode, {
//           center: [-122.6765, 45.5231],
//           zoom: 13,
//           basemap: "hybrid"
//           // other options: https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html
//         })
//         this.map = map
//       })
//       .catch(err => {
//         // handle any script or module loading errors
//         console.error(err)
//       })
//   }
//   render() {
//     return (
//       <div
//         ref={c => {
//           this.mapNode = c
//         }}
//         className={style.root}
//       />
//     )
//   }
// }
//
// export default ArcMap

import * as React from "react"
import { dojoRequire } from "esri-loader"
import EsriLoader from "esri-loader-react"
export interface Props {
  onMapViewCreated?: mapView => void;
}

interface State {
  loaded?: boolean;
}
export default class ArcMap extends React.Component<Props> {
  mapContainer
  mapView
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }
  ready() {
    this.setState({
      loaded: true
    })
  }
  createMap = () => {
    dojoRequire(["esri/Map", "esri/views/MapView"], (Map, MapView) => {
      this.mapView = new MapView({
        container: this.mapContainer,
        map: new Map({ basemap: "dark-gray" })
      })
      this.props.onMapViewCreated(this.mapView)
    })
  }
  componentDidMount() {
    this.createMap()
  }
  render() {
    // you can omit options and it defaults to the latest version
    const options = {
      url: "https://js.arcgis.com/4.5/"
      // url: '/arcgis_js_api/init.js'
    }
    return (
      <div style={{ height: "100%" }}>
        <EsriLoader options={options} ready={this.ready.bind(this)} />
        <div
          style={{ height: "100%" }}
          ref={node => (this.mapContainer = node)}
        />
      </div>
    )
  }
}
