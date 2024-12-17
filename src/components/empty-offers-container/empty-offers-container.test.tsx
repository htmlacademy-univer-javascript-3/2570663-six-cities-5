import { render, screen } from '@testing-library/react';
import { EmptyOffersContainer } from './empty-offers-container';
import {withHistory, withStore} from '../../utils/mock-component.tsx';

describe('Component: EmptyOffersContainer', () => {
  it('should render correctly with active city', () => {
    const mockActiveCity = 'Paris';

    const { withStoreComponent } = withStore(
      <EmptyOffersContainer />,
      {
        CITY: {
          activeCity: mockActiveCity,
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${mockActiveCity}`)).toBeInTheDocument();
  });

  it('should render correctly with a different active city', () => {
    const mockActiveCity = 'Amsterdam';

    const { withStoreComponent } = withStore(
      <EmptyOffersContainer />,
      {
        CITY: {
          activeCity: mockActiveCity,
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${mockActiveCity}`)).toBeInTheDocument();
  });
});
