import helpers from "../helpers/helpers"

export default (
  state = { area: 0, drawingControl: true, polygon: null },
  action
) => {
  switch (action.type) {
    case "SET_ADU_AREA":
      console.log(helpers.convertArea(action.area, "sq ft"))
      return { area: helpers.convertArea(action.area, "sq ft") }
    case "CLEAR_ADU_AREA":
      return { area: 0 }
    case "DRAWING_CONTROL_ON":
      return { ...state, drawingControl: true }
    case "DRAWING_CONTROL_OFF":
      return { ...state, drawingControl: false }
    case "SET_POLYGON":
      return { ...state, polygon: action.polygon }
    case "REMOVE_POLYGON":
      return { ...state, polygon: action.polygon }
    default:
      return state
  }
}
