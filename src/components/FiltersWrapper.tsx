import { FilterState } from '../types/Filters';
import { FiltersContext } from '../context/filters';
import React, { useState, FC, PropsWithChildren } from 'react'

export const FiltersWrapper: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [showingFilters, setShowingFilters] = useState<FilterState['showingFilters']>(false);

    return (
        <FiltersContext.Provider
          value={{
              showingFilters,
              toggleShowingFilters: () => setShowingFilters(showing => !showing)
          }}
        >
          {children}
        </FiltersContext.Provider>
      );
}
