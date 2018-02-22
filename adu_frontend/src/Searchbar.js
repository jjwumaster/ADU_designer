import React from "react"
import { Search } from "semantic-ui-react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import api from "./services/api"
import debounce from "lodash/debounce"
import * as actions from "./actions"
import rules from "./helpers/rules"

class Searchbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      error: ""
    }
  }

  handleChange = e => {
    this.setState({ query: e.target.value, error: "" })
    this.props.loadingSuggestions()
  }

  handleResultSelect = (e, result) => {
    if (result.result.description !== "address") {
      // alert("this is not an address") // potentially convert to state or Semantic Popup
      this.setState({
        query: result.result.title,
        error: "Not a valid address!"
      })
    } else {
      this.getData(result.result.id)
      api
        .createProperty({
          portland_id: result.result.id,
          address: result.result.title
        })
        .then(whatever => {
          this.setState({ query: result.result.title })
          this.props.startLoading()
          this.props.history.push(`/results/${result.result.id}`)
        })
    }
  }

  getData = id => {
    this.props.setProperty("id", id)
    Promise.all([
      api.portland.query(id, "detail"),
      api.portland.query(id, "assessor"),
      api.portland.query(id, "latlong")
    ]).then(values => {
      this.props.setProperty("detail", values[0])
      this.props.setProperty("assessor", values[1])
      this.props.setProperty("latlong", values[2])
      this.setMetrics(this.props.property.detail, this.props.property.assessor)
      this.props.doneLoading()
    })
  }

  setMetrics = (d, a) => {
    let detachedCoverage = rules.detachedCoverage(a.improvements.details)
    let totalCoverage = rules.totalCoverage(a.improvements.details)
    let livingArea = rules.livingArea(a.improvements.details)
    let lotSize = a.general.total_land_area_sqft
    let propertyType = a.improvements.improvement_type
    let mainCoverage = rules.mainCoverage(a.improvements.details)
    let zone = d.zoning[0].code // iterate??

    let metrics = {
      zone,
      propertyType,
      lotSize,
      livingArea,
      detachedCoverage,
      totalCoverage,
      mainCoverage
    }

    this.props.setMetrics(metrics)
  }

  hitApi = debounce(() => {
    api.portland
      .suggest(this.state.query)
      .then(sugg => this.props.setSuggestions(sugg.candidates))
  }, 200)

  // debounceTestHandler = debounce(() => console.log("HI"), 200)

  render() {
    return (
      <div className="ui search">
        <Search
          placeholder="Search..."
          loading={this.props.isLoading}
          onResultSelect={this.handleResultSelect}
          results={this.props.suggestions}
          onSearchChange={this.handleChange}
          onKeyUp={this.hitApi}
          value={this.state.query}
        />
        {this.state.error ? this.state.error : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    property: state.property,
    suggestions: state.suggestions.list,
    isLoading: state.suggestions.isLoading
  }
}

export default withRouter(connect(mapStateToProps, actions)(Searchbar))
