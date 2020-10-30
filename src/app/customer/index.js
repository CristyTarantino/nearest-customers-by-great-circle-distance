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
 * For each customer in the provided list adds a property representing their distance
 * from the designed destination coordinates
 * @param []<{name: string, user_id: number, latitude: {string|number} longitude: {string|number}> customersList -
 * The list of customer objects
 * @param {{latitude: string, longitude: string}} destinationCoordinates - The destination coordinates
 * @return []<{name: string, user_id: number, latitude: {string|number} longitude: {string|number}, distance: number> | Error -
 * The customer object with distance property
 */
function getCustomersDistFromDestination(
  customersList,
  destinationCoordinates,
) {
  if (validateArray(customersList)) {
    return customersList
      .map((customer) => {
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
          return false;
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
      })
      .filter((c) => c !== false);
  }

  throw new Error('The list of customers provided is not a valid format');
}

/**
 * Filters the customer list provided by the distance provided,
 * sorts them by user_id and returns only name and id per each customer
 * @param customersList - The original customer list
 * @param maxDistanceThreshold - the threshold to filter by
 * @return []<{user_id: number, name: string}> | Error - The list of customers user_ids and names,
 * filtered by distances, sorted by user_id
 */
function getSelectedCustomersByDistance(customersList, maxDistanceThreshold) {
  if (validateArray(customersList) && validateNumber(maxDistanceThreshold)) {
    return customersList
      .filter((customer) => customer.distance <= maxDistanceThreshold)
      .sort((a, b) => a.user_id - b.user_id)
      .map((customer) => ({ name: customer.name, user_id: customer.user_id }));
  }

  throw new Error(
    'The list of customers and/or the distance provided are not in a valid format',
  );
}

module.exports = {
  getSelectedCustomersByDistance,
  getCustomersDistFromDestination,
};
