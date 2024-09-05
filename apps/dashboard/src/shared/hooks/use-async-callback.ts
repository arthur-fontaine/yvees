import { useCallback, useState } from "react"

export const useAsyncCallback = <T extends (...args: any[]) => Promise<any>>(
  callback: T,
  deps: React.DependencyList = [],
) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fn = useCallback(
    async (...args: Parameters<T>) => {
      try {
        setLoading(true)
        return await callback(...args)
      }
      catch (error) {
        if (error instanceof Error) {
          setError(error)
        } else {
          setError(new Error(error as never))
        }
        throw error
      }
      finally {
        setLoading(false)
      }
    },
    deps,
  )

  return {
    fn,
    loading,
    error,
  }
}