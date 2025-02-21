import { FC, useState } from "react";
import { ClientAdPreviewType } from "../types/ads-types";
import avatar from "./../../../assets/img/avatar.png";
import { EditIcon, TrashIcon } from "../../../assets/icons/icons";
import Popup from "../../Reusable/Popup";
import ClientAdForm from "./ClientAdForm";
import { protectedApi } from "../../../api/axiosClient";
import { useProfileContext } from "../../Profile/context/profile-context";
import { useNavigate } from "react-router-dom";

interface ClientAdPreviewProps {
  ad: ClientAdPreviewType;
  allowEdit: boolean;
  disabled?: boolean;
}

const ClientAdPreview: FC<ClientAdPreviewProps> = ({
  ad,
  allowEdit,
  disabled,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const { setRefreshAds, refreshAds } = useProfileContext();
  const navigate = useNavigate();

  const handleDelete = (event: React.MouseEvent) => {
    const deleteAd = async () => {
      try {
        await protectedApi.delete(`/client-ads/${ad.id}/`);
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
    if (
      !target.closest(".action-btns") &&
      !target.closest(".popup-overlay") &&
      !disabled
    ) {
      navigate(`/client-ads/${ad.id}`);
    } else {
      return;
    }
  };

  return (
    <div
      className={`ad-preview__card shadow ${disabled ? "blur" : ""}`}
      onClick={redirectToDetail}
    >
      {allowEdit && (
        <div className="action-btns">
          <div onClick={() => setPopupOpen(true)}>
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

        <div className="client-ad-info">
          <p>{ad.city ? ad.city : "Zdalnie"}</p>
          <p>
            {ad.min_price}
            <span>PLN</span> - {ad.max_price}
            <span>PLN</span>
          </p>
        </div>

        <p className="ad-preview__category">{ad.sub_category}</p>
      </div>
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)}>
        <ClientAdForm adId={ad.id} />
      </Popup>
    </div>
  );
};

export default ClientAdPreview;
