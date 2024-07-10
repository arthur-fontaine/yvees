import type { AnyRoute, Client, RequestOptions } from '@agrume/types'
import type { JsonValue } from 'type-fest'

/**
 * A custom fetch implementation for React Native that allows for Server-Sent Events.
 */
export function agrumeSseClientForRn<R extends AnyRoute>(
  requestOptions: RequestOptions,
): Client<R> {
  return async function (parameters: Parameters<R>[0]) {
    let customFetch

    // Below is the custom fetch implementation
    {
      interface DeferredGenerator<T> {
        add: (value: T) => void
        end: () => void
        generator: AsyncGenerator<Awaited<T>>
      }

      const createDeferredGenerator = function <T>(): DeferredGenerator<T> {
        let completed = false
        const end = () => {
          completed = true
        }

        const queue: T[] = []
        const add = (value: T) => {
          queue.push(value)
        }

        const generator = (async function* () {
          while (true) {
            if (queue.length > 0) {
              yield queue.shift()!
            }

            if (completed) {
              return
            }

            await new Promise(resolve => setTimeout(resolve, 0))
          }
        }())

        return { add, end, generator }
      }

      interface RequestInit extends RequestOptions {
        body?: string
      }

      type Response =
        | { isJson: false, isSse: false, text: () => Promise<string> }
        | { isJson: false, isSse: true, sse: () => AsyncGenerator<string> }
        | { isJson: true, isSse: false, json: () => Promise<JsonValue> }

      customFetch = async function (
        url: string,
        options?: RequestInit,
      ): Promise<Error | Response> {
        if (typeof XMLHttpRequest === 'undefined') {
          return fallbackFetch(url, options)
        }

        return new Promise<Error | Response>((resolve, reject) => {
          const xhr = new XMLHttpRequest()

          const method = options?.method ?? 'GET'
          const headers = options?.headers ?? {}
          const body = options?.body

          switch (method) {
          case 'POST': {
            xhr.open(method, url)
            break
          }
          default: {
            return resolve(new Error(`Unsupported method: ${method}`))
          }
          }

          for (const [key, value] of Object.entries(headers)) {
            xhr.setRequestHeader(key, value)
          }

          xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
              resolve(handleXhrResponse(xhr))
            }
          })

          xhr.addEventListener('error', () => {
            reject(new Error('Network error'))
          })

          xhr.send(body)
        })
      }

      function handleXhrResponse(xhr: XMLHttpRequest): Promise<Response> {
        const responseContentType = xhr.getResponseHeader('content-type')

        switch (responseContentType) {
        case 'application/json': {
          return handleJsonXhrResponse(xhr)
        }
        case 'text/event-stream': {
          return handleSseXhrResponse(xhr)
        }
        default: {
          const text = async () => xhr.responseText
          return Promise.resolve({ isJson: false, isSse: false, text })
        }
        }
      }

      function handleJsonXhrResponse(xhr: XMLHttpRequest): Promise<Response> {
        return new Promise((resolve) => {
          xhr.addEventListener('load', () => {
            const json = async () => JSON.parse(xhr.responseText)
            resolve({ isJson: true, isSse: false, json })
          })
        })
      }

      function handleSseXhrResponse(xhr: XMLHttpRequest): Promise<Response> {
        const {
          add: addValue,
          end,
          generator,
        } = createDeferredGenerator<string>()

        let lastResponseLength = 0
        xhr.addEventListener('progress', () => {
          if (lastResponseLength === xhr.responseText.length) {
            return
          }

          const responseText = xhr.responseText.slice(lastResponseLength)
          lastResponseLength = xhr.responseText.length

          for (const value of responseText.split('\n\n')) {
            if (value === '') {
              continue
            }

            addValue(value)
          }
        })

        xhr.addEventListener('load', () => {
          end()
        })

        return Promise.resolve({
          isJson: false,
          isSse: true,
          sse: () => generator,
        })
      }

      async function fallbackFetch(
        url: string,
        options?: RequestInit,
      ): Promise<Response> {
        const response = await fetch(url, options)

        const responseContentType = response.headers.get('content-type')

        switch (responseContentType) {
        case 'application/json': {
          const json = async () => response.json()
          return { isJson: true, isSse: false, json }
        }
        case 'text/event-stream': {
          const sse = async function* () {
            const reader = response.body
              ?.pipeThrough(new TextDecoderStream()).getReader()

            if (reader === undefined) {
              return
            }

            while (true) {
              const { done, value } = await reader.read()

              if (done) {
                return
              }

              yield value
            }
          }

          return { isJson: false, isSse: true, sse }
        }
        default: {
          const text = async () => response.text()
          return { isJson: false, isSse: false, text }
        }
        }
      }
    }

    const response = await customFetch(requestOptions.url, {
      ...requestOptions,
      body: JSON.stringify(parameters),
    })

    if (response instanceof Error) {
      // eslint-disable-next-line fp/no-throw
      throw response
    }

    if (response.isJson) {
      return response.json()
    }

    if (response.isSse) {
      return (async function* () {
        for await (const unformattedValue of response.sse()) {
          const DATA_PREFIX = 'data: '
          const value = unformattedValue.startsWith(DATA_PREFIX)
            ? unformattedValue.slice(DATA_PREFIX.length)
            : unformattedValue

          yield JSON.parse(value)
        }
      }())
    }

    // eslint-disable-next-line fp/no-throw
    throw new Error('Unsupported response type')
  } as never
}
