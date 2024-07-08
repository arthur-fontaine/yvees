import { createGroup, createRouter } from '@swan-io/chicane'

export const router = createRouter({
  data: '/data',
  ...createGroup("journey", "/journey", {
    home: '/',
    create: '/create',
  }),
  login: '/login',
  robot: '/robot',
})

export const useRoute = router.useRoute
