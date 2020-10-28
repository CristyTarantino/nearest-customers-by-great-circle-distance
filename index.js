const app = require('./app');

console.info(`${(new Date()).toISOString()} -> The script is being started`);

app.init()
  .then(() => console.info(`${(new Date()).toISOString()} -> The script has ended`));
