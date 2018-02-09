import React from "react"
import { Search } from "semantic-ui-react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import api from "./services/api"
import debounce from "lodash/debounce"
import * as actions from "./actions"

class Searchbar extends React.Component {
  constructor() {
    super()
    this.state = {
      query: "",
      error: ""
    }
  }

  handleChange = e => {
    this.setState({ query: e.target.value })
    this.props.loadingSuggestions()
  }

  handleResultSelect = (e, result) => {
    if (result.result.description !== "address") {
      alert("this is not an address") // potentially convert to state or Semantic Popup
      // this.setState({error: "Not an address!"})
    } else {
      this.getData(result.result.id)
    }
    this.setState({ query: result.result.title })
    // add another horizontal loading bar to show API is loading--Semantic Progress
    this.props.history.push("/results")
  }

  getData = id => {
    api.portland
      .query(id, "detail")
      .then(r => this.props.setProperty("detail", r))
    // api.portland
    //   .query(id, "assessor")
    //   .then(r => this.props.setProperty("assessor", r))
    api.portland
      .query(id, "assessor")
      .then(r => this.props.setProperty("assessor", r))
  }

  hitApi = debounce(() => {
    api.portland
      .suggest(this.state.query)
      .then(sugg => this.props.setSuggestions(sugg.candidates))
  }, 150)

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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  property: state.property,
  suggestions: state.suggestions.list,
  isLoading: state.suggestions.isLoading
})

export default withRouter(connect(mapStateToProps, actions)(Searchbar))
