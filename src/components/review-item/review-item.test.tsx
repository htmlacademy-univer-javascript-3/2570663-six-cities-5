import { render, screen } from '@testing-library/react';
import { ReviewItem } from './review-item';
import { Review } from '../../types/review';

describe('Component: ReviewItem', () => {
  const mockReview: Review = {
    id: '1',
    comment: 'Great place to stay!',
    date: '2023-10-01T12:00:00.000Z',
    rating: 4.5,
    user: {
      avatarUrl: 'https://example.com/avatar.jpg',
      name: 'John Doe',
      isPro: true,
    },
  };

  it('should render review information correctly', () => {
    render(<ReviewItem reviewInfo={mockReview} />);

    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockReview.user.avatarUrl);

    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();

    expect(screen.getByText('Pro')).toBeInTheDocument();

    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();

    const formattedDate = new Date(mockReview.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('should not render "Pro" status if user is not a pro', () => {
    const reviewWithoutProStatus = {
      ...mockReview,
      user: {
        ...mockReview.user,
        isPro: false,
      },
    };

    render(<ReviewItem reviewInfo={reviewWithoutProStatus} />);

    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });
});
