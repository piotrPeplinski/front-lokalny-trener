import { FC, useState } from "react";
import ClickableStars from "./ClickableStars";
import Popup from "../../Reusable/Popup";
import { protectedApi } from "../../../api/axiosClient";
import { ReviewType } from "../types/ads-types";

interface ReviewFormProps {
  adId?: string;
  review?: ReviewType;
  popupOpen: boolean;
  setPopupOpen: Function;
  refreshFunction?: Function;
}

const ReviewForm: FC<ReviewFormProps> = ({
  adId,
  review,
  popupOpen,
  setPopupOpen,
  refreshFunction,
}) => {
  const [revRating, setRevRating] = useState(review ? review.rating : 0);
  const [reviewText, setReviewText] = useState(review ? review.text : "");

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (revRating === 0) {
      alert("Proszę ocenić przed dodaniem opinii.");
      return;
    }

    try {
      if (adId) {
        await protectedApi.post(`/ads-detail/${adId}/`, {
          rating: revRating,
          text: reviewText,
        });
      } else {
        await protectedApi.put(`/my-reviews/${review?.id}/`, {
          rating: revRating,
          text: reviewText,
        });
      }
      setPopupOpen(false);
      //refresh ad details or left reviews
      refreshFunction && refreshFunction();
    } catch (error) {
      alert("Wystąpił błąd podczas dodawania opinii.");
    }
  };
  return (
    <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)}>
      <h2 className="profile-func-title">{adId ? "Dodaj" : "Edytuj"} opinię</h2>
      <form onSubmit={handleReviewSubmit}>
        <ClickableStars rating={revRating} setRating={setRevRating} />
        <div className="form-row-2">
          <div className="form-col-2">
            <label htmlFor="desc">Treść</label>
            <textarea
              id="desc"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <button
          className="btn btn-dark"
          type="submit"
          disabled={revRating === 0}
        >
          {adId ? "Dodaj" : "Zapisz"}
        </button>
      </form>
    </Popup>
  );
};

export default ReviewForm;
