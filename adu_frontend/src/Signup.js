import React, { Component } from "react"
import api from "./services/api"
import * as actions from "./actions"
import { connect } from "react-redux"

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      errors: [],
      fields: {
        email: "",
        password: "",
        password_confirmation: ""
      }
    }
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

  handleSignup = e => {
    e.preventDefault()

    if (
      this.state.fields.password === this.state.fields.password_confirmation
    ) {
      api.users
        .create(this.state.fields.email, this.state.fields.password)
        .then(resp => {
          if (resp.errors) {
            this.setState({
              errors: resp.errors
            })
          } else {
            this.props.setUser(resp)
          }
        })
    } else {
      alert("Password does not match")
    }
  }

  render() {
    console.log(this.state.fields)
    return (
      <div>
        <h2>Signup</h2>
        <form onSubmit={this.handleSignup}>
          <label htmlFor="email">E-mail</label>
          <input
            onChange={this.handleChange}
            name="email"
            type="email"
            id="email"
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={this.handleChange}
            name="password"
            type="password"
            id="password"
          />
          <input
            onChange={this.handleChange}
            name="password_confirmation"
            type="password"
            id="password_confirmation"
          />
          <input type="submit" />
        </form>
        {this.state.errors === []
          ? null
          : this.state.errors.map(error => <h1>{error}</h1>)}
      </div>
    )
  }
}
export default connect(null, actions)(Signup)
