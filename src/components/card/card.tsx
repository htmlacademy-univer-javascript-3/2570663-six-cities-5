import {Offer} from '../../types/offer.ts';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeFavoriteAction, fetchNearbyOffersAction} from '../../store/api-actions.ts';
import {getAuthorizationStatus} from '../../store/user-data/selectors.ts';
import {redirectToRoute} from '../../store/action.ts';
import {showCustomToast} from '../../utils/show-custom-toast.tsx';

type CardProps = {
  offer: Offer;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  parentOfferId?: string;
}

export function Card({offer, onMouseEnter, onMouseLeave, parentOfferId = undefined}: CardProps) {
  const stylePrefix = parentOfferId ? 'near-places' : 'cities';
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleFavoriteClick = useCallback(async () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }

    const newStatus = offer.isFavorite ? 0 : 1;
    await dispatch(changeFavoriteAction({offerId: offer.id, status: newStatus}));
    if (parentOfferId) {
      dispatch(fetchNearbyOffersAction(parentOfferId));
    }
  }, [authorizationStatus, offer.isFavorite, offer.id, dispatch, parentOfferId]);

  const handleClickWrapper = () => {
    handleFavoriteClick().catch((error) => {
      showCustomToast(`${error}`);
    });
  };

  return (
    <article
      className={`${stylePrefix}__card place-card`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <Link to={`${AppRoute.Offer}/${offer.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
        <div className={`${stylePrefix}__image-wrapper place-card__image-wrapper`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </div>
      </Link>
      <div className={`${offer.isFavorite && 'favorites__card-info '}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.isFavorite && 'place-card__bookmark-button--active '}button`}
            type="button"
            onClick={handleClickWrapper} // Используем обёртку
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
        <Link to={`${AppRoute.Offer}/${offer.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
          <h2 className="place-card__name">
            {offer.title}
          </h2>
          <p className="place-card__type">{offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}</p>
        </Link>
      </div>
    </article>
  );
}
