import { render, screen } from '@testing-library/react';
import { ReviewsList } from './reviews-list';
import { Review } from '../../types/review';
import { expect } from 'vitest';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {createRandomUserInfo} from '../../utils/create-random-user-info.ts';
import {AuthorizationStatus} from '../../const.ts';

const mockReviews: Review[] = [
  {
    id: '1',
    comment: 'Great place!',
    date: '2023-10-01T12:00:00.000Z',
    rating: 5,
    user: {
      name: 'Alice',
      avatarUrl: 'https://example.com/avatar1.jpg',
      isPro: false,
    },
  },
  {
    id: '2',
    comment: 'Nice stay.',
    date: '2023-10-05T12:00:00.000Z',
    rating: 4,
    user: {
      name: 'Bob',
      avatarUrl: 'https://example.com/avatar2.jpg',
      isPro: true,
    },
  },
];

const mockUserInfo = createRandomUserInfo();

describe('ReviewsList Component', () => {
  it('should render reviews correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<ReviewsList reviews={mockReviews} offerId="1" />),
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: mockUserInfo,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Great place!')).toBeInTheDocument();
    expect(screen.getByText('Nice stay.')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should sort reviews by date (newest first)', () => {
    const { withStoreComponent } = withStore(
      withHistory(<ReviewsList reviews={mockReviews} offerId="1" />),
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: mockUserInfo,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    const reviewItems = screen.getAllByRole('listitem');
    expect(reviewItems[0]).toHaveTextContent('Nice stay.');
    expect(reviewItems[1]).toHaveTextContent('Great place!');
  });

  it('should limit reviews to 10', () => {
    const manyReviews = Array.from({ length: 15 }, (_, i) => ({
      id: `${i + 1}`,
      comment: `Review ${i + 1}`,
      date: `2023-10-${i + 1}T12:00:00.000Z`,
      rating: 5,
      user: {
        id: i + 1,
        name: `User ${i + 1}`,
        avatarUrl: `https://example.com/avatar${i + 1}.jpg`,
        isPro: false,
      },
    }));

    const { withStoreComponent } = withStore(
      withHistory(<ReviewsList reviews={manyReviews} offerId="1" />),
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: mockUserInfo,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    const reviewItems = screen.getAllByRole('listitem');
    expect(reviewItems.length).toBe(10);
  });

  it('should render CommentForm if user is logged in', () => {
    const { withStoreComponent } = withStore(
      withHistory(<ReviewsList reviews={mockReviews} offerId="1" />),
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: mockUserInfo,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Your review')).toBeInTheDocument();
  });

  it('should not render CommentForm if user is not logged in', () => {
    const { withStoreComponent } = withStore(
      withHistory(<ReviewsList reviews={mockReviews} offerId="1" />),
      {
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.queryByText('Your review')).not.toBeInTheDocument();
  });
});
