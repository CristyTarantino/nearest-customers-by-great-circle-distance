const { readConfig, checkConfig } = require('.');

describe('config', () => {
  describe('checkConfig', () => {
    test('1 - checkConfig', () => {
      const configObj = {
        destinationCoordinates: {
          latitude: '53.339428',
          longitude: '-6.257664',
        },
        maxDistanceThreshold: 100,
        inputSource: 'assets/input/customers.txt',
        outputDestination: 'assets/output/customers.txt',
      };

      expect(checkConfig(configObj)).toBeTruthy();
    });
    test('2 - readConfig', () => {
      expect(() => checkConfig(['dsfdsfds'])).toThrowError(
        `Error: destinationCoordinates is invalid.\nError: maxDistanceThreshold is invalid.\nError: inputSource is invalid.\nError: outputDestination is invalid.`,
      );
    });
    test('3 - readConfig', () => {
      expect(() => checkConfig()).toThrowError(
        `Error: destinationCoordinates is invalid.\nError: maxDistanceThreshold is invalid.\nError: inputSource is invalid.\nError: outputDestination is invalid.`,
      );
    });
  });

  describe('readConfig', () => {
    test('1 - readConfig', () => {
      const jestConfig = ['a', "--config='./configs/app.config.json'"];

      expect(readConfig(jestConfig)).toBe("'./configs/app.config.json'");
    });
    test('2 - readConfig', () => {
      const jestConfig = ['dsfdsfds'];

      expect(readConfig(jestConfig)).toBe('./configs/app.config.json');
    });
    test('3 - readConfig', () => {
      expect(readConfig()).toBe('./configs/app.config.json');
    });
  });
});
