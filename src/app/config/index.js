const path = require('path');
const {
  validateNumber,
  validateObjectSchema,
  validatePath,
} = require('../utils');
const { destinationCoordinatesSchema } = require('../coordinates');

/**
 * The expected config schema file
 * @type {{destinationCoordinates: (function(*=): Error[]), maxDistanceThreshold: (function(*=): boolean), inputSource: (function(*=): boolean), outputDestination: (function(*=): *)}}
 */
const configsSchema = {
  destinationCoordinates: (value) =>
    typeof value === 'object' &&
    validateObjectSchema(value, destinationCoordinatesSchema),
  maxDistanceThreshold: (value) => validateNumber(value),
  inputSource: (value) =>
    typeof value === 'string' && validatePath(path.join(process.cwd(), value)),
  outputDestination: (value) => typeof value === 'string' && value.length > 0,
};

const checkConfigs = (configObject) => {
  const errors = validateObjectSchema(configObject, configsSchema);

  if (errors.length) {
    let errorMessage = '';

    errors.map((message) => {
      errorMessage += `${message}\n`;
      return true;
    });

    throw new Error(errorMessage);
  }
};

const readConfig = () =>
  process.argv
    .filter((a) => a.startsWith('--config='))
    .toString()
    .split('=')[1] || './config.json';

module.exports = {
  checkConfigs,
  readConfig,
};
