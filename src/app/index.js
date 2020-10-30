const { readListLineByLine, writeListLineByLine } = require('./utils');
const {
  getCustomersDistFromDestination,
  getSelectedCustomersByDistance,
} = require('./customer');
const { checkConfigs } = require('./config');

const init = async (configObject) => {
  checkConfigs(configObject);

  const {
    maxDistanceThreshold,
    inputSource,
    outputDestination,
    destinationCoordinates,
  } = configObject;

  const customersList = await readListLineByLine(inputSource);

  const customersDistanceList = getCustomersDistFromDestination(
    customersList,
    destinationCoordinates,
  );

  const selectedCustomers = getSelectedCustomersByDistance(
    customersDistanceList,
    maxDistanceThreshold,
  );

  return writeListLineByLine(selectedCustomers, outputDestination);
};

module.exports = {
  init,
};
