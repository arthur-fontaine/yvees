// @ts-nocheck

/**
 * @type {import('expo/metro-config')}
 */
const { getDefaultConfig } = require('@expo/metro-config')
const path = require('path')
const fs = require('fs')

const projectRoot = __dirname
const workspaceRoot = path.resolve(__dirname, '../..')

const config = getDefaultConfig(projectRoot)

config.watchFolders = [workspaceRoot]
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

const shimPath = path.resolve(__dirname, 'node_modules/.shim/empty.js')
fs.mkdirSync(path.dirname(shimPath), { recursive: true })
fs.writeFileSync(shimPath, 'module.exports = {}')
config.resolver.ignoreModules = [ // This is a custom property, used in resolveRequest
  'agrume'
]
config.resolver.resolveRequest = (context, /** @type string */moduleName, platform) => {
  if (config.resolver.ignoreModules.includes(moduleName)) {
    return {
      filePath: shimPath,
      type: "sourceFile"
    };
  }

  // This is a workaround to prevent `"Invalid hook call"` error when starting the app
  // There was two React instances imported:
  //   - "../../node_modules/react-native/node_modules/react/cjs/react.development.js" (18.2.0)
  //   - "../../node_modules/react/cjs/react.development.js" (18.2.0)
  // The following code will force the use of the second one. This may be a temporary solution because
  // the error may be caused by Bun installing React in `node_modules/react-native` instead of using the one in `node_modules/react`.
  if (moduleName.endsWith("react.development.js")) {
    return {
      filePath: path.resolve(workspaceRoot, 'node_modules/react/cjs/react.development.js'),
      type: "sourceFile"
    };
  }

  return context.resolveRequest(context, moduleName, platform)
}

config.transformer = { ...config.transformer, unstable_allowRequireContext: true }
config.transformer.minifierPath = require.resolve('metro-minify-terser')

module.exports = config
