import * as SecureStore from 'expo-secure-store'

export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      return item
    }
    catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return undefined
    }
  },
  saveToken(key: string, value: string) {
    return SecureStore.setItemAsync(key, value).catch(() => undefined)
  },
}
