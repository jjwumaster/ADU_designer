import React from "react"
import { withRouter, Link } from "react-router-dom"
import Searchbar from "./Searchbar"
import { connect } from "react-redux"
import { Menu, Icon } from "semantic-ui-react"
import * as actions from "./actions"
import LoadingBar from "./LoadingBar"

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: "home"
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.loggedIn) {
  //     this.setState({ loggedIn: true })
  //   }
  // }

  handleItemClick = (e, { name }) => {
    switch (name) {
      case "logout":
        this.props.logOut()
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
      <Menu
        pointing
        secondary
        style={{ paddingTop: "10px", margin: "0px", border: "0px" }}
      >
        <Link to="/">
          <Icon
            name="home"
            size="big"
            color="teal"
            style={{
              paddingTop: "15px",
              paddingBottom: "10px",
              paddingLeft: "20px"
            }}
          />
        </Link>
        <div
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "20px"
          }}
        >
          <Searchbar />
        </div>

        {!!this.props.currentUser ? (
          <React.Fragment>
            <Menu.Item style={{ paddingBottom: "22px" }}>
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

export default withRouter(connect(mapStateToProps, actions)(Navbar))
