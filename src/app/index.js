const path = require('path');
const {
  readFile,
  readFilesByLine,
  writeFilesByLine,
  getGreatCircleDistance,
} = require('./utils');
const {
  validateObjectSchema,
  configsSchema,
  validatePath,
} = require('./utils');

/**
 *
 * @param customersList
 * @param maxDistanceThreshold
 * @return {user_id: *, name: *}[]
 */
function getSelectedCustomersByDistance(customersList, maxDistanceThreshold) {
  return customersList
    .filter((customer) => customer.distance <= maxDistanceThreshold)
    .sort((a, b) => a.user_id - b.user_id)
    .map((customer) => ({ name: customer.name, user_id: customer.user_id }));
}

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
  return customersList.map((customer) => ({
    ...customer,
    distance: getGreatCircleDistance(
      destinationCoordinates.latitude,
      destinationCoordinates.longitude,
      customer.latitude,
      customer.longitude,
    ),
  }));
}

/**
 *
 */
async function init(configObject) {
  const {
    maxDistanceThreshold,
    inputSource,
    outputDestination,
    destinationCoordinates,
  } = configObject;

  const errors = validateObjectSchema(configObject, configsSchema);

  if (errors.length) {
    let errorMessage = '';

    errors.map((message) => {
      errorMessage += `${message}\n`;
      return true;
    });

    throw new Error(errorMessage);
  }

  const customersList = await readFilesByLine(
    path.join(process.cwd(), inputSource),
  );
  const customersDistanceList = getCustomersDistFromDestination(
    customersList,
    destinationCoordinates,
  );
  const selectedCustomers = getSelectedCustomersByDistance(
    customersDistanceList,
    maxDistanceThreshold,
  );
  return writeFilesByLine(
    selectedCustomers,
    path.join(process.cwd(), outputDestination),
  );
}

const readConfig = async (configStringPath) => {
  const dirPath = path.join(process.cwd(), configStringPath);

  if (validatePath(dirPath)) {
    const configString = await readFile(dirPath);
    return JSON.parse(configString);
  }

  throw new Error(
    `Error: ENOENT: no such file or directory, open '${dirPath}'`,
  );
};

module.exports = {
  init,
  readConfig,
};
