require('source-map-support').install({requireHook: true});

const {ifElse} = require('./ifElse');

it('calls with 2 or 3 arguments', () => {
  expect(ifElse(true, () => 'if')).toBe('if');
  expect(ifElse(false, null, () => 'else')).toBe('else');
  expect(ifElse(() => true, () => 'if')).toBe('if');
  expect(ifElse(() => false, null, () => 'else')).toBe('else');
  expect(ifElse(() => true, 0)).toBe(0);
  expect(ifElse(() => true, '')).toBe('');
  expect(ifElse(() => true, false)).toBe(false);
  expect(ifElse(() => false, null, false)).toBe(false);
  expect(ifElse(() => false, () => 'if')).toBeNull();
  expect(ifElse(() => true, null, () => 'else')).toBeNull();
  expect(ifElse(() => true, () => 'if', () => 'else')).toBe('if');
  expect(ifElse(() => false, () => 'if', () => 'else')).toBe('else');
});

it('curries the first argument', () => {
  expect(ifElse(() => true)).toBeInstanceOf(Function);
});

it('curried ifElse calls with second call', () => {
  const ifTrue = ifElse(() => true);
  const ifFalse = ifElse(() => false);
  expect(ifTrue(() => 'if')).toBe('if');
  expect(ifFalse(null, () => 'else')).toBe('else');
  expect(ifFalse(() => 'if')).toBeNull();
  expect(ifTrue(null, () => 'else')).toBeNull();
  expect(ifTrue(() => 'if', () => 'else')).toBe('if');
  expect(ifFalse(() => 'if', () => 'else')).toBe('else');
});

it('curried ifElse with non-function test', () => {
  const ifTrue = ifElse(true);
  const ifFalse = ifElse(false);
  expect(ifTrue(() => 'if')).toBe('if');
  expect(ifFalse(null, () => 'else')).toBe('else');
  expect(ifFalse(() => 'if')).toBeNull();
  expect(ifTrue(null, () => 'else')).toBeNull();
  expect(ifTrue(() => 'if', () => 'else')).toBe('if');
  expect(ifFalse(() => 'if', () => 'else')).toBe('else');
});

it('returns non-function values if the if and else case', () => {
  const ifTrue = ifElse(() => true);
  const ifFalse = ifElse(() => false);
  expect(ifTrue('if')).toBe('if');
  expect(ifFalse(null, 'else')).toBe('else');
  expect(ifFalse('if')).toBeNull();
  expect(ifTrue(null, 'else')).toBeNull();
  expect(ifTrue('if', 'else')).toBe('if');
  expect(ifFalse('if', 'else')).toBe('else');
});
