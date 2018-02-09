import React from "react"
import { Link } from "react-router-dom"
import Searchbar from "./Searchbar"
import { connect } from "react-redux"

const Navbar = props => {
  const loggedIn = !!props.currentUser.id
  return (
    <div className="ui top fixed menu">
      {loggedIn ? (
        <div>
          {`Welcome ${props.currentUser.email}`}
          <Link to="/" className="item" onClick={props.handleLogout}>
            <h2>Logout</h2>
          </Link>
        </div>
      ) : (
        <React.Fragment>
          <Link to="/login" className="item">
            <h2>Login</h2>
          </Link>
          <Link to="/signup" className="item">
            <h2>Signup</h2>
          </Link>
          <Link to="/map" className="item">
            <h2>Map</h2>
          </Link>
        </React.Fragment>
      )}
      <Searchbar />
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps, null)(Navbar)
