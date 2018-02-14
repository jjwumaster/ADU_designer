const detachedStructures = ["DET GAR", "CARPORT", "SHED", "DET ROOM"]

const livingAreas = [
  "MAIN",
  "FIN ATTIC",
  "FIN BSMT",
  "FIN SECOND",
  "FIN THIRD",
  "FIN LOWER LEVEL"
]

const mainStructures = [
  "ATT GAR",
  "COV DECK",
  "COV PATIO",
  "ENC PATIO",
  "MAIN",
  "ENC STOR",
  "BREEZEWAY"
]

// ZONES: https://www.portlandoregon.gov/bps/34560
// sfr coverage: https://www.portlandoregon.gov/bds/article/92204
// mfr coverage: https://www.portlandoregon.gov/bds/article/92203
const zones = {
  RF: "sfr", // single family residential
  R20: "sfr",
  R10: "sfr",
  R7: "sfr",
  R5: "sfr",
  "R2.5": "sfr",
  R3: "mfr", // multifamily residential
  R2: "mfr",
  R1: "mfr",
  RH: "mfr",
  RX: "mfr",
  IR: "mfr",
  CN1: "com", // commercial
  CN2: "com",
  CO1: "com",
  CO2: "com",
  CM: "com",
  CS: "com",
  CG: "com",
  CX: "com",
  EX: "other" // central employment zone
}

const mfrZones = {
  R3: 0.45, // multifamily residential
  R2: 0.5,
  R1: 0.6,
  RH: 0.85,
  RX: 1.0,
  IR: 0.7
}

const sfrCoverage = lotSize => {
  if (lotSize < 3000) {
    return lotSize * 0.5
  } else if (lotSize < 5000) {
    return 1500 + 0.375 * (lotSize - 3000)
  } else if (lotSize < 20000) {
    return 2250 + 0.15 * (lotSize - 5000)
  } else {
    return 4500 + 0.075 * (lotSize - 20000)
  }
}

// ADUs are allowed on sites that are zoned Residential, Commercial, and in the Central Employment (EX) zone
const goodZone = zone => {
  return Object.keys(zones).includes(zone) ? true : false
}

// can be created accessory to a house (detached single family dwelling), an attached house (rowhouse) or a manufactured home
const allowedTypes = [
  "SINGLE FAMILY RESIDENTIAL",
  "ROW/ATTACHED HOUSING",
  "REAL PROP MFG'D HOME"
]

const goodType = propertyType => {
  return allowedTypes.includes(propertyType) ? true : false
}

// total lot coverage must meet zoning requirements
const goodTotalCoverage = (zone, lotSize, totalCoverage) => {
  return totalCoverage > allowableTotalCoverage(zone, lotSize) ? false : true
}

const allowableTotalCoverage = (zone, lotSize) => {
  switch (zones[zone]) {
    case "sfr":
      return sfrCoverage(lotSize)
    case "mfr":
      return mfrZones[zone] * lotSize
    case "com":
      return 0
    case "other":
      return 0
    default:
      return 0
  }
}

// combined detached accessory structures may not exceed 15% building coverage
const goodDetachedCoverage = (detachedTotal, lotSize) => {
  return detachedTotal > 0.15 * lotSize ? false : true
}

// ADU can be 75% of existing living area or 800 sq. ft., whichever is less
const maximumArea = livingArea => {
  return Math.min(0.75 * livingArea, 800)
}

const detachedCoverage = improvements => {
  let total = 0
  for (let improvement of improvements) {
    if (detachedStructures.includes(improvement.segment_type)) {
      total += improvement.area_sq_ft
    }
  }
  return total
}

const totalCoverage = improvements => {
  let total = 0
  for (let improvement of improvements) {
    if (
      detachedStructures.includes(improvement.segment_type) ||
      mainStructures.includes(improvement.segment_type)
    ) {
      total += improvement.area_sq_ft
    }
  }
  return total
}

const mainCoverage = improvements => {
  let total = 0
  for (let improvement of improvements) {
    if (improvement.segment_type === "MAIN") {
      total += improvement.area_sq_ft
    }
  }
  return total
}

const livingArea = improvements => {
  let total = 0
  for (let improvement of improvements) {
    if (livingAreas.includes(improvement.segment_type)) {
      total += improvement.area_sq_ft
    }
  }
  return total
}

// detached structure may not have more coverage than existing structure
const goodExistingCoverage = (aduCoverage, mainCoverage) =>
  aduCoverage < mainCoverage

export default {
  goodZone,
  goodType,
  goodTotalCoverage,
  goodDetachedCoverage,
  goodExistingCoverage,
  allowableTotalCoverage,
  totalCoverage,
  detachedCoverage,
  mainCoverage,
  maximumArea,
  livingArea
}
