import React, { FC } from "react";
import { EmptyStar, FullStar } from "../../../assets/icons/icons";

interface ClickableStarsProps {
  rating: number;
  setRating: (rating: number) => void;
}

const ClickableStars: FC<ClickableStarsProps> = ({ rating, setRating }) => {
  const handleClick = (index: number) => {
    setRating(index + 1); // Stars start at 1
  };

  return (
    <div className="form-col-2">
      <label htmlFor="">Ocena</label>
      <div className="star-container mb-1">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)} // Pass the correct index
            style={{ cursor: "pointer" }} // Add pointer cursor for better UX
          >
            {index < rating ? <FullStar /> : <EmptyStar />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClickableStars;
