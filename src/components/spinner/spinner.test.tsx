import { render, screen } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Component: Spinner', () => {
  it('should render the spinner correctly', () => {
    render(<Spinner />);

    const spinnerContainer = screen.getByTestId('spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
    expect(spinnerContainer).toHaveClass('spinner-container');

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass('spinner');
  });
});
