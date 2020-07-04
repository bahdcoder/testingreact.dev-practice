import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import useFilters from '../../../hooks/useFilters'

import { FiltersContext } from '../../../context/filters'
import { FiltersWrapper } from '../../../components/FiltersWrapper'

describe('The <FiltersWrapper /> component', () => {
  it('should render all children passed to it', () => {
    const { getByTestId } = render(
      <FiltersContext.Provider value={{} as any}>
        <FiltersWrapper>
          <button data-testid="FilterButton">Filter Button</button>
        </FiltersWrapper>
      </FiltersContext.Provider>,
    )

    expect(getByTestId('FilterButton')).toBeInTheDocument()
  })

  it('should update the filters context with correct state values', () => {
    const hideFiltersMessage = 'Hide filters'
    const showFiltersMessage = 'Show filters'

    const Button = () => {
      const { showingFilters, toggleShowingFilters } = useFilters()

      return (
        <button onClick={toggleShowingFilters}>
          {showingFilters ? hideFiltersMessage : showFiltersMessage}
        </button>
      )
    }

    const { getByText } = render(
      <FiltersContext.Provider value={{} as any}>
        <FiltersWrapper>
          <Button />
        </FiltersWrapper>
      </FiltersContext.Provider>,
    )

    expect(getByText(showFiltersMessage)).toBeInTheDocument()

    fireEvent.click(getByText('Show filters'))

    expect(getByText(hideFiltersMessage)).toBeInTheDocument()
  })

  it('should update the body style to prevent scrolling when filter is toggled', () => {
    const hideFiltersMessage = 'Hide filters'
    const showFiltersMessage = 'Show filters'

    const Button = () => {
      const { showingFilters, toggleShowingFilters } = useFilters()

      return (
        <button onClick={toggleShowingFilters}>
          {showingFilters ? hideFiltersMessage : showFiltersMessage}
        </button>
      )
    }

    const { getByText } = render(
      <FiltersContext.Provider value={{} as any}>
        <FiltersWrapper>
          <Button />
        </FiltersWrapper>
      </FiltersContext.Provider>,
    )

    fireEvent.click(getByText(showFiltersMessage))

    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.click(getByText(hideFiltersMessage))

    expect(document.body.style.overflow).toBe('scroll')
  })
})
