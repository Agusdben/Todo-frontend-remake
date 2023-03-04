import { FILTER_BUTTONS } from '../../constants/todos'
import { type FilterValue } from '../../types/todos.d.'

interface Props {
  onFilterChange: (filter: FilterValue) => void
  onQueryChange: (q: string) => void
  filterSelected: FilterValue
}

const Filters: React.FC<Props> = ({ filterSelected, onFilterChange, onQueryChange }) => {
  const handleOnFilterSelected = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, key: FilterValue): void => {
    e.preventDefault()
    onFilterChange(key)
  }

  const handleOnQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    onQueryChange(value)
  }

  return (
    <ul className='flex gap-5 items-center flex-wrap'>
      {Object.entries(FILTER_BUTTONS).map(([key, { literal, href }]) => (
        <li key={key} className=''>
          <a
            className={`p-2 ${filterSelected === key ? 'border-1 border-primary' : ''}`}
            href={href}
            onClick={(e) => { handleOnFilterSelected(e, key as FilterValue) }}
          >
            {literal }
          </a>
        </li>
      ))}
      <li className='flex-1'>
        <input
          onChange={handleOnQuery}
          type="text"
          className='w-full min-w-[200px] bg-transparent border-1 border-primary p-2 outline-none'
          placeholder='Search todo'
        />
      </li>
    </ul>
  )
}

export default Filters
