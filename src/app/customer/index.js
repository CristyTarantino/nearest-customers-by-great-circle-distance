const chalk = require('chalk');
const {
  getGreatCircleDistance,
  validateArray,
  validateNumber,
  validateLatitude,
  validateLongitude,
  validateObjectSchema,
} = require('../utils');

const customerSchema = {
  name: (value) => value && value.length > 0,
  user_id: (value) => parseInt(value, 10) === Number(value),
  latitude: (value) => value && validateLatitude(value),
  longitude: (value) => value && validateLongitude(value),
};

/**
 *
 * @param {[]} customersList
 * @param {{latitude: string, longitude: string}} destinationCoordinates
 * @return {distance: *}[]
 */
function getCustomersDistFromDestination(
  customersList,
  destinationCoordinates,
) {
  if (validateArray(customersList)) {
    return customersList.map((customer) => {
      const errors = validateObjectSchema(customer, customerSchema);

      if (errors.length) {
        let errorMessage = `Errors with customer object:\n ${JSON.stringify(
          customer,
        )} \n`;

        errors.map((message) => {
          errorMessage += `${message}\n`;
          return true;
        });

        process.stderr.write(chalk.red(errorMessage));
        return true;
      }

      return {
        ...customer,
        distance: getGreatCircleDistance(
          destinationCoordinates.latitude,
          destinationCoordinates.longitude,
          customer.latitude,
          customer.longitude,
        ),
      };
    });
  }

  throw new Error('The list of customers provided is not a valid format');
}

/**
 *
 * @param customersList
 * @param maxDistanceThreshold
 * @return {user_id: *, name: *}[]
 */
function getSelectedCustomersByDistance(customersList, maxDistanceThreshold) {
  if (validateArray(customersList) && validateNumber(maxDistanceThreshold)) {
    return customersList
      .filter((customer) => customer.distance <= maxDistanceThreshold)
      .sort((a, b) => a.user_id - b.user_id)
      .map((customer) => ({ name: customer.name, user_id: customer.user_id }));
  }

  throw new Error('The list of customers provided is not a valid format');
}

module.exports = {
  getSelectedCustomersByDistance,
  getCustomersDistFromDestination,
};
