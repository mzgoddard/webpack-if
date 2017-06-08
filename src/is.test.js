require('source-map-support').install({requireHook: true});

const is = require('./is');

it('op', () => {
  const startsWith = is.op((pred, value) => pred() === value);
  expect(startsWith(() => 'value')('val')).toBeTruthy();
});

it('is', () => {
  expect(is.is(() => 'value')('value')()).toBeTruthy();
  expect(is.is(() => 'value')('val')()).toBeFalsy();
});

it('isArray', () => {
  expect(is.isArray([])).toBeTruthy();
  expect(is.isArray({})).toBeFalsy();
});

it('isObject', () => {
  expect(is.isObject({})).toBeTruthy();
  expect(is.isObject(null)).toBeFalsy();
});

it('isEmpty', () => {
  expect(is.isEmpty([])).toBeTruthy();
  expect(is.isEmpty({})).toBeTruthy();
  expect(is.isEmpty(null)).toBeTruthy();
  expect(is.isEmpty(undefined)).toBeTruthy();
  expect(is.isEmpty(false)).toBeFalsy();
  expect(is.isEmpty(0)).toBeFalsy();
  expect(is.isEmpty('')).toBeFalsy();
});
