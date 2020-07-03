import React from 'react'
import { FiltersContextInterface } from '../types/Filters'

const defaultFilterContext: FiltersContextInterface = {
  showingFilters: false,
  toggleShowingFilters: () => {},
}

export const FiltersContext = React.createContext<FiltersContextInterface>(
  defaultFilterContext,
)
