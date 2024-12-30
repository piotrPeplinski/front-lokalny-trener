import { FC } from "react";
import StarRating from "./StarRating";
import { RatingType } from "../types/ads-types";

interface RatingProps {
  rating: RatingType;
}

const Rating: FC<RatingProps> = ({ rating }) => {
  return (
    <div className="ad-preview__rating">
      <StarRating rating={rating.average_rating} />
      <p>{rating.average_rating} / 5</p>
      <p>({rating.review_count})</p>
    </div>
  );
};

export default Rating;
