import { useState } from 'react'
import { TODO_FILTERS } from '../constants/todos'
import { type FilterValue } from '../types/todos.d.'
import useTodos from './useTodos'

interface ReturnedValues {
  filterSelected: FilterValue
  activeCount: number
  doneCount: number
  handleFilterChange: (filter: FilterValue) => void
}

const useFilterTodos = (): ReturnedValues => {
  const { todos } = useTodos()
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.all)

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter(t => !t.done).length

  return {
    filterSelected,
    activeCount,
    doneCount: todos.length - activeCount,
    handleFilterChange
  }
}

export default useFilterTodos
