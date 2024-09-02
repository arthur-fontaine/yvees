import { withPlugins } from '@expo/config-plugins'
import { ConfigContext, ExpoConfig } from 'expo/config'

import { withAndroidExpoSSEPatch, withIOSExpoSSEPatch } from './plugins'

const baseConfig: ExpoConfig = {
  "name": "yvees",
  "slug": "yvees",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "userInterfaceStyle": "light",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  "ios": {
    bundleIdentifier: "com.yvees.yvees",
    "supportsTablet": true
  },
  "android": {
    package: "com.yvees.yvees",
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#ffffff"
    }
  },
  "web": {
    "favicon": "./assets/favicon.png"
  },
  extra: {
    eas: {
      projectId: "5736f73a-5f1b-410d-956b-3e724a631d59"
    }
  }
}

export default function setupConfig({ config }: ConfigContext) {
  const expoConfig = {
    ...config,
    ...baseConfig,
  }

  if (process.env.SSE_NO_FIX === 'true') {
    return expoConfig
  }

  withPlugins(expoConfig, [
    withAndroidExpoSSEPatch,
    withIOSExpoSSEPatch,
  ])

  return expoConfig
}
