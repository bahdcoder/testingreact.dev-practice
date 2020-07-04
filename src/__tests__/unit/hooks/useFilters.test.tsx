import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { useFilters } from '../../../hooks/useFilters'
import { FiltersContext } from '../../../context/filters'

describe('The useFilters hook', () => {
  const Button: React.FC<{
    showingFiltersMessage: string
    notShowingFiltersMessage: string
  }> = ({ showingFiltersMessage, notShowingFiltersMessage }) => {
    const { showingFilters, toggleShowingFilters } = useFilters()

    return (
      <button data-testid="button" onClick={toggleShowingFilters}>
        {showingFilters ? showingFiltersMessage : notShowingFiltersMessage}
      </button>
    )
  }

  it('returns the current value of the filters context', () => {
    const toggleShowingFiltersMock = jest.fn()
    const showingFiltersMessage = 'showingFiltersMessage'
    const notShowingFiltersMessage = 'notShowingFiltersMessage'

    const { getByTestId } = render(
      <FiltersContext.Provider
        value={{
          showingFilters: true,
          toggleShowingFilters: toggleShowingFiltersMock,
        }}
      >
        <Button
          showingFiltersMessage={showingFiltersMessage}
          notShowingFiltersMessage={notShowingFiltersMessage}
        />
      </FiltersContext.Provider>,
    )

    const button = getByTestId('button')

    fireEvent.click(button)

    expect(button.textContent).toBe(showingFiltersMessage)
    expect(toggleShowingFiltersMock).toHaveBeenCalled()
  })
})
