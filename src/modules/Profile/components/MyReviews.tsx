import { FC, useEffect, useState } from "react";
import Rating from "../../Ads/components/Rating";
import { protectedApi } from "../../../api/axiosClient";
import { useAuthContext } from "../../Auth/context/auth-context";
import { RatingType, ReviewType } from "../../Ads/types/ads-types";
import Review from "../../Ads/components/Review";
import LoadSpinner from "../../Reusable/LoadSpinner";

interface ReviewDataType {
  rating: RatingType;
  reviews: ReviewType[];
}

const MyReviews: FC<{}> = () => {
  const { user } = useAuthContext();
  const [reviewData, setReviewData] = useState<ReviewDataType>({
    rating: {
      average_rating: 0,
      review_count: 0,
    },
    reviews: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user) return; // Prevent API call if user is not available
      try {
        const response = await protectedApi.get("/my-reviews/", {
          params: {
            user: user.id,
          },
        });
        setReviewData(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [user]);

  return (
    <div className="me-container">
      <h2 className="profile-func-title">Opinie</h2>
      {loading ? (
        <LoadSpinner />
      ) : (
        <>
          <Rating showAmount={true} rating={reviewData.rating} />
          <div className="mt-2">
            {reviewData.reviews.map((review, index) => (
              <Review key={index} review={review} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyReviews;
