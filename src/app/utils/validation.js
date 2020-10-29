const fs = require('fs');
const path = require('path');

const latRegex = /(^[-+]?(?:[1-8]?\d(?:\.\d+)?|90(?:\.0+)?))$/;
const longRegex = /(^[-+]?(?:180(?:\.0+)?|(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d+)?))$/;

/**
 * The latitude must be a number between -90 and 90
 * @param value
 * @returns {boolean}
 */
const validateLatitude = (value) => latRegex.test(value);

/**
 * The longitude must be a number between -180 and 180.
 * @param value
 * @returns {boolean}
 */
const validateLongitude = (value) => longRegex.test(value);

const validateCoordinates = (listOfCoordinates) => {
  return !listOfCoordinates.any(
    (coords) => !validateLatitude(coords[0]) || !validateLongitude(coords[1]),
  );
};

const validatePath = (value) => {
  return fs.existsSync(value);
};

const validateObjectSchema = (object, schema) =>
  Object.keys(schema)
    .filter((key) => !schema[key](object[key]))
    .map((key) => new Error(`${key} is invalid.`));

const destinationCoordinatesSchema = {
  latitude: (value) => validateLatitude(value),
  longitude: (value) => validateLongitude(value),
};

const configsSchema = {
  destinationCoordinates: (value) =>
    validateObjectSchema(value, destinationCoordinatesSchema),
  maxDistanceThreshold: (value) => +value === Number(value),
  inputSource: (value) => validatePath(path.join(process.cwd(), value)),
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
