import AppLayout from '../../components/AppLayout'
import CreateTodo from '../../components/CreateTodo'
import Filters from '../../components/Filters'
import Todos from '../../components/Todos'
import useTodos from '../../hooks/useTodos'

const HomePage = (): JSX.Element => {
  const { todos, handleFilterChange, handleClearDone, activeCount, filterSelected, doneCount } = useTodos()
  return (
    <AppLayout>
      <section>
        <CreateTodo/>
        <article>
          <Todos todos={todos} />
        </article>
        <footer>
          <p>{activeCount} todo{activeCount > 1 ? 's' : ''} pending</p>
          <Filters onFilterChange={handleFilterChange} filterSelected={filterSelected}/>
          {doneCount > 0 && (
            <button onClick={handleClearDone}>Remove all completed</button>
          )}
        </footer>
      </section>
    </AppLayout>
  )
}

export default HomePage
