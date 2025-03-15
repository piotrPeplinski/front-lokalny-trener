import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceList from "./components/ServiceList";
import ListEducation from "../Profile/components/ListEducation";
import { AdDetailType } from "./types/ads-types";
import { api } from "../../api/axiosClient";
import ContactInfo from "./components/ContactInfo";
import avatar from "./../../assets/img/avatar.png";
import Gallery from "../Profile/components/Gallery";
import Rating from "./components/Rating";
import { defaultAdDetails } from "./utils/utils";
import { AdIcon } from "../../assets/icons/icons";
import Review from "./components/Review";
import { useAuthContext } from "../Auth/context/auth-context";
import LoadSpinner from "../Reusable/LoadSpinner";
import ReviewForm from "./components/ReviewForm";

const AdDetailScreen: FC<{}> = () => {
  const { adId } = useParams();
  const { isAuthenticated, user } = useAuthContext();

  const [adDetails, setAdDetails] = useState<AdDetailType>(defaultAdDetails);
  const [popupOpen, setPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

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
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchAdDetails();
  }, [adId, refresh]);

  return (
    <section className="trainer-ad-section">
      <div className="row">
        {loading ? (
          <LoadSpinner />
        ) : (
          <div className="ad-detail__container">
            <div className="ad-detail__col">
              <div className="row-center">
                <div className="profile-image-circle">
                  <img
                    src={
                      adDetails.preview.profile_picture
                        ? `${adDetails.preview.profile_picture}`
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
        )}
      </div>

      {/* Review Popup */}
      <ReviewForm
        adId={adId}
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        refreshFunction={() => setRefresh(!refresh)}
      />
    </section>
  );
};

export default AdDetailScreen;
