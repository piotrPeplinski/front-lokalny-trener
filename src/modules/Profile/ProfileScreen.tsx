import { FC, useState } from "react";
import "./../../assets/css/Profile/profile.css";
import { functionalities } from "./utils/constans";
import Me from "./components/Me";

const ProfileScreen: FC<{}> = () => {
  const [selectedFunc, setSelectedFunc] = useState("O mnie");

  const renderFunctionality = () => {
    switch (selectedFunc) {
      case "O mnie":
        return <Me />;
    }
  };
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
