import React, {ChangeEvent, FormEvent, useState} from 'react';

const getRatingTitle = (star: number) => {
  if (star === 5) {
    return 'perfect';
  } else if (star === 4) {
    return 'good';
  } else if (star === 3) {
    return 'not bad';
  } else if (star === 2) {
    return 'badly';
  } else {
    return 'terribly';
  }
};

function CommentForm() {
  const [formData, setFormData] = useState({
    rating: '',
    review: ''
  });

  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { rating, review } = formData;

    if (!rating) {
      setError('Please select a rating.');
      return;
    }
    if (review.length < 50) {
      setError('The review must contain at least 50 characters.');
      return;
    }

    // eslint-disable-next-line no-console
    console.log('Отправка данных:', formData);

    setFormData({ rating: '', review: '' });
    setIsSubmitted(true);
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input className="form__rating-input visually-hidden" name="rating" value={`${star}`} id={`${star}-stars`}
              type="radio" onChange={handleChange}
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
      {error && <p className="error-message">{error}</p>}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
      {isSubmitted && <p className="success-message">Ваш отзыв был успешно отправлен! 💌</p>}
    </form>
  );
}

export default CommentForm;
