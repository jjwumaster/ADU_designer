import React from "react"
// import { Table } from "semantic-ui-react"
import helpers from "../helpers/helpers"

export default props => {
  let { a } = props

  let i = a.improvements

  return (
    <div>
      <h2>Improvements</h2>
      Type: {helpers.format.proper(i.improvement_type)}
      <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Sq Ft</th>
          </tr>
          {i.details.map((detail, i) => (
            <tr key={`detail-${i}`}>
              <td>{detail.segment_number}</td>
              <td>{detail.segment_type}</td>
              <td>{detail.area_sq_ft}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
