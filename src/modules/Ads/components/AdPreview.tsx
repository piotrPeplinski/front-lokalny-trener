import { FC, useState } from "react";
import { AdPreviewType } from "../types/ads-types";
import StarRating from "./StarRating";
import avatar from "./../../../assets/img/avatar.png";
import { EditIcon, TrashIcon } from "../../../assets/icons/icons";
import Popup from "../../Reusable/Popup";
import { protectedApi } from "../../../api/axiosClient";
import { useProfileContext } from "../../Profile/context/profile-context";
import TrainerAdForm from "./TrainerAdForm";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

interface AdPreviewProps {
  ad: AdPreviewType;
  allowEdit: boolean;
}

const AdPreview: FC<AdPreviewProps> = ({ ad, allowEdit }) => {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const { setRefreshAds, refreshAds } = useProfileContext();

  const handleEdit = (event: React.MouseEvent) => {
    setPopupOpen(true); // Open the popup when edit is clicked
  };

  const handleDelete = (event: React.MouseEvent) => {
    const deleteAd = async () => {
      try {
        await protectedApi.delete(`/ads/${ad.id}/`);
        alert("Usunięto pomyślnie.");
        setRefreshAds(!refreshAds);
      } catch (err) {
        alert("Błąd podczas usuwania. Spróbuj ponownie.");
        console.log(err);
      }
    };
    deleteAd();
  };

  const redirectToDetail = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".action-btns") && !target.closest(".popup-overlay")) {
      navigate(`/ads/${ad.id}`);
    } else {
      return;
    }
  };

  return (
    <div className="ad-preview__card shadow" onClick={redirectToDetail}>
      {allowEdit && (
        <div className="action-btns">
          <div onClick={handleEdit}>
            <EditIcon />
          </div>
          <div onClick={handleDelete}>
            <TrashIcon />
          </div>
        </div>
      )}
      <div className="ad-preview__col">
        <div className="profile-image-circle">
          <img
            src={
              ad.profile_picture
                ? `${process.env.REACT_APP_BACKEND_URL}/${ad.profile_picture}`
                : avatar
            }
            alt="Profile Picture"
          />
        </div>
      </div>
      <div className="ad-preview-col">
        <h3 className="ad-preview__name">{ad.full_name}</h3>

        <Rating rating={ad.rating} />

        <p className="ad-preview__category">{ad.sub_category}</p>
      </div>
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)}>
        <TrainerAdForm adId={ad.id} />
      </Popup>
    </div>
  );
};

export default AdPreview;
