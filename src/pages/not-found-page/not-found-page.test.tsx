import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './not-found-page';
import { AppRoute } from '../../const';
import { expect } from 'vitest';
import {withHistory, withStore} from '../../utils/mock-component.tsx';

describe('NotFoundPage Component', () => {
  it('should render the 404 error message', () => {
    const { withStoreComponent } = withStore(
      withHistory(<NotFoundPage />),
      {}
    );

    render(withStoreComponent);

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
  });

  it('should render the link to return to the main page', () => {
    const { withStoreComponent } = withStore(
      withHistory(<NotFoundPage />),
      {}
    );

    render(withStoreComponent);

    const link = screen.getByRole('link', { name: 'Вернуться на главную страницу' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', AppRoute.Main);
  });
});
