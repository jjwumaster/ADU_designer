import React from "react"
import { connect } from "react-redux"
import { Button, Item } from "semantic-ui-react"
import Zoning from "./components/Zoning"
import Overview from "./components/Overview"
import Improvements from "./components/Improvements"
import Dashboard from "./components/Dashboard"

const Results = props => {
  const d = props.property.detail
  const a = props.property.assessor
  // const i = props.property.improvements

  let shouldIRender = () => {
    return d && a ? true : false
  }

  console.log("detail", d)
  console.log("assessor", a)
  // refactor using Promise.all()

  return (
    <div>
      {shouldIRender() ? (
        <div>
          <Overview a={a} d={d} />
          <Improvements a={a} />
          <Button>DESIGN YOUR ADU (NON FUNCTIONAL)</Button>
          <Dashboard />
        </div>
      ) : null}
    </div>
  )
}

const mapStateToProps = state => ({
  property: state.property
})

export default connect(mapStateToProps, null)(Results)
