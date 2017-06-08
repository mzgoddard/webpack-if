require('source-map-support').install({requireHook: true});

const {cleanArray, cleanObject, clean} = require('./clean');

it('cleans an array', () => {
  expect(cleanArray()).toBeNull();
  expect(cleanArray([])).toBeNull();
  expect(cleanArray([null])).toBeNull();
  expect(cleanArray([null, null])).toBeNull();
  expect(cleanArray([null, null, null])).toBeNull();
  expect(cleanArray([,,,])).toBeNull();
  expect(cleanArray([''])).toBeDefined();
  expect(cleanArray([0])).toBeDefined();
  expect(cleanArray([false])).toBeDefined();
});

it('cleans an object', () => {
  expect(cleanObject()).toBeNull();
  expect(cleanObject({})).toBeNull();
  expect(cleanObject({key: null})).toBeNull();
  expect(cleanObject({key: null, key2: null})).toBeNull();
  expect(cleanObject({key: null, key2: null, key3: null})).toBeNull();
  expect(cleanObject({key: ''})).toBeDefined();
  expect(cleanObject({key: 0})).toBeDefined();
  expect(cleanObject({key: false})).toBeDefined();
});

it('cleans', () => {
  expect(clean()).toBeNull();
  expect(clean([])).toBeNull();
  expect(clean({})).toBeNull();
  expect(clean([[]])).toBeNull();
  expect(clean([{}])).toBeNull();
  expect(clean({key: []})).toBeNull();
  expect(clean([{key: []}])).toBeNull();
});
