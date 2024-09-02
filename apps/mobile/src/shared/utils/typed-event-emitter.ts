type EventsWithWildcard<Events extends Record<string, unknown>> = {
  // eslint-disable-next-line ts/naming-convention
  '*': {
    [K in keyof Events]: { args: Events[K], event: K }
  }[keyof Events]
} & Events

class ReturnedEmitter<Events extends Record<string, unknown>> {
  private listeners: Partial<Record<
    keyof Events,
    Array<{
      callback: (args: Events[keyof Events]) => void
      once: boolean
    }>
  >> = {}

  /**
   * Emit an event.
   */
  emit<Event extends keyof Events>(event: Event, args: Events[Event]) {
    if (event !== '*') {
      this.emit('*', { args, event } as never)
    }

    if (!this.listeners[event]) {
      return
    }

    this.listeners[event]!.forEach((listener) => {
      listener.callback(args)
      if (listener.once) {
        this.off(event, listener.callback as never)
      }
    })
  }

  /**
   * Return a stream of events.
   */
  async *iterator<Event extends keyof Events>(
    event?: Event,
    signal?: AbortSignal,
  ) {
    const queue: Array<{
      [K in keyof Events]: { args: Events[K], event: K }
    }[keyof Events]> = []

    const unsubscribe = this.on('*', (({ args, event }: typeof queue[number]) => {
      queue.push({ args, event })
    }) as never)

    while (true) {
      if (signal?.aborted) {
        unsubscribe()
        return
      }

      if (queue.length > 0) {
        if (event === undefined || queue[0]!.event === event) {
          yield queue.shift()!
        }
      }

      await new Promise<void>(resolve => setTimeout(resolve, 0))
    }
  }

  /**
   * Remove a listener.
   */
  off<Event extends keyof EventsWithWildcard<Events>>(
    event: Event,
    callback: (args: EventsWithWildcard<Events>[Event]) => void,
  ) {
    if (!this.listeners[event]) {
      return
    }

    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener.callback !== callback,
    )
  }

  /**
   * Add a listener.
   */
  on<Event extends keyof EventsWithWildcard<Events>>(
    event: Event,
    callback: (args: EventsWithWildcard<Events>[Event]) => void,
  ): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event]!.push({ callback: callback as never, once: false })

    return () => this.off(event, callback)
  }

  /**
   * Add a one-time listener.
   */
  once<Event extends keyof EventsWithWildcard<Events>>(
    event: Event,
    callback: (args: EventsWithWildcard<Events>[Event]) => void,
  ): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event]!.push({ callback: callback as never, once: true })

    return () => this.off(event, callback)
  }
}

/**
 * Register an event emitter.
 */
export function registerEventEmitter<Events extends Record<string, unknown>>() {
  return new ReturnedEmitter<Events>()
}
