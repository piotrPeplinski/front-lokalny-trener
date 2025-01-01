import { FC } from "react";
import { ReviewType } from "../types/ads-types";
import Rating from "./Rating";

interface ReviewProps {
  review: ReviewType;
}

const Review: FC<ReviewProps> = ({ review }) => {
  return (
    <div className="review__container shadow">
      <div className="review__row">
        <h4>{review.creator_full_name}</h4>
        <p className="review__date">{review.created}</p>
      </div>
      <Rating
        showAmount={false}
        rating={{ average_rating: review.rating, review_count: 1 }}
      />
      <p className="review__text">{review.text}</p>
    </div>
  );
};

export default Review;
