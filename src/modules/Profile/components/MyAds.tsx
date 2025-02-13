import { FC, useEffect, useState } from "react";
import { api } from "../../../api/axiosClient";
import { useAuthContext } from "../../Auth/context/auth-context";
import { AdPreviewType } from "../../Ads/types/ads-types";
import AdPreview from "../../Ads/components/AdPreview";
import { useProfileContext } from "../context/profile-context";
import ClientAdPreview from "../../Ads/components/ClientAdPreview";

const MyAds: FC<{}> = () => {
  const { user } = useAuthContext();
  const { refreshAds } = useProfileContext();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await api.get(`/ads-preview/`, {
          params: {
            user: user?.id,
            trainer_ads: user?.is_trainer ? true : false,
          },
        });
        setAds(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAds();
  }, [refreshAds]);

  return (
    <div className="me-container">
      <h1 className="profile-func-title">Moje ogłoszenia</h1>
      {ads.map((ad) =>
        user?.is_trainer ? (
          <AdPreview ad={ad} allowEdit={true} />
        ) : (
          <ClientAdPreview ad={ad} allowEdit={true} />
        )
      )}
    </div>
  );
};

export default MyAds;
