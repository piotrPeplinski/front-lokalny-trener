import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api/axiosClient";
import AdPreview from "./components/AdPreview";
import ClientAdPreview from "./components/ClientAdPreview";
import { useAuthContext } from "../Auth/context/auth-context";
import { getErrorMessage } from "../Reusable/utils";
import { ClipLoader } from "react-spinners";
import LoadSpinner from "../Reusable/LoadSpinner";

const AdsScreen: FC<{}> = () => {
  const { subcategoryId, location, trainer_ads } = useParams();
  const [ads, setAds] = useState([]);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdPreviews = async () => {
      try {
        const response = await api.get("/ads-preview/", {
          params: {
            subcategory: subcategoryId,
            location: location,
            trainer_ads: trainer_ads,
          },
        });
        setAds(response.data);
        setLoading(false);
      } catch (error: any) {
        const message = getErrorMessage(
          error,
          "Błąd podczas pobierania ogłoszeń."
        );
        setLoading(false);
        alert(message);
      }
    };
    fetchAdPreviews();
  }, [subcategoryId, trainer_ads, location]);

  //for debug
  useEffect(() => {
    console.log(ads);
  }, [ads]);

  return (
    <section>
      <div className="row">
        <h1 className="profile-func-title text-center">Ogłoszenia</h1>
        {loading && <LoadSpinner />}
        <div className="posts__container">
          {ads.map((ad, index) =>
            trainer_ads === "true" ? (
              <AdPreview key={index} allowEdit={false} ad={ad} />
            ) : (
              <ClientAdPreview
                key={index}
                allowEdit={false}
                ad={ad}
                disabled={user?.is_subscribed ? false : true}
              />
            )
          )}
          {trainer_ads === "false" && !user?.is_subscribed && (
            <div className="overlay-message shadow">
              Aby zobaczyć ogłoszenia klientów kup pakiet Standard lub Premium
              <div className="center-wrapper">
                <Link className="btn btn-dark" to="/pricing">
                  Zobacz cennik
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdsScreen;
