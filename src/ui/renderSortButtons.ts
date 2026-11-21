import type { SortMode } from '../types/types';

const BUTTONS = [
  { mode: 'asc', symbol: '↑', label: 'Price low to high' },
  { mode: 'desc', symbol: '↓', label: 'Price high to low' },
] as const;

export const renderSortButtons = (
  container: HTMLElement,
  activeMode: SortMode,
  onSelect: (mode: SortMode) => void,
): void => {
  const buttons = BUTTONS.map(({ mode, symbol, label }) => {
    const button = document.createElement('button');

    button.type = 'button';
    button.textContent = symbol;
    button.title = label;
    button.classList.toggle('active', mode === activeMode);
    button.addEventListener('click', () => onSelect(mode === activeMode ? 'default' : mode));

    return button;
  });

  container.replaceChildren(...buttons);
};
