import { type TODO_FILTERS } from '../constants/todos'
import { type UserToken, type UserUsername } from './user'

export interface Todo {
  id: string
  description: string
  done: boolean
  user: string
}

export type TodoId = Pick<Todo, 'id'>
export type TodoDescription = Pick<Todo, 'description'>
export type TodoDone = Pick<Todo, 'done'>
export type TodoUser = Pick<Todo, 'user'>
export type TodoIdDone = Pick<Todo, 'id' | 'done'>
export type TodoIdDoneDescription = Pick<Todo, 'id' | 'done' | 'description'>

export type UpdateTodoFn = ({ id, done, description }: TodoIdDoneDescription) => Promise<void>
export type RemoveTodoFn = ({ id }: TodoId) => Promise<void>

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]

export interface NewTodo extends TodoDescription, UserUsername, UserToken {}

export interface DeleteTodo extends TodoId, UserToken {}

export interface UpdateTodo extends TodoId, TodoDescription, TodoDone, UserToken {}
