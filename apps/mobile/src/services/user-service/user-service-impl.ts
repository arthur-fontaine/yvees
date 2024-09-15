import { db } from 'db/runtime/server'
import { users } from 'db/schema'
import { lazyCreateServiceImpl } from 'diabolo'

import type { UserService } from './user-service'

export const userServiceImpl = lazyCreateServiceImpl<UserService>(() => ({
  createUser: async ({ clerkUserId, name }) => {
    const [createdUser] = await db
      .insert(users)
      .values({
        clerkUserId,
        name,
      })
      .returning()

    if (!createdUser) {
      console.error('Failed to create user')
    }
  },
}))
