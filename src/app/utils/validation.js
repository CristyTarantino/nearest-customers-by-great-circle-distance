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
 * Validate that a list is valid and has elements
 * @param list - The array to validate
 * @returns {*|arg is any[]|boolean} - true if valid array, false otherwise
 */
const validateArray = (list) => list && Array.isArray(list) && list.length > 0;

/**
 * Validate that a string or number are valid and greater than 0
 * @param {number|string} number The number to validate
 * @returns {boolean} - true if valid number, false otherwise
 */
const validateNumber = (number) => +number === Number(number) && +number > 0;

module.exports = {
  validateNumber,
  validateArray,
  validateObjectSchema,
  validateLatitude,
  validateLongitude,
  validateCoordinates,
};
