import { type User } from '../types/user'

export const mappedUser = (obj: any): User => {
  const { id, todos, token, username }: User = obj

  return {
    id, todos, token, username
  }
}
