import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Header from '../../../components/Header'
import { FiltersContext } from '../../../context/filters'

describe('The Header component', () => {
    const defaultFilterContext = {
        showingFilters: false,
        toggleShowingFilters: jest.fn()
    }

    const setupHeader = (filtersContext = defaultFilterContext) => render(
        <FiltersContext.Provider value={filtersContext as any}>
            <Header />
        </FiltersContext.Provider>
    )
    it('renders header correctly', () => {
        expect(
            setupHeader().asFragment()
        ).toMatchSnapshot()
    })

    it('toggles the filter open when the Filter button is clicked', () => {
        const { getByTestId } = setupHeader()

        const filterButton = getByTestId('FilterButton')

        fireEvent.click(filterButton)

        expect(defaultFilterContext.toggleShowingFilters).toHaveBeenCalled()
    })
})
