const chalk = require('chalk');
const app = require('./app');

const configStringPath =
  process.argv
    .filter((a) => a.startsWith('--config='))
    .toString()
    .split('=')[1] || './config.json';

process.stdout.write(
  `${new Date().toISOString()} -> The script is being started\n\n`,
);

app
  .readConfig(configStringPath)
  .then(async (configString) => {
    const result = await app.init(configString);
    process.stdout.write(chalk.green(result));
  })
  .catch((error) => {
    process.stderr.write(chalk.red(error.message));
  })
  .finally(() => {
    process.stdout.write(
      `\n\n${new Date().toISOString()} -> The script has ended\n`,
    );
  });

process.on('uncaughtException', (error) => {
  process.stdout.write(
    `\n\n${new Date().toISOString()} -> The script has ended with an error: ${chalk.red(
      error.message,
    )}`,
  );
});
