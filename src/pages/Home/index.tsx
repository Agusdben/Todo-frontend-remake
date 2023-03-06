import Alert from '../../components/Alert'
import AppLayout from '../../components/AppLayout'
import Button from '../../components/Button'
import CreateTodo from '../../components/CreateTodo'
import Filters from '../../components/Filters'
import ModalDelete from '../../components/ModalDelete'
import Todos from '../../components/Todos'
import useModal from '../../hooks/useModal'
import useTodos from '../../hooks/useTodos'
import useUser from '../../hooks/useUser'

const HomePage = (): JSX.Element => {
  const { user } = useUser()
  const {
    todos,
    activeCount,
    filterSelected,
    doneCount,
    alert,
    handleCreateTodo,
    handleFilterChange,
    handleClearDone,
    handleRemoveTodo,
    handleQuery,
    handleUpdateTodo,
    getTodoDoneDescription
  } = useTodos()

  const modalDeleteAllDone = useModal({ title: 'Delete todos' })

  return (
    <AppLayout>
      <section className='w-full h-full m-auto display flex flex-col justify-center'>
        <article className='relative max-w-lg h-full w-full m-auto flex flex-col gap-4'>
          <div>
            <p>Nice to see you again <span className='font-bold text-primary'>{user?.username}</span></p>
          </div>
          <div className='sticky top-0'>
            <CreateTodo onSubmit={handleCreateTodo}/>
          </div>
          <div className='flex flex-col justify-center gap-4'>
            <Filters
              onFilterChange={handleFilterChange}
              onQueryChange={handleQuery}
              filterSelected={filterSelected}
            />
          </div>
          <div className='flex-1 flex flex-col gap-4'>
            <div className='flex justify-between'>
              <p>Todos ({todos.length})</p>
              <p>{activeCount} todo{activeCount !== 1 ? 's' : ''} pending</p>
            </div>
            <Todos
              todos={todos}
              onRemoveTodo={handleRemoveTodo}
              onUpdateTodo={handleUpdateTodo}
            />
          </div>
          {doneCount > 0 && (
            <div className='ml-auto'>
              <Button
                onClick={modalDeleteAllDone.handleModal}
              >
                Remove all completed
              </Button>
            </div>
          )}
        </article>
      </section>
      <ModalDelete
        modal={modalDeleteAllDone}
        descriptions={getTodoDoneDescription()}
        type='todo'
        onCancel={modalDeleteAllDone.handleModal}
        onDelete={handleClearDone}
      />
      <Alert onClose={alert.onClose} isOpen={alert.isOpen} message={alert.message}/>
    </AppLayout>
  )
}

export default HomePage
