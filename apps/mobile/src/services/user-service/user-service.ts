import type { Service } from 'diabolo'
import { createService } from 'diabolo'

export interface UserService extends Service<'user', {
  createUser: (
    params: { clerkUserId: string, name: string }
  ) => Promise<void>
}> { }

export const userService = createService<UserService>('user')
