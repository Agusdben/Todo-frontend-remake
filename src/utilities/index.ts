import { type Todo } from '../types/todos.d.'
import { type User } from '../types/user'
import { type TextIncludesQuery, type InsetTodoInIndexFn } from './types'

export const mappedUser = (obj: any): User => {
  const { id, todos, token, username }: User = obj

  return {
    id, todos, token, username
  }
}

export const textIncludesQuery = ({ text, q }: TextIncludesQuery): boolean => {
  return text.toLocaleLowerCase().includes(q.toLocaleLowerCase())
}

export const insertTodoInIndex = ({ insertInIndex, todos, todo }: InsetTodoInIndexFn): Todo[] => {
  const todosFistHalf = todos.filter((_, index) => index < insertInIndex)
  const todosSecondHalf = todos.filter((_, index) => index >= insertInIndex)
  return [...todosFistHalf, todo, ...todosSecondHalf]
}
