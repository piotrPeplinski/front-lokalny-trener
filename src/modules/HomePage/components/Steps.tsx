import { FC } from "react";
import { AdIcon, AvatarIcon, CallIcon } from "../../../assets/icons/icons";

const Steps: FC<{}> = () => {
  return (
    <div className="row">
      <div className="steps-container">
        <div className="step">
          <AvatarIcon />
          <p>Załóż konto w kilka minut</p>
        </div>
        <div className="step">
          <AdIcon />
          <p>Dodaj ogłoszenie lub przejrzyj oferty w twojej okolicy</p>
        </div>
        <div className="step">
          <CallIcon />
          <p>Umów się na zajęcia!</p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
