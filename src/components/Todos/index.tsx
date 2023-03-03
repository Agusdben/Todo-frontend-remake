import { type Todo as TodoType } from '../../types/todos.d.'
import Todo from '../Todo'

interface Props {
  todos: TodoType[]
}

const Todos: React.FC<Props> = ({ todos }) => {
  return (
    <ul className='flex flex-col gap-4'>
      {todos.map(t => (
        <li key={t.id}>
          <Todo
            id={t.id}
            description={t.description}
            done={t.done}
            user={t.user}
          />
        </li>
      ))}
    </ul>
  )
}

export default Todos
