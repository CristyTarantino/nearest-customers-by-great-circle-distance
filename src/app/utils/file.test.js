const {
  readListLineByLine,
  writeListLineByLine,
  readFile,
  writeFile,
  deleteFile,
  validatePath,
  readJSONFile,
} = require('./file');

describe('file', () => {
  const dirPath = './testFolder/testFile.txt';
  const badDirPath = './it_does_not_exist/it_does_not_exist.txt';
  const data = 'This is a file containing a one line string.';

  afterAll(async () => {
    await deleteFile(dirPath);
  });

  describe('readFile', () => {
    beforeEach(async () => {
      await writeFile(data, dirPath);
    });

    afterEach(async () => {
      await deleteFile(dirPath);
    });

    test('1 - readFile', async () => {
      await expect(readFile(dirPath)).resolves.toBe(
        'This is a file containing a one line string.',
      );
    });

    test('2 - readFile', async () => {
      await expect(readFile(badDirPath)).rejects.toThrowError();
    });

    test('3 - readFile', async () => {
      await expect(readFile()).rejects.toThrowError();
    });
  });

  describe('writeFile', () => {
    describe('1 - writeFile', () => {
      test('writeFile', async () => {
        await expect(writeFile(data, dirPath)).resolves.toBe(
          'You can find the result at ./testFolder/testFile.txt',
        );

        await expect(readFile(dirPath)).resolves.toBe(
          'This is a file containing a one line string.',
        );

        await deleteFile(dirPath);
      });
    });

    test('2 - writeFile', async () => {
      await expect(writeFile(badDirPath)).rejects.toThrowError();
    });

    test('3 - writeFile', async () => {
      await expect(writeFile(badDirPath)).rejects.toThrowError();
    });
  });

  describe('deleteFile', () => {
    test('1 - deleteFile', async () => {
      await writeFile(data, dirPath);
      await expect(deleteFile(dirPath)).resolves.toBe();
      expect(validatePath(dirPath)).toBeFalsy();
    });

    test('2 - deleteFile', async () => {
      await expect(deleteFile(badDirPath)).rejects.toThrowError();
    });

    test('3 - deleteFile', async () => {
      await expect(deleteFile()).rejects.toThrowError();
    });
  });

  describe('validatePath', () => {
    beforeEach(async () => {
      await writeFile(data, dirPath);
    });

    afterEach(async () => {
      await deleteFile(dirPath);
    });

    test('1 - validatePath to be false', () => {
      expect(validatePath(badDirPath)).toBeFalsy();
    });

    test('2 - validatePath to be true', () => {
      expect(validatePath(dirPath)).toBeTruthy();
    });

    test('3 - validatePath to be true', () => {
      expect(validatePath()).toBeFalsy();
    });
  });

  describe('readJSONFile', () => {
    test('1 - validatePath to be false', async () => {
      await writeFile(data, dirPath);
      await expect(readJSONFile(dirPath)).rejects.toThrowError();
      await deleteFile(dirPath);
    });

    test('2 - validatePath to be true', async () => {
      const obj = {
        firstProp: 'firstProp',
        secondProp: 'secondProp',
      };

      await writeFile(JSON.stringify(obj), './testFolder/text.json');
      expect(await readJSONFile('./testFolder/text.json')).toStrictEqual(obj);
      await deleteFile('./testFolder/text.json');
    });

    test('3 - validatePath to be false', async () => {
      await expect(readJSONFile(badDirPath)).rejects.toThrowError();
    });

    test('4 - validatePath to be false', async () => {
      await expect(readJSONFile()).rejects.toThrowError();
    });
  });

  describe('readListLineByLine and writeListLineByLine', () => {
    test('1 - writeListLineByLine', async () => {
      const obj = [
        {
          firstProp: 'firstProp',
          secondProp: 'secondProp',
        },
        {
          firstProp: 'firstProp',
          secondProp: 'secondProp',
        },
      ];

      await expect(writeListLineByLine(obj, dirPath)).resolves.toStrictEqual(
        expect.any(String),
      );

      await expect(readListLineByLine(dirPath)).resolves.toStrictEqual(obj);

      await deleteFile(dirPath);
    });

    test('2 - writeListLineByLine', async () => {
      const obj = [
        ['hello', 'ciao'],
        ['goodbye', 'arrivederci'],
      ];

      await expect(writeListLineByLine(obj, dirPath)).resolves.toStrictEqual(
        expect.any(String),
      );

      await expect(readListLineByLine(dirPath)).resolves.toStrictEqual(obj);

      await deleteFile(dirPath);
    });

    test('3 - writeListLineByLine', async () => {
      const obj = 'dfsgfdsgfd';

      await expect(writeListLineByLine(obj, dirPath)).rejects.toThrowError();
    });

    test('4 - writeListLineByLine', async () => {
      const obj = [1, 2, 3];

      await expect(writeListLineByLine(obj, dirPath)).resolves.toStrictEqual(
        expect.any(String),
      );

      await expect(readListLineByLine(dirPath)).resolves.toStrictEqual(obj);

      await deleteFile(dirPath);
    });

    test('5 - writeListLineByLine', async () => {
      await expect(writeListLineByLine([1, 2, 3])).rejects.toThrowError();
    });

    test('6 - readListLineByLine', async () => {
      await expect(readListLineByLine()).rejects.toThrowError();
    });
  });
});
