import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortingOptions } from './sorting-options';
import { SORTING_OPTIONS } from '../../const';

describe('Component: SortingOptions', () => {
  const mockOnSortChange = vi.fn();

  it('should render sorting options correctly', () => {
    render(<SortingOptions onSortChange={mockOnSortChange} />);

    expect(screen.getByText('Sort by')).toBeInTheDocument();

    const activeOptionSpan = screen.getByRole('button', { name: /Popular/i });
    expect(activeOptionSpan).toBeInTheDocument();

    const activeOptionInList = screen.getByText('Popular', { selector: 'li' });
    expect(activeOptionInList).toBeInTheDocument();
    expect(activeOptionInList).toHaveClass('places__option--active');
  });

  it('should open and close the options list when clicking on the arrow', async () => {
    render(<SortingOptions onSortChange={mockOnSortChange} />);

    const optionsList = screen.getByRole('list');
    expect(optionsList).not.toHaveClass('places__options--opened');

    await userEvent.click(screen.getByRole('button', { name: /Popular/i }));

    expect(optionsList).toHaveClass('places__options--opened');

    SORTING_OPTIONS.forEach((option) => {
      expect(screen.getByText(option, { selector: 'li' })).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: /Popular/i }));

    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('should change the active option and call onSortChange when an option is clicked', async () => {
    render(<SortingOptions onSortChange={mockOnSortChange} />);

    await userEvent.click(screen.getByRole('button', { name: /Popular/i }));

    await userEvent.click(screen.getByText('Price: low to high', { selector: 'li' }));

    expect(screen.getByRole('button', { name: /Price: low to high/i })).toBeInTheDocument();

    expect(mockOnSortChange).toHaveBeenCalledWith('Price: low to high');

    const optionsList = screen.getByRole('list');
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('should highlight the active option', async () => {
    render(<SortingOptions onSortChange={mockOnSortChange} />);

    await userEvent.click(screen.getByRole('button', { name: /Popular/i }));

    const activeOption = screen.getByText('Popular', { selector: 'li' });
    expect(activeOption).toHaveClass('places__option--active');

    await userEvent.click(screen.getByText('Top rated first', { selector: 'li' }));

    const newActiveOption = screen.getByText('Top rated first', { selector: 'li' });
    expect(newActiveOption).toHaveClass('places__option--active');
  });
});
