const clean = require('./clean');
const ifElse = require('./ifElse');
const is = require('./is');

module.exports = Object.assign(clean.clean, clean, ifElse, is);
