const {
  readFilesByLine,
  writeFilesByLine,
  getGreatCircleDistance
} = require('./utils');

const DUBLIN_OFFICE_COORDINATES = {
  latitude: '53.339428',
  longitude: '-6.257664',
}

const MAX_DISTANCE_THRESHOLD = 100;

/**
 *
 * @param customersList
 * @param distance
 * @return selectedCustomersByDistance
 */
const getSelectedCustomersByDistance = (customersList, distance) => {
  return customersList
    .filter(customer => customer.distance <= distance)
    .sort((a, b) => a.user_id - b.user_id)
    .map(customer => ({name: customer.name, user_id: customer.user_id}));
}

/**
 *
 * @param customersList
 * @param destinationCoordinates
 * @return customersListWithDistanceFromDestination
 */
const getCustomersListWithDistanceFromDestination = (customersList, destinationCoordinates) => {
  return customersList.map(customer => ({
    ...customer,
    distance: getGreatCircleDistance(
      destinationCoordinates.latitude,
      destinationCoordinates.longitude,
      customer.latitude,
      customer.longitude)
  }));
}

/**
 *
 */
const init = async () => {
  const customersList = await readFilesByLine('./input/customers.txt');
  const customersDistanceList = getCustomersListWithDistanceFromDestination(customersList, DUBLIN_OFFICE_COORDINATES);
  const selectedCustomers = getSelectedCustomersByDistance(customersDistanceList, MAX_DISTANCE_THRESHOLD);
  writeFilesByLine(selectedCustomers, './output/customers.txt');
}

module.exports = {
  init
};
