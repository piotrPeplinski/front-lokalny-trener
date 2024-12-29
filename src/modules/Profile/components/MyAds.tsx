import { FC, useEffect, useState } from "react";
import { api } from "../../../api/axiosClient";
import { useAuthContext } from "../../Auth/context/auth-context";
import { AdPreviewType } from "../../Ads/types/ads-types";
import AdPreview from "../../Ads/components/AdPreview";
import { useProfileContext } from "../context/profile-context";

const MyAds: FC<{}> = () => {
  const { user } = useAuthContext();
  const { refreshAds } = useProfileContext();
  const [ads, setAds] = useState<AdPreviewType[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await api.get(`/ads-preview/`, {
          params: {
            user: user?.id,
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
      {ads.map((ad) => (
        <AdPreview ad={ad} allowEdit={true} />
      ))}
    </div>
  );
};

export default MyAds;
