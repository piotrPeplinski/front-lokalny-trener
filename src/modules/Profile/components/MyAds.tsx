import { FC, useEffect, useState } from "react";
import { api } from "../../../api/axiosClient";
import { useAuthContext } from "../../Auth/context/auth-context";
import { AdPreview } from "../types/profile-types";

const MyAds: FC<{}> = () => {
  const { user } = useAuthContext();

  const [ads, setAds] = useState<AdPreview[]>([]);

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
  }, []);

  return (
    <div className="me-container">
      <h1 className="profile-func-title">Moje ogłoszenia</h1>
      {ads.map((ad) => (
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${ad.profile_picture}`}
          alt="Profile picture"
        />
      ))}
    </div>
  );
};

export default MyAds;
