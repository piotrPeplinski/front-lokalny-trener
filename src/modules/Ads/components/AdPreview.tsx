import { FC, useState } from "react";
import { AdPreviewType } from "../types/ads-types";
import StarRating from "./StarRating";
import avatar from "./../../../assets/img/avatar.png";
import { EditIcon, TrashIcon } from "../../../assets/icons/icons";
import Popup from "../../Reusable/Popup";
import { protectedApi } from "../../../api/axiosClient";
import { useProfileContext } from "../../Profile/context/profile-context";
import TrainerAdForm from "./TrainerAdForm";

interface AdPreviewProps {
  ad: AdPreviewType;
  allowEdit: boolean;
}

const AdPreview: FC<AdPreviewProps> = ({ ad, allowEdit }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const { setRefreshAds, refreshAds } = useProfileContext();

  const handleEdit = () => {
    setPopupOpen(true); // Open the popup when edit is clicked
  };

  const handleDelete = () => {
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

  return (
    <div className="ad-preview__card shadow">
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

        <div className="ad-preview__rating">
          <StarRating rating={ad.average_rating} />
          <p>{ad.average_rating} / 5</p>
          <p>({ad.review_count})</p>
        </div>

        <p className="ad-preview__category">{ad.sub_category}</p>
      </div>
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)}>
        <TrainerAdForm adId={ad.id} />
      </Popup>
    </div>
  );
};

export default AdPreview;
