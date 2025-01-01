import { FC } from "react";
import StarRating from "./StarRating";
import { RatingType } from "../types/ads-types";

interface RatingProps {
  rating: RatingType;
  showAmount: boolean;
}

const Rating: FC<RatingProps> = ({ rating, showAmount }) => {
  return (
    <div className="ad-preview__rating">
      <StarRating rating={rating.average_rating} />
      <p>{rating.average_rating} / 5</p>
      {showAmount && <p>({rating.review_count})</p>}
    </div>
  );
};

export default Rating;
