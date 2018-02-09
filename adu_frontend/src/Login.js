import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import * as actions from "./actions"
import api from "./services/api"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      fields: {
        email: "",
        password: ""
      }
    }
    this.handleLogin = this.handleLogin.bind(this) // why do i need this
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    })
  }

  handleLogin = e => {
    e.preventDefault()
    api.auth
      .login(this.state.fields.email, this.state.fields.password)
      .then(resp => {
        if (resp.error) {
          this.setState({
            error: true
          })
        } else {
          this.props.setUser(resp)
          this.props.history.push("/") // should this be moved to redux
          console.log("Our user is", resp)
        }
      })
  }

  render() {
    console.log("this is Login state", this.state)
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleLogin}>
          <label htmlFor="email">E-mail</label>
          <input
            onChange={this.handleChange}
            name="email"
            type="email"
            id="emailLogin"
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={this.handleChange}
            name="password"
            type="password"
            id="passwordLogin"
          />
          <input type="submit" />
        </form>
        {this.state.error ? <h1> Try Again </h1> : null}
      </div>
    )
  }
}

export default withRouter(connect(null, actions)(Login))
