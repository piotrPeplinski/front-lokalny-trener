import { FC } from "react";
import { AdPreviewType } from "../types/ads-types";
import StarRating from "./StarRating";
import avatar from "./../../../assets/img/avatar.png";

interface AdPreviewProps {
  ad: AdPreviewType;
}

const AdPreview: FC<AdPreviewProps> = ({ ad }) => {
  return (
    <div className="ad-preview__card shadow">
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
    </div>
  );
};

export default AdPreview;
