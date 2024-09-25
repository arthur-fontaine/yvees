require('dotenv').config();

const { ui } = require('ui/babel-rn');
const { state } = require('@agrume/internals');

state.set((state) => {
  state.isRegistering = true;
  state.options.tunnel = {
    type: 'localtunnel',
  };
  return state;
})

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-agrume', 'babel-preset-expo'],
    plugins: [...ui(), 'babel-plugin-transform-import-meta'],
  };
};
