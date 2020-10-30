const spy = jest.spyOn(process.stderr, 'write').mockReturnValue();

describe('main', () => {
  const OLD_ARGV = process.argv;

  beforeEach(() => {
    jest.resetModules(); // most important - it clears the cache
    process.argv = { ...OLD_ARGV }; // make a copy
  });

  afterAll(() => {
    process.env = OLD_ARGV; // restore old env
  });

  test('1 - startUp', () => {
    process.argv = ['--config=./configs/app.config.json'];

    // The mock function is called twice
    // eslint-disable-next-line global-require
    expect(require('.')).toEqual({});
  });
});

spy.mockRestore();
