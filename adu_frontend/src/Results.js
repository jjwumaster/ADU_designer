import React from "react"
import { connect } from "react-redux"
import { Button } from "semantic-ui-react"
import Overview from "./components/Overview"
import Improvements from "./components/Improvements"
import Dashboard from "./components/Dashboard"
import * as actions from "./actions"

const Results = props => {
  const d = props.property.detail
  const a = props.property.assessor
  const m = props.metrics

  let shouldIRender = () => {
    if (d && a && m) {
      return true
    } else {
      return false
    }
  }

  console.log("detail", d)
  console.log("assessor", a)
  console.log(props.metrics)

  return (
    <div>
      {shouldIRender() ? (
        <div>
          <Button>DESIGN YOUR ADU (NON FUNCTIONAL)</Button>
          <Overview a={a} d={d} />
          <Improvements a={a} />
          <Dashboard />
        </div>
      ) : null}
    </div>
  )
}

const mapStateToProps = state => ({
  property: state.property,
  metrics: state.property.metrics
})

export default connect(mapStateToProps, actions)(Results)
