import {Review} from '../../types/review.ts';
import {ReviewItem} from '../review-item/review-item.tsx';
import {CommentForm} from '../comment-form/comment-form.tsx';
import {State} from '../../types/state.ts';
import {useAppSelector} from '../../hooks';

type ReviewsListProps = {
  reviews: Review[];
  offerId: string;
}

export function ReviewsList({reviews, offerId} : ReviewsListProps) {
  const userData = useAppSelector((state: State) => state.userData);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            reviewInfo={review}
          />
        ))}
      </ul>
      {userData && <CommentForm offerId={offerId} />}
    </section>
  );
}
