import React from "react"
import { Grid, Table, Label, Checkbox, Icon } from "semantic-ui-react"
import MapContainer from "./MapContainer"
import { connect } from "react-redux"
import rules from "./helpers/rules"
import helpers from "./helpers/helpers"
import withAuth from "./hocs/withAuth"
import { withRouter } from "react-router-dom"
import api from "./services/api"
import * as actions from "./actions"

class Design extends React.Component {
  constructor() {
    super()
    this.state = { twoStories: false }
  }

  componentWillMount() {
    let propertyId = this.props.location.pathname.split("/")[2]
    api
      .getProperty(propertyId)
      .then(resp => resp.json())
      .then(json => {
        if (json.status === 404) {
          this.props.history.push("/404")
        } else {
          this.getData(propertyId)
          this.props.startLoading()
        }
      })
  }

  getData = id => {
    console.log("this is the id", id)
    this.props.setProperty("id", id)
    Promise.all([
      api.portland.query(id, "detail"),
      api.portland.query(id, "assessor"),
      api.portland.query(id, "latlong")
    ]).then(values => {
      console.log(values)
      this.props.setProperty("detail", values[0])
      console.log("this is the property", this.props.property)
      this.props.setProperty("assessor", values[1])
      this.props.setProperty("latlong", values[2])
      console.log("this is the property after loading", this.props)
      this.setMetrics(this.props.property.detail, this.props.property.assessor)
      const m = this.props.metrics
      const aduCoverage = this.props.adu.area
      this.setState({
        goodExistingCoverage: rules.goodExistingCoverage(
          aduCoverage,
          m.mainCoverage
        ),
        goodTotalCoverage: rules.goodTotalCoverage(
          m.zone,
          m.lotSize,
          m.totalCoverage + aduCoverage
        )
      })

      this.props.doneLoading()
    })
  }

  setMetrics = (d, a) => {
    let detachedCoverage = rules.detachedCoverage(a.improvements.details)
    let totalCoverage = rules.totalCoverage(a.improvements.details)
    let livingArea = rules.livingArea(a.improvements.details)
    let lotSize = a.general.total_land_area_sqft
    let propertyType = a.improvements.improvement_type
    let mainCoverage = rules.mainCoverage(a.improvements.details)
    let zone = d.zoning[0].code // iterate??

    let metrics = {
      zone,
      propertyType,
      lotSize,
      livingArea,
      detachedCoverage,
      totalCoverage,
      mainCoverage
    }

    this.props.setMetrics(metrics)
  }

  handleChange = () => {
    this.setState({
      twoStories: this.state.twoStories === false ? true : false
    })
  }

  render() {
    console.log("these are props", this.props)
    const m = this.props.metrics
    const aduCoverage = this.props.adu.area

    let shouldIRender = () => {
      if (m) {
        return true
      } else {
        return false
      }
    }

    let { formatNum } = helpers.format

    return (
      <div>
        {shouldIRender() ? (
          <Grid columns={2}>
            <Grid.Column>
              <MapContainer />
            </Grid.Column>
            <Grid.Column>
              <Checkbox
                toggle
                label="Two stories"
                checked={this.state.twoStories}
                onChange={this.handleChange}
              />

              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Metric</Table.HeaderCell>
                    <Table.HeaderCell>Allowed</Table.HeaderCell>
                    <Table.HeaderCell>Designed</Table.HeaderCell>
                    <Table.HeaderCell>OK?</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Primary Residence Coverage</Table.Cell>
                    <Table.Cell>{formatNum(m.mainCoverage)}</Table.Cell>
                    <Table.Cell>{formatNum(aduCoverage)}</Table.Cell>
                    <Table.Cell>
                      {this.state.goodExistingCoverage ? (
                        <Icon color="green" name="checkmark" />
                      ) : (
                        <Icon color="red" name="remove" />
                      )}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Total Lot Coverage</Table.Cell>
                    <Table.Cell>
                      {formatNum(
                        rules.allowableTotalCoverage(m.zone, m.lotSize)
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {formatNum(m.totalCoverage + aduCoverage)}
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.goodTotalCoverage ? (
                        <Icon color="green" name="checkmark" />
                      ) : (
                        <Icon color="red" name="remove" />
                      )}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Detached Structure Coverage</Table.Cell>
                    <Table.Cell>{formatNum(m.lotSize * 0.15)}</Table.Cell>
                    <Table.Cell>
                      {formatNum(m.detachedCoverage + aduCoverage)}
                    </Table.Cell>
                    <Table.Cell>
                      {m.detachedCoverage + aduCoverage < m.lotSize * 0.15 ? (
                        <Icon color="green" name="checkmark" />
                      ) : (
                        <Icon color="red" name="remove" />
                      )}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Living Area</Table.Cell>
                    <Table.Cell>
                      {formatNum(rules.maximumArea(m.livingArea))}
                    </Table.Cell>
                    <Table.Cell>
                      {formatNum(aduCoverage * (this.state.twoStories ? 2 : 1))}
                    </Table.Cell>
                    <Table.Cell>
                      {aduCoverage * (this.state.twoStories ? 2 : 1) <
                      rules.maximumArea(m.livingArea) ? (
                        <Icon color="green" name="checkmark" />
                      ) : (
                        <Icon color="red" name="remove" />
                      )}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

              <Table striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Line Item</Table.HeaderCell>
                    <Table.HeaderCell>Price Per Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Amount ($)</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Label ribbon>SDC Charge</Label>
                    </Table.Cell>
                    <Table.Cell>$15,000</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$15,000</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Foundation</Table.Cell>
                    <Table.Cell>$10,000</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$10,000</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Framing</Table.Cell>
                    <Table.Cell>$19,000</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$19,000</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Roofing</Table.Cell>
                    <Table.Cell>$7,500</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$7,500</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Plumbing</Table.Cell>
                    <Table.Cell>$12,000</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$12,000</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Electrical</Table.Cell>
                    <Table.Cell>$7,000</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$7,000</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>HVAC</Table.Cell>
                    <Table.Cell>$5,000</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$5,000</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Kitchen</Table.Cell>
                    <Table.Cell>$15,000</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$15,000</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Bathroom</Table.Cell>
                    <Table.Cell>$11,000</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$11,000</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Exterior</Table.Cell>
                    <Table.Cell>$15,000</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$15,000</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Paint</Table.Cell>
                    <Table.Cell>$1,200</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$1,200</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Architect</Table.Cell>
                    <Table.Cell>$8,000</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$8,000</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Engineering</Table.Cell>
                    <Table.Cell>$5,000</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$5,000</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Permits</Table.Cell>
                    <Table.Cell>$3,300</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$3,300</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Surveyor</Table.Cell>
                    <Table.Cell>$1,200</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$1,200</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Appliances</Table.Cell>
                    <Table.Cell>$4,000</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>$4,000</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Total</Table.Cell>
                    <Table.Cell> - </Table.Cell>
                    <Table.Cell> - </Table.Cell>
                    <Table.Cell>$$$</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  property: state.property,
  metrics: state.property.metrics,
  adu: state.adu
})

export default withRouter(withAuth(connect(mapStateToProps, actions)(Design)))
