import { render, screen } from '@testing-library/react';
import { LoginPage } from './login-page';
import { expect } from 'vitest';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {AuthorizationStatus} from '../../const.ts';

describe('LoginPage Component', () => {
  it('should render the login form', () => {
    const { withStoreComponent } = withStore(
      withHistory(<LoginPage />),
      {
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render the header', () => {
    const { withStoreComponent } = withStore(
      withHistory(<LoginPage />),
      {
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should render the location link', () => {
    const { withStoreComponent } = withStore(
      withHistory(<LoginPage />),
      {
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Amsterdam' })).toHaveAttribute('href', '#');
  });
});
