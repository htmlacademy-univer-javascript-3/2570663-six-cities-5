import { render, screen } from '@testing-library/react';
import { FavoritesList } from './favorites-list';
import { Offer } from '../../types/offer';

vi.mock('../favorite-card/favorite-card', () => ({
  FavoriteCard: vi.fn(({ offer }: {offer: Offer}) => <div data-testid="favorite-card">{offer.title}</div>),
}));

describe('Component: FavoritesList', () => {
  const mockOffers: Offer[] = [
    {
      id: '1',
      title: 'Offer 1',
      city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
      isFavorite: true,
      isPremium: false,
      rating: 4.5,
      type: 'apartment',
      price: 100,
      location: { latitude: 0, longitude: 0, zoom: 10 },
      previewImage: '',
    },
    {
      id: '2',
      title: 'Offer 2',
      city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
      isFavorite: true,
      isPremium: false,
      rating: 4.0,
      type: 'hotel',
      price: 80,
      location: { latitude: 0, longitude: 0, zoom: 10 },
      previewImage: '',
    },
    {
      id: '3',
      title: 'Offer 3',
      city: { name: 'Amsterdam', location: { latitude: 0, longitude: 0, zoom: 10 } },
      isFavorite: true,
      isPremium: false,
      rating: 5.0,
      type: 'house',
      price: 150,
      location: { latitude: 0, longitude: 0, zoom: 10 },
      previewImage: '',
    },
  ];

  it('should render grouped offers by city', () => {
    render(<FavoritesList offers={mockOffers} />);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();

    expect(screen.getByText('Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Offer 2')).toBeInTheDocument();
    expect(screen.getByText('Offer 3')).toBeInTheDocument();

    const parisOffers = screen.getAllByText(/Offer [1|2]/);
    expect(parisOffers.length).toBe(2);

    const amsterdamOffers = screen.getAllByText('Offer 3');
    expect(amsterdamOffers.length).toBe(1);
  });

  it('should render no offers if offers array is empty', () => {
    render(<FavoritesList offers={[]} />);

    expect(screen.queryByText(/Paris|Amsterdam/)).not.toBeInTheDocument();
    expect(screen.queryByTestId('favorite-card')).not.toBeInTheDocument();
  });
});
