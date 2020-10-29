const path = require('path');
const {
  validateCoordinates,
  validatePath,
  validateObjectSchema,
  configsSchema,
} = require('./validation');

describe('validation', () => {
  describe('validateCoordinates', () => {
    test('1 - validateCoordinates to be true', () => {
      const arrayToValidate = [
        ['+90.0', '-127.554334'],
        [45, 180],
        [-90, -180],
        [-90.0, -180.0],
        [47.1231231, 179.99999999],
      ];

      expect(validateCoordinates(arrayToValidate)).toBeTruthy();
    });

    test('2 - validateCoordinates to be false', () => {
      const arrayToValidate = [
        ['+90.0', '-127.554334'],
        [45, 180],
        [-91, 123.456],
        [-90.0, -180.0],
        [47.1231231, 179.99999999],
      ];

      expect(validateCoordinates(arrayToValidate)).toBeFalsy();
    });

    test('3 - validateCoordinates to be true', () => {
      const arrayToValidate = [['+90.0', '-127.554334']];

      expect(validateCoordinates(arrayToValidate)).toBeTruthy();
    });

    test('4 - validateCoordinates to be false', () => {
      const arrayToValidate = [];

      expect(validateCoordinates(arrayToValidate)).toBeFalsy();
    });

    test('5 - validateCoordinates to be false', () => {
      const arrayToValidate = [['', '']];

      expect(validateCoordinates(arrayToValidate)).toBeFalsy();
    });

    test('6 - validateCoordinates to be false', () => {
      const arrayToValidate = [['45', '']];

      expect(validateCoordinates(arrayToValidate)).toBeFalsy();
    });

    test('7 - validateCoordinates to be false', () => {
      const arrayToValidate = [[]];

      expect(validateCoordinates(arrayToValidate)).toBeFalsy();
    });
  });

  describe('validatePath', () => {
    test('1 - validatePath to be false', () => {
      expect(validatePath('./file_that_does_not_exists')).toBeFalsy();
    });

    test('2 - validatePath to be true', () => {
      expect(validatePath(path.join(process.cwd(), '/src'))).toBeTruthy();
    });
  });

  describe('validateObjectSchema', () => {
    test('1 - validateObjectSchema', () => {
      const object = {
        destinationCoordinates: {
          latitude: '53.339428',
          longitude: '-6.257664',
        },
        maxDistanceThreshold: 100,
        inputSource: 'assets/input/customers.txt',
        outputDestination: 'assets/output/customers.txt',
      };

      expect(validateObjectSchema(object, configsSchema)).toBeTruthy();
    });

    test('2 - validatePath to be false', () => {
      const object = {
        maxDistanceThreshold: 100,
        inputSource: 'assets/input/customers.txt',
        outputDestination: 'assets/output/customers.txt',
      };

      const output = validateObjectSchema(object, configsSchema);
      expect(output[0]).toStrictEqual(
        new Error('destinationCoordinates is invalid.'),
      );
    });

    test('3 - validatePath to have correct messages', () => {
      const object = {
        destinationCoordinates: {
          latitude: '53.339428',
          longitude: '-6.257664',
        },
      };

      const output = validateObjectSchema(object, configsSchema);

      expect(output[0]).toStrictEqual(
        new Error('maxDistanceThreshold is invalid.'),
      );
      expect(output[1]).toStrictEqual(new Error('inputSource is invalid.'));
      expect(output[2]).toStrictEqual(
        new Error('outputDestination is invalid.'),
      );
    });
  });
});
