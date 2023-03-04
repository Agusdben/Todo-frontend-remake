import { type Todo as TodoType } from '../../types/todos.d.'
import Todo from '../Todo'

interface Props {
  todos: TodoType[]
}

const Todos: React.FC<Props> = ({ todos }) => {
  return (
    <ul className='flex flex-col gap-4 overflow-x-hidden'>
      {todos.map((t, index) => {
        const delay = Math.min((index + 1) * 150, 1200) // 1200 max duration
        return (
          <li key={t.id} style={{ animationDuration: `${delay}ms` }} className='animate-to-left'>
            <Todo
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
