export interface User {
  id: string
  username: string
  todos: string[]
  token: string
}

export type UserId = Pick<User, 'id'>
export type UserUsername = Pick<User, 'username'>
export type UserTodos = Pick<User, 'todos'>
export type UserToken = Pick<User, 'token'>
