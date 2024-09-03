/* eslint-disable */

/** DOT NOT REMOVE, NEEDED IN ORDER TO ALLOW WRITING env.ts IN TYPESCRIPT */
// @ts-ignore
require('tsx/cjs')

module.exports = {
  ...require('./withAndroidExpoSSEPatch'),
  ...require('./withIOSExpoSSEPatch'),
}
