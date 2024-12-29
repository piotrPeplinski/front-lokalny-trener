import React from "react";
import { EmptyStar, FullStar, HalfStar } from "../../../assets/icons/icons";

interface StarRatingProps {
  rating: number; 
  maxStars?: number; 
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (i <= Math.floor(rating)) {
      // Full Star
      stars.push(<FullStar />);
    } else if (i - rating < 1) {
      // Half Star
      stars.push(<HalfStar />);
    } else {
      // Empty Star
      stars.push(<EmptyStar />);
    }
  }

  return <div className="star-container">{stars}</div>;
};

export default StarRating;
