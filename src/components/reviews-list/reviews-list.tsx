import {Review} from '../../types/review.ts';
import {ReviewItem} from '../review-item/review-item.tsx';
import {CommentForm} from '../comment-form/comment-form.tsx';

type ReviewsListProps = {
  reviews: Review[];
}

export function ReviewsList({reviews} : ReviewsListProps) {
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
      <CommentForm />
    </section>
  );
}
