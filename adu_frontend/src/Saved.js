import React from "react"
import withAuth from "./hocs/withAuth"
import api from "./services/api"
import * as actions from "./actions"
import { connect } from "react-redux"
import { Card, Rating, Divider, Segment, Grid } from "semantic-ui-react"

class Saved extends React.Component {
  constructor() {
    super()
    this.state = {
      properties: []
    }
  }

  componentDidMount() {
    api
      .getUserProperties(this.props.currentUser.id)
      .then(resp => resp.json())
      .then(user => this.setState({ properties: user.properties }))
  }

  handleRate = property => {
    let portland_id = property.portland_id
    api
      .deleteProperty({
        portland_id,
        user_id: this.props.currentUser.id
      })
      .then(resp => resp.json())
      .then(deleted => {
        this.setState({
          properties: this.state.properties.filter(property => {
            return property.id !== deleted.id
          })
        })
      })
  }

  render() {
    return (
      <div>
        {this.state.properties.length > 0 ? null : (
          <div style={{ textAlign: "center" }}>
            <h1>You have nothing saved!</h1>
            <h1>¯\_(ツ)_/¯</h1>
            <br />
            <i>Maybe try searching for something?</i>
          </div>
        )}

        <Card.Group>
          {this.state.properties.map((property, i) => {
            return (
              <Card key={`property-${i}`}>
                <Card.Content>
                  <Card.Header>
                    <Grid columns={16}>
                      <Grid.Column width={3}>
                        <Rating
                          icon="heart"
                          size="huge"
                          onRate={() => this.handleRate(property)}
                          rating={1}
                        />{" "}
                      </Grid.Column>
                      <Grid.Column width={13}>{property.address}</Grid.Column>
                    </Grid>
                  </Card.Header>
                </Card.Content>
              </Card>
            )
          })}
        </Card.Group>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  property: state.property
})

export default withAuth(connect(mapStateToProps, actions)(Saved))
