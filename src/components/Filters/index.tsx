import { FILTER_BUTTONS } from '../../constants/todos'
import { type FilterValue } from '../../types/todos.d.'

interface Props {
  onFilterChange: (filter: FilterValue) => void
  filterSelected: FilterValue
}

const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
  const handleOnFilterSelected = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, key: FilterValue): void => {
    e.preventDefault()
    onFilterChange(key)
  }

  return (
    <ul>
      {Object.entries(FILTER_BUTTONS).map(([key, { literal, href }]) => (
        <li key={key}>
          <a className={`${filterSelected === key ? 'border-2 border-red-900' : ''}`} href={href} onClick={(e) => { handleOnFilterSelected(e, key as FilterValue) }}>{literal }</a>
        </li>
      ))}
    </ul>
  )
}

export default Filters
