import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import * as actions from "./actions"
import api from "./services/api"
import { Form } from "semantic-ui-react"

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
    this.props.setUser(
      {
        email: this.state.fields.email,
        password: this.state.fields.password
      },
      this.props.history
    )
    // api.auth
    //   .login(this.state.fields.email, this.state.fields.password)
    //   .then(resp => {
    //     if (resp.error) {
    //       this.setState({
    //         error: true
    //       })
    //     } else {
    //       this.props.setUser(resp)
    //       this.props.history.push("/") // should this be moved to redux
    //       console.log("Our user is", resp)
    //     }
    //   })
  }

  render() {
    console.log("this is Login state", this.state)
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          New to us? Sign up <Link to="/signup">here</Link>
        </div>
        <h2>Login</h2>
        <Form onSubmit={this.handleLogin}>
          <Form.Input
            fluid
            label="E-mail"
            onChange={this.handleChange}
            name="email"
            type="email"
            id="emailLogin"
          />
          <Form.Input
            fluid
            label="Password"
            onChange={this.handleChange}
            name="password"
            type="password"
            id="passwordLogin"
          />
          <Form.Button>Submit</Form.Button>
        </Form>
        {this.state.error ? <h1> Try Again </h1> : null}
      </div>
    )
  }
}

export default withRouter(connect(null, actions)(Login))
