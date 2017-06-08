try {
  module.exports = require('./src/index');
}
catch (_) {
  module.exports = require('./node-4/webpack-if');
}
