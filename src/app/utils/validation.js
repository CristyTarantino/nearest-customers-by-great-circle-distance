const fs = require('fs');
const path = require('path');

const latRegex = /(^[-+]?(?:[1-8]?\d(?:\.\d+)?|90(?:\.0+)?))$/;
const longRegex = /(^[-+]?(?:180(?:\.0+)?|(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d+)?))$/;

/**
 * Validates that the latitude is a number between -90 and 90.
 * @param {string|number} value - the latitude to validate
 * @returns {boolean} - true if the value provided is a valid latitude, false otherwise
 */
const validateLatitude = (value) => latRegex.test(value);

/**
 * Validates that the longitude is a number between -180 and 180.
 * @param value {string|number} value - the longitude to validate
 * @returns {boolean} - true if the value provided is a valid longitude, false otherwise
 */
const validateLongitude = (value) => longRegex.test(value);

/**
 * Validates that the array of arrays of coordinates are valid latitude and longitude coordinates
 * @param listOfCoordinates array of arrays of coordinates to be validated
 * @returns {boolean} true if all the coordinates are correct, false if any of the lat or long are not valid
 */
const validateCoordinates = (listOfCoordinates) => {
  if (listOfCoordinates.length) {
    return !listOfCoordinates.some(
      (coords) => !validateLatitude(coords[0]) || !validateLongitude(coords[1]),
    );
  }

  return false;
};

/**
 * Validates that the string passed as parameter is an existing path
 * @param value - The string representing the path to validate
 * @returns {boolean} - true if the path exists, false otherwise
 */
const validatePath = (value) => {
  return fs.existsSync(value);
};

/**
 * Validates the schema against the object provided
 * @param object - the object to validate
 * @param schema - the schema to validate the object with
 * @returns {Error[]} - An object with the list errors related to the invalid keys
 */
const validateObjectSchema = (object, schema) =>
  Object.keys(schema)
    .filter((key) => !schema[key](object[key]))
    .map((key) => new Error(`${key} is invalid.`));

/**
 * The expected destinationCoordinates schema file
 * @type {{latitude: (function(*=): boolean), longitude: (function(*=): boolean)}}
 */
const destinationCoordinatesSchema = {
  latitude: (value) => value && validateLatitude(value),
  longitude: (value) => value && validateLongitude(value),
};

/**
 * The expected config schema file
 * @type {{destinationCoordinates: (function(*=): Error[]), maxDistanceThreshold: (function(*=): boolean), inputSource: (function(*=): boolean), outputDestination: (function(*=): *)}}
 */
const configsSchema = {
  destinationCoordinates: (value) =>
    typeof value === 'object' &&
    validateObjectSchema(value, destinationCoordinatesSchema),
  maxDistanceThreshold: (value) => +value === Number(value),
  inputSource: (value) =>
    typeof value === 'string' && validatePath(path.join(process.cwd(), value)),
  outputDestination: (value) => typeof value === 'string' && value.length > 0,
};

module.exports = {
  validateObjectSchema,
  configsSchema,
  validatePath,
  validateLatitude,
  validateLongitude,
  validateCoordinates,
};
