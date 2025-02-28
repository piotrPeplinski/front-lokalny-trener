import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/axiosClient";
import { ClientAdDetailType } from "./types/ads-types";
import { defaultClientAdDetails } from "./utils/utils";
import avatar from "./../../assets/img/avatar.png";
import ContactInfo from "./components/ContactInfo";
import LoadSpinner from "../Reusable/LoadSpinner";

const ClientAdDetailScreen: FC<{}> = () => {
  const { adId } = useParams();
  const [adDetails, setAdDetails] = useState<ClientAdDetailType>(
    defaultClientAdDetails
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await api.get(`/ads-detail/${adId}/`, {
          params: {
            trainer_ads: false,
          },
        });
        setAdDetails(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchAdDetails();
  }, [adId]);
  return (
    <section>
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
                      adDetails.user_data.profile_picture
                        ? `${adDetails.user_data.profile_picture}`
                        : avatar
                    }
                    alt="Profile Picture"
                  />
                </div>
              </div>
              <div className="row-center">
                <h1>
                  {adDetails.user_data.first_name}{" "}
                  {adDetails.user_data.last_name}
                </h1>
              </div>
              <div className="mt-2">
                <h2 className="ad-detail__title">Tytuł</h2>
                <p className="ad-detail__desc">{adDetails.ad_data.title}</p>
              </div>
              <div className="mt-2">
                <h2 className="ad-detail__title">przedział cenowy</h2>
                <p className="ad-detail__price">
                  {adDetails.ad_data.min_price}
                  <span>PLN</span> - {adDetails.ad_data.max_price}
                  <span>PLN</span> / {adDetails.ad_data.time} minut
                </p>
              </div>
              <div className="mt-2">
                <h2 className="ad-detail__title">Opis</h2>
                <p className="ad-detail__desc">{adDetails.ad_data.text}</p>
              </div>
            </div>
            <div className="ad-detail__col-sm">
              <ContactInfo
                contactInfo={{
                  phone: adDetails.ad_data.phone,
                  email: adDetails.user_data.email,
                  city: adDetails.user_data.city,
                  remote: adDetails.user_data.remote,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientAdDetailScreen;
