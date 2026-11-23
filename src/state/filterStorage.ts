import { initialFilterState } from '../core/catalogProducts/filterState.js';
import type { FilterPanelState } from '../types/types.js';

const STORAGE_KEY = 'team-store:catalog-filters';

export function saveFilters(state: FilterPanelState): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadFilters(): FilterPanelState {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  return raw === null ? { ...initialFilterState } : (JSON.parse(raw) as FilterPanelState);
}
