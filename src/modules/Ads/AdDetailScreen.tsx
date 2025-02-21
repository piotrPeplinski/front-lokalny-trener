import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceList from "./components/ServiceList";
import ListEducation from "../Profile/components/ListEducation";
import { AdDetailType } from "./types/ads-types";
import { api, protectedApi } from "../../api/axiosClient";
import ContactInfo from "./components/ContactInfo";
import avatar from "./../../assets/img/avatar.png";
import Gallery from "../Profile/components/Gallery";
import Rating from "./components/Rating";
import { defaultAdDetails } from "./utils/utils";
import { AdIcon } from "../../assets/icons/icons";
import Review from "./components/Review";
import { useAuthContext } from "../Auth/context/auth-context";
import Popup from "../Reusable/Popup";
import ClickableStars from "./components/ClickableStars";

const AdDetailScreen: FC<{}> = () => {
  const { adId } = useParams();
  const { isAuthenticated, user } = useAuthContext();

  const [adDetails, setAdDetails] = useState<AdDetailType>(defaultAdDetails);
  const [popupOpen, setPopupOpen] = useState(false);
  const [revRating, setRevRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Check if the user can add a review
  const canAddReview =
    !user?.is_trainer &&
    isAuthenticated &&
    adDetails.user !== user?.id &&
    !adDetails.reviews.some((review) => review.creator === user?.id);

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await api.get(`/ads-detail/${adId}/`);
        setAdDetails(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdDetails();
  }, [adId]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (revRating === 0) {
      alert("Proszę ocenić przed dodaniem opinii.");
      return;
    }

    try {
      await protectedApi.post(`/ads-detail/${adId}/`, {
        rating: revRating,
        text: reviewText,
      });

      // Refetch the ad details to update rating and reviews
      const updatedResponse = await api.get(`/ads-detail/${adId}/`);
      setAdDetails(updatedResponse.data);

      // Reset state and close popup
      setPopupOpen(false);
      setRevRating(0);
      setReviewText("");
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Wystąpił błąd podczas dodawania opinii.");
    }
  };

  return (
    <section>
      <div className="row">
        <div className="ad-detail__container">
          <div className="ad-detail__col">
            <div className="row-center">
              <div className="profile-image-circle">
                <img
                  src={
                    adDetails.preview.profile_picture
                      ? `${process.env.REACT_APP_BACKEND_URL}/${adDetails.preview.profile_picture}`
                      : avatar
                  }
                  alt="Profile Picture"
                />
              </div>
            </div>
            <div className="row-center">
              <h1>{adDetails.preview.full_name}</h1>
            </div>
            <div className="mt-2">
              <h2 className="ad-detail__title">Opis</h2>
              <p className="ad-detail__desc">{adDetails.text}</p>
            </div>
            <div className="mt-2">
              <h2 className="ad-detail__title">Oferowane usługi</h2>
              <ServiceList services={adDetails.services} />
            </div>
            <div className="mt-2">
              {adDetails.photos.length > 0 && (
                <h2 className="ad-detail__title">Galeria zdjęć</h2>
              )}
              <Gallery allowEdit={false} fetchedPhotos={adDetails.photos} />
            </div>
            <div className="mt-2">
              <h2 className="ad-detail__title">Opinie</h2>
              {canAddReview && (
                <button
                  onClick={() => setPopupOpen(true)}
                  className="btn btn-dark mb-1"
                >
                  <AdIcon />
                  Dodaj opinię
                </button>
              )}
              <Rating rating={adDetails.preview.rating} showAmount={true} />
              <div className="mb-1"></div>
              {adDetails.reviews.map((review, index) => (
                <Review key={index} review={review} />
              ))}
            </div>
          </div>
          <div className="ad-detail__col-sm">
            <ContactInfo contactInfo={adDetails.contact_info} />
            <div className="mt-2"></div>
            <ListEducation
              allowEdit={false}
              fetchedEducation={adDetails.education}
            />
          </div>
        </div>
      </div>

      {/* Review Popup */}
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)}>
        <h2 className="profile-func-title">Dodaj opinię</h2>
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
            Dodaj
          </button>
        </form>
      </Popup>
    </section>
  );
};

export default AdDetailScreen;
