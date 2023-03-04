import { type User } from '../types/user'

export const mappedUser = (obj: any): User => {
  const { id, todos, token, username }: User = obj

  return {
    id, todos, token, username
  }
}

export const textIncludesQuery = ({ text, q }: { text: string, q: string }): boolean => {
  return text.toLocaleLowerCase().includes(q.toLocaleLowerCase())
}
