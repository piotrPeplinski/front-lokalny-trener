import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceList from "./components/ServiceList";
import ListEducation from "../Profile/components/ListEducation";
import {
  AdPreviewType,
  ContactInfoType,
  ReviewType,
  Service,
} from "./types/ads-types";
import { Education, Photo } from "../Profile/types/profile-types";
import { api } from "../../api/axiosClient";
import ContactInfo from "./components/ContactInfo";

interface AdDetailType {
  preview: AdPreviewType;
  contact_info: ContactInfoType;
  services: Service[];
  text: string;
  education: Education[];
  photos: Photo[];
  reviews: ReviewType[];
}

const AdDetailScreen: FC<{}> = () => {
  const { adId } = useParams();

  const [adDetails, setAdDetails] = useState<AdDetailType>();

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await api.get(`/ads-detail/${adId}/`);
        setAdDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAdDetails();
  }, []);

  return (
    <section>
      <div className="row">
        <div className="ad-detail__container">
          <div className="ad-detail__col"></div>
          <div className="ad-detail__col-sm">
            <ContactInfo contactInfo={adDetails?.contact_info} />
            <div className="mt-2"></div>
            <ListEducation
              allowEdit={false}
              fetchedEducation={adDetails?.education}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdDetailScreen;
