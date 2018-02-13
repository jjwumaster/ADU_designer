import React from "react"

export default props => {
  let { d } = props

  return (
    <div>
      {d.zoning.map((zoning, i) => (
        <p key={`zoning-${i}`}>
          <a href={`${zoning.link}`}>{zoning.code}</a>
          ({zoning.description})
        </p>
      ))}
    </div>
  )
}
