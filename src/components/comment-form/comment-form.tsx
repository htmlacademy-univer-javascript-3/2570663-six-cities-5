import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {postCommentAction} from '../../store/api-actions.ts';
import {showCustomToast} from '../custom-toast/custom-toast.tsx';

const getRatingTitle = (star: number) => {
  switch (star) {
    case 5:
      return 'perfect';
    case 4:
      return 'good';
    case 3:
      return 'not bad';
    case 2:
      return 'badly';
    default:
      return 'terribly';
  }
};

type CommentFormProps = {
  offerId: string;
}

export function CommentForm({offerId}: CommentFormProps) {
  const [formData, setFormData] = useState({
    rating: '',
    review: ''
  });

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const {rating, review} = formData;

    if (!rating) {
      showCustomToast('Please select a rating.');
      return;
    }

    if (review.length < 50 || review.length > 300) {
      showCustomToast('The review must contain from 50 to 300 characters.');
      return;
    }

    dispatch(postCommentAction({offerId, comment: review, rating: Number(rating)}))
      .then(() => {
        setFormData({rating: '', review: ''});
      });
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input className="form__rating-input visually-hidden" name="rating" value={`${star}`} id={`${star}-stars`}
              type="radio" onChange={handleChange} checked={formData.rating === `${star}`}
            />
            <label htmlFor={`${star}-stars`} className="reviews__rating-label form__rating-label"
              title={getRatingTitle(star)}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span>&nbsp;
          and describe your stay <b className="reviews__text-amount">from 50 to 300 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}
