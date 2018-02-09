import React from "react"
import { Card, Icon } from "semantic-ui-react"
import { connect } from "react-redux"

export const Dashboard = props => {
  let toggle = false

  return (
    <Card.Group>
      <Card>
        <Card.Content>
          <Card.Header>Single Family Home</Card.Header>
        </Card.Content>
        <Card.Content extra>
          {toggle ? (
            <Icon color="green" name="checkmark" />
          ) : (
            <Icon color="red" name="remove" />
          )}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Card.Header>Detached Structure Coverage</Card.Header>
        </Card.Content>
        <Card.Content extra>
          {toggle ? (
            <Icon color="green" name="checkmark" />
          ) : (
            <Icon color="red" name="remove" />
          )}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Card.Header>Living Area</Card.Header>
        </Card.Content>
        <Card.Content extra>
          {toggle ? (
            <Icon color="green" name="checkmark" />
          ) : (
            <Icon color="red" name="remove" />
          )}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Card.Header>Total Lot Coverage</Card.Header>
        </Card.Content>
        <Card.Content extra>
          {toggle ? (
            <Icon color="green" name="checkmark" />
          ) : (
            <Icon color="red" name="remove" />
          )}
        </Card.Content>
      </Card>
    </Card.Group>
  )
}

const mapStateToProps = state => ({
  detail: state.property.detail,
  assessor: state.property.assessor
})

export default connect(mapStateToProps, null)(Dashboard)
