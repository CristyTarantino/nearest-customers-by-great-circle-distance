const fs = require('fs');
const path = require('path');
const readline = require('readline');

const readFilesByLine = async (source) => {
  const inputStream = fs.createReadStream(source);
  const lineReader = readline.createInterface({
    input: inputStream
  });

  let objectsList = [];

  await new Promise((resolve, reject) => {
    inputStream.on('end', () => {
      resolve();
      inputStream.close();
    });

    lineReader.on('line', (line) => {
      objectsList.push(JSON.parse(line));
    });
  });

  return objectsList;
}

const writeFilesByLine = (output, destination) => {
  fs.promises.mkdir(path.dirname(destination), {recursive: true})
    .then(() => {
      const outputStream = fs.createWriteStream(destination, {
        flags: 'w+'
      });

      for (let object of output) {
        outputStream.write(JSON.stringify(object) + '\n');
      }

      outputStream.end() // close string
    });
}

module.exports = {
  readFilesByLine,
  writeFilesByLine
}
