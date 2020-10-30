const fs = require('fs');
const path = require('path');

/**
 * Deletes an empty dir
 * @param source - The source path to be removed if empty
 * @returns {Promise<string|Error>} Returns a rejected Promise if there are issues with deletion, resolved otherwise
 */
const deleteDirIfEmpty = (source) => {
  const sourcePath = path.dirname(source);

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line node/prefer-promises/fs
    fs.readdir(sourcePath, (error, files) => {
      if (error) {
        reject(error);
        return;
      }

      if (!files.length) {
        fs.rmdirSync(sourcePath, { recursive: true });
      }

      resolve();
    });
  });
};

/**
 * Deletes a file
 * @param source - The source file to be deleted
 * @returns {Promise<string|Error>} Returns a rejected Promise if there are issues with deletion, resolved otherwise
 */
const deleteFile = async (source) => {
  await new Promise((resolve, reject) => {
    // eslint-disable-next-line node/prefer-promises/fs
    fs.unlink(source, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

  return deleteDirIfEmpty(source);
};

/**
 * Creates a directory if it does not exists
 * @param source - The source path to be created
 * @returns {Promise<string|Error>} Returns a rejected Promise if there are issues with deletion, resolved otherwise
 */
const createDirIfNotPresent = (source) => {
  const sourcePath = path.dirname(source);

  return new Promise((resolve, reject) => {
    // mkdir is more efficient than fs.promise.mkdir
    // eslint-disable-next-line node/prefer-promises/fs
    fs.mkdir(sourcePath, { recursive: true }, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
};

/**
 * Writes data to the destination file specified
 * @param output - The data to be output onto the destination file
 * @param destination - The destination file to be created
 * @returns {Promise<string|Error>} Returns a rejected Promise if there are issues with writing, resolved otherwise
 */
const writeFile = async (output, destination) => {
  await createDirIfNotPresent(destination);

  return new Promise((resolve, reject) => {
    // readFile is more efficient fs.promise.writeFile
    // eslint-disable-next-line node/prefer-promises/fs
    fs.writeFile(
      destination,
      output,
      {
        encoding: 'utf8',
        flag: 'w',
      },
      (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(`You can find the result at ${destination}`);
      },
    );
  });
};

/**
 * Read a file from the source specified
 * @param source - The source file to read
 * @returns {Promise<string|Error>} Returns a rejected Promise if there are issues with reading, resolved otherwise
 */
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

/**
 * Validates that the string passed as parameter is an existing path
 * @param value - The string representing the path to validate
 * @returns {boolean} - true if the path exists, false otherwise
 */
const validatePath = (value) => {
  return fs.existsSync(value);
};

/**
 * Reads a JSON file from the path specified
 * @param configStringPath - path from which to read the config
 * @returns {Promise<object|Error>} Returns a config object or an error if the file in not in json format or the path is not valid
 */
const readJSONFile = async (configStringPath) => {
  const dirPath = path.join(process.cwd(), configStringPath);

  if (validatePath(dirPath)) {
    const configString = await readFile(dirPath);
    return JSON.parse(configString);
  }

  throw new Error(
    `Error: ENOENT: no such file or directory, open '${dirPath}'`,
  );
};

/**
 * Reads a file from the path specified and return an array of objects
 * @param inputSource - The path from which to read the list
 * @returns {Promise<any[]|Error>} - An array of objects or an Error
 * if the string for one of the lines is not a parsed to object
 */
const readListLineByLine = async (inputSource) => {
  const listString = await readFile(path.join(process.cwd(), inputSource));

  return listString.split('\n').map((text) => JSON.parse(text));
};

/**
 * Writes to a file path specified a list string object line by line
 * @param {[any]} list - The list of objects to write
 * @param outputDestination - The destination file
 * @returns {Promise<string|Error>} - Returns a rejected Promise if there are issues with writing, resolved otherwise
 */
const writeListLineByLine = async (list, outputDestination) => {
  if (list && Array.isArray(list) && list.length > 0) {
    const listString = list.map((text) => JSON.stringify(text)).join('\n');

    return writeFile(listString, path.join(process.cwd(), outputDestination));
  }

  throw new Error('The list provided is not a valid format');
};

module.exports = {
  readListLineByLine,
  writeListLineByLine,
  readJSONFile,
  validatePath,
  deleteFile,
  readFile,
  writeFile,
};
