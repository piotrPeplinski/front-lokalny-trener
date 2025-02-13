import { FC, useState } from "react";
import { ClientAdPreviewType } from "../types/ads-types";
import avatar from "./../../../assets/img/avatar.png";
import { EditIcon, TrashIcon } from "../../../assets/icons/icons";
import Popup from "../../Reusable/Popup";
import ClientAdForm from "./ClientAdForm";

interface ClientAdPreviewProps {
  ad: ClientAdPreviewType;
  allowEdit: boolean;
}

const ClientAdPreview: FC<ClientAdPreviewProps> = ({ ad, allowEdit }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  return (
    <div className="ad-preview__card shadow">
      {allowEdit && (
        <div className="action-btns">
          <div onClick={() => setPopupOpen(true)}>
            <EditIcon />
          </div>
          <div>
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
          <p>{ad.city}</p>
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
