import { FC, useState } from "react";
import { Education } from "../types/profile-types";
import { CalendarIcon, TrashIcon } from "../../../assets/icons/icons";
import Popup from "../../Reusable/Popup";
import FormEducation from "./FormEducation";

interface CardEducationProps {
  education: Education;
  allowEdit: boolean;
}

const CardEducation: FC<CardEducationProps> = ({ education, allowEdit }) => {
  // POPUP
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <div
        className={`education-card ${allowEdit ? "editable" : ""}`}
        onClick={allowEdit ? openPopup : () => null}
      >
        <div className="education-card__date">
          <CalendarIcon />
          <p>{education.in_progress ? "W trakcie" : education.date}</p>
        </div>
        <p className="education-card__name">{education.name}</p>
      </div>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <FormEducation education={education} closePopup={closePopup}/>
      </Popup>
    </>
  );
};

export default CardEducation;
