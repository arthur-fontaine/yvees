/* eslint-disable node/prefer-global/process */

export const config = {
  clerk: {
    publishableKey: assertExists(
      process.env.PUBLISHABLE_KEY,
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    ),
  },
}

function assertExists<T>(value: T | undefined, errorMessage?: string): T {
  if (value === undefined) {
    // eslint-disable-next-line fp/no-throw
    throw new Error(errorMessage ?? 'Value is undefined')
  }
  return value
}
