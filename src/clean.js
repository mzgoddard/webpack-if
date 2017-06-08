const {isArray, isEmpty, isObject} = require('./is');

const cleanObject = obj => {
  if (obj) {
    for (let key of Object.keys(obj)) {
      obj[key] = clean(obj[key]);
      if (isEmpty(obj[key])) {
        delete obj[key];
      }
    }
    if (Object.keys(obj).length === 0) {
      return null;
    }
    return obj;
  }
  else {
    return null;
  }
};

const cleanArray = ary => {
  if (ary) {
    for (let i = ary.length - 1; i >= 0; i--) {
      ary[i] = clean(ary[i]);
      if (isEmpty(ary[i])) {
        ary.splice(i, 1);
      }
    }
    if (ary.length === 0) {
      return null;
    }
    return ary;
  }
  else {
    return null;
  }
};

const clean = value => {
  if (isArray(value)) {
    return cleanArray(value);
  }
  else if (isObject(value)) {
    return cleanObject(value);
  }
  if (typeof value === 'undefined') {
    return null;
  }
  return value;
};

module.exports = {
  cleanObject,
  cleanArray,
  clean,
};
