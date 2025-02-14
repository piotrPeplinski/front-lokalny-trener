import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/axiosClient";
import AdPreview from "./components/AdPreview";
import ClientAdPreview from "./components/ClientAdPreview";

const AdsScreen: FC<{}> = () => {
  const { subcategoryId, location, trainer_ads } = useParams();
  const [ads, setAds] = useState([]);

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
      } catch (err) {
        console.log(err);
      }
    };
    fetchAdPreviews();
  }, [subcategoryId]);

  return (
    <section>
      <div className="row">
        <h1 className="profile-func-title text-center">Ogłoszenia</h1>
        <div className="ads__container">
          {ads.map((ad) =>
            trainer_ads === "true" ? (
              <AdPreview allowEdit={false} ad={ad} />
            ) : (
              <ClientAdPreview allowEdit={false} ad={ad} />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default AdsScreen;
