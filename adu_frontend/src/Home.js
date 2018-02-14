import React from "react"
import { Icon, Container, Card, Grid } from "semantic-ui-react"
import { connect } from "react-redux"
import * as actions from "./actions"
import withAuth from "./hocs/withAuth"

class Home extends React.Component {
  render() {
    return (
      <Container>
        <h1>Portland Accessory Dwelling Units</h1>
        <h2>We rock the goat</h2>
        <h3>
          What's an ADU? Also known as a backyard cottage, grannie flat, or
          in-law apartment, Accessory Dwelling Units (ADUs) are secondary
          dwellings that can provide you with extra housing and income.
        </h3>
        <Grid columns="equal">
          <Grid.Column>
            <Card>
              <Card.Content>
                <Card.Header>
                  <Icon name="marker" size="huge" />
                </Card.Header>
                <Card.Description>
                  <h1>Find Your Home</h1>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <Card.Content>
                <Card.Header>
                  <Icon name="home" size="huge" />
                </Card.Header>
                <Card.Description>
                  <h1>Design Your ADU</h1>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <Card.Content>
                <Card.Header>
                  <Icon name="calculator" size="huge" />
                </Card.Header>
                <Card.Description>
                  <h1>Calculate Costs</h1>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default withAuth(connect(null, actions)(Home))
