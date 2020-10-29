const {
  deg2rad,
  getCentralAngle,
  getGreatCircleDistance,
} = require('./formula');

describe('deg2rad', () => {
  test('1 - deg2rad string', () => {
    expect(deg2rad('41.108440')).toBeCloseTo(0.71747762835854);
  });

  test('1 - deg2rad number', () => {
    expect(deg2rad(41.10844)).toBeCloseTo(0.71747762835854);
  });

  test('1 - deg2rad invalid arguments', () => {
    expect(() => deg2rad('fgdhgfdhgf0')).toThrow(Error);
    expect(() => deg2rad({})).toThrow(Error);
    expect(() => deg2rad([])).toThrow(Error);
  });
});

describe('getCentralAngle', () => {
  test('1 - getCentralAngle', () => {
    expect(getCentralAngle('+90.0', '-127.554334', 45, 180)).toBeCloseTo(
      0.7853,
    );
  });
  test('2 - getCentralAngle', () => {
    expect(() => getCentralAngle()).toThrowError(
      'The values provided are not valid latitude or longitude',
    );
  });
  test('3 - getCentralAngle', () => {
    expect(() => getCentralAngle('asdasd', 'asdsadsa')).toThrowError(
      'The values provided are not valid latitude or longitude',
    );
  });
  test('4 - getCentralAngle', () => {
    expect(() => getCentralAngle('+90.0', '-127.554334')).toThrowError(
      'The values provided are not valid latitude or longitude',
    );
  });
});

describe('getGreatCircleDistance', () => {
  test('1 - getGreatCircleDistance', () => {
    expect(getGreatCircleDistance('+90.0', '-127.554334', 45, 180)).toBeCloseTo(
      5003.779,
    );
  });
  test('2 - getGreatCircleDistance', () => {
    expect(() => getGreatCircleDistance()).toThrowError(
      'The values provided are not valid latitude or longitude',
    );
  });
  test('3 - getGreatCircleDistance', () => {
    expect(() => getGreatCircleDistance('asdasd', 'asdsadsa')).toThrowError(
      'The values provided are not valid latitude or longitude',
    );
  });
  test('4 - getGreatCircleDistance', () => {
    expect(() => getGreatCircleDistance('+90.0', '-127.554334')).toThrowError(
      'The values provided are not valid latitude or longitude',
    );
  });
});
