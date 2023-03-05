import { type Todo } from '../types/todos.d.'

export interface TextIncludesQuery {
  text: string
  q: string
}

export interface InsetTodoInIndexFn {
  insertInIndex: number
  todos: Todo[]
  todo: Todo
}
