import { FilterState } from '../types/Filters'
import { FiltersContext } from '../context/filters'
import React, { useState, FC, PropsWithChildren } from 'react'

export const FiltersWrapper: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [showingFilters, setShowingFilters] = useState<
    FilterState['showingFilters']
  >(false)

  const toggleBodyScrollBehaviour = () => {
    if (showingFilters) {
      document.body.style.overflow = 'scroll'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }

  return (
    <FiltersContext.Provider
      value={{
        showingFilters,
        toggleShowingFilters: () => {
          toggleBodyScrollBehaviour()

          setShowingFilters((showing) => !showing)
        },
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
