import { colors } from '../../config/theme'
import { TODO_FILTERS } from '../../constants/todos'
import { type FilterValue } from '../../types/todos.d.'
import MagnifyingGlassIcon from '../Icons/MagnifyingGlassIcon'

interface Props {
  onFilterChange: (filter: FilterValue) => void
  onQueryChange: (q: string) => void
  filterSelected: FilterValue
}

const Filters: React.FC<Props> = ({ filterSelected, onFilterChange, onQueryChange }) => {
  const handleOnFilterSelected = (key: FilterValue): void => {
    onFilterChange(key)
  }

  const handleOnQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    onQueryChange(value)
  }

  return (
    <ul className='flex gap-y-2 gap-x-5 items-center flex-wrap'>
      {Object.values(TODO_FILTERS).map((value) => (
        <li key={value}>
          <button
            className={`p-2 hover:border-1 hover:border-primary ${filterSelected === value ? 'border-1 border-primary' : 'border-1 border-transparent '}`}
            onClick={() => { handleOnFilterSelected(value as FilterValue) }}
          >
            {value}
          </button>
        </li>
      ))}
      <li className='flex-1 focus-within:shadow-md focus-within:shadow-primary flex items-center'>
        <input
          onChange={handleOnQuery}
          type="text"
          className='w-full min-w-[200px] bg-transparent border-1 border-primary p-2 outline-none '
          placeholder='Search todo'
        />
        <div className='px-2 self-stretch grid place-content-center bg-primary'>
          <MagnifyingGlassIcon fill={colors.black} className='text-2xl'/>
        </div>
      </li>
    </ul>
  )
}

export default Filters
