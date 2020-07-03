export interface FilterState {
  showingFilters: boolean
}

export type FiltersContextInterface = FilterState & {
  toggleShowingFilters: () => void
}

export const LOCAL_STORAGE_KEYS = {
  APPLIED_ATTRIBUTES: 'APPLIED_ATTRIBUTES',
}
