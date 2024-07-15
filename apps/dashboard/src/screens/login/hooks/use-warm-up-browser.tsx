import { clerkMiddleware } from '@clerk/nextjs/server'

// eslint-disable-next-line import/no-default-export
export default clerkMiddleware()

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
