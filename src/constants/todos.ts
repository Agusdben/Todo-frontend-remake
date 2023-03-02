export const TODO_FILTERS = {
  all: 'all',
  active: 'active',
  done: 'done'
} as const

export const FILTER_BUTTONS = {
  [TODO_FILTERS.all]: {
    literal: 'All',
    href: `/?filter=${TODO_FILTERS.all}`
  },
  [TODO_FILTERS.active]: {
    literal: 'Active',
    href: `/?filter=${TODO_FILTERS.active}`
  },
  [TODO_FILTERS.done]: {
    literal: 'Done',
    href: `/?filter=${TODO_FILTERS.done}`
  }
} as const
