import {Review} from '../../types/review.ts';
import {ReviewItem} from '../review-item/review-item.tsx';
import {CommentForm} from '../comment-form/comment-form.tsx';
import {useAppSelector} from '../../hooks';
import {memo, useMemo} from 'react';
import {getUserInfo} from '../../store/user-data/selectors.ts';

type ReviewsListProps = {
  reviews: Review[];
  offerId: string;
}

function ReviewsListComponent({reviews, offerId} : ReviewsListProps) {
  const userInfo = useAppSelector(getUserInfo);

  const sortedReviews = useMemo(() =>
    reviews.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  [reviews]
  );
  const limitedReviews = useMemo(() =>
    sortedReviews.slice(0, 10),
  [sortedReviews]
  );

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{limitedReviews.length}</span></h2>
      <ul className="reviews__list">
        {limitedReviews.map((review) => (
          <ReviewItem
            key={review.id}
            reviewInfo={review}
          />
        ))}
      </ul>
      {userInfo && <CommentForm offerId={offerId} />}
    </section>
  );
}

export const ReviewsList = memo(ReviewsListComponent);
