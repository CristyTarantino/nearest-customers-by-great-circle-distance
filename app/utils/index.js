const {
  EARTH_RADIUS,
  getCentralAngle,
  deg2rad,
  getGreatCircleDistance } = require('./formula');

const { readFilesByLine, writeFilesByLine } = require('./file');

module.exports = {
  readFilesByLine,
  writeFilesByLine,
  EARTH_RADIUS,
  getCentralAngle,
  deg2rad,
  getGreatCircleDistance
}
