const { validateLatitude, validateLongitude } = require('../utils');
/**
 * The expected destinationCoordinates schema file
 * @type {{latitude: (function(*=): boolean), longitude: (function(*=): boolean)}}
 */
const destinationCoordinatesSchema = {
  latitude: (value) => value && validateLatitude(value),
  longitude: (value) => value && validateLongitude(value),
};

module.exports = {
  destinationCoordinatesSchema,
};
