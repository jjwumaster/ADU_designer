const proper = str => {
  let dir = [
    "NE",
    "SE",
    "NW",
    "SW",
    "AK",
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "GU",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY"
  ]

  return str.replace(/\w\S*/g, function(txt) {
    return dir.includes(txt)
      ? txt
      : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

const formatNum = num => {
  return Intl.NumberFormat("en-USA").format(Math.round(num))
}

const ownerParse = str => {
  let owners = str.split("&")
  return owners.map(owner => {
    let fullNameBackwards = owner.split(",")
    return fullNameBackwards.map(name => {
      return proper(name)
    })
  })
}

const convertArea = (area, toType) => {
  switch (toType) {
    case "acres":
      return area * (1 / 4046.86)
    case "sq ft":
      return area * 10.7639
    default:
      return area
  }
}

export default {
  format: {
    proper,
    formatNum,
    ownerParse
  },
  convertArea
}
