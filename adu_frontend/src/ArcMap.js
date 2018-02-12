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

import React from "react"
// import { dojoRequire } from "esri-loader"
import EsriLoaderReact from "esri-loader-react"
import "./ArcMap.css"

class ArcMap extends React.PureComponent {
  render() {
    const options = {
      url: "https://js.arcgis.com/4.6"
    }

    return (
      <div>
        <EsriLoaderReact
          options={options}
          modulesToLoad={[
            "esri/Map",
            "esri/views/MapView",
            "esri/views/2d/draw/Draw",
            "esri/Graphic",
            "esri/geometry/Polygon",
            "esri/geometry/geometryEngine",
            "dojo/domReady!"
          ]}
          onReady={({
            loadedModules: [
              Map,
              MapView,
              Draw,
              Polygon,
              geometryEngine,
              Graphic
            ],
            containerNode
          }) => {
            const map = new Map({
              basemap: "hybrid"
            })

            const view = new MapView({
              container: containerNode,
              center: [-122.6765, 45.5231],
              zoom: 13,
              map: map
            })

            view.ui.add("draw-polygon", "top-left")

            view.when(e => {
              let draw = new Draw({ view: view })

              let drawPolygonButton = document.getElementById("draw-polygon")
              drawPolygonButton.addEventListener("click", () => {
                // view.graphics.removeAll()
                enableCreatePolygon(draw, view)
              })
            })

            const enableCreatePolygon = (draw, view) => {
              let action = draw.create("polygon")
              view.focus()
              action.on("vertex-add", drawPolygon)
              action.on("cursor-update", console.log("cursor updated"))
              console.log("enableCreatePolygon")
            }

            const drawPolygon = evt => {
              let vertices = evt.vertices
              let polygon = createPolygon(vertices)
              let graphic = createGraphic(polygon)
              let area = geometryEngine.geodesicArea(
                geometryEngine.simplify(polygon),
                "acres"
              )
              view.graphics.add(graphic)
            }

            const createPolygon = vertices => {
              return new Polygon({
                rings: vertices,
                spatialReference: view.spatialReference
              })
            }

            const createGraphic = polygon => {
              let graphic = new Graphic({
                geometry: polygon,
                symbol: {
                  type: "simple-fill",
                  color: [178, 102, 234, 0.8],
                  style: "solid",
                  outline: {
                    color: [255, 255, 255],
                    width: 2
                  }
                }
              })

              return graphic
            }

            const labelAreas = (geom, area) => {
              var graphic = new Graphic({
                geometry: geom.centroid,
                symbol: {
                  type: "text",
                  color: "white",
                  haloColor: "black",
                  haloSize: "1px",
                  text: area.toFixed(2) + " acres",
                  xoffset: 3,
                  yoffset: 3,
                  font: {
                    // autocast as Font
                    size: 14,
                    family: "sans-serif"
                  }
                }
              })
              view.graphics.add(graphic)
            }
          }}
        />
        <div id="viewDiv">
          <div
            id="draw-polygon"
            className="esri-widget-button esri-widget esri-interactive"
            title="Draw and measure polygon"
          >
            <span className="esri-icon-polygon" />
          </div>
        </div>
      </div>
    )
  }
}

export default ArcMap
