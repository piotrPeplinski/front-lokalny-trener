import { FC, useEffect } from "react";
import "./../../assets/css/Profile/profile.css";
import {
  clientFunctionalities,
  trainerFunctionalities,
} from "./utils/constans";
import Me from "./components/Me";
import Education from "./components/Education";
import PhotoGallery from "./components/PhotoGallery";
import MyAds from "./components/MyAds";
import { useProfileContext } from "./context/profile-context";
import MyReviews from "./components/MyReviews";
import { useAuthContext } from "../Auth/context/auth-context";
import { useNavigate } from "react-router-dom";

const ProfileScreen: FC<{}> = () => {
  const { selectedFunc, setSelectedFunc } = useProfileContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const functionalities = user?.is_trainer
    ? trainerFunctionalities
    : clientFunctionalities;

  const renderFunctionality = () => {
    switch (selectedFunc) {
      case "O mnie":
        return <Me />;
      case "Moje wykształcenie":
        return <Education />;
      case "Galeria zdjęć":
        return <PhotoGallery />;
      case "Moje ogłoszenia":
        return <MyAds />;
      case "Opinie":
        return <MyReviews />;
    }
  };

  useEffect(() => {
    if (selectedFunc === "Zmień hasło") {
      navigate("/request-password-reset");
    } else if (selectedFunc === "Moja subskrypcja") {
      navigate("/subscription");
    }
  }, [selectedFunc, navigate]);

  return (
    <section>
      <div className="row">
        <div className="profile-container">
          <div className="profile-funcs">
            <div className="funcs-card shadow">
              {functionalities.map((func) => (
                <p
                  onClick={() => setSelectedFunc(func)}
                  className={`${func === selectedFunc ? "selected" : ""}`}
                >
                  {func}
                </p>
              ))}
            </div>
          </div>
          <div className="profile-display">{renderFunctionality()}</div>
        </div>
      </div>
    </section>
  );
};

export default ProfileScreen;
