import { type TodoId, type Todo as TodoType, type UpdateTodoFn, type RemoveTodoFn } from '../../types/todos.d.'
import Todo from '../Todo'

interface Props {
  todos: TodoType[]
  onRemoveTodo: RemoveTodoFn
  onUpdateTodo: UpdateTodoFn
}

const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onUpdateTodo }) => {
  const handleRemoveTodo = ({ id }: TodoId): void => {
    onRemoveTodo({ id })
  }

  return (
    <ul className='flex flex-col gap-4 overflow-x-hidden'>
      {todos.map((t, index) => {
        const delay = Math.min((index + 1) * 70, 750) // 750 max duration
        return (
          <li key={t.id} style={{ animationDuration: `${delay}ms` }} className='animate-to-left'>
            <Todo
              onRemoveTodo={() => { handleRemoveTodo({ id: t.id }) }}
              onUpdateTodo={onUpdateTodo}
              id={t.id}
              description={t.description}
              done={t.done}
              user={t.user}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default Todos
