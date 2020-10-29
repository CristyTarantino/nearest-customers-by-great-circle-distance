const {
  deg2rad,
  getCentralAngle,
  getGreatCircleDistance,
} = require('./formula');

test('1 - deg2rad', () => {
  expect(deg2rad('41.108440')).toBeCloseTo(0.71747762835854);
  expect(deg2rad(41.10844)).toBeCloseTo(0.71747762835854);
  expect(deg2rad('-10.27699')).toBeCloseTo(-0.17936731269453);
  expect(deg2rad(-10.27699)).toBeCloseTo(-0.17936731269453);

  expect(() => deg2rad('fgdhgfdhgf0')).toThrow(Error);
  expect(() => deg2rad({})).toThrow(Error);
  expect(() => deg2rad([])).toThrow(Error);
});

test('2 - getCentralAngle', () => {});

test('3 - getGreatCircleDistance', () => {});
