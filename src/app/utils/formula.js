const { validateCoordinates } = require('./validation');

const EARTH_RADIUS = 6371.009;
const PI_EQUIVALENT_IN_DEG = 180;

/**
 * This function converts number from radian to degrees.
 * @param {string|number} deg | The radian number
 * @returns {number} | degrees equivalent to the radian parameter provided
 */
const deg2rad = (deg) => {
  if (+deg) {
    return deg * (Math.PI / PI_EQUIVALENT_IN_DEG);
  }

  throw new Error('The value provided is not a valid latitude or longitude');
};

// first formula from https://en.wikipedia.org/wiki/Great-circle_distance
// degrees args
const getCentralAngle = (degLatA, degLonA, degLatB, degLonB) => {
  const validCoords = validateCoordinates([
    [degLatA, degLonA],
    [degLatB, degLonB],
  ]);

  if (validCoords) {
    const latA = deg2rad(degLatA);
    const lonA = deg2rad(degLonA);
    const latB = deg2rad(degLatB);
    const lonB = deg2rad(degLonB);

    return Math.acos(
      Math.sin(latA) * Math.sin(latB) +
        Math.cos(latA) * Math.cos(latB) * Math.cos(lonA - lonB),
    );
  }

  throw new Error('The values provided are not valid latitude or longitude');
};

const getGreatCircleDistance = (latA, lonA, latB, lonB) =>
  EARTH_RADIUS * getCentralAngle(latA, lonA, latB, lonB);

module.exports = {
  EARTH_RADIUS,
  getCentralAngle,
  deg2rad,
  getGreatCircleDistance,
};
