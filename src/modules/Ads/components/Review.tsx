import { FC, useState } from "react";
import { ReviewType } from "../types/ads-types";
import Rating from "./Rating";
import { EditIcon, TrashIcon } from "../../../assets/icons/icons";
import ReviewForm from "./ReviewForm";

interface ReviewProps {
  review: ReviewType;
  allowEdit?: boolean;
  refreshFunction?: Function;
}

const Review: FC<ReviewProps> = ({ review, allowEdit, refreshFunction }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  return (
    <div className="review__container shadow">
      <div className="review__row">
        <h4>
          {allowEdit ? review.trainer_full_name : review.creator_full_name}
        </h4>
        <p className="review__date">{review.created}</p>
        {allowEdit && (
          <div
            className="action-btns"
            style={{ position: "initial", padding: 0 }}
          >
            <div onClick={() => setPopupOpen(true)}>
              <EditIcon />
            </div>
            <div>
              <TrashIcon />
            </div>
          </div>
        )}
      </div>
      <Rating
        showAmount={false}
        rating={{ average_rating: review.rating, review_count: 1 }}
      />
      <p className="review__text">{review.text}</p>
      <ReviewForm
        review={review}
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        refreshFunction={refreshFunction}
      />
    </div>
  );
};

export default Review;
