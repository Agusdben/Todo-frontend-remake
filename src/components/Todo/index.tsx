import { colors } from '../../config/theme'
import useModal from '../../hooks/useModal'
import { type Todo as TodoType, type UpdateTodoFn } from '../../types/todos.d.'
import CheckIcon from '../Icons/CheckIcon'
import TrashBinIcon from '../Icons/TrashBinIcon'
import ModalDelete from '../ModalDelete'
import useTodo from './useTodo'

interface Props extends TodoType {
  onRemoveTodo: () => void
  onUpdateTodo: UpdateTodoFn
}

const Todo: React.FC<Props> = ({ id, description, done, user, onRemoveTodo, onUpdateTodo }) => {
  const {
    isEditing,
    todoValue,
    handleStopEditing,
    handleTodoValue,
    handleStartEditing
  } = useTodo({ id, description, done, user })

  const modalDelete = useModal({ title: 'Delete todo' })

  const handleOnblur = (): void => {
    onSubmitDescription()
  }

  const onSubmitDescription = (e?: React.FormEvent<HTMLFormElement>): void => {
    handleStopEditing()
    e?.preventDefault()
    if (todoValue === '') {
      return
    }
    onUpdateTodo({ description: todoValue, done, id })
  }

  const handleDone = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { checked } = e.target
    onUpdateTodo({ description, done: checked, id })
  }

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
        <input type='checkbox' className='hidden' checked={done} onChange={handleDone} />
      </label>
      {
        isEditing
          ? (
              <form className='flex-1' onSubmit={onSubmitDescription}>
                <input
                  className='p-2 bg-transparent outline-none border-1 border-primary w-full'
                  autoFocus
                  onBlur={handleOnblur}
                  onChange={handleTodoValue}
                  value={todoValue}
                  required
                />
              </form>
            )
          : (
              <p
                onClick={handleStartEditing}
                className={`p-2 flex-1 flex border-1 border-transparent ${done ? 'line-through opacity-50' : 'hover:bg-black-700 cursor-text'}`}
              >
                {description}
              </p>
            )
      }
      <button className='p-2 hover:brightness-75' onClick={modalDelete.handleModal}>
        <TrashBinIcon fill={colors.primary} />
      </button>
      <ModalDelete
        modal={modalDelete}
        descriptions={[description]}
        type={'todo'}
        onCancel={modalDelete.handleModal}
        onDelete={onRemoveTodo}
      />
    </div>
  )
}

export default Todo
