const fs = require('fs');
const path = require('path');
const readline = require('readline');

const readFilesByLine = async (source) => {
  const inputStream = fs.createReadStream(source);
  const lineReader = readline.createInterface({
    input: inputStream,
  });

  const objectsList = [];

  await new Promise((resolve, reject) => {
    inputStream.on('end', () => {
      resolve();
      inputStream.close();
    });

    inputStream.on('error', () => {
      reject();
      inputStream.close();
    });

    lineReader.on('line', (line) => {
      objectsList.push(JSON.parse(line));
    });

    lineReader.on('error', () => {
      reject();
    });
  });

  return objectsList;
};

const writeFilesByLine = (output, destination) => {
  fs.promises.mkdir(path.dirname(destination), { recursive: true }).then(() => {
    const outputStream = fs.createWriteStream(destination, {
      flags: 'w+',
    });

    output.map((object) => {
      outputStream.write(`${JSON.stringify(object)}\n`);
      return true;
    });

    outputStream.end(); // close string
  });

  return new Promise((resolve, reject) => {
    // readFile is more efficient than fs.promise.mkdir
    // eslint-disable-next-line node/prefer-promises/fs
    fs.mkdir(path.dirname(destination), { recursive: true }, (error) => {
      if (error) {
        reject(error);
        return;
      }

      const outputStream = fs.createWriteStream(destination, {
        flags: 'w+',
      });

      output.map((object) => {
        outputStream.write(`${JSON.stringify(object)}\n`);
        return true;
      });

      outputStream.end(); // close string
      resolve(`You can find the result at ${destination}`);
    });
  });
};

const readFile = (source) => {
  return new Promise((resolve, reject) => {
    // readFile is more efficient fs.promise.readFile
    // eslint-disable-next-line node/prefer-promises/fs
    fs.readFile(source, 'utf8', (error, fileContent) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(fileContent);
    });
  });
};

module.exports = {
  readFilesByLine,
  writeFilesByLine,
  readFile,
};
