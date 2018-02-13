import React from "react"
import { withRouter } from "react-router-dom"
import Searchbar from "./Searchbar"
import { connect } from "react-redux"
import { Menu } from "semantic-ui-react"

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: "home"
    }
  }

  handleItemClick = (e, { name }) => {
    switch (name) {
      case "logout":
        this.props.history.push("/")
        break
      case "login":
        this.props.history.push("/login")
        break
      case "saved":
        this.props.history.push("/saved")
        break
      default:
        break
    }
    return this.setState({ activeItem: name })
  }

  render() {
    return (
      <Menu pointing secondary>
        <div
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "20px"
          }}
        >
          <Searchbar />
        </div>

        {!!this.props.currentUser.id ? (
          <React.Fragment>
            <Menu.Item>
              Welcome back {`${this.props.currentUser.email}`}
            </Menu.Item>

            <Menu.Menu position="right">
              <Menu.Item
                name="saved"
                className="item"
                onClick={this.handleItemClick}
                active={this.state.activeItem === "saved"}
              >
                <h2>Saved</h2>
              </Menu.Item>

              <Menu.Item
                name="logout"
                className="item"
                onClick={this.handleItemClick}
                active={this.state.activeItem === "logout"}
              >
                <h2>Logout</h2>
              </Menu.Item>
            </Menu.Menu>
          </React.Fragment>
        ) : (
          <Menu.Menu position="right">
            <div style={{ paddingRight: "30px" }}>
              <Menu.Item
                name="login"
                className="item"
                onClick={this.handleItemClick}
                position="right"
                active={this.state.activeItem === "login"}
              >
                <h2>Login</h2>
              </Menu.Item>
            </div>
          </Menu.Menu>
        )}
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})

export default withRouter(connect(mapStateToProps, null)(Navbar))
