const {isEmpty} = require('./is');

const handleCase = function(_case) {
  if (typeof _case === 'function') {
    return _case();
  }
  else if (typeof _case === 'undefined') {
    return null;
  }
  else {
    return _case;
  }
};

const ifElse = function(test, ifCase, elseCase) {
  if (arguments.length === 1) {
    return (...args) => ifElse(test, ...args);
  }
  if (typeof test === 'function') {
    return handleCase(test() ? ifCase : elseCase);
  }
  else {
    return handleCase(test ? ifCase : elseCase);
  }
};

module.exports = {ifElse};
