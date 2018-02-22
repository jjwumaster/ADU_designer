import React from "react"
import { connect } from "react-redux"
import { Progress } from "semantic-ui-react"
import * as actions from "./actions"

class LoadingBar extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.interval = setInterval(() => this.props.increment(5), 100)
    setTimeout(this.loadManager, 2000)
  }

  loadManager = () => {
    clearInterval(this.interval)
    this.props.doneLoading()
    // setTimeout(this.props.resetLoadingBar(), 500)
  }

  render() {
    return <Progress percent={this.props.loadingBar.progress} size="tiny" />
  }
}

const mapStateToProps = state => {
  return {
    loadingBar: state.loadingBar
  }
}

export default connect(mapStateToProps, actions)(LoadingBar)
