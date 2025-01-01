import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/axiosClient";
import { AdPreviewType } from "./types/ads-types";
import AdPreview from "./components/AdPreview";

const AdsScreen: FC<{}> = () => {
  const { subcategoryId, location } = useParams();
  const [ads, setAds] = useState<AdPreviewType[]>([]);

  useEffect(() => {
    const fetchAdPreviews = async () => {
      try {
        const response = await api.get("/ads-preview/", {
          params: {
            subcategory: subcategoryId,
            location: location,
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
          {ads.map((ad) => (
            <AdPreview allowEdit={false} ad={ad} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdsScreen;
