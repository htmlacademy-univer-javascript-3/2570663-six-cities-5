import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OffersList } from './offers-list';
import { Offer } from '../../types/offer';
import {createRandomOffer} from '../../utils/create-random-offer.ts';

vi.mock('../card/card', () => ({
  Card: vi.fn(({ offer, onMouseEnter, onMouseLeave } : { offer: Offer; onMouseEnter: () => void; onMouseLeave: () => void }) => (
    <div
      data-testid="card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.title}
    </div>
  )),
}));

describe('Component: OffersList', () => {
  const mockOffers: Offer[] = [
    createRandomOffer(),
  ];

  const mockSetActiveOfferId = vi.fn();

  it('should render offers correctly', () => {
    render(
      <OffersList
        offers={mockOffers}
        setActiveOfferId={mockSetActiveOfferId}
      />
    );

    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('should call setActiveOfferId with the correct offer id on mouse enter', async () => {
    render(
      <OffersList
        offers={mockOffers}
        setActiveOfferId={mockSetActiveOfferId}
      />
    );

    await userEvent.hover(screen.getByText(mockOffers[0].title));

    expect(mockSetActiveOfferId).toHaveBeenCalledWith(mockOffers[0].id);
  });

  it('should call setActiveOfferId with null on mouse leave', async () => {
    render(
      <OffersList
        offers={mockOffers}
        setActiveOfferId={mockSetActiveOfferId}
      />
    );

    await userEvent.hover(screen.getByText(mockOffers[0].title));

    await userEvent.unhover(screen.getByText(mockOffers[0].title));

    expect(mockSetActiveOfferId).toHaveBeenCalledWith(null);
  });

  it('should render with "near-places__list places__list" class when isNearby is true', () => {
    render(
      <OffersList
        offers={mockOffers}
        setActiveOfferId={mockSetActiveOfferId}
        isNearby
      />
    );

    expect(screen.getByTestId('card').parentElement).toHaveClass('near-places__list places__list');
  });

  it('should render with "cities__places-list places__list tabs__content" class when isNearby is false', () => {
    render(
      <OffersList
        offers={mockOffers}
        setActiveOfferId={mockSetActiveOfferId}
      />
    );

    expect(screen.getByTestId('card').parentElement).toHaveClass('cities__places-list places__list tabs__content');
  });
});
