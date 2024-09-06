import { useCallback, useState } from 'react'

/**
 * A hook to handle async callbacks.
 */
export function useAsyncCallback<T extends (
  // eslint-disable-next-line ts/no-explicit-any
  ...args: any[]
// eslint-disable-next-line ts/no-explicit-any
) => Promise<any>>(callback: T, deps: React.DependencyList = []) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>()

  const fn = useCallback(
    async (...args: Parameters<T>) => {
      try {
        setLoading(true)
        return await callback(...args)
      }
      catch (error) {
        if (error instanceof Error) {
          setError(error)
        }
        else {
          setError(new Error(error as never))
        }
        console.error(error)
      }
      finally {
        setLoading(false)
      }
    },
    deps,
  )

  return {
    error,
    fn,
    loading,
  }
}
