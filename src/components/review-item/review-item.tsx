import {Review} from '../../types/review.ts';

type ReviewItemProps = {
  reviewInfo: Review;
}

export function ReviewItem({reviewInfo} : ReviewItemProps) {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={reviewInfo.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {reviewInfo.user.name}
        </span>
        {reviewInfo.user.isPro && <span className="reviews__user-status">Pro</span>}
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${reviewInfo.rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {reviewInfo.comment}
        </p>
        <time className="reviews__time" dateTime={reviewInfo.date}>
          {new Date(reviewInfo.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </div>
    </li>
  );
}
