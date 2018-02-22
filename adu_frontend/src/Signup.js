import React, { Component } from "react"
import api from "./services/api"
import * as actions from "./actions"
import { connect } from "react-redux"
import { Form } from "semantic-ui-react"
import { withRouter } from "react-router-dom"

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
        .create({
          email: this.state.fields.email,
          password: this.state.fields.password
        })
        .then(resp => {
          if (resp.errors) {
            this.setState({
              errors: resp.errors
            })
          } else {
            this.props.setUser(
              {
                email: this.state.fields.email,
                password: this.state.fields.password
              },
              this.props.history
            )
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
        <Form onSubmit={this.handleSignup}>
          <Form.Input
            fluid
            label="E-mail"
            onChange={this.handleChange}
            name="email"
            type="email"
            id="email"
          />

          <Form.Input
            fluid
            label="Password"
            onChange={this.handleChange}
            name="password"
            type="password"
            id="password"
          />

          <Form.Input
            fluid
            label="Confirm Password"
            onChange={this.handleChange}
            name="password_confirmation"
            type="password"
            id="password_confirmation"
          />
          <Form.Button>Submit</Form.Button>
        </Form>
        {this.state.errors === []
          ? null
          : this.state.errors.map(error => <h1>{error}</h1>)}
      </div>
    )
  }
}
export default withRouter(connect(null, actions)(Signup))
