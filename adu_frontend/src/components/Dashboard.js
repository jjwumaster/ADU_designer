import React from "react"
import { Card, Icon, Grid, Divider } from "semantic-ui-react"
import { connect } from "react-redux"
import * as actions from "../actions"
import rules from "../helpers/rules"

export const Dashboard = props => {
  let {
    zone,
    propertyType,
    lotSize,
    livingArea,
    detachedCoverage,
    totalCoverage
  } = props.metrics

  let goodZone = rules.goodZone(zone)
  let goodType = rules.goodType(propertyType)
  let goodDetachedCoverage = rules.goodDetachedCoverage(detachedCoverage)
  let goodTotalCoverage = rules.goodTotalCoverage(totalCoverage)
  let goodExistingCoverage = true // rules.goodExistingCoverage() // need to fix
  let livingAreaAllowed = rules.maximumArea(livingArea)

  return (
    <Grid>
      <Grid.Column width={8}>
        <Card>
          <Card.Content>
            <Card.Header>Zone</Card.Header>
            <Divider />
            <Card.Description>
              "ADUs are allowed on sites that are zoned Residential, Commercial,
              and in the Central Employment (EX) zone."
              <br />
              Accessory Dwelling Units{" "}
              <a href="https://www.portlandoregon.gov/bds/index.cfm?a=68689">
                Section IV.A.1
              </a>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {goodZone ? (
              <Icon color="green" name="checkmark" />
            ) : (
              <Icon color="red" name="remove" />
            )}
          </Card.Content>
        </Card>
      </Grid.Column>

      <Grid.Column width={8}>
        <Card>
          <Card.Content>
            <Card.Header>Structure Type</Card.Header>
            <Divider />
            <Card.Description>
              "[ADUs] can be created accessory to a house, an attached house
              (rowhouse) or a manufactured home. ADUs are not allowed with other
              development types (eg duplexes) and only one ADU is allowed per
              site."
              <br />
              Accessory Dwelling Units{" "}
              <a href="https://www.portlandoregon.gov/bds/index.cfm?a=68689">
                Section IV.A.1
              </a>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {goodType ? (
              <Icon color="green" name="checkmark" />
            ) : (
              <Icon color="red" name="remove" />
            )}
          </Card.Content>
        </Card>
      </Grid.Column>

      <Grid.Column width={8}>
        <Card>
          <Card.Content>
            <Card.Header>Living Area</Card.Header>
            <Divider />
            <Card.Description>
              "ADU can be 75% of existing living area or 800 sq. ft., whichever
              is less."
              <br />
              Accessory Dwelling Units{" "}
              <a href="https://www.portlandoregon.gov/bds/index.cfm?a=68689">
                Section IV.B.1
              </a>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon color="yellow" name="warning" />
          </Card.Content>
        </Card>
      </Grid.Column>

      <Grid.Column width={8}>
        <Card>
          <Card.Content>
            <Card.Header>Primary Residence Coverage</Card.Header>
            <Divider />
            <Card.Description>
              "Building coverage of an accessory building cannot be larger than
              building coverage of primary residence." Detached Covered
              Accessory Structures Worksheet{" "}
              <a href="https://www.portlandoregon.gov/bds/article/648618">
                Step 1.1
              </a>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {goodExistingCoverage ? (
              <Icon color="green" name="checkmark" />
            ) : (
              <Icon color="red" name="remove" />
            )}
          </Card.Content>
        </Card>
      </Grid.Column>

      <Grid.Column width={8}>
        <Card>
          <Card.Content>
            <Card.Header>Detached Structure Coverage</Card.Header>
            <Divider />
            <Card.Description>
              "Combined detached accessory structures may not exceed 15%
              building coverage."
              <br />
              Detached Covered Accessory Structures Worksheet{" "}
              <a href="https://www.portlandoregon.gov/bds/article/648618">
                Step 1.2
              </a>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {goodDetachedCoverage ? (
              <Icon color="green" name="checkmark" />
            ) : (
              <Icon color="red" name="remove" />
            )}
          </Card.Content>
        </Card>
      </Grid.Column>

      <Grid.Column width={8}>
        <Card>
          <Card.Content>
            <Card.Header>Total Lot Coverage</Card.Header>
            <Divider />
            "Total building coverage cannot exceed what is allowed on the site."
            <br />
            Detached Covered Accessory Structures Worksheet{" "}
            <a href="https://www.portlandoregon.gov/bds/article/648618">
              Step 1.3
            </a>
          </Card.Content>
          <Card.Content extra>
            {goodTotalCoverage ? (
              <Icon color="green" name="checkmark" />
            ) : (
              <Icon color="red" name="remove" />
            )}
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  )
}

const mapStateToProps = state => ({
  detail: state.property.detail,
  assessor: state.property.assessor,
  metrics: state.property.metrics
})

export default connect(mapStateToProps, actions)(Dashboard)
