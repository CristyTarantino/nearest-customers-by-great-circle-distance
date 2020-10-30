const chalk = require('chalk');
const {
  readListLineByLine,
  writeListLineByLine,
  readJSONFile,
} = require('./utils');
const {
  getCustomersDistFromDestination,
  getSelectedCustomersByDistance,
} = require('./customer');
const { checkConfig, readConfig } = require('./config');

/**
 * Initialises the app
 * @param configObject
 * @returns {Promise<string|Error>}
 */
const init = async (configObject) => {
  checkConfig(configObject);

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

/**
 * Core app function
 */
const main = async () => {
  process.stdout.write(
    `${new Date().toISOString()} -> The script is being started\n\n`,
  );

  process.on('uncaughtException', (error) => {
    process.stdout.write(
      `\n\n${new Date().toISOString()} -> The script has ended with an error: ${chalk.red(
        error.message,
      )}`,
    );
  });

  const configStringPath = readConfig(process.argv);

  try {
    const configString = await readJSONFile(configStringPath);
    const result = await init(configString);
    process.stdout.write(chalk.green(result));
  } catch (error) {
    process.stderr.write(chalk.red(error.message));
  } finally {
    process.stdout.write(
      `\n\n${new Date().toISOString()} -> The script has ended\n`,
    );
  }
};

module.exports = {
  init,
  main,
};
