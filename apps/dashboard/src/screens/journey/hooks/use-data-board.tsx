import { createRoute } from 'agrume'

export const sayHello = createRoute(
  async () => {
    return 'Hello world!'
  },
)
