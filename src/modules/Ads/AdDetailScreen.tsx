import { FC } from "react";
import { useParams } from "react-router-dom";
import ServiceList from "./components/ServiceList";
import ListEducation from "../Profile/components/ListEducation";

const AdDetailScreen: FC<{}> = () => {
  const { adId } = useParams();

  return (
    <section>
      <div className="row">
        <div className="ad-detail__container">
          <div className="ad-detail__col"></div>
          <div className="ad-detail__col-sm">
            <ListEducation allowEdit={false} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdDetailScreen;
