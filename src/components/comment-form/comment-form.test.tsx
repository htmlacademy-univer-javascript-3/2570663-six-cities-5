import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CommentForm } from './comment-form';
import {withStore} from '../../utils/mock-component.tsx';

vi.mock('../../store/api-actions', () => ({
  postCommentAction: vi.fn().mockImplementation(() => Promise.resolve()),
}));

describe('Component: CommentForm', () => {
  const mockOfferId = '1';

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<CommentForm offerId={mockOfferId} />);

    render(withStoreComponent);

    expect(screen.getByLabelText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should disable submit button if form is invalid', () => {
    const { withStoreComponent } = withStore(<CommentForm offerId={mockOfferId} />);

    render(withStoreComponent);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();

    userEvent.type(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), 'This is a test review');
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });
});
