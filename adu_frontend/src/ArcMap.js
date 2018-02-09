import React from "react"
import { loadModules } from "esri-loader"
import style from "./ArcMap.css"

class ArcMap extends React.Component {
  componentDidMount() {
    const options = {
      url: "https://js.arcgis.com/3.23/"
    }
    loadModules(["esri/map"], options)
      .then(([Map]) => {
        // create map with the given options at a DOM node w/ id 'mapNode'
        const map = new Map(this.mapNode, {
          center: [-122.6765, 45.5231],
          zoom: 13,
          basemap: "hybrid"
          // other options: https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html
        })
        this.map = map
      })
      .catch(err => {
        // handle any script or module loading errors
        console.error(err)
      })
  }
  render() {
    return (
      <div
        ref={c => {
          this.mapNode = c
        }}
        className={style.root}
      />
    )
  }
}

export default ArcMap
