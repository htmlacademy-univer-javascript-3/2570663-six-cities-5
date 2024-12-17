import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './card';
import { createRandomOffer } from '../../utils/create-random-offer';
import {AppRoute, AuthorizationStatus} from '../../const';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {changeFavoriteAction} from '../../store/api-actions.ts';
import {redirectToRoute} from '../../store/action.ts';
import {createRandomUserInfo} from '../../utils/create-random-user-info.ts';

describe('Component: Card', () => {
  const mockOffer = createRandomOffer();
  const mockOnMouseEnter = vi.fn();
  const mockOnMouseLeave = vi.fn();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <Card
        offer={mockOffer}
        onMouseEnter={mockOnMouseEnter}
        onMouseLeave={mockOnMouseLeave}
      />,
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: createRandomUserInfo(),
          favoriteOffers: [],
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type.charAt(0).toUpperCase() + mockOffer.type.slice(1))).toBeInTheDocument();
  });

  it('should call onMouseEnter and onMouseLeave', async () => {
    const { withStoreComponent } = withStore(
      <Card
        offer={mockOffer}
        onMouseEnter={mockOnMouseEnter}
        onMouseLeave={mockOnMouseLeave}
      />,
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: createRandomUserInfo(),
          favoriteOffers: [createRandomOffer()],
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.hover(screen.getByRole('article'));
    expect(mockOnMouseEnter).toHaveBeenCalledTimes(1);

    await userEvent.unhover(screen.getByRole('article'));
    expect(mockOnMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('should handle favorite button click when authorized', async () => {
    mockOffer.isFavorite = false;
    const { withStoreComponent, mockStore } = withStore(
      <Card
        offer={mockOffer}
        onMouseEnter={mockOnMouseEnter}
        onMouseLeave={mockOnMouseLeave}
      />,
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: createRandomUserInfo(),
          favoriteOffers: [createRandomOffer()],
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.click(screen.getByRole('button', { name: /To bookmarks/i }));

    const actions = mockStore.getActions();
    expect(actions[0].type).toBe(changeFavoriteAction.pending.type);
  });

  it('should redirect to login page when unauthorized and favorite button clicked', async () => {
    mockOffer.isFavorite = false;
    const { withStoreComponent, mockStore } = withStore(
      <Card
        offer={mockOffer}
        onMouseEnter={mockOnMouseEnter}
        onMouseLeave={mockOnMouseLeave}
      />,
      {
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
          favoriteOffers: [],
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.click(screen.getByRole('button', { name: /To bookmarks/i }));

    const actions = mockStore.getActions();
    expect(actions[0].type).toBe(redirectToRoute.type);
    expect(actions[0].payload).toBe(AppRoute.Login);
  });
});
