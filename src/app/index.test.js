const { init, main } = require('.');

const {
  writeListLineByLine,
  readListLineByLine,
  deleteFile,
} = require('./utils');

describe('app', () => {
  const srcPath = './testFolder/testFileIn.txt';
  const outPath = './testFolder/testFileOut.txt';

  describe('init', () => {
    test('1 - init', async () => {
      const obj = {
        destinationCoordinates: {
          latitude: '53.339428',
          longitude: '-6.257664',
        },
        maxDistanceThreshold: 320,
        inputSource: srcPath,
        outputDestination: outPath,
      };

      const data = [
        {
          latitude: '52.986375',
          user_id: 12,
          name: 'Christina McArdle',
          longitude: '-6.043701',
        },
        {
          latitude: '51.92893',
          user_id: 1,
          name: 'Alice Cahill',
          longitude: '-10.27699',
        },
        {
          latitude: '51.8856167',
          user_id: 2,
          name: 'Ian McArdle',
          longitude: '-10.4240951',
        },
      ];

      const expectedValue = [
        {
          name: 'Alice Cahill',
          user_id: 1,
        },
        {
          name: 'Christina McArdle',
          user_id: 12,
        },
      ];

      await writeListLineByLine(data, srcPath);

      expect(await init(obj)).toBeTruthy();

      await expect(readListLineByLine(outPath)).resolves.toStrictEqual(
        expectedValue,
      );

      await deleteFile(srcPath);
      await deleteFile(outPath);
    });
    test('2 - init', async () => {
      const obj = {
        destinationCoordinates: {
          latitude: '53.339428',
          longitude: '-6.257664',
        },
        maxDistanceThreshold: 320,
        inputSource: srcPath,
        outputDestination: outPath,
      };

      const data = [
        {
          latitude: '52.986375',
          user_id: 12,
          name: 'Christina McArdle',
          longitude: '-6.043701',
        },
        {
          latitude: '51.92893',
          user_id: 1,
          longitude: '-10.27699',
        },
        {
          latitude: '51.8856167',
          user_id: 2,
          name: 'Ian McArdle',
          longitude: '-10.4240951',
        },
      ];

      const expectedValue = [
        {
          name: 'Christina McArdle',
          user_id: 12,
        },
      ];

      await writeListLineByLine(data, srcPath);

      expect(await init(obj)).toBeTruthy();

      await expect(readListLineByLine(outPath)).resolves.toStrictEqual(
        expectedValue,
      );
      await deleteFile(srcPath);
      await deleteFile(outPath);
    });
    test('3 - init', async () => {
      const obj = {
        destinationCoordinates: {
          latitude: '53.339428',
        },
        maxDistanceThreshold: 320,
        inputSource: srcPath,
        outputDestination: outPath,
      };

      await expect(init(obj)).rejects.toThrowError();
    });
    test('4 - init', async () => {
      await expect(init()).rejects.toThrowError();
    });
  });

  describe('main', () => {
    const OLD_ARGV = process.argv;

    beforeEach(() => {
      jest.resetModules(); // most important - it clears the cache
      process.argv = { ...OLD_ARGV }; // make a copy
    });

    afterAll(() => {
      process.env = OLD_ARGV; // restore old env
    });

    test('1 - main', async () => {
      process.argv = ['--config=./configs/app.config.json'];

      // The mock function is called twice
      // eslint-disable-next-line global-require
      await expect(main()).resolves.toBe(undefined);
    });

    test('2 - main', async () => {
      process.argv = [''];

      // The mock function is called twice
      // eslint-disable-next-line global-require
      await expect(main()).resolves.toBe(undefined);
    });
  });
});
