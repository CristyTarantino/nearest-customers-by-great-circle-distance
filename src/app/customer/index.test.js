const {
  getCustomersDistFromDestination,
  getSelectedCustomersByDistance,
} = require('.');

const destinationCoordinates = {
  latitude: '53.339428',
  longitude: '-6.257664',
};

describe('customer', () => {
  describe('getCustomersDistFromDestination', () => {
    test('1 - getCustomersDistFromDestination', () => {
      const obj = [
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

      const expectedObj = [
        {
          distance: 41.768784505631224,
          latitude: '52.986375',
          longitude: '-6.043701',
          name: 'Christina McArdle',
          user_id: 12,
        },
        {
          distance: 313.25607630233316,
          latitude: '51.92893',
          longitude: '-10.27699',
          name: 'Alice Cahill',
          user_id: 1,
        },
        {
          distance: 324.3753702368387,
          latitude: '51.8856167',
          longitude: '-10.4240951',
          name: 'Ian McArdle',
          user_id: 2,
        },
      ];

      expect(
        getCustomersDistFromDestination(obj, destinationCoordinates),
      ).toStrictEqual(expectedObj);
    });

    test('2 - getCustomersDistFromDestination', () => {
      const obj = [
        {
          user_id: 12,
          name: 'Christina McArdle',
          longitude: '-6.043701',
        },
        {
          latitude: '51.92893',
          name: 'Alice Cahill',
          longitude: '-10.27699',
        },
        {
          latitude: '51.8856167',
          user_id: 2,
          longitude: '-10.4240951',
        },
        {
          latitude: '52.3191841',
          user_id: 3,
          name: 'Jack Enright',
        },
      ];

      expect(
        getCustomersDistFromDestination(obj, destinationCoordinates),
      ).toStrictEqual([]);
    });

    test('3 - getCustomersDistFromDestination', () => {
      expect(() => getCustomersDistFromDestination()).toThrowError();
    });

    test('4 - getCustomersDistFromDestination', () => {
      expect(() =>
        getCustomersDistFromDestination(destinationCoordinates),
      ).toThrowError();
    });

    test('5 - getCustomersDistFromDestination', () => {
      expect(() => getCustomersDistFromDestination('')).toThrowError();
    });
  });
  describe('getSelectedCustomersByDistance', () => {
    test('1 - getCustomersDistFromDestination', () => {
      const obj = [
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

      expect(getSelectedCustomersByDistance(obj, 5)).toStrictEqual([]);
    });

    test('2 - getCustomersDistFromDestination', () => {
      const obj = [
        {
          distance: 41.768784505631224,
          latitude: '52.986375',
          longitude: '-6.043701',
          name: 'Christina McArdle',
          user_id: 12,
        },
        {
          distance: 313.25607630233316,
          latitude: '51.92893',
          longitude: '-10.27699',
          name: 'Alice Cahill',
          user_id: 1,
        },
        {
          distance: 324.3753702368387,
          latitude: '51.8856167',
          longitude: '-10.4240951',
          name: 'Ian McArdle',
          user_id: 2,
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

      expect(getSelectedCustomersByDistance(obj, 320)).toStrictEqual(
        expectedValue,
      );
    });

    test('3 - getCustomersDistFromDestination', () => {
      expect(() => getSelectedCustomersByDistance()).toThrowError();
    });

    test('4 - getCustomersDistFromDestination', () => {
      expect(() =>
        getSelectedCustomersByDistance(destinationCoordinates),
      ).toThrowError();
    });

    test('5 - getCustomersDistFromDestination', () => {
      expect(() => getSelectedCustomersByDistance('')).toThrowError();
    });
  });
});
