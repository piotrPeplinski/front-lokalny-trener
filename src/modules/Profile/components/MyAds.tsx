import { FC, useEffect, useState } from "react";
import { api } from "../../../api/axiosClient";
import { useAuthContext } from "../../Auth/context/auth-context";
import { AdPreviewType } from "../../Ads/types/ads-types";
import AdPreview from "../../Ads/components/AdPreview";
import { useProfileContext } from "../context/profile-context";
import ClientAdPreview from "../../Ads/components/ClientAdPreview";
import { getErrorMessage } from "../../Reusable/utils";
import LoadSpinner from "../../Reusable/LoadSpinner";

const MyAds: FC<{}> = () => {
  const { user } = useAuthContext();
  const { refreshAds } = useProfileContext();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error: any) {
        const message = getErrorMessage(
          error,
          "Błąd podczas pobierania ogłoszeń."
        );
        alert(message);
        setLoading(false);
      }
    };
    fetchAds();
  }, [refreshAds]);

  return (
    <div className="me-container">
      <h1 className="profile-func-title">Moje ogłoszenia</h1>
      {loading ? (
        <LoadSpinner />
      ) : (
        ads.map((ad, index) =>
          user?.is_trainer ? (
            <AdPreview key={index} ad={ad} allowEdit={true} />
          ) : (
            <ClientAdPreview key={index} ad={ad} allowEdit={true} />
          )
        )
      )}
    </div>
  );
};

export default MyAds;
