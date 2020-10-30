const { validateCoordinates } = require('./validation');

const EARTH_RADIUS = 6371.009;
const PI_EQUIVALENT_IN_DEG = 180;

/**
 * This function converts a number from radian to degrees.
 * @param {string|number} deg | The radian number
 * @returns {number} | degrees equivalent to the radian parameter provided
 */
const deg2rad = (deg) => {
  if (+deg) {
    return deg * (Math.PI / PI_EQUIVALENT_IN_DEG);
  }

  throw new Error(
    `The value provided is not a valid latitude or longitude.\nThe incorrect value is: \n${deg}\n`,
  );
};

/**
 * Calculates the central angle between location A and location B using the great circle distance formula
 * https://en.wikipedia.org/wiki/Great-circle_distance
 * @param degLatA - latitude radian of location A
 * @param degLonA - latitude radian of location A
 * @param degLatB - latitude radian of location A
 * @param degLonB - latitude radian of location A
 * @returns {number} - the central angle between A and B
 */
const getCentralAngle = (degLatA, degLonA, degLatB, degLonB) => {
  // validate the coordinates
  const validCoords = validateCoordinates([
    [degLatA, degLonA],
    [degLatB, degLonB],
  ]);

  if (validCoords) {
    // convert coordinates to degrees
    const latA = deg2rad(degLatA);
    const lonA = deg2rad(degLonA);
    const latB = deg2rad(degLatB);
    const lonB = deg2rad(degLonB);

    return Math.acos(
      Math.sin(latA) * Math.sin(latB) +
        Math.cos(latA) * Math.cos(latB) * Math.cos(lonA - lonB),
    );
  }

  throw new Error(
    `The values provided are not valid latitude or longitude\nThe incorrect value is: \n${degLatA}, ${degLonA}, ${degLatB}, ${degLonB}\n`,
  );
};

/**
 * Calculates the distance between location A and location B using the great circle distance formula
 * https://en.wikipedia.org/wiki/Great-circle_distance
 * @param {string} latA - latitude of location A
 * @param {string} lonA - longitude of location A
 * @param {string} latB - latitude of location B
 * @param {string} lonB - longitude of location B
 * @returns {number} - The distance from A to B in km
 */
const getGreatCircleDistance = (latA, lonA, latB, lonB) =>
  EARTH_RADIUS * getCentralAngle(latA, lonA, latB, lonB);

module.exports = {
  EARTH_RADIUS,
  getCentralAngle,
  deg2rad,
  getGreatCircleDistance,
};
