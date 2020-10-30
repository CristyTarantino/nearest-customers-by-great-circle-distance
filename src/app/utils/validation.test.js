const {
  validateCoordinates,
  validateObjectSchema,
  validateArray,
  validateNumber,
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

  describe('validateObjectSchema', () => {
    const schema = {
      name: (value) => /^([A-Z][a-z\-]* )+[A-Z][a-z\-]*( \w+\.?)?$/.test(value),
      age: (value) => parseInt(value, 10) === Number(value) && value >= 18,
      phone: (value) => /^(\+?\d{1,2}-)?\d{3}-\d{3}-\d{4}$/.test(value),
    };

    test('1 - validateObjectSchema', () => {
      const object = {
        name: 'John Doe',
        age: '',
        phone: '123-456-7890',
      };

      expect(validateObjectSchema(object, schema)).toBeTruthy();
    });

    test('2 - validatePath to be false', () => {
      const object = {
        age: '',
        phone: '123-456-7890',
      };

      const output = validateObjectSchema(object, schema);
      expect(output[0]).toStrictEqual(new Error('name is invalid.'));
    });

    test('3 - validatePath to have correct messages', () => {
      const object = {};

      const output = validateObjectSchema(object, schema);

      expect(output[0]).toStrictEqual(new Error('name is invalid.'));
      expect(output[1]).toStrictEqual(new Error('age is invalid.'));
      expect(output[2]).toStrictEqual(new Error('phone is invalid.'));
    });
  });

  describe('validateArray', () => {
    test('1 - validateArray', () => {
      expect(validateArray('asdasdas')).toBeFalsy();
    });
    test('2 - validateArray', () => {
      expect(validateArray()).toBeFalsy();
    });
    test('3 - validateArray', () => {
      expect(validateArray('')).toBeFalsy();
    });
    test('4 - validateArray', () => {
      expect(validateArray([])).toBeFalsy();
    });
  });

  describe('validateNumber', () => {
    test('1 - validateNumber', () => {
      expect(validateNumber('asdasdas')).toBeFalsy();
    });
    test('2 - validateNumber', () => {
      expect(validateNumber()).toBeFalsy();
    });
    test('3 - validateNumber', () => {
      expect(validateNumber('')).toBeFalsy();
    });
    test('4 - validateNumber', () => {
      expect(validateNumber('9.20')).toBeTruthy();
    });
  });
});
