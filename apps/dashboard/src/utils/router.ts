import { createRouter } from '@swan-io/chicane'

export const router = createRouter({
  data: '/data',
  journey: '/journey',
  login: '/login',
  robot: '/robot',
})

export const useRoute = router.useRoute
