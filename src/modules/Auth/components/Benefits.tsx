import { FC } from "react";
import benefitsData from "../utils/benefitsData";
import { CheckIcon, GiftIcon } from "../../../assets/icons/icons";

interface BenefitsProps {
  isTrainer: boolean;
}

const Benefits: FC<BenefitsProps> = ({ isTrainer }) => {
  const benefitsObj = benefitsData[isTrainer ? "trainer" : "client"];

  return (
    <div className="benefits">
      <h3>{benefitsObj.slogan}</h3>
      <div className="benefits__intro">
        <GiftIcon />
        <p>Co zyskujesz?</p>
      </div>
      <div className="benefits__list">
        {benefitsObj.benefitsArray.map((benefit) => (
          <div className="benefits__list__benefit">
            <CheckIcon />
            <p>{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
