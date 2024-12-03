import {Offer} from '../../types/offer.ts';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {memo} from 'react';

type CardProps = {
  offer: Offer;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isNearby?: boolean;
}

function CardComponent({offer, onMouseEnter, onMouseLeave, isNearby = false}: CardProps) {
  const stylePrefix = isNearby ? 'near-places' : 'cities';
  return (
    <Link to={`${AppRoute.Offer}/${offer.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article
        className={`${stylePrefix}__card place-card`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {offer.isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>}
        <div className={`${stylePrefix}__image-wrapper place-card__image-wrapper`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </div>
        <div className={`${offer.isFavorite && 'favorites__card-info '}place-card__info`}>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{offer.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className={`place-card__bookmark-button button ${offer.isFavorite && 'place-card__bookmark-button--active '}button`}
              type="button"
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${20 * Math.round(offer.rating)}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            {offer.title}
          </h2>
          <p className="place-card__type">{offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}</p>
        </div>
      </article>
    </Link>
  );
}

export const Card = memo(CardComponent);
