const { ui } = require('ui/babel-rn');

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [...ui()],
  };
};
