import { colors } from '../../config/theme'
import { type Todo as TodoType } from '../../types/todos.d.'
import CheckIcon from '../Icons/CheckIcon'
import TrashBinIcon from '../Icons/TrashBinIcon'
import useTodo from './useTodo'

interface Props extends TodoType {
  onRemoveTodo: () => void
}

const Todo: React.FC<Props> = ({ id, description, done, user, onRemoveTodo }) => {
  const {
    handleUpdateTodo,
    isEditing,
    handleStopEditing,
    handleTodoValue,
    todoValue,
    handleStartEditing
  } = useTodo({ id, description, done, user })

  return (
    <div className='flex px-2 py-4 items-center gap-4 bg-black-500 break-words break-all'>
      <label className={`p-3 border-1 border-primary w-4 h-4 relative cursor-pointer ${!done ? 'hover:bg-primary' : ''}`}>
        {
          done && (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <CheckIcon fill={colors.primary} />
            </div>
          )
        }
        <input type='checkbox' className='hidden' checked={done} onChange={e => {}} />
      </label>
      {
        isEditing
          ? (
              <form className='flex-1' onSubmit={handleUpdateTodo}>
                <input
                  className='p-2 bg-transparent outline-none border-1 border-primary w-full'
                  autoFocus
                  onBlur={handleStopEditing}
                  onChange={handleTodoValue}
                  value={todoValue}
                />
                <button type='submit' />
              </form>
            )
          : (
              <p
                onClick={handleStartEditing}
                className={`p-2 flex-1 flex border-1 border-transparent ${done ? 'line-through opacity-50' : 'hover:bg-black-700 cursor-text'}`}
              >
                {todoValue}
              </p>
            )
      }
      <button className='p-2 hover:brightness-75' onClick={onRemoveTodo}>
        <TrashBinIcon fill={colors.primary} />
      </button>
    </div>
  )
}

export default Todo
