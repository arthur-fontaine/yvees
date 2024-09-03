import * as WebBrowser from 'expo-web-browser'
import React from 'react'

/**
 *  Warm up the browser to improve UX.
 */
export function useWarmUpBrowser() {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}
