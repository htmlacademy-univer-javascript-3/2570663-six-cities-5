import { render, screen } from '@testing-library/react';
import { toast } from 'react-toastify';
import {showCustomToast, CustomToastContainer, CustomToast} from './custom-toast';

vi.mock('react-toastify', () => ({
  toast: vi.fn(),
  ToastContainer: () => <div data-testid="toast-container" />,
}));

describe('Function: showCustomToast', () => {
  it('should display a custom toast with the given message', () => {
    const mockMessage = 'Test toast message';

    showCustomToast(mockMessage);

    expect(toast).toHaveBeenCalledWith(<CustomToast message={mockMessage} />);
  });
});

describe('Component: CustomToastContainer', () => {
  it('should render the ToastContainer with correct props', () => {
    render(<CustomToastContainer />);

    const toastContainer = screen.getByTestId('toast-container');
    expect(toastContainer).toBeInTheDocument();
  });
});
