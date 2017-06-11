require('source-map-support').install({requireHook: true});

const {cleanArray, cleanObject, clean} = require('./clean');

class NonObject {}

function ObjectFunction() {}

it('cleans an array', () => {
  expect(cleanArray()).toBeNull();
  expect(cleanArray([])).toBeNull();
  expect(cleanArray([null])).toBeNull();
  expect(cleanArray([null, null])).toBeNull();
  expect(cleanArray([null, null, null])).toBeNull();
  expect(cleanArray([,,,])).toBeNull();
  expect(cleanArray([{}])).toBeNull();
  expect(cleanArray([Object.create({})])).toBeNull();
  expect(cleanArray([''])).not.toBeNull();
  expect(cleanArray([0])).not.toBeNull();
  expect(cleanArray([false])).not.toBeNull();
  expect(cleanArray([new NonObject()])).not.toBeNull();
  expect(cleanArray([new ObjectFunction()])).not.toBeNull();
});

it('cleans an object', () => {
  expect(cleanObject()).toBeNull();
  expect(cleanObject({})).toBeNull();
  expect(cleanObject({key: null})).toBeNull();
  expect(cleanObject({key: null, key2: null})).toBeNull();
  expect(cleanObject({key: null, key2: null, key3: null})).toBeNull();
  expect(cleanObject({key: {}})).toBeNull();
  expect(cleanObject({key: Object.create({})})).toBeNull();
  expect(cleanObject({key: ''})).not.toBeNull();
  expect(cleanObject({key: 0})).not.toBeNull();
  expect(cleanObject({key: false})).not.toBeNull();
  expect(cleanObject({key: new NonObject()})).not.toBeNull();
  expect(cleanObject({key: [new NonObject()]})).not.toBeNull();
});

it('cleans', () => {
  expect(clean()).toBeNull();
  expect(clean([])).toBeNull();
  expect(clean({})).toBeNull();
  expect(clean([[]])).toBeNull();
  expect(clean([{}])).toBeNull();
  expect(clean({key: []})).toBeNull();
  expect(clean([{key: []}])).toBeNull();
  expect(cleanObject({key: [new NonObject()]})).not.toBeNull();
});
