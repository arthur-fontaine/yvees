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

  if (moduleName.startsWith('diabolo')) {
    return {
      filePath: require.resolve(moduleName),
      type: "sourceFile"
    }
  }

  return context.resolveRequest(context, moduleName, platform)
}

config.transformer = { ...config.transformer, unstable_allowRequireContext: true }
config.transformer.minifierPath = require.resolve('metro-minify-terser')

module.exports = config
