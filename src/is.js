const op = function(_op, pred, value) {
  if (arguments.length === 1) {
    return (...args) => op(_op, ...args);
  }
  if (arguments.length === 2) {
    return (...args) => op(_op, pred, ...args);
  }
  if (arguments.length === 3) {
    return () => {
      if (typeof pred === 'function') {
        return _op(pred(), value);
      }
      else {
        return _op(pred, value);
      }
    };
  }
};

const is = _is => op((a, b) => a === b, _is);

const isArray = value => Array.isArray(value);

const isObject = value => (
  value ? value.constructor === Object : false
);

const isEmpty = value => {
  return (
    isArray(value) && value.length === 0 ||
    isObject(value) && Object.keys(value).length === 0 ||
    value === null ||
    typeof value === 'undefined'
  );
}

module.exports = {
  is,
  isArray,
  isObject,
  isEmpty,
  op,
};
