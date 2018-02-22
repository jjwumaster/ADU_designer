import React from "react"
import { Icon, Container, Card, Grid } from "semantic-ui-react"
import { connect } from "react-redux"
import * as actions from "./actions"
import withAuth from "./hocs/withAuth"

class Home extends React.Component {
  render() {
    return (
      <Container>
        <h1 style={{ textAlign: "left" }}>
          Portland's Accessory Dwelling Unit Planner
        </h1>

        <br />
        <Grid columns={3}>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Card.Header textAlign="center">
                  <Icon name="marker" size="huge" />
                </Card.Header>
                <Card.Description>
                  <h1 style={{ textAlign: "center" }}>Find Your Home</h1>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <Card.Content>
                <Card.Header textAlign="center">
                  <Icon name="home" size="huge" />
                </Card.Header>
                <Card.Description>
                  <h1 style={{ textAlign: "center" }}>Design Your ADU</h1>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <Card.Content>
                <Card.Header textAlign="center">
                  <Icon name="calculator" size="huge" />
                </Card.Header>
                <Card.Description>
                  <h1 style={{ textAlign: "center" }}>Calculate Costs</h1>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>

        <br />
        <h2 style={{ textAlign: "left" }}>What's an ADU?</h2>
        <p>
          Also known as a backyard cottage, grannie flat, or in-law apartment,
          Accessory Dwelling Units (ADUs) are secondary dwellings that can
          provide you with extra housing and income.
        </p>
      </Container>
    )
  }
}

export default withAuth(connect(null, actions)(Home))
