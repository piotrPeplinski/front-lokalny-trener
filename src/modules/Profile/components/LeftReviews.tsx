import { FC, useEffect, useState } from "react";
import { useAuthContext } from "../../Auth/context/auth-context";
import { protectedApi } from "../../../api/axiosClient";
import LoadSpinner from "../../Reusable/LoadSpinner";
import Review from "../../Ads/components/Review";

const LeftReviews: FC<{}> = () => {
  const { user } = useAuthContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user) return; // Prevent API call if user is not available
      try {
        const response = await protectedApi.get("/my-reviews/", {
          params: {
            user: user.id,
          },
        });
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [user, refresh]);

  return (
    <div className="me-container">
      <h2 className="profile-func-title">Wystawione opinie</h2>
      {loading ? (
        <LoadSpinner />
      ) : (
        <>
          <div className="mt-2">
            {reviews.map((review, index) => (
              <Review
                key={index}
                review={review}
                allowEdit={true}
                refreshFunction={() => setRefresh(!refresh)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LeftReviews;
