import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import {useEffect, useMemo} from 'react';
import {ReviewsList} from '../../components/reviews-list/reviews-list.tsx';
import {Map} from '../../components/map/map';
import {OffersList} from '../../components/offers-list/offers-list.tsx';
import {Point} from '../../types/offer.ts';
import {fetchDetailedOfferAction} from '../../store/api-actions.ts';
import {State} from '../../types/state.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Spinner} from '../../components/spinner/spinner.tsx';
import { Header } from '../../components/header/header.tsx';

export function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state: State) => state.offer);
  const nearbyOffers = useAppSelector((state: State) => state.nearbyOffers);
  const comments = useAppSelector((state: State) => state.comments);

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailedOfferAction(id));
    }
  }, [dispatch, id]);

  const points: Point[] = useMemo(() => {
    if (!offer) {
      return [];
    }
    return [
      ...nearbyOffers.map((nearbyOffer) => ({
        id: nearbyOffer.id,
        city: nearbyOffer.city,
        location: nearbyOffer.location
      })),
      {
        id: offer.id,
        city: offer.city,
        location: offer.location
      }
    ];
  }, [nearbyOffers, offer]);

  if (!offer) {
    return (
      <Spinner />
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>{offer.title} - 6 cities</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${offer.rating * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedroom{offer.bedrooms > 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adult{offer.maxAdults > 1 ? 's' : ''}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <ReviewsList reviews={comments} offerId={offer.id} />
            </div>
          </div>
          <section className={'offer__map map'}>
            <Map points={points} activePointId={offer.id} height={600} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffers} setActiveOfferId={() => {}} isNearby />
          </section>
        </div>
      </main>
    </div>
  );
}
