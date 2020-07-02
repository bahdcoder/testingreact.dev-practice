import React from 'react';
import { FiltersContextInterface, LOCAL_STORAGE_KEYS } from '../types/Filters';

const defaultFilterContext: FiltersContextInterface = {
  showingFilters: false,
  toggleShowingFilters: () => {},
};

export const FiltersContext = React.createContext<FiltersContextInterface>(
  defaultFilterContext,
);
