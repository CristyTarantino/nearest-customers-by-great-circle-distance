describe.only('index.js', () => {
  test.only('one of my .only test', () => {
    expect(1 + 1).toEqual(2);
  });
});
